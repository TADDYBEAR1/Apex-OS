import { getLocalDateKey } from './storage';

/**
 * The campaign timeline — the road to Yom Sayarot, taken from the
 * training program (תוכנית בלוק בנייה v2.3). Dates are local calendar days.
 */
export const DEFAULT_MISSION = {
  label: 'YOM SAYAROT',
  targetDate: '2026-10-01',
  phases: [
    { id: 'bridge',     name: 'Bagrut Bridge',      start: '2026-06-11', end: '2026-06-15' },
    { id: 'transition', name: 'Transition Days',    start: '2026-06-16', end: '2026-06-20' },
    { id: 'block1',     name: 'Block 1 · Build',    start: '2026-06-21', end: '2026-07-18' },
    { id: 'block2',     name: 'Block 2 · Impact',   start: '2026-07-19', end: '2026-08-15' },
    { id: 'block3',     name: 'Block 3 · Convert',  start: '2026-08-16', end: '2026-09-16' },
    { id: 'taper',      name: 'Taper',              start: '2026-09-17', end: '2026-09-30' },
  ],
};

function daysBetween(fromKey, toKey) {
  const [fy, fm, fd] = fromKey.split('-').map(Number);
  const [ty, tm, td] = toKey.split('-').map(Number);
  const from = new Date(fy, fm - 1, fd);
  const to = new Date(ty, tm - 1, td);
  return Math.round((to - from) / 86400000);
}

/**
 * Computes where we are on the campaign: days remaining, current phase,
 * week within the phase, and overall campaign progress (0-100).
 */
export function getMissionStatus(mission = DEFAULT_MISSION, date = new Date()) {
  const todayKey = getLocalDateKey(date);
  const daysToTarget = Math.max(0, daysBetween(todayKey, mission.targetDate));

  const phases = mission.phases || [];
  let phase = null;
  let phaseIndex = -1;

  phases.forEach((p, i) => {
    if (todayKey >= p.start && todayKey <= p.end) { phase = p; phaseIndex = i; }
  });

  // Before the campaign starts / between gaps → next upcoming phase
  if (!phase) {
    const upcoming = phases.find(p => todayKey < p.start);
    if (upcoming) {
      phase = upcoming;
      phaseIndex = phases.indexOf(upcoming);
    }
  }

  let weekInPhase = null;
  let phaseTotalWeeks = null;
  if (phase && todayKey >= phase.start) {
    const dayInPhase = daysBetween(phase.start, todayKey);
    weekInPhase = Math.floor(dayInPhase / 7) + 1;
    phaseTotalWeeks = Math.max(1, Math.ceil((daysBetween(phase.start, phase.end) + 1) / 7));
  }

  const campaignStart = phases[0]?.start || todayKey;
  const totalDays = Math.max(1, daysBetween(campaignStart, mission.targetDate));
  const elapsedDays = Math.min(totalDays, Math.max(0, daysBetween(campaignStart, todayKey)));
  const progressPct = Math.round((elapsedDays / totalDays) * 100);

  return {
    todayKey,
    daysToTarget,
    targetLabel: mission.label,
    phase,
    phaseIndex,
    phaseCount: phases.length,
    weekInPhase,
    phaseTotalWeeks,
    progressPct,
    isMissionDay: daysToTarget === 0,
  };
}
