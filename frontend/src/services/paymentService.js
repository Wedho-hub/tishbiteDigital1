import { apiUrl, fetchWithCsrf } from "./api";

/**
 * Send customer details to the backend, which generates signed PayFast params.
 * Returns { pfUrl, params } to use for form submission.
 */
export async function initiatePayment(data) {
  const res = await fetchWithCsrf(apiUrl("/api/payments/initiate"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to initiate payment.");
  }

  return res.json();
}
