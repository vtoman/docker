import React, { useEffect, useState } from "react";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  const poll = async () => {
    try {
      const res = await fetch("/api/messages/longpoll");
      const data = await res.json();
      setMessages(data);
      poll(); // restart long poll
    } catch (err) {
      console.error("Polling error:", err);
      setTimeout(poll, 1000); // retry after short delay
    }
  };

  useEffect(() => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then(setMessages);
    poll();
  }, []);

  const send = async (e) => {
    e.preventDefault();
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: newMsg }),
    });
    setNewMsg("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Messages</h1>
      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
      <form onSubmit={send}>
        <input value={newMsg} onChange={(e) => setNewMsg(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
