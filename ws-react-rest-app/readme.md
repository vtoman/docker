# React + Express WebSocket Demo with Docker Compose

This repository contains a **minimal full-stack example** showing how to combine:

- **Express** REST API with automatic **Swagger** documentation
- **WebSockets (Socket.IO)** for real-time push notifications & acknowledgements
- **React** frontend built with **Vite**
- **Docker Compose** to run both services with a single command

---

## Features

### Backend (`/backend`)

- **REST endpoints**
  - `POST /messages` – add a message (JSON body `{ "message": "..." }`)
  - `GET  /messages` – return an array of stored messages
  - `DELETE /messages` – remove all stored messages
- **In-memory storage** – perfect for a quick demo (no database required)
- **Socket.IO server** – broadcasts every new message to all connected clients and
  waits for a `received` acknowledgement back
- **Swagger UI** available at `http://localhost:4000/api-docs`

### Frontend (`/frontend`)

- **React** app created with Vite
- Talks to the backend using **Axios (REST)** and **Socket.IO client (WebSocket)**
- Live-updates the list when messages arrive from the server
- Simple UI: add message, list messages, clear all messages

### Infrastructure

- **Docker** images for both services
- **docker-compose.yml** wires them together – no manual setup needed

---

## Quick start

Prerequisites: **Docker Desktop** or Docker Engine + Docker Compose.

```bash
# clone & enter the repo …
# then run:
docker-compose up --build
```

When the build finishes open:

- App & API – <http://localhost:3000>
- Swagger docs – <http://localhost:3000/api-docs>

Add a few messages in the UI and watch them pop up instantly in every browser tab thanks to WebSockets.

---

## Project structure

```
.
├── backend             # Node/Express/Socket.IO service
│   ├── Dockerfile
│   ├── package.json
│   └── src
│       └── index.js
├── frontend            # Vite/React client
│   ├── Dockerfile
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src
│       ├── App.jsx
│       └── main.jsx
└── docker-compose.yml  # orchestration
```

Feel free to extend the example – swap memory for a real database, add authentication, deploy to the cloud… it’s a solid starting point 🚀
