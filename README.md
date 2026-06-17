# 🚗 Daniel Szurek — Portfolio

[Website (live)](https://www.danielszurek.com) • [LinkedIn](https://www.linkedin.com/in/danielszurek) • [GitHub](https://github.com/dszurek)

ADAS software engineer portfolio — autonomous vehicle systems, applied machine
learning, and the projects behind them. Built with React + Vite and styled as an
automotive instrument cluster: detection-frame hero, PRND gear navigation,
gauge-dial stats, and lane-marking section dividers.

## Design language

- **Theme**: lifted graphite/slate base with leather + forest-green accents
  (CSS variables in `src/index.css`)
- **Type**: Playfair Display (display), Inter (body), IBM Plex Mono (HUD elements
  — gear readout, classification chip, `SEC NN /` section readouts)
- **Automotive motifs**: perception-style detection frame around the hero name,
  PRND gear indicator tied to scroll position, speedometer-dial stats, dashed
  lane-line dividers, and a WebGL particle "sensor field" background

## Codebase map

```
index.html                     Entry — fonts, SEO/OG metadata, Netlify form stub
src/
  main.jsx                     React root
  App.jsx                      Section layout, GA init, MotionConfig
  index.css                    Design tokens (colors, fonts) + global styles
  App.css                      Shared utilities: glass, speed-stripe, gradient text
  hooks/
    useSectionInView.js        Shared IntersectionObserver entrance trigger
    useActiveSection.js        Scroll-spy for navbar links + gear indicator
    useCountUp.js              rAF count-up for stats/metrics (reduced-motion aware)
    useStepProgress.js         Active-step tracker for the EcoCAR case study
  data/
    projects.jsx               Project catalogue + categories (content only)
  components/
    Navbar.jsx/.css            Fixed nav: scroll-spy links, gear readout, progress stripe
    Hero.jsx/.css              Detection-frame identity, radar rings, ignition choreography
    CredibilityStrip.jsx/.css  "Experience with" wordmark row under the hero
    About.jsx/.css             Intro, interests, gauge-dial stats
    FeaturedWork.jsx/.css      #projects section shell (case studies + grid)
    CaseStudyEcoCar.jsx        Sticky HUD signal-flow case study (uses CaseStudy.css)
    CaseStudyResearch.jsx      Research dossier — three IEEE ITEC papers (ResearchDossier.css)
    CaseStudy.css              Shared case-study layout (header, sticky panel, steps)
    Projects.jsx/.css          Filterable project grid (data from data/projects.jsx)
    ProjectModal.jsx           Project detail dialog (Escape + scroll-lock)
    Experience.jsx/.css        Timeline with role progressions
    Education.jsx/.css         Degrees, publications, coursework
    Skills.jsx/.css            Skill groups, ADAS toolkit first
    Contact.jsx/.css           Netlify form + contact details
    Footer.jsx/.css            Multi-column site footer
    SectionHeader.jsx          Shared section heading (index + label + title + blurb)
    SectionIndex.jsx/.css      HUD "SEC NN /" scramble-in readout
    CtaLink.jsx/.css           Magnetic primary/secondary call-to-action link
    BodyLine.jsx/.css          Lane-marking section divider
    AnimatedBackground.jsx/.css  WebGL (ogl) particle field
  images/                      Project/logo assets (bundled by Vite)
  other/                       Résumé + IEEE ITEC paper PDFs (bundled, open in browser)
public/                        Static assets served as-is (favicon, OG image)
```

## Performance notes

- Scroll effects run on Framer Motion **motion values** (`useScroll`) — no React
  re-renders per scroll frame
- Scroll-spy and entrance animations use IntersectionObservers
- The WebGL background pauses when the tab is hidden and renders a single static
  frame under `prefers-reduced-motion`; device pixel ratio capped at 2
- Below-the-fold images are lazy-loaded; Google Fonts trimmed to used weights
- GA4 runs in test mode outside production builds

## Local setup

```bash
git clone https://github.com/dszurek/dszurekportfolio.git
cd dszurekportfolio
npm install
npm run dev      # http://localhost:3000
npm run build    # production build to dist/
```

## Deployment

Deployed on Netlify: build command `npm run build`, publish folder `dist`.
The contact form uses Netlify Forms (honeypot spam protection); configure email
notifications in the Netlify Forms dashboard.

## Contact

- Email: djszurek@crimson.ua.edu
- LinkedIn: https://www.linkedin.com/in/danielszurek
- GitHub: https://github.com/dszurek
