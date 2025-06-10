from fastapi import APIRouter
from ..database import SessionLocal
from sqlalchemy.orm import Session
from sqlalchemy import desc
from fastapi import Depends
from ..services.scraper import get_latest_news
from ..models import News
from ..services import a2a_chatbot
from pydantic import BaseModel

router = APIRouter(prefix="/main", tags=["main"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class Message(BaseModel):
    message: str


@router.get("/update_news")
async def get_data():
    get_latest_news()
    return {"message": "News updated"}


@router.get("/get_news")
async def get_news(db: Session = Depends(get_db)):
    news = db.query(News).order_by(desc(News.date)).limit(5).all()
    return news


@router.post("/chatbot")
async def send_message(request: Message):
    result = await a2a_chatbot.ai_dialogue(request.message)
    return {"message": result}
