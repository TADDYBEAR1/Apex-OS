import React, { useState } from 'react';
import BottomSheetModal from './BottomSheetModal';
import GlassCard from './GlassCard';
import IconButton from './IconButton';
import ProfileButton from './ProfileButton';
import SegmentedControl from './SegmentedControl';
import WorkoutHistoryList from './WorkoutHistoryList';
import { RECORDS_DATA, HEATMAP_DAY_LABELS, EXERCISE_LIBRARY } from '../data/sampleData';
import { buildHeatmapFromWorkoutHistory, calculateStats, computeBenchmarkTrend, formatBenchmarkValue, generateInsight } from '../utils/stats';
import Stepper from './Stepper';
import HoverGraph from './HoverGraph';

// Generate SVG path from real history data
const generateHistoryPath = (history, width, height, padding = 4) => {
  if (!history || history.length < 2) return { linePath: '', areaPath: '', points: [] };

  const values = history.map(h => h.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1; // avoid division by zero

  const usableW = width - padding * 2;
  const usableH = height - padding * 2;

  const points = values.map((val, i) => {
    const x = padding + (i / (values.length - 1)) * usableW;
    const y = padding + usableH - ((val - minVal) / range) * usableH;
    return [x, y];
  });

  const linePath = `M ${points.map(p => p.join(',')).join(' L ')}`;
  const areaPath = `${linePath} L ${points[points.length - 1][0]},${height} L ${points[0][0]},${height} Z`;

  return { linePath, areaPath, points };
};

export default function RecordsScreen({ nutrition, benchmarks, setBenchmarks, workoutHistory, onUpdateWorkoutSession, onDeleteWorkoutSession, profile, onOpenProfile }) {
  const [activeView, setActiveView] = useState('history');
  const [showAddBenchmark, setShowAddBenchmark] = useState(false);
  const [selectedLibraryId, setSelectedLibraryId] = useState(null);
  const [newBenchmarkValue, setNewBenchmarkValue] = useState(0);
  const [customBenchmarkName, setCustomBenchmarkName] = useState('');
  const [customBenchmarkUnit, setCustomBenchmarkUnit] = useState('KG');

  // Record new entry for existing benchmark
  const [recordingIndex, setRecordingIndex] = useState(null);
  const [recordValue, setRecordValue] = useState(0);
  const [expandedBenchmarkKeys, setExpandedBenchmarkKeys] = useState(() => new Set());

  const toggleBenchmarkDetails = (benchmarkKey) => {
    setExpandedBenchmarkKeys((prev) => {
      const next = new Set(prev);
      if (next.has(benchmarkKey)) next.delete(benchmarkKey);
      else next.add(benchmarkKey);
      return next;
    });
  };

  const { workCapacity } = RECORDS_DATA;
  const heatmap = buildHeatmapFromWorkoutHistory(workoutHistory, 4);
  const stats = calculateStats(heatmap.cells, { latestDayIndex: heatmap.latestDayIndex });
  const dynamicInsight = generateInsight(stats, benchmarks, nutrition);

  const handleAddBenchmark = () => {
    if (!selectedLibraryId) return;

    let newBenchmark;
    const today = new Date().toISOString().slice(0, 10);

    if (selectedLibraryId === 'custom') {
      if (!customBenchmarkName.trim()) return;
      newBenchmark = {
        label: customBenchmarkName.trim(),
        value: newBenchmarkValue,
        unit: customBenchmarkUnit,
        trend: 'New Benchmark',
        positive: true,
        history: [{ value: newBenchmarkValue, date: today }],
      };
    } else {
      const ex = EXERCISE_LIBRARY.find(e => e.id === selectedLibraryId);
      if (!ex) return;
      newBenchmark = {
        label: `${ex.name} 1RM`,
        value: newBenchmarkValue,
        unit: ex.isBodyweight ? 'REPS' : 'KG',
        trend: 'New Benchmark',
        positive: true,
        history: [{ value: newBenchmarkValue, date: today }],
      };
    }

    setBenchmarks([newBenchmark, ...benchmarks]);
    setShowAddBenchmark(false);
    setSelectedLibraryId(null);
    setNewBenchmarkValue(0);
    setCustomBenchmarkName('');
    setCustomBenchmarkUnit('KG');
  };

  // Record a new entry for an existing benchmark
  const handleRecordEntry = (index) => {
    const today = new Date().toISOString().slice(0, 10);
    const updated = [...benchmarks];
    const b = { ...updated[index] };
    const newHistory = [...(b.history || []), { value: recordValue, date: today }];
    b.history = newHistory;

    // Update displayed value
    b.value = b.unit === 'TIME' ? formatBenchmarkValue(recordValue, 'TIME') : recordValue;

    // Update trend
    const trend = computeBenchmarkTrend(newHistory, b.unit);
    b.trend = trend.text;
    b.positive = trend.positive;

    updated[index] = b;
    setBenchmarks(updated);
    setRecordingIndex(null);
    setRecordValue(0);
  };

  const handleDeleteBenchmarkHistoryEntry = (benchmarkIndex, entryIndex) => {
    const benchmark = benchmarks[benchmarkIndex];
    const entry = benchmark?.history?.[entryIndex];
    if (!benchmark || !entry) return;
    if (!window.confirm(`Delete ${benchmark.label} entry from ${entry.date}?`)) return;

    const updated = [...benchmarks];
    const nextHistory = benchmark.history.filter((_, index) => index !== entryIndex);
    const nextBenchmark = { ...benchmark, history: nextHistory };

    if (nextHistory.length > 0) {
      const latestEntry = nextHistory[nextHistory.length - 1];
      const trend = nextHistory.length >= 2
        ? computeBenchmarkTrend(nextHistory, benchmark.unit)
        : { text: '1 entry recorded', positive: true };

      nextBenchmark.value = benchmark.unit === 'TIME'
        ? formatBenchmarkValue(latestEntry.value, 'TIME')
        : latestEntry.value;
      nextBenchmark.trend = trend.text;
      nextBenchmark.positive = trend.positive;
    } else {
      nextBenchmark.value = 0;
      nextBenchmark.trend = 'No history recorded';
      nextBenchmark.positive = true;
    }

    updated[benchmarkIndex] = nextBenchmark;
    setBenchmarks(updated);
  };

  return (
    <div className="screen" style={{ paddingTop: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', animation: 'fadeInUp 0.4s ease-out' }}>
        <div>
          <h1 style={{ fontSize: '40px', fontWeight: 300, letterSpacing: '-0.04em' }}>Records<span style={{ color:'var(--cyan)', textShadow: '0 0 10px rgba(0,229,255,0.5)' }}>.</span></h1>
        </div>
        <ProfileButton profile={profile} onClick={onOpenProfile} />
      </div>

      {/* Smart Insight */}
      <GlassCard style={{ padding: '18px', marginBottom: '24px', animation: 'fadeInUp 0.5s ease-out', borderLeft: `3px solid ${dynamicInsight.positive ? 'var(--cyan)' : 'var(--orange)'}` }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: dynamicInsight.positive ? 'var(--cyan-dim)' : 'var(--orange-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: '18px' }}>{dynamicInsight.positive ? '⚡' : '⚠️'}</span>
          </div>
          <div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', color: dynamicInsight.positive ? 'var(--cyan)' : 'var(--orange)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>{dynamicInsight.title}</span>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{dynamicInsight.message}</p>
          </div>
        </div>
      </GlassCard>

      <SegmentedControl
        value={activeView}
        onChange={setActiveView}
        options={[{ key: 'history', label: 'History' }, { key: 'benchmarks', label: 'Benchmarks' }]}
        style={{ marginBottom: '24px' }}
      />

      {activeView === 'history' ? (
        <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Past Workouts</h2>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {workoutHistory.length} sessions
            </span>
          </div>
          <WorkoutHistoryList
            sessions={workoutHistory}
            onUpdateSession={onUpdateWorkoutSession}
            onDeleteSession={onDeleteWorkoutSession}
          />
        </div>
      ) : (
        <>

      {/* Training Frequency — GitHub-style heatmap */}
      <div style={{ marginBottom: '24px', animation: 'fadeInUp 0.6s ease-out' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Training Frequency</h2>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '11px', letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase' }}>Last 4 Weeks</span>
        </div>
        <GlassCard style={{ padding: '16px' }}>
          {/* Week column headers */}
          <div style={{ display:'grid', gridTemplateColumns:'36px repeat(4, 1fr)', gap:'5px', marginBottom:'5px' }}>
            <div />
            {heatmap.weekLabels.map(w => (
              <div key={w} style={{ textAlign:'center', fontSize:'10px', color:'var(--muted)', fontFamily:'var(--font-display)', fontWeight:600 }}>{w}</div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {heatmap.cells.map((row, ri) => (
              <div key={ri} style={{ display:'grid', gridTemplateColumns:'36px repeat(4, 1fr)', gap:'5px', alignItems:'center' }}>
                <span style={{ fontSize:'10px', color:'var(--muted)', fontFamily:'var(--font-display)', fontWeight:500 }}>{HEATMAP_DAY_LABELS[ri]}</span>
                {row.map((cell, ci) => (
                  <div key={ci} style={{
                    aspectRatio:'1/1', borderRadius:'4px', maxHeight:'32px',
                    background: cell === 0 ? 'rgba(255,255,255,0.03)' : cell === 1 ? 'rgba(0,229,255,0.2)' : cell === 2 ? 'rgba(0,229,255,0.5)' : 'var(--cyan)',
                    boxShadow: cell === 3 ? '0 0 8px rgba(0,229,255,0.4)' : 'none',
                    transition: 'all 0.4s ease',
                  }} />
                ))}
              </div>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', gap:'5px', marginTop:'12px', fontSize:'10px', color:'var(--muted)' }}>
            <span>Less</span>
            {[0,1,2,3].map(l => (
              <div key={l} style={{ width:'10px', height:'10px', borderRadius:'3px', background: l===0?'rgba(255,255,255,0.04)':l===1?'rgba(0,255,204,0.2)':l===2?'rgba(0,255,204,0.5)':'var(--cyan)' }} />
            ))}
            <span style={{ color:'var(--cyan)' }}>More</span>
          </div>
        </GlassCard>
      </div>

      {/* Benchmarks */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', animation: 'fadeInUp 0.65s ease-out' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Benchmarks</h2>
          <button
            onClick={() => setShowAddBenchmark(true)}
            aria-label="Add benchmark"
            style={{ background: 'transparent', border: '1px solid var(--cyan)', color: 'var(--cyan)', borderRadius: 'var(--radius-pill)', padding: '6px 12px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            + Add
          </button>
      </div>

      {benchmarks.map((record, i) => {
        const history = record.history || [];
        const benchmarkKey = `${record.label}-${i}`;
        const showDetails = expandedBenchmarkKeys.has(benchmarkKey);
        const latestValue = history.length > 0
          ? formatBenchmarkValue(history[history.length - 1].value, record.unit)
          : 'No data';
        const trend = history.length >= 2 ? computeBenchmarkTrend(history, record.unit) : { text: record.trend, positive: record.positive };
        const isPositive = trend.positive;

        return (
          <GlassCard key={i} style={{ padding: '16px', marginBottom: '12px', animation: `fadeInUp ${0.7 + i * 0.1}s ease-out` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#1A1D24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                  {record.unit === 'REPS' ? '💪' : record.unit === 'TIME' ? '🏃' : '🏋️'}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: 'var(--text)' }}>
                      {record.label}
                    </h3>
                    <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 'var(--radius-pill)', color: 'var(--cyan)', fontWeight: 500 }}>
                      {record.unit === 'REPS' ? 'Bodyweight' : record.unit === 'TIME' ? 'Endurance' : 'Strength'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px', color: 'var(--cyan)' }}>
                      {latestValue}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                      {record.unit.toLowerCase()}
                    </span>
                  </div>
                  <span style={{ fontSize: '12px', color: isPositive ? 'var(--cyan)' : 'var(--orange)', fontWeight: 500 }}>{trend.text}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  if (recordingIndex === i) {
                    setRecordingIndex(null);
                  } else {
                    setRecordingIndex(i);
                    // Default to last recorded value
                    const lastVal = history.length > 0 ? history[history.length - 1].value : 0;
                    setRecordValue(lastVal);
                  }
                }}
                aria-label={recordingIndex === i ? `Cancel recording ${record.label}` : `Record new ${record.label} entry`}
                style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: recordingIndex === i ? 'var(--orange)' : 'var(--cyan)',
                  color: '#000', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', cursor: 'pointer',
                  boxShadow: recordingIndex === i ? '0 4px 12px rgba(255,68,0,0.2)' : '0 4px 12px rgba(0,255,204,0.2)',
                  transition: 'all 0.25s ease',
                }}
              >
                {recordingIndex === i ? '✕' : '+'}
              </button>
            </div>

            {/* Record New Entry Panel */}
            {recordingIndex === i && (
              <div style={{
                padding: '16px', marginBottom: '16px',
                background: 'rgba(0,255,204,0.03)', border: '1px solid rgba(0,255,204,0.15)',
                borderRadius: 'var(--radius-md)', animation: 'fadeInUp 0.25s ease-out',
              }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.1em', color: 'var(--cyan)', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                  Record New Entry
                </span>
                <Stepper
                  label={`New Record (${record.unit})`}
                  value={recordValue}
                  onChange={setRecordValue}
                  min={0}
                  max={record.unit === 'TIME' ? 99999 : 9999}
                  step={record.unit === 'KG' || record.unit === 'LBS' ? 2.5 : record.unit === 'TIME' ? 5 : 1}
                  unit={record.unit === 'TIME' ? 's' : undefined}
                />
                <button
                  onClick={() => handleRecordEntry(i)}
                  className="btn-primary"
                  style={{ width: '100%', marginTop: '12px', height: '48px' }}
                >
                  Save Record
                </button>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: showDetails ? '12px' : 0 }}>
              <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
                {history.length > 0
                  ? `${history.length} ${history.length === 1 ? 'entry' : 'entries'} recorded`
                  : 'No history yet'}
              </span>
              <button
                type="button"
                onClick={() => toggleBenchmarkDetails(benchmarkKey)}
                aria-expanded={showDetails}
                aria-label={showDetails ? `Hide ${record.label} history` : `Show ${record.label} history`}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid',
                  borderColor: showDetails ? 'rgba(255,255,255,0.12)' : 'rgba(0,255,204,0.25)',
                  background: showDetails ? 'rgba(255,255,255,0.04)' : 'rgba(0,255,204,0.08)',
                  color: showDetails ? 'var(--muted)' : 'var(--cyan)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '10px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                {showDetails ? 'Hide' : 'Details'}
              </button>
            </div>

            {showDetails && (
            <>
            <div style={{ width: '100%', height: '80px', position: 'relative' }}>
              <HoverGraph data={history} unit={record.unit} isPositive={isPositive} />
            </div>

            {history.length > 0 && (
              <div style={{ marginTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Latest: {history[history.length - 1].date}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {history.map((entry, entryIndex) => (
                    <div
                      key={`${entry.date}-${entry.value}-${entryIndex}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        padding: '8px 10px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      <div>
                        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px', color: 'var(--text)' }}>
                          {formatBenchmarkValue(entry.value, record.unit)} {record.unit.toLowerCase()}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>{entry.date}</div>
                      </div>
                      <IconButton
                        label={`Delete ${record.label} history entry from ${entry.date}`}
                        tone="danger"
                        size={28}
                        onClick={() => handleDeleteBenchmarkHistoryEntry(i, entryIndex)}
                      >
                        ✕
                      </IconButton>
                    </div>
                  ))}
                </div>
              </div>
            )}
            </>
            )}
          </GlassCard>
        );
      })}

      {/* Add Benchmark Modal */}
      {showAddBenchmark && (
        <BottomSheetModal title="Create Benchmark" titleId="benchmark-modal-title" onClose={() => setShowAddBenchmark(false)} align="center">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

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
        </BottomSheetModal>
      )}

      {/* Work Capacity */}
      <GlassCard style={{ padding: '20px', marginBottom: '12px', animation: 'fadeInUp 1s ease-out' }}>
        <span className="label-sm" style={{ marginBottom: '6px', display: 'block' }}>WORK CAPACITY</span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '64px', lineHeight: 1, letterSpacing: '-0.02em' }}>{workCapacity.value}</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '18px', color: 'var(--muted)' }}>{workCapacity.unit}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: 'var(--cyan)', fontSize: '13px' }}>↗</span>
          <span style={{ fontSize: '13px', color: 'var(--cyan)' }}>{workCapacity.status}</span>
        </div>
      </GlassCard>
        </>
      )}
    </div>
  );
}
