
import React from "react";
import Hero from "../../../components/common/hero/Hero";
import "./home.css";
import { motion, useAnimation } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Helmet } from "react-helmet-async";
import {
  FaBullhorn,
  FaBlog,
  FaArrowRight,
  FaLaptopCode,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaSearch,
  FaWhatsapp,
  FaGlobeAfrica,
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

const faqItems = [
  {
    question: "Do you only work with Cape Town businesses?",
    answer:
      "Cape Town is a core focus because local search intent is strong here, but we also work with businesses across the Western Cape and South Africa.",
  },
  {
    question: "What does the free Website and SEO audit include?",
    answer:
      "We review your website speed, mobile experience, offer clarity, conversion flow, Google visibility, and lead capture opportunities so you know what is blocking enquiries.",
  },
  {
    question: "Can you help if I need more than just a website?",
    answer:
      "Yes. We build complete growth systems including websites, SEO, Google Business optimization, Meta ads support, WhatsApp lead handling, and CRM automation.",
  },
];

const growthPillars = [
  {
    icon: FaSearch,
    title: "Rank for local buying searches",
    description:
      "Get found when Cape Town clients search for the exact service you offer, with SEO-ready pages and conversion-focused structure.",
  },
  {
    icon: FaWhatsapp,
    title: "Turn clicks into WhatsApp conversations",
    description:
      "Make it easier for high-intent prospects to contact you immediately with fast, mobile-first lead flows and clear offers.",
  },
  {
    icon: FaGlobeAfrica,
    title: "Build a business asset that keeps working",
    description:
      "We create websites and digital systems that support enquiries, follow-up, trust-building, and long-term growth instead of one-off visibility.",
  },
];


const Home = () => {
  const heroControls = useAnimation();
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  React.useEffect(() => {
    heroControls.start({ opacity: 1, transition: { duration: 1 } });
  }, [heroControls]);

  const homeStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "Tishbite Digital",
        "url": "https://tishbitedigital.co.za/",
        "telephone": "+27791684548",
        "areaServed": [
          {
            "@type": "City",
            "name": "Cape Town"
          },
          {
            "@type": "State",
            "name": "Western Cape"
          },
          {
            "@type": "Country",
            "name": "South Africa"
          }
        ],
        "description": "Tishbite Digital helps Cape Town businesses get more clients online through websites, SEO, ads, WhatsApp lead generation, and automation.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Cape Town",
          "addressRegion": "Western Cape",
          "addressCountry": "ZA"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "17:00"
        },
        "image": "https://tishbitedigital.co.za/logo.png",
        "sameAs": ["https://za.pinterest.com/Tishbite_Digital/"],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>We Help Cape Town Businesses Get More Clients Online | Tishbite Digital</title>
        <meta
          name="description"
          content="Tishbite Digital helps Cape Town businesses get more clients online with lead-generating websites, SEO, Google visibility, WhatsApp funnels, and growth-focused digital systems."
        />
        <meta
          name="keywords"
          content="Cape Town web design, Cape Town SEO, lead generation, WhatsApp marketing, website audit, digital marketing Cape Town, small business web design South Africa"
        />
        <link rel="canonical" href="https://tishbitedigital.co.za/" />
        <meta property="og:title" content="We Help Cape Town Businesses Get More Clients Online" />
        <meta
          property="og:description"
          content="Websites. SEO. Ads. Built to generate leads, calls and WhatsApp enquiries for Cape Town businesses."
        />
        <meta property="og:url" content="https://tishbitedigital.co.za/" />
        <script type="application/ld+json">{JSON.stringify(homeStructuredData)}</script>
      </Helmet>

      <MotionDiv
        initial={{ opacity: 0 }}
        animate={heroControls}
      >
        <Hero />
      </MotionDiv>

      {/* ================= ABOUT SECTION ================= */}
      <section className="about-section py-5" role="region" aria-labelledby="home-about-heading">
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
                <p className="about-caption mt-3">Know More About Us</p>
              </Link>
            </MotionDiv>
            <MotionDiv className="col-lg-6 order-lg-2" variants={fadeLeft}>
              <p className="section-kicker mb-3">Local SEO + Lead Generation</p>
              <h2 id="home-about-heading" className="section-title mb-4">
                We build digital systems that help service businesses win more enquiries
              </h2>
              <p className="about-copy">
                If your business depends on phone calls, quote requests, bookings,
                or WhatsApp messages, your website should be helping you close more
                business. We combine persuasive messaging, SEO structure, ad-ready
                landing pages, and automation to help you turn online attention into
                qualified leads.
              </p>
              <ul className="about-results-list list-unstyled mb-0">
                <li><FaCheckCircle aria-hidden="true" /> Position your offer clearly so visitors know why to choose you</li>
                <li><FaCheckCircle aria-hidden="true" /> Capture more enquiries with strong calls to action and WhatsApp paths</li>
                <li><FaCheckCircle aria-hidden="true" /> Improve search visibility for local, high-intent services in Cape Town</li>
              </ul>
              <div className="about-actions mt-4">
                <Link to="/contact" className="btn btn-success">
                  Get My Free Audit <FaArrowRight />
                </Link>
                <Link to="/services" className="btn btn-outline-success">
                  View Services <FaArrowRight />
                </Link>
              </div>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>

      {/* ================= MARKETING & BLOG ================= */}
      <section className="promo-section py-5" role="region" aria-labelledby="home-promo-heading">
        <div className="container">
          <div className="promo-section-heading text-center mb-5">
            <p className="section-kicker justify-content-center mb-3">Lead Magnets That Convert</p>
            <h2 id="home-promo-heading" className="section-title mb-3">Turn website traffic into conversations and clients</h2>
            <p className="promo-section-intro mx-auto mb-0">
              Strong SEO and GEO performance starts with clear offers, answer-first content, and fast next steps for high-intent visitors.
            </p>
          </div>
          <MotionDiv
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="row text-center"
          >
            <MotionDiv className="col-md-6 mb-4" variants={fadeLeft}>
              <article className="promo-card promo-card-highlight h-100">
                <FaBullhorn size={50} className="mb-3 promo-icon" />
                <h4>FREE Website &amp; SEO Audit</h4>
                <p>
                  We review your website, search visibility, mobile user journey, and lead-capture flow so you know exactly what is stopping more enquiries.
                </p>
                <div className="promo-meta">For Cape Town businesses ready to attract and convert better traffic</div>
                <Link to="/contact" className="promo-link">Claim Your Free Audit</Link>
              </article>
            </MotionDiv>
            <MotionDiv className="col-md-6 mb-4" variants={fadeRight}>
              <article className="promo-card h-100">
                <FaBlog size={50} className="mb-3 promo-icon" />
                <h4>Read Client-Attracting Insights</h4>
                <p>
                  Find practical content on SEO, websites, automation, and digital growth strategies that help service businesses win more local trust online.
                </p>
                <div className="promo-meta">Built to answer the questions your future clients are already searching</div>
                <Link to="/blog" className="promo-link">Read Latest Insights</Link>
              </article>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>

      <section className="growth-pillars-section py-5" role="region" aria-labelledby="growth-pillars-heading">
        <div className="container">
          <div className="text-center mb-5">
            <p className="section-kicker justify-content-center mb-3">What We Improve</p>
            <h2 id="growth-pillars-heading" className="section-title mb-3">Built for rankings, trust, and lead flow</h2>
          </div>
          <div className="row g-4">
            {growthPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <MotionDiv
                  key={pillar.title}
                  className="col-md-4"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <article className="growth-pillar-card h-100">
                    <div className="growth-pillar-icon-wrap">
                      <Icon className="growth-pillar-icon" aria-hidden="true" />
                    </div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.description}</p>
                  </article>
                </MotionDiv>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="stats-section py-5" role="region" aria-labelledby="home-stats-heading">
        <div className="container text-center">
          <h2 id="home-stats-heading" className="section-title section-title-light mb-5">Focused on measurable business growth</h2>
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
              <p>Businesses supported with digital growth direction</p>
            </MotionDiv>
            <MotionDiv className="col-md-4" variants={fadeUp}>
              <h2 className="stat-number">
                {statsInView ? <CountUp end={120} duration={2.2} /> : 0}%
              </h2>
              <p>Potential traffic uplift targeted through SEO and structured offers</p>
            </MotionDiv>
            <MotionDiv className="col-md-4" variants={fadeUp}>
              <h2 className="stat-number">
                {statsInView ? <CountUp end={24} duration={2.2} /> : 0}
              </h2>
              <p>Lead and automation systems planned or deployed</p>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>

      <section className="local-seo-section py-5" role="region" aria-labelledby="local-seo-heading">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-5">
              <p className="section-kicker mb-3">Cape Town Focus</p>
              <h2 id="local-seo-heading" className="section-title mb-3">Better GEO starts with clearer local relevance</h2>
              <p className="local-seo-copy mb-0">
                We strengthen location signals, service relevance, trust content, and conversion paths so both search engines and AI-driven discovery tools can understand who you help, where you help them, and why your business is worth contacting.
              </p>
            </div>
            <div className="col-lg-7">
              <div className="local-seo-points">
                <div className="local-seo-point">
                  <FaMapMarkerAlt aria-hidden="true" />
                  <span>Cape Town service-area messaging with clearer intent matching</span>
                </div>
                <div className="local-seo-point">
                  <FaMapMarkerAlt aria-hidden="true" />
                  <span>Answer-focused copy for users searching in Google and AI assistants</span>
                </div>
                <div className="local-seo-point">
                  <FaMapMarkerAlt aria-hidden="true" />
                  <span>Lead magnets and WhatsApp conversion paths that reduce friction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section py-5" role="region" aria-labelledby="home-faq-heading">
        <div className="container">
          <div className="text-center mb-5">
            <p className="section-kicker justify-content-center mb-3">Questions We Solve</p>
            <h2 id="home-faq-heading" className="section-title mb-3">Frequently asked by growing businesses</h2>
          </div>
          <div className="row g-4">
            {faqItems.map((item) => (
              <MotionDiv
                className="col-md-4"
                key={item.question}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <article className="faq-card h-100">
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              </MotionDiv>
            ))}
          </div>
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
