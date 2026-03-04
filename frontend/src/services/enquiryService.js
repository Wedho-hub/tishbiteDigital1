import { apiUrl, fetchWithCsrf } from "./api";
const API_BASE = "/api/enquiries";

export async function getEnquiries() {
  const res = await fetch(apiUrl(API_BASE), { credentials: "include" });
  return res.json();
}

export async function getEnquiryById(id) {
  const res = await fetch(apiUrl(`${API_BASE}/${id}`), { credentials: "include" });
  return res.json();
}

export async function createEnquiry(data) {
  const res = await fetchWithCsrf(apiUrl(API_BASE), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteEnquiry(id) {
  const res = await fetchWithCsrf(apiUrl(`${API_BASE}/${id}`), {
    method: "DELETE"
  });
  return res.json();
}
