import { apiUrl, fetchWithCsrf } from "./api";
const API_BASE = "/api/services";
const CACHE_TTL_MS = 60 * 1000;
const serviceCache = new Map();

const getCached = (key) => {
  const entry = serviceCache.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    serviceCache.delete(key);
    return null;
  }

  return entry.value;
};

const setCached = (key, value) => {
  serviceCache.set(key, { value, expiresAt: Date.now() + CACHE_TTL_MS });
};

const clearServiceCache = () => {
  serviceCache.clear();
};

async function parseJsonResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Service request failed");
  }
  return data;
}

export async function getServices() {
  const cacheKey = "list:all";
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const res = await fetch(apiUrl(API_BASE));
  const data = await parseJsonResponse(res);
  setCached(cacheKey, data);
  return data;
}

export async function getServiceById(id) {
  const cacheKey = `detail:${id}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const res = await fetch(apiUrl(`${API_BASE}/${id}`));
  const data = await parseJsonResponse(res);
  setCached(cacheKey, data);
  return data;
}

export async function createService(data) {
  const res = await fetchWithCsrf(apiUrl(API_BASE), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const result = await parseJsonResponse(res);
  clearServiceCache();
  return result;
}

export async function updateService(id, data) {
  const res = await fetchWithCsrf(apiUrl(`${API_BASE}/${id}`), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const result = await parseJsonResponse(res);
  clearServiceCache();
  return result;
}

export async function deleteService(id) {
  const res = await fetchWithCsrf(apiUrl(`${API_BASE}/${id}`), {
    method: "DELETE"
  });
  const result = await parseJsonResponse(res);
  clearServiceCache();
  return result;
}
