import { getToken } from "../auth/token";

const API_BASE_URL = "http://localhost:8080";

export async function apiRequest(
    path: string,
    options: RequestInit = {}
) {

    const token = getToken();

    const headers = new Headers(options.headers);

    headers.set("Content-Type", "application/json");

    if (token) {
        headers.set(
            "Authorization",
            `Bearer ${token}`
        );
    }

    const response = await fetch(
        `${API_BASE_URL}${path}`,
        {
            ...options,
            headers
        }
    );

    return response;
}