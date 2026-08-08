import os
import hashlib
import re
import time
import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from typing import List

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware

import schemas
from data import PROJECTS, SKILLS, EXPERIENCES

logger = logging.getLogger("uvicorn.error")

app = FastAPI(
    title="Developer Portfolio API",
    description="Stateless Backend API for portfolio website (0 Database)",
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

# Destination email hardcoded strictly on the backend to avoid any leakage to clients
RECIPIENT_EMAIL = "jan992nyc@gmail.com"

# Optional SMTP configuration from environment variables
SMTP_HOST = os.getenv("SMTP_HOST", "")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASS = os.getenv("SMTP_PASSWORD", os.getenv("SMTP_PASS", ""))
SMTP_FROM = os.getenv("SMTP_FROM", SMTP_USER or "portfolio@localhost")
SMTP_USE_TLS = os.getenv("SMTP_USE_TLS", "true").lower() in ("true", "1", "yes")

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


def _dispatch_feedback_email(name: str, sender_email: str, text: str, client_ip: str) -> None:
    """
    Dispatches the feedback directly via email to the administrator.
    Zero data is saved to any database.
    """
    timestamp = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    subject = f"[Portfolio Feedback] Message from {name}"
    body = (
        f"You have received a new feedback message from your portfolio website:\n\n"
        f"--------------------------------------------------\n"
        f"Sender Name:  {name}\n"
        f"Sender Email: {sender_email}\n"
        f"Received At:  {timestamp}\n"
        f"Sender IP:    {client_ip}\n"
        f"--------------------------------------------------\n\n"
        f"Message Content:\n{text}\n\n"
        f"--------------------------------------------------\n"
        f"(This feedback was dispatched directly to your inbox with zero database persistence.)\n"
    )

    if SMTP_HOST and SMTP_USER and SMTP_PASS:
        try:
            msg = MIMEMultipart()
            msg["From"] = SMTP_FROM
            msg["To"] = RECIPIENT_EMAIL
            msg["Subject"] = subject
            msg["Reply-To"] = sender_email
            msg.attach(MIMEText(body, "plain", "utf-8"))

            if SMTP_USE_TLS:
                server = smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=10)
                server.starttls()
            else:
                server = smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=10)

            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_FROM, [RECIPIENT_EMAIL], msg.as_string())
            server.quit()
            logger.info(f"Feedback email dispatched successfully to admin via SMTP for {name}.")
        except Exception as exc:
            logger.error(f"Failed to deliver feedback email via SMTP: {exc}. Notification logged to server output.")
    else:
        # In demo / local environment without external SMTP configured,
        # securely output notification to server logs without database persistence.
        logger.info(
            f"\n=== [FEEDBACK EMAIL DISPATCH] ===\n"
            f"To: [ADMIN INBOX PROTECTED]\n"
            f"From: {name} <{sender_email}>\n"
            f"Subject: {subject}\n\n"
            f"{text}\n"
            f"=================================\n"
        )


@app.get("/")
def read_root():
    return {"status": "healthy", "service": "Portfolio API (Stateless, 0 DB)"}


@app.get("/api/projects", response_model=List[schemas.Project])
def get_projects():
    return PROJECTS


@app.get("/api/skills", response_model=List[schemas.Skill])
def get_skills():
    return SKILLS


@app.get("/api/experience", response_model=List[schemas.Experience])
def get_experience():
    return EXPERIENCES


@app.post("/api/contact", response_model=schemas.ContactResponse, status_code=status.HTTP_200_OK)
def create_contact_message(
    message: schemas.ContactMessageCreate,
    request: Request,
):
    name, email, text = _validate_contact_message(message, request)
    client_ip = _client_ip(request)
    _dispatch_feedback_email(name, email, text, client_ip)
    return schemas.ContactResponse(
        status="success",
        message="Feedback received and dispatched directly to the administrator."
    )
