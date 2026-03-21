import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import PageHeader from "../../../components/common/pageHeader/PageHeader";
import { getProjects } from "../../../services/projectService";
import { resolveUploadUrl } from "../../../services/api";
import "./projects.css";

const MotionSection = motion.section;
const MotionDiv = motion.div;

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

function ProjectCard({ project }) {
  const imageUrl = resolveUploadUrl(project.image) || "/assets/project-fallback.png";

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
        <ReactMarkdown>{project.description || ""}</ReactMarkdown>
      </div>
    </MotionDiv>
  );
}

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
          setProjects(projectList);
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

          {!loading && projects.length === 0 && (
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
                <ProjectCard key={project._id || project.title} project={project} />
              ))}
            </MotionDiv>
          )}
        </div>
      </MotionSection>
    </>
  );
};

export default Projects;
