from pydantic import BaseModel, ConfigDict, Field
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

    model_config = ConfigDict(from_attributes=True)

# Skill schemas
class SkillBase(BaseModel):
    name: str
    category: str
    proficiency: int

class SkillCreate(SkillBase):
    pass

class Skill(SkillBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

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

    model_config = ConfigDict(from_attributes=True)

# Contact schemas
class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=80)
    email: str = Field(..., min_length=5, max_length=120)
    message: str = Field(..., min_length=10, max_length=250)
    website: Optional[str] = Field(default="", max_length=200)

class ContactMessage(BaseModel):
    id: int
    name: str
    email: str
    message: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
