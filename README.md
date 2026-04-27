Food Safety Complaint & Inspection Management System

Overview

A web-based system to register and manage food safety complaints. It allows users to report issues, while admins and inspectors handle inspections and track resolutions efficiently.

Tech Stack:
Django, Django REST Framework
React
JWT Authentication
SQLite / PostgreSQL
Features
Complaint registration with image upload
Status tracking (Pending / Assigned / Resolved)
Inspector assignment & report submission
Role-based access (Admin / Inspector / User)
Secure REST APIs

Setup:
# Backend
git clone <https://github.com/sabaripv/fullstack-foodsafety-project.git>
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Frontend
cd frontend
npm install
npm start
cd frontend
npm install
npm start

Purpose:

To simplify complaint handling, reduce manual work, and improve transparency.
