/**
 * BlogPost Controller
 * Handles CRUD operations for BlogPost model.
 *
 * Endpoints:
 *   - GET /api/blogposts         : Get all blog posts
 *   - GET /api/blogposts/:id     : Get a single blog post by ID
 *   - POST /api/blogposts        : Create a new blog post
 *   - PUT /api/blogposts/:id     : Update a blog post
 *   - DELETE /api/blogposts/:id  : Delete a blog post
 */
import BlogPost from "../models/blogpost.js";

// Get all blog posts (with pagination)
export const getBlogPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const total = await BlogPost.countDocuments();
    const posts = await BlogPost.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    res.json({
      data: posts,
      page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single blog post by ID
export const getBlogPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Blog post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new blog post (with image upload)
export const createBlogPost = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.image = req.file.filename;
    }
    const post = await BlogPost.create(data);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a blog post
export const updateBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ message: "Blog post not found" });
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a blog post
export const deleteBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Blog post not found" });
    res.json({ message: "Blog post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
