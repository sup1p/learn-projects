from celery import Celery

celery_app = Celery(
    "worker",
    broker="redis://redis:6379/0",
    backend="redis://redis:6379/0",
    include=["app.celery_tasks.tasks"],
)

celery_app.conf.beat_schedule = {
    "fetch-latest-news-every-3-hours": {
        "task": "fetch_and_save_news",
        "schedule": 3 * 60 * 60,
    }
}

celery_app.conf.timezone = "UTC"
