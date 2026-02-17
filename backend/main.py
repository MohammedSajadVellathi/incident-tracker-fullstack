from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models
from database import engine, get_db, Base
from schemas import IncidentCreate, IncidentResponse, IncidentUpdate
import crud
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Incident Tracker API Running"}


# Create incident
@app.post("/api/incidents", response_model=IncidentResponse)
def create_incident(incident: IncidentCreate, db: Session = Depends(get_db)):
    return crud.create_incident(db, incident)


# Get incidents with pagination
@app.get("/api/incidents", response_model=list[IncidentResponse])
def get_incidents(
    page: int = 1,
    limit: int = 10,
    search: str = None,
    severity: str = None,
    status: str = None,
    sort_by: str = "created_at",
    order: str = "desc",
    db: Session = Depends(get_db)
):
    skip = (page - 1) * limit

    return crud.get_incidents(
        db,
        skip=skip,
        limit=limit,
        search=search,
        severity=severity,
        status=status,
        sort_by=sort_by,
        order=order
    )


# Get single incident
@app.get("/api/incidents/{incident_id}", response_model=IncidentResponse)
def get_incident(incident_id: str, db: Session = Depends(get_db)):
    incident = crud.get_incident_by_id(db, incident_id)
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    return incident


# Update incident status
@app.patch("/api/incidents/{incident_id}", response_model=IncidentResponse)
def update_incident(incident_id: str, update: IncidentUpdate, db: Session = Depends(get_db)):
    incident = crud.update_incident_status(db, incident_id, update.status)
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    return incident
