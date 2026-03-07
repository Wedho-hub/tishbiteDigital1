import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/common/pageHeader/PageHeader";
import { motion } from "framer-motion";
import "./notFound.css";

const NotFound = () => (
  <>
    <PageHeader title="404 - Page Not Found" subtitle="The page you are looking for does not exist." background="light" />
    <motion.section
      className="not-found-wrap container"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08, duration: 0.35 }}>
        Try going back to the homepage or explore our services and projects.
      </motion.p>
      <div className="not-found-actions">
        <Link className="not-found-btn" to="/">Go Home</Link>
      </div>
    </motion.section>
  </>
);

export default NotFound;
