import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import PageHeader from "../../../components/common/pageHeader/PageHeader";
import { getProjects } from "../../../services/projectService";
import { resolveUploadUrl } from "../../../services/api";
import "./projects.css";

const MotionSection = motion.section;
const MotionDiv = motion.div;

const fallbackProjects = [
  {
    _id: "fallback-maffy-online",
    title: "Maffy Online",
    description:
      "Corporate website designed to improve trust, clarify service offers, and support more inbound HR and recruitment enquiries.",
    image: "/assets/MaffyPic.png",
    link: "https://maffyonline.netlify.app/",
  },
  {
    _id: "fallback-fog-educare",
    title: "FOG Educare",
    description:
      "Education-focused website with a clean user journey to help parents quickly understand services and contact the school.",
    image: "/assets/fogPic.png",
  },
  {
    _id: "fallback-tool-tracking",
    title: "Tool Tracking App",
    description:
      "Operational system for tracking tool movement, reducing losses, and improving accountability in day-to-day workflows.",
    image: "/assets/toolTrackPic.png",
    link: "https://tooltracking.netlify.app/",
  },
  {
    _id: "fallback-church-website",
    title: "Church Website",
    description:
      "Community website built to improve communication, event visibility, and online reach beyond physical gatherings.",
    image: "/assets/churchWebPic.png",
    link: "https://inkosiyezasdachurch.netlify.app/",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const optimizedDescriptionByProject = [
  {
    matcher: /maffy/i,
    content: `**Problem:** Maffy Online needed a stronger digital footprint to attract more qualified recruitment and HR leads in a competitive market.

**Solution:** We designed and launched a conversion-focused corporate website with clear service positioning, SEO-ready structure, and trust-building content sections tailored to decision-makers.

**Result Focus:** Better online credibility, stronger service clarity, and improved lead quality from organic search and direct website enquiries.

**SEO & GEO Angle:** Location-aware service messaging and keyword-focused page structure support better visibility for HR and recruitment-related searches in South Africa.`
  },
  {
    matcher: /(tool tracker|tool tracking)/i,
    content: `**Problem:** Teams were losing tools and productivity because inventory movement was not tracked in a reliable, searchable way.

**Solution:** We built a full-stack tool tracking system with structured records, assignment visibility, and operational accountability workflows.

**Result Focus:** Fewer losses, faster operational control, and clearer responsibility across teams.

**SEO & GEO Angle:** The project content demonstrates practical business software use cases for operations-heavy industries, helping attract search intent around inventory management and tool accountability solutions.`
  },
  {
    matcher: /(church|inkosi)/i,
    content: `**Problem:** The church needed an accessible digital space to communicate updates, share ministry resources, and engage members beyond physical gatherings.

**Solution:** We created a modern, mobile-friendly church website with clear content pathways for sermons, events, and community updates.

**Result Focus:** Stronger digital engagement, easier communication with members, and improved discoverability for visitors searching online.

**SEO & GEO Angle:** Structured content and local relevance signals help improve search visibility for faith-community queries and regional church discovery.`
  },
  {
    matcher: /(nozuko|fog educare|educare)/i,
    content: `**Problem:** The education centre needed to build trust with parents online while improving visibility for local early childhood education searches.

**Solution:** We delivered a full-stack, parent-friendly website with clear programme information, admissions pathways, and SEO-optimized content architecture.

**Result Focus:** Better parent confidence, smoother enquiry flow, and stronger digital visibility for education-related local searches.

**SEO & GEO Angle:** GEO-focused messaging and location-aware education keywords improve discoverability for nearby families looking for trusted childcare and early learning options.`
  }
];

const getOptimizedDescription = (project) => {
  const source = `${project?.title || ""} ${project?.description || ""}`;
  const match = optimizedDescriptionByProject.find((entry) => entry.matcher.test(source));

  if (match) return match.content;

  return `**Problem:** Many businesses struggle to convert online attention into qualified leads.

**Solution:** We design and develop structured digital experiences that improve visibility, trust, and conversion pathways.

**Result Focus:** Better enquiry quality, clearer communication, and stronger growth potential from digital channels.

**SEO & GEO Angle:** Search-intent aligned content and local relevance signals support stronger ranking and discovery performance.`;
};

const getCollapsedDescription = (description) => {
  const paragraphs = description.split("\n\n").filter(Boolean);
  return paragraphs.slice(0, 2).join("\n\n");
};

function ProjectCard({ project, isExpanded, onToggleExpand }) {
  const imageUrl = resolveUploadUrl(project.image) || "/assets/project-fallback.png";
  const fullDescription = getOptimizedDescription(project);
  const collapsedDescription = getCollapsedDescription(fullDescription);
  const canExpand = fullDescription !== collapsedDescription;

  return (
    <MotionDiv
      className="projects-page-card"
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="projects-page-img-wrap">
        <img
          src={imageUrl}
          alt={project.title}
          className="projects-page-img"
          loading="lazy"
        />
      </div>
      <div className="projects-page-card-header">
        <h3 className="projects-page-title">{project.title}</h3>
        {project.link && (
          <a
            href={project.link}
            className="projects-page-link"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit project"
          >
            <span>🔗</span>
          </a>
        )}
      </div>
      <div className="projects-page-desc markdown-render">
        <ReactMarkdown>{isExpanded ? fullDescription : collapsedDescription}</ReactMarkdown>
      </div>
      {canExpand && (
        <button
          type="button"
          className="projects-page-readmore"
          onClick={onToggleExpand}
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </MotionDiv>
  );
}

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usedFallback, setUsedFallback] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      try {
        const response = await getProjects();
        const projectList = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : [];

        if (isMounted) {
          if (projectList.length > 0) {
            setProjects(projectList);
            setUsedFallback(false);
          } else {
            setProjects(fallbackProjects);
            setUsedFallback(true);
          }
        }
      } catch {
        if (isMounted) {
          setProjects(fallbackProjects);
          setUsedFallback(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Portfolio: Web Design & Digital Projects | Cape Town | Tishbite Digital</title>
        <meta name="description" content="See our portfolio of website design, web development, and digital transformation projects built for Cape Town and South African businesses." />
        <meta name="keywords" content="portfolio, web design projects, case studies, Cape Town web development, digital projects" />
        <link rel="canonical" href="https://tishbitedigital.co.za/projects" />
        <meta property="og:title" content="Portfolio: Web Design & Digital Projects" />
        <meta property="og:description" content="Real projects, real results for Cape Town businesses" />
        <meta property="og:url" content="https://tishbitedigital.co.za/projects" />
      </Helmet>
      <PageHeader title="Our Projects" subtitle="See some of the projects we've delivered for our clients." background="light" />
      <MotionSection
        className="projects-page-section"
        role="region"
        aria-labelledby="projects-work-heading"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container">
          <MotionDiv
            className="projects-page-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65 }}
          >
            <h2 id="projects-work-heading">Selected Work</h2>
            <p>Each project is built to improve visibility, streamline operations, and support measurable business growth.</p>
          </MotionDiv>

          {loading && <p className="projects-page-status">Loading projects...</p>}

          {!loading && usedFallback && (
            <p className="projects-page-status">
              Showing featured projects while we refresh the latest portfolio data.
            </p>
          )}

          {!loading && !usedFallback && projects.length === 0 && (
            <p className="projects-page-status">No projects available right now. Please check back soon.</p>
          )}

          {!loading && projects.length > 0 && (
            <MotionDiv
              className="projects-page-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {projects.map((project) => (
                <ProjectCard
                  key={project._id || project.title}
                  project={project}
                  isExpanded={Boolean(expandedCards[project._id || project.title])}
                  onToggleExpand={() => {
                    const key = project._id || project.title;
                    setExpandedCards((prev) => ({
                      ...prev,
                      [key]: !prev[key],
                    }));
                  }}
                />
              ))}
            </MotionDiv>
          )}
        </div>
      </MotionSection>
    </>
  );
};

export default Projects;
