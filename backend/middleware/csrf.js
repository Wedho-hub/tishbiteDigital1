// CSRF middleware using @edge-csrf/express
import crypto from "crypto";

const isProduction = process.env.NODE_ENV === "production";
const allowCrossSiteCookies = process.env.COOKIE_SAMESITE === "none";

function cookieOptions() {
  return {
    httpOnly: false,
    sameSite: allowCrossSiteCookies ? "none" : "strict",
    secure: allowCrossSiteCookies || isProduction,
    path: "/",
  };
}

// Generate a random CSRF token
function generateCsrfToken() {
  return crypto.randomBytes(32).toString("hex");
}

// Middleware to set CSRF token cookie for GET requests
export function csrfCookie(req, res, next) {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    if (!req.cookies.csrfToken) {
      const token = generateCsrfToken();
      res.cookie("csrfToken", token, cookieOptions());
      req.cookies.csrfToken = token;
    }
  }
  next();
}

// Middleware to validate CSRF token for state-changing requests
export function csrfProtection(req, res, next) {
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    const tokenFromCookie = req.cookies.csrfToken;
    const tokenFromHeader = req.headers["x-csrf-token"] || req.body._csrf;
    if (!tokenFromCookie || !tokenFromHeader || tokenFromCookie !== tokenFromHeader) {
      return res.status(403).json({ message: "Invalid or missing CSRF token" });
    }
  }
  next();
}

// Endpoint to expose CSRF token to frontend
export function csrfTokenEndpoint(req, res) {
  res.json({ csrfToken: req.cookies.csrfToken });
}
