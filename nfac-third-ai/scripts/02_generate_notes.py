mport json
import os
from typing import List, Optional
from openai import OpenAI
from pydantic import BaseModel, Field
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class Note(BaseModel):
    id: int = Field(..., ge=1, le=10)
    heading: str = Field(..., example="Kazakh Handygy was founded by Kerey and Zhanibek")
    summary: str = Field(..., max_length=150)
    page_ref: Optional[int] = Field(None, description="Page number in source PDF")

class NotesResponse(BaseModel):
    notes: List[Note] = Field(..., min_items=10, max_items=10)

def generate_notes_structured_output():
    """Generate notes using the new structured output API."""
    system = (
        "You are a study summarizer. "
        "Return exactly 10 unique notes that will help prepare for the exam. "
        "Focus on key definitions, dates and main characters"
    )
    user_prompt = "Generate 10 exam revision notes based on attached file"
    try:
        completion = client.beta.chat.completions.parse(model="gpt-4o-mini",messages=[
                {"role": "system", "content": system},{"role": "user", "content": user_prompt}
            ],response_format=NotesResponse)
        
        return completion.choices[0].message.parsed.notes
        
    except Exception as e:
        print(f"❌ ERROR IN A !structured output!: {e}")
        return None

def generate_notes_json_mode():
    """Generate notes using JSON mode (alternative approach from assignment)."""
    system = (
        "You are a study summarizer. "
        "Return exactly 10 unique notes that will help prepare for the exam. "
        "Respond *only* with valid JSON matching the Note[] schema."
    )
    user_prompt = """Generate 10 exam revision notes. Format as JSON with this structure:
        {
        "notes": [
            {
            "id": 1,
            "heading": "Topic Name",
            "summary": "Brief explanation under 150 chars",
            "page_ref": 42
            }
        ]
        }"""
    try:
        response = client.chat.completions.create(model="gpt-4o-mini",messages=[
                {"role": "system", "content": system},{"role": "user", "content": user_prompt}],
            response_format={"type": "json_object"})
        
        data = json.loads(response.choices[0].message.content)
        notes = [Note(**item) for item in data["notes"]]  #  pydantic
        return notes
        
    except Exception as e:
        print(f"❌ ERROR IN A !JSON mode!: {e}")
        return None

def print_structured_notes(notes: List[Note]):
    print("\n" + "="*60)
    print("📝 EXAM REVISION NOTES")
    print("="*60)
    
    for note in notes:
        print(f"\n{note.id}. {note.heading}")
        print("-" * (len(str(note.id)) + len(note.heading) + 2))
        print(f"{note.summary}")
        if note.page_ref:
            print(f"📄 Page: {note.page_ref}")

def save_notes_to_json(notes: List[Note], filename: str = "prepare_notes.json"):
    try:
        notes_dict = {"notes": [note.model_dump() for note in notes]}
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(notes_dict, f, indent=2, ensure_ascii=False)
        print(f"✅ Notes SAVED to {filename}")
    except Exception as e:
        print(f"❌ EROR !saving notes!: {e}")

def main():
    print("GENERATING Exam Notes...")
    
    notes = generate_notes_structured_output()
    
    if not notes:
        print("Trying JSON mode as fallback...")
        notes = generate_notes_json_mode()
    
    if notes:
        print(f"✅ Generated {len(notes)} notes")
        print_structured_notes(notes)
        save_notes_to_json(notes)
    else:
        print("❌ Failed to generate notes")

if __name__ == "__main__":
    main()