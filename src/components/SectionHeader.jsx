import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "../hooks/useSectionInView";
import SectionIndex from "./SectionIndex";

/**
 * Standard centered section heading: HUD index readout, eyebrow label,
 * gradient title, and a one-line description, revealed on scroll. `className`
 * is the section's existing wrapper class (e.g. "experience-header") so
 * section-specific spacing keeps applying.
 */
const SectionHeader = ({ index, name, label, title, description, className = "" }) => {
  const [ref, inView] = useSectionInView();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <SectionIndex index={index} name={name} />
      <span className="section-label">{label}</span>
      <h2 className="section-title gradient-text">{title}</h2>
      <p className="section-description">{description}</p>
    </motion.div>
  );
};

export default SectionHeader;
