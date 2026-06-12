import { getLocalDateKey } from './storage';

export function calculateStats(heatmapData, options = {}) {
  // heatmapData: 7 rows (Mon-Sun) × N columns (weeks)
  // 0 = no workout, >0 = workout intensity
  const numDays = 7;
  const numWeeks = heatmapData[0]?.length || 0;
  const totalDays = numDays * numWeeks;
  const latestDayIndex = Number.isInteger(options.latestDayIndex)
    ? Math.max(0, Math.min(options.latestDayIndex, numDays - 1))
    : numDays - 1;

  let totalSessions = 0;
  let activeDays = 0;

  // Count all active days
  for (let day = 0; day < numDays; day++) {
    for (let week = 0; week < numWeeks; week++) {
      if (heatmapData[day]?.[week] > 0) {
        totalSessions++;
        activeDays++;
      }
    }
  }

  // Weekly sessions = last column (most recent week)
  let weeklySessions = 0;
  const lastWeekIdx = numWeeks - 1;
  for (let day = 0; day < numDays; day++) {
    if (heatmapData[day]?.[lastWeekIdx] > 0) {
      weeklySessions++;
    }
  }

  // Current streak: iterate from the latest real day backwards.
  // Generated heatmaps can include future days in the current week, so
  // latestDayIndex prevents those empty cells from breaking the streak.
  let currentStreak = 0;
  let streakBroken = false;
  for (let week = numWeeks - 1; week >= 0 && !streakBroken; week--) {
    const startDay = week === numWeeks - 1 ? latestDayIndex : numDays - 1;
    for (let day = startDay; day >= 0 && !streakBroken; day--) {
      const isToday = (week === numWeeks - 1 && day === latestDayIndex);
      if (heatmapData[day]?.[week] > 0) {
        currentStreak++;
      } else {
        if (!isToday) {
          streakBroken = true;
        }
      }
    }
  }

  const consistency = totalDays > 0 ? Math.round((activeDays / totalDays) * 100) : 0;

  return {
    totalSessions,
    currentStreak,
    consistency,
    activeDays,
    totalDays,
    weeklySessions,
  };
}

function getStartOfLocalDay(date = new Date()) {
  const day = new Date(date);
  day.setHours(0, 0, 0, 0);
  return day;
}

