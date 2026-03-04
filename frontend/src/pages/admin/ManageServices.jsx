import React, { useEffect, useState } from "react";
import { isNotEmpty } from "../../utils/validate";
import { getServices, createService, updateService, deleteService } from "../../services/serviceService";
import "./admin.css";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("general");
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  const fetchServices = async () => {
    setServices(await getServices());
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const data = await getServices();
      if (isMounted) setServices(data);
    };
    fetchData();
    return () => { isMounted = false; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Frontend validation
    if (!isNotEmpty(title)) {
      setError("Title cannot be empty.");
      return;
    }
    if (!isNotEmpty(description)) {
      setError("Description cannot be empty.");
      return;
    }
    try {
      if (editing) {
        await updateService(editing, { title, category, description });
      } else {
        await createService({ title, category, description });
      }
      setTitle(""); setCategory("general"); setDescription(""); setEditing(null); setError("");
      fetchServices();
    } catch {
      setError("Error saving service");
    }
  };

  const handleEdit = (service) => {
    setEditing(service._id);
    setTitle(service.title);
    setCategory(service.category || "general");
    setDescription(service.description);
  };

  const handleDelete = async (id) => {
    await deleteService(id);
    fetchServices();
  };

  return (
    <div className="admin-page-card">
      <h2>Manage Services</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <select value={category} onChange={e => setCategory(e.target.value)} required>
          <option value="general">General Service</option>
          <option value="bundle">Bundled Service</option>
        </select>
        <p className="markdown-hint">Markdown supported (lists, headings, links, and multi-paragraph content).</p>
        <textarea className="markdown-input" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description (Markdown supported)" required />
        <button type="submit">{editing ? "Update" : "Create"}</button>
        {editing && <button type="button" className="cancel-btn" onClick={() => { setEditing(null); setTitle(""); setCategory("general"); setDescription(""); }}>Cancel</button>}
        {error && <div className="error">{error}</div>}
      </form>
      <ul className="admin-list">
        {services.map(service => (
          <li key={service._id}>
            <div>
              <b>{service.title}</b>
              <span className={`service-category-pill ${service.category || "general"}`}>
                {(service.category || "general") === "bundle" ? "Bundle" : "General"}
              </span>
            </div>
            <div className="admin-list-actions">
              <button className="edit-btn" onClick={() => handleEdit(service)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(service._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageServices;
