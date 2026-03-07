/**
 * Project Routes
 * Defines API endpoints for project-related operations.
 *
 * Endpoints:
 *   - GET /api/projects         : Get all projects
 *   - GET /api/projects/:id     : Get a single project by ID
 *   - POST /api/projects        : Create a new project
 *   - PUT /api/projects/:id     : Update a project
 *   - DELETE /api/projects/:id  : Delete a project
 */
import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", protectAdmin, upload.single("image"), createProject);
router.put("/:id", protectAdmin, upload.single("image"), updateProject);
router.delete("/:id", protectAdmin, deleteProject);

export default router;
