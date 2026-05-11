import React, { useEffect } from 'react';

export default function BottomSheetModal({ children, title, titleId, onClose, align = 'bottom' }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
      style={{ alignItems: align === 'center' ? 'center' : 'flex-end', padding: align === 'center' ? '20px' : undefined }}
    >
      <div className="modal-sheet" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className="modal-handle" />
        {title && (
          <h2 id={titleId} style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}
