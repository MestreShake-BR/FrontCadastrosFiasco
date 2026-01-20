
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export function setToken(token) {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
}

export function getToken() {
    return localStorage.getItem("token");
}

async function request(path, options = {}) {
    const token = getToken();

    const resp = await fetch(`${BASE_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        ...options
    });

    if (!resp.ok) {
        throw new Error(`HTTP ${resp.status}`);
    }

    return resp.json();
}

export const api = {
    get: (path) => request(path),
    post: (path, body) => request(path, {
        method: "POST",
        body: JSON.stringify(body)
    })
};
