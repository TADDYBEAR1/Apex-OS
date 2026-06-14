import React from 'react';

/**
 * The Apex OS signature — a circular readiness gauge. An iridescent
 * ice-gradient arc over a faint track, with the score and a label
 * stacked in the center. This is the brand's hero data element.
 */
export function ReadinessRing({
  value = 88,
  score,
  label = 'Ready',
  size = 160,
  stroke = 12,
  stops = ['#CFEFFF', '#7FC8FF', '#9FB8FF'],
  id = 'rr',
}) {
  const r = (size - stroke) / 2 - 4;
  const circ = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value)) / 100;
  const gid = `${id}-grad`;

  return (
    <div style={{ position: 'relative', width: `${size}px`, height: `${size}px`, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={stops[0]} />
            <stop offset="0.5" stopColor={stops[1]} />
            <stop offset="1" stopColor={stops[2]} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ filter: `drop-shadow(0 0 8px ${stops[1]}99)`, transition: 'stroke-dashoffset 1s var(--ease-out-expo)' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: `${size * 0.29}px`, lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--text)' }}>
          {score != null ? score : value}
        </span>
        {label && (
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ice)', marginTop: '2px' }}>{label}</span>
        )}
      </div>
    </div>
  );
}

export default ReadinessRing;
