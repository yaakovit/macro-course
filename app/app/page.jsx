'use client';
import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const askAI = async () => {
    const res = await fetch("/api/tutor", {
      method: "POST",
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <div style={{ padding: "40px", direction: "rtl" }}>
      <h1>קורס מאקרו כלכלה</h1>

      <h2>🤖 עוזר אישי</h2>

      <input
        style={{ width: "300px", padding: "10px" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="שאל שאלה..."
      />

      <button onClick={askAI} style={{ marginRight: "10px" }}>
        שאל
      </button>

      <p>{response}</p>
    </div>
  );
}
