import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaComments,
  FaClipboardList,
  FaLaptopCode,
  FaRocket,
  FaCheckCircle,
  FaWhatsapp,
} from "react-icons/fa";
import "./howWeWorkPage.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const steps = [
  {
    number: "01",
    icon: FaComments,
    title: "Discovery & Consultation",
    body: "We start with a focused conversation about your business goals, target audience, and what you want digital to do for you. No jargon, no long forms — just a clear picture of where you are and where you want to go.",
    bullets: [
      "Free 30-min audit or strategy call",
      "We assess your website, SEO, and current lead flow",
      "You receive honest feedback before any commitment",
    ],
  },
  {
    number: "02",
    icon: FaClipboardList,
    title: "Strategy & Planning",
    body: "We map out a tailored plan with clear deliverables, timelines, and milestones. You'll know exactly what you're getting, when, and what it costs — no surprises.",
    bullets: [
      "Scoped proposal with itemised deliverables",
      "Installment payment plan options available",
      "Project timeline agreed before work begins",
    ],
  },
  {
    number: "03",
    icon: FaLaptopCode,
    title: "Design & Development",
    body: "We build your website, SEO structure, or growth system using modern tools and conversion-focused design principles. You're kept in the loop at every stage with updates and review checkpoints.",
    bullets: [
      "Mobile-first, fast-loading builds",
      "Regular progress check-ins via WhatsApp or email",
      "Content, copy, and imagery review included",
    ],
  },
  {
    number: "04",
    icon: FaRocket,
    title: "Launch & Ongoing Support",
    body: "We review everything together, make final adjustments, and launch with confidence. Our support continues after launch — we don't disappear once the project goes live.",
    bullets: [
      "1 month free post-launch support on all packages",
      "SEO monitoring and ranking checks",
      "Ongoing retainer or update plans available",
    ],
  },
];

const HowWeWorkPage = () => (
  <>
    <Helmet>
      <title>Our Process: How We Build Digital Growth Systems | Tishbite Digital</title>
      <meta name="description" content="Discover our transparent, collaborative 4-step process: Discovery, Strategy, Development, and Launch. Built to deliver measurable results for Cape Town businesses." />
      <meta name="keywords" content="our process, web design process, digital strategy, Cape Town, how we work, website development process" />
      <link rel="canonical" href="https://tishbitedigital.co.za/how-we-work" />
      <meta property="og:site_name" content="Tishbite Digital" />
      <meta property="og:title" content="Our Process: How We Build Digital Growth Systems" />
      <meta property="og:description" content="Transparent, collaborative, results-focused — see how Tishbite Digital turns your goals into a clear action plan." />
      <meta property="og:url" content="https://tishbitedigital.co.za/how-we-work" />
      <meta property="og:image" content="https://tishbitedigital.co.za/assets/tishbiteHero.png" />
      <meta property="og:image:alt" content="How Tishbite Digital Works — Our 4-Step Process" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "HowTo",
            "name": "How Tishbite Digital Builds Your Digital Growth System",
            "description": "Our transparent 4-step process for building websites, SEO, and digital systems that generate enquiries for Cape Town businesses.",
            "totalTime": "P4W",
            "step": steps.map((s, i) => ({
              "@type": "HowToStep",
              "position": i + 1,
              "name": s.title,
              "text": s.body,
            })),
          },
          {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tishbitedigital.co.za/" },
              { "@type": "ListItem", "position": 2, "name": "How We Work", "item": "https://tishbitedigital.co.za/how-we-work" },
            ],
          },
        ],
      })}</script>
    </Helmet>

    <motion.section
      className="how-we-work-page"
      role="region"
      aria-labelledby="how-we-work-heading"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* HEADER */}
      <motion.div className="hww-header" variants={itemVariants}>
        <p className="hww-eyebrow">Our Process</p>
        <h1 id="how-we-work-heading">How We Work</h1>
        <p className="hww-subtitle">
          Transparent, collaborative, and focused on measurable outcomes — every step is designed to keep you informed and get real results.
        </p>
      </motion.div>

      {/* STEPS */}
      <div className="hww-steps">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <motion.div className="hww-step" key={step.number} variants={itemVariants}>
              <div className="hww-step-top">
                <div className="hww-step-number">{step.number}</div>
                <div className="hww-step-icon-wrap" aria-hidden="true">
                  <Icon className="hww-step-icon" />
                </div>
              </div>
              <h2>{step.title}</h2>
              <p className="hww-step-body">{step.body}</p>
              <ul className="hww-step-bullets">
                {step.bullets.map((b) => (
                  <li key={b}>
                    <FaCheckCircle className="hww-bullet-icon" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* TRUST BAR */}
      <motion.div className="hww-trust-bar" variants={itemVariants}>
        <span>✅ No lock-in contracts</span>
        <span>✅ Clear pricing upfront</span>
        <span>✅ Installment plans available</span>
        <span>✅ 1 month free post-launch support</span>
      </motion.div>

      {/* CTA SECTION */}
      <motion.div className="hww-cta" variants={itemVariants}>
        <h2 className="hww-cta-heading">Ready to start the conversation?</h2>
        <p className="hww-cta-sub">
          Tell us about your business and we'll map out the right growth plan — no pressure, no obligation.
        </p>
        <div className="hww-cta-actions">
          <Link to="/contact" className="hww-cta-btn-primary">
            Get My Free Audit <FaArrowRight aria-hidden="true" />
          </Link>
          <a
            href="https://wa.me/27791684548?text=Hi%20Tishbite%20Digital,%20I%20want%20to%20understand%20your%20process%20and%20see%20if%20we%20are%20a%20good%20fit."
            target="_blank"
            rel="noopener noreferrer"
            className="hww-cta-btn-whatsapp"
          >
            <FaWhatsapp aria-hidden="true" /> Chat on WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.section>
  </>
);

export default HowWeWorkPage;
