# 12kebaad - Student path finder (skeleton)
This repository is a starter skeleton for **12kebaad** — a site to help students choose courses and institutions after Class 12.

## What you get
- Frontend: React (Vite) + Tailwind (UI skeleton)
- Backend: Express + MongoDB (Mongoose)
- Seed script with sample courses and institutions
- Instructions to run locally and deploy on free hosting

## Run locally (development)

### Backend
1. Go to `backend/`
2. Copy `.env.example` to `.env` and set `MONGO_URI` (or run a local MongoDB)
3. Install and run:
```bash
cd backend
npm install
npm run seed   # seed sample data (optional)
npm run dev
```
Backend will run on port 5000 by default.

### Frontend
1. Go to `frontend/`
2. Install and run:
```bash
cd frontend
npm install
npm run dev
```
Frontend Vite dev server runs on port 5173 (default). To connect frontend to backend in dev, prefix API calls with `/api` and use a proxy or set `VITE_API_BASE` in `.env`.

## Deploy (free)
- Frontend: Vercel or Netlify (connect GitHub repo)
- Backend: Render.com (free web service) or Cyclic.sh
- DB: MongoDB Atlas free tier

## Notes
- This is a skeleton with the core flows and a simple aesthetic using Tailwind.
- You can expand datasets by using the batch `/api/institutions/batch` and `/api/courses/batch` endpoints.
- Add admin auth before exposing admin routes in production.

---
Good luck! If you want, I can now:
1. Add an admin UI
2. Add mapping script to import large CSVs
3. Generate a GitHub-ready zip with CI configs
