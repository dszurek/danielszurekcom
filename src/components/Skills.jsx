import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "../hooks/useSectionInView";
import { FaCarSide, FaBrain, FaCode, FaCloud } from "react-icons/fa";
import "./Skills.css";

const Skills = () => {
  const [ref, inView] = useSectionInView();

  // Ordered for automotive recruiters: the ADAS toolkit leads
  const skillGroups = [
    {
      title: "ADAS & Autonomy",
      icon: <FaCarSide />,
      skills: [
        "ROS 2",
        "MATLAB / Simulink",
        "RTMaps",
        "Model Predictive Control (MPC)",
        "Stanley Controller",
        "Sensor Fusion (GNN)",
        "Hardware-in-the-Loop (HIL)",
        "Vehicle-in-the-Loop (VIL)",
        "V2X / DSRC",
        "dSPACE AUTERA",
        "CAN Bus",
        "Embedded Systems",
      ],
    },
    {
      title: "AI & Machine Learning",
      icon: <FaBrain />,
      skills: [
        "PyTorch",
        "Computer Vision (CNNs)",
        "Gaussian Processes",
        "Reinforcement Learning",
        "LLM Integration (OpenAI API)",
        "LangChain",
        "Agentic AI",
        "Model Quantization",
      ],
    },
    {
      title: "Programming Languages",
      icon: <FaCode />,
      skills: [
        "Python",
        "C++",
        "C",
        "MATLAB",
        "SQL",
        "JavaScript (React)",
        "Dart (Flutter)",
        "Java",
        "Swift",
        "Scala",
        "Lisp",
        "Haskell",
        "Assembly",
      ],
    },
    {
      title: "Cloud, DevOps & Web",
      icon: <FaCloud />,
      skills: [
        "Azure (Data Factory, Databricks)",
        "Docker",
        "Git",
        "Linux (Ubuntu)",
        "REST APIs",
        "React",
        "Flutter",
        "Full-Stack Development",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
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

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="skills-container">
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">My Toolkit</span>
          <h2 className="section-title gradient-text">Technical Skills</h2>
          <p className="section-description">
            Languages, frameworks, and tools I work with
          </p>
        </motion.div>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.title}
              className="skill-group glass"
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="skill-group-header">
                <div className="skill-group-icon">{group.icon}</div>
                <h3 className="skill-group-title">{group.title}</h3>
              </div>
              <div className="skill-tags">
                {group.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="skill-tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      inView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.03 }}
                    whileHover={{ scale: 1.08 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
