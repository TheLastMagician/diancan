# AGENTS.md

## Cursor Cloud specific instructions

This is a monorepo with a shared Express backend and two frontends (web + WeChat Mini Program). No database, no Docker, no external services required.

### Services

| Service | Port | Start Command (from root) |
|---------|------|---------------------------|
| Backend (Express) | 3001 | `npm run dev:backend` |
| Frontend Web (Vite + React) | 5173 | `npm run dev:frontend` |
| Mini Program H5 (Taro) | 10086 | `npm run dev:miniprogram` |

### Key Notes

- The backend must be running before starting either frontend (both proxy `/api` to `localhost:3001`).
- Lint: `npm run lint` (in `frontend/`). Only the web frontend has ESLint configured.
- Build web: `npm run build` (from root or `frontend/`).
- Build mini program for WeChat: `npm run build:miniprogram:weapp` (output in `miniprogram/dist/weapp/`, open with WeChat DevTools).
- Build mini program for web: `npm run build:miniprogram:h5`.
- The backend stores all data in-memory (no persistence across restarts).
- The Taro H5 dev server port (10086) may auto-increment if occupied; check terminal output.
- See `README.md` for API endpoints and project structure.
