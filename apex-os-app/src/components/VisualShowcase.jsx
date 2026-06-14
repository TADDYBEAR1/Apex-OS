import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_WORKOUT_PLAN, NUTRITION_DATA, RECORDS_DATA, WORKOUT_HISTORY } from '../data/sampleData';
import { calculateHistoryStats } from '../utils/stats';
import './VisualShowcase.css';

import { VISUAL_SHOWCASE_SLUGS } from './visualShowcaseSlugs';

// Re-exported for backwards compatibility with existing imports.
export { VISUAL_SHOWCASE_SLUGS };

const STAGES = [
  { key: 'hub', label: 'Hub', duration: 6000 },
  { key: 'workout', label: 'Workout', duration: 6000 },
  { key: 'focus', label: 'Focus', duration: 9000 },
  { key: 'finale', label: 'Finale', duration: 7000 },
];

const THEMES = {
  'neon-forge': {
    name: 'Neon Forge',
    tagline: 'Cinematic training command',
    mode: 'Power cadence',
    mark: 'NF',
    colors: {
      '--vs-bg-a': '#020304',
      '--vs-bg-b': '#09100d',
      '--vs-card': 'rgba(8, 16, 14, 0.74)',
      '--vs-card-strong': 'rgba(9, 22, 19, 0.9)',
      '--vs-border': 'rgba(127, 200, 255, 0.25)',
      '--vs-border-soft': 'rgba(255, 255, 255, 0.08)',
      '--vs-text': '#f6fffb',
      '--vs-muted': '#89a19a',
      '--vs-soft': '#c8fff2',
      '--vs-primary': '#7FC8FF',
      '--vs-secondary': '#baff39',
      '--vs-tertiary': '#ff5a36',
      '--vs-warning': '#ffb84d',
      '--vs-shadow': 'rgba(127, 200, 255, 0.3)',
    },
    matrix: ['FORCE', 'VOLUME', 'RECOVERY', 'HEAT'],
  },
  'frosted-atlas': {
    name: 'Frosted Atlas',
    tagline: 'Glass calm with live depth',
    mode: 'Adaptive map',
    mark: 'FA',
    colors: {
      '--vs-bg-a': '#08120f',
      '--vs-bg-b': '#17151d',
      '--vs-card': 'rgba(224, 247, 241, 0.18)',
      '--vs-card-strong': 'rgba(236, 255, 250, 0.26)',
      '--vs-border': 'rgba(213, 240, 230, 0.28)',
      '--vs-border-soft': 'rgba(255, 255, 255, 0.16)',
      '--vs-text': '#f4fffb',
      '--vs-muted': '#b1c5bd',
      '--vs-soft': '#e4fff7',
      '--vs-primary': '#7fffe0',
      '--vs-secondary': '#ffd86f',
      '--vs-tertiary': '#d4a7ff',
      '--vs-warning': '#ff9f6e',
      '--vs-shadow': 'rgba(127, 255, 224, 0.24)',
    },
    matrix: ['BREATH', 'RANGE', 'TEMPO', 'LOAD'],
  },
  'solar-carbon': {
    name: 'Solar Carbon',
    tagline: 'Pearl contrast, machine density',
    mode: 'Output stack',
    mark: 'SC',
    colors: {
      '--vs-bg-a': '#f1eee5',
      '--vs-bg-b': '#191b1c',
      '--vs-card': 'rgba(248, 246, 237, 0.92)',
      '--vs-card-strong': 'rgba(255, 252, 241, 0.98)',
      '--vs-border': 'rgba(15, 18, 18, 0.18)',
      '--vs-border-soft': 'rgba(255, 255, 255, 0.36)',
      '--vs-text': '#111514',
      '--vs-muted': '#5a625d',
      '--vs-soft': '#242827',
      '--vs-primary': '#ffb000',
      '--vs-secondary': '#08bda7',
      '--vs-tertiary': '#ff3f7f',
      '--vs-warning': '#de5a2f',
      '--vs-shadow': 'rgba(255, 176, 0, 0.28)',
    },
    matrix: ['POWER', 'SETS', 'RISK', 'FUEL'],
  },
  'prism-reactor': {
    name: 'Prism Reactor',
    tagline: 'Peak visualisation engine',
    mode: 'Neural output',
    mark: 'PR',
    colors: {
      '--vs-bg-a': '#03040f',
      '--vs-bg-b': '#12051f',
      '--vs-card': 'rgba(18, 10, 38, 0.66)',
      '--vs-card-strong': 'rgba(9, 12, 36, 0.88)',
      '--vs-border': 'rgba(122, 255, 218, 0.34)',
      '--vs-border-soft': 'rgba(255, 255, 255, 0.12)',
      '--vs-text': '#fbfbff',
      '--vs-muted': '#a8a6c8',
      '--vs-soft': '#e5e1ff',
      '--vs-primary': '#7affda',
      '--vs-secondary': '#ff4df8',
      '--vs-tertiary': '#ffe66d',
      '--vs-warning': '#ff7b45',
      '--vs-shadow': 'rgba(122, 255, 218, 0.32)',
    },
    matrix: ['NEURAL', 'PULSE', 'VECTOR', 'IGNITE'],
  },
};

