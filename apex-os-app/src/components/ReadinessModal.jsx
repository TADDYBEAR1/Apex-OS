import React, { useState } from 'react';
import Stepper from './Stepper';

export default function ReadinessModal({ onComplete }) {
  const [readiness, setReadiness] = useState(5);
  const [pain, setPain] = useState(1);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'fadeIn 0.3s ease-out', padding: '20px'
    }}>
      <div style={{
        width: '100%', maxWidth: '100%', background: 'var(--surface)', border: '1px solid var(--surface-border)',
        borderRadius: 'var(--radius-lg)', padding: '24px env(safe-area-inset-right, 24px) calc(24px + env(safe-area-inset-bottom, 0px)) env(safe-area-inset-left, 24px)', display: 'flex', flexDirection: 'column', gap: '24px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px',
            letterSpacing: '0.15em', color: 'var(--cyan)', textTransform: 'uppercase'
          }}>SYSTEM CHECK</span>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '8px' }}>Morning Calibration</h2>
        </div>

        <Stepper
          label="Readiness (1-10)"
          value={readiness}
          onChange={setReadiness}
          min={1}
          max={10}
        />

        <Stepper
          label="Pain Level (1-10)"
          value={pain}
          onChange={setPain}
          min={1}
          max={10}
        />

        <button
          onClick={() => onComplete({ readiness, pain })}
          className="btn-primary"
          style={{ width: '100%', marginTop: '12px' }}
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
}
