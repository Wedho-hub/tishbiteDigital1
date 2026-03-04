// Simple validation helpers
export function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isNotEmpty(value) {
  return value && value.trim().length > 0;
}
