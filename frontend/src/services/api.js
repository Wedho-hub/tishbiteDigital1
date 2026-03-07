// Basic admin login/logout API functions for AuthProvider
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

export function apiUrl(path) {
  if (!API_BASE_URL) return path;
  return `${API_BASE_URL}${path}`;
}

export function resolveUploadUrl(image) {
  if (!image) return "";
  if (image.startsWith("http://") || image.startsWith("https://")) return image;

  let normalized = image.trim();
  if (!normalized) return "";

  if (!normalized.startsWith("/")) {
    normalized = normalized.startsWith("uploads/")
      ? `/${normalized}`
      : `/uploads/${normalized}`;
  }

  if (!API_BASE_URL) return normalized;
  return `${API_BASE_URL}${normalized}`;
}

export async function loginAdmin(email, password) {
  const res = await fetchWithCsrf(apiUrl("/api/auth/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    return { success: false, error: data };
  }

  return data;
}

export async function logoutAdmin() {
  const res = await fetchWithCsrf(apiUrl("/api/auth/logout"), {
    method: "POST" // or GET if your backend expects GET
  });
  return res.json();
}
let csrfToken = null;

// Call this once at app startup or before any state-changing request
export async function fetchCsrfToken() {
  const res = await fetch(apiUrl("/api/csrf-token"), { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch CSRF token");
  const data = await res.json();
  csrfToken = data.csrfToken;
  return csrfToken;
}

export async function fetchWithCsrf(url, options = {}) {
  // If not set, try to fetch it (should be called explicitly before login, etc.)
  if (!csrfToken) await fetchCsrfToken();
  let headers = {};
  if (options.headers) {
    if (options.headers instanceof Headers) {
      options.headers.forEach((value, key) => {
        headers[key] = value;
      });
    } else {
      headers = { ...options.headers };
    }
  }
  if (csrfToken) headers["x-csrf-token"] = csrfToken;
  return fetch(url, {
    ...options,
    headers,
    credentials: "include"
  });
}