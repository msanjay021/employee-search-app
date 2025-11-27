# Employee Search App (MVP)
A simple employee search application built using Angular (standalone components) for the frontend and JSON Server as a lightweight mock backend.


## What it does
    Small Angular app with a search form and results table. Data is served from a mock REST API (json-server).
    Search employees by first name, last name, position, or phone number
    Perform partial and flexible phone number search
    Reset filters easily
    Work with a minimal but real-world architecture (MVP)

## Project Overview
    This project was designed following MVP principles:
    Keep the product minimal but valuable
    Avoid unnecessary complexity
    Deliver a clean user experience
    Use technologies that solve the problem efficiently instead of over-engineering
    The result is a well-structured, easy-to-run application that demonstrates frontend + mock backend integration.

## Stack
- Frontend: Angular + TypeScript
- Backend (mock): json-server

## Run locally
1. git clone https://github.com/msanjay021/employee-search-app.git
   cd employee-search-app

2. Start mock API:
   cd backend
   npx json-server --watch db.json --port 3000

3. Start frontend:
   cd frontend
   npm install
   ng serve --open

4. Open http://localhost:4200

## Short Explanation of Design Decisions:
1. Standalone Components (Angular 17):
    Since Angular supports fully standalone components, using AppModule was unnecessary.

2. Client-Side Filtering Instead of json-server _like:
    json-server _like queries were not working consistently due to version differences.
    To ensure: Partial search, Case-insensitive search, Flexible phone matching, Moved filtering into the EmployeeService, ensuring predictable results regardless of backend limitations.

3. MVP Approach:
    intentionally avoided UI frameworks, Complex API design
