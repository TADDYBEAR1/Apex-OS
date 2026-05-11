import React, { useState, useRef } from 'react';
import BottomSheetModal from './BottomSheetModal';
import IconButton from './IconButton';
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

  const handleCreateCustom = () => {
    setSelectedExercise('');
    setCustomName('');
    setSets(3);
    setReps(10);
    setWeight(0);
    setRest(60);
    setIsBodyweight(false);
    setImagePreview(null);
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
    <BottomSheetModal onClose={onClose} titleId="exercise-modal-title">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 id="exercise-modal-title" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700 }}>
            {editExercise ? 'Edit Exercise' : 'Add Exercise'}
          </h2>
          <IconButton label="Close exercise modal" onClick={onClose} size={36}>✕</IconButton>
        </div>

        {showLibrary ? (
          <>
            {/* Create Custom Exercise Button */}
            <button
              onClick={handleCreateCustom}
              style={{
                width: '100%', padding: '16px', marginBottom: '16px',
                background: 'var(--cyan-dim)', border: '1px dashed var(--cyan)',
                borderRadius: 'var(--radius-md)', color: 'var(--cyan)', textAlign: 'center',
                cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 600,
                transition: 'all 0.2s ease', letterSpacing: '0.04em',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,255,204,0.12)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--cyan-dim)'; }}
            >
              ＋ Create Custom Exercise
            </button>

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

          </>
        ) : (
          <>
            {/* Exercise Name Input */}
            <div style={{ marginBottom: '16px' }}>
              <span className="label-sm" style={{ display: 'block', marginBottom: '8px' }}>Exercise Name</span>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Bulgarian Split Squat"
                style={{
                  width: '100%', padding: '14px 16px',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid var(--surface-border)',
                  borderRadius: 'var(--radius-md)', color: 'var(--text)',
                  fontFamily: 'var(--font-body)', fontSize: '16px', outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,255,204,0.3)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--surface-border)'; }}
              />
            </div>

            {/* Image Upload Area */}
            <div style={{ marginBottom: '20px' }}>
              <span className="label-sm" style={{ display: 'block', marginBottom: '8px' }}>Exercise Image</span>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  width: '100%', height: imagePreview ? 'auto' : '100px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px dashed rgba(0,255,204,0.25)',
                  background: imagePreview ? 'transparent' : 'rgba(0,255,204,0.03)',
                  cursor: 'pointer', overflow: 'hidden',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: '8px', transition: 'all 0.2s ease',
                  padding: imagePreview ? '0' : '16px',
                }}
                onMouseEnter={(e) => { if (!imagePreview) e.currentTarget.style.borderColor = 'rgba(0,255,204,0.5)'; }}
                onMouseLeave={(e) => { if (!imagePreview) e.currentTarget.style.borderColor = 'rgba(0,255,204,0.25)'; }}
              >
                {imagePreview ? (
                  <div style={{ position: 'relative', width: '100%' }}>
                    <img
                      src={imagePreview}
                      alt="Exercise preview"
                      style={{
                        width: '100%', height: '160px', objectFit: 'cover',
                        borderRadius: 'var(--radius-md)',
                      }}
                    />
                    <div style={{
                      position: 'absolute', bottom: '8px', right: '8px',
                      padding: '6px 12px', background: 'rgba(0,0,0,0.7)',
                      borderRadius: 'var(--radius-pill)', color: 'var(--cyan)',
                      fontSize: '11px', fontFamily: 'var(--font-display)', fontWeight: 600,
                    }}>
                      Change Image
                    </div>
                  </div>
                ) : (
                  <>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" rx="3" stroke="var(--cyan)" strokeWidth="1.5" strokeOpacity="0.5"/>
                      <circle cx="8.5" cy="8.5" r="1.5" fill="var(--cyan)" fillOpacity="0.5"/>
                      <path d="M3 16L8 11L13 16" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
                      <path d="M14 14L17 11L21 15" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
                    </svg>
                    <span style={{ fontSize: '13px', color: 'var(--cyan)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                      Upload from Gallery
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
                      Tap to choose an image
                    </span>
                  </>
                )}
              </button>
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
                aria-label="Toggle bodyweight exercise"
                aria-pressed={isBodyweight}
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
    </BottomSheetModal>
  );
}
