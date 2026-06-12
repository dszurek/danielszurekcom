import React from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CredibilityStrip from "./components/CredibilityStrip";
import About from "./components/About";
import FeaturedWork from "./components/FeaturedWork";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import OffTheClock from "./components/OffTheClock";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
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
          <CredibilityStrip />
          <About />
          <BodyLine />
          <FeaturedWork />
          <BodyLine flip />
          <Experience />
          <BodyLine />
          <Education />
          <BodyLine flip />
          <Skills />
          <OffTheClock />
          <BodyLine />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
