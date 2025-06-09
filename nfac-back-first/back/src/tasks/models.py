from sqlalchemy import Column, Integer, String, DateTime, Boolean
from ..database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, index=True)
    description = Column(String, index=True, nullable=True)
    deadline = Column(DateTime, index=True, nullable=True)
    completed = Column(Boolean, default=False)