import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "../hooks/useSectionInView";
import SectionHeader from "./SectionHeader";
import { FaAward, FaBook, FaFileAlt, FaExternalLinkAlt } from "react-icons/fa";
import ReactGA from "react-ga4";
import uaLogo from "../images/ua_logo.png";
import "./Education.css";

const Education = () => {
  const [ref, inView] = useSectionInView();

  const education = [
    {
      id: 1,
      degree: "Master of Science in Computer Science",
      institution: "The University of Alabama",
      location: "Tuscaloosa, AL",
      period: "May 2025 - December 2026",
      gpa: "3.67/4.0",
      description:
        "Accelerated Master's Program (AMP) focused on Artificial Intelligence, Machine Learning, and Autonomous Systems. Conducting research on Model Predictive Control, reinforcement learning, and Gaussian Processes for V2X-aware autonomous navigation and vehicle efficiency optimization.",
      achievements: [
        "Accelerated Master's Program (AMP) candidate",
        "Active research on MPCs, RL, and Gaussian Processes for autonomous systems",
        "Leading the EcoCAR CAV team through the final year of the EV Challenge",
      ],
      icon: (
        <img
          src={uaLogo}
          alt="UA Logo"
          className="degree-logo"
          loading="lazy"
          decoding="async"
        />
      ),
    },
    {
      id: 2,
      degree: "Bachelor of Science in Computer Science",
      institution: "The University of Alabama",
      location: "Tuscaloosa, AL",
      period: "August 2022 - May 2026",
      gpa: "3.87/4.0",
      description:
        "Graduated Summa Cum Laude with a Mathematics minor. Comprehensive foundation in software development, algorithms, data structures, artificial intelligence, and system design. Active member of the EcoCAR team throughout undergraduate career, progressing from UI developer to Connected and Automated Vehicle Lead.",
      achievements: [
        "Graduated Summa Cum Laude",
        "Honors College member",
        "Upsilon Pi Epsilon Computer Science Honor Society",
        "Presidential Scholarship recipient",
        "SEMA Memorial Scholarship recipient",
        "Dean's List all semesters",
      ],
      icon: (
        <img
          src={uaLogo}
          alt="UA Logo"
          className="degree-logo"
          loading="lazy"
          decoding="async"
        />
      ),
    },
  ];

  const publications = [
    {
      title:
        "Gaussian Process–Based Model Predictive Control for Robust Autonomous Intersection Navigation Under Degraded V2I Communication",
      venue: "IEEE ITEC+EATS 2026",
      status: "First author · Published",
      summary:
        "A five-feature Gaussian Process predicts signal timing through V2I outages and emits a confidence signal that tightens a nonlinear MPC — zero red-light violations across 35 configurations, up to 33.1% packet loss.",
      doi: "10.1109/ITECEATS66641.2026.11593068",
      xplore: "https://ieeexplore.ieee.org/document/11593068",
    },
    {
      title:
        "Adaptive MPC Weight Tuning via Reinforcement Learning for Eco-Driving: Framework and Oracle Gap Analysis",
      venue: "IEEE ITEC+EATS 2026",
      status: "Co-author · Published",
      summary:
        "A Soft Actor-Critic agent tunes MPC cost weights as residual adjustments around a tuned baseline, benchmarked against an oracle grid search — +1.4% energy over fixed weights on an unseen drive cycle.",
      doi: "10.1109/ITECEATS66641.2026.11592971",
      xplore: "https://ieeexplore.ieee.org/document/11592971",
    },
    {
      title:
        "Lane Centering Under Camera Failures: Classical Control vs. Reinforcement Learning for ADAS",
      venue: "IEEE ITEC+EATS 2026",
      status: "Co-author · Published",
      summary:
        "A Kalman-filter + nested-PID baseline versus a SAC-LSTM agent on a shared Cadillac LYRIQ plant under a six-state Markov camera-failure model — sub-2 cm RMS lateral error at the classical baseline.",
      doi: "10.1109/ITECEATS66641.2026.11592966",
      xplore: "https://ieeexplore.ieee.org/document/11592966",
    },
    {
      title: "EcoCAR EV Challenge — CAV Final Presentation",
      venue: "ASME DRIVN",
      status: "Upcoming · Sep 2026",
      summary:
        "Capstone presentation of the team's connected and automated vehicle program on the Cadillac Lyriq.",
    },
  ];

  const courses = [
    "Artificial Intelligence",
    "Introduction to Robotics",
    "Computer Vision",
    "Programming Languages",
    "Physics Guided Machine Learning",
    "Data Structures & Algorithms",
    "Model Predictive Control",
    "Reinforcement Learning",
    "Sensor Fusion",
    "Advanced Mathematics",
  ];

  return (
    <section id="education" className="education" ref={ref}>
      <div className="education-container">
        <SectionHeader
          className="education-header"
          index={5}
          name="Education"
          label="Academic Background"
          title="Education"
          description="My academic journey and continuous learning path"
        />

        <div className="education-content">
          {/* Degrees Section */}
          <motion.div
            className="education-degrees"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                className="degree-card glass"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={
                  inView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
                }
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="degree-icon">{edu.icon}</div>

                <div className="degree-content">
                  <h3 className="degree-title">{edu.degree}</h3>
                  <h4 className="degree-institution">{edu.institution}</h4>

                  <div className="degree-meta">
                    <span className="degree-location">{edu.location}</span>
                    <span className="degree-period">{edu.period}</span>
                    <span className="degree-gpa">GPA: {edu.gpa}</span>
                  </div>

                  <p className="degree-description">{edu.description}</p>

                  <div className="degree-achievements">
                    <h5>
                      <FaAward /> Achievements
                    </h5>
                    <ul>
                      {edu.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="publications-section glass"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="subsection-title">
              <FaFileAlt /> Research &amp; Publications
            </h3>
            <ul className="publications-list">
              {publications.map((pub, index) => (
                <motion.li
                  key={pub.title}
                  className="publication-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                >
                  <div className="publication-meta">
                    <span className="publication-venue">{pub.venue}</span>
                    <span
                      className={`publication-status ${
                        pub.status.startsWith("Upcoming") ? "upcoming" : ""
                      }`}
                    >
                      {pub.status}
                    </span>
                  </div>
                  <h4 className="publication-title">{pub.title}</h4>
                  <p className="publication-summary">{pub.summary}</p>
                  {pub.xplore && (
                    <div className="publication-links">
                      <a
                        className="publication-link"
                        href={pub.xplore}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`DOI ${pub.doi}`}
                        onClick={() =>
                          ReactGA.event({
                            category: "Publication",
                            action: "Open on IEEE Xplore",
                            label: pub.title,
                          })
                        }
                      >
                        IEEE Xplore <FaExternalLinkAlt aria-hidden="true" />
                      </a>
                    </div>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div className="education-extra">
            <motion.div
              className="courses-section glass"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="subsection-title">
                <FaBook /> Key Coursework & Technical Areas
              </h3>
              <div className="courses-grid">
                {courses.map((course, index) => (
                  <motion.div
                    key={index}
                    className="course-tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      inView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {course}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
