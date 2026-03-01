# AGENTS.md

## Cursor Cloud specific instructions

This is a simple monorepo with two Node.js services — no database, no Docker, no external services required.

| Service | Port | Start Command (from root) |
|---------|------|---------------------------|
| Backend (Express) | 3001 | `npm run dev:backend` |
| Frontend (Vite + React) | 5173 | `npm run dev:frontend` |

- The Vite dev server proxies `/api` requests to `http://localhost:3001`, so the backend must be running before testing the frontend.
- Lint: `npm run lint` (in `frontend/`). Only the frontend has ESLint configured.
- Build: `npm run build` (from root or `frontend/`).
- The backend stores all data in-memory (no persistence across restarts).
- See `README.md` for API endpoints and project structure.
