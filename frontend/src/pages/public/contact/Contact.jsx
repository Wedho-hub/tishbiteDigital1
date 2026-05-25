
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion as Motion } from "framer-motion";
import { FaWhatsapp, FaPaperPlane, FaClock, FaCalendarAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import PageHeader from "../../../components/common/pageHeader/PageHeader";
import { createEnquiry } from "../../../services/enquiryService";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateField = (name, value) => {
    const trimmed = String(value || "").trim();

    if (name === "name") {
      if (!trimmed) return "Please enter your full name.";
      return "";
    }

    if (name === "email") {
      if (!trimmed) return "Please enter your email address.";
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(trimmed)) return "Enter a valid email address.";
      return "";
    }

    if (name === "message") {
      if (!trimmed) return "Please enter your message.";
      if (trimmed.length < 10) return "Your message should be at least 10 characters.";
      return "";
    }

    return "";
  };

  const validateAll = () => {
    const nextErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      message: validateField("message", formData.message),
    };

    setFieldErrors(nextErrors);
    return !nextErrors.name && !nextErrors.email && !nextErrors.message;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFieldErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({ name: true, email: true, message: true });
    if (!validateAll()) return;

    setLoading(true);
    setSuccess(false);
    setError("");
    try {
      const result = await createEnquiry(formData);
      if (result?.message && !result?._id) {
        throw new Error(result.message);
      }
      setSuccess(true);
      setFormData({ name: "", email: "", service: "", message: "" });
      setFieldErrors({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
    } catch (err) {
      setError(err?.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Get Your Free Website & SEO Audit | Contact Tishbite Digital</title>
        <meta name="description" content="Schedule your free website and SEO audit. Ask about our digital growth systems for Cape Town service businesses. Chat via WhatsApp or fill out our form." />
        <meta name="keywords" content="contact us, free website audit, SEO audit, Cape Town, Tishbite Digital" />
        <link rel="canonical" href="https://tishbitedigital.co.za/contact" />
        <meta property="og:site_name" content="Tishbite Digital" />
        <meta property="og:title" content="Get Your Free Website & SEO Audit" />
        <meta property="og:description" content="Schedule your free audit today" />
        <meta property="og:url" content="https://tishbitedigital.co.za/contact" />
        <meta property="og:image" content="https://tishbitedigital.co.za/assets/tishbiteHero.png" />
        <meta property="og:image:alt" content="Contact Tishbite Digital — Free Website & SEO Audit" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ContactPage",
              "@id": "https://tishbitedigital.co.za/contact#webpage",
              "url": "https://tishbitedigital.co.za/contact",
              "name": "Contact Tishbite Digital — Free Website & SEO Audit",
              "isPartOf": { "@id": "https://tishbitedigital.co.za/#website" },
              "description": "Book a free website and SEO audit with Tishbite Digital. Cape Town digital marketing agency helping businesses get more clients online.",
            },
            {
              "@type": "LocalBusiness",
              "@id": "https://tishbitedigital.co.za/#localbusiness",
              "name": "Tishbite Digital",
              "url": "https://tishbitedigital.co.za/",
              "telephone": "+27791684548",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Cape Town",
                "addressRegion": "Western Cape",
                "addressCountry": "ZA",
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+27791684548",
                "contactType": "customer service",
                "availableLanguage": ["English"],
                "areaServed": "ZA",
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "17:00",
              },
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tishbitedigital.co.za/" },
                { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://tishbitedigital.co.za/contact" },
              ],
            },
          ],
        })}</script>
      </Helmet>
      <PageHeader
        title="Contact Us"
        subtitle="Tell us what your business needs — we'll map out the best path forward"
        background="dark"
      />
      <section className="contact-section py-5">
        <div className="container">
          <div className="row align-items-start gy-5 gx-lg-5">
            {/* LEFT SIDE - INFO */}
            <Motion.div
              className="col-lg-5 mb-4"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
            >
              <div className="contact-info-card">
                <Motion.h3
                  className="mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Start Your Digital Transformation
                </Motion.h3>
                <Motion.p
                  className="text-muted"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Whether you need a professional website, CRM integration,
                  automation system, or SEO-driven marketing strategy —
                  we structure systems that scale your business.
                </Motion.p>
                <div className="contact-direct-links mt-4">
                  <a href="tel:+27791684548" className="contact-direct-link">
                    <FaPhone aria-hidden="true" />
                    +27 79 168 4548
                  </a>
                  <a href="mailto:info@tishbitedigital.co.za" className="contact-direct-link">
                    <FaEnvelope aria-hidden="true" />
                    info@tishbitedigital.co.za
                  </a>
                </div>
                <Motion.a
                  href="https://wa.me/27791684548?text=Hello%20Tishbite%20Digital,%20I%20want%20a%20free%20website%20and%20SEO%20audit."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn mt-3 whatsapp-btn"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaWhatsapp className="me-2" />
                  Chat on WhatsApp
                </Motion.a>
              </div>

              <Motion.div
                className="contact-hours-card mt-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h4 className="contact-hours-title mb-3">
                  <FaClock className="me-2" />
                  Operating Times
                </h4>
                <ul className="contact-hours-list mb-0">
                  <li>
                    <FaCalendarAlt className="me-2" />
                    Working hours: <strong>0500hrs to 2000hrs</strong>
                  </li>
                  <li>
                    Availability pause: <strong>Friday sunset to Saturday sunset</strong>
                  </li>
                </ul>
              </Motion.div>

              <hr className="my-4 d-lg-none" />
            </Motion.div>
            {/* RIGHT SIDE - FORM */}
            <Motion.div
              className="col-lg-7"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
            >
              <div className="contact-form-wrapper">
                <Motion.form
                  className="contact-form p-4"
                  onSubmit={handleSubmit}
                  aria-labelledby="contact-form-title"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                >
                  <h3 id="contact-form-title" className="sr-only">Contact Form</h3>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="contact-name">Full Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="name"
                      required
                      aria-invalid={Boolean(fieldErrors.name)}
                      aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                      className="form-control"
                    />
                    {fieldErrors.name && (
                      <p id="contact-name-error" className="field-error-msg" role="alert">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="contact-service">
                      What are you interested in?
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="">— Select a service (optional) —</option>
                      <option value="Lead-Generating Website Development">Lead-Generating Website Development</option>
                      <option value="Google Business Profile & Local SEO">Google Business Profile &amp; Local SEO</option>
                      <option value="Brand Identity & Market Positioning">Brand Identity &amp; Market Positioning</option>
                      <option value="Meta Suite Setup & Social Integration">Meta Suite Setup &amp; Social Integration</option>
                      <option value="Paid Ads & Lead Generation Campaigns">Paid Ads &amp; Lead Generation Campaigns</option>
                      <option value="CRM, Automation & Conversion Systems">CRM, Automation &amp; Conversion Systems</option>
                      <option value="Business Registration & Compliance Setup">Business Registration &amp; Compliance Setup</option>
                      <option value="Social Media Growth Strategy & Execution">Social Media Growth Strategy &amp; Execution</option>
                      <option value="Growth Bundle / Full Package">Growth Bundle / Full Package</option>
                      <option value="Free Website & SEO Audit">Free Website &amp; SEO Audit</option>
                      <option value="Other / Not Sure Yet">Other / Not Sure Yet</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="contact-email">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="email"
                      required
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                      className="form-control"
                    />
                    {fieldErrors.email && (
                      <p id="contact-email-error" className="field-error-msg" role="alert">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="contact-message">Your Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      aria-invalid={Boolean(fieldErrors.message)}
                      aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
                      className="form-control"
                    />
                    {fieldErrors.message && (
                      <p id="contact-message-error" className="field-error-msg" role="alert">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>
                  <Motion.button
                    type="submit"
                    disabled={loading}
                    className="btn w-100 contact-submit-btn"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {loading ? "Sending Message..." : "Send Message"}
                    <FaPaperPlane className="ms-2" />
                  </Motion.button>
                  {success && (
                    <Motion.div
                      className="contact-success-box mt-3"
                      role="status"
                      aria-live="polite"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="contact-success-title">✅ Message received!</p>
                      <p className="contact-success-body">
                        We'll be in touch within <strong>24 hours</strong>. Want a faster response?
                      </p>
                      <a
                        href="https://wa.me/27791684548?text=Hi%20Tishbite%20Digital,%20I%20just%20submitted%20an%20enquiry%20and%20would%20love%20to%20chat."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-success-whatsapp"
                      >
                        <FaWhatsapp aria-hidden="true" /> Chat on WhatsApp now
                      </a>
                    </Motion.div>
                  )}
                  {error && (
                    <Motion.div
                      className="alert alert-danger mt-3"
                      role="alert"
                      aria-live="assertive"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {error}
                    </Motion.div>
                  )}
                </Motion.form>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
