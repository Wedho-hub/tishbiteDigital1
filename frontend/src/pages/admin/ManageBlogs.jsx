import React, { useEffect, useState } from "react";
import { isNotEmpty } from "../../utils/validate";
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from "../../services/blogService";
import "./admin.css";


const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = async (pageNum = 1) => {
    const res = await getBlogPosts(pageNum);
    setBlogs(res.data || res);
    setTotalPages(res.totalPages || 1);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const res = await getBlogPosts(page);
      if (isMounted) {
        setBlogs(res.data || res);
        setTotalPages(res.totalPages || 1);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isNotEmpty(title)) {
      setError("Title cannot be empty.");
      return;
    }
    if (!isNotEmpty(content)) {
      setError("Content cannot be empty.");
      return;
    }
    try {
      if (editing) {
        await updateBlogPost(editing, { title, content });
      } else {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) formData.append("image", image);
        await createBlogPost(formData, true);
      }
      setTitle(""); setContent(""); setImage(null); setEditing(null); setError("");
      fetchBlogs(page);
    } catch {
      setError("Error saving blog post");
    }
  };

  const handleEdit = (blog) => {
    setEditing(blog._id);
    setTitle(blog.title);
    setContent(blog.content);
  };

  const handleDelete = async (id) => {
    await deleteBlogPost(id);
    fetchBlogs();
  };

  return (
    <div className="admin-page-card">
      <h2>Manage Blogs</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <p className="markdown-hint">Markdown supported (example: `- bullet`, `**bold**`, blank line for new paragraph).</p>
        <textarea className="markdown-input" value={content} onChange={e => setContent(e.target.value)} placeholder="Content (Markdown supported)" required />
        <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
        <button type="submit">{editing ? "Update" : "Create"}</button>
        {editing && <button type="button" className="cancel-btn" onClick={() => { setEditing(null); setTitle(""); setContent(""); setImage(null); }}>Cancel</button>}
        {error && <div className="error">{error}</div>}
      </form>
      <ul className="admin-list">
        {blogs.map(blog => (
          <li key={blog._id}>
            <b>{blog.title}</b>
            <div className="admin-list-actions">
              <button className="edit-btn" onClick={() => handleEdit(blog)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(blog._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination mt-3">
        <button className="pagination-btn" disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span className="mx-2">Page {page} of {totalPages}</span>
        <button className="pagination-btn" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default ManageBlogs;
