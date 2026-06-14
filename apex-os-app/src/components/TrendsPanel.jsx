import React, { useMemo, useState } from 'react';
import GlassCard from './GlassCard';
import TrendChart from './TrendChart';
import { getLocalDateKey } from '../utils/storage';

function lastNDaysKey(n, now = new Date()) {
  const d = new Date(now);
  d.setDate(d.getDate() - n);
  return getLocalDateKey(d);
}

/**
 * The armor dashboard: knee/back VAS trend, readiness trend, and body weight
 * against the 0.2–0.3kg/week lean-gain corridor. All from data the app
 * already collects — this panel just makes it visible.
 */
export default function TrendsPanel({ checkins = {}, workoutHistory = [], weightLog = [] }) {
  const [range, setRange] = useState(28);
  const fromKey = lastNDaysKey(range);

  const { kneePoints, backPoints, readinessPoints } = useMemo(() => {
    const knee = [];
    const back = [];
    const readiness = [];

    // Morning check-ins
    Object.entries(checkins).forEach(([date, c]) => {
      if (date < fromKey) return;
      if (typeof c.kneeVas === 'number') knee.push({ x: date, y: c.kneeVas });
      if (typeof c.backVas === 'number') back.push({ x: date, y: c.backVas });
      if (typeof c.score === 'number') readiness.push({ x: date, y: c.score });
    });

    // Post-workout VAS — averaged into the same day if both exist
    workoutHistory.forEach(s => {
      if (!s.vas || s.date < fromKey) return;
      if (typeof s.vas.knee === 'number' && !knee.some(p => p.x === s.date)) knee.push({ x: s.date, y: s.vas.knee });
      if (typeof s.vas.back === 'number' && !back.some(p => p.x === s.date)) back.push({ x: s.date, y: s.vas.back });
    });

    const byDate = (a, b) => (a.x < b.x ? -1 : 1);
    return {
      kneePoints: knee.sort(byDate),
      backPoints: back.sort(byDate),
      readinessPoints: readiness.sort(byDate),
    };
  }, [checkins, workoutHistory, fromKey]);

  const { weightPoints, weightBand } = useMemo(() => {
    const points = weightLog
      .filter(w => typeof w.kg === 'number')
      .map(w => ({ x: w.date, y: Math.round(w.kg * 10) / 10 }))
      .sort((a, b) => (a.x < b.x ? -1 : 1));

    let band = null;
    if (points.length >= 2) {
      // Lean-gain corridor: +0.2 to +0.3 kg per week from the first logged point
      const start = points[0];
      const startT = new Date(`${start.x}T12:00:00`).getTime();
      const mk = (ratePerWeek) => points.map(p => {
        const weeks = (new Date(`${p.x}T12:00:00`).getTime() - startT) / (7 * 86400000);
        return { x: p.x, y: Math.round((start.y + ratePerWeek * weeks) * 10) / 10 };
      });
      band = { from: mk(0.2), to: mk(0.3) };
    }
    return { weightPoints: points, weightBand: band };
  }, [weightLog]);

  const charts = [
    { title: 'KNEE · VAS', points: kneePoints, color: '#4FC3F7', yMin: 0, yMax: 10, unit: '/10', empty: 'Log morning check-ins to see knee trend' },
    { title: 'LOWER BACK · VAS', points: backPoints, color: '#FFD54F', yMin: 0, yMax: 10, unit: '/10', empty: 'Log morning check-ins to see back trend' },
    { title: 'READINESS', points: readinessPoints, color: 'var(--cyan)', yMin: 0, yMax: 100, unit: '', empty: 'Morning check-ins build this chart' },
    { title: 'BODY WEIGHT · target +0.2–0.3kg/wk', points: weightPoints, color: '#7FC8FF', unit: 'kg', band: weightBand, empty: 'Log weight in Profile to track the armor build' },
  ];

  return (
    <div style={{ marginBottom: '36px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="label-sm">TRENDS</span>
        <div style={{ display: 'flex', gap: '14px' }}>
          {[14, 28, 90].map(r => (
            <button key={r} onClick={() => setRange(r)} style={{
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              color: range === r ? 'var(--cyan)' : 'var(--muted)',
              fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', letterSpacing: '0.1em',
            }}>{r}d</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {charts.map(chart => (
          <GlassCard key={chart.title} style={{ padding: '14px 16px' }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px',
              letterSpacing: '0.1em', color: 'var(--muted)', display: 'block', marginBottom: '10px',
            }}>{chart.title}</span>
            <TrendChart
              points={chart.points}
              color={chart.color}
              yMin={chart.yMin}
              yMax={chart.yMax}
              unit={chart.unit}
              band={chart.band || null}
              emptyText={chart.empty}
            />
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
