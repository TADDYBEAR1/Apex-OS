export function calculateStats(heatmapData) {
  // heatmapData is a 2D array, e.g., 6 weeks of 7 days
  // 0 = no workout, >0 = workout intensity/volume

  let totalSessions = 0;
  let currentStreak = 0;
  let maxStreak = 0;
  let activeDays = 0;
  let totalDays = 0;

  // Flatten the array to easily traverse backwards in time
  const flatData = heatmapData.flat();
  totalDays = flatData.length;

  for (let i = flatData.length - 1; i >= 0; i--) {
    const val = flatData[i];
    if (val > 0) {
      totalSessions += 1;
      activeDays += 1;
    }
  }

  // Calculate Streak (working backwards from most recent day)
  // Assuming the very last element in flatData is "today"
  for (let i = flatData.length - 1; i >= 0; i--) {
    if (flatData[i] > 0) {
      currentStreak += 1;
    } else {
      break; // Streak broken
    }
  }

  const consistency = totalDays > 0 ? Math.round((activeDays / totalDays) * 100) : 0;

  // Weekly progress (last 7 days)
  let weeklySessions = 0;
  const last7 = flatData.slice(-7);
  last7.forEach(val => {
    if (val > 0) weeklySessions += 1;
  });

  return {
    totalSessions,
    currentStreak,
    consistency,
    activeDays,
    totalDays,
    weeklySessions
  };
}

export function generateInsight(stats, benchmarks) {
  // Simple algorithm to generate an insight based on stats and benchmarks
  if (stats.consistency < 20) {
    return {
      title: 'SYSTEM WARNING',
      message: 'Training consistency is extremely low. Refocus on building the habit before increasing intensity.',
      positive: false
    };
  }

  const positiveBenchmarks = benchmarks.filter(b => b.positive);
  if (positiveBenchmarks.length >= 2) {
    return {
      title: 'SYSTEM INSIGHT',
      message: `Excellent progress. Multiple benchmarks (${positiveBenchmarks.map(b => b.label).join(', ')}) are showing positive trends.`,
      positive: true
    };
  }

  if (stats.currentStreak >= 5) {
    return {
      title: 'SYSTEM INSIGHT',
      message: `Strong momentum. You are on a ${stats.currentStreak}-day streak. Keep it up, but prioritize recovery today.`,
      positive: true
    };
  }

  return {
    title: 'SYSTEM STATUS',
    message: 'Systems nominal. Continue executing the protocol.',
    positive: true
  };
}
