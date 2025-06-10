from sqlalchemy import Column, Integer, String, DateTime
from .database import Base


class News(Base):
    __tablename__ = "news"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    link = Column(String, index=True)
    announce = Column(String, index=True)
    date = Column(DateTime, index=True)
