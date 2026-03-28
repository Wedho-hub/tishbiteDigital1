import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import "./about.css";
import { FaCheckCircle, FaLightbulb, FaRocket, FaUsers } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const MotionSection = motion.section;

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Tishbite Digital: Growing South African Businesses Online</title>
        <meta name="description" content="Learn about Tishbite Digital's mission to help small and growing Cape Town businesses win market visibility through strategic web design, SEO, and digital marketing." />
        <meta name="keywords" content="about us, Tishbite Digital, digital agency Cape Town, web design company, digital marketing" />
        <link rel="canonical" href="https://tishbitedigital.co.za/about" />
        <meta property="og:title" content="About Tishbite Digital" />
        <meta property="og:description" content="Our mission to help Cape Town businesses grow online" />
        <meta property="og:url" content="https://tishbitedigital.co.za/about" />
      </Helmet>
      <div className="about-page">
      {/* Hero Section */}
      <MotionSection
        className="about-hero py-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container text-center">
          <motion.h1 
            className="about-title mb-4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            About Tishbite Digital
          </motion.h1>
          <motion.p 
            className="about-subtitle"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            Empowering businesses through strategic digital transformation
          </motion.p>
        </div>
      </MotionSection>

      {/* Mission Section */}
      <section className="about-mission py-5">
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="row align-items-center"
          >
            <motion.div className="col-lg-6" variants={fadeUp}>
              <h2 className="section-title mb-4">Our Mission</h2>
              <div className="mission-copy">
                <p className="mission-paragraph mb-3">
                  Inspired by the story of Elijah from the small town of Tishbe,
                  Tishbite Digital believes <strong>great voices</strong> and
                  <strong> great businesses</strong> can rise from unexpected
                  places. Our mission is to help small and growing companies move
                  from being overlooked to becoming
                  <strong> confident market competitors</strong>.
                </p>
                <p className="mission-paragraph">
                  Through <strong>strategic web design</strong>,
                  <strong> SEO</strong>, and
                  <strong> digital marketing</strong>, we equip businesses with
                  systems that improve visibility, build trust, and position them
                  to stand alongside established brands while reaching the audiences
                  that matter most.
                </p>
              </div>
            </motion.div>
            <motion.div className="col-lg-6 text-center mt-4 mt-lg-0" variants={fadeUp}>
              <img 
                src="/assets/profilePic.jpg" 
                alt="Tishbite Digital Team" 
                className="about-profile-pic"
              />
              <p className="about-profile-caption mt-3">
                Founder and Chief Digital Strategist
              </p>
              <p className="about-profile-name mt-2">
                <em>Mr Wellington Dhliwayo (Wedho)</em>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values py-5 bg-light">
        <div className="container">
          <motion.h2 
            className="section-title text-center mb-5"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Our Core Values
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="row"
          >
            <motion.div className="col-md-6 col-lg-3 mb-4" variants={fadeUp}>
              <div className="value-card text-center p-4">
                <FaCheckCircle size={50} className="mb-3 text-success" />
                <h5>Quality First</h5>
                <p className="text-muted">
                  Delivering excellence in every project, no shortcuts or compromises.
                </p>
              </div>
            </motion.div>
            <motion.div className="col-md-6 col-lg-3 mb-4" variants={fadeUp}>
              <div className="value-card text-center p-4">
                <FaLightbulb size={50} className="mb-3 text-success" />
                <h5>Innovation</h5>
                <p className="text-muted">
                  Staying ahead with cutting-edge solutions and modern technologies.
                </p>
              </div>
            </motion.div>
            <motion.div className="col-md-6 col-lg-3 mb-4" variants={fadeUp}>
              <div className="value-card text-center p-4">
                <FaUsers size={50} className="mb-3 text-success" />
                <h5>Partnership</h5>
                <p className="text-muted">
                  Building long-term relationships based on trust and transparency.
                </p>
              </div>
            </motion.div>
            <motion.div className="col-md-6 col-lg-3 mb-4" variants={fadeUp}>
              <div className="value-card text-center p-4">
                <FaRocket size={50} className="mb-3 text-success" />
                <h5>Results</h5>
                <p className="text-muted">
                  Focused on measurable outcomes that drive business growth.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="about-services py-5">
        <div className="container">
          <motion.h2 
            className="section-title text-center mb-5"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            What We Do
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="row"
          >
            <motion.div className="col-md-6 mb-4" variants={fadeUp}>
              <div className="service-item p-4">
                <h5 className="text-success mb-3">Digital Strategy & Branding</h5>
                <p className="text-muted">
                  We craft comprehensive digital strategies that align with your business goals, 
                  creating cohesive brand identities that resonate with your target audience.
                </p>
              </div>
            </motion.div>
            <motion.div className="col-md-6 mb-4" variants={fadeUp}>
              <div className="service-item p-4">
                <h5 className="text-success mb-3">Web Development & Design</h5>
                <p className="text-muted">
                  From responsive websites to complex web applications, we build scalable solutions 
                  with modern technologies and best practices.
                </p>
              </div>
            </motion.div>
            <motion.div className="col-md-6 mb-4" variants={fadeUp}>
              <div className="service-item p-4">
                <h5 className="text-success mb-3">SEO & Digital Marketing</h5>
                <p className="text-muted">
                  Increase your online visibility and drive qualified traffic through strategic SEO, 
                  content marketing, and paid advertising campaigns.
                </p>
              </div>
            </motion.div>
            <motion.div className="col-md-6 mb-4" variants={fadeUp}>
              <div className="service-item p-4">
                <h5 className="text-success mb-3">Automation & CRM Integration</h5>
                <p className="text-muted">
                  Streamline your operations with custom automation workflows and integrated CRM systems 
                  that save time and increase efficiency.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta py-5 bg-light">
        <div className="container text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="mb-4">Ready to Transform Your Business?</h2>
            <p className="text-muted mb-4">
              Let's discuss how we can help you build a digital ecosystem that drives growth.
            </p>
            <a href="/contact" className="btn btn-success btn-lg">
              Get In Touch
            </a>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  );
};

export default About;
