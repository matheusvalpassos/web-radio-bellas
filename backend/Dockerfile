FROM python:3.11-slim

# Evita que o python faça buffering (logs mais rápidos)
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Instala ffmpeg no OS (essencial para o yt-dlp)
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

# Copia os requirements e instala
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn uvicorn

# Copia toda a aplicação backend
COPY . .

# Expõe porta padrao
EXPOSE 8000

# Roda o servidor no Gunicorn usando Uvicorn Worker caso queira assíncronos no futuro
CMD ["gunicorn", "--config", "gunicorn_conf.py", "config.wsgi:application"]