const stageStartTimes = STAGES.reduce((acc, stage, index) => {
  acc[stage.key] = STAGES.slice(0, index).reduce((sum, item) => sum + item.duration, 0);
  return acc;
}, {});

const TOTAL_DURATION = STAGES.reduce((sum, stage) => sum + stage.duration, 0);

function allExercisesForToday() {
  const plan = DEFAULT_WORKOUT_PLAN[3];
  return ['warmup', 'main', 'cooldown'].flatMap((section) =>
    (plan.exercises[section] || []).map((exercise, index) => ({
      ...exercise,
      section,
      sectionIndex: index,
    }))
  );
}

function useShowcaseStage(capture) {
  const [stageIndex, setStageIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!capture) return undefined;

    const startedAt = Date.now();
    const timerId = window.setInterval(() => {
      const nextElapsed = Math.min(Date.now() - startedAt, TOTAL_DURATION);
      setElapsed(nextElapsed);

      let cursor = 0;
      const nextStage = STAGES.findIndex((stage) => {
        cursor += stage.duration;
        return nextElapsed < cursor;
      });
      setStageIndex(nextStage === -1 ? STAGES.length - 1 : nextStage);
    }, 120);

    return () => window.clearInterval(timerId);
  }, [capture]);

  return {
    stage: STAGES[stageIndex],
    stageIndex,
    setStageIndex,
    elapsed,
    progress: capture ? Math.min(elapsed / TOTAL_DURATION, 1) : stageIndex / (STAGES.length - 1),
  };
}

