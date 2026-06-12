import { getLocalDateKey } from './storage';

function formatDuration(totalSeconds = 0) {
  const mins = Math.round(totalSeconds / 60);
  if (mins < 60) return `${mins} דק'`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h} ש' ${m} דק'` : `${h} ש'`;
}

function vasIcon(value) {
  if (value == null) return '';
  if (value <= 2) return '🟢';
  if (value <= 4) return '🟡';
  return '🔴';
}

function average(values) {
  if (!values.length) return null;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

/**
 * Builds the weekly feedback-loop report (last 7 days) as shareable text:
 * sessions done, volume, duration, PRs, and knee/back VAS with traffic light.
 */
export function buildWeeklyReport({ workoutHistory = [], profile = {}, checkins = {}, workoutPlan = null, referenceDate = new Date() } = {}) {
  const end = new Date(referenceDate);
  const start = new Date(end);
  start.setDate(start.getDate() - 6);

  const startKey = getLocalDateKey(start);
  const endKey = getLocalDateKey(end);

  const sessions = workoutHistory
    .filter(s => s.date >= startKey && s.date <= endKey)
    .sort((a, b) => (a.date < b.date ? -1 : 1));

  const totalSets = sessions.reduce((sum, s) => sum + (s.completedSets?.length || 0), 0);
  const totalDuration = sessions.reduce((sum, s) => sum + (s.durationSeconds || 0), 0);
  const prs = sessions.flatMap(s => s.detectedPrs || []);

  const kneeValues = sessions.map(s => s.vas?.knee).filter(v => typeof v === 'number');
  const backValues = sessions.map(s => s.vas?.back).filter(v => typeof v === 'number');
  const kneeAvg = average(kneeValues);
  const backAvg = average(backValues);

  const lines = [];
  lines.push(`📋 דוח שבועי — Apex OS`);
  if (profile.name) lines.push(`מתאמן: ${profile.name}`);
  lines.push(`טווח: ${startKey} → ${endKey}`);
  // Compliance: sessions done vs planned training days this week
  const plannedDays = Array.isArray(workoutPlan)
    ? workoutPlan.filter(d => d && d.name && d.name !== 'Rest Day').length
    : null;

  lines.push('');
  lines.push(plannedDays
    ? `🏋️ אימונים: ${sessions.length}/${plannedDays} מתוכננים (${Math.round((sessions.length / Math.max(1, plannedDays)) * 100)}% ביצוע)`
    : `🏋️ אימונים: ${sessions.length}`);
  sessions.forEach(s => {
    lines.push(`  • ${s.date} — ${s.planName} (${s.completedSets?.length || 0} סטים, ${formatDuration(s.durationSeconds)})`);
  });
  lines.push('');
  lines.push(`סה"כ סטים: ${totalSets} · זמן עבודה: ${formatDuration(totalDuration)}`);

  if (prs.length) {
    lines.push('');
    lines.push(`🏆 שיאים חדשים: ${prs.length}`);
    prs.forEach(pr => lines.push(`  • ${pr.label}: ${pr.value} ${pr.unit || ''}`.trimEnd()));
  }

  lines.push('');
  lines.push('🩺 רמזור כאב (VAS 0–10):');
  lines.push(kneeAvg == null
    ? '  • ברך: לא דווח'
    : `  • ברך: ממוצע ${kneeAvg.toFixed(1)} ${vasIcon(kneeAvg)} (${kneeValues.length} דיווחים)`);
  lines.push(backAvg == null
    ? '  • גב תחתון: לא דווח'
    : `  • גב תחתון: ממוצע ${backAvg.toFixed(1)} ${vasIcon(backAvg)} (${backValues.length} דיווחים)`);

  // Morning check-ins: sleep + readiness averages for the window
  const weekCheckins = Object.entries(checkins)
    .filter(([date]) => date >= startKey && date <= endKey)
    .map(([, c]) => c);
  const sleepValues = weekCheckins.map(c => c.sleepHours).filter(v => typeof v === 'number');
  const readinessValues = weekCheckins.map(c => c.score).filter(v => typeof v === 'number');
  lines.push('');
  lines.push(`☀️ צ'ק-אין בוקר: ${weekCheckins.length}/7 ימים`);
  if (sleepValues.length) {
    const sleepAvg = average(sleepValues);
    lines.push(`  • שינה ממוצעת: ${sleepAvg.toFixed(1)} ש' ${sleepAvg >= 7 ? '🟢' : sleepAvg >= 6 ? '🟡' : '🔴'}`);
  }
  if (readinessValues.length) {
    lines.push(`  • Readiness ממוצע: ${Math.round(average(readinessValues))}/100`);
  }

  if (profile.weight) {
    lines.push('');
    lines.push(`⚖️ משקל נוכחי: ${profile.weight}`);
  }

  return lines.join('\n');
}
