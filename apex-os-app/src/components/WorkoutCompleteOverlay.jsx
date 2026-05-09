import React, { useEffect, useState } from 'react';

export default function WorkoutCompleteOverlay({ onDismiss, durationSeconds }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Slight delay for smooth entrance
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, []);

  const formatDuration = (secs) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins}m`;
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)',
      backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
      zIndex: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      opacity: show ? 1 : 0, transition: 'opacity 0.6s ease',
      padding: '20px', textAlign: 'center'
    }}>
      {/* Icon Animation */}
      <div style={{
        width: '120px', height: '120px', borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(0,255,204,0.2), rgba(0,255,204,0))',
        border: '1px solid rgba(0,255,204,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '32px',
        transform: show ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: '0 0 60px rgba(0,255,204,0.2)',
      }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{
          opacity: show ? 1 : 0, transform: show ? 'scale(1)' : 'scale(0.5)',
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s',
        }}>
          <path d="M5 13l4 4L19 7" stroke="var(--cyan)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <span style={{
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px',
        letterSpacing: '0.2em', color: 'var(--cyan)', textTransform: 'uppercase',
        marginBottom: '8px',
        opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.6s ease 0.3s'
      }}>PROTOCOL COMPLETE</span>

      <h1 style={{
        fontSize: '40px', fontWeight: 700, marginBottom: '24px', lineHeight: 1.1,
        opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.6s ease 0.4s'
      }}>Mission<br/>Accomplished</h1>

      <div style={{
        display: 'flex', gap: '24px', marginBottom: '48px',
        opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.6s ease 0.5s'
      }}>
        <div>
          <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Duration</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '24px' }}>{formatDuration(durationSeconds)}</span>
        </div>
      </div>

      <button onClick={onDismiss} className="btn-primary" style={{
        width: '100%', maxWidth: '340px',
        opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.6s ease 0.6s'
      }}>
        RETURN TO HUB
      </button>
    </div>
  );
}