function KineticCanvas({ visual, stageIndex }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    let frameId = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const drawGrid = (time, palette) => {
      ctx.save();
      ctx.globalAlpha = visual === 'solar-carbon' ? 0.22 : visual === 'prism-reactor' ? 0.42 : 0.32;
      ctx.strokeStyle = palette.grid;
      ctx.lineWidth = 1;
      const spacing = visual === 'frosted-atlas' ? 38 : visual === 'prism-reactor' ? 26 : 32;
      const offset = (time * 0.018) % spacing;

      for (let x = -spacing; x < width + spacing; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x - width * 0.24 + offset, height);
        ctx.stroke();
      }

      for (let y = -spacing; y < height + spacing; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(width, y + offset * 0.35);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawRings = (time, palette) => {
      const cx = width * (visual === 'solar-carbon' ? 0.26 : visual === 'prism-reactor' ? 0.55 : 0.74);
      const cy = height * (visual === 'frosted-atlas' ? 0.3 : visual === 'prism-reactor' ? 0.38 : 0.22);
      const base = Math.min(width, height) * 0.22;

      const ringCount = visual === 'prism-reactor' ? 8 : 5;

      for (let index = 0; index < ringCount; index += 1) {
        const radiusX = base + index * 20;
        const radiusY = base * 0.34 + index * 7;
        const rotation = time * (0.00042 + index * 0.00008) + stageIndex * 0.5;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotation);
        ctx.globalAlpha = visual === 'prism-reactor' ? 0.72 - index * 0.055 : 0.72 - index * 0.1;
        ctx.strokeStyle = index % 3 === 0 ? palette.primary : index % 3 === 1 ? palette.secondary : palette.tertiary;
        ctx.lineWidth = index === 0 ? 2 : 1;
        ctx.beginPath();
        ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 1.55);
        ctx.stroke();
        ctx.restore();
      }
    };

    const drawWave = (time, palette) => {
      ctx.save();
      ctx.globalAlpha = visual === 'frosted-atlas' ? 0.42 : 0.3;
      ctx.strokeStyle = palette.tertiary;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 8) {
        const y =
          height * 0.72 +
          Math.sin((x + time * 0.08) / 34) * 16 +
          Math.cos((x - time * 0.05) / 52) * 22;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();
    };

    const drawSpectralColumns = (time, palette) => {
      if (visual !== 'prism-reactor') return;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let index = 0; index < 34; index += 1) {
        const x = (index / 33) * width;
        const heightMod =
          Math.sin(time * 0.002 + index * 0.62 + stageIndex) * 0.5 +
          Math.cos(time * 0.0013 + index * 0.3) * 0.5;
        const columnHeight = 70 + Math.abs(heightMod) * 240;
        const gradient = ctx.createLinearGradient(x, height * 0.92, x, height * 0.92 - columnHeight);
        gradient.addColorStop(0, 'rgba(122,255,218,0)');
        gradient.addColorStop(0.45, palette.primary);
        gradient.addColorStop(1, index % 2 === 0 ? palette.secondary : palette.tertiary);
        ctx.globalAlpha = 0.2 + Math.abs(heightMod) * 0.16;
        ctx.fillStyle = gradient;
        ctx.fillRect(x, height * 0.92 - columnHeight, 3, columnHeight);
      }
      ctx.restore();
    };

    const render = (time) => {
      const palette =
        visual === 'solar-carbon'
          ? { primary: '#ffb000', secondary: '#08bda7', tertiary: '#ff3f7f', grid: 'rgba(17,21,20,0.2)' }
          : visual === 'prism-reactor'
            ? { primary: '#7affda', secondary: '#ff4df8', tertiary: '#ffe66d', grid: 'rgba(122,255,218,0.2)' }
            : visual === 'frosted-atlas'
              ? { primary: '#7fffe0', secondary: '#ffd86f', tertiary: '#d4a7ff', grid: 'rgba(229,255,248,0.18)' }
              : { primary: '#7FC8FF', secondary: '#baff39', tertiary: '#ff5a36', grid: 'rgba(127, 200, 255,0.16)' };

      ctx.clearRect(0, 0, width, height);
      drawGrid(time, palette);
      drawSpectralColumns(time, palette);
      drawRings(time, palette);
      drawWave(time, palette);
      frameId = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    frameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, [stageIndex, visual]);

  return <canvas className="vs-canvas" ref={canvasRef} aria-hidden="true" />;
}

function DepthField() {
  return (
    <div className="vs-depth-field" aria-hidden="true">
      {Array.from({ length: 11 }).map((_, index) => (
        <span key={index} style={{ '--depth-index': index }} />
      ))}
    </div>
  );
}

function Icon({ type }) {
  const paths = {
    hub: 'M4 12.5 12 5l8 7.5V20h-5v-5H9v5H4v-7.5Z',
    workout: 'M5 9h3V6h2v12H8v-3H5v-2h3v-2H5V9Zm9-3h2v3h3v2h-3v2h3v2h-3v3h-2V6Zm-4 5h4v2h-4v-2Z',
    focus: 'M12 3l2.2 5.6 5.8.4-4.5 3.7 1.4 5.7L12 15.2 7.1 18.4l1.4-5.7L4 9l5.8-.4L12 3Z',
    finale: 'M4 19V5h2v14H4Zm4 0v-8h2v8H8Zm4 0V8h2v11h-2Zm4 0v-5h2v5h-2Zm-8-9 4-4 3 3 5-5 1.4 1.4L15 11.8l-3-3-2.6 2.6L8 10Z',
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[type]} />
    </svg>
  );
}

