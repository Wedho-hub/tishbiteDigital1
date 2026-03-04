import React from "react";
import Navbar from "../common/navbar/Navbar";
import Footer from "../common/footer/Footer";
import { Outlet } from "react-router-dom";

const PublicLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

export default PublicLayout;
