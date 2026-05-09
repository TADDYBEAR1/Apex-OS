import React from 'react';
import GlassCard from './GlassCard';
import { RECORDS_DATA, HEATMAP_DATA } from '../data/sampleData';

export default function RecordsScreen() {
  const { insight, benchmarks, workCapacity } = RECORDS_DATA;

  return (
    <div className="screen" style={{ paddingTop: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', animation: 'fadeInUp 0.4s ease-out' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--cyan)' }}>APEX OS</span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 700 }}>Records Hub</h1>
        </div>
        <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--surface-border)', background: 'transparent', color: 'var(--muted)', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⚙</button>
      </div>

      {/* System Insight */}
      <GlassCard style={{ padding: '18px', marginBottom: '24px', animation: 'fadeInUp 0.5s ease-out', borderLeft: '3px solid var(--cyan)' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--cyan-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: '18px' }}>⚡</span>
          </div>
          <div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', color: 'var(--cyan)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>{insight.title}</span>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{insight.message}</p>
          </div>
        </div>
      </GlassCard>

      {/* Training Frequency */}
      <div style={{ marginBottom: '24px', animation: 'fadeInUp 0.6s ease-out' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Training Frequency</h2>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '11px', letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase' }}>Last 30 Days</span>
        </div>
        <GlassCard style={{ padding: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {HEATMAP_DATA.map((row, ri) => (
              <div key={ri} style={{ display: 'flex', gap: '4px' }}>
                {row.map((cell, ci) => (
                  <div key={ci} style={{
                    width: '24px', height: '24px', borderRadius: '5px',
                    background: cell === 0 ? 'rgba(255,255,255,0.04)' : cell === 1 ? 'rgba(0,255,204,0.15)' : cell === 2 ? 'rgba(0,255,204,0.35)' : 'var(--cyan)',
                    boxShadow: cell === 3 ? '0 0 6px rgba(0,255,204,0.3)' : 'none',
                    transition: 'all 0.3s ease',
                  }} />
                ))}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Benchmarks */}
      {benchmarks.map((record, i) => (
        <GlassCard key={i} style={{ padding: '20px', marginBottom: '12px', animation: `fadeInUp ${0.7 + i * 0.1}s ease-out` }}>
          <span className="label-sm" style={{ marginBottom: '6px', display: 'block' }}>{record.label}</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '48px', lineHeight: 1, color: 'var(--text)' }}>{record.value}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '18px', color: 'var(--muted)' }}>{record.unit}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: record.positive ? 'var(--cyan)' : 'var(--orange)', fontSize: '13px' }}>↗</span>
            <span style={{ fontSize: '13px', color: record.positive ? 'var(--cyan)' : 'var(--orange)' }}>{record.trend}</span>
          </div>
        </GlassCard>
      ))}

      {/* Work Capacity */}
      <GlassCard style={{ padding: '20px', marginBottom: '12px', animation: 'fadeInUp 1s ease-out' }}>
        <span className="label-sm" style={{ marginBottom: '6px', display: 'block' }}>WORK CAPACITY</span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '48px', lineHeight: 1 }}>{workCapacity.value}</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '18px', color: 'var(--muted)' }}>{workCapacity.unit}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: 'var(--cyan)', fontSize: '13px' }}>↗</span>
          <span style={{ fontSize: '13px', color: 'var(--cyan)' }}>{workCapacity.status}</span>
        </div>
      </GlassCard>

      {/* Volume Chart */}
      <GlassCard style={{ padding: '20px', marginTop: '12px', animation: 'fadeInUp 1.1s ease-out' }}>
        <span className="label-sm" style={{ marginBottom: '16px', display: 'block' }}>WEEKLY VOLUME (KG)</span>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '120px' }}>
          {RECORDS_DATA.weeklyVolume.map((v, i) => {
            const max = Math.max(...RECORDS_DATA.weeklyVolume);
            const h = (v / max) * 100;
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{
                  width: '100%', height: `${h}%`, borderRadius: '4px 4px 2px 2px',
                  background: i === RECORDS_DATA.weeklyVolume.length - 1
                    ? 'linear-gradient(to top, var(--cyan), rgba(0,255,204,0.5))'
                    : 'rgba(0,255,204,0.2)',
                  boxShadow: i === RECORDS_DATA.weeklyVolume.length - 1 ? '0 0 8px rgba(0,255,204,0.3)' : 'none',
                  transition: 'height 0.8s ease',
                  minHeight: '4px',
                }} />
                <span style={{ fontSize: '9px', color: 'var(--muted)', fontFamily: 'var(--font-display)' }}>
                  {['M','T','W','T','F','S','S'][i]}
                </span>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
