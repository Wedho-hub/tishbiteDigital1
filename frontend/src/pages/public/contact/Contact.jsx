
import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { FaWhatsapp, FaPaperPlane, FaClock, FaCalendarAlt } from "react-icons/fa";
import PageHeader from "../../../components/common/pageHeader/PageHeader";
import { createEnquiry } from "../../../services/enquiryService";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");
    try {
      const result = await createEnquiry(formData);
      if (result?.message && !result?._id) {
        throw new Error(result.message);
      }
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err?.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Let's build something cool and stunning together"
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
                <Motion.a
                  href="https://wa.me/27791684548"
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
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                >
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Your Message</label>
                    <textarea
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
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
                      className="alert alert-success mt-3"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      Your enquiry has been submitted successfully.
                    </Motion.div>
                  )}
                  {error && (
                    <Motion.div
                      className="alert alert-danger mt-3"
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
