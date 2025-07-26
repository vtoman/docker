import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const apiUrl = import.meta.env.VITE_API_URL || window.location.origin;
const socket = io(apiUrl);

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Initial fetch
    fetchMessages();

    // Socket listeners
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
      socket.emit("received", msg);
    });

    socket.on("cleared", () => setMessages([]));

    return () => {
      socket.off("message");
      socket.off("cleared");
    };
  }, []);

  const fetchMessages = async () => {
    const res = await axios.get(`${apiUrl}/messages`);
    setMessages(res.data);
  };

  const addMessage = async () => {
    if (!newMessage.trim()) return;
    await axios.post(`${apiUrl}/messages`, { message: newMessage });
    setNewMessage("");
  };

  const clearMessages = async () => {
    await axios.delete(`${apiUrl}/messages`);
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h1>Messages Demo</h1>
      <div style={{ marginBottom: "1rem" }}>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter message"
          style={{ padding: "0.5rem", width: "250px" }}
          onKeyDown={(e) => e.key === "Enter" && addMessage()}
        />
        <button onClick={addMessage} style={{ marginLeft: "0.5rem" }}>
          Send
        </button>
        <button onClick={clearMessages} style={{ marginLeft: "0.5rem" }}>
          Clear All
        </button>
      </div>
      <ul>
        {messages.map((m, idx) => (
          <li key={idx}>{m}</li>
        ))}
      </ul>
      <p>
        REST API at <code>{apiUrl}</code> | Swagger at{" "}
        <code>{apiUrl}/api-docs</code>
      </p>
    </div>
  );
}

export default App;
