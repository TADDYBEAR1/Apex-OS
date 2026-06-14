import React from 'react';

/**
 * The Apex OS container primitive — a near-invisible glass panel
 * with a hairline border that warms toward cyan on hover when
 * interactive. Everything on a screen sits in one of these.
 */
export function GlassCard({ children, onClick, glow = false, padding = 24, style, ...props }) {
  const interactive = typeof onClick === 'function';
  return (
    <div
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={`glass ${interactive ? 'glass-interactive' : ''} ${glow ? 'glow-cyan' : ''}`}
      style={{
        padding: typeof padding === 'number' ? `${padding}px` : padding,
        textAlign: 'left',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default GlassCard;
