import os
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_assistant_id():
    try:
        with open('.assistant_id', 'r') as f:
            return f.read().strip()
    except FileNotFoundError:
        print("❌ NO ASSISTANT. Run run 00_bootstrap.py.")
        return None

def create_thread():
    thread = client.beta.threads.create()
    print(f"✅ CREATED THREAD: {thread.id}")
    return thread

def ask_question(assistant_id, thread_id, question):
    print(f"\nQuestion: {question}")
    print("🤖 Assistant: ", end="", flush=True)
    
    client.beta.threads.messages.create(thread_id=thread_id,role="user",content=question)
    
    with client.beta.threads.runs.create_and_stream(hread_id=thread_id,assistant_id=assistant_id,) as stream:
        for event in stream:
            if event.event == 'thread.message.delta':
                for content in event.data.delta.content:
                    if content.type == 'text':
                        print(content.text.value, end="", flush=True)
    
    print("\n")
    
    messages = client.beta.threads.messages.list(thread_id=thread_id, limit=1)
    latest_message = messages.data[0]
    
    if (hasattr(latest_message.content[0], 'text') and 
        latest_message.content[0].text.annotations):
        print("📚 Citations:")
        for annotation in latest_message.content[0].text.annotations:
            if hasattr(annotation, 'file_citation'):
                citation = annotation.file_citation
                print(f"  - File ID: {citation.file_id}")
                if hasattr(citation, 'quote'):
                    print(f"    Quote: {citation.quote[:100]}...")
    
    return latest_message

def main():
    assistant_id = get_assistant_id()
    if not assistant_id:
        return
    
    thread = create_thread()
    
    questions = ["Who founded the Kazakh Handygy?","Two random facts from the file"]
    
    for question in questions:
        ask_question(assistant_id, thread.id, question)
        print("-" * 50)
    
    print("\n(TYPE 'quit' TO EXIT)")
    while True:
        user_question = input("\nYour question: ").strip()
        if user_question.lower() in ['quit', 'exit', 'q']:
            break
        if user_question:
            ask_question(assistant_id, thread.id, user_question)

if __name__ == "__main__":
    main()