
import React from "react";
import { Link } from "react-router-dom";
import "./hero.css";

const Hero = () => {
  return (
    <section
      className="hero-section py-5"
      aria-label="Tishbite Digital - Business Growth and Digital Transformation"
    >
      <div className="container">
        <div className="row align-items-center">

          {/* TEXT CONTENT */}
          <div className="col-lg-6 order-1 order-lg-1">
            <h1 className="hero-title mb-4">
              Digital Growth for Small Businesses.
            </h1>

            <p className="hero-subtitle mb-4">
              Tishbite Digital helps entrepreneurs, tradesmen, educators,
              service providers, and small businesses move from survival mode
              to structured growth. We build websites, implement CRM systems,
              automate processes, optimize SEO, and create digital marketing
              systems that generate measurable results.
            </p>

            <div className="d-flex flex-wrap gap-3">
              <Link
                to="/how-we-work"
                className="hero-btn hero-btn-primary"
              >
                How We Work
              </Link>

              <Link
                to="/services"
                className="hero-btn hero-btn-secondary"
              >
                Browse Service Bundles
              </Link>
            </div>
          </div>

          {/* IMAGE CONTENT */}
          <div className="col-lg-6 order-2 order-lg-2 text-center mt-4 mt-lg-0">
            <img
              src="/assets/tishbiteHero.png"
              alt="Tishbite Digital leading small businesses from struggle to sustainable digital growth"
              className="img-fluid hero-image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
