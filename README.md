AI CRM HCP
Overview

AI CRM HCP is an AI-powered Customer Relationship Management application designed for Medical Representatives to efficiently record Healthcare Professional (HCP) interactions.

The application supports both structured form-based logging and conversational AI-based interaction logging using LangGraph and Groq LLM.

Features
🤖 AI-powered interaction extraction
💬 Conversational AI interface
🎤 Voice-to-text support
📝 Automatic CRM form filling
✏️ AI conversational editing
💾 Save interactions to PostgreSQL
📚 Recent interaction history
🔄 Automatic reset after save
🏥 Medical Representative workflow
Tech Stack

Frontend

React
Redux Ready
Tailwind CSS

Backend

FastAPI
LangGraph
Groq (gemma2-9b-it)
SQLAlchemy

Database

PostgreSQL
LangGraph Tools
1. Log Interaction

Extracts structured CRM information from free-text conversations.

2. Edit Interaction

Updates CRM fields using natural language.

Example

Change doctor name to Dr Ravi
3. Summarize Interaction

Creates a concise summary of the meeting.

Project Structure
crm-assignment-aivoa

backend/

frontend/

README.md
Installation
Backend
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
Frontend
cd frontend

npm install

npm run dev
Workflow
Medical Representative

↓

Voice / Text

↓

LangGraph

↓

Groq LLM

↓

Extract CRM Fields

↓

Auto Fill Form

↓

Save Interaction

↓

PostgreSQL

↓

Recent History