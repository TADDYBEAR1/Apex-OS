import React, { useState, useRef } from 'react';
import GlassCard from './GlassCard';

export default function ProfileScreen({ onClose, profile, setProfile }) {
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfile(prev => ({ ...prev, photo: ev.target.result }));
      reader.readAsDataURL(file);
    }
  };

  const startEdit = (field, value) => {
    setEditingField(field);
    setEditValue(String(value));
  };

  const saveEdit = () => {
    if (editingField) {
      setProfile(prev => ({ ...prev, [editingField]: editValue }));
      setEditingField(null);
      setEditValue('');
    }
  };

  const fields = [
    { key: 'name', label: 'Name', icon: '👤' },
    { key: 'age', label: 'Age', icon: '📅' },
    { key: 'height', label: 'Height', icon: '📏' },
    { key: 'weight', label: 'Weight', icon: '⚖️' },
    { key: 'goal', label: 'Fitness Goal', icon: '🎯' },
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'var(--bg)',
      zIndex: 200, overflow: 'auto', animation: 'fadeIn 0.3s ease-out',
    }}>
      <div style={{
        padding: 'env(safe-area-inset-top, 24px) 20px calc(100px + env(safe-area-inset-bottom, 24px)) 20px',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--cyan)' }}>APEX OS</span>
            <h1 style={{ fontSize: '28px', fontWeight: 700 }}>Profile</h1>
          </div>
          <button onClick={onClose} aria-label="Close profile" style={{
            width: '40px', height: '40px', borderRadius: '50%',
            border: '1px solid var(--surface-border)', background: 'transparent',
            color: 'var(--muted)', fontSize: '18px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
        </div>

        {/* Profile Photo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
          <input type="file" ref={fileInputRef} accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
          <button
            onClick={() => fileInputRef.current?.click()}
            aria-label={profile.photo ? 'Change profile photo' : 'Add profile photo'}
            style={{
              width: '120px', height: '120px', borderRadius: '50%',
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
                  <button onClick={saveEdit} style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'var(--cyan)', border: 'none', color: '#000',
                    fontSize: '16px', cursor: 'pointer', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>✓</button>
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
