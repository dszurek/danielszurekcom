# Company-Grade Upgrade Implementation Plan

> Spec: `docs/superpowers/specs/2026-06-10-company-grade-upgrade-design.md`
> Executed inline in the authoring session (user waived approval gates), so tasks
> carry interfaces, content, and integration points rather than full duplicated code.

**Goal:** Scrollytelling case studies, four animation layers, corporate polish, and
real Y4/GM/publication content — single page, no new dependencies.

**Architecture:** New `FeaturedWork` section owns `#projects` (header + two case
studies + compact grid); `Projects.jsx` becomes the grid-only `ProjectGrid`.
Shared HUD primitives (`useCountUp`, `SectionIndex`, `CtaLink`) power the
telemetry/micro-interaction layers. `Footer` and `OffTheClock` extracted as
standalone sections. Verification is `npm run build` + Playwright screenshots
(no unit-test runner in this repo; visual project).

**Tech stack:** React 18, framer-motion 10 (`useScroll`/`useTransform`/springs),
react-intersection-observer, CSS sticky. No new packages.

---

### Task 1: HUD foundations
- Create `src/hooks/useCountUp.js` — `useCountUp(target, {duration, decimals})`
  → `[ref, displayString]`; rAF ease-out-cubic, fires once on ≥50% in-view,
  instant final value under reduced motion or non-numeric target.
- Create `src/components/SectionIndex.jsx` + `.css` — `<SectionIndex index={3} name="Featured Work" />`
  renders mono `SEC 03 / FEATURED WORK`, scramble-decodes once in view (~700ms,
  rAF), instant under reduced motion, `aria-hidden`.
- Create `src/components/CtaLink.jsx` + `.css` — `<CtaLink href variant="primary|secondary" gaLabel>`:
  shared pill styles (leather gradient primary / outlined secondary), spring tap,
  magnetic hover capped ±6px gated on `(pointer: fine)` + motion allowed; GA event
  category "CTA".

### Task 2: Hero ignition + CTA swap
- `Hero.jsx`: session gating — `sessionStorage.ignition`; add `boot`/`warm` class
  on `<section>`; swap CTAs → primary "Get in touch" (`#contact`), secondary
  "View my work" (`#projects`) using `CtaLink`.
- `Hero.css`: tighten timeline to ≤1.5s total (pills 0.3/0.5/0.7s, corners 0.8s,
  scan 0.95s, chip 1.1s) scoped under `.hero.boot`; `.hero.warm` zeroes delays.

### Task 3: Credibility strip
- Create `src/components/CredibilityStrip.jsx` + `.css` — "EXPERIENCE WITH" label +
  mono-caps text wordmarks: GENERAL MOTORS · ECOCAR EV CHALLENGE · UNIVERSITY OF
  ALABAMA · SSAB · BRASFIELD & GORRIE; quiet (muted, small), staggered fade-in.
- `App.jsx`: render after `<Hero />`.

### Task 4: Navbar CTA + label
- `Navbar.jsx`: rename nav item "Projects"→"Work"; add desktop "Get in touch"
  CTA (small primary pill, right side) + in mobile menu.
- `Navbar.css`: styles for `.navbar-cta`.

### Task 5: BodyLine signal pulse
- `BodyLine.jsx`: wrap with `useInView` (threshold 0.6, not once) → `in-view` class.
- `BodyLine.css`: `.pulse` overlay line segment that sweeps once per entry
  (animation restarted via class toggle), reduced-motion off.

### Task 6: Case-study infrastructure
- Create `src/hooks/useStepProgress.js` — IntersectionObserver over `.cs-step`
  children (`rootMargin: -40% 0px -40% 0px`), returns `[containerRef, activeIndex]`.
- Create `src/components/CaseStudy.css` — shared two-column layout: sticky
  `.cs-visual` panel (top offset under navbar) + `.cs-steps` column; step active
  state; ≤900px collapses to single column with inline visuals; result chip grid.

### Task 7: EcoCAR case study (`#work-ecocar`)
- Create `src/components/CaseStudyEcoCar.jsx`. HTML/CSS HUD diagram (node boxes +
  CSS connectors, `aria-hidden`): SENSORS → GNN FUSION → PLANNING / V2X →
  CONTROL (MPC/PID + STANLEY) → ACTUATION, with HIL/VIL validation loop rail.
  Node highlight driven by `useStepProgress` active index.
- Six steps (real content): 1 Mission (stock pre-production Cadillac Lyriq →
  automated V2X-connected vehicle; led 15-student team); 2 Perception & fusion
  (GNN pipeline, camera/radar tracks); 3 Planning & V2X (CACC, AIN under noisy
  SPaT); 4 Control (MPC/PID longitudinal, Stanley lateral); 5 Validation
  (HIL/VIL, safety-critical); 6 Results.
