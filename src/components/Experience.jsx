import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "../hooks/useSectionInView";
import SectionHeader from "./SectionHeader";
import { FaBriefcase, FaCalendar, FaMapMarkerAlt } from "react-icons/fa";
import ecocarLogo from "../images/ecocar_logo.png";
import ssabLogo from "../images/ssab_logo.png";
import bgLogo from "../images/bg_logo.png";
import "./Experience.css";
import gmLogo from "../images/gm_logo.png";

const Experience = () => {
  const [ref, inView] = useSectionInView();

  const experiences = [
    {
      id: 0,
      company: "General Motors",
      position: "ADAS Software Engineer Intern",
      location: "Milford, MI",
      period: "May 2026 - August 2026",
      summary:
        "On GM's ADAS data recording team — the infrastructure that captures critical event data for ADAS feature teams — I built an end-to-end automation pipeline that took a Jira ticket all the way to a reviewed GitHub pull request, cutting manual signal-recording-function authoring time by 80%.",
      achievements: [
        "Engineered an agentic LLM-driven pipeline in Python that turned a Jira ticket into a generated Event Data Recorder (EDR) signal recording definition function and an opened GitHub pull request, reducing manual authoring time by 80%",
        "Modernized a legacy Simulink model untouched for four years and developed embedded C code for the EDR",
        "Built data recording infrastructure supporting 10+ ADAS feature teams for safety-critical validation across thousands of test miles",
        "Automated IBM Rhapsody model updates through its API so generated functions stayed in sync with the system engineering model",
        "Supported on-vehicle data collection at the Milford Proving Grounds, debugging recording configurations against live test runs to match feature-team signal requirements",
        "Collaborated with ADAS feature teams to translate recording requirements into automated, scalable software solutions",
      ],
      technologies: [
        "Python",
        "Embedded C",
        "Simulink",
        "Jira API",
        "GitHub API",
        "IBM Rhapsody",
        "Agentic AI",
        "ADAS",
      ],
      logo: gmLogo,
    },
    {
      id: 1,
      company: "EcoCAR EV Challenge - The University of Alabama",
      position: "Connected and Automated Vehicle (CAV) Lead",
      location: "Tuscaloosa, AL",
      period: "September 2025 - Present",
      summary:
        "I lead a 15-student team building the full self-driving stack on a pre-production Cadillac Lyriq — Lane Centering, Cooperative Adaptive Cruise Control, V2X connectivity, and multi-sensor fusion — pairing MPC/PID longitudinal control with a Stanley lateral controller and a GNN fusion pipeline, then proving it all out through rigorous hardware- and vehicle-in-the-loop testing.",
      achievements: [
        "Architected the autonomous navigation stack for a pre-production Cadillac Lyriq integrating Lane Centering, CACC, and V2X",
        "Developed MPC/PID longitudinal control, a lateral Stanley controller, and a GNN-based sensor fusion pipeline, cutting lateral tracking error to under 30 cm in HIL testing",
        "Validated system performance through rigorous HIL and VIL testing on safety-critical software",
        "Led a team of 15 students in the final year of the EcoCAR EV Challenge",
        "Year 4 finals (13 universities): 4th overall — 1st in CAV Vehicle Technical Specifications, 2nd in MathWorks Model-Based Design, 2nd in the competition CAV presentation, 2nd in Automatic Intersection Navigation, 3rd in AIN energy consumption, 2nd in Ride & Drive",
        "Published three research papers at IEEE ITEC+EATS 2026 (robust AIN optimization, hybrid DRL-MPC eco-driving, RL vs. MPC lane centering), with the CAV final presentation headed to ASME DRIVN in September 2026",
      ],
      technologies: [
        "MATLAB",
        "Simulink",
        "RTMaps",
        "Python",
        "C++",
        "Sensor Fusion",
        "MPC",
        "Stanley Controller",
        "V2X",
        "Reinforcement Learning",
      ],
      logo: ecocarLogo,
      isCurrent: true,
      progression: [
        {
          title: "CAV Lead",
          period: "Sep 2025 - Present",
          note: "Leading overall CAV system architecture, team coordination, and AI research efforts",
        },
        {
          title: "Voice Assistant Project Lead",
          period: "Sep 2024 - Aug 2025",
          note: "Led 5-student team developing LLM-based voice assistant on NXP NavQ+ companion computer",
        },
        {
          title: "User Experience Project Member",
          period: "Aug 2022 - Sep 2024",
          note: "Developed Android infotainment UI with Flutter, built maps/navigation software with GPS and routing",
        },
      ],
    },
    {
      id: 2,
      company: "SSAB Special Steels",
      position: "Data Science Co-Op",
      location: "Mobile, AL",
      period: "May 2025 - August 2025",
      summary:
        "Built automated ETL pipelines in Azure Data Factory and SQL and turned them into Power BI and Tableau dashboards that drove quarterly financial reporting and live, sensor-fed production targeting — giving plant leadership the numbers to set optimal targets, which I regularly presented to senior managers and international colleagues in Sweden and Finland.",
      achievements: [
        "Engineered automated ETL pipelines using Azure Data Factory and SQL to process large-scale manufacturing datasets",
        "Designed and implemented a project portfolio dashboard in Power BI, automating quarterly financial reporting",
        "Built and deployed cost-comparison solutions in Tableau and SQL, simplifying workflows for high-volume datasets",
        "Built dynamic production capacity models in Power BI, enabling leadership to define optimal targets based on live sensor data",
        "Led presentations for senior managers and hosted international meetings with colleagues in Sweden and Finland",
      ],
      technologies: [
        "Azure Data Factory",
        "Power BI",
        "Tableau",
        "SQL",
        "Grafana",
        "Tableau Prep",
      ],
      logo: ssabLogo,
    },
    {
      id: 3,
      company: "Brasfield & Gorrie, L.L.C.",
      position: "Process Development Intern",
      location: "Birmingham, AL",
      period: "May 2024 - August 2024; December 2024 - January 2025",
      summary:
        "Replaced brittle, manual Excel workflows with a Power Apps database application and automated reporting pipelines on Azure Databricks and Power BI — plus a Trello-integrated IT ticketing system and a contractor-watchlist audit tool — cutting report generation time and making compliance far easier for leadership to track.",
      achievements: [
        "Replaced manual Excel workflows with Power Apps database application",
        "Automated reporting pipelines with Azure Databricks and Power BI",
        "Integrated Trello API for IT support ticketing system",
        "Enhanced compliance tracking with contractor watchlist audit tool",
      ],
      technologies: [
        "SQL",
        "Power BI",
        "Azure Databricks",
        "Power Apps",
        "Power Automate",
        "Microsoft Azure",
      ],
      logo: bgLogo,
      progression: [
        {
          title: "Process Development Intern (Winter Return)",
          period: "Dec 2024 - Jan 2025",
          note: "Returned to continue project development and implement new automation ideas",
        },
        {
          title: "Process Development Intern",
          period: "May 2024 - Aug 2024",
          note: "Initial internship developing database applications and automation solutions",
        },
      ],
    },
  ];

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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="experience" className="experience" ref={ref}>
      <div className="experience-container">
        <SectionHeader
          className="experience-header"
          index={4}
          name="Experience"
          label="Career Journey"
          title="Work Experience"
          description="My professional journey and key accomplishments"
        />

        <motion.div
          className="experience-timeline"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="experience-item"
              variants={itemVariants}
            >
              <div className="experience-marker">
                <div className="marker-dot"></div>
                <div className="marker-line"></div>
              </div>

              <motion.div
                className="experience-card glass"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="experience-header-info">
                  <div className="company-badge">
                    {exp.logo ? (
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="company-logo"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <FaBriefcase />
                    )}
                  </div>
                  <div className="experience-title-section">
                    <h3 className="experience-position">
                      {exp.position}
                      {exp.isCurrent && (
                        <span className="upcoming-tag">Current</span>
                      )}
                    </h3>
                    <h4 className="experience-company">{exp.company}</h4>
                  </div>
                </div>

                <div className="experience-meta">
                  <span className="meta-item">
                    <FaCalendar />
                    {exp.period}
                  </span>
                  <span className="meta-item">
                    <FaMapMarkerAlt />
                    {exp.location}
                  </span>
                </div>

                {exp.summary && (
                  <p className="experience-summary">{exp.summary}</p>
                )}

                <div className="experience-achievements">
                  <h5>Key Achievements:</h5>
                  <ul>
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={
                          inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                        }
                        transition={{ delay: 0.5 + index * 0.2 + i * 0.1 }}
                      >
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                {exp.progression && (
                  <div className="experience-progression">
                    <h5>Position Progression</h5>
                    <div className="progression-list">
                      {exp.progression.map((p, idx) => (
                        <div className="progress-item glass-light" key={idx}>
                          <div className="progress-role">{p.title}</div>
                          <div className="progress-meta">
                            {p.period} • {p.note}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="experience-tech">
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
