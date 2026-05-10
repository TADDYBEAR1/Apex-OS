import React, { useState } from 'react';
import GlassCard from './GlassCard';
import ExerciseModal from './ExerciseModal';
import { DAYS } from '../data/sampleData';

export default function WorkoutScreen({ workoutPlan, setWorkoutPlan, currentDay, setCurrentDay, onEnterFocus }) {
  const [showModal, setShowModal] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);
  const [addSection, setAddSection] = useState('main');
  const todayPlan = workoutPlan[currentDay];
  const sections = [
    { key: 'warmup', label: 'WARM-UP', color: '#FFD54F' },
    { key: 'main', label: 'MAIN WORKOUT', color: 'var(--cyan)' },
    { key: 'cooldown', label: 'COOLDOWN', color: '#90CAF9' },
  ];

  const handleAddExercise = (section) => { setAddSection(section); setEditingExercise(null); setShowModal(true); };
  const handleEditExercise = (exercise, section) => { setAddSection(section); setEditingExercise(exercise); setShowModal(true); };

  const handleSaveExercise = (exercise) => {
    const updated = { ...workoutPlan };
    const dayPlan = { ...updated[currentDay] };
    const sectionExercises = [...(dayPlan.exercises[addSection] || [])];
    if (editingExercise) {
      const idx = sectionExercises.findIndex(e => e.id === editingExercise.id);
      if (idx >= 0) sectionExercises[idx] = { ...exercise, id: editingExercise.id };
    } else {
      sectionExercises.push(exercise);
    }
    dayPlan.exercises = { ...dayPlan.exercises, [addSection]: sectionExercises };
    updated[currentDay] = dayPlan;
    setWorkoutPlan(updated);
    setShowModal(false);
  };

  const handleDeleteExercise = (exerciseId, section) => {
    const updated = { ...workoutPlan };
    const dayPlan = { ...updated[currentDay] };
    dayPlan.exercises = { ...dayPlan.exercises, [section]: dayPlan.exercises[section].filter(e => e.id !== exerciseId) };
    updated[currentDay] = dayPlan;
    setWorkoutPlan(updated);
  };

  const allExercises = todayPlan ? [...(todayPlan.exercises.warmup||[]),...(todayPlan.exercises.main||[]),...(todayPlan.exercises.cooldown||[])] : [];

  return (
    <div className="screen" style={{ paddingTop: '16px' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px', animation: 'fadeInUp 0.4s ease-out' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '4px' }}>Workout</h1>
        <p style={{ fontSize: '14px', color: 'var(--muted)' }}>Plan your protocol</p>
      </div>

      {/* Day Selector */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '24px', animation: 'fadeInUp 0.5s ease-out' }}>
        {DAYS.map((day, i) => (
          <button key={i} onClick={() => setCurrentDay(i)} style={{
            flex: 1, padding: '10px 0', borderRadius: 'var(--radius-sm)',
            border: currentDay === i ? '1px solid var(--cyan)' : '1px solid var(--surface-border)',
            background: currentDay === i ? 'var(--cyan-dim)' : 'var(--surface)',
            color: currentDay === i ? 'var(--cyan)' : 'var(--muted)',
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px',
            cursor: 'pointer', transition: 'all 0.25s ease', letterSpacing: '0.04em',
          }}>{day}</button>
        ))}
      </div>

      {/* Workout Name */}
      {todayPlan && (
        <div style={{ marginBottom: '20px', animation: 'fadeInUp 0.6s ease-out' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)' }}>{todayPlan.name}</h2>
          <span style={{ fontSize: '13px', color: 'var(--muted)' }}>{allExercises.length} exercises</span>
        </div>
      )}

      {/* Enter Focus Mode */}
      {allExercises.length > 0 && (
        <button onClick={() => onEnterFocus(allExercises)} className="btn-primary" style={{ width: '100%', marginBottom: '24px', animation: 'fadeInUp 0.65s ease-out', height: '56px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M8 5L19 12L8 19V5Z" fill="#000"/></svg>
          Enter Focus Mode
        </button>
      )}

      {/* Sections */}
      {sections.map((section) => {
        const exercises = todayPlan?.exercises[section.key] || [];
        return (
          <div key={section.key} style={{ marginBottom: '24px', animation: 'fadeInUp 0.7s ease-out' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ width: '3px', height: '16px', borderRadius: '2px', background: section.color }} />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>{section.label}</span>
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>({exercises.length})</span>
            </div>

            {exercises.map((exercise, idx) => (
              <GlassCard key={exercise.id} style={{ padding: '16px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  {/* Thumbnail */}
                  <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-sm)', background: exercise.image ? `url(${exercise.image}) center/cover` : 'var(--cyan-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {!exercise.image && <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6.5 6.5V17.5M17.5 6.5V17.5M4 9H8M16 9H20M8 9V15H16V9H8M4 15H8M16 15H20" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>{exercise.name}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {exercise.sets} × {exercise.reps} reps
                      {!exercise.isBodyweight && exercise.weight > 0 && ` · ${exercise.weight}kg`}
                      {exercise.rest > 0 && ` · ${exercise.rest}s rest`}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button onClick={() => handleEditExercise(exercise, section.key)} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--surface-border)', background: 'transparent', color: 'var(--muted)', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✎</button>
                    <button onClick={() => handleDeleteExercise(exercise.id, section.key)} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--surface-border)', background: 'transparent', color: 'var(--orange)', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                  </div>
                </div>
              </GlassCard>
            ))}

            <button onClick={() => handleAddExercise(section.key)} style={{ width: '100%', padding: '14px', border: '1px dashed rgba(0,255,204,0.2)', borderRadius: 'var(--radius-md)', background: 'transparent', color: 'var(--cyan)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s ease', letterSpacing: '0.04em' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,255,204,0.5)'; e.currentTarget.style.background = 'rgba(0,255,204,0.03)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,255,204,0.2)'; e.currentTarget.style.background = 'transparent'; }}
            >＋ Add Exercise</button>
          </div>
        );
      })}

      {showModal && (
        <ExerciseModal
          onClose={() => setShowModal(false)}
          onSave={handleSaveExercise}
          editExercise={editingExercise}
          section={addSection}
        />
      )}
    </div>
  );
}
