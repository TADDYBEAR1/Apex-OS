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
      if (heatmapData[day]?.[week] > 0) {
        currentStreak++;
      } else {
        streakBroken = true;
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

export function getHeatmapDayIndex(date) {
  const jsDay = date.getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

export function buildHeatmapFromWorkoutHistory(history = [], weeks = 4, referenceDate = new Date()) {
  const cells = Array.from({ length: 7 }, () => Array(weeks).fill(0));
  const ref = new Date(referenceDate);
  ref.setHours(0, 0, 0, 0);

  const latestDayIndex = getHeatmapDayIndex(ref);
  const currentWeekStart = new Date(ref);
  currentWeekStart.setDate(ref.getDate() - latestDayIndex);

  history.forEach((session) => {
    const rawDate = session.completedAt || session.date;
    if (!rawDate) return;

    const completedDate = new Date(rawDate);
    if (Number.isNaN(completedDate.getTime())) return;
    completedDate.setHours(0, 0, 0, 0);

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

// ─── Benchmark Trend Analysis ────────────────────────────────
export function formatBenchmarkValue(value, unit) {
  if (unit === 'TIME') {
    const mins = Math.floor(value / 60);
    const secs = value % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  return value;
}

export function computeBenchmarkTrend(history, unit) {
  if (!history || history.length < 2) {
    return {
      text: 'New Benchmark',
      positive: true,
      status: 'new',
      percentChange: 0,
      recentDelta: 0,
    };
  }

  const first = history[0].value;
  const last = history[history.length - 1].value;
  const prev = history[history.length - 2].value;
  const recentDelta = last - prev;
  const isTimeBenchmark = unit === 'TIME';
  const percentChange = first !== 0 ? ((last - first) / Math.abs(first)) * 100 : 0;

  let status;
  if (isTimeBenchmark) {
    status = percentChange < -1 ? 'improving' : percentChange > 1 ? 'declining' : 'stagnant';
  } else {
    status = percentChange > 1 ? 'improving' : percentChange < -1 ? 'declining' : 'stagnant';
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
      recentDelta,
    };
  }

  const suffix = unit === 'REPS' ? ' reps' : ` ${unit.toLowerCase()}`;
  if (recentDelta > 0) {
    return { text: `↑ +${recentDelta}${suffix}`, positive: true, status, percentChange, recentDelta };
  }
  if (recentDelta < 0) {
    return { text: `↓ ${recentDelta}${suffix}`, positive: false, status, percentChange, recentDelta };
  }
  return { text: 'No change', positive: true, status, percentChange, recentDelta };
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
      change: Math.abs(trend.percentChange).toFixed(1),
      recentDelta: trend.recentDelta,
      status: trend.status,
      unit: b.unit,
      entries: history.length,
    });
  }

  return trends;
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
