import React, { useMemo, useState } from 'react';
import BottomSheetModal from './BottomSheetModal';
import IconButton from './IconButton';
import Stepper from './Stepper';

const toDateInputValue = (value) => {
  if (!value) return new Date().toISOString().slice(0, 10);
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
  return date.toISOString().slice(0, 10);
};

export default function WorkoutHistoryEditor({ session, onClose, onSave }) {
  const [planName, setPlanName] = useState(session.planName || 'Workout');
  const [date, setDate] = useState(toDateInputValue(session.completedAt || session.date));
  const [durationMinutes, setDurationMinutes] = useState(Math.max(0, Math.round((session.durationSeconds || 0) / 60)));
  const [plannedSetCount, setPlannedSetCount] = useState(session.plannedSetCount || session.totalSets || session.completedSets?.length || 0);
  const [sets, setSets] = useState(() => (session.completedSets || []).map((set, index) => ({
    ...set,
    id: set.id || `${set.exerciseId || 'set'}-${set.setNumber || index}-${index}`,
  })));

  const groupedSets = useMemo(() => sets.reduce((acc, set, index) => {
    const key = `${set.section || 'main'}:${set.exerciseName || set.exerciseId || 'Exercise'}`;
    if (!acc[key]) {
      acc[key] = {
        section: set.section || 'main',
        exerciseName: set.exerciseName || set.exerciseId || 'Exercise',
        sets: [],
      };
    }
    acc[key].sets.push({ ...set, index });
    return acc;
  }, {}), [sets]);

  const updateSet = (index, patch) => {
    setSets(prev => prev.map((set, i) => i === index ? { ...set, ...patch } : set));
  };

  const deleteSet = (index) => {
    setSets(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const completedAt = new Date(`${date}T12:00:00.000`).toISOString();
    onSave({
      ...session,
      planName: planName.trim() || 'Workout',
      date,
      completedAt,
      durationSeconds: durationMinutes * 60,
      totalSets: plannedSetCount,
      plannedSetCount,
      completedSets: sets.map(({ id, ...set }, index) => ({
        ...set,
        setNumber: set.setNumber || index + 1,
      })),
    });
  };

  return (
    <BottomSheetModal title="Edit Workout History" titleId="workout-history-editor-title" onClose={onClose}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div>
          <label className="label-sm" htmlFor="history-workout-name" style={{ display: 'block', marginBottom: '8px' }}>Workout Name</label>
          <input
            id="history-workout-name"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--surface-border)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text)',
              fontSize: '15px',
            }}
          />
        </div>

        <div>
          <label className="label-sm" htmlFor="history-workout-date" style={{ display: 'block', marginBottom: '8px' }}>Workout Date</label>
          <input
            id="history-workout-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--surface-border)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text)',
              fontSize: '15px',
            }}
          />
        </div>

        <Stepper label="Duration" value={durationMinutes} onChange={setDurationMinutes} min={0} max={360} step={5} unit="min" />
        <Stepper label="Planned Sets" value={plannedSetCount} onChange={setPlannedSetCount} min={sets.length} max={100} />

        <div>
          <span className="label-sm" style={{ display: 'block', marginBottom: '10px' }}>Completed Sets</span>
          {sets.length === 0 ? (
            <div style={{ padding: '16px', border: '1px dashed var(--surface-border)', borderRadius: 'var(--radius-md)', color: 'var(--muted)', fontSize: '13px' }}>
              No captured sets to edit for this session.
            </div>
          ) : (
            Object.values(groupedSets).map(group => (
              <div key={`${group.section}-${group.exerciseName}`} style={{ marginBottom: '16px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', marginBottom: '8px' }}>{group.exerciseName}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {group.sets.map(set => (
                    <div key={set.id} style={{
                      padding: '12px',
                      border: '1px solid var(--surface-border)',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255,255,255,0.02)',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span className="label-sm">Set {set.setNumber || set.index + 1}</span>
                        <IconButton label={`Delete set ${set.setNumber || set.index + 1}`} tone="danger" onClick={() => deleteSet(set.index)}>✕</IconButton>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: set.isBodyweight ? '1fr' : '1fr 1fr', gap: '10px' }}>
                        <MiniNumberField
                          label="Reps"
                          value={set.actualReps || 0}
                          onChange={(value) => updateSet(set.index, { actualReps: value })}
                        />
                        {!set.isBodyweight && (
                          <MiniNumberField
                            label="Weight"
                            value={set.actualWeight || 0}
                            step={2.5}
                            onChange={(value) => updateSet(set.index, { actualWeight: value })}
                            unit="kg"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-ghost" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
          <button className="btn-primary" onClick={handleSave} style={{ flex: 2 }}>Save Workout</button>
        </div>
      </div>
    </BottomSheetModal>
  );
}

function MiniNumberField({ label, value, onChange, step = 1, unit }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <span className="label-sm" style={{ fontSize: '9px' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <input
          aria-label={label}
          type="number"
          value={value}
          min={0}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            width: '100%',
            padding: '10px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--surface-border)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text)',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
          }}
        />
        {unit && <span style={{ color: 'var(--muted)', fontSize: '12px' }}>{unit}</span>}
      </div>
    </label>
  );
}
