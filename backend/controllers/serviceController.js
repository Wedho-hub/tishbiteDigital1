/**
 * Service Controller
 * Handles CRUD operations for Service model.
 *
 * Endpoints:
 *   - GET /api/services         : Get all services
 *   - GET /api/services/:id     : Get a single service by ID
 *   - POST /api/services        : Create a new service
 *   - PUT /api/services/:id     : Update a service
 *   - DELETE /api/services/:id  : Delete a service
 */
import Service from "../models/service.js";
import { deleteStoredImage, resolveUploadedImageData } from "../utils/uploadImage.js";

const allowedCategories = new Set(["general", "bundle"]);

const normalizeCategory = (value) => {
  if (!value) return null;
  const normalized = String(value).toLowerCase().trim();
  return allowedCategories.has(normalized) ? normalized : null;
};

// Get all services
export const getServices = async (req, res) => {
  try {
    const hasCategoryFilter = Object.prototype.hasOwnProperty.call(req.query, "category");
    const requestedCategory = hasCategoryFilter ? normalizeCategory(req.query.category) : null;

    if (hasCategoryFilter && !requestedCategory) {
      return res.status(400).json({ message: "Invalid category. Use 'general' or 'bundle'." });
    }

    const filter = requestedCategory ? { category: requestedCategory } : {};

    const services = await Service.find(filter).sort({ category: 1, createdAt: -1 });
    return res.json(
      services.map((service) => ({
        ...service.toObject(),
        category: service.category || "general",
      }))
    );
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get a single service by ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new service
export const createService = async (req, res) => {
  try {
    const category = normalizeCategory(req.body.category);
    if (req.body.category && !category) {
      return res.status(400).json({ message: "Invalid category. Use 'general' or 'bundle'." });
    }

    const imageData = req.file
      ? await resolveUploadedImageData(req.file, "tishbite-digital/services")
      : null;

    const service = await Service.create({
      ...req.body,
      category: category || "general",
      ...(imageData?.image ? { image: imageData.image } : {}),
      ...(imageData?.imagePublicId ? { imagePublicId: imageData.imagePublicId } : {}),
    });

    return res.status(201).json(service);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// Update a service
export const updateService = async (req, res) => {
  try {
    const existingService = await Service.findById(req.params.id);
    if (!existingService) return res.status(404).json({ message: "Service not found" });

    const updateData = { ...req.body };

    if (req.file) {
      const imageData = await resolveUploadedImageData(req.file, "tishbite-digital/services");
      if (imageData?.image) {
        updateData.image = imageData.image;
        updateData.imagePublicId = imageData.imagePublicId;
      }
    }

    if (Object.prototype.hasOwnProperty.call(updateData, "category")) {
      const category = normalizeCategory(updateData.category);
      if (!category) {
        return res.status(400).json({ message: "Invalid category. Use 'general' or 'bundle'." });
      }
      updateData.category = category;
    }

    const service = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });

    if (req.file) {
      await deleteStoredImage({
        image: existingService.image,
        imagePublicId: existingService.imagePublicId,
      });
    }

    return res.json({
      ...service.toObject(),
      category: service.category || "general",
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// Delete a service
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    await deleteStoredImage({ image: service.image, imagePublicId: service.imagePublicId });

    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
