import { apiUrl, fetchWithCsrf } from "./api";
const API_BASE = "/api/projects";
const CACHE_TTL_MS = 60 * 1000;
const projectCache = new Map();

const getCached = (key) => {
  const entry = projectCache.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    projectCache.delete(key);
    return null;
  }

  return entry.value;
};

const setCached = (key, value) => {
  projectCache.set(key, { value, expiresAt: Date.now() + CACHE_TTL_MS });
};

const clearProjectCache = () => {
  projectCache.clear();
};

async function parseJsonResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Project request failed");
  }
  return data;
}

export async function getProjects(page = 1) {
  const cacheKey = `list:${page}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const res = await fetch(apiUrl(`${API_BASE}?page=${page}`));
  const data = await parseJsonResponse(res);
  setCached(cacheKey, data);
  return data;
}

export async function getProjectById(id) {
  const cacheKey = `detail:${id}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const res = await fetch(apiUrl(`${API_BASE}/${id}`));
  const data = await parseJsonResponse(res);
  setCached(cacheKey, data);
  return data;
}

export async function createProject(data, isFormData = false) {
  const res = await fetchWithCsrf(apiUrl(API_BASE), {
    method: "POST",
    headers: isFormData ? undefined : { "Content-Type": "application/json" },
    body: isFormData ? data : JSON.stringify(data)
  });
  const result = await parseJsonResponse(res);
  clearProjectCache();
  return result;
}

export async function updateProject(id, data, isFormData = false) {
  const res = await fetchWithCsrf(apiUrl(`${API_BASE}/${id}`), {
    method: "PUT",
    headers: isFormData ? undefined : { "Content-Type": "application/json" },
    body: isFormData ? data : JSON.stringify(data)
  });
  const result = await parseJsonResponse(res);
  clearProjectCache();
  return result;
}

export async function deleteProject(id) {
  const res = await fetchWithCsrf(apiUrl(`${API_BASE}/${id}`), {
    method: "DELETE"
  });
  const result = await parseJsonResponse(res);
  clearProjectCache();
  return result;
}
