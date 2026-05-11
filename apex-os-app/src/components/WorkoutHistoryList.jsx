import React, { useState } from 'react';
import GlassCard from './GlassCard';
import IconButton from './IconButton';
import WorkoutHistoryEditor from './WorkoutHistoryEditor';
import WorkoutSessionDetail from './WorkoutSessionDetail';
import { formatDuration, summarizeWorkoutSession } from '../utils/stats';

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unknown date';
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', weekday: 'short' });
};

export default function WorkoutHistoryList({ sessions = [], compact = false, onUpdateSession, onDeleteSession }) {
  const [expandedId, setExpandedId] = useState(null);
  const [editingSession, setEditingSession] = useState(null);
  const sortedSessions = [...sessions].sort((a, b) => new Date(b.completedAt || b.date) - new Date(a.completedAt || a.date));
  const visibleSessions = compact ? sortedSessions.slice(0, 3) : sortedSessions;

  const handleDelete = (session) => {
    if (!onDeleteSession) return;
    const confirmed = typeof window.confirm === 'function'
      ? window.confirm(`Delete ${session.planName || 'this workout'} from history?`)
      : true;
    if (confirmed) onDeleteSession(session.id);
  };

  if (visibleSessions.length === 0) {
    return (
      <GlassCard style={{ padding: '22px', textAlign: 'center' }}>
        <span className="label-sm" style={{ display: 'block', marginBottom: '8px' }}>WORKOUT HISTORY</span>
        <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Complete a focus session to start building your local training log.</p>
      </GlassCard>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? '8px' : '12px' }}>
        {visibleSessions.map((session) => {
        const summary = summarizeWorkoutSession(session);
        const isExpanded = expandedId === session.id;
        const title = session.planName || 'Workout';

        return (
          <GlassCard key={session.id} style={{ padding: compact ? '14px' : '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ minWidth: 0 }}>
                  <span className="label-sm" style={{ display: 'block', marginBottom: '4px' }}>{formatDate(session.completedAt || session.date)}</span>
                  <h3 style={{ fontSize: compact ? '15px' : '17px', lineHeight: 1.2 }}>{title}</h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  {!compact && onUpdateSession && (
                    <button
                      type="button"
                      onClick={() => setEditingSession(session)}
                      style={{ border: 'none', background: 'transparent', color: 'var(--cyan)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}
                    >
                      Edit
                    </button>
                  )}
                  {!compact && onDeleteSession && (
                    <IconButton label={`Delete ${title}`} tone="danger" onClick={() => handleDelete(session)}>✕</IconButton>
                  )}
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : session.id)}
                    aria-expanded={isExpanded}
                    style={{ border: 'none', background: 'transparent', color: 'var(--cyan)', fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    {isExpanded ? 'Hide' : 'Details'}
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '14px' }}>
                <Metric label="Duration" value={formatDuration(session.durationSeconds)} />
                <Metric label="Sets" value={`${summary.completedSetCount}/${summary.plannedSetCount}`} />
                <Metric label="Volume" value={summary.volume > 0 ? `${Math.round(summary.volume).toLocaleString()}kg` : 'Body'} />
              </div>

              {summary.topLifts.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
                  {summary.topLifts.map((lift) => (
                    <span key={lift.name} style={{
                      padding: '4px 8px',
                      borderRadius: 'var(--radius-pill)',
                      background: 'rgba(0,255,204,0.08)',
                      color: 'var(--cyan)',
                      fontSize: '11px',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                    }}>
                      {lift.name}: {lift.bestWeight}kg
                    </span>
                  ))}
                </div>
              )}

            {isExpanded && <WorkoutSessionDetail session={session} />}
          </GlassCard>
        );
        })}
      </div>
      {editingSession && (
        <WorkoutHistoryEditor
          session={editingSession}
          onClose={() => setEditingSession(null)}
          onSave={(updatedSession) => {
            onUpdateSession?.(editingSession.id, updatedSession);
            setEditingSession(null);
          }}
        />
      )}
    </>
  );
}

function Metric({ label, value }) {
  return (
    <div style={{ padding: '10px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.03)' }}>
      <span className="label-sm" style={{ fontSize: '9px' }}>{label}</span>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: 'var(--text)', marginTop: '2px' }}>{value}</div>
    </div>
  );
}
