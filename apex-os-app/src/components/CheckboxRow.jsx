import React from 'react';
import GlassCard from './GlassCard';

export default function CheckboxRow({ checked, title, subtitle, meta, onToggle, action, style }) {
  return (
    <GlassCard style={{ padding: '14px 16px', marginBottom: '6px', opacity: checked ? 0.55 : 1, transition: 'opacity 0.2s ease', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          type="button"
          role="checkbox"
          aria-checked={checked}
          aria-label={`Mark ${title} as ${checked ? 'not done' : 'done'}`}
          onClick={onToggle}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            border: checked ? 'none' : '2px solid var(--surface-border)',
            background: checked ? 'var(--cyan)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            cursor: 'pointer',
          }}
        >
          {checked && <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </button>
        <button
          type="button"
          onClick={onToggle}
          style={{ flex: 1, border: 'none', background: 'transparent', color: 'inherit', textAlign: 'left', cursor: 'pointer', padding: 0 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px', textDecoration: checked ? 'line-through' : 'none', color: checked ? 'var(--muted)' : 'var(--text)' }}>{title}</span>
            {meta && <span style={{ fontSize: '13px', color: 'var(--text-secondary)', flexShrink: 0 }}>{meta}</span>}
          </div>
          {subtitle && <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '6px' }}>{subtitle}</div>}
        </button>
        {action}
      </div>
    </GlassCard>
  );
}
