
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheckCircle, FaWhatsapp } from "react-icons/fa";
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
      aria-label="Tishbite Digital helping Cape Town businesses get more clients online"
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
              <motion.p variants={itemVariants} className="hero-kicker mb-3">
                Cape Town Web Design, SEO, Ads and WhatsApp Lead Generation
              </motion.p>

              <motion.h1 variants={itemVariants} className="hero-title mb-4">
                We Help Cape Town Businesses Get More Clients Online
              </motion.h1>

              <motion.p variants={itemVariants} className="hero-subtitle mb-4">
                Websites. SEO. Ads. Built to generate leads, calls, bookings,
                and WhatsApp enquiries, not just look good. We help Cape Town
                service businesses build high-converting websites, improve
                Google visibility, and turn digital traffic into real client
                opportunities.
              </motion.p>

              <motion.div variants={itemVariants} className="hero-offer-card mb-4">
                <strong>Get a FREE Website &amp; SEO Audit</strong>
                <span>Worth R500. Includes conversion, speed, search visibility, and lead-capture feedback.</span>
              </motion.div>

              <motion.div variants={itemVariants} className="hero-proof-list mb-4" aria-label="Business growth benefits">
                <span className="hero-proof-item"><FaCheckCircle aria-hidden="true" /> More qualified leads</span>
                <span className="hero-proof-item"><FaCheckCircle aria-hidden="true" /> Better Google visibility</span>
                <span className="hero-proof-item"><FaCheckCircle aria-hidden="true" /> Faster WhatsApp follow-up</span>
              </motion.div>

              <motion.div variants={itemVariants} className="hero-cta-row d-flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="hero-btn hero-btn-primary"
                >
                  <span>Get Free Website &amp; SEO Audit</span>
                  <FaArrowRight className="hero-btn-icon" />
                </Link>

                <a
                  href="https://wa.me/27791684548?text=Hello%20Tishbite%20Digital,%20I%20want%20a%20free%20website%20and%20SEO%20audit."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-btn hero-btn-whatsapp"
                >
                  <span>Chat With Us on WhatsApp</span>
                  <FaWhatsapp className="hero-btn-icon" />
                </a>
              </motion.div>

              <motion.p variants={itemVariants} className="hero-support-text mt-3 mb-0">
                Serving Cape Town, the Western Cape, and South African businesses that want growth systems, not brochure websites.
              </motion.p>
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
