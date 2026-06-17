import {
  FaPython,
  FaSwift,
  FaApple,
  FaCar,
  FaLinux,
  FaMicrochip,
  FaAndroid,
  FaUniversalAccess,
  FaReact,
} from "react-icons/fa";
import { SiFlutter, SiDart, SiPytorch, SiOpencv, SiScala, SiC } from "react-icons/si";

import cavSysImg from "../images/CAVSys_example.png";
import voiceAssistantImg from "../images/voiceassistant.jpg";
import lrfrImg from "../images/lrfr.png";
import mapsImg from "../images/mapsapplication.jpg";
import budgieImg from "../images/budgie_light.png";
import lispImg from "../images/lisp.png";
import scaloxImg from "../images/scalox.png";
import driveabilityImg from "../images/DriveAbilityLogo.webp";

/* Project catalogue rendered by ProjectGrid. `category` keys must match an id
   in `projectCategories`; `icons` double as the hover overlay and the
   image-less fallback art. */
export const projects = [
  {
    id: 8,
    title: "Driveability — Accessible Driving Resource",
    category: "automotive",
    description:
      "Capstone project: a social media web platform with resources and reviews on assisted driving tools, aimed at disabled drivers learning and sharing accessible driving techniques. Combines community-driven reviews with curated ADAS and adaptive-driving content.",
    technologies: [
      "React",
      "JavaScript",
      "Accessibility",
      "Full-Stack Web",
      "Capstone Project",
    ],
    icons: [<FaUniversalAccess />, <FaReact />, <FaCar />],
    image: driveabilityImg,
    imageAlt: "Driveability accessible driving resource",
    github: null,
    live: "https://driveability.org",
  },
  {
    id: 9,
    title: "Gaussian Process + MPC for V2X Intersection Navigation",
    category: "automotive",
    description:
      "Custom controller for Automatic Intersection Navigation that compensates for SPaT V2X data loss caused by radio noise. A trained Gaussian Process predicts signal phase and timing through dropouts, and an MPC uses those predictions to plan smooth, energy-aware approaches.",
    technologies: [
      "MATLAB",
      "Simulink",
      "Gaussian Processes",
      "Model Predictive Control",
      "V2X",
      "SPaT",
    ],
    icons: [<FaCar />, <FaMicrochip />],
    image: null,
    imageAlt: "Gaussian Process MPC controller",
    github: "https://github.com/dszurek/gp-ain-system",
    live: null,
  },
  {
    id: 1,
    title: "EcoCAR CAV System - Autonomous Vehicle Platform",
    category: "automotive",
    description:
      "Leading development of a comprehensive Simulink and RTMaps-based vehicle control system for a Cadillac Lyriq. Features include driver monitoring, lane-keep assist with Model Predictive Control, adaptive cruise control with hybrid DRL/MPC, automatic intersection navigation, V2X connectivity, and multi-sensor fusion (camera, LiDAR, radar). Currently researching Gaussian Processes for intersection navigation efficiency optimization.",
    technologies: [
      "MATLAB",
      "Simulink",
      "RTMaps",
      "Python",
      "C++",
      "Sensor Fusion",
      "CAN Bus Communication",
      "ADAS",
    ],
    icons: [<FaCar />, <FaPython />, <SiC />, <FaLinux />],
    image: cavSysImg,
    imageAlt: "EcoCAR CAV System",
    github: null,
    live: null,
  },
  {
    id: 2,
    title: "Voice Assistant for Vehicle Control",
    category: "ai",
    description:
      "Led a team of 5 students to develop an LLM-based voice assistant running natively on NXP NavQ+ companion computer. Demonstrates early generative AI experience with optimized inference for edge computing.",
    technologies: [
      "Python",
      "LLM",
      "Linux",
      "Edge AI",
      "NXP NavQ+ Mission Computer",
    ],
    icons: [<FaMicrochip />, <FaLinux />, <FaPython />],
    image: voiceAssistantImg,
    imageAlt: "Voice Assistant",
    github: "https://github.com/dszurek/voice_assistant",
    live: null,
  },
  {
    id: 3,
    title: "Low-Resolution Facial Recognition Pipeline",
    category: "ai",
    description:
      "Developed a unique CNN pipeline for facial recognition by feeding DSR (Deep Super-Resolution) upscaled low-resolution images to a fine-tuned and quantized EdgeFace model. Achieved >90% accuracy on low-quality surveillance images. Course project demonstrating computer vision and model optimization skills.",
    technologies: ["Python", "PyTorch", "OpenCV", "CNN", "Deep Learning"],
    icons: [<FaPython />, <SiPytorch />, <SiOpencv />],
    image: lrfrImg,
    imageAlt: "Facial Recognition Pipeline",
    github: "https://www.github.com/dszurek/LRFR-Project",
    live: null,
  },
  {
    id: 4,
    title: "Flutter Maps & Navigation Application",
    category: "mobile",
    description:
      "Singlehandedly developed a complete maps and navigation system for vehicle infotainment using Flutter. Features GPS integration, route generation algorithms, location searching with autocomplete, and accurate route time estimation. Deployed to Android system running in competition vehicle.",
    technologies: [
      "Flutter",
      "Dart",
      "Android",
      "GPS",
      "Google Places API",
      "Docker",
    ],
    icons: [<SiFlutter />, <SiDart />, <FaAndroid />],
    image: mapsImg,
    imageAlt: "Flutter Maps Application",
    github: "https://github.com/dszurek/flutterMapsApp",
    live: null,
  },
  {
    id: 5,
    title: "Budgie: Smart Expense Planning",
    category: "mobile",
    description:
      "Built a budgeting application for iOS with sporadic student income in mind. Features a custom constraint-based scheduling algorithm that predicts the most optimal date to purchase wish list items based on income and expenses. ",
    technologies: [
      "Swift",
      "iOS Development",
      "XCode",
      "Algorithm Design",
      "Constraint-Based Scheduling",
    ],
    icons: [<FaSwift />, <FaApple />],
    image: budgieImg,
    imageAlt: "Budgie: Smart Expense Planning",
    github: "https://github.com/dszurek/Budgie",
    live: null,
    appStore:
      "https://apps.apple.com/us/app/budgie-smart-expense-planning/id6755897739",
  },
  {
    id: 6,
    title: "Lisp Interpreter",
    category: "foundation",
    description:
      "A lightweight, feature-rich Lisp interpreter written in C. Implements a functional Lisp interpreter capable of parsing and evaluating S-expressions. It supports core Lisp features including dynamic typing, first-class functions (closures), recursion, and lexical scoping. It is designed to be a clean and understandable implementation of the fundamentals of language interpretation. This project was done for a course taken at the University of Alabama.",
    technologies: ["C", "Lisp", "Interpreter", "Parsing", "Evaluation"],
    icons: [<SiC />],
    image: lispImg,
    imageAlt: "Lisp Interpreter",
    github: "https://github.com/dszurek/lisp",
    live: null,
  },
  {
    id: 7,
    title: "Scalox",
    category: "foundation",
    description:
      "A Scala implementation of the Lox interpreter from the first 13 chapters of the book Crafting Interpreters by Robert Nystrom, done for a course taken at the University of Alabama. It is a tree-walk interpreter that supports the full Lox language.",
    technologies: ["Scala", "Lox", "Interpreter", "Parsing", "Evaluation"],
    icons: [<SiScala />],
    image: scaloxImg,
    imageAlt: "Scalox: Lox Interpreter",
    github: "https://github.com/dszurek/scalox",
    live: null,
  },
];

export const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "automotive", label: "Autonomous Vehicles" },
  { id: "ai", label: "AI & ML" },
  { id: "foundation", label: "Foundational" },
];
