import React from 'react';

export default function IconButton({ label, children, tone = 'muted', size = 32, style, ...props }) {
  const color = tone === 'danger' ? 'var(--orange)' : tone === 'primary' ? 'var(--cyan)' : 'var(--muted)';
  const borderColor = tone === 'danger' ? 'rgba(255,68,0,0.2)' : tone === 'primary' ? 'rgba(0,255,204,0.2)' : 'var(--surface-border)';

  return (
    <button
      type="button"
      aria-label={label}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        border: `1px solid ${borderColor}`,
        background: 'transparent',
        color,
        fontSize: '16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 0.2s ease',
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
