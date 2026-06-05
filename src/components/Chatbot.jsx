import { useState } from "react";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMessage },
    ]);

    setMessage("");

    const API = import.meta.env.VITE_API_URL || "http://localhost:5001";
    const response = await fetch(`${API}/chat`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        message: userMessage,
      }),
    });

    const data = await response.json();

    setMessages((prev) => [
      ...prev,
      { role: "bot", text: data.reply },
    ]);
  };

  return (
    <div>
      <h1>AI Fashion Stylist</h1>

      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <b>{msg.role}:</b> {msg.text}
          </p>
        ))}
      </div>

      <input
        type="text"
        placeholder="Ask about fashion..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

export default Chatbot;