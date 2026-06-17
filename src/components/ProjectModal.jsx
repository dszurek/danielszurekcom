import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaAppStore } from "react-icons/fa";

/**
 * Full project detail dialog. Renders nothing until `project` is set; while
 * open it traps Escape and locks body scroll. `onLinkClick(e, type, title)`
 * fires the parent's analytics handler for outbound links.
 */
const ProjectModal = ({ project, onClose, onLinkClick }) => {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="project-modal glass-strong"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              aria-label="Close project details"
              onClick={onClose}
            >
              ×
            </button>
            <div className="modal-image">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="modal-img-element"
                />
              ) : (
                <div className="project-img-fallback modal-img-fallback">
                  <div className="fallback-icons">
                    {project.icons.map((icon, i) => (
                      <span key={i} className="fallback-icon">
                        {icon}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="modal-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="modal-tech">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="modal-actions">
                {project.github && (
                  <a
                    href={project.github}
                    className="modal-button"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => onLinkClick(e, "GitHub", project.title)}
                  >
                    <FaGithub /> View Code
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    className="modal-button primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => onLinkClick(e, "Live Demo", project.title)}
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
                {project.appStore && (
                  <a
                    href={project.appStore}
                    className="modal-button primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => onLinkClick(e, "App Store", project.title)}
                  >
                    <FaAppStore /> App Store
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
