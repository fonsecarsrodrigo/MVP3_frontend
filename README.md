# Bora Orneles — Frontend

Frontend web app for managing customers and travel plans (Vite + React).

Summary
— Modular React app with pages for customer registration, travel-plan creation, client management and review.
— Built with React 18, Vite and React Router DOM; components are under `src/components`, pages under `src/pages` and form fragments under `src/forms`.

Quick Start

Requirements
- Node.js 18+ and npm

Install
```bash
npm install
```

Development
```bash
npm run dev
```
Open the URL shown by Vite.

Build / Preview
```bash
npm run build
npm run preview
```

Docker
```bash
# Build image
docker build -t bora-orneles .

# Run container on port 4173
docker run -p 4173:4173 bora-orneles

# Stop the container
docker stop $(docker ps -q --filter ancestor=bora-orneles)
```
Access the app at `http://127.0.0.1:4173`.

Project layout (important files)

| Path | Purpose |
|------|---------|
| `src/main.jsx` | App entry and Router mounting |
| `src/App.jsx` | Route definitions (composes pages) |
| `src/components/` | Reusable UI components (Button, BackButton, SiteHeader, FeedbackModal, etc.) |
| `src/pages/` | Page-level components (HomePage, ClientsPage, TravelPlansPage, NotFoundPage) |
| `src/forms/` | Form fragments used inside pages (CustomerFormFields, TravelPlanFormFields) |
| `src/index.css` | Global styles and table/card styles |
| `images/` | Static assets used by the UI |

Notes about runtime behavior
- The frontend currently communicates with a backend service expected at `http://127.0.0.1:5001` for customers and travel-plan operations.

Testing & verification
- Build: `npm run build` (verified locally after README update)

Repository
- Remote: https://github.com/fonsecarsrodrigo/MVP23_frontend.git
