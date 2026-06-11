import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import ReactGA from "react-ga4";
import "./Hero.css";

/* Cycling perception-classifier labels — all 13 chars so the chip never resizes */
const classifications = [
  { label: "ADAS_ENGINEER", confidence: "0.99" },
  { label: "CAV_TEAM_LEAD", confidence: "0.98" },
  { label: "ML_RESEARCHER", confidence: "0.97" },
];

/* The canonical AV software stack, shown booting up */
const stackSystems = ["Perception", "Planning", "Control"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, (v) => v * 0.5);

  const [classIndex, setClassIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(
      () => setClassIndex((i) => (i + 1) % classifications.length),
      3200
    );
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  const { label, confidence } = classifications[classIndex];

  return (
    <section id="hero" className="hero">
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: shouldReduceMotion ? 0 : parallaxY }}
      >
        <motion.div className="hero-status" variants={itemVariants}>
          {stackSystems.map((system, i) => (
            <span
              key={system}
              className="status-pill"
              style={{ "--pill-delay": `${0.8 + i * 0.5}s` }}
            >
              <span className="status-dot" />
              {system}
            </span>
          ))}
        </motion.div>

        <motion.h1 className="hero-title" variants={itemVariants}>
          <span className="hero-greeting">Hello, I'm</span>
          <span className="detection-frame">
            <span className="hero-name gradient-text">Daniel Szurek</span>
            <span className="frame-corner corner-tl" aria-hidden="true" />
            <span className="frame-corner corner-tr" aria-hidden="true" />
            <span className="frame-corner corner-bl" aria-hidden="true" />
            <span className="frame-corner corner-br" aria-hidden="true" />
            <span className="frame-scan" aria-hidden="true" />
            <span className="detection-chip" aria-hidden="true">
              <span className="chip-label-window">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={label}
                    className="chip-label"
                    initial={{ y: "1em", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-1em", opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {label}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="chip-confidence">{confidence}</span>
            </span>
          </span>
        </motion.h1>

        <motion.p className="hero-subtitle" variants={itemVariants}>
          Software Engineer specializing in
          <span className="highlight"> ADAS</span>,
          <span className="highlight"> Autonomous Vehicle Systems</span>, and
          <span className="highlight"> Applied Machine Learning</span>
        </motion.p>

        <motion.div className="hero-cta" variants={itemVariants}>
          <motion.a
            href="#projects"
            className="cta-button primary"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 40px rgba(139, 90, 60, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              ReactGA.event({
                category: "User Interaction",
                action: "Click",
                label: "Hero - View My Work",
              })
            }
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            className="cta-button secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              ReactGA.event({
                category: "User Interaction",
                action: "Click",
                label: "Hero - Get In Touch",
              })
            }
          >
            Get In Touch
          </motion.a>
        </motion.div>

        <motion.div className="hero-scroll" variants={itemVariants}>
          <div className="scroll-indicator">
            <span>Scroll to explore</span>
            <motion.div
              className="scroll-line"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      <div className="hero-decoration" aria-hidden="true">
        <span className="radar-ring ring-1" />
        <span className="radar-ring ring-2" />
        <span className="radar-ring ring-3" />
        <span className="radar-sweep" />
      </div>
    </section>
  );
};

export default Hero;
