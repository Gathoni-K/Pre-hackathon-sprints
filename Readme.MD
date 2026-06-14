```markdown
# Hackathon Prep: Sprint 0

## Project Overview
This repository is dedicated to a pre-hackathon learning sprint. The goal of this project is to familiarize ourselves with our chosen tech stack, establish a smooth Git workflow, and iron out integration issues before the clock starts ticking at the actual hackathon.

---

## Tech Stack and Roles

| Developer | Role | Tech Stack / Tools to Learn |
| :--- | :--- | :--- |
| GRACE | Backend Developer | e.g., Node.js, Express, Supabase, Vercel AI SDK, Postman |
| ABBIE | Frontend Developer | e.g., React, Vite, Tailwind CSS, Axios |

---

## Repository Structure
We are using a Monorepo structure to keep our frontend and backend sandbox environments in one place:

```text
project-root/
├── backend/          # Backend server, APIs, and database configurations
├── frontend/         # Frontend UI components, styling, and state management
└── README.md         # Documentation and sprint tracking

```

---

## Sprint Objectives

Before the hackathon begins, we want to successfully achieve the following milestones:

* [ ] Git Mastery: Successfully create branches, commit code, and merge a Pull Request without breaking the project.
* [ ] Environment Setup: Successfully initialize the local development environments for both frontend and backend.
* [ ] The Connection: Build a simple API endpoint on the backend and successfully fetch that data from the frontend (proving our tools can talk to each other).

---

## Git Workflow Guide

To avoid code conflicts during the sprint and the hackathon, we follow this workflow:

1. Pull the latest changes from the main branch:
git checkout main
git pull origin main
2. Create your feature branch:
git checkout -b feature/your-feature-name
3. Work on your code inside your designated folder (/frontend or /backend).
4. Stage and commit your changes:
git add .
git commit -m "feat: added X feature"
5. Push your branch to the remote repository:
git push -u origin feature/your-feature-name
6. Open a Pull Request (PR) on GitHub to merge your branch into main.

```

```