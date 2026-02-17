from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from models import SeverityEnum, StatusEnum
from uuid import UUID


# Schema for creating incident
class IncidentCreate(BaseModel):
    title: str
    service: str
    severity: SeverityEnum
    owner: Optional[str] = None
    summary: Optional[str] = None


# Schema for updating incident
class IncidentUpdate(BaseModel):
    status: StatusEnum


# Schema for returning incident data
class IncidentResponse(BaseModel):
    id: UUID
    title: str
    service: str
    severity: SeverityEnum
    status: StatusEnum
    owner: Optional[str]
    summary: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
