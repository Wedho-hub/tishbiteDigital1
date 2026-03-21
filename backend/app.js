import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import compression from "compression";
import { csrfProtection, csrfCookie, csrfTokenEndpoint } from "./middleware/csrf.js";
import authRoutes from "./routes/authRoutes.js";
import blogPostRoutes from "./routes/blogPostRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import seoRoutes from "./routes/seoRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

const isProduction = process.env.NODE_ENV === "production";
const normalizeOrigin = (origin) => origin?.replace(/\/$/, "");
const defaultOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
].map(normalizeOrigin);
const envOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => normalizeOrigin(origin.trim()))
  .filter(Boolean);
const allowedOrigins = [...new Set([...defaultOrigins, ...envOrigins])];

// Serve uploaded assets
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  maxAge: "1d",
  etag: true,
}));

// Parse cookies FIRST
app.use(cookieParser());

// Parse JSON and urlencoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compress API and frontend responses to improve transfer performance.
app.use(compression());

// CORS MUST be before any route or CSRF middleware
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (curl, health checks, same-origin requests)
    if (!origin) return callback(null, true);

    const normalized = normalizeOrigin(origin);
    if (allowedOrigins.includes(normalized)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "x-csrf-token"],
  optionsSuccessStatus: 204,
}));

// Trust proxy in production (Render/managed proxies)
if (isProduction) {
  app.set("trust proxy", 1);
}

// Set CSRF cookie only for API GET/HEAD/OPTIONS requests (after CORS)
app.use("/api", csrfCookie);

// Helmet for security
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// CSRF protection for API state-changing requests
app.use("/api", csrfProtection);

// Expose CSRF token for frontend
app.get("/api/csrf-token", csrfTokenEndpoint);

// Fail fast when DB is not ready (prevents Mongoose buffering timeout 500s)
app.use("/api", (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: "Database unavailable. Please try again shortly." });
  }
  next();
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/blogposts", blogPostRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/projects", projectRoutes);

// Ops endpoints
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", environment: process.env.NODE_ENV || "development" });
});

// SEO routes
app.use("/", seoRoutes);

// Ensure unknown API routes never fall through to frontend HTML
app.use("/api", (req, res) => {
  return res.status(404).json({ message: "API route not found" });
});

// Error handler LAST
app.use(errorHandler);

// Serve frontend static files only when frontend build exists (single-service deployments)
const frontendDistPath = path.join(__dirname, "../frontend/dist");
const frontendIndexPath = path.join(frontendDistPath, "index.html");
const hasFrontendBuild = fs.existsSync(frontendIndexPath);

if (hasFrontendBuild) {
  app.use(express.static(frontendDistPath, {
    maxAge: "7d",
    etag: true,
  }));
  app.use((req, res) => {
    res.sendFile(frontendIndexPath);
  });
}

export default app;
