import os
import hashlib
import re
import time

from fastapi import FastAPI, Depends, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from database import engine, get_db
import models, schemas

# Create tables (SQLite will auto-create portfolio.db on launch)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Developer Portfolio API",
    description="Backend API for portfolio website",
    version="1.0.0"
)

allowed_origins = [
    origin.strip()
    for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
    if origin.strip()
]

# Setup CORS to allow the configured Next.js frontend origins to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

CONTACT_IP_LIMIT_1M = int(os.getenv("CONTACT_IP_LIMIT_1M", "5"))
CONTACT_EMAIL_LIMIT_10M = int(os.getenv("CONTACT_EMAIL_LIMIT_10M", "3"))
CONTACT_MAX_LINKS = int(os.getenv("CONTACT_MAX_LINKS", "3"))
CONTACT_HASH_SALT = os.getenv("CONTACT_HASH_SALT", "portfolio-contact")

contact_attempts = []


def _fingerprint(value: str) -> str:
    payload = f"{CONTACT_HASH_SALT}:{value}".encode("utf-8")
    return hashlib.sha256(payload).hexdigest()


def _client_ip(request: Request) -> str:
    forwarded_for = request.headers.get("x-forwarded-for", "")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    if request.client:
        return request.client.host
    return "unknown"


def _prune_attempts(now: float) -> None:
    # Keep enough history for duplicate detection without letting memory grow forever.
    cutoff = now - 86400
    contact_attempts[:] = [attempt for attempt in contact_attempts if attempt["created_at"] > cutoff]
    if len(contact_attempts) > 5000:
        del contact_attempts[:-5000]


def _count_recent(field: str, value: str, seconds: int, now: float) -> int:
    return sum(
        1
        for attempt in contact_attempts
        if attempt[field] == value and attempt["created_at"] > now - seconds
    )


def _validate_contact_message(message: schemas.ContactMessageCreate, request: Request) -> tuple[str, str, str]:
    if message.website and message.website.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This submission tripped the bot trap.",
        )

    name = message.name.strip()
    email = message.email.strip().lower()
    text = message.message.strip()

    if not name or len(name) > 80:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Name must be 1-80 characters.")
    if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", email) or len(email) > 120:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Please enter a valid email address.")
    if len(text) < 10 or len(text) > 250:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Message must be 10-250 characters.")
    if len(re.findall(r"https?://|www\.", text, flags=re.IGNORECASE)) > CONTACT_MAX_LINKS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Too many links for a first message.",
        )
    if re.search(r"(.)\1{24,}", text):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Message looks too repetitive.",
        )

    now = time.time()
    _prune_attempts(now)

    ip_hash = _fingerprint(_client_ip(request))
    email_hash = _fingerprint(email)
    normalized_text = " ".join(text.lower().split())
    message_hash = _fingerprint(normalized_text)

    if _count_recent("ip_hash", ip_hash, 60, now) >= CONTACT_IP_LIMIT_1M:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Please wait a minute before sending more messages.",
        )
    if _count_recent("email_hash", email_hash, 600, now) >= CONTACT_EMAIL_LIMIT_10M:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many messages from this email. Please try again later.",
        )
    if _count_recent("message_hash", message_hash, 86400, now) >= 1:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Duplicate message detected.",
        )

    contact_attempts.append(
        {
            "created_at": now,
            "ip_hash": ip_hash,
            "email_hash": email_hash,
            "message_hash": message_hash,
        }
    )
    return name, email, text

@app.get("/")
def read_root():
    return {"status": "healthy", "service": "Portfolio API"}

@app.get("/api/projects", response_model=List[schemas.Project])
def get_projects(db: Session = Depends(get_db)):
    return db.query(models.Project).all()

@app.get("/api/skills", response_model=List[schemas.Skill])
def get_skills(db: Session = Depends(get_db)):
    return db.query(models.Skill).all()

@app.get("/api/experience", response_model=List[schemas.Experience])
def get_experience(db: Session = Depends(get_db)):
    return db.query(models.Experience).all()

@app.post("/api/contact", response_model=schemas.ContactMessage, status_code=status.HTTP_201_CREATED)
def create_contact_message(
    message: schemas.ContactMessageCreate,
    request: Request,
    db: Session = Depends(get_db),
):
    name, email, text = _validate_contact_message(message, request)
    db_message = models.ContactMessage(
        name=name,
        email=email,
        message=text,
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message
