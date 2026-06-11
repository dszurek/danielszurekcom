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
  — gear readout, classification chip, status pills)
- **Automotive motifs**: perception-style detection frame around the hero name,
  AV-stack status pills (Perception / Planning / Control), PRND gear indicator
  tied to scroll position, speedometer-dial stats, dashed lane-line dividers,
  WebGL particle "sensor field" background

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
  components/                  One component + CSS pair per section
    Navbar.jsx/.css            Fixed nav: scroll-spy links, gear readout, progress stripe
    Hero.jsx/.css              Detection-frame identity, status pills, radar rings
    About.jsx/.css             Intro, interests, gauge-dial stats, favorites
    Projects.jsx/.css          Featured "Pole Position" showcase, filterable grid, modal
    Experience.jsx/.css        Timeline with role progressions
    Education.jsx/.css         Degrees + coursework
    Skills.jsx/.css            Skill groups, ADAS toolkit first
    Contact.jsx/.css           Netlify form, contact details, footer
    BodyLine.jsx/.css          Lane-marking section divider
    AnimatedBackground.jsx/.css  WebGL (ogl) particle field
  images/                      Project/logo assets (bundled by Vite)
  other/                       Resume PDF (bundled for download)
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
