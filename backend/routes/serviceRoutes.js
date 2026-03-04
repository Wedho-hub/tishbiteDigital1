/**
 * Service Routes
 * Defines API endpoints for service-related operations.
 *
 * Endpoints:
 *   - GET /api/services         : Get all services
 *   - GET /api/services/:id     : Get a single service by ID
 *   - POST /api/services        : Create a new service
 *   - PUT /api/services/:id     : Update a service
 *   - DELETE /api/services/:id  : Delete a service
 */
import express from "express";
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getServices);
router.get("/:id", getServiceById);
router.post("/", protectAdmin, upload.single("image"), createService);
router.put("/:id", protectAdmin, upload.single("image"), updateService);
router.delete("/:id", protectAdmin, deleteService);

export default router;
