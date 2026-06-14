import React from 'react';

/**
 * Lightweight SVG line chart for the Trends panel.
 * points: [{ x: 'YYYY-MM-DD', y: number }] (sorted ascending by x)
 * band:   optional { from: [{x,y}], to: [{x,y}] } target corridor (e.g. weight goal)
 */
export default function TrendChart({
  points = [],
  color = 'var(--cyan)',
  height = 120,
  unit = '',
  yMin: yMinProp,
  yMax: yMaxProp,
  band = null,
  emptyText = 'No data yet',
}) {
  const width = 320;
  const pad = { top: 12, right: 8, bottom: 20, left: 30 };

  if (points.length < 2) {
    return (
      <div style={{
        height: `${height}px`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--muted)', fontSize: '12px', border: '1px dashed var(--surface-border)',
        borderRadius: 'var(--radius-md)',
      }}>
        {emptyText}
      </div>
    );
  }

  const ys = points.map(p => p.y);
  const bandYs = band ? [...band.from.map(p => p.y), ...band.to.map(p => p.y)] : [];
  const yMin = yMinProp ?? Math.min(...ys, ...(bandYs.length ? bandYs : ys)) - 1;
  const yMax = yMaxProp ?? Math.max(...ys, ...(bandYs.length ? bandYs : ys)) + 1;
  const ySpan = Math.max(0.0001, yMax - yMin);

  const xs = points.map(p => p.x);
  const xMin = xs[0];
  const xMax = xs[xs.length - 1];
  const toTime = (key) => new Date(`${key}T12:00:00`).getTime();
  const tMin = toTime(xMin);
  const tMax = Math.max(toTime(xMax), tMin + 1);

  const px = (key) => pad.left + ((toTime(key) - tMin) / (tMax - tMin)) * (width - pad.left - pad.right);
  const py = (y) => pad.top + (1 - (y - yMin) / ySpan) * (height - pad.top - pad.bottom);

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${px(p.x).toFixed(1)},${py(p.y).toFixed(1)}`).join(' ');

  let bandPath = null;
  if (band && band.from.length >= 2) {
    const fwd = band.from.map((p, i) => `${i === 0 ? 'M' : 'L'}${px(p.x).toFixed(1)},${py(p.y).toFixed(1)}`).join(' ');
    const back = [...band.to].reverse().map(p => `L${px(p.x).toFixed(1)},${py(p.y).toFixed(1)}`).join(' ');
    bandPath = `${fwd} ${back} Z`;
  }

  const last = points[points.length - 1];
  const gridYs = [yMin + ySpan * 0.25, yMin + ySpan * 0.5, yMin + ySpan * 0.75];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }} role="img">
      {gridYs.map((gy, i) => (
        <g key={i}>
          <line x1={pad.left} x2={width - pad.right} y1={py(gy)} y2={py(gy)} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <text x={pad.left - 4} y={py(gy) + 3} textAnchor="end" fontSize="8" fill="var(--muted)">{Math.round(gy * 10) / 10}</text>
        </g>
      ))}
      {bandPath && <path d={bandPath} fill="rgba(127, 200, 255,0.07)" stroke="rgba(127, 200, 255,0.2)" strokeWidth="0.5" strokeDasharray="3 3" />}
      <path d={linePath} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 4px rgba(127, 200, 255,0.35))' }} />
      {points.map((p, i) => (
        <circle key={i} cx={px(p.x)} cy={py(p.y)} r={i === points.length - 1 ? 3.5 : 2} fill={i === points.length - 1 ? color : 'rgba(255,255,255,0.5)'} />
      ))}
      <text x={Math.min(px(last.x), width - pad.right - 4)} y={Math.max(py(last.y) - 8, 9)} textAnchor="end" fontSize="9" fontWeight="700" fill={color}>
        {last.y}{unit}
      </text>
      <text x={pad.left} y={height - 6} fontSize="8" fill="var(--muted)">{xMin}</text>
      <text x={width - pad.right} y={height - 6} textAnchor="end" fontSize="8" fill="var(--muted)">{xMax}</text>
    </svg>
  );
}
