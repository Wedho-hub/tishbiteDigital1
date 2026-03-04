import React from "react";
import { Helmet } from "react-helmet-async";
import "./HowWeWork.css";

const steps = [
  {
    title: "Business Discovery",
    description: `
We begin by understanding your business model, audience, revenue goals, 
and current challenges. Before recommending a website, SEO, WhatsApp Business, 
or Meta setup — we diagnose the real need.
    `
  },
  {
    title: "Strategic Structure",
    description: `
We design a connected system. This may include website development, 
domain setup, Meta Business Suite configuration, WhatsApp optimization, 
SEO foundations, or business registration guidance. 
Every tool must serve a clear purpose.
    `
  },
  {
    title: "System Implementation",
    description: `
We build and configure platforms professionally. 
All systems are properly connected, secured, documented, 
and structured for long-term scalability.
    `
  },
  {
    title: "Testing & Optimization",
    description: `
We verify performance, responsiveness, integrations, SEO basics, 
and lead flow before launch. Nothing goes live until it works properly.
    `
  },
  {
    title: "Launch & Handover",
    description: `
We deploy your systems, connect domains, finalize integrations, 
and provide documentation. You retain full ownership of all accounts.
    `
  },
  {
    title: "Growth & Support",
    description: `
We provide ongoing support including SEO improvements, 
Meta advertising structure, analytics monitoring, 
and technical maintenance.
    `
  }
];

const TimelineItem = ({ index, title, description }) => {
  return (
    <div className="timeline-item">
      <div className="timeline-number">{index + 1}</div>
      <div className="timeline-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

const HowWeWork = () => {
  return (
    <>
      <Helmet>
        <title>How We Work | Digital Systems & Business Growth</title>
        <meta
          name="description"
          content="Learn how we build structured digital systems including website development, WhatsApp Business setup, Meta Business Suite integration, SEO, domain configuration and business registration support."
        />
        <meta
          name="keywords"
          content="website development, WhatsApp Business setup, Meta Business Suite, Facebook business setup, Instagram business setup, SEO services, domain setup, business registration support"
        />
      </Helmet>

      <section className="how-container">
        <header className="how-hero">
          <h1>How We Work</h1>
          <p>
            We build structured digital systems that help businesses grow.
            Every project follows a clear, professional workflow designed to
            eliminate confusion and deliver measurable results.
          </p>
        </header>

        <section className="how-intro">
          <h2>Our Operating Philosophy</h2>
          <p>
            We do not sell isolated digital services. We design connected systems.
            Your website, domain, SEO, Meta platforms, and WhatsApp Business
            must work together to support revenue and customer acquisition.
          </p>
        </section>

        <section className="timeline-section">
          <h2>Our Process</h2>
          <div className="timeline">
            {steps.map((step, index) => (
              <TimelineItem
                key={index}
                index={index}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </section>

        <section className="how-cta">
          <h2>Ready to Build a Structured Digital Presence?</h2>
          <p>
            Let’s identify what your business actually needs and build a system
            that supports long-term growth.
          </p>
        </section>
      </section>
    </>
  );
};

export default HowWeWork;