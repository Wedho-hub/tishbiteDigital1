/**
 * Error Handling Middleware
 * Centralizes error handling for the Express app.
 * Place after all routes in app.js.
 */
export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = err.status || 500;
  let message = err.message || "Internal Server Error";

  if (err?.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      const maxSizeMB = Number(process.env.UPLOAD_MAX_SIZE_MB) || 5;
      statusCode = 413;
      message = `Image too large. Maximum allowed size is ${maxSizeMB}MB.`;
    } else {
      statusCode = 400;
      message = "Invalid file upload request.";
    }
  }

  const isProduction = process.env.NODE_ENV === "production";

  console.error("[Error]", {
    time: new Date().toISOString(),
    statusCode,
    method: req.method,
    path: req.originalUrl,
    errorType: err.name,
    message,
    stack: isProduction ? undefined : err.stack,
  });

  return res.status(statusCode).json({
    message,
    errorType: err.name,
    path: req.originalUrl,
    method: req.method,
    stack: isProduction ? undefined : err.stack,
  });
};
