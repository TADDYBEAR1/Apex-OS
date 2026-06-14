# Apex OS — Design System

> The body, run like mission control.

**Apex OS** is a fitness app reframed as a *training operating system*. Instead of a feed of workouts, it runs a training block like a mission: a target date with a live countdown (`D-128`), phased microcycles (BUILD → IMPACT → … → TAPER), a morning **readiness gate** scored on a circular **readiness ring**, and a **Focus Mode** for logging sets with big, chalky-thumb-friendly controls. The aesthetic is **"Arctic Aurora"** — a deep glacial canvas with a living, blurred aurora field (glacier-cyan, periwinkle, frost-white) behind frosted-glass panels, with iridescent ice-blue as the single signal color. Calm, clinical, and premium — a high-end instrument rather than a neon dashboard.

This design system packages the brand's visual foundations, reusable React primitives, and a full interactive recreation of the app so any new screen, deck, or marketing asset can be built on-brand in minutes.

## Sources

This system was reverse-engineered from the production codebase:

- **GitHub — [TADDYBEAR1/Apex-OS](https://github.com/TADDYBEAR1/Apex-OS)** — the React app (`apex-os-app/`), seed data, and Android assets (app icon, splash). Tokens, component behavior, and screen layouts were lifted directly from the source rather than from screenshots.

If you have access, explore that repo further to refine fidelity — especially `apex-os-app/src/components/` (screen + control implementations) and `apex-os-app/src/data/sampleData.js` (the seed data this kit mirrors).

---

## Content Fundamentals

How Apex OS writes copy:

- **Voice: a calm, competent operator / coach.** It speaks to the athlete as a capable peer, not a cheerleader. Confident and terse, never hype-y. *"Sleep banked, joints quiet. Green light on today's plan."*
- **Second person, implied.** Copy addresses *you* but usually drops the pronoun for an instrument-readout cadence: "Proceed with caution — cut top sets," "Recovery is part of the protocol."
- **Military / mission framing is the core metaphor.** Mission Control, Today's Mission, D-128, Yom Sayarot (target event), Focus Mode, microcycle, block, phase, full send, hold. Lean into it — it's the brand.
- **Casing is deliberate and two-tiered:**
  - `UPPERCASE + wide tracking` for labels, section eyebrows, statuses, and button text (MISSION CONTROL, TODAY'S MISSION, GREEN — FULL SEND). This is the "instrument label" voice.
  - Sentence case for body prose and recommendations.
  - Title Case for proper nouns / workout names (*The Heavy Trunk*, *The Yoke Block*).
- **Numbers are heroes.** Metrics get the largest type on the screen (`D-128`, `120kg`, `88`). Trends are signed and explicit: `+8.1%`, `-2.1% vs last month`.
- **A signature period.** Screen titles end with a cyan full stop: `Records.` `Fuel.` `Daniel.` — a small confident flourish. Use sparingly, only on the H1.
- **Emoji: status only, never decoration.** The only sanctioned emoji are the three readiness lights 🟢 🟡 🔴 (and occasionally ⚡ for a system insight). Never use emoji as bullets or in body copy.

---

## Visual Foundations

**Color & vibe.** The canvas is a deep glacial near-black (`#070A10`) carrying a **living aurora field** — three large, soft, blurred blobs in glacier-cyan (`#6FE9FF`), periwinkle (`#8FA8FF`) and frost white-blue (`#C9F0FF`) — that gives every screen quiet, cool, atmospheric depth. The single brand signal is **iridescent ice-blue**: a gradient from `#CFEFFF` → `#7FC8FF` → `#9FB8FF` used on the readiness ring, progress fills, and active states, almost always with a soft ice glow. Supporting accents are warm amber (`#FFB14D`, heat/warning) and mint (`#7CFFD9`, go/gains) — used sparingly. Text is white → `rgba(255,255,255,.62)` → `.42`. Color reads as *light and signal*, never as fill.

**The readiness ring.** The signature element. A circular gauge with an iridescent ice-gradient arc over a faint track, the score and a caps label stacked in its center. It is the hero of Mission Control and reappears wherever readiness or completion is shown. Reach for `<ReadinessRing>` before any bar when the metric is a 0–100 state.

**Typography.** Two families. **Space Grotesk** for everything numeric, display, and label-like — used at *light* weight (300) for big readouts with tight negative tracking (`-0.04em`), and at bold (700) with wide positive tracking for uppercase labels. **Inter** at light/regular (300–400) for body prose. The tension between huge thin numbers and tiny wide-tracked caps labels is the core typographic motif.

**Surfaces & cards.** Cards are **frosted glass**: `background: white 6%`, a `1px` hairline border (white 12%, brightened to 22% along the top edge to catch light), large `24px` radius, a real `blur(20px)` backdrop, and a soft drop shadow (`0 24px 60px rgba(0,0,0,.45)`) that lets them float over the aurora field. On hover (interactive cards) the border warms toward ice-blue and a faint ice glow appears. The frosted panels over the colored aurora are the core surface motif.

**Backgrounds.** The glacial canvas with the blurred three-blob aurora field (use the `.aurora-field` + `.aurora-blob` helpers, or paint blobs inside any clipped container). A faint instrument grid masked to a vignette is optional. Never gradients-as-fill, never photography behind UI.

**Corner radii.** `6 / 10 / 16 / 24 / pill`. Controls and chips are pill or `16px`; cards are `24px`; the phone screen is heavily rounded.

**Motion.** Calm and expensive. The signature easing is `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) over `0.4–0.6s`. Content fades up on enter (`fadeInUp`), values pulse-scale on change, progress fills have a slow liquid cyan→violet shimmer, and the active readiness state breathes. No bounces, no spin, no parallax. Respect `prefers-reduced-motion`.

**Interaction states.**
- *Hover:* border warms to cyan, subtle inner glow, backdrop blur engages. Ghost/text elements brighten from grey to white.
- *Press:* round controls scale down to `0.9` (the ± stepper buttons); solid buttons brighten.
- *Active/selected:* dim-cyan fill (`--cyan-dim`) + cyan text; nav icon gets a blurred radial cyan glow behind it.
- *Focus:* `1px` cyan outline, `4px` offset.

**Transparency & blur.** Used for floating chrome (the bottom nav, modals, status overlays) — `backdrop-filter: blur(20px)` over translucent black. Resting content surfaces use opacity, not blur, to stay cheap.

**Layout.** A single-column ~390–420px mobile frame. Floating glass pill nav fixed near the bottom (never edge-docked). Generous 24px gutters. Top and bottom protection fades (`linear-gradient` to black) keep scrolling content legible under the status bar and nav.

---

## Iconography

- **UI icons: [Lucide](https://lucide.dev)** — thin (`1.5px`) stroke, round caps and joins, `none` fill, currentColor. The app's bottom-nav glyphs (home / dumbbell / line-chart / fuel) are drawn in this exact style; recreate icons with Lucide (CDN: `https://unpkg.com/lucide-static`) rather than hand-rolling, and keep the 1.5px round-cap spec. Active icons take cyan + a blurred cyan glow.
- **No icon font.** Icons are inline SVG `<path>`s, sized 20–26px in the chrome.
- **Emoji = status signals only.** 🟢 🟡 🔴 for readiness, ⚡ for a system insight. Never decorative, never in prose.
- **The app mark** is a neon cyan "A" (`assets/apex-logo.png`, from the production launcher icon) — also expressed as a `15px`-radius outlined glyph tile in the horizontal lockup.

Assets in `assets/`: `apex-logo.png` (app icon), `apex-splash.png` (launch splash), `spatial-card.png` (a transparent spatial UI motif from the app).

---

## Index / Manifest

**Foundations & tokens**
- `styles.css` — the single entry point consumers link (`@import`s only).
- `tokens/colors.css` · `typography.css` · `spacing.css` · `fonts.css` · `base.css` — CSS custom properties, `@font-face`/import, and the base reset + glass/glow/animation utility layer.
- `guidelines/*.card.html` — specimen cards rendered in the Design System tab (Colors, Type, Spacing, Brand).

**Components** (`components/<group>/`, namespace `window.ApexOSDesignSystem_1864eb`)
- `buttons/` — **Button** (primary / solid / surface / ghost), **IconButton**
- `surfaces/` — **GlassCard**, **Badge** (strength / bodyweight / endurance categories)
- `controls/` — **SegmentedControl**, **Stepper** (big-target in-session logger)
- `data/` — **ProgressBar**, **StatReadout**, **ReadinessLight**
- `navigation/` — **BottomNav** (floating glass pill)

**UI kit** (`ui_kits/apex-os/`)
- `index.html` — full interactive app: Mission Control (home), Focus Mode (live session), Records, Fuel, and the Morning Check-in readiness gate, in a phone with an ambient backdrop.
- `HomeScreen.jsx` · `FocusScreen.jsx` · `RecordsScreen.jsx` · `MorningCheckin.jsx` · `data.js`

**Meta**
- `SKILL.md` — makes this folder usable as a downloadable Claude Agent Skill.
- `readme.md` — this file.

---

*Fonts (Space Grotesk, Inter) are loaded from Google Fonts to match the production app. Swap in licensed/self-hosted copies for production use.*
