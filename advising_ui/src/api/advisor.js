const API = "http://localhost:8000";

export async function testConnection() {
    const response = await fetch(API);
    return response.json();
}