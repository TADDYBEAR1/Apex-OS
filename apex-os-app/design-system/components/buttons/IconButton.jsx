import React from 'react';

/**
 * Round hairline icon button — close / add / delete affordance.
 * Tone drives the ring + glyph color (muted, cyan, orange).
 */
export function IconButton({ label, children, tone = 'muted', size = 32, style, ...props }) {
  const color = tone === 'danger' ? 'var(--orange)' : tone === 'primary' ? 'var(--cyan)' : 'var(--muted)';
  const borderColor = tone === 'danger'
    ? 'rgba(255,77,0,0.25)'
    : tone === 'primary'
      ? 'rgba(127,200,255,0.25)'
      : 'var(--surface-border)';

  return (
    <button
      type="button"
      aria-label={label}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = borderColor; }}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        border: `1px solid ${borderColor}`,
        background: 'transparent',
        color,
        fontSize: `${Math.round(size * 0.5)}px`,
        lineHeight: 1,
        cursor: 'pointer',
        display: 'inline-flex',
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

export default IconButton;
