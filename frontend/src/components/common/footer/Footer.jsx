import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import { motion } from "framer-motion";

const socialLinks = [
  { href: "https://facebook.com", icon: <FaFacebookF />, label: "Facebook" },
  { href: "https://instagram.com", icon: <FaInstagram />, label: "Instagram" },
  { href: "https://za.pinterest.com/Tishbite_Digital/", icon: <FaPinterestP />, label: "Pinterest" },
];

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/projects", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

const Footer = () => {
  return (
    <motion.footer
      className="footer"
      aria-label="Site footer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container footer-container">

        {/* Top Section */}
        <motion.div
          className="footer-top row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >

          {/* Brand Column */}
          <motion.div className="col-lg-4 col-md-6 footer-brand" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
            <Link to="/" className="footer-logo">
              <img
                src="/assets/tishbite_digital_logo.svg"
                alt="Tishbite Digital"
                className="footer-logo-image"
                loading="lazy"
              />
              <span className="slogan">Growing Together</span>
            </Link>
            <p className="footer-description">
              We help businesses grow through strategic branding,
              web development and digital marketing solutions.
            </p>
          </motion.div>

          {/* Navigation Column */}
          <motion.div className="col-lg-4 col-md-6 footer-links" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.06 }}>
            <h6 className="footer-heading">Quick Links</h6>
            <ul>
              {navLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div className="col-lg-4 col-md-12 footer-contact" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.12 }}>
            <h6 className="footer-heading">Contact</h6>
            <p>
              <a href="tel:+27791684548" className="footer-contact-link">📞 +27 79 168 4548</a>
            </p>
            <p>
              <a href="mailto:info@tishbitedigital.co.za" className="footer-contact-link">✉️ info@tishbitedigital.co.za</a>
            </p>

            <div className="footer-social">
              {socialLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} (opens in a new tab)`}
                  className="social-icon-link"
                >
                  <span className="social-icon-bg">{link.icon}</span>
                </a>
              ))}
            </div>
          </motion.div>

        </motion.div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Tishbite Digital. All rights reserved.
          </p>
        </div>

      </div>
    </motion.footer>
  );
};

export default Footer;