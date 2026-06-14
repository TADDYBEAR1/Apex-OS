import React, { useEffect, useState } from 'react';

function vasColor(value) {
  if (value <= 2) return '#7FC8FF';
  if (value <= 4) return '#FFD54F';
  return '#FF5C5C';
}

function VasSlider({ label, value, onChange }) {
  return (
    <div style={{ width: '100%', textAlign: 'left' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{
          fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase',
          letterSpacing: '0.1em', fontFamily: 'var(--font-display)', fontWeight: 600,
        }}>{label}</span>
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px',
          color: vasColor(value),
        }}>{value}/10 {value <= 2 ? '🟢' : value <= 4 ? '🟡' : '🔴'}</span>
      </div>
      <input
        type="range"
        min="0"
        max="10"
        step="1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={`${label} pain level`}
        style={{ width: '100%', accentColor: vasColor(value) }}
      />
    </div>
  );
}

export default function WorkoutCompleteOverlay({ onDismiss, durationSeconds }) {
  const [show, setShow] = useState(false);
  const [kneeVas, setKneeVas] = useState(0);
  const [backVas, setBackVas] = useState(0);

  useEffect(() => {
    // Slight delay for smooth entrance
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, []);

  const formatDuration = (secs) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const remainingSecs = secs % 60;

    if (hrs > 0) return `${hrs}h ${mins}m`;
    if (mins === 0) return `${remainingSecs}s`;
    return `${mins}m ${remainingSecs}s`;
  };

  const appear = (delay) => ({
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0)' : 'translateY(10px)',
    transition: `all 0.6s ease ${delay}s`,
  });

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)',
      backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
      zIndex: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      opacity: show ? 1 : 0, transition: 'opacity 0.6s ease',
      padding: '20px', textAlign: 'center', overflowY: 'auto',
    }}>
      {/* Icon Animation */}
      <div style={{
        width: '96px', height: '96px', borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(127, 200, 255,0.2), rgba(127, 200, 255,0))',
        border: '1px solid rgba(127, 200, 255,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '24px', flexShrink: 0,
        transform: show ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: '0 0 60px rgba(127, 200, 255,0.2)',
      }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{
          opacity: show ? 1 : 0, transform: show ? 'scale(1)' : 'scale(0.5)',
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s',
        }}>
          <path d="M5 13l4 4L19 7" stroke="var(--cyan)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <span style={{
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px',
        letterSpacing: '0.2em', color: 'var(--cyan)', textTransform: 'uppercase',
        marginBottom: '8px', ...appear(0.3),
      }}>PROTOCOL COMPLETE</span>

      <h1 style={{
        fontSize: '34px', fontWeight: 700, marginBottom: '16px', lineHeight: 1.1, ...appear(0.4),
      }}>Mission<br/>Accomplished</h1>

      <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', ...appear(0.5) }}>
        <div>
          <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Duration</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '24px' }}>{formatDuration(durationSeconds)}</span>
        </div>
      </div>

      {/* VAS Pain Check — feeds the weekly report & traffic-light load management */}
      <div style={{
        width: '100%', maxWidth: '340px', marginBottom: '28px',
        background: 'var(--surface)', border: '1px solid var(--surface-border)',
        borderRadius: 'var(--radius-lg)', padding: '16px 18px',
        display: 'flex', flexDirection: 'column', gap: '16px', ...appear(0.55),
      }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px',
          letterSpacing: '0.12em', color: 'var(--cyan)', textTransform: 'uppercase',
        }}>PAIN CHECK · VAS</span>
        <VasSlider label="Knee" value={kneeVas} onChange={setKneeVas} />
        <VasSlider label="Lower Back" value={backVas} onChange={setBackVas} />
      </div>

      <button
        onClick={() => onDismiss({ knee: kneeVas, back: backVas })}
        className="btn-primary"
        style={{ width: '100%', maxWidth: '340px', flexShrink: 0, ...appear(0.6) }}
      >
        LOG & RETURN TO HUB
      </button>
    </div>
  );
}
