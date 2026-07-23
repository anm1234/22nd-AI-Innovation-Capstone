const API = "http://127.0.0.1:8000";

export async function uploadTranscript(file) {

    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(`${API}/upload-transcript`, {
        method: "POST",
        body: formData
    });

    return await response.json();
}