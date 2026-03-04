import { apiUrl, fetchWithCsrf } from "./api";
const API_BASE = "/api/blogposts";

export async function getBlogPosts(page = 1) {
  const res = await fetch(apiUrl(`${API_BASE}?page=${page}`));
  return res.json();
}

export async function getBlogPostById(id) {
  const res = await fetch(apiUrl(`${API_BASE}/${id}`));
  return res.json();
}

export async function createBlogPost(data, isFormData = false) {
  const res = await fetchWithCsrf(apiUrl(API_BASE), {
    method: "POST",
    headers: isFormData ? undefined : { "Content-Type": "application/json" },
    body: isFormData ? data : JSON.stringify(data)
  });
  return res.json();
}

export async function updateBlogPost(id, data) {
  const res = await fetchWithCsrf(apiUrl(`${API_BASE}/${id}`), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteBlogPost(id) {
  const res = await fetchWithCsrf(apiUrl(`${API_BASE}/${id}`), {
    method: "DELETE"
  });
  return res.json();
}
