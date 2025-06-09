from typing import List
from sqlalchemy.orm import Session

from fastapi import HTTPException
from . import models
from .schemas import Task as TaskSchema, TaskCreate, TaskUpdate


class TaskCRUD:
    @staticmethod
    def create_task(db: Session, task_data: TaskCreate):
        db_task = models.Task(title=task_data.title, description=task_data.description, deadline=task_data.deadline)
        db.add(db_task)
        db.commit()
        db.refresh(db_task)
        return db_task

    @staticmethod
    def get_all_tasks(db: Session):
        return db.query(models.Task).all()

    @staticmethod
    def edit_task(db: Session, task_id: int, task_data: TaskUpdate):
        task = db.query(models.Task).filter(models.Task.id == task_id).first()
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")
        if task_data.title:
            task.title = task_data.title
        if task_data.description:
            task.description = task_data.description
        if task_data.deadline:
            task.deadline = task_data.deadline

        db.commit()
        db.refresh(task)
        return task

    @staticmethod
    def delete_task(db: Session, task_id: int):
        task = db.query(models.Task).filter(models.Task.id == task_id).first()
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")
        db.delete(task)
        db.commit()
        return task

    @staticmethod
    def complete_task(db: Session, task_id: int):
        task = db.query(models.Task).filter(models.Task.id == task_id).first()
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")
        task.completed = True
        db.commit()
        db.refresh(task)
        return task