---
name: apex-os-design
description: Use this skill to generate well-branded interfaces and assets for Apex OS, a fitness "training operating system" app, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation

- **The brand in one line:** a fitness app run like mission control — deep black canvas, hairline glass surfaces, one electric-cyan signal color (+ orange heat, green gains), huge thin Space Grotesk numbers against tiny wide-tracked caps labels.
- **`styles.css`** is the single CSS entry point — link it and you get every token, font, and the glass/glow/animation utility layer.
- **Components** live under `components/<group>/` as `<Name>.jsx` with a sibling `.d.ts` and `.prompt.md`. Read the `.prompt.md` for usage. They expose on `window.ApexOSDesignSystem_1864eb` once `_ds_bundle.js` is loaded.
- **`ui_kits/apex-os/index.html`** is the canonical look — a full interactive app in a phone. Copy its structure (ambient backdrop, phone frame, status bar, floating nav) to spin up new screens fast.
- **`assets/`** has the app icon, splash, and a spatial motif.

## Non-negotiables when designing for Apex OS

1. Black background, color as *signal* not fill. Cyan always glows.
2. Space Grotesk for numbers/labels (300 for big readouts, 700 + wide tracking for caps labels); Inter 300 for prose.
3. Cards = white 1–5% fill, 1px hairline border, 24px radius, hover warms to cyan. No resting drop shadows.
4. Mission/military copy voice, uppercase wide-tracked labels, signed metric trends, a cyan period on H1s.
5. Emoji only as status (🟢🟡🔴 ⚡), never decoration. UI icons = Lucide, 1.5px round-cap stroke.
6. Motion: ease-out-expo (`cubic-bezier(0.16,1,0.3,1)`), fades + value pulses, no bounces. Respect reduced-motion.
