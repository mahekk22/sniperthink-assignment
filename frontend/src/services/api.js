// frontend/src/services/api.js

const API_URL = "https://sniperthink-assignment.onrender.com/api/interest";

export const submitInterest = async (data) => {
    const response = await fetch(`${API_URL}/api/interest`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("Failed to submit interest");
    }

    return response.json();
};
