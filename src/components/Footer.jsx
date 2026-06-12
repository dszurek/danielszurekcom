import React from "react";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
} from "react-icons/fa";
import ReactGA from "react-ga4";
import "./Footer.css";

const sections = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

const trackFooterClick = (label) =>
  ReactGA.event({ category: "Footer", action: "Click", label });

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-container">
      <div className="footer-grid">
        <div className="footer-identity">
          <a
            href="#hero"
            className="footer-logo"
            onClick={() => trackFooterClick("Logo")}
          >
            DS
          </a>
          <p className="footer-positioning">
            ADAS software engineer — perception to control, validated on real
            vehicles.
          </p>
        </div>

        <nav className="footer-col" aria-label="Footer navigation">
          <h4>Site</h4>
          <ul>
            {sections.map((section) => (
              <li key={section.name}>
                <a
                  href={section.href}
                  onClick={() => trackFooterClick(section.name)}
                >
                  {section.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>
              <a
                href="mailto:djszurek@crimson.ua.edu"
                onClick={() => trackFooterClick("Email")}
              >
                <FaEnvelope aria-hidden="true" /> djszurek@crimson.ua.edu
              </a>
            </li>
            <li>
              <span className="footer-static">
                <FaMapMarkerAlt aria-hidden="true" /> Tuscaloosa, AL, USA
              </span>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/danielszurek"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackFooterClick("LinkedIn")}
              >
                <FaLinkedin aria-hidden="true" /> LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.github.com/dszurek"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackFooterClick("GitHub")}
              >
                <FaGithub aria-hidden="true" /> GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Daniel Szurek. All rights reserved.
        </span>
        <a href="#hero" onClick={() => trackFooterClick("Back to top")}>
          Back to top
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
