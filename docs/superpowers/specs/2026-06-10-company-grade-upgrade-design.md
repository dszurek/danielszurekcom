# Company-Grade Upgrade — Design

Date: 2026-06-10

## Goal

Push the portfolio from "polished personal site" to "company-grade engineering
site": deeper animation, case-study project depth, corporate structure, and
updated real-world content — all in service of standing out to automotive/ADAS
recruiters. Builds directly on the 2026-06-10 ADAS Stand-Out Upgrade (perception
hero, gear navbar, perf/a11y refactor), which is implemented but uncommitted.

## Decisions (from brainstorming Q&A)

- **No job-search messaging.** No "open to work" banner or availability framing
  anywhere.
- **Company-like =** case-study project depth + corporate structure/polish.
- **Personal content** (On Repeat, Currently Reading, hobbies) is condensed into
  a small "Off the clock" strip placed just before Contact.
- **All four animation layers approved:** ignition choreography, scroll-driven
  storytelling, HUD/telemetry ambient motion, micro-interactions.
- **Primary conversion goal: contact.** "Get in touch" is the primary CTA
  everywhere; resume download is secondary.
- **Architecture: scrollytelling single page.** No router. Case studies are
  in-page sections; deep-linkable via anchors.
- **Flagship case studies:** EcoCAR CAV stack and GP+MPC V2X research. The other
  seven projects become a compact card grid (existing modal retained).
- **Facts only.** New metrics/results come from Daniel (see Content Intake);
  nothing invented. Until supplied, only numbers already on the site/resume
  are used.

## Page order

Hero → Credibility strip → About (slimmed) → Featured Work (EcoCAR case study,
GP+MPC case study, compact grid) → Experience → Education + Publications →
Skills → Off the clock → Contact → Footer.

## Feature design

### 1. Ignition choreography (page load)

No splash screen and no content gating. The existing hero elements play a
staged entrance ≤1.2s total: stack pills light in sequence (systems check),
detection-box corners draw, classification chip types in last. Runs once per
session via a `sessionStorage` flag; later visits and reduced-motion users get
instant final state. Implemented purely with framer-motion `delay`/stagger on
existing hero elements — no overlay component.

### 2. Featured Work — scrollytelling case studies

New section that takes over the Projects slot: the two case studies render
first, then the remaining seven projects as a compact grid using the existing
card + modal components.

**Layout pattern (both case studies):** two columns on desktop — a
`position: sticky` visual panel and a scrolling column of text steps. Step
activation via IntersectionObserver on each step (viewport-center band, same
pattern as `useActiveSection`); the active step index drives which part of the
visual highlights. Natural scrolling only — no pinning libraries, no
scroll-jacking. Mobile: visual panel collapses; each step shows its own small
inline highlight state of the diagram.

**Case study A — EcoCAR CAV stack** (`#work-ecocar`). Sticky panel holds a
HUD-style SVG signal-flow diagram: SENSORS → GNN FUSION → PLANNING/V2X →
CONTROL (MPC/PID + Stanley) → ACTUATION, with a HIL/VIL validation loop drawn
around it. Mono labels, leather/forest accent palette, design tokens from
`src/index.css`. Six steps:

1. Mission — stock pre-production Cadillac Lyriq → automated, V2X-connected
   vehicle; 15-student team led.
2. Perception & fusion — GNN sensor fusion pipeline.
3. Planning & V2X — CACC, automatic intersection navigation under noisy SPaT.
4. Control — MPC/PID longitudinal, Stanley lateral.
5. Validation — HIL/VIL on safety-critical software.
6. Results — competition placements (existing: 1st VTS; 2nd MBD, AIN, CAV
   Presentations; 3rd AIN Energy) + final-year results and metrics from
   Content Intake, rendered as tick-up counters.

**Case study B — GP+MPC V2X research** (`#work-gp-mpc`). Research-paper
flavor, ~half the length: Problem (uncertainty under noisy SPaT) → Method
(Gaussian Process learning + MPC) → Results. Sticky visual is an SVG chart of
a GP confidence band that narrows as scroll progress advances
(`useScroll` + `useTransform` driving path interpolation). Includes a
publication/poster link slot fed by Content Intake.

**Diagram accessibility:** SVGs are `aria-hidden`; all information lives in
the step text.

### 3. HUD/telemetry ambient motion

- **Tick-up counters** (`useCountUp` hook, rAF-based, fires once on first
  in-view, renders final value immediately under reduced motion). Used in
  About stats gauges and case-study results.
- **Section index readouts:** each section header gains a small mono label
  (`SEC 03 / FEATURED WORK`) that decodes in (scramble → resolve) on first
  reveal. One shared component.
