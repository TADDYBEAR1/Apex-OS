import React from 'react';

export default function GlassCard({ children, className = '', onClick, style, glow }) {
  return (
    <div
      className={`glass ${onClick ? 'glass-interactive' : ''} ${glow ? 'glow-cyan' : ''} ${className}`}
      onClick={onClick}
      style={{ padding: '16px', ...style }}
    >
      {children}
    </div>
  );
}
