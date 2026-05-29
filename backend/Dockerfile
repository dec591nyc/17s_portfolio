# Use official lightweight Python image
FROM python:3.14-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install system dependencies (needed for compiling psycopg2 if required, though we use binary)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . /app/

# Port is provided dynamically by GCP Cloud Run ($PORT)
EXPOSE 8000

# Execute server using executive form to allow signals propagation
CMD exec uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