- **BodyLine signal pulse:** existing divider gets a traveling pulse animation
  when it enters the viewport (CSS animation triggered by an in-view class).

### 4. Micro-interactions

- Buttons: spring press (`whileTap`) + hover lift with subtle glow; shared CSS.
- Cards: existing hover scale stays; add a border highlight sweep.
- Primary CTAs: magnetic hover (slight translate toward cursor, capped ~6px),
  desktop `pointer: fine` only, disabled under reduced motion.

### 5. Corporate structure & polish

- **CTA system:** primary "Get in touch" (smooth-scroll to contact) in navbar,
  hero, end of each case study, and footer. Resume download restyled as
  secondary CTA wherever it appears. GA events on both.
- **Credibility strip:** quiet row of mono-caps text wordmarks under the hero:
  GENERAL MOTORS · ECOCAR EV CHALLENGE · UNIVERSITY OF ALABAMA · SSAB ·
  BRASFIELD & GORRIE, labeled "Experience with". Text only — no logo images
  (cleaner, avoids trademark use).
- **Footer (new component):** multi-column — (1) name + one-line positioning,
  (2) section nav, (3) email, location, LinkedIn, GitHub, (4) © computed year.
  Replaces the current footer markup in Contact.
- **Copy tightening:** "Hey! I'm Daniel" → confident professional intro;
  remove exclamation-heavy lines; the "send me recommendations" line moves to
  Off the clock. Warmth stays, fluff goes.
- **About slims down:** favorites move out; interest cards and gauges stay.

### 6. Content updates (real facts)

- **Experience/GM:** projected-sounding bullets replaced with actual
  in-progress accomplishments (Content Intake), present-tense framing.
- **Experience/EcoCAR:** final-year competition results added.
- **Education:** new "Research & Publications" block listing papers, posters,
  and talks with venue + link (Content Intake). Omitted gracefully if empty.
- **Off the clock strip (new component):** single compact horizontal strip —
  condensed music/books covers + one line of hobbies — placed before Contact.

## Content Intake (Daniel supplies at spec review; defined input contract)

1. GM internship: 2–4 real in-progress accomplishments.
2. EcoCAR: final-year competition results/awards.
3. Publications/posters/talks: title, venue, date, link (any number, incl. 0).
4. Case-study metrics: any real figures (e.g., tracking error, AIN success
   rate, fusion latency, energy results). Counters render only supplied or
   already-published numbers; unsupplied slots are omitted, never faked.

## Performance & accessibility

- Transform/opacity-only animations; sticky positioning instead of pinning;
  passive IntersectionObservers; effects run once and clean up on unmount.
- Reduced motion: choreography skipped, counters show final values, case-study
  diagrams render fully highlighted/static, magnetic hover off — all via the
  existing `MotionConfig reducedMotion="user"` plus CSS guards.
- No new dependencies: framer-motion `useScroll`/`useTransform` +
  IntersectionObserver + CSS sticky cover everything. No GSAP/Lenis.
- Mobile: collapsed visuals, shorter stagger distances.

## Files

- New: `src/components/FeaturedWork.jsx/.css` (section shell + compact grid
  wiring), `src/components/CaseStudyEcoCar.jsx`, `CaseStudyResearch.jsx` (+ a
  shared `CaseStudy.css`), `src/components/CredibilityStrip.jsx/.css`,
  `src/components/Footer.jsx/.css`, `src/components/OffTheClock.jsx/.css`,
  `src/components/SectionIndex.jsx` (decode readout), `src/hooks/useCountUp.js`,
  `src/hooks/useStepProgress.js`.
- Modified: `App.jsx` (section order), `Hero.jsx/.css` (choreography, CTA),
  `Navbar.jsx/.css` (CTA), `About.jsx/.css` (slim, copy), `Projects.jsx/.css`
  (becomes compact grid consumed by FeaturedWork), `Experience.jsx` (GM/EcoCAR
  content), `Education.jsx/.css` (publications), `Contact.jsx/.css` (footer
  extraction, CTA), `BodyLine.css` (pulse), `index.css`/`App.css` (shared CTA +
  micro-interaction styles).

## Verification

- `npm run build` clean; Playwright headless screenshots via
  `npx playwright@1.58.2` with `--enable-unsafe-swiftshader` (WebGL background)
  at desktop + mobile widths, including mid-case-study scroll positions.
- Reduced-motion pass: emulate `prefers-reduced-motion` and confirm static
  rendering with final values.

## Out of scope

Routing/multi-page, job-status messaging, advisor/manager quotes, logo images
in the credibility strip, blog, invented metrics, deployment changes (Netlify).
