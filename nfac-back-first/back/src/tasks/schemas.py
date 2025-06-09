from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class TaskCreate(BaseModel):
    title: str
    deadline: Optional[datetime] = None
    description: str


class Task(BaseModel):
    id: int
    title: str
    deadline: datetime
    description: str
    completed: bool

    class Config:
        orm_mode = True

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    deadline: Optional[datetime] = None
