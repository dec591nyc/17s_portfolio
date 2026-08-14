from pydantic import BaseModel, Field
from typing import Optional, List

# Project schemas
class Project(BaseModel):
    id: int
    title: str
    description: str
    category: str
    tags: str
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    image_url: Optional[str] = None
    date: Optional[str] = None
    period: Optional[str] = None

# Skill schemas
class Skill(BaseModel):
    id: int
    name: str
    category: str
    proficiency: int

# Experience schemas
class Experience(BaseModel):
    id: int
    title: str
    company: str
    period: str
    description: str
    category: str

# Contact / Feedback schemas (Zero DB Persistence)
class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=80)
    email: str = Field(..., min_length=5, max_length=120)
    message: str = Field(..., min_length=10, max_length=250)
    website: Optional[str] = Field(default="", max_length=200)

class ContactResponse(BaseModel):
    status: str = "success"
    message: str = "Feedback received and dispatched directly to the administrator."
