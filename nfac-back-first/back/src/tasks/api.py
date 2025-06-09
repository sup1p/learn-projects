from typing import List

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ..database import SessionLocal

from .crud import TaskCRUD
from .schemas import Task, TaskCreate, TaskUpdate

router = APIRouter(prefix="/tasks", tags=["tasks"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/create", response_model=Task)
async def create_task(task_data: TaskCreate, db: Session = Depends(get_db)):
    return TaskCRUD.create_task(db=db, task_data=task_data)


@router.get("/get_all", response_model=List[Task])
async def get_tasks(db:Session=Depends(get_db)):
    return TaskCRUD.get_all_tasks(db)


@router.patch("/{task_id}/edit", response_model=Task)
async def update_task(task_id: int, task_update:TaskUpdate, db:Session=Depends(get_db)):
    updated_task = TaskCRUD.edit_task(db, task_id, task_update)
    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task 


@router.delete("/{task_id}/delete", response_model=Task)
async def delete_task(task_id: int, db: Session = Depends(get_db)):
    return TaskCRUD.delete_task(db, task_id)

@router.patch("/{task_id}/complete", response_model=Task)
async def complete_task(task_id: int, db: Session = Depends(get_db)):
    return TaskCRUD.complete_task(db, task_id)