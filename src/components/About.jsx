import React, { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { useSectionInView } from "../hooks/useSectionInView";
import { FaCarSide, FaBrain, FaSatelliteDish, FaMicrochip, FaDownload } from "react-icons/fa";
import headshotImg from "../images/headshot.jpg";
import resumePdf from "../other/daniel_szurek_resume.pdf";
import ReactGA from 'react-ga4';
import "./About.css";

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

  const favorites = {
    music: [
      {
        title: "In Rainbows",
        artist: "Radiohead",
        cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/dd/50/c7/dd50c790-99ac-d3d0-5ab8-e3891fb8fd52/634904032463.png/100x100bb.jpg",
      },
      {
        title: "Never Enough",
        artist: "Daniel Caesar",
        cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/24/4f/ec/244fec58-ea20-e0b0-eea6-e06c6aff948b/23UMGIM14483.rgb.jpg/100x100bb.jpg",
      },
      {
        title: "Troupeau Bleu",
        artist: "Cortex",
        cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/72/9d/7a/729d7a9c-8b95-35e6-ac3d-7f54ce400ace/cover.jpg/100x100bb.jpg",
      },
    ],
    books: [
      {
        title: "Dune Messiah",
        author: "Frank Herbert",
        cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication113/v4/89/bc/8d/89bc8d21-8dd7-75a0-ea6e-8ae136e87318/9781101157879.jpg/100x100bb.jpg",
      },
      {
        title: "Greatest Hits",
        author: "Harlan Ellison",
        cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/91/95/ac/9195ac34-4ad9-f76a-3f05-bb90b42f919c/9781454952121.jpg/100x100bb.jpg",
      },
      {
        title: "Crime and Punishment",
        author: "Fyodor Dostoevsky",
        cover: "https://is1-ssl.mzstatic.com/image/thumb/Publication/v4/62/69/b2/6269b227-8903-9dcf-3b4a-e419853472bf/crime_and_punishment.jpg/100x100bb.jpg",
      },
    ],
  };

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
              A glimpse into my world, passions, and what drives me
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
              <h3>Hey! I'm Daniel</h3>
              <p>
                I'm a software engineer focused on Advanced Driver Assistance
                Systems and autonomous vehicles. I recently completed my
                Bachelor of Science in Computer Science at the University of
                Alabama and am continuing into the Accelerated Master's Program
                while leading the Connected and Automated Vehicle (CAV) effort
                on the University's EcoCAR EV Challenge team.
              </p>
              <p>
                This summer I'm joining{" "}
                <span className="highlight-text">General Motors</span> in
                Milford, MI as an{" "}
                <span className="highlight-text">ADAS Software Engineer Intern</span>,
                building an LLM-powered coding agent to automate repetitive
                function creation for the data recording team. On EcoCAR, I
                architect the autonomous navigation stack for a pre-production
                Cadillac Lyriq — integrating Lane Centering, Cooperative
                Adaptive Cruise Control, and V2X connectivity into stock
                onboard systems, with MPC/PID longitudinal control, a Stanley
                lateral controller, and a GNN sensor fusion pipeline.
              </p>
              <p>
                When I'm not coding, you can find me practicing my instrumental
                music skills, traveling to new places, and reading (usually the
                Dune series). Feel free to send me any song or book
                recommendations in the contact section!
              </p>

              <motion.a
                href={resumePdf}
                download="Daniel_Szurek_Resume.pdf"
                className="resume-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => ReactGA.event({
                  category: 'Resume',
                  action: 'Download',
                  label: 'Resume Download',
                })}
              >
                <FaDownload className="resume-icon" />
                Download Resume
              </motion.a>

              <div className="favorites-divider"></div>

              <div className="about-favorites">
                <div className="favorites-group">
                  <h4>On Repeat</h4>
                  <div className="favorites-row">
                    {favorites.music.map((item, index) => (
                      <div key={index} className="favorite-item">
                        <img
                          src={item.cover}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="favorite-details">
                          <span className="song-title">{item.title}</span>
                          <span className="song-artist">{item.artist}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="favorites-group">
                  <h4>Currently Reading</h4>
                  <div className="favorites-row">
                    {favorites.books.map((item, index) => (
                      <div key={index} className="favorite-item">
                        <img
                          src={item.cover}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="favorite-details">
                          <span className="song-title">{item.title}</span>
                          <span className="song-artist">{item.author}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
              { value: "15+", label: "Team Members Led", delay: 0.8 },
              { value: "3.87", label: "Undergraduate GPA", delay: 0.9 },
              { value: "ADAS", label: "Focus Area", delay: 1.0 },
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
                      {stat.value}
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
