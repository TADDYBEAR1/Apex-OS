import React, { useState } from 'react';
import { computeReadiness, READINESS_LIGHTS } from '../utils/readiness';

function CheckinSlider({ label, value, min, max, step = 1, unit, onChange, color }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{
          fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase',
          letterSpacing: '0.1em', fontFamily: 'var(--font-display)', fontWeight: 600,
        }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color }}>
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        style={{ width: '100%', accentColor: color }}
      />
    </div>
  );
}

function vasColor(v) {
  if (v <= 2) return '#00FFCC';
  if (v <= 4) return '#FFD54F';
  return '#FF5C5C';
}

/**
 * The pre-mission ritual: 20 seconds every morning that turn sleep + pain +
 * energy into the day's traffic light. The light gates the day's plan.
 */
export default function MorningCheckin({ initial, onSave, onClose }) {
  const [sleepHours, setSleepHours] = useState(initial?.sleepHours ?? 7);
  const [kneeVas, setKneeVas] = useState(initial?.kneeVas ?? 0);
  const [backVas, setBackVas] = useState(initial?.backVas ?? 0);
  const [energy, setEnergy] = useState(initial?.energy ?? 3);

  const preview = computeReadiness({ sleepHours, kneeVas, backVas, energy });
  const lightMeta = READINESS_LIGHTS[preview.light];

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.94)',
      backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
      zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', animation: 'fadeIn 0.3s ease-out', overflowY: 'auto',
    }}>
      <div style={{
        width: '100%', maxWidth: '400px',
        background: 'var(--surface)', border: '1px solid var(--surface-border)',
        borderRadius: 'var(--radius-lg)', padding: '24px',
        display: 'flex', flexDirection: 'column', gap: '20px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px',
              letterSpacing: '0.15em', color: 'var(--cyan)', textTransform: 'uppercase',
            }}>MORNING CHECK-IN</span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>Calibrate Today</h2>
          </div>
          <button onClick={onClose} aria-label="Close check-in" style={{
            background: 'none', border: '1px solid var(--surface-border)', borderRadius: '50%',
            width: '36px', height: '36px', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '14px',
          }}>✕</button>
        </div>

        <CheckinSlider
          label="Sleep" value={sleepHours} min={0} max={12} step={0.5} unit="h"
          onChange={setSleepHours}
          color={sleepHours >= 7 ? '#00FFCC' : sleepHours >= 6 ? '#FFD54F' : '#FF5C5C'}
        />
        <CheckinSlider
          label="Knee · VAS" value={kneeVas} min={0} max={10} unit="/10"
          onChange={setKneeVas} color={vasColor(kneeVas)}
        />
        <CheckinSlider
          label="Lower Back · VAS" value={backVas} min={0} max={10} unit="/10"
          onChange={setBackVas} color={vasColor(backVas)}
        />
        <CheckinSlider
          label="Energy" value={energy} min={1} max={5} unit="/5"
          onChange={setEnergy} color="var(--cyan)"
        />

        {/* Live readiness preview */}
        <div style={{
          borderRadius: 'var(--radius-md)', padding: '14px 16px',
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${lightMeta.color}40`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px',
              letterSpacing: '0.1em', color: lightMeta.color,
            }}>{lightMeta.icon} {lightMeta.title}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px', color: lightMeta.color }}>
              {preview.score}
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {preview.recommendation}
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => onSave({ sleepHours, kneeVas, backVas, energy, ...computeReadiness({ sleepHours, kneeVas, backVas, energy }) })}
          style={{ width: '100%' }}
        >
          LOG READINESS
        </button>
      </div>
    </div>
  );
}
