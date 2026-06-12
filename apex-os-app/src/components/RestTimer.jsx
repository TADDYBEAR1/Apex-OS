import React, { useState, useEffect, useRef, useCallback } from 'react';

async function vibrate(style = 'MEDIUM') {
  try {
    const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
    await Haptics.impact({ style: ImpactStyle[style] || ImpactStyle.Medium });
  } catch {
    // Web fallback
    try { navigator.vibrate?.(style === 'HEAVY' ? 200 : 60); } catch { /* noop */ }
  }
}

export default function RestTimer({ duration = 90, onComplete, onSkip }) {
  // Timestamp-based countdown: survives screen-off / background throttling,
  // unlike a naive setInterval counter that freezes when the WebView sleeps.
  const [totalDuration, setTotalDuration] = useState(duration);
  const [remaining, setRemaining] = useState(duration);
  const endTimeRef = useRef(Date.now() + duration * 1000);
  const completedRef = useRef(false);

  const computeRemaining = useCallback(() => (
    Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000))
  ), []);

  useEffect(() => {
    endTimeRef.current = Date.now() + duration * 1000;
    completedRef.current = false;
    setTotalDuration(duration);
    setRemaining(duration);
  }, [duration]);

  useEffect(() => {
    const tick = () => {
      const next = computeRemaining();
      setRemaining(next);
      if (next === 3 || next === 2 || next === 1) vibrate('MEDIUM');
      if (next <= 0 && !completedRef.current) {
        completedRef.current = true;
        vibrate('HEAVY');
        setTimeout(() => onComplete?.(), 300);
      }
    };

    const intervalId = setInterval(tick, 250);
    // Re-sync immediately when returning from background / screen-off.
    const onVisible = () => { if (!document.hidden) tick(); };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [computeRemaining, onComplete]);

  const adjust = (seconds) => {
    if (completedRef.current) return;
    endTimeRef.current = Math.max(Date.now() + 1000, endTimeRef.current + seconds * 1000);
    setTotalDuration(prev => Math.max(1, prev + seconds));
    setRemaining(computeRemaining());
  };

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const progress = totalDuration > 0 ? ((totalDuration - remaining) / totalDuration) * 100 : 100;

  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const adjustButtonStyle = {
    padding: '12px 18px',
    background: 'var(--surface)',
    border: '1px solid var(--surface-border)',
    borderRadius: 'var(--radius-pill)',
    color: 'var(--text-secondary)',
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: '14px',
    letterSpacing: '0.05em',
    cursor: 'pointer',
  };

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
      gap: '32px',
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
            style={{ transition: 'stroke-dashoffset 0.25s linear', filter: 'drop-shadow(0 0 8px rgba(0,255,204,0.4))' }}
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

      {/* +/- 15s Adjust */}
      <div style={{ display: 'flex', gap: '14px' }}>
        <button onClick={() => adjust(-15)} style={adjustButtonStyle} aria-label="Shorten rest by 15 seconds">−15s</button>
        <button onClick={() => adjust(15)} style={adjustButtonStyle} aria-label="Extend rest by 15 seconds">+15s</button>
      </div>

      {/* Skip Button */}
      <button
        onClick={() => onSkip?.()}
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
