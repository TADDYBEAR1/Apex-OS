import React, { useState } from 'react';
import GlassCard from './GlassCard';
import { RECORDS_DATA, HEATMAP_DATA, EXERCISE_LIBRARY } from '../data/sampleData';
import { calculateStats, generateInsight } from '../utils/stats';
import Stepper from './Stepper';

// Helper to generate a dummy trendline (SVG path) for a benchmark
const generateTrendLine = (positive) => {
  const pts = positive
    ? [[0, 40], [20, 35], [40, 30], [60, 25], [80, 15], [100, 5]]
    : [[0, 10], [20, 15], [40, 12], [60, 25], [80, 35], [100, 40]];
  const d = `M ${pts.map(p => p.join(',')).join(' L ')}`;
  return d;
};

export default function RecordsScreen() {
  const [benchmarks, setBenchmarks] = useState(RECORDS_DATA.benchmarks);
  const [showAddBenchmark, setShowAddBenchmark] = useState(false);
  const [selectedLibraryId, setSelectedLibraryId] = useState(null);
  const [newBenchmarkValue, setNewBenchmarkValue] = useState(0);
  const [customBenchmarkName, setCustomBenchmarkName] = useState('');
  const [customBenchmarkUnit, setCustomBenchmarkUnit] = useState('KG');

  const { workCapacity } = RECORDS_DATA;
  const stats = calculateStats(HEATMAP_DATA);
  const dynamicInsight = generateInsight(stats, benchmarks);

  const handleAddBenchmark = () => {
    if (!selectedLibraryId) return;

    let newBenchmark;

    if (selectedLibraryId === 'custom') {
      if (!customBenchmarkName.trim()) return;
      newBenchmark = {
        label: customBenchmarkName.trim(),
        value: newBenchmarkValue,
        unit: customBenchmarkUnit,
        trend: 'New Benchmark',
        positive: true
      };
    } else {
      const ex = EXERCISE_LIBRARY.find(e => e.id === selectedLibraryId);
      if (!ex) return;
      newBenchmark = {
        label: `${ex.name} 1RM`,
        value: newBenchmarkValue,
        unit: ex.isBodyweight ? 'REPS' : 'KG',
        trend: 'New Benchmark',
        positive: true
      };
    }

    setBenchmarks([newBenchmark, ...benchmarks]);
    setShowAddBenchmark(false);
    setSelectedLibraryId(null);
    setNewBenchmarkValue(0);
    setCustomBenchmarkName('');
    setCustomBenchmarkUnit('KG');
  };

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
      <GlassCard style={{ padding: '18px', marginBottom: '24px', animation: 'fadeInUp 0.5s ease-out', borderLeft: `3px solid ${dynamicInsight.positive ? 'var(--cyan)' : 'var(--orange)'}` }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: dynamicInsight.positive ? 'var(--cyan-dim)' : 'var(--orange-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: '18px' }}>⚡</span>
          </div>
          <div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', color: dynamicInsight.positive ? 'var(--cyan)' : 'var(--orange)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>{dynamicInsight.title}</span>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{dynamicInsight.message}</p>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', animation: 'fadeInUp 0.65s ease-out' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Benchmarks</h2>
          <button
            onClick={() => setShowAddBenchmark(true)}
            style={{ background: 'transparent', border: '1px solid var(--cyan)', color: 'var(--cyan)', borderRadius: 'var(--radius-pill)', padding: '6px 12px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            + Add
          </button>
      </div>

      {benchmarks.map((record, i) => (
        <GlassCard key={i} style={{ padding: '16px', marginBottom: '12px', animation: `fadeInUp ${0.7 + i * 0.1}s ease-out` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#1A1D24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                {record.unit === 'REPS' ? '💪' : record.label.includes('Run') ? '🏃' : '🏋️'}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: 'var(--text)' }}>
                    {record.label}
                  </h3>
                  <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 'var(--radius-pill)', color: record.unit === 'REPS' ? 'var(--cyan)' : 'var(--cyan)', fontWeight: 500 }}>
                    {record.unit === 'REPS' ? 'Bodyweight' : 'Strength'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px', color: 'var(--cyan)' }}>
                    {record.value}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                    {record.unit.toLowerCase()}
                  </span>
                </div>
                <span style={{ fontSize: '12px', color: '#4F84A6' }}>2026-03-01</span>
              </div>
            </div>
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--cyan)', color: '#000', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,255,204,0.2)' }}>
              +
            </button>
          </div>

          {/* Sparkline Chart */}
          <div style={{ width: '100%', height: '80px', position: 'relative' }}>
            <svg viewBox="0 0 200 80" style={{ width: '100%', height: '100%', overflow: 'visible', preserveAspectRatio: 'none' }}>
              <defs>
                <linearGradient id={`grad-${i}`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`${generateTrendLine(record.positive).replace(/(\d+),(\d+)/g, (match, x, y) => `${x * 2},${(y / 50) * 80}`)} L 200,80 L 0,80 Z`}
                fill={`url(#grad-${i})`}
              />
              <path
                d={generateTrendLine(record.positive).replace(/(\d+),(\d+)/g, (match, x, y) => `${x * 2},${(y / 50) * 80}`)}
                fill="none"
                stroke="var(--cyan)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </GlassCard>
      ))}

      {/* Add Benchmark Modal */}
      {showAddBenchmark && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'fadeIn 0.3s ease-out', padding: '20px'
        }}>
          <div style={{
            width: '100%', maxWidth: '100%', maxHeight: '80vh', overflowY: 'auto', background: 'var(--surface)', border: '1px solid var(--surface-border)',
            borderRadius: 'var(--radius-lg)', padding: '24px env(safe-area-inset-right, 24px) calc(24px + env(safe-area-inset-bottom, 0px)) env(safe-area-inset-left, 24px)', display: 'flex', flexDirection: 'column', gap: '24px'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-display)', textAlign: 'center' }}>Create Benchmark</h2>

            {!selectedLibraryId ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="label-sm">Select Exercise</span>
                <button
                  onClick={() => {
                    setSelectedLibraryId('custom');
                    setNewBenchmarkValue(0);
                  }}
                  style={{
                    padding: '12px', background: 'var(--cyan-dim)', border: '1px dashed var(--cyan)',
                    borderRadius: 'var(--radius-sm)', color: 'var(--cyan)', textAlign: 'center', cursor: 'pointer',
                    fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 600, marginBottom: '8px'
                  }}
                >
                  + Create Custom Benchmark
                </button>
                {EXERCISE_LIBRARY.map(ex => (
                  <button
                    key={ex.id}
                    onClick={() => {
                      setSelectedLibraryId(ex.id);
                      setNewBenchmarkValue(ex.isBodyweight ? ex.defaultReps : ex.defaultWeight);
                    }}
                    style={{
                      padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--surface-border)',
                      borderRadius: 'var(--radius-sm)', color: 'var(--text)', textAlign: 'left', cursor: 'pointer',
                      fontFamily: 'var(--font-display)', fontSize: '14px'
                    }}
                  >
                    {ex.name}
                  </button>
                ))}
              </div>
            ) : selectedLibraryId === 'custom' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--cyan)' }}>
                  Custom Benchmark
                </div>

                <div>
                  <span className="label-sm" style={{ display: 'block', marginBottom: '8px' }}>Benchmark Name</span>
                  <input
                    type="text"
                    value={customBenchmarkName}
                    onChange={e => setCustomBenchmarkName(e.target.value)}
                    placeholder="e.g. 5K Row, Max Pushups"
                    style={{
                      width: '100%', padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--surface-border)',
                      borderRadius: 'var(--radius-sm)', color: 'var(--text)', fontSize: '16px', fontFamily: 'var(--font-body)',
                      outline: 'none', transition: 'border-color 0.2s'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {['KG', 'LBS', 'REPS', 'TIME'].map(u => (
                    <button
                      key={u}
                      onClick={() => setCustomBenchmarkUnit(u)}
                      style={{
                        flex: 1, padding: '10px 0', borderRadius: 'var(--radius-sm)',
                        background: customBenchmarkUnit === u ? 'var(--cyan-dim)' : 'transparent',
                        border: '1px solid', borderColor: customBenchmarkUnit === u ? 'var(--cyan)' : 'var(--surface-border)',
                        color: customBenchmarkUnit === u ? 'var(--cyan)' : 'var(--muted)',
                        fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px'
                      }}
                    >
                      {u}
                    </button>
                  ))}
                </div>

                <Stepper
                  label={`Target Value (${customBenchmarkUnit})`}
                  value={newBenchmarkValue}
                  onChange={setNewBenchmarkValue}
                  min={0}
                  max={9999}
                  step={customBenchmarkUnit === 'KG' || customBenchmarkUnit === 'LBS' ? 2.5 : 1}
                />

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => { setSelectedLibraryId(null); setShowAddBenchmark(false); }} className="btn-ghost" style={{ flex: 1 }}>Cancel</button>
                  <button onClick={handleAddBenchmark} className="btn-primary" style={{ flex: 1 }}>Save</button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--cyan)' }}>
                  {EXERCISE_LIBRARY.find(e => e.id === selectedLibraryId)?.name}
                </div>

                <Stepper
                  label="Benchmark Value (1RM or Max Reps)"
                  value={newBenchmarkValue}
                  onChange={setNewBenchmarkValue}
                  min={0}
                  max={999}
                  step={EXERCISE_LIBRARY.find(e => e.id === selectedLibraryId)?.isBodyweight ? 1 : 2.5}
                />

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => { setSelectedLibraryId(null); setShowAddBenchmark(false); }} className="btn-ghost" style={{ flex: 1 }}>Cancel</button>
                  <button onClick={handleAddBenchmark} className="btn-primary" style={{ flex: 1 }}>Save</button>
                </div>
              </div>
            )}

            {!selectedLibraryId && (
              <button onClick={() => setShowAddBenchmark(false)} className="btn-ghost" style={{ marginTop: 'auto' }}>Cancel</button>
            )}
          </div>
        </div>
      )}

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
    </div>
  );
}
