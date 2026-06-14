import React from 'react';

/**
 * In-app confirm/alert dialog in the Glass design language — replaces the
 * native window.confirm/alert which look cheap and break the aesthetic on
 * Android WebView.
 *
 * props: { title, message, confirmText, cancelText, tone: 'default'|'danger'|'warning',
 *          onConfirm, onCancel }  — omit onCancel/cancelText for alert-style.
 */
export default function AppDialog({
  title,
  message,
  confirmText = 'CONFIRM',
  cancelText,
  tone = 'default',
  onConfirm,
  onCancel,
}) {
  const accent = tone === 'danger' ? '#FF5C5C' : tone === 'warning' ? '#FFD54F' : 'var(--cyan)';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        zIndex: 600, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px', animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={(e) => { if (e.target === e.currentTarget && onCancel) onCancel(); }}
    >
      <div style={{
        width: '100%', maxWidth: '360px',
        background: 'var(--surface)', border: `1px solid ${accent}40`,
        borderRadius: 'var(--radius-lg)', padding: '24px',
        boxShadow: `0 0 50px ${tone === 'default' ? 'rgba(127, 200, 255,0.08)' : 'rgba(0,0,0,0.5)'}`,
      }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px',
          letterSpacing: '0.14em', color: accent, textTransform: 'uppercase',
          display: 'block', marginBottom: '10px',
        }}>{title}</span>
        <p style={{
          fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6,
          whiteSpace: 'pre-line', marginBottom: '22px',
        }}>{message}</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          {cancelText && (
            <button
              onClick={onCancel}
              style={{
                flex: 1, padding: '13px', background: 'transparent',
                border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-pill)',
                color: 'var(--text-secondary)', cursor: 'pointer',
                fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px',
                letterSpacing: '0.06em',
              }}
            >{cancelText}</button>
          )}
          <button
            onClick={onConfirm}
            style={{
              flex: 1, padding: '13px',
              background: tone === 'danger' ? '#FF5C5C' : tone === 'warning' ? '#FFD54F' : 'var(--cyan)',
              border: 'none', borderRadius: 'var(--radius-pill)',
              color: '#000', cursor: 'pointer',
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px',
              letterSpacing: '0.06em',
            }}
          >{confirmText}</button>
        </div>
      </div>
    </div>
  );
}
