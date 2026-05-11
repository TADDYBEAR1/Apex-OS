import React from 'react';

const SECTION_LABELS = {
  warmup: 'Warm-up',
  main: 'Main Workout',
  cooldown: 'Cooldown',
};

export default function WorkoutSessionDetail({ session }) {
  const grouped = (session.completedSets || []).reduce((acc, set) => {
    const section = set.section || 'main';
    if (!acc[section]) acc[section] = {};
    const exerciseKey = set.exerciseName || set.exerciseId || 'Exercise';
    if (!acc[section][exerciseKey]) acc[section][exerciseKey] = [];
    acc[section][exerciseKey].push(set);
    return acc;
  }, {});

  if (!session.completedSets?.length) {
    return (
      <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid var(--surface-border)', color: 'var(--muted)', fontSize: '13px' }}>
        No individual sets were captured for this older sample session.
      </div>
    );
  }

  return (
    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--surface-border)' }}>
      {['warmup', 'main', 'cooldown'].map((section) => {
        const exercises = grouped[section];
        if (!exercises) return null;

        return (
          <div key={section} style={{ marginBottom: '16px' }}>
            <span className="label-sm" style={{ display: 'block', marginBottom: '8px', color: section === 'main' ? 'var(--cyan)' : 'var(--muted)' }}>
              {SECTION_LABELS[section] || section}
            </span>

            {Object.entries(exercises).map(([exerciseName, sets]) => (
              <div key={exerciseName} style={{ marginBottom: '12px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>{exerciseName}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {sets.map((set, index) => (
                    <div key={`${exerciseName}-${index}`} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255,255,255,0.03)',
                      fontSize: '12px',
                    }}>
                      <span style={{ color: 'var(--muted)' }}>Set {set.setNumber}</span>
                      <span style={{ color: 'var(--text)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                        {set.actualReps} reps{set.isBodyweight ? '' : ` × ${set.actualWeight}kg`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
