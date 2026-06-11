# Automotive Light Restyle — Design

Date: 2026-06-08

## Goal

Restyle the portfolio to be automotive-focused with lighter shades and tasteful,
modern automotive design references woven in. No content changes — visual only.

## Decisions (from brainstorming)

- **Theme base:** Lifted dark (mid) — move off near-black to soft graphite/slate;
  light text, brighter accent pops.
- **Accent palette:** Keep leather + forest green (brand continuity), lightened so
  they pop on the new graphite base.
- **Automotive touches:** gauge-style stats, body-line dividers, pinstripe/racing
  accents. (No literal car silhouettes.)

## Palette

Redefine `:root` in `src/index.css`:

- Backgrounds lift to graphite/slate: page base `~#1c1f23`, lifted graphite
  `~#22262b`, surfaces `~#2a2f35` / `~#31373e`.
- Brighten accents: leather-brown `~#b07a4f`, leather-light `~#c79a6b`,
  forest-green `~#3f6353`, forest-light `~#5a8270`.
- Text stays light (`~#f4f1ec`); muted text shifts to a cooler slate-grey (`~#aab2b8`).

## Glass utilities (`src/App.css`)

Re-tint `.glass` / `.glass-strong` / `.glass-light` from black glass to **lifted
slate glass** (translucent slate slightly lighter than the base, soft light border,
medium shadow) so cards read as raised, not inset.

## Automotive elements

1. **Body-line dividers** — new `BodyLine.jsx` + `BodyLine.css`. A full-width SVG
   "character line": a long gentle S-curve with a thin leather→forest gradient
   stroke at low opacity, plus a fainter parallel pinstripe. Inserted between
   sections in `App.jsx`. `flip` prop mirrors the curve.

2. **Gauge-style stats** — restyle the three About stat cards as speedometer dials:
   a 270° conic-gradient ring (faint track + leather→forest fill), tick marks, and
   the number/label centered in the dial. Fill animates in via `@property`.

3. **Pinstripe / racing accents** — a thin vertical leather→forest "speed stripe"
   that fades in on card hover (experience, project, degree, skill, interest, stat
   cards) and a subtle accent stripe on primary buttons.

## Consistency sweep

Lift the literal near-black backgrounds that don't use variables: glass tints in
`App.css`, `Experience.css`, `Contact.css`, `Projects.css`; navbar backgrounds in
`Navbar.css`; the project image fallback gradient; the education degree-icon frame.
Lighten `AnimatedBackground` (`.css` base var + brighten particle/line colors).

## Files

- `src/index.css`, `src/App.css` (palette, glass, pinstripe utility)
- `src/components/BodyLine.jsx`, `src/components/BodyLine.css` (new)
- `src/App.jsx` (insert dividers)
- `src/components/About.jsx`, `src/components/About.css` (gauges)
- `src/components/AnimatedBackground.jsx`, `.css` (lighten)
- Color sweep: `Navbar.css`, `Experience.css`, `Contact.css`, `Projects.css`,
  `Education.css`

## Out of scope

Content/copy changes, layout restructuring, new sections, car silhouette art.
