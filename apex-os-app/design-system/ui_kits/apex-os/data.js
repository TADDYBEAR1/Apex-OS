// Apex OS — UI kit sample data (lifted from the production seed data)
window.ApexData = {
  profile: { name: 'Daniel Avraham' },
  mission: {
    daysToTarget: 128,
    targetLabel: 'YOM SAYAROT',
    phase: 'The Yoke Block',
    weekInPhase: 2,
    phaseTotalWeeks: 4,
    progressPct: 62,
    phases: ['BUILD', 'IMPACT', 'B3', 'B4', 'CONV', 'TAPER'],
    phaseIndex: 3,
  },
  readiness: {
    light: 'green',
    score: 88,
    title: 'GREEN — FULL SEND',
    recommendation: 'Sleep banked, joints quiet. Green light on today\u2019s plan.',
  },
  today: { name: 'The Heavy Trunk', exercises: 6, durationMin: 90 },
  stats: { week: 4, weekTarget: 5, streak: 6, total: 128 },
  benchmarks: [
    { label: '3000m Run', value: '14:30', unit: 'time', tone: 'endurance', cat: 'Endurance', icon: '\uD83C\uDFC3', trend: '-1.5% vs last month', positive: true },
    { label: 'Max Pull-Ups', value: '12', unit: 'reps', tone: 'bodyweight', cat: 'Bodyweight', icon: '\uD83D\uDCAA', trend: '+5.0% vs last month', positive: true },
    { label: 'Bench Press 1RM', value: '100', unit: 'kg', tone: 'strength', cat: 'Strength', icon: '\uD83C\uDFCB\uFE0F', trend: '+8.1%', positive: true },
    { label: 'Back Squat 1RM', value: '120', unit: 'kg', tone: 'strength', cat: 'Strength', icon: '\uD83C\uDFCB\uFE0F', trend: '+4.2%', positive: true },
    { label: 'Deadlift 1RM', value: '140', unit: 'kg', tone: 'strength', cat: 'Strength', icon: '\uD83C\uDFCB\uFE0F', trend: '-2.1%', positive: false },
  ],
  workCapacity: { value: 42, unit: 'MIN', status: 'Optimal zone' },
  session: {
    name: 'The Heavy Trunk',
    exercises: [
      { name: 'Chest-Supported DB Row', detail: '4 \u00D7 10 \u00B7 32kg', done: true },
      { name: 'Flat DB Bench Press', detail: '3 \u00D7 10 \u00B7 40kg', done: false, active: true },
      { name: 'Single Leg DB RDL', detail: '3 \u00D7 8 \u00B7 24kg', done: false },
      { name: 'Heavy Suitcase Carries', detail: '3 \u00D7 30m \u00B7 24kg', done: false },
      { name: 'Side Plank', detail: '2 \u00D7 45s', done: false },
    ],
  },
  // 5 rows (Mon..Fri) x weeks, intensity 0-3
  heatmap: [
    [0, 2, 3, 1, 2, 3],
    [3, 1, 2, 3, 1, 2],
    [0, 0, 1, 2, 3, 1],
    [2, 3, 1, 0, 2, 3],
    [1, 2, 3, 2, 1, 0],
  ],
  heatmapDays: ['M', 'T', 'W', 'T', 'F'],
};
