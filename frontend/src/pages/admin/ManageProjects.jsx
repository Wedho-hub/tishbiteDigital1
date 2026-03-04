import React, { useEffect, useState } from "react";
import { isNotEmpty } from "../../utils/validate";
import { getProjects, createProject, updateProject, deleteProject } from "../../services/projectService";
import "./admin.css";


const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProjects = async (pageNum = 1) => {
    const res = await getProjects(pageNum);
    setProjects(res.data || res);
    setTotalPages(res.totalPages || 1);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const res = await getProjects(page);
      if (isMounted) {
        setProjects(res.data || res);
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
    if (!isNotEmpty(description)) {
      setError("Description cannot be empty.");
      return;
    }
    // URL is optional, but if present, should be a valid URL
    if (url && !/^https?:\/\//i.test(url)) {
      setError("Please enter a valid URL (must start with http:// or https://)");
      return;
    }
    try {
      if (editing) {
        await updateProject(editing, { title, description, link: url });
      } else {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        if (url) formData.append("link", url);
        if (image) formData.append("image", image);
        await createProject(formData, true);
      }
      setTitle(""); setDescription(""); setUrl(""); setImage(null); setEditing(null); setError("");
      fetchProjects(page);
    } catch {
      setError("Error saving project");
    }
  };

  const handleEdit = (project) => {
    setEditing(project._id);
    setTitle(project.title);
    setDescription(project.description);
    setUrl(project.link || "");
  };

  const handleDelete = async (id) => {
    await deleteProject(id);
    fetchProjects();
  };

  return (
    <div className="admin-projects-card">
      <h2>Manage Projects</h2>
      <form className="project-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <p className="markdown-hint">Markdown supported (example: `- item 1`, `- item 2`, and paragraphs).</p>
        <textarea className="markdown-input" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description (Markdown supported)" required />
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Project URL (https://...)" type="url" />
        <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
        <div className="project-form-actions">
          <button type="submit">{editing ? "Update" : "Create"}</button>
          {editing && <button type="button" className="cancel-btn" onClick={() => { setEditing(null); setTitle(""); setDescription(""); setUrl(""); setImage(null); }}>Cancel</button>}
        </div>
        {error && <div className="error">{error}</div>}
      </form>
      <ul className="project-list">
        {projects.map(project => (
          <li key={project._id}>
            <b>{project.title}</b>
            <div className="project-list-actions">
              <button className="edit-btn" onClick={() => handleEdit(project)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(project._id)}>Delete</button>
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

export default ManageProjects;
