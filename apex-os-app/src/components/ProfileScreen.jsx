import React, { useState, useRef } from 'react';
import GlassCard from './GlassCard';
import AppDialog from './AppDialog';
import IconButton from './IconButton';
import { compressImageFile } from '../utils/image';
import { exportAppState, parseImportedAppState, DEFAULT_PROFILE } from '../utils/storage';
import { buildWeeklyReport } from '../utils/report';
import { DEFAULT_MISSION } from '../utils/mission';
import { syncMorningReminder } from '../utils/notifications';
import { DEFAULT_WORKOUT_PLAN, NUTRITION_DATA, RECORDS_DATA, WORKOUT_HISTORY } from '../data/sampleData';

const IMPORT_DEFAULTS = {
  workoutPlan: DEFAULT_WORKOUT_PLAN,
  nutrition: NUTRITION_DATA,
  profile: DEFAULT_PROFILE,
  benchmarks: RECORDS_DATA.benchmarks,
  workoutHistory: WORKOUT_HISTORY,
};

export default function ProfileScreen({ onClose, profile, setProfile, appState, onImportState, onLogWeight, mission, onUpdateMission, reminder = { enabled: false, hour: 6, minute: 30 }, onUpdateReminder }) {
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [dataMessage, setDataMessage] = useState(null);
  const [profileDialog, setProfileDialog] = useState(null);
  const fileInputRef = useRef(null);
  const importInputRef = useRef(null);

  const flashMessage = (text, tone = 'ok') => {
    setDataMessage({ text, tone });
    window.setTimeout(() => setDataMessage(null), 4000);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      // Compress to a thumbnail — raw phone photos as base64 blow the
      // localStorage quota and silently break all persistence.
      const dataUrl = await compressImageFile(file);
      setProfile(prev => ({ ...prev, photo: dataUrl }));
    } catch (err) {
      console.warn('Photo compression failed', err);
      flashMessage('Could not process that photo.', 'err');
    } finally {
      e.target.value = '';
    }
  };

  const handleExport = () => {
    if (!appState) return;
    const json = exportAppState(appState);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `apex-os-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    flashMessage('Backup exported.');
  };

  const handleImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const raw = await file.text();
      const imported = parseImportedAppState(raw, IMPORT_DEFAULTS);
      setProfileDialog({
        title: 'Import Backup?',
        message: 'All current data will be replaced by the backup file.',
        confirmText: 'IMPORT',
        cancelText: 'CANCEL',
        tone: 'danger',
        onConfirm: () => {
          onImportState?.(imported);
          flashMessage('Backup imported successfully.');
        },
      });
    } catch (err) {
      console.warn('Import failed', err);
      flashMessage('Invalid backup file.', 'err');
    } finally {
      e.target.value = '';
    }
  };

  const handleWeeklyReport = async () => {
    if (!appState) return;
    const report = buildWeeklyReport({
      workoutHistory: appState.workoutHistory,
      profile: appState.profile,
      checkins: appState.checkins,
      workoutPlan: appState.workoutPlan,
    });
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Apex OS — Weekly Report', text: report });
        return;
      }
    } catch {
      // Share cancelled or unavailable — fall through to clipboard.
    }
    try {
      await navigator.clipboard.writeText(report);
      flashMessage('Weekly report copied to clipboard.');
    } catch {
      setProfileDialog({ title: 'Weekly Report', message: report, confirmText: 'CLOSE' });
    }
  };

  const startEdit = (field, value) => {
    setEditingField(field);
    setEditValue(String(value));
  };

  const saveEdit = () => {
    if (editingField) {
      setProfile(prev => ({ ...prev, [editingField]: editValue }));
      // Weight edits also feed the trends chart (number extracted from free text)
      if (editingField === 'weight' && onLogWeight) {
        const kg = parseFloat(String(editValue).replace(',', '.').match(/\d+(?:\.\d+)?/)?.[0]);
        if (!Number.isNaN(kg) && kg > 20 && kg < 250) onLogWeight(kg);
      }
      setEditingField(null);
      setEditValue('');
    }
  };

  const activeMission = mission || DEFAULT_MISSION;

  const applyReminder = async (next) => {
    onUpdateReminder?.(next);
    const result = await syncMorningReminder(next);
    if (next.enabled && !result.ok) {
      flashMessage(
        result.reason === 'permission-denied'
          ? 'Notification permission denied — enable it in system settings.'
          : 'Reminders need the app installed on the phone (run npm install + cap sync).',
        'err'
      );
    } else if (next.enabled && result.scheduled) {
      flashMessage(`Morning reminder set for ${String(next.hour).padStart(2, '0')}:${String(next.minute).padStart(2, '0')}.`);
    }
  };
  const handleMissionDate = (e) => {
    const value = e.target.value; // YYYY-MM-DD from the native date picker
    if (value && onUpdateMission) onUpdateMission({ targetDate: value, phases: activeMission.phases, label: activeMission.label });
  };
  const handleMissionLabel = (e) => {
    if (onUpdateMission) onUpdateMission({ label: e.target.value, phases: activeMission.phases, targetDate: activeMission.targetDate });
  };

  const fields = [
    { key: 'name', label: 'Name', icon: '👤' },
    { key: 'age', label: 'Age', icon: '📅' },
    { key: 'height', label: 'Height', icon: '📏' },
    { key: 'weight', label: 'Weight', icon: '⚖️' },
    { key: 'goal', label: 'Fitness Goal', icon: '🎯' },
  ];

  const dataActions = [
    { label: 'Weekly Report', sub: 'Share your feedback-loop summary', icon: '📋', onClick: handleWeeklyReport },
    { label: 'Export Data', sub: 'Download a full JSON backup', icon: '⬇️', onClick: handleExport },
    { label: 'Import Data', sub: 'Restore from a backup file', icon: '⬆️', onClick: () => importInputRef.current?.click() },
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'var(--bg)',
      zIndex: 200, overflow: 'auto', animation: 'fadeIn 0.3s ease-out',
    }}>
      {profileDialog && (
        <AppDialog
          {...profileDialog}
          onConfirm={() => { const fn = profileDialog.onConfirm; setProfileDialog(null); fn?.(); }}
          onCancel={() => setProfileDialog(null)}
        />
      )}
      <div style={{
        width: '100%',
        maxWidth: '480px',
        minHeight: '100vh',
        margin: '0 auto',
        padding: 'env(safe-area-inset-top, 24px) 20px calc(100px + env(safe-area-inset-bottom, 24px)) 20px',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--cyan)' }}>APEX OS</span>
            <h1 style={{ fontSize: '28px', fontWeight: 700 }}>Profile</h1>
          </div>
          <IconButton label="Close profile" onClick={onClose} size={40}>✕</IconButton>
        </div>

        {/* Profile Photo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
          <input type="file" ref={fileInputRef} accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
          <button
            onClick={() => fileInputRef.current?.click()}
            aria-label={profile.photo ? 'Change profile photo' : 'Add profile photo'}
            style={{
              width: 'clamp(104px, 28vw, 120px)', height: 'clamp(104px, 28vw, 120px)', borderRadius: '50%',
              border: '3px solid var(--cyan)', background: profile.photo ? 'transparent' : 'linear-gradient(135deg, var(--cyan), #00AA88)',
              cursor: 'pointer', overflow: 'hidden', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 30px rgba(0,255,204,0.2)',
              transition: 'all 0.3s ease', position: 'relative',
            }}
          >
            {profile.photo ? (
              <img src={profile.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '36px', color: '#000' }}>
                {profile.name ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : 'AO'}
              </span>
            )}
          </button>
          <span style={{
            fontSize: '13px', color: 'var(--cyan)', marginTop: '12px',
            fontFamily: 'var(--font-display)', fontWeight: 600,
            cursor: 'pointer',
          }}
            onClick={() => fileInputRef.current?.click()}
          >
            {profile.photo ? 'Change Photo' : 'Add Photo'}
          </span>
        </div>

        {/* Profile Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {fields.map(field => (
            <GlassCard key={field.key} style={{ padding: '16px' }}>
              {editingField === field.key ? (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>{field.icon}</span>
                  <div style={{ flex: 1 }}>
                    <span className="label-sm" style={{ display: 'block', marginBottom: '6px' }}>{field.label}</span>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      autoFocus
                      onKeyDown={(e) => { if (e.key === 'Enter') saveEdit(); }}
                      style={{
                        width: '100%', padding: '10px 12px',
                        background: 'rgba(255,255,255,0.03)', border: '1px solid var(--cyan)',
                        borderRadius: 'var(--radius-sm)', color: 'var(--text)',
                        fontFamily: 'var(--font-body)', fontSize: '16px', outline: 'none',
                      }}
                    />
                  </div>
                  <IconButton label={`Save ${field.label}`} onClick={saveEdit} size={36} tone="primary" style={{ background: 'var(--cyan)', color: '#000', border: 'none' }}>✓</IconButton>
                </div>
              ) : (
                <div
                  onClick={() => startEdit(field.key, profile[field.key] || '')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      startEdit(field.key, profile[field.key] || '');
                    }
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                >
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>{field.icon}</span>
                  <div style={{ flex: 1 }}>
                    <span className="label-sm" style={{ display: 'block', marginBottom: '2px' }}>{field.label}</span>
                    <span style={{
                      fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '16px',
                      color: profile[field.key] ? 'var(--text)' : 'var(--muted)',
                    }}>
                      {profile[field.key] || 'Tap to set'}
                    </span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </GlassCard>
          ))}
        </div>

        {/* Mission */}
        <div style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '14px' }}>Mission</h2>
          <GlassCard style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <span className="label-sm" style={{ display: 'block', marginBottom: '6px' }}>Target Name</span>
              <input
                type="text"
                defaultValue={activeMission.label}
                onBlur={handleMissionLabel}
                style={{
                  width: '100%', padding: '10px 12px', background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-sm)',
                  color: 'var(--text)', fontFamily: 'var(--font-display)', fontWeight: 600,
                  fontSize: '15px', outline: 'none',
                }}
              />
            </div>
            <div>
              <span className="label-sm" style={{ display: 'block', marginBottom: '6px' }}>Target Date (D-Day)</span>
              <input
                type="date"
                defaultValue={activeMission.targetDate}
                onChange={handleMissionDate}
                style={{
                  width: '100%', padding: '10px 12px', background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-sm)',
                  color: 'var(--text)', fontFamily: 'var(--font-display)', fontWeight: 600,
                  fontSize: '15px', outline: 'none', colorScheme: 'dark',
                }}
              />
            </div>
            <p style={{ fontSize: '11px', color: 'var(--muted)', lineHeight: 1.5 }}>
              The countdown and campaign bar on the home screen follow this date. Phase dates come from the training program.
            </p>
            <div style={{ borderTop: '1px solid var(--surface-border)', paddingTop: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14px', display: 'block' }}>Morning Reminder</span>
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Daily check-in nudge (Android)</span>
              </div>
              <input
                type="time"
                defaultValue={`${String(reminder.hour).padStart(2, '0')}:${String(reminder.minute).padStart(2, '0')}`}
                onChange={(e) => {
                  const [h, m] = e.target.value.split(':').map(Number);
                  if (!Number.isNaN(h)) applyReminder({ ...reminder, hour: h, minute: m || 0 });
                }}
                disabled={!reminder.enabled}
                style={{
                  padding: '8px 10px', background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-sm)',
                  color: reminder.enabled ? 'var(--text)' : 'var(--muted)',
                  fontFamily: 'var(--font-display)', fontSize: '13px', outline: 'none', colorScheme: 'dark',
                }}
              />
              <button
                role="switch"
                aria-checked={reminder.enabled}
                aria-label="Toggle morning reminder"
                onClick={() => applyReminder({ ...reminder, enabled: !reminder.enabled })}
                style={{
                  width: '48px', height: '28px', borderRadius: '14px', border: 'none', cursor: 'pointer',
                  background: reminder.enabled ? 'var(--cyan)' : 'rgba(255,255,255,0.1)',
                  position: 'relative', transition: 'background 0.25s ease', flexShrink: 0,
                }}
              >
                <span style={{
                  position: 'absolute', top: '3px', left: reminder.enabled ? '23px' : '3px',
                  width: '22px', height: '22px', borderRadius: '50%', background: '#000',
                  transition: 'left 0.25s ease',
                }} />
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Data & Reports */}
        <div style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '14px' }}>Data & Reports</h2>
          <input type="file" ref={importInputRef} accept="application/json,.json" onChange={handleImportFile} style={{ display: 'none' }} />
          {dataMessage && (
            <div role="status" style={{
              marginBottom: '12px', padding: '10px 14px', borderRadius: 'var(--radius-md)',
              background: dataMessage.tone === 'err' ? 'rgba(255,92,92,0.12)' : 'rgba(0,255,204,0.1)',
              border: `1px solid ${dataMessage.tone === 'err' ? 'rgba(255,92,92,0.4)' : 'rgba(0,255,204,0.3)'}`,
              color: dataMessage.tone === 'err' ? '#FF5C5C' : 'var(--cyan)',
              fontSize: '13px', fontFamily: 'var(--font-display)', fontWeight: 600,
            }}>{dataMessage.text}</div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {dataActions.map(action => (
              <GlassCard key={action.label} style={{ padding: '16px' }}>
                <div
                  onClick={action.onClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      action.onClick();
                    }
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                >
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>{action.icon}</span>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '16px', display: 'block' }}>{action.label}</span>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{action.sub}</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '14px' }}>Your Numbers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { label: 'Height', value: profile.height || '—', color: 'var(--cyan)' },
              { label: 'Weight', value: profile.weight || '—', color: '#4FC3F7' },
              { label: 'Age', value: profile.age || '—', color: '#FFD54F' },
              { label: 'Goal', value: profile.goal || '—', color: 'var(--cyan)' },
            ].map((stat, i) => (
              <GlassCard key={i} style={{ padding: '16px', textAlign: 'center' }}>
                <span className="label-sm" style={{ display: 'block', marginBottom: '6px' }}>{stat.label}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: stat.color }}>
                  {stat.value}
                </span>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
