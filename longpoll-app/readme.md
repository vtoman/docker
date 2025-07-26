# Long-Polling Message Board Example

A minimal full-stack example that demonstrates **long polling** with a Node/Express backend and a Vite + React frontend.  
The project ships with Docker Compose so you can be up and running in seconds.

---

## ✨ Features

- 📡 **Long polling** endpoint that pushes new messages to connected clients in real-time.
- ⚙️ **Express API** with in-memory storage – no database required.
- 📝 **Swagger UI** exposed at `/api/docs` for interactive API exploration.
- ⚛️ **React** front-end built with Vite (bundled straight into the backend’s `public/` folder).
- 🐳 **Docker Compose** workflow for a reproducible, single-command start-up.

---

## 🗂 Project layout

```
longpoll-app/
├─ backend/          # Express server, Swagger definition, production assets
│  ├─ index.js       # REST endpoints & long-poll implementation
│  └─ swagger.js     # OpenAPI 3.0 description
├─ frontend/         # Vite + React app (compiled during docker build)
│  └─ src/           # React source code
└─ docker-compose.yml
```

---

## 🏃‍♂️ Quick start (recommended)

All you need is Docker 🐳:

```bash
# build & run both services
docker compose up --build
```

- React UI – <http://localhost:3000>
- Swagger docs – <http://localhost:3000/api/docs>

The Compose file mounts the source code into the containers, so every change you make locally is visible immediately (refresh the browser for the frontend, restart the container for backend code changes).

---

## 💻 Running locally without Docker

Prefer to run things natively? You’ll need **Node 18+** and **npm**.

1. Backend:
   ```bash
   cd backend
   npm install        # installs express, body-parser, swagger-ui-express
   node index.js      # listens on :3000
   ```
2. Frontend (in a second terminal):
   ```bash
   cd frontend
   npm install        # installs React, Vite & plugins
   npm run dev        # Vite dev-server on :5173
   ```

When developing locally the React app proxies `/api/*` calls to `http://localhost:3000` (see `vite.config.js`).

---

## 🔌 API reference

| Method | Endpoint                 | Description                                                                             |
| ------ | ------------------------ | --------------------------------------------------------------------------------------- |
| GET    | `/api/messages`          | Retrieve the full message list                                                          |
| POST   | `/api/messages`          | Append a new message – body: `{ "message": "hello" }`                                   |
| GET    | `/api/messages/longpoll` | Long-polling endpoint – the request **hangs** until new messages arrive or 30 s timeout |

### Example using `curl`

```bash
# Send a message
curl -X POST http://localhost:3000/api/messages \
     -H "Content-Type: application/json" \
     -d '{"message":"Hello World"}'
```

Interactive examples are also available in the Swagger UI.

---

## 🛠 How it works (high-level)

1. **Client** starts a persistent request to `/api/messages/longpoll`.
2. **Server** stores the `res` objects of all pending clients.
3. When **someone posts** to `/api/messages`, the server pushes the updated message list to every stored response and clears the list – clients instantly receive data.
4. Each client immediately re-issues a fresh long-poll request, achieving near real-time updates over plain HTTP.

This technique is a simpler alternative to WebSockets that works everywhere an HTTP connection is possible.

---

## 🤝 Contributing

Pull requests are welcome! Feel free to open an issue if you spot a bug or have an idea to improve the example.

---

## 📄 License

MIT
