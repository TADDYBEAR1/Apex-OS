import React, { useState } from 'react';
import SwipeToComplete from './SwipeToComplete';
import RestTimer from './RestTimer';

export default function FocusMode({ exercises, onExit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [showRest, setShowRest] = useState(false);

  const exercise = exercises[currentIndex];
  if (!exercise) return null;

  const totalCount = exercises.length;
  const completedCount = completed.length;

  const getSection = () => {
    // Determine section from index position
    if (currentIndex < 2) return 'Warm-up';
    if (currentIndex >= totalCount - 1) return 'Cooldown';
    return 'Main Workout';
  };

  const handleComplete = () => {
    setCompleted([...completed, exercise.id]);
    if (exercise.rest > 0 && currentIndex < totalCount - 1) {
      setShowRest(true);
    } else {
      advanceNext();
    }
  };

  const advanceNext = () => {
    if (currentIndex < totalCount - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onExit();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSkip = () => advanceNext();

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 90,
      display: 'flex', flexDirection: 'column', maxWidth: '430px', margin: '0 auto',
      animation: 'fadeIn 0.3s ease-out', overflow: 'auto',
    }}>
      {/* Top Bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 20px', flexShrink: 0,
      }}>
        <button onClick={handlePrevious} style={{
          background: 'none', border: 'none', color: currentIndex > 0 ? 'var(--text-secondary)' : 'transparent',
          fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px',
          letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}>← Previous</button>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleSkip} style={{
            background: 'none', border: 'none', color: 'var(--muted)',
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px',
            letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
          }}>Skip</button>
          <button onClick={onExit} style={{
            background: 'none', border: 'none', color: 'var(--text-secondary)',
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px',
            letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
          }}>Finish</button>
        </div>
      </div>

      {/* Focus Mode Label + Exercise Name */}
      <div style={{ padding: '0 20px', flexShrink: 0 }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px',
          letterSpacing: '0.15em', color: 'var(--cyan)', textTransform: 'uppercase',
        }}>FOCUS MODE</span>
        <h1 style={{
          fontSize: '28px', fontWeight: 700, marginTop: '4px', marginBottom: '6px',
          lineHeight: 1.1,
        }}>{exercise.name}</h1>
        <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
          {completedCount}/{totalCount} complete · {getSection()}
        </span>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
        {/* Exercise Image */}
        <div style={{
          width: '100%', height: '200px', borderRadius: 'var(--radius-lg)',
          background: exercise.image ? `url(${exercise.image}) center/cover` : 'linear-gradient(135deg, rgba(0,255,204,0.08), rgba(0,255,204,0.02))',
          border: '1px solid var(--surface-border)', marginBottom: '24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          {!exercise.image && (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" opacity="0.3">
              <path d="M6.5 6.5V17.5M17.5 6.5V17.5M4 9H8M16 9H20M8 9V15H16V9H8M4 15H8M16 15H20"
                stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </div>

        {/* Details Cards */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--surface-border)',
          borderRadius: 'var(--radius-lg)', padding: '0', marginBottom: '16px',
          overflow: 'hidden',
        }}>
          {[
            { label: 'Prescription', value: `${exercise.sets} × ${exercise.reps} reps` },
            { label: 'Load', value: exercise.isBodyweight ? 'Bodyweight' : `${exercise.weight} kg` },
            { label: 'Rest', value: `${exercise.rest}s` },
          ].map((item, i, arr) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 20px',
              borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}>
              <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{item.label}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px' }}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* Coaching Note */}
        {exercise.note && (
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--surface-border)',
            borderRadius: 'var(--radius-lg)', padding: '16px 20px', marginBottom: '16px',
            borderLeft: '3px solid var(--cyan)',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px',
              letterSpacing: '0.1em', color: 'var(--cyan)', textTransform: 'uppercase',
              display: 'block', marginBottom: '6px',
            }}>COACHING NOTE</span>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{exercise.note}</p>
          </div>
        )}

        {/* Rest Timer Info */}
        {exercise.rest > 0 && (
          <div style={{
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
            borderRadius: 'var(--radius-md)', padding: '12px 16px',
            display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px',
          }}>
            <span style={{ fontSize: '16px' }}>⏱️</span>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Rest timer will begin after you finish this exercise
            </span>
          </div>
        )}
      </div>

      {/* Swipe to Complete */}
      <div style={{ padding: '16px 20px 32px', flexShrink: 0 }}>
        <SwipeToComplete onComplete={handleComplete} />
        <button onClick={onExit} style={{
          display: 'block', margin: '12px auto 0', background: 'none', border: 'none',
          color: 'var(--muted)', fontSize: '13px', fontFamily: 'var(--font-display)',
          fontWeight: 500, cursor: 'pointer', letterSpacing: '0.04em',
        }}>⊞ Exit Focus Mode</button>
      </div>

      {/* Rest Timer Overlay */}
      {showRest && (
        <RestTimer
          duration={exercise.rest}
          onComplete={() => { setShowRest(false); advanceNext(); }}
          onSkip={() => { setShowRest(false); advanceNext(); }}
        />
      )}
    </div>
  );
}
