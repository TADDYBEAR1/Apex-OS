# Apex-OS — Mission Control for the Road to Yom Sayarot

A personal training operating system built with **React 19 + Vite + Capacitor 8 (Android)**.
Not a workout logger — a campaign command center: countdown to D-Day, training-block roadmap,
daily readiness gates, an in-session progression coach, and a weekly feedback-loop report.

## Core Features

- **Mission Briefing home screen** — D-XXX countdown, campaign progress bar across 6 training
  phases (Build → Impact → Convert → Taper), current week-in-block.
- **Morning Check-In → Traffic Light** — 20 seconds (sleep, knee VAS, lower-back VAS, energy)
  → readiness score 0–100 and a 🟢/🟡/🔴 gate. Red gates lock the planned session and offer a
  built-in Recovery Protocol; yellow injects caution guidance into Focus Mode.
- **Focus Mode** — live session clock, timestamp-based rest timer (survives screen-off) with
  haptics and ±15s, screen wake-lock, and a **Progression Coach**: two clean sessions → one-tap
  APPLY raises the load in both the live session and the saved plan.
- **Plan import/export (.md)** — load a full training week from a structured Markdown file
  (Hebrew/English, see `apex-os-app/plans/apex-plan-example.md`), export the current plan back
  to Markdown, and keep up to 12 plan snapshots in the library.
- **Trends dashboard** — knee/back VAS, readiness, and body weight against a +0.2–0.3 kg/week
  target corridor (14/28/90-day ranges).
- **Weekly report** — sessions vs. planned (compliance %), volume, PRs, pain traffic lights,
  average sleep and readiness — share-ready text for the coach feedback loop.
- **Data safety** — versioned schema migrations (v10), JSON export/import backup, compressed
  profile photos, save-failure banner, error boundary with data rescue.

## Getting Started

```bash
cd apex-os-app
npm install
npm run dev        # web preview at localhost:5173
```

### Tests & Lint

```bash
npm test           # vitest unit tests (utils engines + components)
npm run lint       # eslint
npx playwright test  # e2e (optional, needs browsers installed)
```

### Android

```bash
npm run build
npx cap sync android
npx cap open android   # then Run ▶ in Android Studio
```

Native plugins used: status-bar, haptics, app (back button), local-notifications (morning
reminder). On the web these degrade gracefully.

## Project Layout

```
apex-os-app/
  src/
    components/   # screens + UI (HomeScreen=Mission Briefing, FocusMode, TrendsPanel…)
    utils/        # pure engines: storage+migrations, mission, readiness,
                  # progression, planParser/planExporter, report, notifications
    data/         # default plan & seed data
  plans/          # importable .md plan files (format example included)
  android/        # Capacitor Android project
.github/workflows/ci.yml   # lint + vitest + build on every push
CHANGES.md                  # full upgrade changelog (V2.1 → V2.5)
```

## Plan File Format (.md)

```markdown
## Sunday — Upper Body A
### Main
- Flat DB Bench Press | 4x8 | 22kg | rest 120 | note: per hand
- Pull-Ups | 4xAMRAP | bodyweight | rest 120
- Side Plank | 2x45s | rest 60
```

Days included in the file replace those days; everything else stays untouched.
