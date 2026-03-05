import { apiUrl, fetchWithCsrf } from "./api";
const API_BASE = "/api/blogposts";

async function parseJsonResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Blog request failed");
  }
  return data;
}

export async function getBlogPosts(page = 1) {
  const res = await fetch(apiUrl(`${API_BASE}?page=${page}`));
  return parseJsonResponse(res);
}

export async function getBlogPostById(id) {
  const res = await fetch(apiUrl(`${API_BASE}/${id}`));
  return parseJsonResponse(res);
}

export async function createBlogPost(data, isFormData = false) {
  const res = await fetchWithCsrf(apiUrl(API_BASE), {
    method: "POST",
    headers: isFormData ? undefined : { "Content-Type": "application/json" },
    body: isFormData ? data : JSON.stringify(data)
  });
  return parseJsonResponse(res);
}

export async function updateBlogPost(id, data, isFormData = false) {
  const res = await fetchWithCsrf(apiUrl(`${API_BASE}/${id}`), {
    method: "PUT",
    headers: isFormData ? undefined : { "Content-Type": "application/json" },
    body: isFormData ? data : JSON.stringify(data)
  });
  return parseJsonResponse(res);
}

export async function deleteBlogPost(id) {
  const res = await fetchWithCsrf(apiUrl(`${API_BASE}/${id}`), {
    method: "DELETE"
  });
  return parseJsonResponse(res);
}
