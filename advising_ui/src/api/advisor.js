const API = "http://127.0.0.1:8000";

// Check backend connection
export async function testConnection() {
    const response = await fetch(`${API}/health`);

    if (!response.ok) {
        throw new Error("Backend unavailable");
    }

    return await response.json();
}

// Send chat message to FastAPI
export async function sendMessage(message, sessionId) {
    const response = await fetch(`${API}/advisor/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            session_id: sessionId,
            message: message,
        }),
    });

    if (!response.ok) {
        throw new Error("Unable to contact advisor");
    }

    return await response.json();
}