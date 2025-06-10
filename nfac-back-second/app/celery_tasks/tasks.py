from app.celery_worker import celery_app
from app.services.scraper import get_latest_news


@celery_app.task(name="fetch_and_save_news")
def fetch_and_save_news():
    get_latest_news()
