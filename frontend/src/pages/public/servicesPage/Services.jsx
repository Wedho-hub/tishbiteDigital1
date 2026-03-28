import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import CountUp from "react-countup";
import { Helmet } from "react-helmet-async";
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

const normalizeServiceTitle = (title = "") =>
  title
    .toLowerCase()
    .replace(/™/g, "")
    .replace(/^the\s+/i, "")
    .replace(/\s+/g, " ")
    .trim();

const serviceBlueprintByTitle = {
  "company registration & compliance setup": {
    displayTitle: "Business Registration & Compliance Setup",
    description:
      "**Problem:** You cannot pitch confidently or open key business channels when your company is not formally structured.\n\n**Solution:** We handle registration and core compliance setup so your business can operate legally and appear credible from day one.\n\n**Result Focus:** Faster business launch, stronger trust with clients and partners, and fewer compliance delays.\n\n- CIPC registration support\n- Name reservation and tax setup guidance\n- Structured compliance starting point",
  },
  "brand identity & business design": {
    displayTitle: "Brand Identity & Market Positioning Design",
    description:
      "**Problem:** Businesses lose opportunities when their branding looks inconsistent or unprofessional.\n\n**Solution:** We create a clear visual identity system that positions your business as credible and memorable.\n\n**Result Focus:** Better first impressions, stronger recall, and higher trust during sales conversations.\n\n- Custom logo and identity direction\n- Consistent color and typography system\n- Practical brand usage guide",
  },
  "professional website development": {
    displayTitle: "Lead-Generating Website Development",
    description:
      "**Problem:** Many websites get visits but fail to turn visitors into enquiries.\n\n**Solution:** We build fast, mobile-optimized websites with conversion-focused structure and clear calls to action.\n\n**Result Focus:** More qualified enquiries, better user experience, and stronger digital authority.\n\n- Responsive, speed-conscious design\n- SEO-ready page structure\n- Contact and WhatsApp conversion pathways",
  },
  "google business profile & local seo optimization": {
    displayTitle: "Google Business Profile & Local SEO Growth",
    description:
      "**Problem:** Local customers cannot choose your business if you do not appear in map and local search results.\n\n**Solution:** We optimize your Google Business Profile and local SEO signals to improve findability in your service area.\n\n**Result Focus:** Increased local discovery, stronger profile trust signals, and more nearby enquiries.\n\n- Profile optimization and service mapping\n- Local keyword and category refinement\n- Visibility improvements for map-based searches",
  },
  "meta business suite & social platform integration": {
    displayTitle: "Meta Suite Setup & Social Integration",
    description:
      "**Problem:** Disconnected social channels create slow response times and weak campaign execution.\n\n**Solution:** We integrate Facebook, Instagram, WhatsApp Business, and Meta Business Suite into one operational workflow.\n\n**Result Focus:** Faster responses, better ad readiness, and cleaner channel management.\n\n- Platform linking and account configuration\n- Role and permissions structure\n- Unified communication pathways",
  },
  "social media growth strategy & management": {
    displayTitle: "Social Media Growth Strategy & Execution",
    description:
      "**Problem:** Posting without strategy often produces activity but not meaningful business outcomes.\n\n**Solution:** We run a structured social content and engagement plan tied to business goals and audience intent.\n\n**Result Focus:** Better consistency, stronger engagement quality, and improved demand generation.\n\n- Strategic content planning\n- Engagement and performance tracking\n- Monthly direction refinement",
  },
  "lead generation & paid advertising campaigns": {
    displayTitle: "Paid Ads & Lead Generation Campaigns",
    description:
      "**Problem:** Businesses burn ad budget when campaigns are not built around qualified buyer intent.\n\n**Solution:** We design and optimize paid campaigns focused on lead quality, not vanity metrics.\n\n**Result Focus:** More sales-ready leads, improved conversion flow, and better marketing ROI.\n\n- Targeted audience strategy\n- Offer-led campaign setup\n- Tracking and optimization loops",
  },
  "crm, automation & conversion optimization": {
    displayTitle: "CRM, Automation & Conversion Systems",
    description:
      "**Problem:** Slow follow-up and manual admin cause warm leads to go cold before conversion.\n\n**Solution:** We implement CRM and automation workflows that organize leads and trigger timely follow-ups.\n\n**Result Focus:** Faster response speed, improved conversion rates, and scalable sales operations.\n\n- Pipeline and lead-stage design\n- Automated follow-up workflows\n- Conversion path optimization",
  },
  "business launch suite": {
    displayTitle: "Business Launch Suite",
    description:
      "**Problem:** New businesses struggle to launch quickly because legal setup and brand identity are done in disconnected steps.\n\n**Solution:** This bundle combines registration and branding so you launch as a compliant, professional business.\n\n**Result Focus:** Faster go-to-market setup, stronger credibility, and a cleaner foundation for sales.\n\n- Registration and compliance setup\n- Brand identity and launch assets\n- Structured start-up readiness",
  },
  "digital foundation suite": {
    displayTitle: "Digital Foundation Suite",
    description:
      "**Problem:** Businesses moving online often lack the core assets needed to attract and convert digital traffic.\n\n**Solution:** This bundle builds your core website, local SEO visibility, and social platform integration in one rollout.\n\n**Result Focus:** Better online discoverability, trust, and enquiry readiness from day one.\n\n- Lead-ready website\n- Local SEO and Google profile setup\n- Meta and channel integration",
  },
  "growth acceleration suite": {
    displayTitle: "Growth Acceleration Suite",
    description:
      "**Problem:** Visibility may exist, but growth stalls when content, local search, and advertising are not aligned.\n\n**Solution:** This bundle aligns social growth, local SEO, and paid campaigns into one demand-generation strategy.\n\n**Result Focus:** Stronger lead pipeline, higher brand visibility, and momentum toward revenue growth.\n\n- Social growth execution\n- Local search optimization\n- Paid campaign lead acquisition",
  },
  "revenue automation suite": {
    displayTitle: "Revenue Automation Suite",
    description:
      "**Problem:** Many businesses generate leads but lose revenue due to weak follow-up and fragmented sales systems.\n\n**Solution:** This bundle combines ads, platform integration, and CRM automation to move leads efficiently through your pipeline.\n\n**Result Focus:** Better lead-to-sale conversion, reduced manual effort, and predictable revenue operations.\n\n- Conversion-focused lead generation\n- Unified platform setup\n- CRM automation workflows",
  },
  "tishbite enterprise growth system": {
    displayTitle: "Tishbite Enterprise Growth System",
    description:
      "**Problem:** Scaling businesses outgrow piecemeal marketing and need a coordinated infrastructure for growth.\n\n**Solution:** Our flagship bundle unifies all core growth services into one structured operating system.\n\n**Result Focus:** End-to-end visibility, faster execution, and enterprise-ready growth consistency.\n\n- Full brand-to-conversion ecosystem\n- Integrated acquisition and automation layers\n- Long-term scalability framework",
  },
};

