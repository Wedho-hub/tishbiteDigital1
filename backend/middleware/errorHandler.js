/**
 * Error Handling Middleware
 * Centralizes error handling for the Express app.
 * Place after all routes in app.js.
 */
export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.status || 500;
  const isProduction = process.env.NODE_ENV === "production";

  console.error("[Error]", {
    time: new Date().toISOString(),
    statusCode,
    method: req.method,
    path: req.originalUrl,
    errorType: err.name,
    message: err.message,
    stack: isProduction ? undefined : err.stack,
  });

  return res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    errorType: err.name,
    path: req.originalUrl,
    method: req.method,
    stack: isProduction ? undefined : err.stack,
  });
};
