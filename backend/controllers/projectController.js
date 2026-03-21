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
import { deleteStoredImage, resolveUploadedImageData } from "../utils/uploadImage.js";

// Get all projects (with pagination)
export const getProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const [total, projects] = await Promise.all([
      Project.countDocuments(),
      Project.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    res.set("Cache-Control", "public, max-age=60, s-maxage=120");

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
    const project = await Project.findById(req.params.id).lean();
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.set("Cache-Control", "public, max-age=60, s-maxage=120");
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new project (with image upload)
export const createProject = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      const imageData = await resolveUploadedImageData(req.file, "tishbite-digital/projects");
      if (imageData?.image) {
        data.image = imageData.image;
        data.imagePublicId = imageData.imagePublicId;
      }
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
    const existingProject = await Project.findById(req.params.id);
    if (!existingProject) return res.status(404).json({ message: "Project not found" });

    const data = { ...req.body };
    if (req.file) {
      const imageData = await resolveUploadedImageData(req.file, "tishbite-digital/projects");
      if (imageData?.image) {
        data.image = imageData.image;
        data.imagePublicId = imageData.imagePublicId;
      }
    }

    const project = await Project.findByIdAndUpdate(req.params.id, data, { new: true });

    if (req.file) {
      await deleteStoredImage({
        image: existingProject.image,
        imagePublicId: existingProject.imagePublicId,
      });
    }

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

    await deleteStoredImage({ image: project.image, imagePublicId: project.imagePublicId });

    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
