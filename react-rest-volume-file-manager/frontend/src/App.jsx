import React, { useState, useEffect } from "react";

export default function App() {
  const [files, setFiles] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("/api/files")
      .then((res) => res.json())
      .then(setFiles);
  }, []);

  const upload = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", selected);

    await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    setSelected(null);
    const updated = await fetch("/api/files").then((res) => res.json());
    setFiles(updated);
  };

  return (
    <div style={{ padding: "2em" }}>
      <h2>Upload File</h2>
      <form onSubmit={upload}>
        <input type="file" onChange={(e) => setSelected(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>

      <h2>Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file}>
            {file} –{" "}
            <a href={`/api/download/${file}`} download>
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
