import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./errorPage.css";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="error-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05, duration: 0.3 }}>
        Oops! Something went wrong
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12, duration: 0.35 }}>
        Sorry, an unexpected error has occurred.<br />Please try again later or return to the homepage.
      </motion.p>
      <div className="error-actions">
        <button className="error-btn" onClick={() => navigate("/")}>Go Home</button>
      </div>
    </motion.div>
  );
};

export default ErrorPage;
