import React from "react";
import { Helmet } from "react-helmet-async";
import Sidebar from "../common/sideBar/SideBar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => (
  <>
    <Helmet>
      {/* Block all protected admin pages from Google's index */}
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <div className="d-flex">
      <Sidebar />
      <main className="flex-grow-1 p-4 bg-white min-vh-100">
        <Outlet />
      </main>
    </div>
  </>
);

export default AdminLayout;
