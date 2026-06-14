import React from 'react';

const ICONS = {
  home: (
    <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" />
  ),
  workout: (
    <path d="M6.5 6.5L6.5 17.5M17.5 6.5V17.5M4 9H6.5M6.5 9H8M17.5 9H20M16 9H17.5M8 9V15H16V9H8M4 15H6.5M17.5 15H20" />
  ),
  stats: (
    <>
      <path d="M3 3V21H21" />
      <path d="M7 14L11 10L14 13L20 7" />
    </>
  ),
  fuel: (
    <>
      <path d="M18 8C18 8 19 9.5 19 11C19 12.3807 17.8807 13.5 16.5 13.5C15.1193 13.5 14 12.3807 14 11C14 9.5 15 8 15 8" />
      <path d="M4 20H20M5 20V10C5 7.79086 6.79086 6 9 6H13V10.2C13 10.6418 12.6418 11 12.2 11H10" />
      <path d="M9 14H13V20H5V14H9Z" />
    </>
  ),
};

const DEFAULT_TABS = [
  { key: 'home', label: 'HUB' },
  { key: 'workout', label: 'WORKOUT' },
  { key: 'records', label: 'STATS', icon: 'stats' },
  { key: 'fuel', label: 'FUEL' },
];

/**
 * Floating glass pill navigation. Active tab lights cyan with a soft
 * radial glow behind the icon. Sits fixed at the bottom of the app.
 */
export function BottomNav({ activeTab, onTabChange, tabs = DEFAULT_TABS, fixed = true }) {
  return (
    <nav
      aria-label="Primary"
      style={{
        position: fixed ? 'fixed' : 'relative',
        bottom: fixed ? 'calc(env(safe-area-inset-bottom, 0px) + 16px)' : undefined,
        left: fixed ? '50%' : undefined,
        transform: fixed ? 'translateX(-50%)' : undefined,
        width: fixed ? 'calc(100% - 64px)' : '100%',
        maxWidth: '356px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '12px 16px',
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'var(--blur)',
        WebkitBackdropFilter: 'var(--blur)',
        zIndex: 50,
        border: '1px solid var(--surface-border)',
        borderRadius: 'var(--radius-pill)',
        boxShadow: 'var(--shadow-float)',
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const color = isActive ? '#7FC8FF' : '#52525b';
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange && onTabChange(tab.key)}
            aria-current={isActive ? 'page' : undefined}
            aria-label={tab.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 12px',
              position: 'relative',
              transition: 'all var(--transition)',
              opacity: isActive ? 1 : 0.6,
            }}
          >
            <div style={{ position: 'relative' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {ICONS[tab.icon || tab.key]}
              </svg>
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '32px',
                    height: '32px',
                    background: 'var(--cyan-dim)',
                    borderRadius: '50%',
                    filter: 'blur(10px)',
                    zIndex: -1,
                  }}
                />
              )}
            </div>
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNav;
