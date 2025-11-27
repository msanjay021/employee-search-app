# employee-search-app
A simple employee search application built using Angular (standalone components) for the frontend and JSON Server as a lightweight mock backend.


# Employee Search App (MVP)

## What it does
Small Angular app with a search form and results table. Data is served from a mock REST API (json-server).

## Run locally
1. Start mock API:
   cd backend
   npx json-server --watch db.json --port 3000

2. Start frontend:
   cd frontend
   npm install
   ng serve --open

Open http://localhost:4200

## Stack
- Frontend: Angular + TypeScript
- Backend (mock): json-server
