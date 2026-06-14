import React, { useState } from 'react';

/**
 * Big-target numeric stepper for in-session logging — two round
 * ±buttons flanking a large cyan readout. Built for thumbs.
 */
export function Stepper({ value, onChange, min = 0, max = 999, step = 1, unit = '', label }) {
  const [pulse, setPulse] = useState(false);

  const bump = (dir) => {
    const next = value + dir * step;
    if (next < min || next > max) return;
    onChange(next);
    setPulse(true);
    setTimeout(() => setPulse(false), 200);
  };

  const btn = {
    width: '72px',
    height: '72px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '50%',
    color: 'var(--text)',
    fontSize: '28px',
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'transform 0.12s ease, opacity 0.2s ease',
    flexShrink: 0,
    userSelect: 'none',
  };

  return (
    <div>
      {label && (
        <div style={{ marginBottom: '10px' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px', color: 'var(--text)' }}>{label}</span>
        </div>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--surface)',
          border: '1px solid var(--surface-border)',
          borderRadius: 'var(--radius-lg)',
          backdropFilter: 'var(--blur)',
          WebkitBackdropFilter: 'var(--blur)',
          boxShadow: 'var(--shadow-inset)',
          padding: '8px',
        }}
      >
        <button
          style={{ ...btn, opacity: value <= min ? 0.3 : 1 }}
          onClick={() => bump(-1)}
          disabled={value <= min}
          aria-label={`Decrease ${label || 'value'}`}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.9)'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        >−</button>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', flex: 1 }}>
          <span
            style={{
              minWidth: '80px',
              textAlign: 'center',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '48px',
              color: 'var(--cyan)',
              lineHeight: 1,
              transition: 'transform 0.18s ease',
              transform: pulse ? 'scale(1.08)' : 'scale(1)',
            }}
          >{value}</span>
          {unit && <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '18px', color: 'var(--muted)', marginLeft: '4px' }}>{unit}</span>}
        </div>
        <button
          style={{ ...btn, opacity: value >= max ? 0.3 : 1 }}
          onClick={() => bump(1)}
          disabled={value >= max}
          aria-label={`Increase ${label || 'value'}`}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.9)'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        >+</button>
      </div>
    </div>
  );
}

export default Stepper;
