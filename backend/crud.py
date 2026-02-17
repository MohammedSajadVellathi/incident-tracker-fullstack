from sqlalchemy.orm import Session
from models import Incident
from schemas import IncidentCreate
from datetime import datetime
from sqlalchemy import asc, desc
from models import Incident

def create_incident(db: Session, incident: IncidentCreate):
    db_incident = Incident(**incident.dict())
    db.add(db_incident)
    db.commit()
    db.refresh(db_incident)
    return db_incident




def get_incidents(db, skip=0, limit=10, search=None, severity=None, status=None, sort_by="created_at", order="desc"):
    query = db.query(Incident)

    if search:
        query = query.filter(Incident.title.ilike(f"%{search}%"))

    if severity:
        query = query.filter(Incident.severity == severity)

    if status:
        query = query.filter(Incident.status == status)

    if order == "asc":
        query = query.order_by(getattr(Incident, sort_by).asc())
    else:
        query = query.order_by(getattr(Incident, sort_by).desc())

    return query.offset(skip).limit(limit).all()



def get_incident_by_id(db: Session, incident_id):
    return db.query(Incident).filter(Incident.id == incident_id).first()


def update_incident_status(db: Session, incident_id, status):
    incident = db.query(Incident).filter(Incident.id == incident_id).first()
    if incident:
        incident.status = status
        incident.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(incident)
    return incident
