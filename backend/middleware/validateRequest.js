/**
 * Validation Middleware
 * Uses express-validator to validate incoming requests.
 * Usage: Add validation chains in your route, then use validateRequest as the last middleware.
 */
import { validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
