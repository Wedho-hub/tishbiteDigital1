import React from "react";
import "./howWeWorkPage.css";

const HowWeWorkPage = () => (
  <section className="how-we-work-page">
    <div className="hww-header">
      <h1>How We Work</h1>
      <p className="hww-subtitle">Our process is transparent, collaborative, and focused on your success.</p>
    </div>
    <div className="hww-steps">
      <div className="hww-step">
        <div className="hww-step-number">1</div>
        <h2>Discovery & Consultation</h2>
        <p>We start by understanding your goals, challenges, and vision. Every project begins with a conversation to ensure we’re aligned with your needs.</p>
      </div>
      <div className="hww-step">
        <div className="hww-step-number">2</div>
        <h2>Strategy & Planning</h2>
        <p>We craft a tailored strategy and detailed plan, outlining deliverables, timelines, and milestones. You’ll always know what to expect and when.</p>
      </div>
      <div className="hww-step">
        <div className="hww-step-number">3</div>
        <h2>Design & Development</h2>
        <p>Our creative and technical teams bring your project to life, using modern tools and best practices. We keep you updated at every stage.</p>
      </div>
      <div className="hww-step">
        <div className="hww-step-number">4</div>
        <h2>Review & Launch</h2>
        <p>We review everything together, make final adjustments, and launch your project with confidence. Our support continues after launch for ongoing success.</p>
      </div>
    </div>
  </section>
);

export default HowWeWorkPage;
