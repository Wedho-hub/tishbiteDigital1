import { apiUrl, fetchWithCsrf, fetchWithTimeoutRetry } from "./api";
const API_BASE = "/api/enquiries";

async function parseJsonResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Enquiry request failed");
  }
  return data;
}

export async function getEnquiries() {
  const res = await fetchWithTimeoutRetry(apiUrl(API_BASE), { credentials: "include" }, 30000, 2);
  return parseJsonResponse(res);
}

export async function getEnquiryById(id) {
  const res = await fetchWithTimeoutRetry(apiUrl(`${API_BASE}/${id}`), { credentials: "include" }, 30000, 2);
  return parseJsonResponse(res);
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
  return parseJsonResponse(res);
}
