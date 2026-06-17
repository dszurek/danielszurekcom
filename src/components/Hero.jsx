import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import CtaLink from "./CtaLink";
import "./Hero.css";

/* Cycling perception-classifier labels — all 13 chars so the chip never resizes */
const classifications = [
  { label: "ADAS_ENGINEER", confidence: "0.99" },
  { label: "CAV_TEAM_LEAD", confidence: "0.98" },
  { label: "ML_RESEARCHER", confidence: "0.97" },
];


/* Ignition pass (first visit this session): quick stagger so the whole
   choreography — pills, corners, scan, chip — lands inside ~1.2s. Warm
   visits skip the stagger entirely. */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const warmContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
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

  // Ignition choreography plays once per session
  const [warm] = useState(() => {
    try {
      return sessionStorage.getItem("ignition") === "done";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem("ignition", "done");
    } catch {
      /* private mode — choreography simply replays */
    }
  }, []);

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
    <section id="hero" className={`hero ${warm ? "warm" : "boot"}`}>
      <motion.div
        className="hero-content"
        variants={warm ? warmContainerVariants : containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: shouldReduceMotion ? 0 : parallaxY }}
      >
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
          <CtaLink href="#contact" variant="primary" gaLabel="Hero - Get in touch">
            Get in touch
          </CtaLink>
          <CtaLink href="#projects" variant="secondary" gaLabel="Hero - View work">
            View my work
          </CtaLink>
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
