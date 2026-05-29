from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# Project schemas
class ProjectBase(BaseModel):
    title: str
    description: str
    category: str
    tags: str
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    image_url: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int

    class Config:
        orm_mode = True

# Skill schemas
class SkillBase(BaseModel):
    name: str
    category: str
    proficiency: int

class SkillCreate(SkillBase):
    pass

class Skill(SkillBase):
    id: int

    class Config:
        orm_mode = True

# Experience schemas
class ExperienceBase(BaseModel):
    title: str
    company: str
    period: str
    description: str
    category: str

class ExperienceCreate(ExperienceBase):
    pass

class Experience(ExperienceBase):
    id: int

    class Config:
        orm_mode = True

# Contact schemas
class ContactMessageCreate(BaseModel):
    name: str
    email: str
    message: str

class ContactMessage(ContactMessageCreate):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
