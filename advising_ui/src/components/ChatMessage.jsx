function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`chat-message ${
        isUser ? "chat-message-user" : "chat-message-assistant"
      }`}
    >
      <div className="chat-message-content">
        <div className="chat-message-header">
          {isUser ? "You" : "AI Academic Advisor"}
        </div>

        <div className="chat-message-text">
          {message.content}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;