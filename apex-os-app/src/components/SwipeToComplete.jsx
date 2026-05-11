import React, { useRef, useState, useCallback } from 'react';

export default function SwipeToComplete({ onComplete, label = 'SWIPE TO COMPLETE' }) {
  const trackRef = useRef(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const THUMB_SIZE = 64;
  const THRESHOLD = 0.82;

  const getTrackWidth = () => {
    if (trackRef.current) return trackRef.current.offsetWidth;
    return 360;
  };

  const handleStart = useCallback((clientX) => {
    if (isCompleted) return;
    setIsDragging(true);
  }, [isCompleted]);

  const handleMove = useCallback((clientX) => {
    if (!isDragging || isCompleted) return;
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const maxX = rect.width - THUMB_SIZE - 8;
    const x = Math.max(0, Math.min(clientX - rect.left - THUMB_SIZE / 2, maxX));
    setDragX(x);
  }, [isDragging, isCompleted]);

  const handleEnd = useCallback(() => {
    if (!isDragging || isCompleted) return;
    setIsDragging(false);
    const maxX = getTrackWidth() - THUMB_SIZE - 8;
    if (dragX / maxX >= THRESHOLD) {
      setIsCompleted(true);
      setDragX(maxX);
      setTimeout(() => {
        onComplete?.();
        setTimeout(() => {
          setIsCompleted(false);
          setDragX(0);
        }, 400);
      }, 500);
    } else {
      setDragX(0);
    }
  }, [isDragging, isCompleted, dragX, onComplete]);

  const handleTouchStart = (e) => handleStart(e.touches[0].clientX);
  const handleTouchMove = (e) => { e.preventDefault(); handleMove(e.touches[0].clientX); };
  const handleTouchEnd = () => handleEnd();

  const handleMouseDown = (e) => handleStart(e.clientX);
  const handleMouseMove = (e) => handleMove(e.clientX);
  const handleMouseUp = () => handleEnd();

  const maxX = getTrackWidth() - THUMB_SIZE - 8;
  const progress = maxX > 0 ? dragX / maxX : 0;

  return (
    <>
      <div
        ref={trackRef}
        role="presentation"
        aria-label={label}
        style={{
        position: 'relative',
        width: '100%',
        height: '72px',
        background: 'var(--surface)',
        border: '1px solid var(--surface-border)',
        borderRadius: 'var(--radius-pill)',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'none',
      }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
      {/* Fill */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: `${dragX + THUMB_SIZE + 4}px`,
        background: isCompleted
          ? 'linear-gradient(90deg, rgba(0,255,204,0.3), rgba(0,255,204,0.15))'
          : 'linear-gradient(90deg, rgba(0,255,204,0.12), rgba(0,255,204,0.04))',
        borderRadius: 'var(--radius-pill)',
        transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }} />

      {/* Label */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '13px',
        letterSpacing: '0.12em',
        color: isCompleted ? 'var(--cyan)' : `rgba(243,244,246,${0.5 - progress * 0.4})`,
        transition: 'color 0.3s ease',
        pointerEvents: 'none',
      }}>
        {isCompleted ? '✓ COMPLETED' : label}
      </div>

      {/* Thumb */}
        <div
          role="button"
          tabIndex={0}
          aria-label={label}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onComplete?.();
            }
          }}
          style={{
          position: 'absolute',
          left: `${4 + dragX}px`,
          top: '4px',
          width: `${THUMB_SIZE}px`,
          height: `${THUMB_SIZE}px`,
          borderRadius: '50%',
          background: isCompleted
            ? 'var(--cyan)'
            : 'linear-gradient(135deg, var(--cyan), #00DDAA)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isCompleted
            ? '0 0 30px rgba(0,255,204,0.6), 0 0 60px rgba(0,255,204,0.2)'
            : '0 0 20px rgba(0,255,204,0.35), 0 0 40px rgba(0,255,204,0.1)',
          transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 2,
        }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{
          opacity: isCompleted ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}>
          <path d="M9 6l6 6-6 6" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 6l6 6-6 6" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
        </svg>
        {isCompleted && (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onComplete?.()}
        className="btn-ghost"
        style={{ width: '100%', height: '44px', marginTop: '10px', fontSize: '12px' }}
      >
        Tap to Finish Set
      </button>
    </>
  );
}
