import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

function ChatPanel({
  messages,
  loading,
  onSendMessage,
}) {
  return (
    <section className="chat-panel">

      <div className="chat-header">
        <h2>AI Academic Advisor</h2>

        <p>
          Ask questions about degree requirements,
          graduation planning, prerequisites, or course recommendations.
        </p>
      </div>

      <div className="chat-messages">

        {messages.length === 0 ? (
          <div className="chat-empty-state">

            <h3>Welcome!</h3>

            <p>
              Start a conversation by asking a question or
              uploading your unofficial transcript.
            </p>

            <div className="chat-suggestions">

              <button className="suggestion">
                What courses should I take next semester?
              </button>

              <button className="suggestion">
                Am I on track to graduate?
              </button>

              <button className="suggestion">
                What GEP requirements do I still need?
              </button>

              <button className="suggestion">
                Build me the fastest graduation plan.
              </button>

            </div>

          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
            />
          ))
        )}

        {loading && (
          <div className="typing-indicator">

            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>

          </div>
        )}

      </div>

      <ChatInput
        onSend={onSendMessage}
        loading={loading}
      />

    </section>
  );
}

export default ChatPanel;