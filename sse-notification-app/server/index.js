const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- SSE implementation ---
let clients = [];

app.get("/api/stream", (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.flushHeaders();

  const clientId = Date.now();
  clients.push({ id: clientId, res });

  req.on("close", () => {
    clients = clients.filter((c) => c.id !== clientId);
  });
});

function sendEvents(data) {
  clients.forEach((c) => c.res.write(`data: ${JSON.stringify(data)}\n\n`));
}

let counter = 0;
setInterval(() => {
  counter += 1;
  sendEvents({
    message: `Hello world ${counter}`,
    timestamp: new Date().toISOString(),
  });
}, 5000);

// --- REST endpoint to push custom messages ---
app.post("/api/message", (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message required in JSON body" });
  }
  const data = { message, timestamp: new Date().toISOString() };
  sendEvents(data);
  res.status(202).json({ status: "sent", data });
});

// Serve static React app
app.use(express.static(__dirname + "/public"));

// For any other route, serve index.html (SPA)
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
