/**
 * Rate Limiting Middleware
 * Uses express-rate-limit to limit repeated requests to public APIs.
 * Adjust windowMs and max as needed for your use case.
 */
import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});
