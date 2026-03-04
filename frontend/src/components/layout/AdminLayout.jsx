import React from "react";
import Sidebar from "../common/sideBar/SideBar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => (
  <div className="d-flex">
    <Sidebar />
    <main className="flex-grow-1 p-4 bg-white min-vh-100">
      <Outlet />
    </main>
  </div>
);

export default AdminLayout;
