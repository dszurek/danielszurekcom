import React, { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { useSectionInView } from "../hooks/useSectionInView";
import { FaCarSide, FaBrain, FaSatelliteDish, FaMicrochip, FaDownload } from "react-icons/fa";
import headshotImg from "../images/headshot.jpg";
import resumePdf from "../other/daniel_szurek_resume.pdf";
import ReactGA from 'react-ga4';
import CtaLink from "./CtaLink";
import SectionIndex from "./SectionIndex";
import { useCountUp } from "../hooks/useCountUp";
import "./About.css";

/* Gauge readout that ticks up the first time it scrolls into view */
const StatValue = ({ value, suffix = "", decimals = 0 }) => {
  const [ref, display] = useCountUp(value, { decimals });
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

const About = () => {
  const [ref, inView] = useSectionInView();

  const sectionRef = useRef(null);

  // Use scroll progress based on section position for parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Create parallax transform - moves from 0 to -200px as you scroll through the section
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const interests = [
    {
      icon: <FaCarSide />,
      title: "ADAS & Vehicle Control",
      description:
        "Architecting full-stack ADAS — lane centering, cooperative adaptive cruise control, and automatic intersection navigation — with MPC, PID, and Stanley controllers in MATLAB/Simulink.",
    },
    {
      icon: <FaBrain />,
      title: "AI for Autonomy",
      description:
        "Applying Gaussian Processes, Reinforcement Learning, and LLM-based agents to make autonomous systems more reliable, efficient, and developer-friendly.",
    },
    {
      icon: <FaSatelliteDish />,
      title: "Sensor Fusion & V2X",
      description:
        "Designing global nearest neighbor (GNN) sensor fusion pipelines and V2X-aware controllers that stay safe under noisy SPaT data and packet loss.",
    },
    {
      icon: <FaMicrochip />,
      title: "HIL / VIL Validation",
      description:
        "Validating safety-critical software through rigorous Hardware-in-the-Loop and Vehicle-in-the-Loop testing on pre-production vehicles like the Cadillac Lyriq.",
    },
  ];

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about-container" ref={ref}>
        {/* Wrap header and intro in single motion group for unified parallax */}
        <motion.div className="about-header-intro-group" style={{ y }}>
          <motion.div
            className="about-header"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <SectionIndex index={2} name="About" />
            <motion.span className="section-label" variants={itemVariants}>
              Get to know me
            </motion.span>
            <motion.h2
              className="section-title gradient-text"
              variants={itemVariants}
            >
              About Me
            </motion.h2>
            <motion.p className="section-description" variants={itemVariants}>
              Who I am, what I build, and why
            </motion.p>
          </motion.div>

          <motion.div
            className="about-intro glass"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="intro-image">
              <div className="image-placeholder">
                <img
                  src={headshotImg}
                  alt="Daniel Szurek"
                  className="headshot-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="image-decoration"></div>
            </div>

            <div className="intro-text">
              <h3>I'm Daniel Szurek</h3>
              <p>
                I build software that helps vehicles drive themselves. I'm
                completing the Accelerated Master's Program in Computer Science
                at the University of Alabama while leading the Connected and
                Automated Vehicle (CAV) team for the university's EcoCAR EV
                Challenge program.
              </p>
              <p>
                This summer I'm at{" "}
                <span className="highlight-text">General Motors</span> in
                Milford, MI as an{" "}
                <span className="highlight-text">
                  ADAS Software Engineer Intern
                </span>
                , automating the path from Jira ticket to reviewed pull request
                for the data recording team. On EcoCAR, I architected the
                autonomous navigation stack for a pre-production Cadillac Lyriq
                — Lane Centering, Cooperative Adaptive Cruise Control, and V2X
                connectivity built on stock onboard systems, with MPC/PID
                longitudinal control, a Stanley lateral controller, and a GNN
                sensor fusion pipeline.
              </p>

              <CtaLink
                href={resumePdf}
                variant="secondary"
                className="compact resume-cta"
                download="Daniel_Szurek_Resume.pdf"
                onClick={() =>
                  ReactGA.event({
                    category: "Resume",
                    action: "Download",
                    label: "Resume Download",
                  })
                }
              >
                <FaDownload aria-hidden="true" />
                Download resume
              </CtaLink>
            </div>
          </motion.div>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-interests"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <h3 className="interests-title">What I'm Passionate About</h3>
            <div className="interests-grid">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.title}
                  className="interest-card glass-light"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(212, 197, 185, 0.08)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="interest-icon">{interest.icon}</div>
                  <h4>{interest.title}</h4>
                  <p>{interest.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about-stats"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { value: 15, suffix: "+", decimals: 0, label: "Team Members Led", delay: 0.8 },
              { value: 3.87, suffix: "", decimals: 2, label: "Undergraduate GPA", delay: 0.9 },
              { value: "ADAS", suffix: "", decimals: 0, label: "Focus Area", delay: 1.0 },
            ].map((stat) => (
              <div className="stat-card glass" key={stat.label}>
                <div className="gauge">
                  <div className="gauge-track" />
                  {inView && <div className="gauge-fill" />}
                  <div className="gauge-ticks" />
                  <div className="gauge-center">
                    <motion.div
                      className="stat-number gradient-text"
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : { scale: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: stat.delay,
                        type: "spring",
                      }}
                    >
                      <StatValue
                        value={stat.value}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                      />
                    </motion.div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
