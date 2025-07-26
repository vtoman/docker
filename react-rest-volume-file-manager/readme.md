# React-Express File Manager

A minimal full-stack example that stores files in a Docker volume, exposes a small REST API, and serves a React UI **from the same Express server on port 3000**.

---

## Features

- 📂 Upload files, list and download them from a persistent volume (`mydata`).
- ⚛️ Front-end built with Vite + React, bundled during the Docker build.
- 🛠️ REST API served under `/api/*` by the same Express instance.
- 📜 Auto-generated Swagger UI at **`/docs`** for easy exploration & testing.

---

## Quick Start (Docker Compose)

```bash
# build the images and start the stack
docker compose up -d --build
```

Then open:

- **http://localhost:3000** – React application (also hosts the API)
- **http://localhost:3000/docs** – Swagger UI with interactive API docs

Stop everything with:

```bash
docker compose down
```

---

## Local Development (hot-reloading)

Run the frontend and backend separately for a faster feedback loop.

### 1. Backend (API + static hosting)

```bash
cd backend
npm install        # only first time
npm start          # runs on http://localhost:3000
```

### 2. Frontend (Vite dev server)

```bash
cd frontend
npm install        # only first time
npm run dev        # runs on http://localhost:5173
```

The Vite dev server proxies calls starting with `/api` to `localhost:3000` (configured in `frontend/vite.config.js`), so the React app continues to work without code changes.

---

## API Endpoints

| Verb | Path                       | Description                             |
| ---- | -------------------------- | --------------------------------------- |
| GET  | `/api/files`               | List all uploaded files                 |
| POST | `/api/upload`              | Upload a new file (multipart/form-data) |
| GET  | `/api/download/{filename}` | Download the specified file             |

Full request/response schemas are visible in Swagger UI.

---

## Project Structure

```
backend/            # Express API, Dockerfile (multi-stage build)
  └── public/       # React build output copied here during image build
frontend/           # React source (Vite, JSX)
  └── src/
docker-compose.yml  # single service called "web" (UI + API + volume)
```
