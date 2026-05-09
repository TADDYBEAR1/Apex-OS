import React, { useState, useRef } from 'react';
import Stepper from './Stepper';
import { CATEGORIES, EXERCISE_LIBRARY } from '../data/sampleData';

export default function ExerciseModal({ onClose, onSave, editExercise = null, section = 'main' }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState(editExercise ? editExercise.name : '');
  const [customName, setCustomName] = useState(editExercise ? editExercise.name : '');
  const [sets, setSets] = useState(editExercise?.sets || 3);
  const [reps, setReps] = useState(editExercise?.reps || 10);
  const [weight, setWeight] = useState(editExercise?.weight || 0);
  const [rest, setRest] = useState(editExercise?.rest || 60);
  const [isBodyweight, setIsBodyweight] = useState(editExercise?.isBodyweight || false);
  const [note, setNote] = useState(editExercise?.note || '');
  const [imagePreview, setImagePreview] = useState(editExercise?.image || null);
  const [showLibrary, setShowLibrary] = useState(!editExercise);
  const fileInputRef = useRef(null);

  const filtered = EXERCISE_LIBRARY.filter(
    (e) => activeCategory === 'All' || e.category === activeCategory
  );

  const handleSelectFromLibrary = (exercise) => {
    setSelectedExercise(exercise.name);
    setCustomName(exercise.name);
    setSets(exercise.defaultSets);
    setReps(exercise.defaultReps);
    setWeight(exercise.defaultWeight);
    setRest(exercise.defaultRest);
    setIsBodyweight(exercise.isBodyweight);
    setShowLibrary(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave({
      id: editExercise?.id || `ex-${Date.now()}`,
      name: customName || 'Custom Exercise',
      sets,
      reps,
      weight,
      rest,
      isBodyweight,
      note,
      image: imagePreview,
      category: EXERCISE_LIBRARY.find((e) => e.name === selectedExercise)?.category || 'Other',
    });
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet">
        <div className="modal-handle" />

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700 }}>
            {editExercise ? 'Edit Exercise' : 'Add Exercise'}
          </h2>
          <button onClick={onClose} style={{
            width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--surface-border)',
            background: 'rgba(255,255,255,0.03)', color: 'var(--muted)', fontSize: '18px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
        </div>

        {showLibrary ? (
          <>
            {/* Category Tabs */}
            <div style={{
              display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '16px',
              scrollbarWidth: 'none', msOverflowStyle: 'none',
            }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-pill)',
                    border: activeCategory === cat ? '1px solid var(--cyan)' : '1px solid var(--surface-border)',
                    background: activeCategory === cat ? 'var(--cyan-dim)' : 'transparent',
                    color: activeCategory === cat ? 'var(--cyan)' : 'var(--muted)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '12px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.25s ease',
                    flexShrink: 0,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Exercise List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {filtered.map((exercise) => (
                <button
                  key={exercise.id}
                  onClick={() => handleSelectFromLibrary(exercise)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 16px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--surface-border)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                    width: '100%',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,255,204,0.2)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--surface-border)'; }}
                >
                  <div style={{
                    width: '44px', height: '44px', borderRadius: 'var(--radius-sm)',
                    background: 'var(--cyan-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M6.5 6.5V17.5M17.5 6.5V17.5M4 9H8M16 9H20M8 9V15H16V9H8M4 15H8M16 15H20"
                        stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px', color: 'var(--text)' }}>
                      {exercise.name}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                      {exercise.category} · {exercise.defaultSets}×{exercise.defaultReps}
                      {!exercise.isBodyweight && ` · ${exercise.defaultWeight}kg`}
                    </div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              ))}
            </div>

            {/* Custom Exercise Button */}
            <button
              onClick={() => { setShowLibrary(false); setCustomName(''); }}
              style={{
                width: '100%',
                padding: '14px',
                border: '1px dashed rgba(0,255,204,0.3)',
                borderRadius: 'var(--radius-md)',
                background: 'transparent',
                color: 'var(--cyan)',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              ＋ Create Custom Exercise
            </button>
          </>
        ) : (
          <>
            {/* Image Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: '100%',
                height: '160px',
                borderRadius: 'var(--radius-md)',
                border: imagePreview ? 'none' : '2px dashed rgba(0,255,204,0.25)',
                background: imagePreview
                  ? `url(${imagePreview}) center/cover no-repeat`
                  : 'rgba(0,255,204,0.03)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                marginBottom: '20px',
                overflow: 'hidden',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (!imagePreview) e.currentTarget.style.borderColor = 'rgba(0,255,204,0.5)';
              }}
              onMouseLeave={(e) => {
                if (!imagePreview) e.currentTarget.style.borderColor = 'rgba(0,255,204,0.25)';
              }}
            >
              {imagePreview && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                }} />
              )}
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: 'rgba(0,255,204,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 16L8.586 11.414C9.367 10.633 10.633 10.633 11.414 11.414L16 16M14 14L15.586 12.414C16.367 11.633 17.633 11.633 18.414 12.414L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
                      stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '13px',
                  color: imagePreview ? 'var(--text)' : 'var(--cyan)',
                  letterSpacing: '0.06em',
                }}>
                  {imagePreview ? 'Change Image' : 'Upload from Gallery'}
                </span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </div>

            {/* Exercise Name */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block', marginBottom: '8px',
                fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px',
                color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>Exercise Name</label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Barbell Bench Press"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--surface-border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,255,204,0.3)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--surface-border)'; }}
              />
            </div>

            {/* Bodyweight Toggle */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 0', marginBottom: '12px',
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14px', color: 'var(--text)' }}>
                Bodyweight
              </span>
              <button
                onClick={() => { setIsBodyweight(!isBodyweight); if (!isBodyweight) setWeight(0); }}
                style={{
                  width: '52px', height: '28px', borderRadius: '14px',
                  background: isBodyweight ? 'var(--cyan)' : 'rgba(255,255,255,0.08)',
                  border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s ease',
                }}
              >
                <div style={{
                  width: '22px', height: '22px', borderRadius: '50%',
                  background: isBodyweight ? '#000' : 'var(--text)',
                  position: 'absolute', top: '3px',
                  left: isBodyweight ? '27px' : '3px',
                  transition: 'left 0.3s ease',
                }} />
              </button>
            </div>

            {/* Steppers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
              <Stepper label="Sets" value={sets} onChange={setSets} min={1} max={20} />
              <Stepper label="Reps" value={reps} onChange={setReps} min={1} max={100} />
              {!isBodyweight && (
                <Stepper label="Weight" value={weight} onChange={setWeight} min={0} max={500} step={2.5} unit="kg" />
              )}
              <Stepper label="Rest" value={rest} onChange={setRest} min={0} max={600} step={15} unit="s" />
            </div>

            {/* Coaching Note */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block', marginBottom: '8px',
                fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px',
                color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>Coaching Note</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Form cues, tips, etc..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--surface-border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical',
                  minHeight: '80px',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,255,204,0.3)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--surface-border)'; }}
              />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => editExercise ? onClose() : setShowLibrary(true)} className="btn-ghost" style={{ flex: 1 }}>
                {editExercise ? 'Cancel' : '← Library'}
              </button>
              <button onClick={handleSave} className="btn-primary" style={{ flex: 2 }}>
                {editExercise ? 'Update' : 'Add Exercise'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
