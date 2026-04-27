Food Safety Complaint & Inspection Management System

Overview:

A web-based platform to register and manage food safety complaints. It helps users report issues easily and allows authorities to handle inspections and track resolutions in a more organized way.

Tech Stack:

Backend: Django, Django REST Framework
Frontend: React
Auth: JWT
Database: SQLite / PostgreSQL

Features:

User registration & login
Submit complaints with image evidence
Track complaint status (Pending / Assigned / Resolved)
Admin assigns inspectors
Inspectors submit reports
Role-based access (Admin / Inspector / User)
Secure REST API

Workflow:

User logs in and submits a complaint
Admin assigns it to an inspector
Inspector updates the inspection report
Status gets updated and user can track it

Setup:

Backend:
git clone <https://github.com/sabaripv/fullstack-foodsafety-project.git>
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Frontend:
cd frontend
npm install
npm start

Purpose:

To reduce manual work, improve transparency, and make complaint handling faster and easier.
