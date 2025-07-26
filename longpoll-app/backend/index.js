const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(__dirname, "public");

app.use(bodyParser.json());
app.use(express.static(DATA_DIR));

// Message store
let messages = [];
let clients = [];

function notifyClients() {
  clients.forEach((res) => res.json(messages));
  clients = [];
}

// POST /api/messages – add a message
app.post("/api/messages", (req, res) => {
  const { message } = req.body;
  if (typeof message !== "string")
    return res.status(400).json({ error: "Invalid message" });

  messages.push(message);
  notifyClients();
  res.status(201).json({ status: "ok" });
});

// GET /api/messages – get all messages
app.get("/api/messages", (req, res) => {
  res.json(messages);
});

// GET /api/messages/longpoll – long poll for updates
app.get("/api/messages/longpoll", (req, res) => {
  clients.push(res);

  // Timeout in case no new messages arrive
  setTimeout(() => {
    const idx = clients.indexOf(res);
    if (idx !== -1 && !res.headersSent) {
      clients.splice(idx, 1);
      res.json(messages); // fallback response
    }
  }, 30000); // 30 seconds
});

// Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Fallback to React app
app.use((req, res) => {
  res.sendFile(path.join(DATA_DIR, "index.html"));
});

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
