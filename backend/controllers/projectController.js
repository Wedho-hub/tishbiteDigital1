/**
 * Project Controller
 * Handles CRUD operations for Project model.
 *
 * Endpoints:
 *   - GET /api/projects         : Get all projects
 *   - GET /api/projects/:id     : Get a single project by ID
 *   - POST /api/projects        : Create a new project
 *   - PUT /api/projects/:id     : Update a project
 *   - DELETE /api/projects/:id  : Delete a project
 */
import Project from "../models/project.js";

// Get all projects (with pagination)
export const getProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const total = await Project.countDocuments();
    const projects = await Project.find().skip(skip).limit(limit).sort({ createdAt: -1 });

    return res.json({
      data: projects,
      page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get a single project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new project (with image upload)
export const createProject = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.image = req.file.filename;
    }
    const project = await Project.create(data);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
