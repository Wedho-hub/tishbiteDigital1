
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import "./hero.css";

const containerVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const Hero = () => {
  return (
    <section
      className="hero-section py-5"
      aria-label="Tishbite Digital - Business Growth and Digital Transformation"
    >
      <div className="container">
        <div className="row align-items-center">

          {/* TEXT CONTENT */}
          <div className="col-lg-6 order-1 order-lg-1">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 variants={itemVariants} className="hero-title mb-4">
                Digital Growth for Small Businesses.
              </motion.h1>

              <motion.p variants={itemVariants} className="hero-subtitle mb-4">
                Tishbite Digital helps entrepreneurs, tradesmen, educators,
                service providers, and small businesses move from survival mode
                to structured growth. We build websites, implement CRM systems,
                automate processes, optimize SEO, and create digital marketing
                systems that generate measurable results.
              </motion.p>

              <motion.div variants={itemVariants} className="hero-cta-row d-flex flex-wrap gap-3">
                <Link
                  to="/how-we-work"
                  className="hero-btn hero-btn-primary"
                >
                  <span>How We Work</span>
                  <FaArrowRight className="hero-btn-icon" />
                </Link>

                <Link
                  to="/services"
                  className="hero-btn hero-btn-secondary"
                >
                  <span>Browse Service Bundles</span>
                  <FaArrowRight className="hero-btn-icon" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* IMAGE CONTENT */}
          <motion.div
            className="col-lg-6 order-2 order-lg-2 text-center mt-4 mt-lg-0"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="/assets/tishbiteHero.png"
              alt="Tishbite Digital leading small businesses from struggle to sustainable digital growth"
              className="img-fluid hero-image"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
