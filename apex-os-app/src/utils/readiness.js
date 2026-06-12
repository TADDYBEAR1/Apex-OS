/**
 * Daily readiness engine — turns the morning check-in into the program's
 * traffic light (🟢 0-2 · 🟡 3-4 · 🔴 5+) plus a 0-100 readiness score
 * that gates the day's mission.
 */
export const READINESS_LIGHTS = {
  green:  { icon: '🟢', color: '#00FFCC', title: 'GREEN — ALL SYSTEMS GO' },
  yellow: { icon: '🟡', color: '#FFD54F', title: 'YELLOW — CONTROLLED LOAD' },
  red:    { icon: '🔴', color: '#FF5C5C', title: 'RED — RECOVERY PROTOCOL' },
};

export function computeReadiness({ sleepHours = 7, kneeVas = 0, backVas = 0, energy = 3 } = {}) {
  const maxVas = Math.max(kneeVas, backVas);

  let light = 'green';
  if (maxVas >= 5) light = 'red';
  else if (maxVas >= 3 || sleepHours < 6) light = 'yellow';

  // Score: sleep 40% · pain 40% · energy 20%
  const sleepScore = Math.min(sleepHours / 8, 1) * 40;
  const painScore = (1 - maxVas / 10) * 40;
  const energyScore = (energy / 5) * 20;
  const score = Math.round(sleepScore + painScore + energyScore);

  const recommendation =
    light === 'red'
      ? 'Pain gate triggered. No impact, no heavy loading today — recovery work only. Reassess tomorrow morning.'
      : light === 'yellow'
        ? 'Proceed with caution: keep planned volume, cut intensity on the sensitive area, zero new exercises. Pain must not climb during the session.'
        : 'Full clearance. Execute today\'s mission exactly as planned.';

  return { light, score, recommendation, maxVas };
}
