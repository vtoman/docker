const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const swaggerUi = require("swagger-ui-express");

// Simple OpenAPI spec for the three endpoints
const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "File Manager API",
    version: "1.0.0",
  },
  paths: {
    "/api/files": {
      get: {
        summary: "List files in storage volume",
        responses: {
          200: {
            description: "Array of file names",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    "/api/upload": {
      post: {
        summary: "Upload a file",
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  file: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "File uploaded" },
        },
      },
    },
    "/api/download/{filename}": {
      get: {
        summary: "Download a file",
        parameters: [
          {
            name: "filename",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "File download" },
          404: { description: "File not found" },
        },
      },
    },
  },
};

const app = express();
const DATA_DIR = "/data";
const PUBLIC_DIR = path.join(__dirname, "public");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, DATA_DIR),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

// Static React frontend
app.use(express.static(PUBLIC_DIR));

// Swagger UI endpoint
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// REST: List files
app.get("/api/files", (req, res) => {
  fs.readdir(DATA_DIR, (err, files) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(files);
  });
});

// REST: Upload
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.status(201).json({ filename: req.file.originalname });
});

// REST: Download
app.get("/api/download/:filename", (req, res) => {
  const filePath = path.join(DATA_DIR, req.params.filename);
  res.download(filePath);
});

// Serve React fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
