import React from "react";
import Navbar from "../common/navbar/Navbar";
import Footer from "../common/footer/Footer";
import { Outlet } from "react-router-dom";

const PublicLayout = () => (
  <>
    <a href="#main-content" className="skip-link">Skip to main content</a>
    <Navbar />
    <main id="main-content" tabIndex="-1">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default PublicLayout;
