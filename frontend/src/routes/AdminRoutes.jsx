import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";
import ManageBlogs from "../pages/admin/ManageBlogs.jsx";
import ManageProjects from "../pages/admin/ManageProjects.jsx";
import ManageServices from "../pages/admin/ManageServices.jsx";
import ManageEnquiries from "../pages/admin/ManageEnquiries.jsx";
import AdminLayout from "../components/layout/AdminLayout.jsx";

const RequireAuth = ({ children }) => {
  const { admin, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return admin ? children : <Navigate to="/admin/login" />;
};

const AdminRoutes = () => (
  <Routes>
    {/* Redirect /admin to /admin/login if not authenticated */}
    <Route path="" element={<Navigate to="/admin/login" />} />
    <Route
      element={
        <RequireAuth>
          <AdminLayout />
        </RequireAuth>
      }
    >
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="blogs" element={<ManageBlogs />} />
      <Route path="projects" element={<ManageProjects />} />
      <Route path="services" element={<ManageServices />} />
      <Route path="enquiries" element={<ManageEnquiries />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
