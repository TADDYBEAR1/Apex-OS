import React from 'react';

/**
 * Instrument-cluster stat readout — a wide-tracked caps label over a
 * large Space Grotesk number, with an optional unit and accent.
 */
export function StatReadout({ label, value, unit, accent = false, size = 32, align = 'left' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: align === 'center' ? 'center' : 'flex-start' }}>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
        }}
      >{label}</span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: `${size}px`,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            color: accent ? 'var(--cyan)' : 'var(--text)',
            textShadow: accent ? '0 0 10px rgba(127,200,255,0.2)' : 'none',
          }}
        >{value}</span>
        {unit && (
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: `${Math.round(size * 0.5)}px`, color: 'var(--muted)' }}>{unit}</span>
        )}
      </div>
    </div>
  );
}

export default StatReadout;
