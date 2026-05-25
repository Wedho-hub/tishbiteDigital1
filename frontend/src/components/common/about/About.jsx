import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./about.css";
import {
  FaCheckCircle,
  FaLightbulb,
  FaRocket,
  FaUsers,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
  FaDatabase,
  FaServer,
  FaExternalLinkAlt,
  FaMedal,
  FaArrowRight,
  FaCode,
} from "react-icons/fa";

/* ── Motion helpers ───────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const viewport = { once: true, amount: 0.2 };

/* ── Tech stack data ─────────────────────────────── */
const CORE_SKILLS = [
  { icon: FaReact,    label: "React.js",      color: "#61dafb", bg: "#e8f9ff" },
  { icon: FaNodeJs,   label: "Node.js",       color: "#3c873a", bg: "#edf7ed" },
  { icon: FaServer,   label: "Express.js",    color: "#1b4332", bg: "#eef6f1" },
  { icon: FaDatabase, label: "MongoDB",       color: "#13aa52", bg: "#e8f7ee" },
  { icon: FaCode,     label: "JavaScript",    color: "#f0db4f", bg: "#fffbea" },
  { icon: FaHtml5,    label: "HTML5",         color: "#e34c26", bg: "#fdf0ed" },
  { icon: FaCss3Alt,  label: "CSS3 / Bootstrap", color: "#264de4", bg: "#eef0fd" },
  { icon: FaGitAlt,   label: "Git & GitHub",  color: "#f05032", bg: "#fdf0ee" },
];

/* ── Structured data (JSON-LD) ───────────────────── */
const personSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Wellington Dhliwayo",
  alternateName: "Wedho",
  jobTitle: "Full-Stack Web Developer & Digital Agency Founder",
  url: "https://tishbitedigital.co.za/about",
  sameAs: ["https://www.hyperiondev.com/portfolio/WD24080015372/"],
  knowsAbout: [
    "Web Development", "React", "Node.js", "MongoDB", "Express.js",
    "JavaScript", "SEO", "Digital Marketing", "Lead Generation", "CRM Automation",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "HyperionDev",
    url: "https://www.hyperiondev.com",
  },
  worksFor: {
    "@type": "Organization",
    name: "Tishbite Digital",
    url: "https://tishbitedigital.co.za",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cape Town",
    addressCountry: "ZA",
  },
});

