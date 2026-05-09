import React, { useState } from 'react';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0px',
    background: 'var(--surface)',
    border: '1px solid var(--surface-border)',
    borderRadius: 'var(--radius-lg)',
    backdropFilter: 'var(--blur)',
    boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.04)',
    padding: '8px',
    position: 'relative',
    overflow: 'hidden',
  },
  button: {
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
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    flexShrink: 0,
    userSelect: 'none',
    WebkitUserSelect: 'none',
  },
  value: {
    minWidth: '80px',
    textAlign: 'center',
    fontFamily: 'var(--font-display)',
    fontWeight: '700',
    fontSize: '48px',
    color: 'var(--cyan)',
    lineHeight: 1,
    userSelect: 'none',
  },
  unit: {
    fontFamily: 'var(--font-display)',
    fontWeight: '500',
    fontSize: '18px',
    color: 'var(--muted)',
    marginLeft: '4px',
  },
};

export default function Stepper({ value, onChange, min = 0, max = 999, step = 1, unit = '', label }) {
  const [animClass, setAnimClass] = useState('');

  const handleDecrement = () => {
    if (value - step >= min) {
      onChange(value - step);
      triggerPulse();
    }
  };

  const handleIncrement = () => {
    if (value + step <= max) {
      onChange(value + step);
      triggerPulse();
    }
  };

  const triggerPulse = () => {
    setAnimClass('pulse-value');
    setTimeout(() => setAnimClass(''), 200);
  };

  return (
    <div>
      {label && (
        <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px', color: 'var(--text)' }}>{label}</span>
        </div>
      )}
      <div style={styles.container}>
        <button
          style={{
            ...styles.button,
            opacity: value <= min ? 0.3 : 1,
          }}
          onClick={handleDecrement}
          disabled={value <= min}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.9)'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          −
        </button>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', flex: 1 }}>
          <span
            style={{
              ...styles.value,
              animation: animClass ? 'countPulse 0.2s ease-out' : 'none',
            }}
          >
            {value}
          </span>
          {unit && <span style={styles.unit}>{unit}</span>}
        </div>
        <button
          style={{
            ...styles.button,
            opacity: value >= max ? 0.3 : 1,
          }}
          onClick={handleIncrement}
          disabled={value >= max}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.9)'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          +
        </button>
      </div>
    </div>
  );
}
