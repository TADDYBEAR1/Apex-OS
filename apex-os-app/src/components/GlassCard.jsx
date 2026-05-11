import React from 'react';

export default function GlassCard({ children, className = '', onClick, style, glow }) {
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      type={onClick ? 'button' : undefined}
      className={`glass ${onClick ? 'glass-interactive glass-button' : ''} ${glow ? 'glow-cyan' : ''} ${className}`}
      onClick={onClick}
      style={{ padding: '16px', ...style }}
    >
      {children}
    </Component>
  );
}
