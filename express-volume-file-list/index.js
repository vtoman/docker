const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const DATA_DIR = "/data";

app.get("/", (req, res) => {
  fs.readdir(DATA_DIR, (err, files) => {
    if (err) {
      return res.status(500).send("Error reading directory: " + err.message);
    }
    res.send(
      `<h1>Files in ${DATA_DIR}</h1><ul>` +
        files.map((f) => `<li>${f}</li>`).join("") +
        `</ul>`
    );
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
