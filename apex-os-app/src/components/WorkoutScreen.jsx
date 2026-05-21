import React, { useState } from 'react';
import GlassCard from './GlassCard';
import ExerciseModal from './ExerciseModal';
import ProfileButton from './ProfileButton';
import { DAYS } from '../data/sampleData';

export default function WorkoutScreen({ workoutPlan, setWorkoutPlan, currentDay, setCurrentDay, onEnterFocus, profile, onOpenProfile }) {
  const [showModal, setShowModal] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);
  const [addSection, setAddSection] = useState('main');
  const todayPlan = workoutPlan[currentDay];
  const sections = [
    { key: 'warmup', label: 'WARM-UP', color: '#52525b' },
    { key: 'main', label: 'MAIN WORKOUT', color: 'var(--cyan)' },
    { key: 'cooldown', label: 'COOLDOWN', color: '#52525b' },
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

  const allExercises = todayPlan ? sections.flatMap(section =>
    (todayPlan.exercises[section.key] || []).map((exercise, index) => ({
      ...exercise,
      section: section.key,
      sectionLabel: section.label,
      sectionIndex: index,
    }))
  ) : [];

  return (
    <div className="screen" style={{ paddingTop: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', animation: 'fadeInUp 0.4s ease-out' }}>
        <div>
          <h1 style={{ fontSize: '40px', fontWeight: 300, marginBottom: '-4px', letterSpacing: '-0.04em' }}>Workout<span style={{ color:'var(--cyan)', textShadow: '0 0 10px rgba(0,229,255,0.5)' }}>.</span></h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 300 }}>Plan your protocol</p>
        </div>
        <ProfileButton profile={profile} onClick={onOpenProfile} />
      </div>

      {/* Spatial Day Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '48px', animation: 'fadeInUp 0.5s ease-out', padding: '0 8px' }}>
        {DAYS.map((day, i) => (
          <button key={i} onClick={() => setCurrentDay(i)} style={{
            background: 'none', border: 'none', padding: 0,
            color: currentDay === i ? 'var(--cyan)' : 'var(--muted)',
            fontFamily: 'var(--font-body)', fontWeight: currentDay === i ? 500 : 400, fontSize: '12px',
            cursor: 'pointer', transition: 'all 0.4s ease',
            textShadow: currentDay === i ? '0 0 10px rgba(0,229,255,0.5)' : 'none',
          }}>
            {day[0]}
          </button>
        ))}
      </div>

      {/* Workout Name */}
      {todayPlan && (
        <div style={{ marginBottom: '32px', animation: 'fadeInUp 0.6s ease-out' }}>
          <span className="label-sm" style={{ color: 'var(--text-secondary)' }}>TODAY'S PLAN</span>
          <h2 style={{ fontSize: '32px', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em', marginTop: '4px' }}>{todayPlan.name}</h2>
          <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 300 }}>{allExercises.length} exercises</span>
        </div>
      )}

      {/* Enter Focus Mode */}
      {allExercises.length > 0 && (
        <div style={{ animation: 'fadeInUp 0.65s ease-out', marginBottom: '40px' }}>
          <button onClick={() => onEnterFocus({ exercises: allExercises, day: currentDay, planName: todayPlan.name })} className="btn-primary" style={{ width: '100%' }}>
            ENTER FOCUS MODE
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      )}

      {/* Floating Sections */}
      {sections.map((section) => {
        const exercises = todayPlan?.exercises[section.key] || [];
        return (
          <div key={section.key} style={{ marginBottom: '40px', animation: 'fadeInUp 0.7s ease-out' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span className="label-sm" style={{ color: section.key === 'main' ? 'var(--cyan)' : 'var(--muted)' }}>{section.label}</span>
              <div style={{ height: '1px', flex: 1, background: 'var(--surface-border)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--surface-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {exercises.map((exercise, idx) => (
                <div key={exercise.id} className="glass-interactive" style={{ padding: '20px 16px', background: 'var(--bg)', borderRadius: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '18px', marginBottom: '4px', letterSpacing: '-0.01em' }}>{exercise.name}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 300 }}>
                        {exercise.sets} × {exercise.reps} reps
                        {!exercise.isBodyweight && exercise.weight > 0 && ` · ${exercise.weight}kg`}
                        {exercise.rest > 0 && ` · ${exercise.rest}s rest`}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button onClick={() => handleEditExercise(exercise, section.key)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', transition: 'color 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                      <button onClick={() => handleDeleteExercise(exercise.id, section.key)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', transition: 'color 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--orange)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                    </div>
                  </div>
                </div>
              ))}
              
              <button onClick={() => handleAddExercise(section.key)} style={{ width: '100%', padding: '16px', background: 'var(--bg)', color: 'var(--muted)', fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '13px', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', textAlign: 'left' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.background = 'var(--bg)'; }}
              >＋ Add Exercise</button>
            </div>
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