function ProgressRing({ value, label, sublabel }) {
  const radius = 42;
  const circumference = Math.PI * 2 * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div className="vs-ring-card">
      <svg viewBox="0 0 104 104" className="vs-ring">
        <circle cx="52" cy="52" r={radius} className="vs-ring-track" />
        <circle
          cx="52"
          cy="52"
          r={radius}
          className="vs-ring-fill"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div>
        <strong>{value}%</strong>
        <span>{label}</span>
        <small>{sublabel}</small>
      </div>
    </div>
  );
}

function MetricCard({ label, value, detail, accent = 'primary' }) {
  return (
    <div className={`vs-card vs-metric vs-accent-${accent}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

function MicroHeatmap() {
  const cells = [3, 0, 1, 2, 0, 3, 1, 0, 2, 2, 0, 3, 1, 0, 2, 0, 3, 2, 1, 0, 3];
  return (
    <div className="vs-heatmap" aria-label="Training activity heatmap">
      {cells.map((value, index) => (
        <span key={`${value}-${index}`} data-level={value} />
      ))}
    </div>
  );
}

function SpectralPanel() {
  const bars = [42, 78, 54, 91, 63, 86, 48, 74, 97, 58, 82, 66];

  return (
    <div className="vs-spectral-panel" aria-label="Live performance spectrum">
      <div>
        <span>Signal density</span>
        <strong>98.4</strong>
      </div>
      <div className="vs-spectrum">
        {bars.map((value, index) => (
          <i key={`${value}-${index}`} style={{ '--signal-value': `${value}%`, '--signal-index': index }} />
        ))}
      </div>
    </div>
  );
}

function VectorMap() {
  return (
    <div className="vs-vector-map" aria-label="Workout route visualisation">
      {['Warm', 'Pull', 'Row', 'Curl'].map((label, index) => (
        <span key={label} style={{ '--node-index': index }}>
          {label}
        </span>
      ))}
    </div>
  );
}

function RibbonChart({ variant = 'volume' }) {
  const points =
    variant === 'fuel'
      ? '0,58 42,48 84,52 126,30 168,38 210,18 252,28 294,16'
      : '0,62 42,38 84,48 126,22 168,34 210,18 252,30 294,12';

  return (
    <svg className="vs-ribbon" viewBox="0 0 294 86" aria-label={`${variant} trend`}>
      <defs>
        <linearGradient id={`ribbon-${variant}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="var(--vs-primary)" />
          <stop offset="0.55" stopColor="var(--vs-secondary)" />
          <stop offset="1" stopColor="var(--vs-tertiary)" />
        </linearGradient>
      </defs>
      <path d={`M${points} L294,86 L0,86 Z`} className="vs-ribbon-fill" />
      <polyline points={points} className="vs-ribbon-line" />
    </svg>
  );
}

function AppHeader({ theme, stage }) {
  return (
    <header className="vs-header">
      <div>
        <span className="vs-kicker">{theme.name}</span>
        <h1>{stage.label === 'Finale' ? 'Command Review' : stage.label}</h1>
        <p>{theme.tagline}</p>
      </div>
      <div className="vs-avatar" aria-label={`${theme.name} profile mark`}>
        {theme.mark}
      </div>
    </header>
  );
}

function DemoNav({ activeKey, onChange, capture }) {
  if (capture) return null;

  return (
    <nav className="vs-demo-controls" aria-label="Visual demo stages">
      {STAGES.map((stage, index) => (
        <button
          key={stage.key}
          type="button"
          className={activeKey === stage.key ? 'is-active' : ''}
          onClick={() => onChange(index)}
        >
          <Icon type={stage.key === 'finale' ? 'finale' : stage.key} />
          <span>{stage.label}</span>
        </button>
      ))}
    </nav>
  );
}

function ThemeSwitcher({ activeVisual, capture }) {
  if (capture) return null;

  return (
    <div className="vs-theme-switcher" aria-label="Visual alternatives">
      {VISUAL_SHOWCASE_SLUGS.map((slug) => (
        <a key={slug} className={activeVisual === slug ? 'is-active' : ''} href={`/?visual=${slug}`}>
          {THEMES[slug].name}
        </a>
      ))}
    </div>
  );
}

function HubScene({ stats, todayPlan, theme }) {
  const exercises = allExercisesForToday();
  const weeklyProgress = Math.min(Math.round((stats.weeklySessions / 5) * 100), 100);

  return (
    <section className="vs-scene vs-hub-scene" aria-label="Hub visual preview">
      <div className="vs-hero-row">
        <ProgressRing value={weeklyProgress} label="Weekly output" sublabel={`${stats.weeklySessions}/5 sessions`} />
        <div className="vs-card vs-hero-copy">
          <span>{theme.mode}</span>
          <strong>{todayPlan.name}</strong>
          <p>{exercises.length} exercises calibrated for pull strength and recovery control.</p>
        </div>
      </div>

      <div className="vs-metric-grid">
        <MetricCard label="Streak" value={`${stats.currentStreak}d`} detail="current run" />
        <MetricCard label="Volume" value="16.8k" detail="weekly peak" accent="secondary" />
        <MetricCard label="Readiness" value="92" detail="green zone" accent="tertiary" />
      </div>

      <div className="vs-card vs-consistency-card">
        <div>
          <span>Training consistency</span>
          <strong>{stats.consistency}%</strong>
          <p>{stats.activeDays} active days across the selected range.</p>
        </div>
        <SpectralPanel />
        <MicroHeatmap />
      </div>
    </section>
  );
}

function WorkoutScene({ todayPlan, theme }) {
  const exercises = allExercisesForToday();

  return (
    <section className="vs-scene vs-workout-scene" aria-label="Workout visual preview">
      <button className="vs-primary-action" type="button">
        <Icon type="focus" />
        <span>Enter focus mode</span>
      </button>

      <div className="vs-card vs-workout-brief">
        <span>Today</span>
        <strong>{todayPlan.name}</strong>
        <VectorMap />
        <RibbonChart />
      </div>

      <div className="vs-exercise-stack">
        {exercises.slice(0, 3).map((exercise, index) => (
          <article className="vs-exercise-row" key={exercise.id} style={{ '--row-index': index }}>
            <div className="vs-exercise-icon">
              <Icon type="workout" />
            </div>
            <div>
              <strong>{exercise.name}</strong>
              <span>
                {exercise.sets} x {exercise.reps}
                {exercise.weight > 0 ? ` / ${exercise.weight}kg` : ''} / {exercise.rest}s rest
              </span>
            </div>
            <small>{theme.matrix[index]}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function FocusScene({ theme }) {
  return (
    <section className="vs-scene vs-focus-scene" aria-label="Focus mode visual preview">
      <div className="vs-focus-stage">
        <div className="vs-lift-sculpture" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="vs-focus-title">
          <span>Focus mode</span>
          <strong>Bent Over Row</strong>
          <p>Set 3 of 4 / main workout / controlled pull.</p>
        </div>
      </div>

      <div className="vs-stepper-grid">
        <div className="vs-stepper">
          <button type="button">-</button>
          <div>
            <span>Reps</span>
            <strong>8</strong>
          </div>
          <button type="button">+</button>
        </div>
        <div className="vs-stepper">
          <button type="button">-</button>
          <div>
            <span>Load</span>
            <strong>60kg</strong>
          </div>
          <button type="button">+</button>
        </div>
      </div>

      <div className="vs-card vs-coach-card">
        <span>{theme.mode}</span>
        <p>Pull to the navel. Keep the chest quiet, lats engaged, and tempo steady.</p>
      </div>

      <div className="vs-swipe-track" aria-label="Swipe to finish set">
        <span className="vs-swipe-thumb">
          <Icon type="focus" />
        </span>
        <strong>Swipe to finish set</strong>
      </div>
    </section>
  );
}

function FinaleScene({ nutrition, records }) {
  const caloriePercent = Math.round((nutrition.calorieConsumed / nutrition.calorieGoal) * 100);
  const bestRecords = records.benchmarks.slice(0, 3);

  return (
    <section className="vs-scene vs-finale-scene" aria-label="Stats and fuel visual preview">
      <div className="vs-card vs-fuel-card">
        <span>Fuel status</span>
        <strong>{nutrition.calorieConsumed.toLocaleString()}</strong>
        <p>{caloriePercent}% of daily target / {nutrition.calorieGoal - nutrition.calorieConsumed} kcal remaining</p>
        <div className="vs-bars">
          <span style={{ '--bar-value': '76%', '--bar-color': 'var(--vs-primary)' }} />
          <span style={{ '--bar-value': '67%', '--bar-color': 'var(--vs-secondary)' }} />
          <span style={{ '--bar-value': '79%', '--bar-color': 'var(--vs-tertiary)' }} />
        </div>
      </div>

      <div className="vs-card vs-record-card">
        <span>Records hub</span>
        {bestRecords.map((record) => (
          <div className="vs-record-row" key={record.label}>
            <strong>{record.label}</strong>
            <em>
              {record.value}
              {record.unit === 'KG' ? 'kg' : ''}
            </em>
          </div>
        ))}
      </div>

      <div className="vs-card vs-command-card">
        <span>Next move</span>
        <strong>Pull volume is climbing</strong>
        <SpectralPanel />
        <RibbonChart variant="fuel" />
      </div>
    </section>
  );
}

function Scene({ stage, theme, stats, todayPlan }) {
  if (stage.key === 'workout') return <WorkoutScene todayPlan={todayPlan} theme={theme} />;
  if (stage.key === 'focus') return <FocusScene theme={theme} />;
  if (stage.key === 'finale') return <FinaleScene nutrition={NUTRITION_DATA} records={RECORDS_DATA} />;
  return <HubScene stats={stats} todayPlan={todayPlan} theme={theme} />;
}

export default function VisualShowcase({ visual = 'neon-forge', capture = false }) {
  const activeVisual = VISUAL_SHOWCASE_SLUGS.includes(visual) ? visual : 'neon-forge';
  const theme = THEMES[activeVisual];
  const todayPlan = DEFAULT_WORKOUT_PLAN[3];
  const { stage, stageIndex, setStageIndex, progress } = useShowcaseStage(capture);
  const stats = useMemo(() => {
    const calculated = calculateHistoryStats(WORKOUT_HISTORY, 30, new Date('2026-05-20T12:00:00'));
    return {
      ...calculated,
      weeklySessions: 4,
      currentStreak: 6,
      consistency: 78,
      activeDays: 23,
      totalSessions: Math.max(calculated.totalSessions, 16),
    };
  }, []);

  return (
    <main
      className={`visual-showcase visual-${activeVisual} ${capture ? 'is-capture' : ''} stage-${stage.key}`}
      style={theme.colors}
      data-visual={activeVisual}
    >
      <KineticCanvas visual={activeVisual} stageIndex={stageIndex} />
      <DepthField />
      <div className="vs-screen">
        <ThemeSwitcher activeVisual={activeVisual} capture={capture} />
        <AppHeader theme={theme} stage={stage} />
        <div className="vs-progress" aria-label="Demo progress">
          <span style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
        <Scene stage={stage} theme={theme} stats={stats} todayPlan={todayPlan} />
        <DemoNav activeKey={stage.key} onChange={setStageIndex} capture={capture} />
      </div>
    </main>
  );
}
