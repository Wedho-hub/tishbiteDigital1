/**
 * File Upload Middleware
 * Uses multer for handling file uploads (e.g., images for blog posts/projects).
 * Usage: Add upload.single('image') or upload.array('images') to your route.
 */
import multer from "multer";
import path from "path";
import { isCloudinaryConfigured } from "../config/cloudinary.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const cloudinaryStorage = multer.memoryStorage();

// File type and size validation
const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const maxSizeMB = Number(process.env.UPLOAD_MAX_SIZE_MB) || 5;
const maxSize = maxSizeMB * 1024 * 1024;

function fileFilter(req, file, cb) {
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only image files are allowed (jpeg, png, gif, webp)"), false);
  }
  cb(null, true);
}

export const upload = multer({
  storage: isCloudinaryConfigured() ? cloudinaryStorage : storage,
  fileFilter,
  limits: { fileSize: maxSize }
});
