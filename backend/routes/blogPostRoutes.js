/**
 * BlogPost Routes
 * Defines API endpoints for blog post-related operations.
 *
 * Endpoints:
 *   - GET /api/blogposts         : Get all blog posts
 *   - GET /api/blogposts/:id     : Get a single blog post by ID
 *   - POST /api/blogposts        : Create a new blog post
 *   - PUT /api/blogposts/:id     : Update a blog post
 *   - DELETE /api/blogposts/:id  : Delete a blog post
 */
import express from "express";
import {
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "../controllers/blogPostController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getBlogPosts);
router.get("/:id", getBlogPostById);
router.post("/", protectAdmin, upload.single("image"), createBlogPost);
router.put("/:id", protectAdmin, updateBlogPost);
router.delete("/:id", protectAdmin, deleteBlogPost);

export default router;
