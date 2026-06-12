import React from 'react';

/**
 * Formerly a 3D-tilt parallax card. The tilt/glare effect was removed by
 * request — cards and buttons now stay perfectly stable on hover and press.
 * The component shell is kept so existing imports and styling keep working.
 */
export default function ParallaxCard({ children, className = '', style, onClick }) {
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`parallax-card ${onClick ? 'parallax-interactive' : ''} ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
