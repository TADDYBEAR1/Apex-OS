import React from 'react';

const icons = {
  home: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
        stroke={active ? '#00FFCC' : '#6B7280'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  workout: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6.5 6.5L6.5 17.5M17.5 6.5V17.5M4 9H6.5M6.5 9H8M17.5 9H20M16 9H17.5M8 9V15H16V9H8M4 15H6.5M17.5 15H20"
        stroke={active ? '#00FFCC' : '#6B7280'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  stats: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 3V21H21" stroke={active ? '#00FFCC' : '#6B7280'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 14L11 10L14 13L20 7" stroke={active ? '#00FFCC' : '#6B7280'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  fuel: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 8C18 8 19 9.5 19 11C19 12.3807 17.8807 13.5 16.5 13.5C15.1193 13.5 14 12.3807 14 11C14 9.5 15 8 15 8" stroke={active ? '#00FFCC' : '#6B7280'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 20H20M5 20V10C5 7.79086 6.79086 6 9 6H13V10.2C13 10.6418 12.6418 11 12.2 11H10" stroke={active ? '#00FFCC' : '#6B7280'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 14H13V20H5V14H9Z" stroke={active ? '#00FFCC' : '#6B7280'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

const tabs = [
  { key: 'home', label: 'HUB', icon: icons.home },
  { key: 'workout', label: 'WORKOUT', icon: icons.workout },
  { key: 'records', label: 'STATS', icon: icons.stats },
  { key: 'fuel', label: 'FUEL', icon: icons.fuel },
];

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '12px env(safe-area-inset-right, 16px) calc(16px + env(safe-area-inset-bottom, 12px)) env(safe-area-inset-left, 16px)',
      background: 'linear-gradient(to top, rgba(0,0,0,0.95) 60%, rgba(0,0,0,0.8) 80%, transparent)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      zIndex: 50,
      borderTop: '1px solid rgba(255,255,255,0.04)',
    }}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              position: 'relative',
              transition: 'all 0.25s ease',
            }}
          >
            {isActive && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '24px',
                height: '2px',
                background: 'var(--cyan)',
                borderRadius: 'var(--radius-pill)',
                boxShadow: '0 0 8px rgba(0,255,204,0.5)',
              }} />
            )}
            {tab.icon(isActive)}
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '10px',
              fontWeight: isActive ? 700 : 600,
              letterSpacing: '0.12em',
              color: isActive ? 'var(--cyan)' : 'var(--muted)',
              transition: 'color 0.25s ease',
            }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
