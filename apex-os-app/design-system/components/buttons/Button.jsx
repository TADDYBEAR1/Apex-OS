import React from 'react';

/**
 * Apex OS button. Pill-shaped, uppercase, glassy — the primary
 * variant lifts to cyan on hover. Use `surface` for neutral actions
 * inside cards and `ghost` for low-emphasis / tertiary actions.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  disabled = false,
  style,
  ...props
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    fontFamily: 'var(--font-body)',
    fontWeight: 400,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all var(--transition)',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.4 : 1,
    whiteSpace: 'nowrap',
  };

  const sizes = {
    sm: { height: '44px', padding: '0 20px', fontSize: '12px' },
    md: { height: '56px', padding: '0 32px', fontSize: '14px' },
    lg: { height: '60px', padding: '0 40px', fontSize: '15px' },
  };

  const variants = {
    primary: {
      background: 'rgba(255,255,255,0.05)',
      color: 'var(--text)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      border: '1px solid var(--surface-border-light)',
      borderRadius: 'var(--radius-pill)',
      backdropFilter: 'var(--blur)',
      WebkitBackdropFilter: 'var(--blur)',
    },
    surface: {
      background: 'transparent',
      color: 'var(--text)',
      letterSpacing: '0.02em',
      border: '1px solid var(--surface-border)',
      borderRadius: 'var(--radius-lg)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      border: '1px solid transparent',
      borderRadius: 'var(--radius-pill)',
    },
    solid: {
      background: 'var(--cyan)',
      color: '#000',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      fontWeight: 600,
      border: 'none',
      borderRadius: 'var(--radius-pill)',
      boxShadow: '0 4px 18px rgba(127,200,255,0.25)',
    },
  };

  const hover = (e, on) => {
    if (disabled) return;
    const v = variant;
    if (v === 'primary') {
      e.currentTarget.style.background = on ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)';
      e.currentTarget.style.borderColor = on ? 'var(--cyan)' : 'var(--surface-border-light)';
      e.currentTarget.style.color = on ? 'var(--cyan)' : 'var(--text)';
      e.currentTarget.style.boxShadow = on ? '0 0 20px rgba(127,200,255,0.15), inset 0 0 10px rgba(127,200,255,0.1)' : 'none';
    } else if (v === 'surface') {
      e.currentTarget.style.borderColor = on ? 'var(--surface-border-light)' : 'var(--surface-border)';
      e.currentTarget.style.background = on ? 'rgba(255,255,255,0.03)' : 'transparent';
    } else if (v === 'ghost') {
      e.currentTarget.style.color = on ? 'var(--text)' : 'var(--text-secondary)';
      e.currentTarget.style.borderColor = on ? 'var(--surface-border)' : 'transparent';
    } else if (v === 'solid') {
      e.currentTarget.style.filter = on ? 'brightness(1.1)' : 'none';
    }
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onMouseEnter={(e) => hover(e, true)}
      onMouseLeave={(e) => hover(e, false)}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

export default Button;
