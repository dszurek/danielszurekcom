import React from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import BodyLine from "./components/BodyLine";
import AnimatedBackground from "./components/AnimatedBackground";
import ReactGA from "react-ga4";
import "./App.css";

// testMode keeps dev/preview sessions out of the live analytics property
ReactGA.initialize("G-ZM8WYZKD3L", { testMode: !import.meta.env.PROD });

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="app">
        <AnimatedBackground />
        <Navbar />
        <main>
          <Hero />
          <About />
          <BodyLine />
          <Projects />
          <BodyLine flip />
          <Experience />
          <BodyLine />
          <Education />
          <BodyLine flip />
          <Skills />
          <BodyLine />
          <Contact />
        </main>
      </div>
    </MotionConfig>
  );
}

export default App;
