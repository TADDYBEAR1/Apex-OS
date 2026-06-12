import React, { useState, useEffect, useMemo } from 'react';
import SwipeToComplete from './SwipeToComplete';
import AppDialog from './AppDialog';
import RestTimer from './RestTimer';
import Stepper from './Stepper';
import { getProgressionHint } from '../utils/progression';

function formatElapsed(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function FocusMode({ exercises, onExit, startedAt, workoutHistory = [], todayCheckin = null, onApplyProgression }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [showRest, setShowRest] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(null);

  // Live session clock — timestamp-based, survives background throttling.
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (!startedAt) return undefined;
    const tick = () => setElapsed(Math.max(0, Math.floor((Date.now() - startedAt) / 1000)));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startedAt]);

  // Keep the screen awake for the whole workout (Web Wake Lock API — supported
  // by the Android WebView). Re-acquired when returning from background.
  useEffect(() => {
    let wakeLock = null;
    let released = false;

    const acquire = async () => {
      try {
        if (!released && navigator.wakeLock?.request) {
          wakeLock = await navigator.wakeLock.request('screen');
        }
      } catch {
        // Not supported / denied — workout continues without it.
      }
    };

    const onVisible = () => { if (!document.hidden) acquire(); };

    acquire();
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      released = true;
      document.removeEventListener('visibilitychange', onVisible);
      try { wakeLock?.release(); } catch { /* noop */ }
    };
  }, []);

  // Track actual performance for the current set
  const [actualReps, setActualReps] = useState(0);
  const [actualWeight, setActualWeight] = useState(0);
  const [completedSets, setCompletedSets] = useState([]);

  const exercise = exercises[currentIndex];

  // Double-progression coach: based on the last two logged sessions of this exercise.
  const progressionHint = useMemo(
    () => getProgressionHint(workoutHistory, exercise),
    [workoutHistory, exercise]
  );

  useEffect(() => {
    if (exercise) {
      setActualReps(exercise.reps);
      setActualWeight(exercise.isBodyweight ? 0 : exercise.weight);
    }
  }, [currentIndex, currentSet, exercise]);

  if (!exercise) return null;

  const totalCount = exercises.length;
  const totalSets = exercises.reduce((sum, item) => sum + (item.sets || 0), 0);

  const getSection = () => {
    if (!exercise.sectionLabel) return 'Main Workout';
    return exercise.sectionLabel
      .toLowerCase()
      .replace(/(^|\s|-)\S/g, char => char.toUpperCase());
  };

  const createSetLog = () => ({
    exerciseId: exercise.id,
    exerciseName: exercise.name,
    category: exercise.category || 'Other',
    isBodyweight: Boolean(exercise.isBodyweight),
    unit: exercise.isBodyweight ? 'REPS' : 'KG',
    section: exercise.section || 'main',
    setNumber: currentSet,
    targetReps: exercise.reps,
    targetWeight: exercise.isBodyweight ? 0 : exercise.weight,
    actualReps,
    actualWeight: exercise.isBodyweight ? 0 : actualWeight,
    completedAt: new Date().toISOString(),
  });

  const finishWorkout = (summary) => {
    const isEarlyExit = completedSets.length < totalSets;
    const doExit = () => onExit({ totalSets, completedSets, ...summary });

    if (isEarlyExit && completedSets.length > 0) {
      setConfirmDialog({
        title: 'Finish Early?',
        message: `${completedSets.length}/${totalSets} sets completed will be logged.`,
        confirmText: 'FINISH & LOG',
        cancelText: 'KEEP GOING',
        tone: 'warning',
        onConfirm: doExit,
      });
      return;
    }
    if (isEarlyExit && completedSets.length === 0) {
      setConfirmDialog({
        title: 'Exit Focus Mode?',
        message: 'Nothing has been logged yet.',
        confirmText: 'EXIT',
        cancelText: 'STAY',
        tone: 'danger',
        onConfirm: doExit,
      });
      return;
    }
    doExit();
  };

  const handleCompleteSet = () => {
    const nextCompletedSets = [...completedSets, createSetLog()];
    setCompletedSets(nextCompletedSets);

    if (currentSet < exercise.sets) {
      if (exercise.rest > 0) {
        setShowRest(true);
      } else {
        setCurrentSet(currentSet + 1);
      }
    } else {
      // Finished all sets for this exercise
      if (exercise.rest > 0 && currentIndex < totalCount - 1) {
        setShowRest(true);
      } else {
        advanceNextExercise(nextCompletedSets);
      }
    }
  };

  const advanceNextExercise = (nextCompletedSets = completedSets) => {
    if (currentIndex < totalCount - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentSet(1);
    } else {
      onExit({
        completed: true,
        totalSets,
        completedSets: nextCompletedSets,
      });
    }
  };

  const handlePrevious = () => {
    if (currentSet > 1) {
      setCurrentSet(currentSet - 1);
    } else if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentSet(exercises[currentIndex - 1].sets);
    }
  };

  const handleSkip = () => {
     if (currentSet < exercise.sets) {
       setCurrentSet(currentSet + 1);
     } else {
       advanceNextExercise();
     }
  };

  const dialogElement = confirmDialog ? (
    <AppDialog
      {...confirmDialog}
      onConfirm={() => { const fn = confirmDialog.onConfirm; setConfirmDialog(null); fn?.(); }}
      onCancel={() => setConfirmDialog(null)}
    />
  ) : null;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 90,
      display: 'flex', flexDirection: 'column', width: '100%',
      paddingTop: 'env(safe-area-inset-top, 24px)',
      paddingBottom: 'env(safe-area-inset-bottom, 24px)',
      paddingLeft: 'env(safe-area-inset-left, 0px)',
      paddingRight: 'env(safe-area-inset-right, 0px)',
      animation: 'fadeIn 0.3s ease-out', overflow: 'auto',
    }}>
      {dialogElement}
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
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px',
          letterSpacing: '0.08em', color: 'var(--cyan)',
          textShadow: '0 0 8px rgba(0,255,204,0.3)',
        }} aria-label="Session time">⏱ {formatElapsed(elapsed)}</span>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleSkip} style={{
            background: 'none', border: 'none', color: 'var(--muted)',
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px',
            letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
          }}>Skip</button>
          <button onClick={() => finishWorkout({ completed: false })} style={{
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
        <span style={{ fontSize: '13px', color: 'var(--cyan)' }}>
          Set {currentSet} of {exercise.sets}
        </span>
        <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
           {' '}· {getSection()} · {currentIndex + 1}/{totalCount} Exercises
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

        {/* Traffic-light gate — the morning check-in lives inside the session */}
        {todayCheckin && todayCheckin.light !== 'green' && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: todayCheckin.light === 'red' ? 'rgba(255,92,92,0.1)' : 'rgba(255,213,79,0.08)',
            border: `1px solid ${todayCheckin.light === 'red' ? 'rgba(255,92,92,0.4)' : 'rgba(255,213,79,0.35)'}`,
            borderRadius: 'var(--radius-md)', padding: '10px 14px', marginBottom: '16px',
          }}>
            <span style={{ fontSize: '16px' }}>{todayCheckin.light === 'red' ? '🔴' : '🟡'}</span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {todayCheckin.light === 'red'
                ? 'RED GATE — recovery work only. No impact, no heavy loading, pain stays ≤2/10.'
                : 'YELLOW — keep volume, cut intensity on sensitive areas. If pain climbs mid-set, stop the exercise.'}
            </span>
          </div>
        )}

        {/* Progression Coach */}
        {progressionHint && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: progressionHint.level === 'up' ? 'rgba(0,255,204,0.08)' : 'rgba(255,213,79,0.07)',
            border: `1px solid ${progressionHint.level === 'up' ? 'rgba(0,255,204,0.35)' : 'rgba(255,213,79,0.3)'}`,
            borderRadius: 'var(--radius-md)', padding: '12px 16px', marginBottom: '20px',
          }}>
            <span style={{ fontSize: '18px' }}>{progressionHint.level === 'up' ? '📈' : '🎯'}</span>
            <div>
              <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: progressionHint.level === 'up' ? 'var(--cyan)' : '#FFD54F',
                display: 'block', marginBottom: '2px',
              }}>PROGRESSION COACH</span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {progressionHint.message}
              </span>
            </div>
            {progressionHint.patch && onApplyProgression && (
              <button
                onClick={() => onApplyProgression(exercise, progressionHint.patch)}
                style={{
                  marginLeft: 'auto', flexShrink: 0, padding: '8px 14px',
                  background: 'var(--cyan)', color: '#000', border: 'none',
                  borderRadius: 'var(--radius-pill)', cursor: 'pointer',
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px',
                  letterSpacing: '0.08em',
                }}
              >
                APPLY
              </button>
            )}
          </div>
        )}

        {/* Set Data Entry (Steppers) */}
        <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Stepper
              label="Reps Performed"
              value={actualReps}
              onChange={setActualReps}
              min={0}
              max={100}
            />
            <Stepper
              label={exercise.isBodyweight ? "Added Weight" : "Weight Load"}
              value={actualWeight}
              onChange={setActualWeight}
              min={0}
              max={500}
              step={2.5}
              unit="kg"
            />
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
              Rest timer will begin after you finish this set
            </span>
          </div>
        )}
      </div>

      {/* Swipe to Complete */}
      <div style={{ padding: '16px 20px 32px', flexShrink: 0 }}>
        <SwipeToComplete onComplete={handleCompleteSet} label="SWIPE TO FINISH SET" />
        <button onClick={() => finishWorkout({ completed: false })} style={{
          display: 'block', margin: '12px auto 0', background: 'none', border: 'none',
          color: 'var(--muted)', fontSize: '13px', fontFamily: 'var(--font-display)',
          fontWeight: 500, cursor: 'pointer', letterSpacing: '0.04em',
        }}>⊞ Exit Focus Mode</button>
      </div>

      {/* Rest Timer Overlay */}
      {showRest && (
        <RestTimer
          duration={exercise.rest}
          onComplete={() => {
             setShowRest(false);
             if (currentSet < exercise.sets) {
                 setCurrentSet(currentSet + 1);
             } else {
                 advanceNextExercise();
             }
          }}
          onSkip={() => {
             setShowRest(false);
             if (currentSet < exercise.sets) {
                 setCurrentSet(currentSet + 1);
             } else {
                 advanceNextExercise();
             }
          }}
        />
      )}
    </div>
  );
}
