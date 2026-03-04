/**
 * Enquiry Controller
 * Handles CRUD operations for Enquiry model.
 *
 * Endpoints:
 *   - GET /api/enquiries         : Get all enquiries
 *   - GET /api/enquiries/:id     : Get a single enquiry by ID
 *   - POST /api/enquiries        : Create a new enquiry
 *   - DELETE /api/enquiries/:id  : Delete an enquiry
 */
import Enquiry from "../models/enquiry.js";

// Get all enquiries
export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single enquiry by ID
export const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) return res.status(404).json({ message: "Enquiry not found" });
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new enquiry
export const createEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json(enquiry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an enquiry
export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ message: "Enquiry not found" });
    res.json({ message: "Enquiry deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
