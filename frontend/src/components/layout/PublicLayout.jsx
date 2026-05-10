import React, { useEffect } from "react";
import Navbar from "../common/navbar/Navbar";
import Footer from "../common/footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import WhatsAppFloat from "../common/whatsappFloat/WhatsAppFloat";
import { getServices } from "../../services/serviceService";
import { getProjects } from "../../services/projectService";
import { getBlogPosts } from "../../services/blogService";

const PublicLayout = () => {
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;

    const warmPublicCaches = () => {
      if (cancelled) return;

      Promise.allSettled([
        getServices(),
        getProjects(1),
        getBlogPosts(1, { summary: true, limit: 10 }),
      ]).catch(() => {
        // Warmup is best-effort only; UI handles fetch errors per page.
      });
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(warmPublicCaches, { timeout: 1500 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(idleId);
      };
    }

    const timer = setTimeout(warmPublicCaches, 500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main-content" tabIndex="-1" className="public-main">
        <div key={location.pathname} className="page-transition-wrap">
          <Outlet />
        </div>
      </main>
      <WhatsAppFloat />
      <Footer />
    </>
  );
};

export default PublicLayout;
