from sqlalchemy import Column, Integer, String, Text, DateTime
import datetime
from database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String, nullable=False)  # e.g., "Frontend", "Backend", "AI"
    tags = Column(String, nullable=False)       # e.g., "React,Next.js,TypeScript"
    github_url = Column(String, nullable=True)
    demo_url = Column(String, nullable=True)
    image_url = Column(String, nullable=True)

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)  # e.g., "Frontend", "Backend", "Languages", "Tools"
    proficiency = Column(Integer, nullable=False) # 0-100

class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    company = Column(String, nullable=False)
    period = Column(String, nullable=False)    # e.g., "2023 - Present"
    description = Column(Text, nullable=False)
    category = Column(String, nullable=False)  # "work" or "education"

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
