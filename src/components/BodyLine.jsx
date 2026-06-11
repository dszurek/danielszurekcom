import React from "react";
import { useInView } from "react-intersection-observer";
import "./BodyLine.css";

/**
 * Section divider styled as a road lane marking — a faint asphalt edge line with
 * a dashed centre stripe that "travels" down the road, plus a glowing reflective
 * stud at centre. A signal pulse sweeps the line each time it scrolls into
 * view. `flip` reverses travel direction.
 */
const BodyLine = ({ flip = false }) => {
  const [ref, inView] = useInView({ threshold: 0.5 });

  return (
    <div
      ref={ref}
      className={`body-line ${flip ? "flip" : ""} ${inView ? "in-view" : ""}`}
      aria-hidden="true"
    >
    <svg
      viewBox="0 0 1440 28"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="laneFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-leather-light)" stopOpacity="0" />
          <stop offset="30%" stopColor="var(--color-leather-light)" stopOpacity="1" />
          <stop offset="70%" stopColor="var(--color-forest-light)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--color-forest-light)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line className="lane-edge" x1="0" y1="14" x2="1440" y2="14" />
      <line
        className="lane-stripe"
        x1="0"
        y1="14"
        x2="1440"
        y2="14"
        stroke="url(#laneFade)"
      />
    </svg>
      <span className="lane-pulse-track">
        <span className="lane-pulse" />
      </span>
      <span className="lane-stud" />
    </div>
  );
};

export default BodyLine;
