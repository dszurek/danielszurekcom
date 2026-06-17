import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "../hooks/useSectionInView";
import "./CredibilityStrip.css";

/* Text wordmarks only — quieter than logos and avoids trademark use */
const organizations = [
  "General Motors",
  "EcoCAR EV Challenge",
  "University of Alabama",
  "SSAB",
  "Brasfield & Gorrie",
];

const CredibilityStrip = () => {
  const [ref, inView] = useSectionInView();

  return (
    <div className="credibility-strip" ref={ref}>
      <span className="credibility-label">Experience with</span>
      <ul className="credibility-list">
        {organizations.map((org, i) => (
          <motion.li
            key={org}
            className="credibility-item"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
          >
            {org}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default CredibilityStrip;
