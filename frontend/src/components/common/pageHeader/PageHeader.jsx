import "./pageHeader.css";
import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const PageHeader = ({
  title,
  subtitle,
  align = "center",
  background = "light",
}) => {
  const bgClass = background === "dark" ? "page-header-dark" : "page-header-light";
  const titleId = `page-header-${String(title || "title")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
  // motion is used below, so ESLint should not report unused
  return (
    <section className={`page-header ${bgClass} py-5`} role="region" aria-labelledby={titleId}>
      <div className="container">
        {/* motion.div is used here */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-${align}`}
        >
          <h1 id={titleId} className="page-header-title">{title}</h1>
          {subtitle && (
            <motion.p
              className="page-header-subtitle mt-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {subtitle}
            </motion.p>
          )}
          <motion.div
            className="page-header-divider mt-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.2, rotate: 90 }}
          >
            <FaArrowRight />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeader;
