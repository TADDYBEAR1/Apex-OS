import React from 'react';

/**
 * Pill segmented control — toggles between 2–4 views. Active
 * segment fills with dim cyan and the label lights cyan.
 */
export function SegmentedControl({ options, value, onChange, style }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '4px',
        padding: '4px',
        background: 'var(--surface)',
        borderRadius: 'var(--radius-pill)',
        border: '1px solid var(--surface-border)',
        ...style,
      }}
    >
      {options.map((option) => {
        const active = value === option.key;
        return (
          <button
            key={option.key}
            type="button"
            onClick={() => onChange(option.key)}
            aria-pressed={active}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              background: active ? 'var(--cyan-dim)' : 'transparent',
              color: active ? 'var(--cyan)' : 'var(--muted)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '12px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedControl;
