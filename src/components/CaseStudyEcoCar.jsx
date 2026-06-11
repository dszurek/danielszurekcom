import React from "react";
import { motion } from "framer-motion";
import { useStepProgress } from "../hooks/useStepProgress";
import CtaLink from "./CtaLink";
import "./CaseStudy.css";

/* Signal-flow diagram nodes; `activeOn` lists the step indices that light
   each node. Step 5 (results) lights everything. */
const nodes = [
  {
    id: "sensors",
    label: "SENSORS",
    sub: "CAMERA · RADAR · GNSS · V2X RADIO",
    activeOn: [1],
  },
  {
    id: "fusion",
    label: "GNN SENSOR FUSION",
    sub: "TRACK ASSOCIATION",
    activeOn: [1],
  },
  {
    id: "planning",
    label: "PLANNING / V2X",
    sub: "CACC · AIN · SPAT",
    activeOn: [2],
  },
  {
    id: "control",
    label: "CONTROL",
    sub: "MPC/PID LONG · STANLEY LAT",
    activeOn: [3],
  },
  {
    id: "actuation",
    label: "ACTUATION",
    sub: "STOCK LYRIQ INTERFACES",
    activeOn: [3],
  },
];

const steps = [
  {
    index: "00 / MISSION",
    title: "A stock Lyriq that drives itself",
    body: "Across the EcoCAR EV Challenge, our Connected and Automated Vehicle team turned a pre-production Cadillac Lyriq into an automated, V2X-connected vehicle — building on the stock onboard systems rather than replacing them. As CAV Lead, I architected the stack and led the 15-student team through final-year delivery.",
  },
  {
    index: "01 / PERCEPTION",
    title: "Seeing the road through fused tracks",
    body: "A global-nearest-neighbor sensor fusion pipeline associates camera and radar detections into stable object tracks the planner can trust, staying consistent through sensor noise, occlusion, and dropouts.",
  },
  {
    index: "02 / PLANNING + V2X",
    title: "Negotiating intersections over the air",
    body: "Cooperative Adaptive Cruise Control and Automatic Intersection Navigation plan speed profiles using V2X signal phase and timing (SPaT) broadcasts — and keep planning safely when that data arrives noisy, late, or not at all.",
  },
  {
    index: "03 / CONTROL",
    title: "Two controllers, one smooth ride",
    body: "MPC and PID handle longitudinal control while a Stanley controller handles lateral tracking, both commanding the Lyriq's stock steering and propulsion interfaces for production-grade ride quality.",
  },
  {
    index: "04 / VALIDATION",
    title: "Proving it before the proving ground",
    body: "Every safety-critical change passes hardware-in-the-loop simulation, then vehicle-in-the-loop testing on a closed course, before the vehicle runs a public competition event. The loop around this whole stack is the point: validation is part of the architecture.",
  },
  {
    index: "05 / RESULTS",
    title: "Year 4 finals — 13 universities",
    body: "The final-year scoring placed the team near the top of the field, with the CAV events — the part of the stack my team owns — leading the way.",
  },
];

const results = [
  { place: "P4", event: "Overall standing" },
  { place: "P1", event: "CAV VTS evaluation" },
  { place: "P2", event: "Competition CAV presentation" },
  { place: "P2", event: "Automatic Intersection Navigation" },
  { place: "P3", event: "AIN energy consumption" },
  { place: "P2", event: "Ride & Drive" },
  { place: "P1·T", event: "Over the Road" },
];

const CaseStudyEcoCar = () => {
  const [containerRef, activeStep] = useStepProgress();
  const allLit = activeStep === steps.length - 1;
  const validationLit = activeStep >= 4;

  const nodeActive = (node) => allLit || node.activeOn.includes(activeStep);

  return (
    <article id="work-ecocar" className="case-study-block">
      <header className="cs-header">
        <span className="cs-kicker">Case Study 01 — EcoCAR EV Challenge</span>
        <h3 className="cs-title">
          An autonomy stack for a pre-production Cadillac Lyriq
        </h3>
        <p className="cs-intro">
          Perception to actuation, validated like production software. Scroll
          through the stack.
        </p>
      </header>

      <div className="case-study" ref={containerRef}>
        <div className="cs-visual" aria-hidden="true">
          <div
            className={`cs-diagram-frame ${validationLit ? "active" : ""}`}
          >
            <span className="cs-frame-label">HIL / VIL VALIDATION LOOP</span>
            <div className="cs-diagram">
              {nodes.map((node, i) => (
                <React.Fragment key={node.id}>
                  {i > 0 && (
                    <span
                      className={`cs-connector ${
                        nodeActive(nodes[i - 1]) && nodeActive(node)
                          ? "active"
                          : ""
                      }`}
                    />
                  )}
                  <div className={`cs-node ${nodeActive(node) ? "active" : ""}`}>
                    <span className="cs-node-label">{node.label}</span>
                    <span className="cs-node-sub">{node.sub}</span>
                  </div>
                </React.Fragment>
              ))}
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
                    {results.map((result, j) => (
                      <motion.div
                        key={result.event}
                        className="result-chip"
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.4, delay: j * 0.08 }}
                      >
                        <span className="chip-place">{result.place}</span>
                        <span className="chip-event">{result.event}</span>
                      </motion.div>
                    ))}
                  </div>
                  <CtaLink
                    href="#contact"
                    variant="primary"
                    className="cs-step-cta"
                    gaLabel="Case study EcoCAR - Get in touch"
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

export default CaseStudyEcoCar;
