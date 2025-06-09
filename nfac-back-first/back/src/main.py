from fastapi import FastAPI
from .database import engine, Base
from .tasks.api import router as tasks_router
from .config import settings

Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": f"Hello {settings.name}"}


app.include_router(tasks_router)