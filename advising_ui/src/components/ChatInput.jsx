import { useState } from "react";

function ChatInput({ onSend, loading }) {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    const text = message.trim();

    if (!text || loading) return;

    onSend(text);
    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-input-container">

      <textarea
        className="chat-input"
        placeholder="Ask about your degree requirements, courses, graduation plan..."
        value={message}
        disabled={loading}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={3}
      />

      <button
        className="chat-send-button"
        onClick={sendMessage}
        disabled={loading || message.trim() === ""}
      >
        {loading ? "Thinking..." : "Send"}
      </button>

    </div>
  );
}

export default ChatInput;