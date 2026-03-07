import { apiUrl, fetchWithCsrf } from "./api";
const API_BASE = "/api/projects";

export async function getProjects(page = 1) {
  const res = await fetch(apiUrl(`${API_BASE}?page=${page}`));
  return res.json();
}

export async function getProjectById(id) {
  const res = await fetch(apiUrl(`${API_BASE}/${id}`));
  return res.json();
}

export async function createProject(data, isFormData = false) {
  const res = await fetchWithCsrf(apiUrl(API_BASE), {
    method: "POST",
    headers: isFormData ? undefined : { "Content-Type": "application/json" },
    body: isFormData ? data : JSON.stringify(data)
  });
  return res.json();
}

export async function updateProject(id, data, isFormData = false) {
  const res = await fetchWithCsrf(apiUrl(`${API_BASE}/${id}`), {
    method: "PUT",
    headers: isFormData ? undefined : { "Content-Type": "application/json" },
    body: isFormData ? data : JSON.stringify(data)
  });
  return res.json();
}

export async function deleteProject(id) {
  const res = await fetchWithCsrf(apiUrl(`${API_BASE}/${id}`), {
    method: "DELETE"
  });
  return res.json();
}
