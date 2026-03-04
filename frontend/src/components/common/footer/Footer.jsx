import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";

const socialLinks = [
  { href: "https://facebook.com", icon: <FaFacebookF />, label: "Facebook" },
  { href: "https://instagram.com", icon: <FaInstagram />, label: "Instagram" },
  { href: "https://pinterest.com", icon: <FaPinterestP />, label: "Pinterest" },
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
    <footer className="footer">
      <div className="container footer-container">

        {/* Top Section */}
        <div className="footer-top row">

          {/* Brand Column */}
          <div className="col-lg-4 col-md-6 footer-brand">
            <Link to="/" className="footer-logo">
              <span className="brand-name">Tishbite Digital</span>
              <span className="slogan">Growing Together</span>
            </Link>
            <p className="footer-description">
              We help businesses grow through strategic branding,
              web development and digital marketing solutions.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="col-lg-4 col-md-6 footer-links">
            <h6 className="footer-heading">Quick Links</h6>
            <ul>
              {navLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-lg-4 col-md-12 footer-contact">
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
                  aria-label={link.label}
                  className="social-icon-link"
                >
                  <span className="social-icon-bg">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Tishbite Digital. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;