const getServiceBlueprint = (service) => {
  const normalizedTitle = normalizeServiceTitle(service?.title || "");
  return serviceBlueprintByTitle[normalizedTitle] || null;
};

const getDisplayTitle = (service) => {
  // Priority 1: displayTitle from database (set by migration script)
  if (service?.displayTitle) return service.displayTitle;
  
  // Priority 2: Blueprint mapping from frontend
  const blueprint = getServiceBlueprint(service);
  if (blueprint?.displayTitle) return blueprint.displayTitle;

  // Priority 3: Clean the raw title as fallback
  return (service?.title || "Service")
    .replace(/^The\s+/i, "")
    .replace(/™/g, "")
    .trim();
};

const getOutcomeDescription = (service) => {
  const blueprint = getServiceBlueprint(service);
  if (blueprint?.description) return blueprint.description;

  if ((service?.category || "general") === "bundle") {
    return "**Problem:** Growth stalls when critical business functions are handled in isolation.\n\n**Solution:** This bundle combines key systems into one coordinated execution plan.\n\n**Result Focus:** Better consistency, higher lead quality, and clearer growth momentum.";
  }

  return "**Problem:** Businesses struggle to turn visibility into qualified enquiries.\n\n**Solution:** This service strengthens one core growth function with practical execution support.\n\n**Result Focus:** Better trust, stronger conversion readiness, and improved business outcomes.";
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
    service: "Business Launch Suite",
    startingPrice: "R8,500",
    subscription: "3 monthly installments (R2,900 each)",
    maintenance: "1 month free maintenance included",
    notes: "Company registration + branding bundle",
  },
  {
    service: "Digital Foundation Suite",
    startingPrice: "R10,000",
    subscription: "3–4 monthly installments",
    maintenance: "1 month free website & social setup support",
    notes: "Website + Google Business + Meta Suite setup",
  },
  {
    service: "Growth Acceleration Suite",
    startingPrice: "R12,500",
    subscription: "3–6 monthly installments",
    maintenance: "1 month free social media support",
    notes: "Social media growth + lead generation",
  },
  {
    service: "Revenue Automation Suite",
    startingPrice: "R15,000",
    subscription: "3–6 monthly installments",
    maintenance: "1 month free automation & CRM support",
    notes: "CRM, automation & conversion optimization",
  },
  {
    service: "Tishbite Enterprise Growth System",
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
        <h3>{getDisplayTitle(service)}</h3>

        <div
          className={`service-desc markdown-render ${
            isExpanded ? "expanded" : "collapsed"
          }`}
        >
          <ReactMarkdown>{getOutcomeDescription(service)}</ReactMarkdown>
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
      <Helmet>
        <title>Website Design, SEO & Digital Marketing Services | Cape Town | Tishbite Digital</title>
        <meta name="description" content="From website design to SEO, ads, and WhatsApp automation. We help Cape Town businesses build digital growth systems that generate qualified leads and drive results." />
        <meta name="keywords" content="website design Cape Town, SEO services, digital marketing, lead generation, WhatsApp marketing, web development South Africa" />
        <link rel="canonical" href="https://tishbitedigital.co.za/services" />
        <meta property="og:title" content="Website Design, SEO & Digital Marketing Services" />
        <meta property="og:description" content="Growth-focused digital services for Cape Town businesses" />
        <meta property="og:url" content="https://tishbitedigital.co.za/services" />
      </Helmet>
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