/* ═══════════════════════════════════════════════════ */
const About = () => {
  return (
    <>
      <Helmet>
        <title>About Tishbite Digital — Cape Town Web Design & Digital Marketing Agency</title>
        <meta
          name="description"
          content="Tishbite Digital is a Cape Town digital agency founded by Wellington Dhliwayo. We build lead-generating websites, local SEO systems, and growth automation for South African service businesses. Meet the founder and see our credentials."
        />
        <meta
          name="keywords"
          content="digital agency Cape Town, about Tishbite Digital, web design agency South Africa, Wellington Dhliwayo, Cape Town SEO agency, MERN developer, full stack developer Cape Town"
        />
        <link rel="canonical" href="https://tishbitedigital.co.za/about" />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content="Wellington Dhliwayo — Web Developer & Founder | Tishbite Digital" />
        <meta property="og:description" content="HyperionDev Top Student building real-world full-stack applications and growing Cape Town businesses online." />
        <meta property="og:url" content="https://tishbitedigital.co.za/about" />
        <meta property="og:image" content="https://tishbitedigital.co.za/assets/tishbiteHero.png" />
        <meta property="og:image:alt" content="Tishbite Digital — Cape Town Web Design & Digital Marketing" />
        <script type="application/ld+json">{personSchema}</script>
      </Helmet>

      <div className="about-page">

        {/* ── HERO ───────────────────────────────── */}
        <motion.section
          className="about-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="container text-center">
            <motion.p
              className="about-hero-eyebrow"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              Full-Stack Web Developer · Digital Agency Founder · Cape Town, SA
            </motion.p>
            <motion.h1
              className="about-title mb-3"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
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
              Building modern web applications and empowering South African businesses
              to compete and grow online.
            </motion.p>
          </div>
        </motion.section>

        {/* ── FOUNDER STORY ──────────────────────── */}
        <section className="about-mission py-5" aria-labelledby="founder-heading">
          <div className="container">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="row align-items-center"
            >
              <motion.div className="col-lg-6" variants={fadeUp}>
                <p className="about-section-eyebrow">Meet the Founder</p>
                <h2 id="founder-heading" className="section-title mb-4">
                  Wellington Dhliwayo
                </h2>
                <div className="mission-copy">
                  <p className="mission-paragraph mb-3">
                    I am a <strong>full-stack web developer</strong> and founder of Tishbite Digital,
                    based in Cape Town. I graduated as a <strong>top student at HyperionDev</strong>,
                    where I completed an intensive web development programme covering modern JavaScript,
                    React, Node.js, and full-stack application architecture.
                  </p>
                  <p className="mission-paragraph mb-3">
                    I built Tishbite Digital to bridge a real gap: small and growing businesses
                    across South Africa deserve the same digital quality as large corporates.
                    Every system I deliver — from websites and SEO to CRM automation — is
                    engineered to produce <strong>measurable results</strong>, not just aesthetics.
                  </p>
                  <p className="mission-paragraph mb-0">
                    Inspired by the story of Elijah from the small town of Tishbe, I believe
                    <strong> great voices can rise from unexpected places</strong>. Technology and
                    a commitment to continuous learning are the tools that make this possible —
                    and every system I build is designed to produce results that last.
                  </p>
                </div>
              </motion.div>

              <motion.div className="col-lg-6 text-center mt-5 mt-lg-0" variants={fadeUp}>
                <img
                  src="/assets/profilePic.jpg"
                  alt="Wellington Dhliwayo — Founder of Tishbite Digital, web developer Cape Town"
                  className="about-profile-pic"
                  width="350"
                  height="350"
                  loading="lazy"
                />
                <p className="about-profile-caption mt-3">
                  Founder &amp; Full-Stack Developer
                </p>
                <p className="about-profile-name mt-2">
                  <em>Wellington Dhliwayo (Wedho)</em>
                </p>

                {/* HyperionDev credential badge */}
                <a
                  href="https://www.hyperiondev.com/portfolio/WD24080015372/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-credential-badge"
                  aria-label="View Wellington's verified HyperionDev portfolio (opens in new tab)"
                >
                  <FaMedal className="about-credential-icon" aria-hidden="true" />
                  <span>
                    <strong>Top Student</strong> · HyperionDev
                    <span className="about-credential-sub">View Verified Portfolio</span>
                  </span>
                  <FaExternalLinkAlt className="about-credential-ext" aria-hidden="true" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── TECH STACK ─────────────────────────── */}
        <section className="about-stack py-5" aria-labelledby="stack-heading">
          <div className="container">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="text-center mb-5"
            >
              <p className="about-section-eyebrow">Developer Profile</p>
              <h2 id="stack-heading" className="section-title">
                Technology Stack
              </h2>
              <p className="about-section-sub">
                Technologies I work with daily to build production-ready web applications.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="about-stack-grid"
              role="list"
              aria-label="Core technology skills"
            >
              {CORE_SKILLS.map(({ icon: Icon, label, color, bg }) => (
                <motion.div
                  key={label}
                  className="about-stack-item"
                  variants={fadeUp}
                  role="listitem"
                  style={{ "--skill-bg": bg, "--skill-color": color }}
                >
                  <span className="about-stack-icon-wrap" aria-hidden="true">
                    <Icon style={{ color }} />
                  </span>
                  <span className="about-stack-label">{label}</span>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* ── CREDENTIALS ────────────────────────── */}
        <section className="about-credentials py-5" aria-labelledby="credentials-heading">
          <div className="container">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="text-center mb-5"
            >
              <p className="about-section-eyebrow">Verified Credentials</p>
              <h2 id="credentials-heading" className="section-title">
                Education &amp; Proof of Work
              </h2>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="row justify-content-center"
            >
              {/* HyperionDev Card */}
              <motion.div className="col-md-6 col-lg-5 mb-4" variants={fadeUp}>
                <div className="about-cred-card">
                  <div className="about-cred-icon-wrap">
                    <FaMedal className="about-cred-icon" aria-hidden="true" />
                  </div>
                  <h3 className="about-cred-title">HyperionDev — Top Student</h3>
                  <p className="about-cred-body">
                    Completed a full-stack web development programme at HyperionDev,
                    achieving top student recognition. The programme covered
                    JavaScript, React, Node.js, REST APIs, databases, and
                    software engineering principles.
                  </p>
                  <a
                    href="https://www.hyperiondev.com/portfolio/WD24080015372/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-cred-link"
                    aria-label="View Wellington's verified HyperionDev portfolio (opens in new tab)"
                  >
                    View Verified Portfolio <FaExternalLinkAlt aria-hidden="true" />
                  </a>
                </div>
              </motion.div>

              {/* Real-World Project Card */}
              <motion.div className="col-md-6 col-lg-5 mb-4" variants={fadeUp}>
                <div className="about-cred-card">
                  <div className="about-cred-icon-wrap about-cred-icon-wrap--green">
                    <FaRocket className="about-cred-icon" aria-hidden="true" />
                  </div>
                  <h3 className="about-cred-title">Live Production Application</h3>
                  <p className="about-cred-body">
                    This website is a fully deployed, production-grade MERN stack application
                    built from scratch — featuring authentication, a CMS, PayFast payment
                    integration, REST API, SEO, and a custom admin dashboard.
                  </p>
                  <a
                    href="https://github.com/Wedho-hub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-cred-link"
                    aria-label="View GitHub profile (opens in new tab)"
                  >
                    GitHub: Wedho-hub <FaExternalLinkAlt aria-hidden="true" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── CORE VALUES ────────────────────────── */}
        <section className="about-values py-5" aria-labelledby="values-heading">
          <div className="container">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="text-center mb-5"
            >
              <p className="about-section-eyebrow">How We Operate</p>
              <h2 id="values-heading" className="section-title">
                Core Values
              </h2>
            </motion.div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="row"
            >
              {[
                {
                  icon: FaCheckCircle,
                  title: "Quality First",
                  body: "Every deliverable meets a professional standard. No shortcuts, no compromises on code or business outcomes.",
                },
                {
                  icon: FaLightbulb,
                  title: "Continuous Learning",
                  body: "Technology moves fast. Staying current with best practices and emerging tools keeps every client's solution modern and effective.",
                },
                {
                  icon: FaUsers,
                  title: "Partnership",
                  body: "Clients are treated as long-term partners. Transparent communication and honest reporting are non-negotiable.",
                },
                {
                  icon: FaRocket,
                  title: "Measurable Results",
                  body: "Strategies are tied to real KPIs: enquiries, rankings, conversions. Beautiful design without outcomes is not enough.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <motion.div
                  key={title}
                  className="col-md-6 col-lg-3 mb-4"
                  variants={fadeUp}
                >
                  <div className="value-card text-center p-4">
                    <Icon size={48} className="mb-3 value-card-icon" aria-hidden="true" />
                    <h3 className="value-card-title">{title}</h3>
                    <p className="value-card-body">{body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── WHAT WE DO ─────────────────────────── */}
        <section className="about-services py-5" aria-labelledby="services-heading">
          <div className="container">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="text-center mb-5"
            >
              <p className="about-section-eyebrow">Service Capabilities</p>
              <h2 id="services-heading" className="section-title">What We Deliver</h2>
            </motion.div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="row"
            >
              {[
                {
                  title: "Full-Stack Web Development",
                  body: "End-to-end MERN stack applications — from responsive front-end UIs to REST APIs, databases, authentication, and admin dashboards.",
                },
                {
                  title: "SEO & Digital Marketing",
                  body: "On-page SEO, Google Business optimisation, and strategic content that drives qualified local traffic and enquiries.",
                },
                {
                  title: "Digital Strategy & Brand Identity",
                  body: "Visual identity systems and digital roadmaps that position businesses credibly and consistently across all channels.",
                },
                {
                  title: "Automation & CRM Integration",
                  body: "Custom automation workflows and CRM setups that reduce manual follow-up and increase sales pipeline efficiency.",
                },
              ].map(({ title, body }) => (
                <motion.div key={title} className="col-md-6 mb-4" variants={fadeUp}>
                  <div className="about-service-item">
                    <h3 className="about-service-title">{title}</h3>
                    <p className="about-service-body">{body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────── */}
        <section className="about-cta py-5" aria-labelledby="cta-heading">
          <div className="container text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <p className="about-section-eyebrow about-section-eyebrow--light">
                Let's Work Together
              </p>
              <h2 id="cta-heading" className="about-cta-heading">
                Ready to Build Something Great?
              </h2>
              <p className="about-cta-sub">
                Whether you need a full-stack developer or a growth partner for your
                business — let's talk about what's possible.
              </p>
              <div className="about-cta-actions">
                <Link to="/contact" className="about-cta-btn-primary">
                  Get In Touch <FaArrowRight aria-hidden="true" />
                </Link>
                <Link to="/services" className="about-cta-btn-secondary">
                  View Services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
};

export default About;
