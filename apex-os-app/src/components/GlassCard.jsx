import React from 'react';
import ParallaxCard from './ParallaxCard';

export default function GlassCard({ children, className = '', onClick, style, glow }) {
  return (
    <ParallaxCard
      onClick={onClick}
      className={`glass ${onClick ? 'glass-interactive glass-button' : ''} ${glow ? 'glow-cyan' : ''} ${className}`}
      style={{ ...style }}
    >
      {children}
    </ParallaxCard>
  );
}
