import React from 'react';

export default function ProfileButton({ profile, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open profile"
      style={{
        width: '44px', height: '44px', borderRadius: '50%',
        background: profile.photo ? 'transparent' : 'linear-gradient(135deg, var(--cyan), #00AA88)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px',
        color: '#000', boxShadow: 'var(--cyan-glow-sm)',
        border: profile.photo ? '2px solid var(--cyan)' : 'none',
        cursor: 'pointer', overflow: 'hidden', flexShrink: 0,
        transition: 'all 0.25s ease',
      }}
    >
      {profile.photo ? (
        <img src={profile.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        profile.name
          ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
          : 'AO'
      )}
    </button>
  );
}
