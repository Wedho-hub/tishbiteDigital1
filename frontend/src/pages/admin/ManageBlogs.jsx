import React, { useEffect, useState } from "react";
import { isNotEmpty } from "../../utils/validate";
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from "../../services/blogService";
import { resolveUploadUrl } from "../../services/api";
import "./admin.css";


const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getBlogPosts(1, { summary: false, all: true, admin: true });
      setBlogs(res.data || []);
    } catch (err) {
      setError(err.message || "Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file || null);
    setImagePreview(file ? URL.createObjectURL(file) : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    if (!isNotEmpty(title)) {
      setError("Title cannot be empty.");
      return;
    }
    if (!isNotEmpty(content)) {
      setError("Content cannot be empty.");
      return;
    }
    try {
      setIsSubmitting(true);
      setError("");
      if (editing) {
        if (image) {
          const formData = new FormData();
          formData.append("title", title);
          formData.append("content", content);
          formData.append("image", image);
          await updateBlogPost(editing, formData, true);
        } else {
          await updateBlogPost(editing, { title, content });
        }
      } else {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) formData.append("image", image);
        await createBlogPost(formData, true);
      }
      setTitle("");
      setContent("");
      setImage(null);
      setImagePreview("");
      setCurrentImageUrl("");
      setEditing(null);
      setError("");
      setSuccessMessage(editing ? "Blog post updated successfully." : "Blog post created successfully.");
      fetchBlogs();
    } catch (err) {
      setError(err.message || "Error saving blog post");
      setSuccessMessage("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (blog) => {
    setEditing(blog._id);
    setTitle(blog.title);
    setContent(blog.content);
    setCurrentImageUrl(resolveUploadUrl(blog.image) || "");
    setImage(null);
    setImagePreview("");
    setSuccessMessage("");
    setError("");
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlogPost(id);
      fetchBlogs();
    } catch (err) {
      setError(err.message || "Failed to delete blog post");
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setTitle("");
    setContent("");
    setImage(null);
    setImagePreview("");
    setCurrentImageUrl("");
    setSuccessMessage("");
    setError("");
  };

  return (
    <div className="admin-page-card">
      <h2>Manage Blogs</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" aria-busy={isSubmitting}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required disabled={isSubmitting} />
        <p className="markdown-hint">Markdown supported (example: `- bullet`, `**bold**`, blank line for new paragraph).</p>
        <textarea className="markdown-input" value={content} onChange={e => setContent(e.target.value)} placeholder="Content (Markdown supported)" required disabled={isSubmitting} />

        {editing && currentImageUrl && !imagePreview && (
          <div className="admin-img-preview">
            <p className="markdown-hint">Current image:</p>
            <img src={currentImageUrl} alt="Current blog" className="admin-thumb" />
          </div>
        )}
        {imagePreview && (
          <div className="admin-img-preview">
            <p className="markdown-hint">New image preview:</p>
            <img src={imagePreview} alt="New upload preview" className="admin-thumb" />
          </div>
        )}

        <input type="file" accept="image/*" onChange={handleImageChange} disabled={isSubmitting} />
        <p className="markdown-hint">Image upload limit: 5MB. Accepted: JPEG, PNG, GIF, WebP.</p>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (editing ? "Updating..." : "Creating...") : (editing ? "Update" : "Create")}
        </button>
        {editing && <button type="button" className="cancel-btn" disabled={isSubmitting} onClick={handleCancel}>Cancel</button>}
        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
      </form>
      <ul className="admin-list">
        {loading && <li>Loading blog posts...</li>}
        {!loading && blogs.length === 0 && <li>No blog posts found.</li>}
        {blogs.map(blog => (
          <li key={blog._id}>
            <div className="admin-blog-info">
              {blog.image && (
                <img src={resolveUploadUrl(blog.image)} alt={blog.title} className="admin-blog-thumb" />
              )}
              <b>{blog.title}</b>
            </div>
            <div className="admin-list-actions">
              <button className="edit-btn" onClick={() => handleEdit(blog)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(blog._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBlogs;
