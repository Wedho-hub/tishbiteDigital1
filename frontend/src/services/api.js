// Basic admin login/logout API functions for AuthProvider
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

export function apiUrl(path) {
  if (!API_BASE_URL) return path;
  return `${API_BASE_URL}${path}`;
}

export function resolveUploadUrl(image) {
  if (!image) return "";
  const raw = String(image).trim();
  if (!raw) return "";

  const normalizedSlashes = raw.replace(/\\/g, "/");

  // Keep absolute URLs, but rewrite localhost upload URLs to current API base in production.
  if (normalizedSlashes.startsWith("http://") || normalizedSlashes.startsWith("https://")) {
    try {
      const parsed = new URL(normalizedSlashes);
      if ((parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") && parsed.pathname.startsWith("/uploads/")) {
        if (API_BASE_URL) return `${API_BASE_URL}${parsed.pathname}`;
        return parsed.pathname;
      }
    } catch {
      // If URL parsing fails, return raw value below via relative resolver.
    }

    return normalizedSlashes;
  }

  let normalized = normalizedSlashes;

  // Normalize absolute filesystem paths that contain an uploads segment.
  const uploadsIndex = normalized.toLowerCase().lastIndexOf("/uploads/");
  if (uploadsIndex >= 0) {
    normalized = normalized.slice(uploadsIndex + 1);
  }

  if (normalized.toLowerCase().startsWith("uploads/")) {
    normalized = `/${normalized}`;
  }

  if (!normalized.startsWith("/")) {
    normalized = `/uploads/${normalized}`;
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

// Prevent indefinite loading in production when backend is slow/cold.
export async function fetchWithTimeout(url, options = {}, timeoutMs = 30000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
      credentials: options.credentials || "include",
    });
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchWithTimeoutRetry(url, options = {}, timeoutMs = 30000, retries = 2) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await fetchWithTimeout(url, options, timeoutMs);
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, 350));
      }
    }
  }

  throw lastError;
}