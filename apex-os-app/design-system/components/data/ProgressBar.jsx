import React from 'react';

/**
 * Campaign progress bar — a hairline track with a liquid cyan→violet
 * fill and a glowing leading dot. Used for the mission timeline and
 * any 0–100% completion readout.
 */
export function ProgressBar({ value = 0, height = 6, showDot = true, style }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      style={{
        width: '100%',
        height: `${height}px`,
        borderRadius: 'var(--radius-pill)',
        background: 'rgba(255,255,255,0.06)',
        overflow: showDot ? 'visible' : 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: `${pct}%`,
          borderRadius: 'var(--radius-pill)',
          background: 'linear-gradient(90deg, rgba(127,200,255,0.4), var(--cyan))',
          boxShadow: '0 0 12px rgba(127,200,255,0.5)',
          transition: 'width 1s var(--ease-out-expo)',
        }}
      >
        {showDot && (
          <span
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translate(50%, -50%)',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#fff',
              boxShadow: '0 0 10px #fff, 0 0 20px var(--cyan)',
            }}
          />
        )}
      </div>
    </div>
  );
}

export default ProgressBar;
