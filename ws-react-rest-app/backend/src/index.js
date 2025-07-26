const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

// Serve static frontend
const FRONTEND_DIR = path.join(__dirname, "..", "frontend", "dist");
app.use(express.static(FRONTEND_DIR));

// In-memory storage for demo purposes
const messages = [];

/**
 * @openapi
 * /messages:
 *   post:
 *     summary: Add a new message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *   get:
 *     summary: Get all messages
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *   delete:
 *     summary: Delete all messages
 *     responses:
 *       200:
 *         description: Cleared
 */

// REST endpoints
app.post("/messages", (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  messages.push(message);
  io.emit("message", message); // push to clients via WebSocket
  return res.status(201).json({ status: "ok" });
});

app.get("/messages", (req, res) => {
  return res.json(messages);
});

app.delete("/messages", (req, res) => {
  messages.length = 0;
  io.emit("cleared");
  return res.json({ status: "cleared" });
});

// WebSocket events
io.on("connection", (socket) => {
  console.log("client connected", socket.id);
  socket.on("received", (payload) => {
    console.log("client acknowledged message:", payload);
  });
  socket.on("disconnect", () => console.log("client disconnected", socket.id));
});

// Swagger setup
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Messages API",
      version: "1.0.0",
    },
  },
  apis: [__filename],
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Catch-all: serve React after all API & docs routes
app.get("*", (_, res) => {
  res.sendFile(path.join(FRONTEND_DIR, "index.html"));
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
