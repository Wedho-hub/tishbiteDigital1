import { apiUrl, fetchWithCsrf } from "./api";
const API_BASE = "/api/services";

export async function getServices() {
  const res = await fetch(apiUrl(API_BASE));
  return res.json();
}

export async function getServiceById(id) {
  const res = await fetch(apiUrl(`${API_BASE}/${id}`));
  return res.json();
}

export async function createService(data) {
  const res = await fetchWithCsrf(apiUrl(API_BASE), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateService(id, data) {
  const res = await fetchWithCsrf(apiUrl(`${API_BASE}/${id}`), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteService(id) {
  const res = await fetchWithCsrf(apiUrl(`${API_BASE}/${id}`), {
    method: "DELETE"
  });
  return res.json();
}
