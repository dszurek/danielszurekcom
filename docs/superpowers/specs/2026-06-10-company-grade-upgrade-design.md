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
- **Flagship case studies:** EcoCAR CAV stack and the controls research program
  (three IEEE ITEC papers). The other projects become a compact card grid
  (existing modal retained; the GP+MPC project card stays in the grid).
- **Facts only.** All new content is sourced from the EVC Y4 Final Scoring
  Report and the three paper abstracts in `src/other/`, plus Daniel's direct
  account of his GM work (see Content Facts). Nothing invented.

## Page order

Hero → Credibility strip → About (slimmed) → Featured Work (EcoCAR case study,
research-program case study, compact grid) → Experience → Education +
Publications → Skills → Off the clock → Contact → Footer.

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
6. Results — Year 4 final standings rendered as tick-up counters: 4th overall
   of 13 universities; 1st CAV VTS evaluation; 2nd competition CAV
   presentation; 2nd Automatic Intersection Navigation (CoDE Phase 2); 3rd AIN
   energy consumption; 2nd Ride & Drive; tied-1st Over the Road. Plus the
   MathWorks MBD placement already published on the site.

**Case study B — controls research program** (`#work-research`). The story of
one research question — how do you combine learning-based methods with
model-based control for safe, efficient autonomy? — told through the three
papers presented at IEEE ITEC:

1. *Robust Multi-Objective Genetic Algorithm (R-MOGA) for AIN under SPaT
   Uncertainty* — NSGA-II + Monte Carlo evaluation; robustness to noisy
   signal timing as an implicit objective.
2. *Hybrid DRL-MPC Frameworks for Safe and Adaptive Eco-Driving Control* —
   DRL strategy layer over a safety-critical MPC that enforces constraints.
3. *RL vs. MPC for Lane Centering* — SAC (MATLAB RL Toolbox + Simulink)
   compared head-to-head against an MPC baseline.

Headline stat: **3 papers presented at IEEE ITEC**, with the CAV final
presentation upcoming at ASME DRIVN (September 2026). Sticky visual: an SVG
Pareto-front / trade-off chart (energy vs. time vs. comfort) that animates as
scroll progress advances (`useScroll` + `useTransform` driving path
interpolation), echoing the R-MOGA multi-objective theme; each step highlights
where its paper sits on a learning ↔ model-based spectrum beneath the chart.
Paper abstracts are qualitative, so this case study uses counts and placements
for counters — no invented performance numbers.

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

- **Experience/GM:** bullets rewritten in present tense around actual work
  (see Content Facts): the end-to-end Jira → function generation → GitHub PR
  automation and IBM Rhapsody model updating. The "80% authoring time" and
  "10+ feature teams" figures stay only as program-context framing (they are
  already published on the site/resume), not as personal completed claims.
- **Experience/EcoCAR:** Year 4 final results added (see case study A results
  list); the dated bullet list is updated to match.
- **Education:** new "Research & Publications" block listing the three IEEE
  ITEC papers and the upcoming ASME DRIVN presentation (marked "upcoming ·
  Sep 2026"), each with a one-line summary; link slots point to papers when
  Daniel publishes/uploads them (omitted until then).
- **Off the clock strip (new component):** single compact horizontal strip —
  condensed music/books covers + one line of hobbies — placed before Contact.

## Content Facts (resolved 2026-06-10)

1. **GM internship (3 weeks in, present tense):** building an end-to-end
   automation pipeline that takes a Jira ticket, generates the signal
   recording function, and opens a GitHub PR — using the Jira API and GitHub
   Copilot API — plus automated IBM Rhapsody model updates via its API.
2. **EcoCAR Y4 final (source: `src/other/EVC_Y4_Final_Report.pdf`):** 4th
   overall of 13; 1st CAV VTS evaluation; 2nd COMP Presentation CAV; 2nd CoDE
   Phase 2 (AIN); 3rd CARB CAV Energy AIN (relative); 2nd Ride & Drive;
   tied-1st Over the Road.
3. **Publications (presented at IEEE ITEC):** R-MOGA for AIN under SPaT
   Uncertainty; Hybrid DRL-MPC Frameworks for Safe and Adaptive Eco-Driving
   Control; RL vs. MPC for Lane Centering. **Upcoming:** CAV final
   presentation at ASME DRIVN, September 2026.
4. **Metrics:** paper abstracts are qualitative; counters use competition
   placements, paper counts, team size (15), and figures already published on
   the site/resume. No other numbers.

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
