/**
 * Monitoring & Analytics Middleware
 * Logs basic request analytics and can be extended for external services (e.g., Sentry).
 * Usage: Place before routes in app.js.
 */
export const analytics = (req, res, next) => {
  // Example: log endpoint and method
  console.log(`[Analytics] ${req.method} ${req.originalUrl}`);
  // Integrate with Sentry, Google Analytics, etc. here
  next();
};
