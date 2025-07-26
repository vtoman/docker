const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const DATA_DIR = "/data";

// Configure multer to save files to /data
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, DATA_DIR),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

app.use(express.urlencoded({ extended: true }));

// Upload form
app.get("/", (req, res) => {
  fs.readdir(DATA_DIR, (err, files) => {
    if (err) {
      return res.status(500).send("Error reading directory: " + err.message);
    }

    const fileList = files.map((f) => `<li>${f}</li>`).join("");
    res.send(`
      <h1>Upload a File</h1>
      <form method="POST" enctype="multipart/form-data" action="/upload">
        <input type="file" name="file" />
        <button type="submit">Upload</button>
      </form>
      <h2>Files in /data</h2>
      <ul>${fileList}</ul>
    `);
  });
});

// Handle upload
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  res.redirect("/");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
