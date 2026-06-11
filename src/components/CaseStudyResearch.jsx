import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useStepProgress } from "../hooks/useStepProgress";
import CtaLink from "./CtaLink";
import "./CaseStudy.css";

/* Paper markers on the Pareto chart and the learning ↔ model-based spectrum.
   `step` is the cs-step index that highlights the marker. */
const papers = [
  {
    id: "rmoga",
    step: 1,
    chart: { cx: 78, cy: 78, labelX: 88, labelY: 70 },
    chartLabel: "R-MOGA",
    spectrum: 68,
  },
  {
    id: "drlmpc",
    step: 2,
    chart: { cx: 158, cy: 138, labelX: 168, labelY: 130 },
    chartLabel: "DRL-MPC",
    spectrum: 45,
  },
  {
    id: "sacmpc",
    step: 3,
    chart: { cx: 240, cy: 180, labelX: 188, labelY: 196 },
    chartLabel: "SAC vs MPC",
    spectrum: 20,
  },
];

const steps = [
  {
    index: "00 / QUESTION",
    title: "One research question, three papers",
    body: "How do you combine learning-based methods with model-based control so autonomous vehicles are both adaptive and provably safe? My EcoCAR research attacks that question from three angles — robust optimization, hybrid control, and head-to-head comparison — all three presented at IEEE ITEC.",
  },
  {
    index: "01 / ROBUST OPTIMIZATION",
    title: "R-MOGA: eco-driving through uncertain intersections",
    body: "Intersection navigation traditionally trusts deterministic signal timing; real adaptive signals break that assumption. R-MOGA evolves vehicle speed profiles with NSGA-II, scoring every candidate across a Monte Carlo suite of perturbed SPaT timings — so the resulting Pareto front trades nominal energy, travel time, and comfort against robustness to timing error.",
  },
  {
    index: "02 / HYBRID CONTROL",
    title: "A DRL strategy layer over safety-critical MPC",
    body: "A hierarchical eco-driving controller: a deep reinforcement learning agent learns long-horizon strategy in stochastic mixed traffic, and hands strategic targets to a low-level MPC that computes actuator commands while rigorously enforcing vehicle dynamics, speed limits, and collision-avoidance constraints. Learning adapts; the MPC guarantees.",
  },
  {
    index: "03 / HEAD-TO-HEAD",
    title: "SAC vs. MPC for lane centering",
    body: "Soft Actor-Critic, trained with the MATLAB Reinforcement Learning Toolbox against Simulink vehicle dynamics, compared directly with an MPC baseline across curvatures and speeds: comparable tracking accuracy with distinct trade-offs in control smoothness, computational cost, and constraint interpretability — practical guidance for choosing a controller.",
  },
  {
    index: "04 / DISSEMINATION",
    title: "On the record",
    body: "All three papers were presented at the IEEE Transportation Electrification Conference, and the team's CAV final presentation heads to the ASME DRIVN conference in September 2026. Full texts available on request.",
  },
];

const milestones = [
  { place: "×3", event: "Papers presented · IEEE ITEC" },
  { place: "SEP 26", event: "ASME DRIVN · CAV final presentation" },
];

const CaseStudyResearch = () => {
  const [containerRef, activeStep] = useStepProgress();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  // The Pareto front draws itself as the case study scrolls through view
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.7"],
  });
  const drawn = useTransform(scrollYProgress, [0, 0.65], [0, 1]);

  return (
    <article id="work-research" className="case-study-block" ref={sectionRef}>
      <header className="cs-header">
        <span className="cs-kicker">Case Study 02 — Controls Research</span>
        <h3 className="cs-title">Learning meets model-based control</h3>
        <p className="cs-intro">
          A research program on safe, efficient autonomy — published, presented,
          and pointed at real vehicles.
        </p>
      </header>

      <div className="case-study" ref={containerRef}>
        <div className="cs-visual" aria-hidden="true">
          <svg
            className="cs-chart"
            viewBox="0 0 320 240"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Axes */}
            <line className="axis" x1="42" y1="18" x2="42" y2="208" />
            <line className="axis" x1="42" y1="208" x2="304" y2="208" />
            <text className="axis-label" x="50" y="30">
              ENERGY
            </text>
            <text className="axis-label" x="226" y="226">
              TRAVEL TIME
            </text>

            {/* Pareto front, drawn by scroll progress */}
            <motion.path
              className="pareto-path"
              d="M 60 50 C 92 110, 140 158, 212 178 S 286 196, 296 198"
              style={{ pathLength: reduceMotion ? 1 : drawn }}
            />

            {papers.map((paper) => (
              <g key={paper.id}>
                <circle
                  className={`pareto-dot ${
                    activeStep === paper.step ? "active" : ""
                  }`}
                  cx={paper.chart.cx}
                  cy={paper.chart.cy}
                  r={activeStep === paper.step ? 6 : 4.5}
                />
                <text
                  className={`dot-label ${
                    activeStep === paper.step ? "active" : ""
                  }`}
                  x={paper.chart.labelX}
                  y={paper.chart.labelY}
                >
                  {paper.chartLabel}
                </text>
              </g>
            ))}
          </svg>

          <div className="cs-spectrum">
            <div className="cs-spectrum-track">
              {papers.map((paper) => (
                <span
                  key={paper.id}
                  className={`cs-spectrum-marker ${
                    activeStep === paper.step ? "active" : ""
                  }`}
                  style={{ left: `${paper.spectrum}%` }}
                />
              ))}
            </div>
            <div className="cs-spectrum-labels">
              <span>Learning-based</span>
              <span>Model-based</span>
            </div>
          </div>
        </div>

        <div className="cs-steps">
          {steps.map((step, i) => (
            <div
              key={step.index}
              className={`cs-step ${i === activeStep ? "active" : ""}`}
              data-step={i}
            >
              <span className="cs-step-index">{step.index}</span>
              <h4>{step.title}</h4>
              <p>{step.body}</p>

              {i === steps.length - 1 && (
                <>
                  <div className="cs-results">
                    {milestones.map((milestone, j) => (
                      <motion.div
                        key={milestone.event}
                        className="result-chip"
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.4, delay: j * 0.08 }}
                      >
                        <span className="chip-place">{milestone.place}</span>
                        <span className="chip-event">{milestone.event}</span>
                      </motion.div>
                    ))}
                  </div>
                  <CtaLink
                    href="#contact"
                    variant="primary"
                    className="cs-step-cta"
                    gaLabel="Case study research - Get in touch"
                  >
                    Get in touch
                  </CtaLink>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default CaseStudyResearch;
