import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import ReactGA from "react-ga4";
import { useActiveSection } from "../hooks/useActiveSection";
import "./Navbar.css";

/* Sections double as "gears": P while parked at the top, then D1–D6 as you
   drive down the page. */
const navItems = [
  { name: "Home", href: "#hero", id: "hero", gear: "P" },
  { name: "About", href: "#about", id: "about", gear: "D1" },
  { name: "Projects", href: "#projects", id: "projects", gear: "D2" },
  { name: "Experience", href: "#experience", id: "experience", gear: "D3" },
  { name: "Education", href: "#education", id: "education", gear: "D4" },
  { name: "Skills", href: "#skills", id: "skills", gear: "D5" },
  { name: "Contact", href: "#contact", id: "contact", gear: "D6" },
];

const sectionIds = navItems.map((item) => item.id);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const activeId = useActiveSection(sectionIds);
  const activeItem =
    navItems.find((item) => item.id === activeId) ?? navItems[0];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (itemName) => {
    ReactGA.event({
      category: "Navigation",
      action: "Click",
      label: itemName,
    });
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`navbar ${isScrolled ? "scrolled" : ""} ${
        isMobileMenuOpen ? "mobile-open" : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="navbar-container">
        <div className="navbar-left">
          <motion.a
            href="#hero"
            className="navbar-logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick("Logo")}
          >
            <span className="logo-text">DS</span>
          </motion.a>

          <div
            className="gear-indicator"
            aria-hidden="true"
            title={`Section: ${activeItem.name}`}
          >
            <span className="gear-label">Gear</span>
            <span className="gear-window">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={activeItem.gear}
                  className="gear-value"
                  initial={{ y: "1.1em", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-1.1em", opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {activeItem.gear}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
        </div>

        <div className="navbar-menu desktop">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className={`navbar-link ${item.id === activeId ? "active" : ""}`}
              aria-current={item.id === activeId ? "true" : undefined}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -2 }}
              onClick={() => handleNavClick(item.name)}
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`mobile-menu-link ${
                  item.id === activeId ? "active" : ""
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleNavClick(item.name)}
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.span
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
    </motion.nav>
  );
};

export default Navbar;
