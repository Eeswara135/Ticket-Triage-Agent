AI Ticket Triage Agent

Team Members

| Roll No | Student Name | Branch |
|----------|--------------|---------|
| 23U41A4433 | PURRI PREETHI SREE VARSHA | CSD |
| 23U41A0559 | VUGGINA SRI SAI MANASA | CSE |
| 23U41A0553 | SENNAMSETTI ESWARA RAO | CSE |
| 23U41A0448 | PILLA PRUDHVI SAI MANIKANTA | ECE |

---

Project Overview

AI Ticket Triage Agent is an intelligent Production Support solution designed to automate the classification and prioritization of customer support tickets.

Support teams receive a large number of tickets every day. Manually analyzing, categorizing, and prioritizing these tickets is time-consuming and often leads to inconsistent results. This project uses Artificial Intelligence to automatically classify incoming tickets, assign priority levels, generate reasoning, and store the results for future analysis.

The system helps organizations improve operational efficiency, reduce response times, and streamline support workflows.

---

Objective

The primary objectives of this project are:

- Automatically classify support tickets into predefined categories.
- Assign appropriate priority levels (P1–P4).
- Generate reasoning for every classification.
- Store results in SQLite Database.
- Generate downloadable CSV reports.
- Provide a modern dashboard for ticket analysis.

---

Problem Statement

In production support environments, tickets arrive in an unstructured format and require manual review.

Challenges include:

- Time-consuming ticket triage process.
- Inconsistent categorization.
- Incorrect priority assignments.
- Increased workload on support teams.
- Delayed issue resolution.

The AI Ticket Triage Agent solves these challenges through automated ticket analysis.

---

AI-Powered Classification

The system uses Artificial Intelligence and Natural Language Processing techniques to understand ticket content and generate structured outputs.

The AI model performs:

Ticket Classification

Supported categories:

- Bug
- Feature Request
- Billing
- Other

Priority Prediction

Supported priorities:

- P1 (Critical)
- P2 (High)
- P3 (Medium)
- P4 (Low)

Reason Generation

The system provides a meaningful explanation for every prediction.

Example:

Input:

Application crashes after login

Output:

Category: Bug

Priority: P1

Reason: Application issue detected

---

Dashboard Features

The application provides an interactive dashboard that includes:

- Total tickets processed.
- Critical (P1) ticket count.
- Billing ticket count.
- Category analysis.
- Priority analysis.
- Downloadable CSV reports.
- Ticket classification history.

---

Technology Stack

Frontend

- React.js
- Vite
- CSS3

Backend

- Node.js
- Express.js

Artificial Intelligence Layer

- Python
- Google Gemini API

Data Processing

- Pandas

Database

- SQLite

Data Formats

- JSON
- CSV

---

System Architecture

User Input Ticket
        │
        ▼
React Frontend
        │
        ▼
Node.js + Express API
        │
        ▼
Python AI Engine
        │
        ▼
Gemini Classification
        │
        ▼
Category + Priority + Reason
        │
        ├──────────────► SQLite Database
        │
        ├──────────────► CSV Report
        │
        ▼
Dashboard Output

Workflow

1. User enters ticket title and description.
2. Frontend sends request to backend API.
3. Backend invokes Python AI Engine.
4. AI analyzes ticket content.
5. Category is predicted.
6. Priority level is assigned.
7. Reason is generated.
8. Results are stored in SQLite Database.
9. Results are exported to CSV.
10. Dashboard displays final output.

---

Project Structure

Ticket-Triage-Agent
│
├── client
│   ├── src
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── server
│   ├── controllers
│   ├── routes
│   └── server.js
│
├── python_ai
│   ├── agent.py
│   ├── processor.py
│   └── tickets.json
│
├── database
│   └── tickets.db
│
├── output
│   ├── results.csv
│   └── results.json
│
├── README.md
└── requirements.txt

Features

- AI-powered ticket classification.
- Auto
  
 Project Links

GitHub Repository

https://github.com/Eeswara135/Ticket-Triage-Agent.git

Live Demo

https://ticket-triage-agent-gules.vercel.app/

Demo Video
