import React, { useState, useEffect, useRef } from 'react';

export default function RestTimer({ duration = 90, onComplete, onSkip }) {
  const [remaining, setRemaining] = useState(duration);
  const intervalRef = useRef(null);

  useEffect(() => {
    setRemaining(duration);
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setTimeout(() => onComplete?.(), 300);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [duration]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const progress = ((duration - remaining) / duration) * 100;

  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.92)',
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      zIndex: 200,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '40px',
      animation: 'fadeIn 0.3s ease-out',
    }}>
      {/* Label */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '13px',
        fontWeight: 600,
        letterSpacing: '0.15em',
        color: 'var(--muted)',
        textTransform: 'uppercase',
      }}>
        Rest Period
      </div>

      {/* Circular Timer */}
      <div style={{ position: 'relative', width: '240px', height: '240px' }}>
        <svg width="240" height="240" viewBox="0 0 240 240" style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle cx="120" cy="120" r={radius} stroke="rgba(255,255,255,0.06)" strokeWidth="6" fill="none" />
          {/* Progress */}
          <circle
            cx="120" cy="120" r={radius}
            stroke="url(#timerGradient)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 1s linear', filter: 'drop-shadow(0 0 8px rgba(0,255,204,0.4))' }}
          />
          <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00FFCC" />
              <stop offset="100%" stopColor="#00DDAA" />
            </linearGradient>
          </defs>
        </svg>
        {/* Time Display */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '64px',
            fontWeight: 700,
            color: 'var(--text)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}>
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={() => {
          clearInterval(intervalRef.current);
          onSkip?.();
        }}
        style={{
          padding: '14px 40px',
          background: 'var(--surface)',
          border: '1px solid var(--surface-border)',
          borderRadius: 'var(--radius-pill)',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: '13px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(0,255,204,0.2)';
          e.currentTarget.style.color = 'var(--cyan)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--surface-border)';
          e.currentTarget.style.color = 'var(--text-secondary)';
        }}
      >
        Skip Rest →
      </button>
    </div>
  );
}