function parseSessionDate(rawDate) {
  if (!rawDate) return null;
  const value = String(rawDate);

  if (!value.includes('T')) {
    const [year, month, day] = value.slice(0, 10).split('-').map(Number);
    if (!year || !month || !day) return null;
    return new Date(year, month - 1, day);
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function calculateHistoryStats(history = [], rangeDays = 30, referenceDate = new Date()) {
  const safeRangeDays = Math.max(1, Number(rangeDays) || 30);
  const ref = getStartOfLocalDay(referenceDate);
  const rangeStart = new Date(ref);
  rangeStart.setDate(ref.getDate() - safeRangeDays + 1);

  const activeDays = new Set();
  let sessionCount = 0;

  history.forEach((session) => {
    const sessionDate = parseSessionDate(session.completedAt || session.date);
    if (!sessionDate) return;

    const completedDay = getStartOfLocalDay(sessionDate);
    if (completedDay < rangeStart || completedDay > ref) return;

    activeDays.add(formatLocalDateKey(completedDay));
    sessionCount += 1;
  });

  const latestDayIndex = getHeatmapDayIndex(ref);
  const currentWeekStart = new Date(ref);
  currentWeekStart.setDate(ref.getDate() - latestDayIndex);

  let weeklySessions = 0;
  activeDays.forEach((dateKey) => {
    const [year, month, day] = dateKey.split('-').map(Number);
    const activeDate = new Date(year, month - 1, day);
    if (activeDate >= currentWeekStart && activeDate <= ref) {
      weeklySessions += 1;
    }
  });

  let currentStreak = 0;
  const cursor = new Date(ref);
  while (cursor >= rangeStart) {
    if (!activeDays.has(formatLocalDateKey(cursor))) break;
    currentStreak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return {
    totalSessions: sessionCount,
    currentStreak,
    consistency: Math.round((activeDays.size / safeRangeDays) * 100),
    activeDays: activeDays.size,
    totalDays: safeRangeDays,
    weeklySessions,
  };
}

export function getHeatmapDayIndex(date) {
  const jsDay = date.getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

export function buildHeatmapFromWorkoutHistory(history = [], weeks = 4, referenceDate = new Date(), options = {}) {
  const cells = Array.from({ length: 7 }, () => Array(weeks).fill(0));
  const ref = getStartOfLocalDay(referenceDate);
  const rangeDays = options.rangeDays ? Math.max(1, Number(options.rangeDays)) : null;
  const rangeStart = rangeDays ? new Date(ref) : null;
  if (rangeStart) rangeStart.setDate(ref.getDate() - rangeDays + 1);

  const latestDayIndex = getHeatmapDayIndex(ref);
  const currentWeekStart = new Date(ref);
  currentWeekStart.setDate(ref.getDate() - latestDayIndex);

  history.forEach((session) => {
    const rawDate = session.completedAt || session.date;
    const parsedDate = parseSessionDate(rawDate);
    if (!parsedDate) return;

    const completedDate = getStartOfLocalDay(parsedDate);
    if (completedDate > ref) return;
    if (rangeStart && completedDate < rangeStart) return;

    const sessionDayIndex = getHeatmapDayIndex(completedDate);
    const sessionWeekStart = new Date(completedDate);
    sessionWeekStart.setDate(completedDate.getDate() - sessionDayIndex);

    const weekDiff = Math.round((currentWeekStart - sessionWeekStart) / (7 * 24 * 60 * 60 * 1000));
    const column = weeks - 1 - weekDiff;
    if (column < 0 || column >= weeks) return;

    const completedSetCount = session.completedSets?.length || session.totalSets || 1;
    const intensity = completedSetCount >= 12 ? 3 : completedSetCount >= 6 ? 2 : 1;
    cells[sessionDayIndex][column] = Math.max(cells[sessionDayIndex][column], intensity);
  });

  return {
    cells,
    latestDayIndex,
    weekLabels: Array.from({ length: weeks }, (_, i) => `W${i + 1}`),
  };
}

export function formatDuration(seconds = 0) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const remainingSecs = seconds % 60;

  if (hrs > 0) return `${hrs}h ${mins}m`;
  if (mins > 0) return `${mins}m ${remainingSecs}s`;
  return `${remainingSecs}s`;
}

export function calculateWorkoutVolume(completedSets = []) {
  return completedSets.reduce((total, set) => {
    const reps = Number(set.actualReps) || 0;
    const weight = Number(set.actualWeight) || 0;
    const isBodyweight = Boolean(set.isBodyweight);
    const volumeMultiplier = isBodyweight ? Math.max(1, weight) : weight;
    return total + reps * volumeMultiplier;
  }, 0);
}

export function summarizeWorkoutSession(session = {}) {
  const completedSets = session.completedSets || [];
  const volume = calculateWorkoutVolume(completedSets);
  const exercises = new Map();

  completedSets.forEach((set) => {
    const key = set.exerciseName || set.exerciseId || 'Exercise';
    const existing = exercises.get(key) || {
      name: key,
      section: set.section || 'main',
      sets: 0,
      reps: 0,
      volume: 0,
      bestWeight: 0,
      bestReps: 0,
      isBodyweight: Boolean(set.isBodyweight),
    };

    const reps = Number(set.actualReps) || 0;
    const weight = Number(set.actualWeight) || 0;
    const isBodyweight = Boolean(set.isBodyweight);
    const volumeMultiplier = isBodyweight ? Math.max(1, weight) : weight;
    
    existing.sets += 1;
    existing.reps += reps;
    existing.volume += reps * volumeMultiplier;
    existing.bestWeight = Math.max(existing.bestWeight, weight);
    existing.bestReps = Math.max(existing.bestReps, reps);
    exercises.set(key, existing);
  });

  const topLifts = [...exercises.values()]
    .filter(item => item.bestWeight > 0)
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 3);

  return {
    completedSetCount: completedSets.length,
    plannedSetCount: session.plannedSetCount || session.totalSets || completedSets.length,
    volume,
    exercises: [...exercises.values()],
    topLifts,
  };
}

// ─── Benchmark Trend Analysis ────────────────────────────────
export function normalizeBenchmarkName(value = '') {
  return value
    .toLowerCase()
    .replace(/1rm|max|benchmark|barbell|dumbbell|db|bb|weighted/g, '')
    .replace(/pull-ups/g, 'pull ups')
    .replace(/push-ups/g, 'push ups')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function formatBenchmarkValue(value, unit) {
  if (unit === 'TIME') {
    const mins = Math.floor(value / 60);
    const secs = value % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  return value;
}

export function estimateOneRepMax(weight, reps) {
  const numericWeight = Number(weight) || 0;
  const numericReps = Number(reps) || 0;
  if (numericWeight <= 0 || numericReps <= 0) return 0;
  if (numericReps === 1) return numericWeight;

  // Epley is universally safer for high reps
  const epley = numericWeight * (1 + numericReps / 30);
  
  if (numericReps > 10) {
    // For high reps, Brzycki and Wathan break down. Rely solely on Epley.
    return Math.round(epley * 10) / 10;
  }

  // Elite Composite 1RM calculation (Average of Epley, Brzycki, and Wathan)
  const brzycki = numericWeight * (36 / (37 - numericReps));
  const wathan = numericWeight * 100 / (48.8 + 53.8 * Math.exp(-0.075 * numericReps));
  
  const composite = (epley + brzycki + wathan) / 3;
  return Math.round(composite * 10) / 10;
}

export function computeBenchmarkTrend(history, unit) {
  if (!history || history.length < 2) {
    return { text: 'New Benchmark', positive: true, status: 'new', percentChange: 0, recentDelta: 0 };
  }

  // True Linear Regression (Line of Best Fit - Time Aware)
  const n = history.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
  const values = history.map(h => Number(h.value));
  
  const firstDate = new Date(history[0].date).getTime();
  const daysElapsed = history.map(h => {
    const ts = new Date(h.date).getTime();
    return (ts - firstDate) / (1000 * 60 * 60 * 24);
  });
  
  for (let i = 0; i < n; i++) {
    const x = daysElapsed[i];
    sumX += x;
    sumY += values[i];
    sumXY += x * values[i];
    sumXX += x * x;
  }
  
  const denominator = (n * sumXX - sumX * sumX);
  const slope = denominator === 0 ? 0 : (n * sumXY - sumX * sumY) / denominator;
  
  const first = values[0];
  const last = values[n - 1];
  const recentDelta = last - values[n - 2];
  const percentChange = first !== 0 ? ((last - first) / Math.abs(first)) * 100 : 0;
  const isTimeBenchmark = unit === 'TIME';

  // Determine status based on the regression slope rather than just start/end
  const avgValue = sumY / n;
  
  // Calculate the total change across the entire timeline predicted by the line of best fit
  const totalExpectedChange = slope * daysElapsed[n - 1];
  
  const trendPercentChange = avgValue !== 0 ? (totalExpectedChange / avgValue) * 100 : 0;

  // If the trend line shows less than a 1% shift over the whole timeline, we call it stagnant
  // Handle edge case where daysElapsed is 0 (all entries on same day)
  const isStagnant = daysElapsed[n - 1] === 0 ? true : Math.abs(trendPercentChange) < 1.0;
  
  let status;
  if (isStagnant) {
    status = 'stagnant';
  } else if (isTimeBenchmark) {
    status = slope < 0 ? 'improving' : 'declining';
  } else {
    status = slope > 0 ? 'improving' : 'declining';
  }

  if (isTimeBenchmark) {
    const absDelta = Math.abs(recentDelta);
    const mins = Math.floor(absDelta / 60);
    const secs = absDelta % 60;
    const formatted = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    return {
      text: recentDelta <= 0 ? `↓ ${formatted} faster` : `↑ ${formatted} slower`,
      positive: recentDelta <= 0,
      status,
      percentChange,
      trendPercentChange,
      recentDelta,
    };
  }

  const suffix = unit === 'REPS' ? ' reps' : ` ${unit.toLowerCase()}`;
  if (recentDelta > 0) {
    return { text: `↑ +${recentDelta}${suffix}`, positive: true, status, percentChange, trendPercentChange, recentDelta };
  }
  if (recentDelta < 0) {
    return { text: `↓ ${recentDelta}${suffix}`, positive: false, status, percentChange, trendPercentChange, recentDelta };
  }
  return { text: 'No change', positive: true, status, percentChange, trendPercentChange, recentDelta };
}

export function analyzeBenchmarkTrends(benchmarks) {
  const trends = [];

  for (const b of benchmarks) {
    const history = b.history || [];
    if (history.length < 2) {
      trends.push({ label: b.label, change: 0, status: 'new', unit: b.unit });
      continue;
    }

    const trend = computeBenchmarkTrend(history, b.unit);

    trends.push({
      label: b.label,
      change: Math.abs(trend.trendPercentChange !== undefined ? trend.trendPercentChange : trend.percentChange).toFixed(1),
      recentDelta: trend.recentDelta,
      status: trend.status,
      unit: b.unit,
      entries: history.length,
    });
  }

  return trends;
}

function createBenchmarkEntry(benchmark, value, completedAt, source) {
  // Local calendar date — slicing the ISO string is UTC and shifts
  // post-midnight sessions to the previous day in UTC+ timezones.
  const date = getLocalDateKey(new Date(completedAt));
  const history = benchmark.history || [];
  const lastEntry = history[history.length - 1];
  const isDuplicate = lastEntry && lastEntry.date === date && Number(lastEntry.value) === Number(value);
  if (isDuplicate) return { benchmark, detected: null };

  const newHistory = [...history, { value, date, source }];
  const trend = computeBenchmarkTrend(newHistory, benchmark.unit);
  return {
    benchmark: {
      ...benchmark,
      value: benchmark.unit === 'TIME' ? formatBenchmarkValue(value, 'TIME') : value,
      history: newHistory,
      trend: trend.text,
      positive: trend.positive,
    },
    detected: {
      label: benchmark.label,
      value,
      unit: benchmark.unit,
      date,
      previousValue: lastEntry?.value ?? null,
    },
  };
}

export function getCompletedSetBenchmarkCandidates(completedSets = []) {
  const bestByExercise = new Map();

  completedSets.forEach((set) => {
    if ((set.section || 'main') !== 'main') return;

    const reps = Number(set.actualReps) || 0;
    const weight = Number(set.actualWeight) || 0;
    if (reps <= 0) return;

    const isBodyweight = Boolean(set.isBodyweight);
    const isWeightedBodyweight = isBodyweight && weight > 0;
    
    let value, unit;
    
    if (isBodyweight && !isWeightedBodyweight) {
      value = reps;
      unit = 'REPS';
    } else {
      value = estimateOneRepMax(weight, reps);
      unit = 'KG';
    }

    if (value <= 0) return;

    const exerciseName = set.exerciseName || 'Exercise';
    const normalizedName = normalizeBenchmarkName(exerciseName);
    const existing = bestByExercise.get(normalizedName);

    if (!existing || value > existing.value) {
      bestByExercise.set(normalizedName, {
        exerciseId: set.exerciseId,
        exerciseName,
        normalizedName,
        value,
        unit,
        sourceSet: set,
      });
    }
  });

  return [...bestByExercise.values()];
}

export function applyWorkoutPersonalRecords(benchmarks = [], completedSets = [], completedAt = new Date().toISOString()) {
  const candidates = getCompletedSetBenchmarkCandidates(completedSets);
  const updated = benchmarks.map(benchmark => ({ ...benchmark, history: [...(benchmark.history || [])] }));
  const detected = [];

  candidates.forEach((candidate) => {
    const existingIndex = updated.findIndex((benchmark) => {
      if (benchmark.unit !== candidate.unit) return false;
      if (benchmark.exerciseId && candidate.exerciseId && benchmark.exerciseId === candidate.exerciseId) return true;

      const benchmarkName = normalizeBenchmarkName(benchmark.label);
      return benchmarkName === candidate.normalizedName ||
        benchmarkName.includes(candidate.normalizedName) ||
        candidate.normalizedName.includes(benchmarkName);
    });

    const targetIndex = existingIndex >= 0 ? existingIndex : updated.length;
    const benchmark = existingIndex >= 0
      ? updated[existingIndex]
      : {
          label: candidate.unit === 'REPS' ? `Max ${candidate.exerciseName}` : `${candidate.exerciseName} 1RM`,
          value: candidate.value,
          unit: candidate.unit,
          trend: 'New Benchmark',
          positive: true,
          exerciseId: candidate.exerciseId,
          history: [],
        };

    const currentBest = Math.max(0, ...(benchmark.history || []).map(entry => Number(entry.value) || 0));
    if (candidate.value <= currentBest) {
      if (existingIndex < 0) updated.push(benchmark);
      return;
    }

    const result = createBenchmarkEntry(
      { ...benchmark, exerciseId: benchmark.exerciseId || candidate.exerciseId },
      candidate.value,
      completedAt,
      { type: 'workout', exerciseName: candidate.exerciseName }
    );

    updated[targetIndex] = result.benchmark;
    if (result.detected) detected.push(result.detected);
  });

  return { benchmarks: updated, detected };
}

// ─── Fuel / Diet Compliance ──────────────────────────────────
export function calculateFuelTotals(nutritionData) {
  const totals = { calories: 0, protein: 0, carbs: 0, fats: 0 };
  if (!nutritionData?.meals) return totals;

  Object.values(nutritionData.meals).flat().forEach(meal => {
    if (meal.checked) {
      totals.calories += meal.calories || 0;
      totals.protein += meal.protein || 0;
      totals.carbs += meal.carbs || 0;
      totals.fats += meal.fat || 0;
    }
  });

  return totals;
}

export function analyzeFuelCompliance(nutritionData) {
  if (!nutritionData || !nutritionData.meals) {
    return { compliance: 0, total: 0, checked: 0, status: 'unknown' };
  }

  let total = 0;
  let checked = 0;

  Object.values(nutritionData.meals).flat().forEach(meal => {
    total += 1;
    if (meal.checked) checked += 1;
  });

  const compliance = total > 0 ? Math.round((checked / total) * 100) : 0;

  let status;
  if (compliance >= 80) status = 'excellent';
  else if (compliance >= 60) status = 'good';
  else if (compliance >= 40) status = 'moderate';
  else if (total > 0) status = 'low';
  else status = 'none';

  return { compliance, total, checked, status };
}

// ─── Smart Insight Generator ─────────────────────────────────
export function generateInsight(stats, benchmarks, nutritionData) {
  const trends = analyzeBenchmarkTrends(benchmarks);
  const fuel = analyzeFuelCompliance(nutritionData);

  const improving = trends.filter(t => t.status === 'improving');
  const declining = trends.filter(t => t.status === 'declining');
  const stagnant = trends.filter(t => t.status === 'stagnant');

  // ── Priority 1: Very low fuel compliance warning ──
  if (fuel.status === 'low' && fuel.total > 0) {
    return {
      title: 'FUEL WARNING',
      message: `Only ${fuel.checked} of ${fuel.total} planned meals logged today (${fuel.compliance}%). Nutrition adherence is critical for the strength gains you're targeting. Fuel the machine.`,
      positive: false,
    };
  }

  // ── Priority 2: Benchmark regression alert ──
  if (declining.length >= 2) {
    const names = declining.map(d => d.label).join(' & ');
    return {
      title: 'REGRESSION ALERT',
      message: `${names} are showing declining trends. Review your programming and recovery — possible overtraining or insufficient fuel intake.`,
      positive: false,
    };
  }

  // ── Priority 3: Single decline + training consistency concern ──
  if (declining.length === 1 && stats.consistency < 50) {
    return {
      title: 'ATTENTION NEEDED',
      message: `${declining[0].label} dropped ${declining[0].change}% while training consistency is only ${stats.consistency}%. Inconsistent training compounds performance loss.`,
      positive: false,
    };
  }

  // ── Priority 4: Overtraining warning (high streak, low fuel) ──
  if (stats.currentStreak >= 6 && fuel.status !== 'excellent' && fuel.total > 0) {
    return {
      title: 'RECOVERY CHECK',
      message: `${stats.currentStreak}-day training streak with ${fuel.compliance}% meal compliance. Schedule a deload day and prioritize nutrition to consolidate your gains.`,
      positive: false,
    };
  }

  // ── Priority 5: Excellent momentum — multiple improving benchmarks ──
  if (improving.length >= 3 && fuel.status !== 'low') {
    const best = improving.reduce((a, b) => (parseFloat(a.change) > parseFloat(b.change) ? a : b));
    return {
      title: 'PEAK PERFORMANCE',
      message: `${improving.length} benchmarks trending up. ${best.label} leads with +${best.change}% improvement over ${best.entries} entries. ${stats.currentStreak > 0 ? `${stats.currentStreak}-day streak active.` : ''} Keep executing.`,
      positive: true,
    };
  }

  // ── Priority 6: Good progress with specific callout ──
  if (improving.length >= 1) {
    const impNames = improving.map(i => i.label).join(', ');
    const decNote = declining.length > 0
      ? ` Watch ${declining[0].label} — it dropped ${declining[0].change}%.`
      : '';
    const fuelNote = fuel.status === 'excellent' ? ' Fuel compliance is on point.' :
                     fuel.status === 'good' ? '' :
                     fuel.total > 0 ? ` Bump meal tracking to ${fuel.compliance + 20}%+ for faster results.` : '';
    return {
      title: 'POSITIVE TREND',
      message: `${impNames} ${improving.length > 1 ? 'are' : 'is'} improving. ${stats.consistency}% training consistency this period.${decNote}${fuelNote}`,
      positive: true,
    };
  }

  // ── Priority 7: Strong streak ──
  if (stats.currentStreak >= 5) {
    return {
      title: 'MOMENTUM BUILDING',
      message: `${stats.currentStreak}-day streak and ${stats.consistency}% consistency. Benchmarks are holding steady — progressive overload is key to breaking through plateaus.`,
      positive: true,
    };
  }

  // ── Priority 8: Low consistency warning ──
  if (stats.consistency < 30) {
    return {
      title: 'SYSTEM WARNING',
      message: `Training consistency at ${stats.consistency}% — well below the 60% threshold for measurable progress. Focus on showing up before increasing intensity.`,
      positive: false,
    };
  }

  // ── Default ──
  return {
    title: 'SYSTEMS NOMINAL',
    message: `${stats.totalSessions} sessions logged. ${stats.consistency}% consistency. Continue executing the protocol and track your benchmarks to surface trends.`,
    positive: true,
  };
}
