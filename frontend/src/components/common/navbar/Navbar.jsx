import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaPinterestP, FaPhoneAlt } from "react-icons/fa";

const socialLinks = [
  { href: "https://web.facebook.com/profile.php?id=61584656188539", icon: <FaFacebookF />, label: "Facebook" },
  { href: "https://www.instagram.com/tishbitedigital/", icon: <FaInstagram />, label: "Instagram" },
  { href: "https://za.pinterest.com/Tishbite_Digital/", icon: <FaPinterestP />, label: "Pinterest" },
];

const phone = {
  href: "tel:+27791684548",
  icon: <FaPhoneAlt />,
  label: "Call",
  number: "+27 79 168 4548"
};

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navOpacity, setNavOpacity] = useState(0.88);

  const handleNavLinkClick = () => {
    setMenuOpen(false);
  };

  // Keep navbar stable by only changing visual style (not layout height) with hysteresis.
  useEffect(() => {
    let ticking = false;

    const updateScrolledState = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      const maxDistance = 170;
      const progress = Math.min(y / maxDistance, 1);
      const nextOpacity = 0.88 + progress * 0.1;

      setNavOpacity(nextOpacity);
      setIsScrolled((prev) => {
        const next = prev ? y > 12 : y > 40;
        return next === prev ? prev : next;
      });

      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateScrolledState);
    };

    const handleResize = () => {
      updateScrolledState();
    };

    updateScrolledState();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    document.body.classList.toggle("mobile-nav-open", menuOpen);
    return () => {
      document.body.classList.remove("mobile-nav-open");
    };
  }, [menuOpen]);

  return (
    <nav
      className={`navbar navbar-expand-lg${isScrolled ? " navbar-scrolled" : ""}`}
      style={{ "--nav-current-opacity": navOpacity.toFixed(3) }}
      aria-label="Main navigation"
    >
      <div className="container-fluid">

        {/* ================= DESKTOP ================= */}
        <div className="navbar-desktop-layout d-none d-lg-flex align-items-center w-100">

          {/* Brand */}
          <div className="navbar-brand-col d-flex align-items-center">
            <Link className="navbar-brand" to="/">
              <img
                src="/assets/tishbite_digital_logo.svg"
                alt="Tishbite Digital"
                className="navbar-logo"
                loading="eager"
              />
            </Link>
          </div>

          {/* Nav Links */}
          <div className="navbar-navlinks-col d-flex align-items-center justify-content-center flex-grow-1">
            <ul className="navbar-nav mb-0 d-flex flex-row justify-content-center w-100">
              {navLinks.map(link => (
                <li className="nav-item" key={link.to}>
                  <Link
                    className={`nav-link main-nav-link${location.pathname === link.to ? " active" : ""}`}
                    to={link.to}
                    onClick={handleNavLinkClick}
                    aria-current={location.pathname === link.to ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + CTA */}
          <div className="navbar-extras-col d-flex align-items-center justify-content-end">

            <div className="navbar-social">
              {socialLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} (opens in a new tab)`}
                  className="social-icon-link"
                >
                  <span className="social-icon-bg">
                    {link.icon}
                  </span>
                </a>
              ))}
            </div>

            <div className="phone-link ms-3">
              <a href={phone.href} aria-label={`Call Tishbite Digital on ${phone.number}`}>
                <FaPhoneAlt aria-hidden="true" />
                {phone.number}
              </a>
            </div>

          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="navbar-mobile-layout d-flex d-lg-none flex-column w-100">

          {/* Top Row */}
          <div className="navbar-mobile-top d-flex align-items-center justify-content-between w-100 mb-2">

            <div className="navbar-social">
              {socialLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} (opens in a new tab)`}
                  className="social-icon-link"
                >
                  <span className="social-icon-bg">
                    {link.icon}
                  </span>
                </a>
              ))}
            </div>

            <div className="phone-link">
              <a href={phone.href} aria-label={`Call Tishbite Digital on ${phone.number}`}>
                <FaPhoneAlt aria-hidden="true" />
                {phone.number}
              </a>
            </div>

          </div>

          {/* Brand + Toggler */}
          <div className="navbar-mobile-bottom d-flex align-items-center justify-content-between w-100">
            <Link className="navbar-brand" to="/">
              <img
                src="/assets/tishbite_digital_favicon.svg"
                alt="Tishbite Digital"
                className="navbar-logo-mark"
                loading="eager"
              />
              <span className="navbar-brand-mobile-text">
                Tishbite Digital
                <span className="slogan">Growing Together</span>
              </span>
            </Link>

            <button
              className={`navbar-toggler${menuOpen ? " open" : ""}`}
              type="button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-controls="mobile-nav-menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(prev => !prev)}
            >
              <span className="navbar-toggler-icon-custom">
                <span className="bar top" />
                <span className="bar middle" />
                <span className="bar bottom" />
              </span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div id="mobile-nav-menu" className={`mobile-nav-menu${menuOpen ? " show" : ""}`}>
            <ul className="navbar-nav mt-3">
              {navLinks.map(link => (
                <li className="nav-item" key={link.to}>
                  <Link
                    className={`nav-link main-nav-link${location.pathname === link.to ? " active" : ""}`}
                    to={link.to}
                    onClick={handleNavLinkClick}
                    aria-current={location.pathname === link.to ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Phone CTA inside the mobile menu */}
            <div className="mobile-menu-phone">
              <a href={phone.href} aria-label={`Call Tishbite Digital on ${phone.number}`}>
                <FaPhoneAlt aria-hidden="true" />
                {phone.number}
              </a>
            </div>
          </div>

          <button
            type="button"
            className={`mobile-nav-backdrop${menuOpen ? " show" : ""}`}
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />

        </div>
      </div>
    </nav>
  );
};

export default Navbar;