import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import ReactGA from "react-ga4";
import CtaLink from "./CtaLink";
import { useCountUp } from "../hooks/useCountUp";
import ainPaper from "../other/ain_paper.pdf";
import drlMpcPaper from "../other/DRL-mpc.pdf";
import laneCenteringPaper from "../other/LCC_classic-v-rl.pdf";
import "./ResearchDossier.css";

/* Three IEEE ITEC papers, with the real titles, authorship, and numbers
   pulled straight from the manuscripts in src/other. */
const papers = [
  {
    id: "gp-mpc",
    number: "01",
    venue: "IEEE ITEC",
    role: "First author",
    lead: true,
    title:
      "Gaussian Process–Based Model Predictive Control for Robust Autonomous Intersection Navigation Under Degraded V2I Communication",
    problem:
      "Intersection eco-driving leans on V2I signal timing, but packet loss of 10–30% is common beyond 100 m and multi-second blackouts hit during infrastructure handoffs — most controllers simply assume the feed is reliable.",
    approach:
      "A five-feature Automatic Relevance Determination Gaussian Process predicts time-to-phase-change through outages and emits a confidence signal. That signal tightens a nonlinear MPC's intersection-aware constraints and drives a state machine with phase filtering and committed-stop latching — one uncertainty-aware pipeline from V2I to actuator.",
    metrics: [
      { value: 0, label: "Red-light violations across 35 configurations" },
      { value: 33.1, suffix: "%", decimals: 1, label: "Packet loss tolerated with zero violations" },
      { value: 13.7, suffix: "%", decimals: 1, label: "Comfort degradation, ideal → severe noise" },
      { value: 38.4, suffix: "%", decimals: 1, label: "Energy reduction from the GLOSA advisory" },
    ],
    paper: ainPaper,
  },
  {
    id: "rl-mpc",
    number: "02",
    venue: "IEEE ITEC",
    role: "Co-author · 2nd",
    title:
      "Adaptive MPC Weight Tuning via Reinforcement Learning for Eco-Driving: Framework and Oracle Gap Analysis",
    problem:
      "MPC cost weights tuned for highway cruising fall short in stop-and-go traffic — no single fixed weighting wins across regimes, yet unconstrained learning can destabilize a safety-critical controller.",
    approach:
      "A Soft Actor-Critic agent outputs residual weight adjustments around a hand-tuned baseline, so that baseline stays a guaranteed performance floor. An oracle grid search over EPA drive cycles quantifies the achievable ceiling, framing the learning problem honestly against both bounds.",
    metrics: [
      { value: 4.3, suffix: "%", decimals: 1, label: "Oracle energy headroom over fixed weights" },
      { value: 1.4, prefix: "+", suffix: "%", decimals: 1, label: "Energy gain vs. fixed on an unseen cycle" },
      { value: 3, label: "EPA drive cycles evaluated" },
      { value: 0, label: "Collisions across every run" },
    ],
    paper: drlMpcPaper,
  },
  {
    id: "lane-centering",
    number: "03",
    venue: "IEEE ITEC",
    role: "Co-author · 3rd",
    title:
      "Lane Centering Under Camera Failures: Classical Control vs. Reinforcement Learning for ADAS",
    problem:
      "Production lane centering rides on a single forward camera — vulnerable to occlusion, weather, and hardware faults. How do classical and learned lateral controllers really compare once that camera degrades?",
    approach:
      "A Kalman-filter + nested-PID baseline goes head-to-head with a SAC-LSTM agent on a shared Cadillac LYRIQ Simulink plant, both stressed by a six-state Markov camera-failure model — a reproducible, shared-plant framework for the performance–robustness tradeoff.",
    metrics: [
      { value: 2, prefix: "<", suffix: " cm", label: "RMS lateral error, nominal (classical baseline)" },
      { value: 6, label: "Markov camera-failure states (F0–F5)" },
      { value: 5, label: "Road scenarios, straight to sharp curve" },
      { value: 13, label: "RL training runs characterized" },
    ],
    paper: laneCenteringPaper,
  },
];

const overview = [
  { value: 3, label: "Papers" },
  { value: 1, label: "First author" },
  { value: 35, suffix: "+", label: "Test configurations" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Metric = ({ value, prefix = "", suffix = "", decimals = 0, label }) => {
  const [ref, display] = useCountUp(value, { decimals });
  return (
    <div className="rd-metric">
      <span className="rd-metric-value" ref={ref}>
        {prefix}
        {display}
        {suffix}
      </span>
      <span className="rd-metric-label">{label}</span>
    </div>
  );
};

const CaseStudyResearch = () => (
  <article id="work-research" className="case-study-block research-dossier">
    <header className="cs-header">
      <span className="cs-kicker">Case Study 02 — Controls Research</span>
      <h3 className="cs-title">Learning meets model-based control</h3>
      <p className="cs-intro">
        One question runs through all three papers: how do you combine
        learning-based methods with model-based control so a vehicle is both
        adaptive and provably safe? Each was presented at the IEEE
        Transportation Electrification Conference; the team's CAV final
        presentation heads to ASME DRIVN in September 2026.
      </p>

      <div className="rd-overview">
        {overview.map((stat) => (
          <Metric key={stat.label} {...stat} />
        ))}
      </div>
    </header>

    <motion.div
      className="rd-grid"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ staggerChildren: 0.12 }}
    >
      {papers.map((paper) => (
        <motion.article
          key={paper.id}
          className={`rd-card glass ${paper.lead ? "lead" : ""}`}
          variants={cardVariants}
        >
          <div className="rd-card-top">
            <span className="rd-number">PAPER {paper.number}</span>
            <div className="rd-badges">
              <span className="rd-venue">{paper.venue}</span>
              <span className={`rd-role ${paper.lead ? "lead" : ""}`}>
                {paper.role}
              </span>
            </div>
          </div>

          <h4 className="rd-title">{paper.title}</h4>

          <div className="rd-body">
            <div className="rd-block">
              <span className="rd-block-label">The problem</span>
              <p>{paper.problem}</p>
            </div>
            <div className="rd-block">
              <span className="rd-block-label">The approach</span>
              <p>{paper.approach}</p>
            </div>
          </div>

          <div className="rd-metrics">
            {paper.metrics.map((metric) => (
              <Metric key={metric.label} {...metric} />
            ))}
          </div>

          <a
            className="rd-link"
            href={paper.paper}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              ReactGA.event({
                category: "Publication",
                action: "View",
                label: paper.title,
              })
            }
          >
            View paper <FaExternalLinkAlt aria-hidden="true" />
          </a>
        </motion.article>
      ))}
    </motion.div>

    <div className="rd-footer">
      <p className="rd-footer-note">
        Full manuscripts open in your browser. Want to talk through the methods
        or results?
      </p>
      <CtaLink
        href="#contact"
        variant="primary"
        gaLabel="Case study research - Get in touch"
      >
        Get in touch
      </CtaLink>
    </div>
  </article>
);

export default CaseStudyResearch;
