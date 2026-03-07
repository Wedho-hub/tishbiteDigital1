import React from "react";
import { motion } from "framer-motion";
import "./howWeWorkPage.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const HowWeWorkPage = () => (
  <motion.section
    className="how-we-work-page"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
  >
    <motion.div className="hww-header" variants={itemVariants}>
      <h1>How We Work</h1>
      <p className="hww-subtitle">Our process is transparent, collaborative, and focused on your success.</p>
    </motion.div>
    <div className="hww-steps">
      <motion.div className="hww-step" variants={itemVariants}>
        <div className="hww-step-number">1</div>
        <h2>Discovery & Consultation</h2>
        <p>We start by understanding your goals, challenges, and vision. Every project begins with a conversation to ensure we’re aligned with your needs.</p>
      </motion.div>
      <motion.div className="hww-step" variants={itemVariants}>
        <div className="hww-step-number">2</div>
        <h2>Strategy & Planning</h2>
        <p>We craft a tailored strategy and detailed plan, outlining deliverables, timelines, and milestones. You’ll always know what to expect and when.</p>
      </motion.div>
      <motion.div className="hww-step" variants={itemVariants}>
        <div className="hww-step-number">3</div>
        <h2>Design & Development</h2>
        <p>Our creative and technical teams bring your project to life, using modern tools and best practices. We keep you updated at every stage.</p>
      </motion.div>
      <motion.div className="hww-step" variants={itemVariants}>
        <div className="hww-step-number">4</div>
        <h2>Review & Launch</h2>
        <p>We review everything together, make final adjustments, and launch your project with confidence. Our support continues after launch for ongoing success.</p>
      </motion.div>
    </div>
  </motion.section>
);

export default HowWeWorkPage;
