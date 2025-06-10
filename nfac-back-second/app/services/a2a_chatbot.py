import asyncio
import os
from dotenv import load_dotenv
import openai
import google.generativeai as genai
from google.generativeai import GenerativeModel

load_dotenv()

os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
gemini_model = GenerativeModel("gemini-1.5-flash-latest")
openai_client = openai.AsyncOpenAI(api_key=os.environ["OPENAI_API_KEY"])


async def gemini_response(context: str) -> str:
    """Gemini отвечает в обсуждении."""
    prompt = f"Прокомментируй и предложи идею или уточнение по поводу:\n{context}"
    response = await gemini_model.generate_content_async(prompt)
    return response.text.strip()


async def gpt_response(context: str) -> str:
    """GPT-4o-mini отвечает в обсуждении."""
    response = await openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Ты эксперт-советник."},
            {"role": "user", "content": context},
        ],
    )
    return response.choices[0].message.content.strip()


async def ai_dialogue(user_question: str, rounds: int = 3) -> str:
    """Два ИИ обсуждают вопрос пользователя, пытаясь прийти к лучшему ответу."""
    print(f"🤖 Пользователь: {user_question}\n")

    context = user_question
    for i in range(rounds):
        gpt_reply = await gpt_response(context)
        print(f"🔵 GPT отвечает: {gpt_reply}\n")

        gemini_reply = await gemini_response(gpt_reply)
        print(f"🟢 Gemini отвечает: {gemini_reply}\n")

        context += f"\nGPT сказал: {gpt_reply}\nGemini ответил: {gemini_reply}"

    # Финальное обобщение от GPT
    final_response = await gpt_response(
        context
        + "\nНа основе обсуждения, какой ответ будет наиболее точным и полезным пользователю?"
    )
    return final_response


async def main(self, question: str):
    final_answer = await ai_dialogue(question)
    print("\n🎯 Финальный ответ от ИИ:")
    print(final_answer)
    return final_answer
