import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "../hooks/useSectionInView";
import SectionIndex from "./SectionIndex";
import CaseStudyEcoCar from "./CaseStudyEcoCar";
import CaseStudyResearch from "./CaseStudyResearch";
import ProjectGrid from "./Projects";
import "./FeaturedWork.css";

/**
 * Owns the #projects slot: two scrollytelling case studies followed by the
 * compact filterable grid of remaining projects.
 */
const FeaturedWork = () => {
  const [ref, inView] = useSectionInView();

  return (
    <section id="projects" className="featured-work">
      <div className="featured-work-container">
        <motion.div
          className="featured-work-header"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <SectionIndex index={3} name="Featured Work" />
          <span className="section-label">Engineering, in depth</span>
          <h2 className="section-title gradient-text">Featured Work</h2>
          <p className="section-description">
            Two case studies, then the wider portfolio
          </p>
        </motion.div>

        <CaseStudyEcoCar />
        <CaseStudyResearch />

        <div className="projects-divider">
          <span>More Projects</span>
        </div>

        <ProjectGrid />
      </div>
    </section>
  );
};

export default FeaturedWork;
