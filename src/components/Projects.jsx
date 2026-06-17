import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionInView } from "../hooks/useSectionInView";
import { FaGithub, FaExternalLinkAlt, FaAppStore } from "react-icons/fa";
import ReactGA from "react-ga4";
import { projects, projectCategories } from "../data/projects";
import ProjectModal from "./ProjectModal";
import "./Projects.css";

/**
 * Filterable project card grid + detail modal. Rendered inside FeaturedWork,
 * below the two flagship case studies. Project content lives in
 * `src/data/projects.jsx`; the detail dialog is `ProjectModal`.
 */
const ProjectGrid = () => {
  const [ref, inView] = useSectionInView();
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("all");

  const handleFilterClick = (categoryId) => {
    setFilter(categoryId);
    ReactGA.event({ category: "Projects", action: "Filter", label: categoryId });
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    ReactGA.event({
      category: "Projects",
      action: "View Details",
      label: project.title,
    });
  };

  const handleExternalLinkClick = (e, type, projectTitle) => {
    e.stopPropagation();
    ReactGA.event({
      category: "External Link",
      action: "Click",
      label: `${type} - ${projectTitle}`,
    });
  };

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <div className="project-grid-block" ref={ref}>
      <motion.div
        className="projects-filters"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {projectCategories.map((category) => (
          <motion.button
            key={category.id}
            className={`filter-button ${filter === category.id ? "active" : ""}`}
            onClick={() => handleFilterClick(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.label}
          </motion.button>
        ))}
      </motion.div>

      <motion.div className="projects-grid" layout>
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card glass"
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => handleProjectClick(project)}
            >
              <div className="project-image">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="project-img-element"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="project-img-fallback">
                    <div className="fallback-icons">
                      {project.icons.map((icon, i) => (
                        <span key={i} className="fallback-icon">
                          {icon}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="project-overlay">
                  <div className="project-icons">
                    {project.icons.map((icon, i) => (
                      <span key={i} className="tech-icon">
                        {icon}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      className="project-link"
                      whileHover={{ scale: 1.1 }}
                      onClick={(e) =>
                        handleExternalLinkClick(e, "GitHub", project.title)
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub />
                    </motion.a>
                  )}
                  {project.live && (
                    <motion.a
                      href={project.live}
                      className="project-link"
                      whileHover={{ scale: 1.1 }}
                      onClick={(e) =>
                        handleExternalLinkClick(e, "Live Demo", project.title)
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt />
                    </motion.a>
                  )}
                  {project.appStore && (
                    <motion.a
                      href={project.appStore}
                      className="project-link"
                      whileHover={{ scale: 1.1 }}
                      onClick={(e) =>
                        handleExternalLinkClick(e, "App Store", project.title)
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaAppStore />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onLinkClick={handleExternalLinkClick}
      />
    </div>
  );
};

export default ProjectGrid;
