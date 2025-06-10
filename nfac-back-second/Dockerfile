# Dockerfile
FROM python:3.13-slim

# Установим рабочую директорию
WORKDIR /app

# Копируем зависимости и устанавливаем их
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем все файлы проекта
COPY . .

# Запускаем Uvicorn сервер
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]