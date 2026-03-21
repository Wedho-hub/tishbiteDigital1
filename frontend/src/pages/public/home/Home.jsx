
import React, { useState, useRef } from "react";
import Hero from "../../../components/common/hero/Hero";
import "./home.css";
import { motion, useAnimation } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import {
  FaBullhorn,
  FaBlog,
  FaArrowRight,
  FaLaptopCode
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const MotionDiv = motion.div;
const MotionH2 = motion.h2;


const Home = () => {
  const [showMore, setShowMore] = useState(false);

  // Animation controls
  const heroControls = useAnimation();
  const aboutRef = useRef(null);
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  // Animate hero section on mount
  React.useEffect(() => {
    heroControls.start({ opacity: 1, transition: { duration: 1 } });
  }, [heroControls]);

  // Example: scroll to About section when showMore is clicked and expanded
  React.useEffect(() => {
    if (showMore && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [showMore]);

  return (
    <>
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={heroControls}
      >
        <Hero />
      </MotionDiv>

      {/* ================= ABOUT SECTION ================= */}
      <section className="about-section py-5" ref={aboutRef} role="region" aria-labelledby="home-about-heading">
        <div className="container">
          <MotionDiv
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="row align-items-center"
          >
            <MotionDiv className="col-lg-6 text-center mt-4 mt-lg-0 order-lg-1" variants={fadeRight}>
              <Link to="/about" className="about-link-wrapper">
                <FaLaptopCode size={120} className="about-icon" />
                <p className="about-caption mt-3">About Tishbite Digital?</p>
              </Link>
            </MotionDiv>
            <MotionDiv className="col-lg-6 order-lg-2" variants={fadeLeft}>
              <h2 id="home-about-heading" className="section-title mb-4">
                Building Systems, Not Just Websites
              </h2>
              <p className="text-muted">
                Tishbite Digital helps service professionals and growing
                businesses transition into structured digital ecosystems —
                combining branding, SEO, automation, CRM, and web development.
              </p>
              {showMore && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-muted mt-3"
                >
                  We design scalable digital foundations that increase
                  visibility, automate workflows, and create measurable growth.
                  From strategy to execution, we transform how businesses
                  operate online.
                </motion.p>
              )}
              <button
                className="btn btn-outline-success mt-3"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Show Less" : "Learn More"} <FaArrowRight />
              </button>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>

      {/* ================= MARKETING & BLOG ================= */}
      <section className="promo-section py-5" role="region" aria-labelledby="home-promo-heading">
        <div className="container">
          <h2 id="home-promo-heading" className="sr-only">Promotions and blog highlights</h2>
          <MotionDiv
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="row text-center"
          >
            <MotionDiv className="col-md-6 mb-4" variants={fadeLeft}>
              <FaBullhorn size={50} className="mb-3 text-success" />
              <h4>Promotions</h4>
              <p className="text-muted">
                Offering free consultations to the first 20 that send us a message in the next 30 days. Let's discuss how we can help your business grow online.
              </p>
            </MotionDiv>
            <MotionDiv className="col-md-6 mb-4" variants={fadeRight}>
              <FaBlog size={50} className="mb-3 text-success" />
              <h4>In Our Blogs</h4>
              <p className="text-muted">
                Sharing insights on digital growth, SEO, automation, and small business success.
              </p>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="stats-section py-5" role="region" aria-labelledby="home-stats-heading">
        <div className="container text-center">
          <h2 id="home-stats-heading" className="sr-only">Business results and metrics</h2>
          <MotionDiv
            ref={statsRef}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="row"
          >
            <MotionDiv className="col-md-4" variants={fadeUp}>
              <h2 className="stat-number">
                {statsInView ? <CountUp end={50} duration={2.2} /> : 0}+
              </h2>
              <p>Businesses Consulted</p>
            </MotionDiv>
            <MotionDiv className="col-md-4" variants={fadeUp}>
              <h2 className="stat-number">
                {statsInView ? <CountUp end={120} duration={2.2} /> : 0}%
              </h2>
              <p>Avg. Traffic Increase</p>
            </MotionDiv>
            <MotionDiv className="col-md-4" variants={fadeUp}>
              <h2 className="stat-number">
                {statsInView ? <CountUp end={24} duration={2.2} /> : 0}
              </h2>
              <p>Automation Systems Built</p>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>

      {/* ================= PROJECTS SECTION ================= */}
      <section className="home-projects-section py-5" role="region" aria-labelledby="home-projects-heading">
        <div className="container">
          <MotionDiv>
            <MotionH2
              id="home-projects-heading"
              className="section-title text-center mb-5"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              Selected Projects
            </MotionH2>
            <div className="row">
              {[
                {
                  img: "/assets/MaffyPic.png",
                  name: "Maffy Online"
                },
                {
                  img: "/assets/fogPic.png",
                  name: "FOG Educare"
                },
                {
                  img: "/assets/toolTrackPic.png",
                  name: "Tool Tracking App"
                },
                {
                  img: "/assets/churchWebPic.png",
                  name: "Church Website"
                }
              ].map((project) => (
                <MotionDiv
                  className="col-md-6 col-lg-3 mb-4"
                  key={project.name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="home-project-card">
                    <div className="home-project-image-wrap">
                      <img
                        src={project.img}
                        alt={project.name}
                        className="img-fluid"
                        loading="lazy"
                      />
                    </div>
                    <div className="home-project-name text-center fw-bold">{project.name}</div>
                  </div>
                </MotionDiv>
              ))}
            </div>
            <MotionDiv className="text-center mt-4" variants={fadeUp}>
              <Link to="/projects" className="btn btn-success home-projects-cta">
                View All Projects <FaArrowRight />
              </Link>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>
    </>
  );
};

export default Home;
