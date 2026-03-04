/**
 * Enquiry Routes
 * Defines API endpoints for enquiry-related operations.
 *
 * Endpoints:
 *   - GET /api/enquiries         : Get all enquiries
 *   - GET /api/enquiries/:id     : Get a single enquiry by ID
 *   - POST /api/enquiries        : Create a new enquiry
 *   - DELETE /api/enquiries/:id  : Delete an enquiry
 */
import express from "express";
import {
  getEnquiries,
  getEnquiryById,
  createEnquiry,
  deleteEnquiry,
} from "../controllers/enquiryController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protectAdmin, getEnquiries);
router.get("/:id", protectAdmin, getEnquiryById);
router.post("/", createEnquiry); // Public route for contact form
router.delete("/:id", protectAdmin, deleteEnquiry);

export default router;
