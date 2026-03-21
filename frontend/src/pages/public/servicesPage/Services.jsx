import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import CountUp from "react-countup";
import PageHeader from "../../../components/common/pageHeader/PageHeader";
import { getServices } from "../../../services/serviceService";
import {
  FaBullhorn,
  FaCode,
  FaSearch,
  FaCogs,
  FaLayerGroup,
  FaRocket,
} from "react-icons/fa";
import "./services.css";

const serviceIconByKeyword = [
  { matcher: /(market|brand|social|ads?|promotion)/i, icon: FaBullhorn },
  { matcher: /(web|website|develop|design|app)/i, icon: FaCode },
  { matcher: /(seo|search|traffic|ranking)/i, icon: FaSearch },
  { matcher: /(autom|crm|system|ops|process)/i, icon: FaCogs },
  { matcher: /(bundle|package|strategy|growth)/i, icon: FaLayerGroup },
];

const getServiceIcon = (service) => {
  const haystack = `${service?.title || ""} ${service?.description || ""}`;
  const match = serviceIconByKeyword.find(({ matcher }) => matcher.test(haystack));
  return match?.icon || FaRocket;
};

const INITIAL_VISIBLE_SERVICES = 4;

const pricingPolicyRows = [
  {
    service: "General Services",
    startingPrice: "R2,500 – R7,500",
    subscription: "Monthly installments available",
    maintenance: "Optional: R500/month",
    notes: "Ideal for individual service needs",
  },
  {
    service: "Business Launch Suite™",
    startingPrice: "R8,500",
    subscription: "3 monthly installments (R2,900 each)",
    maintenance: "1 month free maintenance included",
    notes: "Company registration + branding bundle",
  },
  {
    service: "Digital Foundation Suite™",
    startingPrice: "R10,000",
    subscription: "3–4 monthly installments",
    maintenance: "1 month free website & social setup support",
    notes: "Website + Google Business + Meta Suite setup",
  },
  {
    service: "Growth Acceleration Suite™",
    startingPrice: "R12,500",
    subscription: "3–6 monthly installments",
    maintenance: "1 month free social media support",
    notes: "Social media growth + lead generation",
  },
  {
    service: "Revenue Automation Suite™",
    startingPrice: "R15,000",
    subscription: "3–6 monthly installments",
    maintenance: "1 month free automation & CRM support",
    notes: "CRM, automation & conversion optimization",
  },
  {
    service: "Tishbite Enterprise Growth System™",
    startingPrice: "R28,000+",
    subscription: "Custom subscription or installments available",
    maintenance: "2 months free maintenance & support",
    notes: "All 8 services included, enterprise-grade",
  },
];

