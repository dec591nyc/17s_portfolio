from fastapi import FastAPI, Depends, HTTPException, status
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

# Setup CORS to allow Next.js frontend to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for local testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
def create_contact_message(message: schemas.ContactMessageCreate, db: Session = Depends(get_db)):
    db_message = models.ContactMessage(
        name=message.name,
        email=message.email,
        message=message.message
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message
