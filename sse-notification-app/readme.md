## Getting started

1. Ensure you have Docker and Docker Compose installed.
2. Clone this repository and navigate to its root.
3. Build and start the full stack with:

```bash
docker compose up --build
```

The first run may take a couple of minutes while the image is built and dependencies are installed.

Once the container is running:

- Browse to `http://localhost:3000` to open the React UI and watch messages arrive every 5 seconds.
- Explore the API documentation at `http://localhost:3000/api-docs` (powered by Swagger UI).

### What’s inside?

| Path                  | Purpose                                                             |
| --------------------- | ------------------------------------------------------------------- |
| `server/`             | Express server exposing the SSE endpoint and serving static assets  |
| `server/index.js`     | Main server file with SSE logic                                     |
| `server/swagger.json` | Minimal OpenAPI definition for the SSE endpoint                     |
| `client/index.html`   | Lightweight React front-end connecting via `EventSource`            |
| `Dockerfile`          | Container image definition (single image for server + built client) |
| `docker-compose.yml`  | Orchestrates the application for local use                          |

### Sending custom messages

Use the REST endpoint to broadcast your own message to all connected clients:

```bash
curl -X POST http://localhost:3000/api/message \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello from CURL"}'
```

You can also try it from Swagger UI (`POST /api/message`).

### Stopping the stack

Press `Ctrl + C` in the terminal where Compose is running or execute:

```bash
docker compose down
```

Enjoy experimenting with Server-Sent Events!