- Results = staggered HUD chips (mono): P4 OVERALL / 13 TEAMS · P1 CAV VTS
  EVALUATION · P2 COMP PRESENTATION CAV · P2 AIN (CODE PHASE 2) · P3 AIN ENERGY
  CONSUMPTION · P2 RIDE & DRIVE · P1 (T) OVER THE ROAD. End CTA: "Get in touch".

### Task 8: Research case study (`#work-research`)
- Create `src/components/CaseStudyResearch.jsx`. Sticky SVG: Pareto front path
  (energy vs. travel-time axes) drawn by scroll progress (`useScroll` on section
  + `pathLength` motion style), 3 paper markers; learning↔model-based spectrum
  bar beneath, marker highlighted per step. Reduced motion: fully drawn.
- Steps = the three IEEE ITEC papers (R-MOGA / Hybrid DRL-MPC / RL vs. MPC lane
  centering) with one-paragraph summaries from the abstracts; intro framing "one
  question: how do you combine learning-based methods with model-based control
  for safe, efficient autonomy?"; closing chip row: 3 PAPERS · IEEE ITEC and
  UPCOMING · ASME DRIVN · SEP 2026 (CAV final presentation).

### Task 9: FeaturedWork shell + ProjectGrid conversion
- Create `src/components/FeaturedWork.jsx` + `.css` — `<section id="projects">`:
  header (SectionIndex 03, title "Featured Work", description), CaseStudyEcoCar,
  CaseStudyResearch, "More Projects" divider, `<ProjectGrid />`.
- `Projects.jsx`: drop section wrapper/header/Pole-Position showcase; export
  `ProjectGrid` (filters + grid + modal intact); remove EcoCAR (id 1) and GP+MPC
  (id 9)? **No** — keep all 9 cards available under filters, case studies add
  depth; grid stays complete. Remove now-unused featured-* code only.
- `Projects.css`: delete `.featured-showcase/...` + `.projects-divider` blocks
  (divider style moves to FeaturedWork.css).
- `App.jsx`: replace `<Projects />` with `<FeaturedWork />`.

### Task 10: Experience content (facts)
- GM entry → present tense, real work: end-to-end Jira → function generation →
  GitHub PR automation via Jira + GitHub Copilot APIs; IBM Rhapsody model updates
  via API; 80%/10+ figures kept only as program-context framing. Technologies:
  add "Jira API", "GitHub Copilot API", "IBM Rhapsody".
- EcoCAR entry → replace results bullet with Y4 finals (4th overall of 13; 1st
  CAV VTS; 2nd COMP Presentation CAV; 2nd AIN CoDE Phase 2; 3rd AIN energy;
  2nd Ride & Drive; T-1st Over the Road) + "3 papers presented at IEEE ITEC".

### Task 11: Education publications block
- `Education.jsx`: add `publications` array (3 ITEC papers + ASME DRIVN upcoming,
  one-line summaries, no links yet) rendered as "Research & Publications" card
  list after degrees; `Education.css` styles (mono venue tag, upcoming badge).

### Task 12: About slim + OffTheClock
- `About.jsx`: tighten intro copy (professional, no exclamations; "I'm Daniel
  Szurek. I build software that helps vehicles drive themselves." direction);
  remove `favorites` + rendering (moves out); resume button → `CtaLink secondary`;
  gauges use `useCountUp` (15, 3.87).
- Create `src/components/OffTheClock.jsx` + `.css` — compact strip: heading
  "Off the clock", music/book covers row + one-line hobbies + "send me a
  recommendation" line linking `#contact`. Render before `<Contact />`.
- `About.css`: remove favorites styles.

### Task 13: Footer + Contact polish
- Create `src/components/Footer.jsx` + `.css` — multi-column: identity +
  positioning line / section nav / contact (email, location, LinkedIn, GitHub) /
  © computed year. Render after `<Contact />`; remove footer markup from
  `Contact.jsx` + styles from `Contact.css`.
- `Contact.jsx`: copy tighten ("I'd love to hear from you!" → confident line).

### Task 14: SectionIndex integration
- Add `<SectionIndex index={N} name>` above each `section-label`: About 02,
  Featured Work 03 (done in Task 9), Experience 04, Education 05, Skills 06,
  Contact 07. Hero is 01 (skip — has its own HUD identity).

### Task 15: Verification + cleanup
- `npm run build` clean; `npx playwright@1.58.2` screenshots
  (`--enable-unsafe-swiftshader`) desktop 1440px + mobile 390px, including
  mid-case-study scroll positions; reduced-motion emulation pass; check no
  unused imports/styles remain (featured-* etc.). Commit per task throughout.
