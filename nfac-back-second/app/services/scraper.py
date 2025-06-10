from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time
from datetime import datetime

from ..database import SessionLocal, Base
from ..models import News


def get_latest_news():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")

    driver = webdriver.Chrome(options=options)
    driver.get("https://tengrinews.kz/news/")
    time.sleep(5)

    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")

    news_blocks = soup.find_all("div", class_="content_main_item")

    db = SessionLocal()
    for block in news_blocks:
        # Заголовок
        title_tag = block.find("span", class_="content_main_item_title")
        title = title_tag.get_text(strip=True) if title_tag else ""
        # Ссылка
        link_tag = title_tag.find("a") if title_tag else None
        link = f"https://tengrinews.kz{link_tag['href']}" if link_tag else ""
        # Анонс/описание
        announce_tag = block.find("span", class_="content_main_item_announce")
        announce = announce_tag.get_text(strip=True) if announce_tag else ""
        # Дата
        date_tag = block.find("div", class_="content_main_item_meta").find("span")
        date = date_tag.get_text(strip=True) if date_tag else ""

        try:
            if date.lower() == "сегодня":
                date = datetime.now()
            else:
                date = datetime.strptime(
                    date, "%d.%m.%Y"
                )  # подкорректируй под нужный формат
        except:
            date = datetime.now()

        # Проверка на дубликаты (например, по ссылке)
        existing = db.query(News).filter(News.link == link).first()
        if not existing:
            news_obj = News(title=title, link=link, announce=announce, date=date)
            db.add(news_obj)
    db.commit()
    db.close()
    driver.quit()