const Services = () => {
  const [services, setServices] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAllGeneral, setShowAllGeneral] = useState(false);
  const [showAllBundles, setShowAllBundles] = useState(false);

  const observer = useRef(null);

  useEffect(() => {
    getServices().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            entry.target.classList.add("in-view");
            observer.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll:not(.is-visible)");
    elements.forEach((el) => observer.current.observe(el));

    return () => observer.current?.disconnect();
  }, [services, showAllGeneral, showAllBundles]);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const generalServices = services.filter(
    (service) => (service.category || "general") === "general"
  );
  const bundledServices = services.filter(
    (service) => (service.category || "general") === "bundle"
  );

  const renderService = (service, index, isBundle = false) => {
    const isExpanded = expanded[service._id];
    const ServiceIcon = getServiceIcon(service);

    return (
      <li
        key={service._id}
        className={`service-item reveal-on-scroll ${isBundle ? "bundle-item" : ""}`}
        style={{ "--reveal-delay": `${index * 85}ms` }}
      >
        <div className="service-item-top">
          <span className="service-icon-wrap" aria-hidden="true">
            <ServiceIcon className="service-icon" />
          </span>
          <span className="service-badge">{isBundle ? "Bundle" : "General"}</span>
        </div>
        <h3>{service.title}</h3>

        <div
          className={`service-desc markdown-render ${
            isExpanded ? "expanded" : "collapsed"
          }`}
        >
          <ReactMarkdown>{service.description || ""}</ReactMarkdown>
        </div>

        <button
          className="read-more-btn"
          onClick={() => toggleExpand(service._id)}
        >
          {isExpanded ? "Show Less" : "Read More"}
        </button>
      </li>
    );
  };

  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="Explore the range of services we offer to help your business grow."
        background="light"
      />

      <div className="services-page-wrap container" role="region" aria-labelledby="services-overview-heading">
        {loading && <div className="loading-skeleton"></div>}

        {!loading && (
          <>
            <section className="services-hero-panel reveal-on-scroll" style={{ "--reveal-delay": "40ms" }}>
              <div className="services-hero-content">
                <h2 id="services-overview-heading">Solutions Built for Growth</h2>
                <p>
                  From focused one-off execution to complete business growth packages,
                  our services are crafted to improve visibility, operations, and outcomes.
                </p>
              </div>
              <div className="services-metrics">
                <div>
                  <span>
                    <CountUp end={generalServices.length} duration={1.6} enableScrollSpy scrollSpyOnce />
                  </span>
                  <small>General Services</small>
                </div>
                <div>
                  <span>
                    <CountUp end={bundledServices.length} duration={1.7} enableScrollSpy scrollSpyOnce />
                  </span>
                  <small>Bundled Services</small>
                </div>
                <div>
                  <span>
                    <CountUp end={services.length} duration={1.8} enableScrollSpy scrollSpyOnce />
                  </span>
                  <small>Total Services</small>
                </div>
              </div>
            </section>

            <section className="pricing-policy reveal-on-scroll" style={{ "--reveal-delay": "65ms" }}>
              <div className="pricing-policy-head">
                <h3>Pricing Policy</h3>
                <p>Starting prices and payment flexibility for services and bundled solutions.</p>
              </div>
              <div className="pricing-table-wrap">
                <table className="pricing-table">
                  <thead>
                    <tr>
                      <th>Service / Bundle</th>
                      <th>Starting Price</th>
                      <th>Subscription / Installments</th>
                      <th>Maintenance / Support</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingPolicyRows.map((row) => (
                      <tr key={row.service}>
                        <td>{row.service}</td>
                        <td>{row.startingPrice}</td>
                        <td>{row.subscription}</td>
                        <td>{row.maintenance}</td>
                        <td>{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="service-group general-group reveal-on-scroll" style={{ "--reveal-delay": "80ms" }}>
              <div className="service-group-head">
                <h2>General Services</h2>
                <p>Flexible individual services tailored to your business needs.</p>
              </div>
              <ul className="services-list">
                {(showAllGeneral
                  ? generalServices
                  : generalServices.slice(0, INITIAL_VISIBLE_SERVICES)
                ).map((service, index) =>
                  renderService(service, index)
                )}
              </ul>
              {generalServices.length > INITIAL_VISIBLE_SERVICES && (
                <div className="services-see-more-wrap">
                  <button
                    className="services-see-more-btn"
                    onClick={() => setShowAllGeneral((prev) => !prev)}
                  >
                    {showAllGeneral ? "Show Less General Services" : "See More General Services"}
                  </button>
                </div>
              )}
            </section>

            <section className="service-group bundle-group reveal-on-scroll" style={{ "--reveal-delay": "130ms" }}>
              <div className="service-group-head">
                <h2>Bundled Services</h2>
                <p>Strategic packages designed for end-to-end growth and execution.</p>
              </div>
              <ul className="services-list">
                {(showAllBundles
                  ? bundledServices
                  : bundledServices.slice(0, INITIAL_VISIBLE_SERVICES)
                ).map((service, index) =>
                  renderService(service, index, true)
                )}
              </ul>
              {bundledServices.length > INITIAL_VISIBLE_SERVICES && (
                <div className="services-see-more-wrap">
                  <button
                    className="services-see-more-btn"
                    onClick={() => setShowAllBundles((prev) => !prev)}
                  >
                    {showAllBundles ? "Show Less Bundled Services" : "See More Bundled Services"}
                  </button>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default Services;