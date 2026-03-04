
import "./sideBar.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const adminLinks = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "🏠" },
  { to: "/admin/blogs", label: "Blogs", icon: "📝" },
  { to: "/admin/projects", label: "Projects", icon: "📁" },
  { to: "/admin/services", label: "Services", icon: "🛠️" },
  { to: "/admin/enquiries", label: "Enquiries", icon: "📬" },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <span className="sidebar-logo">🛡️</span>
        <span className="sidebar-title">Admin</span>
      </div>
      <ul className="sidebar-nav">
        {adminLinks.map(link => (
          <li key={link.to} className={location.pathname === link.to ? "active" : ""}>
            <Link to={link.to} className="sidebar-link">
              <span className="sidebar-icon">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
