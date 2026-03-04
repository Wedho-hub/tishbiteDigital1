import React from "react";
import { useAuth } from "../../context/AuthProvider.jsx";
import { Link } from "react-router-dom";
import "./admin.css";

const Dashboard = () => {
  const { logout, admin } = useAuth();

  return (
    <div className="admin-dashboard dashboard-card">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-welcome">
        <span className="dashboard-avatar">👤</span>
        <div>
          <p className="dashboard-greeting">Welcome, <b>{admin?.email || "Admin"}</b>!</p>
          <button className="dashboard-logout" onClick={logout}>Logout</button>
        </div>
      </div>
      <nav className="dashboard-nav">
        <Link className="dashboard-nav-btn" to="/admin/blogs">Manage Blogs</Link>
        <Link className="dashboard-nav-btn" to="/admin/projects">Manage Projects</Link>
        <Link className="dashboard-nav-btn" to="/admin/services">Manage Services</Link>
        <Link className="dashboard-nav-btn" to="/admin/enquiries">Manage Enquiries</Link>
      </nav>
    </div>
  );
};

export default Dashboard;
