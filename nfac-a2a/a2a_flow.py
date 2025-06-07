import asyncio
import re
from google.generativeai import GenerativeModel
import google.generativeai as genai
import os
import openai
from dotenv import load_dotenv

load_dotenv()

os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")


def extract_evaluations(text: str) -> list[dict]:
    """
    Extracts scores, comments, and names for multiple startup ideas from text.
    """
    idea_blocks = re.split(r"(?=\d+-ая идея:)", text)
    results = []

    for block in idea_blocks:
        if not block.strip() or "Оценка:" not in block:
            continue

        score_match = re.search(r"Оценка:\s*(\d)", block)
        comment_match = re.search(
            r"Комментарий:\s*(.*?)(?=\n\s*Название:|$)", block, re.DOTALL
        )
        name_match = re.search(r"Название:\s*(.*)", block, re.DOTALL)

        score = int(score_match.group(1)) if score_match else 0
        comment = comment_match.group(1).strip() if comment_match else "Нет комментария"
        name = name_match.group(1).strip() if name_match else "Без названия"

        results.append({"score": score, "comment": comment, "name": name})

    return results


async def evaluate_idea(ideas: str) -> list[dict]:
    """
    Evaluates startup ideas using OpenAI's GPT model.
    """
    client = openai.AsyncOpenAI()
    try:
        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Ты эксперт в венчурных инвестициях."},
                {
                    "role": "user",
                    "content": f"""
Оцени следующие идеи ИИ-стартапа от 1 до 5 как эксперт в венчурных инвестициях, учитывая что это веб-сайт пространство и что нам нужно заработать деньги или привлечь много пользователей:

Формат ответа:
1-ая идея:
    Оценка: X
    Комментарий: Текст
    Название: Название идеи

2-ая идея:
    Оценка: X
    Комментарий: Текст
    Название: Название идеи

3-ая идея:
    Оценка: X
    Комментарий: Текст
    Название: Название идеи

Идеи: {ideas}
""",
                },
            ],
        )
        content = response.choices[0].message.content
        return extract_evaluations(content)
    except Exception as e:
        print(f"Ошибка при оценке идеи: {e}")
        return []


genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
gemini_model = GenerativeModel("gemini-1.5-flash-latest")


async def generate_idea() -> str:
    """
    Generates three unique AI startup ideas using Google's Gemini model.
    """
    prompt = "Придумай три уникальные идеи для ИИ-стартапа в веб-сайт пространстве, чтобы заработать деньги или привлечь много пользователей в формате:\n1. Название: Описание\n2. Название: Описание\n3. Название: Описание"
    response = await gemini_model.generate_content_async(prompt)
    return response.text.strip()


async def main():
    white_list, black_list = [], []

    while len(white_list) < 3:
        ideas_text = await generate_idea()
        print(f"\n🔹 Сгенерированы идеи:\n{ideas_text}")

        evaluations = await evaluate_idea(ideas_text)

        if not evaluations:
            print("Не удалось получить оценку для идей. Пробуем снова.")
            black_list.append(
                {"name": "Идеи без оценки", "comment": ideas_text, "score": 0}
            )
            continue

        for evaluation in evaluations:
            if len(white_list) >= 3:
                break

            score = evaluation["score"]
            comment = evaluation["comment"]
            name = evaluation["name"]

            print(f"\nИдея: {name}")
            print(f"💬 Оценка агента: {score}/5\n🗣 Комментарий: {comment}")

            if score >= 4:
                white_list.append(evaluation)
                print("✅ Добавлено в white-лист!")
            else:
                black_list.append(evaluation)
                print("❌ Добавлено в black-лист.")

        print(f"\n📊 Прогресс: {len(white_list)}/3 хороших идей\n")

    print("\n🎉 3 отличные идеи найдены!\n=== WHITE LIST ===")
    for i, idea in enumerate(white_list, 1):
        print(f"{i}. {idea['name']} (Оценка: {idea['score']})\nКомментарий: {idea['comment']}")

    print("\n=== BLACK LIST ===")
    for i, idea in enumerate(black_list, 1):
        print(f"{i}. {idea['name']} (Оценка: {idea['score']})\nКомментарий: {idea['comment']}")


if __name__ == "__main__":
    asyncio.run(main())