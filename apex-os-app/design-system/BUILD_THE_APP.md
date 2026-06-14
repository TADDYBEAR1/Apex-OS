# Build the Apex OS App — Handoff for Claude Code

You are building the **full Apex OS fitness app** using the design system in this folder. Everything you need to make it look and feel correct is here.

---

## What this folder is

A complete **design system** for Apex OS — a fitness app reframed as a *training operating system* ("the body, run like mission control"). It contains the brand rules, design tokens (color/type/spacing as CSS variables), reusable React components, and a **working HTML prototype of the app** as a visual reference.

The aesthetic is **"Arctic Aurora"**: a deep glacial canvas with a living blurred aurora field (glacier-cyan, periwinkle, frost-white) behind **frosted-glass panels**, with **iridescent ice-blue** as the single signal color. Calm, clinical, premium — a high-end instrument, not a neon dashboard. The signature element is the circular **readiness ring**.

> ⚠️ **The HTML files here are design references, not production code to ship.** They show the intended look, layout, and behavior. Your job is to **recreate these designs in a real app codebase** using its framework and patterns — or, if there's no codebase yet, to scaffold one in the most appropriate framework (React Native / Expo for mobile, or React + Vite for web) and implement the designs there. Match the visuals pixel-for-pixel; reimplement the logic properly.

---

## Start here (read in this order)

1. **`SKILL.md`** — one-paragraph orientation + the non-negotiable brand rules. Read it first.
2. **`readme.md`** — the full design guide: Content Fundamentals (voice/copy), Visual Foundations (color, type, surfaces, motion, the readiness ring), Iconography, and a file-by-file index. This is your source of truth.
3. **`ui_kits/apex-os/index.html`** — the working app prototype. Open it in a browser to see the target look and the click-through flow (Mission Control → readiness check / Focus Mode → Records → Fuel). This is what the app should look like.

---

## How to use the pieces

- **Design tokens** — `styles.css` imports everything in `tokens/` (`colors.css`, `typography.css`, `spacing.css`, `fonts.css`, `base.css`). These are plain CSS custom properties (`--ice`, `--bg`, `--surface`, `--radius-lg`, `--font-display`, …). Port them into your app as your theme: CSS variables for web, or a theme object / design-token file for React Native / SwiftUI. **Use these exact values** — don't invent new colors.

- **Components** — `components/<group>/` holds real React implementations you can lift or translate: `Button`, `IconButton`, `GlassCard`, `Badge`, `SegmentedControl`, `Stepper`, `ProgressBar`, `StatReadout`, `ReadinessLight`, `ReadinessRing`, `BottomNav`. Each has a `.prompt.md` with a usage example and a `.d.ts` with its exact props contract. Rebuild these as native components in your stack, preserving the props and styling.

- **Screens** — `ui_kits/apex-os/*.jsx` are the assembled screens (`HomeScreen`, `FocusScreen`, `RecordsScreen`, `MorningCheckin`, plus the Fuel screen inline in `index.html`) and `data.js` is the sample data shape. Use them as the spec for each view's layout, copy, and composition.

- **Assets** — `assets/` has the app icon (`apex-logo.png`), splash, and a spatial motif. Icons elsewhere are [Lucide](https://lucide.dev) at 1.5px stroke, round caps — use the Lucide package in your app rather than hand-drawing.

- **Fonts** — Space Grotesk (display/numbers) + Inter (body), loaded from Google Fonts. Install the equivalent font packages in your app.

---

## The screens to build

| Screen | Purpose |
|---|---|
| **Mission Control** (home) | Readiness ring hero, D-day countdown with phase track, Today's Mission card, week/streak/total stats, consistency heatmap |
| **Morning Check-in** | 3-step readiness gate (sleep / soreness / stress) → computes the readiness score |
| **Focus Mode** | Live session: active exercise, big ± stepper for load, rest timer, exercise queue |
| **Records** | Benchmarks (1RMs, run times) with trends + a system-insight card; history list |
| **Fuel** | Daily energy ring/budget + protein/carbs/fat macro bars |

Recreate each one to match the prototype's layout, copy, and styling, then wire up real data and navigation in your codebase.

---

## Non-negotiable brand rules (from SKILL.md)

1. Glacial near-black canvas with the aurora field behind frosted glass. Color is **light & signal**, never flat fill.
2. **Space Grotesk** for numbers/labels (300 weight for big readouts, 700 + wide tracking for caps labels); **Inter** 300 for prose.
3. Cards = frosted glass: white ~6% fill, 1px hairline border (lit along the top edge), 24px radius, blur backdrop, soft float shadow. Hover warms the border to ice-blue.
4. **Readiness ring** is the signature — use it for any 0–100 state.
5. Copy voice = calm, competent mission-control operator. Uppercase wide-tracked labels; signed metric trends (`+8.1%`); a single ice-blue period on H1s (`Records.`).
6. Emoji only as status signals (🟢🟡🔴 ⚡), never decoration. Motion = ease-out-expo `cubic-bezier(0.16,1,0.3,1)`, fades + value pulses, no bounces. Respect `prefers-reduced-motion`.

---

*Source: reverse-engineered from the production repo [TADDYBEAR1/Apex-OS](https://github.com/TADDYBEAR1/Apex-OS). Fonts are Google Fonts substitutes; swap for licensed copies in production.*
