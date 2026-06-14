import React from 'react';

const LIGHTS = {
  green: { color: 'var(--signal-go)', icon: '🟢', title: 'GO' },
  yellow: { color: 'var(--signal-caution)', icon: '🟡', title: 'CAUTION' },
  red: { color: 'var(--signal-stop)', icon: '🔴', title: 'HOLD' },
};

/**
 * Readiness traffic-light chip — the morning-gate verdict. Pairs a
 * score with a colored GO / CAUTION / HOLD state and a recommendation.
 */
export function ReadinessLight({ light = 'green', score, title, recommendation }) {
  const meta = LIGHTS[light] || LIGHTS.green;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '16px 18px',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${meta.color}40`,
      }}
    >
      <div style={{ textAlign: 'center', minWidth: '40px' }}>
        <span style={{ fontSize: '20px', display: 'block', lineHeight: 1.2 }}>{meta.icon}</span>
        {score != null && (
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: meta.color }}>{score}</span>
        )}
      </div>
      <div style={{ flex: 1 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', color: meta.color, display: 'block', textTransform: 'uppercase' }}>
          {title || meta.title}
        </span>
        {recommendation && (
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.45, display: 'block', marginTop: '2px' }}>{recommendation}</span>
        )}
      </div>
    </div>
  );
}

export default ReadinessLight;
