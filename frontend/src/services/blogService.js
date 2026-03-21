import { apiUrl, fetchWithCsrf } from "./api";
const API_BASE = "/api/blogposts";
const CACHE_TTL_MS = 60 * 1000;
const blogCache = new Map();

const getCached = (key) => {
  const entry = blogCache.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    blogCache.delete(key);
    return null;
  }

  return entry.value;
};

const setCached = (key, value) => {
  blogCache.set(key, { value, expiresAt: Date.now() + CACHE_TTL_MS });
};

const clearBlogCache = () => {
  blogCache.clear();
};

async function parseJsonResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Blog request failed");
  }
  return data;
}

export async function getBlogPosts(page = 1) {
  const cacheKey = `list:${page}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const res = await fetch(apiUrl(`${API_BASE}?page=${page}`));
  const data = await parseJsonResponse(res);
  setCached(cacheKey, data);
  return data;
}

export async function getBlogPostById(id) {
  const cacheKey = `detail:${id}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const res = await fetch(apiUrl(`${API_BASE}/${id}`));
  const data = await parseJsonResponse(res);
  setCached(cacheKey, data);
  return data;
}

export async function createBlogPost(data, isFormData = false) {
  const res = await fetchWithCsrf(apiUrl(API_BASE), {
    method: "POST",
    headers: isFormData ? undefined : { "Content-Type": "application/json" },
    body: isFormData ? data : JSON.stringify(data)
  });
  const result = await parseJsonResponse(res);
  clearBlogCache();
  return result;
}

export async function updateBlogPost(id, data, isFormData = false) {
  const res = await fetchWithCsrf(apiUrl(`${API_BASE}/${id}`), {
    method: "PUT",
    headers: isFormData ? undefined : { "Content-Type": "application/json" },
    body: isFormData ? data : JSON.stringify(data)
  });
  const result = await parseJsonResponse(res);
  clearBlogCache();
  return result;
}

export async function deleteBlogPost(id) {
  const res = await fetchWithCsrf(apiUrl(`${API_BASE}/${id}`), {
    method: "DELETE"
  });
  const result = await parseJsonResponse(res);
  clearBlogCache();
  return result;
}
