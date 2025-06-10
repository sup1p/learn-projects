from pydantic import BaseModel


class News(BaseModel):
    title: str
    link: str
    announce: str
    date: str


class NewsRead(News):
    id: int

    class Config:
        orm_mode = True
