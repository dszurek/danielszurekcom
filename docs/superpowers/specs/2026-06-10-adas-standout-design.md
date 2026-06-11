# ADAS Stand-Out Upgrade — Design

Date: 2026-06-10

## Goal

Make the portfolio unmistakably "ADAS software engineer" to automotive recruiters,
while streamlining the codebase (no dead code, efficient rendering) and making the
UX intuitive, modern, and fun. Builds on the 2026-06-08 automotive light restyle.

## Aesthetic direction

"Engineering instrument": the existing graphite + leather/forest brand stays, but
HUD-style elements (detection chip, gear readout, status pills) are set in
**IBM Plex Mono** — the typographic voice of a vehicle test bench. Playfair Display
remains the display serif; Inter remains body text.

## Features

### 1. Hero — perception-system identity (the signature moment)

- **Detection bounding box** around the name: four corner brackets draw in on load,
  with a classification chip pinned to the box ("CLASS: ADAS_ENGINEER · 0.99") that
  cycles through three labels (ADAS_ENGINEER, CAV_TEAM_LEAD, ML_RESEARCHER) like a
  perception classifier updating.
- **Stack status pills** above the title: PERCEPTION / PLANNING / CONTROL, each with
  a glowing "online" dot — the canonical AV software stack, rendered as a boot-up.
- **Radar rings** replace the generic rotating circles: concentric rings with a slow
  conic radar sweep, very faint.

### 2. Navbar — drive-mode navigation

- **Scroll-spy**: new `useActiveSection` hook (IntersectionObserver, viewport-center
  band); active link gets a leather underline + `aria-current`.
- **Gear indicator**: PRND-style readout beside the logo — `P` at the hero, then
  `D1`–`D6` as you "drive" down the page, animated like an odometer digit flip.
  Decorative (`aria-hidden`), with the section name as tooltip.
- **Scroll progress stripe**: 2px leather→forest bar under the navbar driven by
  `useScroll().scrollYProgress` (a motion value — zero React re-renders).

### 3. Performance refactor

- Remove `scrollY` state from `App.jsx` (currently re-renders the whole app on every
  scroll frame). Hero parallax moves to `useScroll`+`useTransform` motion values;
  Navbar keeps a local boolean `isScrolled` state.
- `AnimatedBackground`: respect `prefers-reduced-motion` (static single frame, no
  rAF, no mouse listener), pause the rAF loop when the tab is hidden, cap device
  pixel ratio at 2.
- GA4 runs in `testMode` outside production builds.
- Below-fold images get `loading="lazy"` + `decoding="async"`.
- Google Fonts trimmed to used weights; IBM Plex Mono (400/500/600) added.

### 4. Accessibility & UX polish

- `MotionConfig reducedMotion="user"` wraps the app; CSS animations get
  reduced-motion guards.
- Project modal: Escape closes, body scroll locks while open, `role="dialog"`,
  `aria-modal`, labelled close button.
- Footer year is computed, not hardcoded.

### 5. Recruiter-focused content ordering

- Skills groups reordered ADAS-first; "AI & Robotics" renamed
  "Autonomy, Controls & AI".
- `index.html`: title "Daniel Szurek — ADAS Software Engineer", meta description,
  Open Graph + Twitter cards (headshot copied to `public/` for a stable URL),
  `theme-color`, JSON-LD Person schema.

### 6. Dead code removal

- CSS: `.hero-badge`/`.badge-dot`, `.placeholder-text`, `.mesh-gradient`,
  certifications block in `Education.css`, `.animate-float`/`.animate-pulse` and
  the `float`/`pulse`/`shimmer` keyframes in `App.css`.
- JSX: empty certifications placeholder comments in `Education.jsx`; inline error
  styles in `Contact.jsx` move to `Contact.css`.
- README rewritten with accurate features and a codebase navigation map.

## Files

- `src/App.jsx` (scroll state removal, MotionConfig, GA testMode)
- `src/components/Hero.jsx` / `Hero.css` (perception identity)
- `src/components/Navbar.jsx` / `Navbar.css` (scroll-spy, gear, progress stripe)
- `src/hooks/useActiveSection.js` (new)
- `src/components/AnimatedBackground.jsx` (reduced motion, visibility pause, dpr)
- `src/components/Projects.jsx` (modal a11y, lazy images)
- `src/components/About.jsx`, `Experience.jsx`, `Education.jsx` (lazy images, cleanup)
- `src/components/Skills.jsx` (reorder), `Contact.jsx` / `Contact.css` (footer year, error style)
- `src/index.css`, `src/App.css` (mono font var, dead CSS), `index.html` (fonts, SEO)
- `README.md`, `public/headshot.jpg` (OG image)

## Out of scope

Contact email changes, new sections, car silhouette art, framework migration,
deployment changes (stays on Netlify).
