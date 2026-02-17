from faker import Faker
import random
from database import SessionLocal
from models import Incident, SeverityEnum, StatusEnum

fake = Faker()

db = SessionLocal()

services = ["Payment API", "User Service", "Auth Service", "Billing System", "Notification Service"]

severities = list(SeverityEnum)
statuses = list(StatusEnum)

print("Seeding database with incidents...")

for _ in range(200):
    incident = Incident(
        title=fake.sentence(nb_words=4),
        service=random.choice(services),
        severity=random.choice(severities),
        status=random.choice(statuses),
        owner=fake.name(),
        summary=fake.text(max_nb_chars=100)
    )
    db.add(incident)

db.commit()
db.close()

print("Seeding completed successfully!")
