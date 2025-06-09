from typing import List

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ...database import SessionLocal
from .. import models
from ..auth import create_access_token, get_current_user
from ..crud import TaskCRUD
from ..schemas import Task, TaskCreate, TaskUpdate
from passlib.hash import bcrypt

router = APIRouter(prefix="/secure", tags=["secure"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/me", response_model=dict)
async def get_me(current_user: models.User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username
    }

@router.post("/create", response_model=Task)
async def create_task(task_data: TaskCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return TaskCRUD.create_task(db=db, task_data=task_data, user_id=current_user.id)

@router.get("/get_my_tasks", response_model=List[Task])
async def get_my_tasks(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return TaskCRUD.get_all_tasks(db, user_id=current_user.id)
