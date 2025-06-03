import os
from openai import OpenAI
from dotenv import load_dotenv
import pathlib

load_dotenv()

PROJECT_ROOT = pathlib.Path(__file__).parent.parent.absolute()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

try:
    import openai
    print(f"OpenAI version: {openai.__version__}")
except:
    pass

def create_or_get_assistant():
    """Create a new assistant or reuse existing one."""
    try:
        with open('.assistant_id', 'r') as f:
            assistant_id = f.read().strip()
            assistant = client.beta.assistants.retrieve(assistant_id)
            print(f"Reusing existing assistant: {assistant.name} (id: {assistant_id})")
            return assistant
    except FileNotFoundError:
        pass
    except Exception as e:
        print(f"⚠️ Error retrieving existing assist: {e}")
    
    assistant = client.beta.assistants.create(
        name="Study Q&A Assistant",
        instructions=(
            "You are a very helpful tutor. "
            "Use the knowledge in the attached files to answer questions. "
        ),
        model="gpt-4o-mini",
        tools=[{"type": "file_search"}]
    )
        with open('.assistant_id', 'w') as f:
        f.write(assistant.id)
    
    print(f"✅ Created new assist: {assistant.name} (id: {assistant.id})")
    return assistant

def upload_pdf_to_assistant(assistant_id, pdf_path):
    if not os.path.exists(pdf_path):
        print(f"❌ File not found: {pdf_path}")
        return None
    try:
        with open(pdf_path, "rb") as file:
            uploaded_file = client.files.create(purpose="assistants",file=file)
        
        print(f"✅ Uploaded file: {pdf_path} (ID: {uploaded_file.id})")
        
        vector_store = client.vector_stores.create(name="Study Materials")
        
        client.vector_stores.files.create(vector_store_id=vector_store.id,file_id=uploaded_file.id)
        
        client.beta.assistants.update(assistant_id,tool_resources={"file_search": {"vector_store_ids": [vector_store.id]}})
        
        print(f"✅ File attached to assistant")
        return uploaded_file.id
        
    except Exception as e:
        print(f"❌ Error uploading file: {e}")
        return None

if __name__ == "__main__":
    assistant = create_or_get_assistant()
    pdf_path = os.path.join(PROJECT_ROOT, "data", "TheKazakhKhanateORE.pdf")
    if os.path.exists(pdf_path):
        upload_pdf_to_assistant(assistant.id, pdf_path)
    else:
        print(f"⚠️ PDF not found at {pdf_path}")
