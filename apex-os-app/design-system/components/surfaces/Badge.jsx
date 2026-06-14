import React from 'react';

const TONES = {
  strength: { color: 'var(--orange)', bg: 'rgba(255,77,0,0.12)' },
  bodyweight: { color: 'var(--green)', bg: 'rgba(0,255,136,0.12)' },
  endurance: { color: 'var(--cyan)', bg: 'rgba(127,200,255,0.12)' },
  cyan: { color: 'var(--cyan)', bg: 'rgba(127,200,255,0.12)' },
  neutral: { color: 'var(--text-secondary)', bg: 'rgba(255,255,255,0.05)' },
};

/**
 * Small capsule label — exercise category, status, or tag.
 * Apex uses three semantic categories: strength (orange),
 * bodyweight (green), endurance (cyan).
 */
export function Badge({ children, tone = 'neutral', style, ...props }) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: 'var(--font-body)',
        fontSize: '10px',
        fontWeight: 500,
        letterSpacing: '0.04em',
        padding: '3px 9px',
        borderRadius: 'var(--radius-pill)',
        color: t.color,
        background: t.bg,
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
