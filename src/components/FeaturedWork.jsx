import React from "react";
import SectionHeader from "./SectionHeader";
import CaseStudyEcoCar from "./CaseStudyEcoCar";
import CaseStudyResearch from "./CaseStudyResearch";
import ProjectGrid from "./Projects";
import "./FeaturedWork.css";

/**
 * Owns the #projects slot: two scrollytelling case studies followed by the
 * compact filterable grid of remaining projects.
 */
const FeaturedWork = () => {
  return (
    <section id="projects" className="featured-work">
      <div className="featured-work-container">
        <SectionHeader
          className="featured-work-header"
          index={3}
          name="Featured Work"
          label="Engineering, in depth"
          title="Featured Work"
          description="Two case studies, then the wider portfolio"
        />

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
