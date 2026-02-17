Incident Tracker – Full Stack Application

Candidate: Mohammed Sajad Vellathi  
Assignment: Software Engineer – Zeotap

Project Overview

This project is a full-stack incident tracking application built to manage production incidents. It allows users to create incidents, view them in a list, search and filter results, and update their status throughout the incident lifecycle.

The goal of this project is to simulate a real-world incident management workflow used in production systems.

Technology Stack

Backend:
- FastAPI (Python)
- PostgreSQL
- SQLAlchemy ORM
- Pydantic validation

Frontend:
- React (Vite)
- Axios for API calls
- Responsive CSS

Features Implemented

- Create new incidents
- View all incidents in a paginated list
- Search incidents by title
- Filter incidents by severity and status
- Sort incidents by time
- View incident details
- Update incident status
- Seed database with sample data

Database Design

The application uses a PostgreSQL database with a single "incidents" table containing:

- id (UUID primary key)
- title
- service name
- severity level
- incident status
- assigned owner
- summary
- created timestamp
- updated timestamp

How to Run the Project

Backend Setup:

cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload

Backend runs on:
http://127.0.0.1:8000


Seed the Database:

python seed.py

This will populate the database with sample incidents.

Frontend Setup:

cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

API Endpoints

POST /api/incidents – Create a new incident  
GET /api/incidents – Retrieve incidents with pagination and filters  
GET /api/incidents/{id} – Get incident details  
PATCH /api/incidents/{id} – Update incident status  

Design Decisions

FastAPI was chosen for the backend because it provides strong validation, automatic documentation, and high performance.

PostgreSQL was used because it is reliable and widely used for structured data.

React was selected for the frontend due to its component-based architecture and ease of state management.


Tradeoffs

To keep development simple and focused on functionality, basic CSS was used instead of a UI framework.

Authentication and real-time updates were not implemented due to time constraints.


Possible Improvements

If extended further, the project could include:

- User authentication
- Role-based access control
- Real-time incident updates
- Notifications and alerts
- Enhanced UI design


Repository Link

https://github.com/MohammedSajadVellathi/incident-tracker-fullstack.


This project was completed according to the requirements specified in the assignment.
