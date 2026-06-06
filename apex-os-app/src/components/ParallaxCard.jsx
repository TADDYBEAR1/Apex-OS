import React, { useRef, useState } from 'react';

export default function ParallaxCard({ children, className = '', style, onClick }) {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (-5 to 5 degrees)
    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    
    // Calculate glare position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setRotation({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlare({ opacity: 0, x: 50, y: 50 });
  };

  const Component = onClick ? 'button' : 'div';

  return (
    <div style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
      <Component
        ref={cardRef}
        type={onClick ? 'button' : undefined}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`parallax-card ${onClick ? 'parallax-interactive' : ''} ${className}`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out',
          position: 'relative',
          overflow: 'hidden',
          ...style
        }}
      >
        <div 
          className="glare" 
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 80%)`,
            opacity: glare.opacity,
            pointerEvents: 'none',
            transition: 'opacity 0.3s ease',
            zIndex: 10,
            mixBlendMode: 'overlay'
          }} 
        />
        {/* Specular highlight border simulation */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 1px rgba(0,0,0,0.5)',
          pointerEvents: 'none',
          zIndex: 9
        }} />
        {children}
      </Component>
    </div>
  );
}
