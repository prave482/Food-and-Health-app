FROM python:3.11-slim

WORKDIR /app

# Install dependencies first for caching
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend source
COPY backend/ .

# Ensure uvicorn runs on the port Cloud Run expects
CMD uvicorn app.main:app --host 0.0.0.0 --port $PORT
