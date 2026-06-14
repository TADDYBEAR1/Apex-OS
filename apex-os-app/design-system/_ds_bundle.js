/* @ds-bundle: {"format":3,"namespace":"ApexOSDesignSystem_1864eb","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"SegmentedControl","sourcePath":"components/controls/SegmentedControl.jsx"},{"name":"Stepper","sourcePath":"components/controls/Stepper.jsx"},{"name":"ProgressBar","sourcePath":"components/data/ProgressBar.jsx"},{"name":"ReadinessLight","sourcePath":"components/data/ReadinessLight.jsx"},{"name":"ReadinessRing","sourcePath":"components/data/ReadinessRing.jsx"},{"name":"StatReadout","sourcePath":"components/data/StatReadout.jsx"},{"name":"BottomNav","sourcePath":"components/navigation/BottomNav.jsx"},{"name":"Badge","sourcePath":"components/surfaces/Badge.jsx"},{"name":"GlassCard","sourcePath":"components/surfaces/GlassCard.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"b93839927e16","components/buttons/IconButton.jsx":"c0ec6317973c","components/controls/SegmentedControl.jsx":"359824bb051c","components/controls/Stepper.jsx":"18f4980f618e","components/data/ProgressBar.jsx":"a4897cffa6ff","components/data/ReadinessLight.jsx":"0ebc83a42dfb","components/data/ReadinessRing.jsx":"ca51e26c3572","components/data/StatReadout.jsx":"776d4e03eaca","components/navigation/BottomNav.jsx":"9f092efc4184","components/surfaces/Badge.jsx":"419ca9a87eec","components/surfaces/GlassCard.jsx":"aa46c5ef2b0d","explorations/DirAurora.jsx":"f2d3c5554136","explorations/DirDaylight.jsx":"00295b953015","explorations/DirPulse.jsx":"d1fa2790e4a8","explorations/design-canvas.jsx":"bd8746af6e58","ui_kits/apex-os/FocusScreen.jsx":"0f9ae6dd0be5","ui_kits/apex-os/HomeScreen.jsx":"67f2484df987","ui_kits/apex-os/MorningCheckin.jsx":"d364b56a37ef","ui_kits/apex-os/RecordsScreen.jsx":"f35d7c4f2f47","ui_kits/apex-os/data.js":"41490215438b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ApexOSDesignSystem_1864eb = window.ApexOSDesignSystem_1864eb || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Apex OS button. Pill-shaped, uppercase, glassy — the primary
 * variant lifts to cyan on hover. Use `surface` for neutral actions
 * inside cards and `ghost` for low-emphasis / tertiary actions.
 */
function Button({
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
    whiteSpace: 'nowrap'
  };
  const sizes = {
    sm: {
      height: '44px',
      padding: '0 20px',
      fontSize: '12px'
    },
    md: {
      height: '56px',
      padding: '0 32px',
      fontSize: '14px'
    },
    lg: {
      height: '60px',
      padding: '0 40px',
      fontSize: '15px'
    }
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
      WebkitBackdropFilter: 'var(--blur)'
    },
    surface: {
      background: 'transparent',
      color: 'var(--text)',
      letterSpacing: '0.02em',
      border: '1px solid var(--surface-border)',
      borderRadius: 'var(--radius-lg)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      border: '1px solid transparent',
      borderRadius: 'var(--radius-pill)'
    },
    solid: {
      background: 'var(--cyan)',
      color: '#000',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      fontWeight: 600,
      border: 'none',
      borderRadius: 'var(--radius-pill)',
      boxShadow: '0 4px 18px rgba(127,200,255,0.25)'
    }
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
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onMouseEnter: e => hover(e, true),
    onMouseLeave: e => hover(e, false),
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...style
    }
  }, props), icon, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Round hairline icon button — close / add / delete affordance.
 * Tone drives the ring + glyph color (muted, cyan, orange).
 */
function IconButton({
  label,
  children,
  tone = 'muted',
  size = 32,
  style,
  ...props
}) {
  const color = tone === 'danger' ? 'var(--orange)' : tone === 'primary' ? 'var(--cyan)' : 'var(--muted)';
  const borderColor = tone === 'danger' ? 'rgba(255,77,0,0.25)' : tone === 'primary' ? 'rgba(127,200,255,0.25)' : 'var(--surface-border)';
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = color;
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = borderColor;
    },
    style: {
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      border: `1px solid ${borderColor}`,
      background: 'transparent',
      color,
      fontSize: `${Math.round(size * 0.5)}px`,
      lineHeight: 1,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transition: 'all 0.2s ease',
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/controls/SegmentedControl.jsx
try { (() => {
/**
 * Pill segmented control — toggles between 2–4 views. Active
 * segment fills with dim cyan and the label lights cyan.
 */
function SegmentedControl({
  options,
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '4px',
      padding: '4px',
      background: 'var(--surface)',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid var(--surface-border)',
      ...style
    }
  }, options.map(option => {
    const active = value === option.key;
    return /*#__PURE__*/React.createElement("button", {
      key: option.key,
      type: "button",
      onClick: () => onChange(option.key),
      "aria-pressed": active,
      style: {
        flex: 1,
        padding: '10px',
        borderRadius: 'var(--radius-pill)',
        border: 'none',
        background: active ? 'var(--cyan-dim)' : 'transparent',
        color: active ? 'var(--cyan)' : 'var(--muted)',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '12px',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'all 0.25s ease'
      }
    }, option.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/controls/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/controls/Stepper.jsx
try { (() => {
const {
  useState
} = React;
/**
 * Big-target numeric stepper for in-session logging — two round
 * ±buttons flanking a large cyan readout. Built for thumbs.
 */
function Stepper({
  value,
  onChange,
  min = 0,
  max = 999,
  step = 1,
  unit = '',
  label
}) {
  const [pulse, setPulse] = useState(false);
  const bump = dir => {
    const next = value + dir * step;
    if (next < min || next > max) return;
    onChange(next);
    setPulse(true);
    setTimeout(() => setPulse(false), 200);
  };
  const btn = {
    width: '72px',
    height: '72px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '50%',
    color: 'var(--text)',
    fontSize: '28px',
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'transform 0.12s ease, opacity 0.2s ease',
    flexShrink: 0,
    userSelect: 'none'
  };
  return /*#__PURE__*/React.createElement("div", null, label && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '10px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: '15px',
      color: 'var(--text)'
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surface)',
      border: '1px solid var(--surface-border)',
      borderRadius: 'var(--radius-lg)',
      backdropFilter: 'var(--blur)',
      WebkitBackdropFilter: 'var(--blur)',
      boxShadow: 'var(--shadow-inset)',
      padding: '8px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      ...btn,
      opacity: value <= min ? 0.3 : 1
    },
    onClick: () => bump(-1),
    disabled: value <= min,
    "aria-label": `Decrease ${label || 'value'}`,
    onMouseDown: e => {
      e.currentTarget.style.transform = 'scale(0.9)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'scale(1)';
    }
  }, "\u2212"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'center',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: '80px',
      textAlign: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '48px',
      color: 'var(--cyan)',
      lineHeight: 1,
      transition: 'transform 0.18s ease',
      transform: pulse ? 'scale(1.08)' : 'scale(1)'
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: '18px',
      color: 'var(--muted)',
      marginLeft: '4px'
    }
  }, unit)), /*#__PURE__*/React.createElement("button", {
    style: {
      ...btn,
      opacity: value >= max ? 0.3 : 1
    },
    onClick: () => bump(1),
    disabled: value >= max,
    "aria-label": `Increase ${label || 'value'}`,
    onMouseDown: e => {
      e.currentTarget.style.transform = 'scale(0.9)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'scale(1)';
    }
  }, "+")));
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/controls/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressBar.jsx
try { (() => {
/**
 * Campaign progress bar — a hairline track with a liquid cyan→violet
 * fill and a glowing leading dot. Used for the mission timeline and
 * any 0–100% completion readout.
 */
function ProgressBar({
  value = 0,
  height = 6,
  showDot = true,
  style
}) {
  const pct = Math.max(0, Math.min(100, value));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: `${height}px`,
      borderRadius: 'var(--radius-pill)',
      background: 'rgba(255,255,255,0.06)',
      overflow: showDot ? 'visible' : 'hidden',
      position: 'relative',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: `${pct}%`,
      borderRadius: 'var(--radius-pill)',
      background: 'linear-gradient(90deg, rgba(127,200,255,0.4), var(--cyan))',
      boxShadow: '0 0 12px rgba(127,200,255,0.5)',
      transition: 'width 1s var(--ease-out-expo)'
    }
  }, showDot && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translate(50%, -50%)',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: '#fff',
      boxShadow: '0 0 10px #fff, 0 0 20px var(--cyan)'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/data/ReadinessLight.jsx
try { (() => {
const LIGHTS = {
  green: {
    color: 'var(--signal-go)',
    icon: '🟢',
    title: 'GO'
  },
  yellow: {
    color: 'var(--signal-caution)',
    icon: '🟡',
    title: 'CAUTION'
  },
  red: {
    color: 'var(--signal-stop)',
    icon: '🔴',
    title: 'HOLD'
  }
};

/**
 * Readiness traffic-light chip — the morning-gate verdict. Pairs a
 * score with a colored GO / CAUTION / HOLD state and a recommendation.
 */
function ReadinessLight({
  light = 'green',
  score,
  title,
  recommendation
}) {
  const meta = LIGHTS[light] || LIGHTS.green;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      padding: '16px 18px',
      borderRadius: 'var(--radius-md)',
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${meta.color}40`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      minWidth: '40px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '20px',
      display: 'block',
      lineHeight: 1.2
    }
  }, meta.icon), score != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '18px',
      color: meta.color
    }
  }, score)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '12px',
      letterSpacing: '0.1em',
      color: meta.color,
      display: 'block',
      textTransform: 'uppercase'
    }
  }, title || meta.title), recommendation && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '13px',
      color: 'var(--text-secondary)',
      lineHeight: 1.45,
      display: 'block',
      marginTop: '2px'
    }
  }, recommendation)));
}
Object.assign(__ds_scope, { ReadinessLight });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ReadinessLight.jsx", error: String((e && e.message) || e) }); }

// components/data/ReadinessRing.jsx
try { (() => {
/**
 * The Apex OS signature — a circular readiness gauge. An iridescent
 * ice-gradient arc over a faint track, with the score and a label
 * stacked in the center. This is the brand's hero data element.
 */
function ReadinessRing({
  value = 88,
  score,
  label = 'Ready',
  size = 160,
  stroke = 12,
  stops = ['#CFEFFF', '#7FC8FF', '#9FB8FF'],
  id = 'rr'
}) {
  const r = (size - stroke) / 2 - 4;
  const circ = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value)) / 100;
  const gid = `${id}-grad`;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: `${size}px`,
      height: `${size}px`,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: gid,
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: stops[0]
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.5",
    stopColor: stops[1]
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: stops[2]
  }))), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "rgba(255,255,255,0.1)",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: `url(#${gid})`,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: circ,
    strokeDashoffset: circ * (1 - pct),
    transform: `rotate(-90 ${size / 2} ${size / 2})`,
    style: {
      filter: `drop-shadow(0 0 8px ${stops[1]}99)`,
      transition: 'stroke-dashoffset 1s var(--ease-out-expo)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: `${size * 0.29}px`,
      lineHeight: 1,
      letterSpacing: '-0.03em',
      color: 'var(--text)'
    }
  }, score != null ? score : value), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '10px',
      fontWeight: 600,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--ice)',
      marginTop: '2px'
    }
  }, label)));
}
Object.assign(__ds_scope, { ReadinessRing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ReadinessRing.jsx", error: String((e && e.message) || e) }); }

// components/data/StatReadout.jsx
try { (() => {
/**
 * Instrument-cluster stat readout — a wide-tracked caps label over a
 * large Space Grotesk number, with an optional unit and accent.
 */
function StatReadout({
  label,
  value,
  unit,
  accent = false,
  size = 32,
  align = 'left'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      alignItems: align === 'center' ? 'center' : 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '10px',
      fontWeight: 500,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: 'var(--muted)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '2px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: `${size}px`,
      lineHeight: 1,
      letterSpacing: '-0.03em',
      color: accent ? 'var(--cyan)' : 'var(--text)',
      textShadow: accent ? '0 0 10px rgba(127,200,255,0.2)' : 'none'
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: `${Math.round(size * 0.5)}px`,
      color: 'var(--muted)'
    }
  }, unit)));
}
Object.assign(__ds_scope, { StatReadout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatReadout.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BottomNav.jsx
try { (() => {
const ICONS = {
  home: /*#__PURE__*/React.createElement("path", {
    d: "M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
  }),
  workout: /*#__PURE__*/React.createElement("path", {
    d: "M6.5 6.5L6.5 17.5M17.5 6.5V17.5M4 9H6.5M6.5 9H8M17.5 9H20M16 9H17.5M8 9V15H16V9H8M4 15H6.5M17.5 15H20"
  }),
  stats: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 3V21H21"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 14L11 10L14 13L20 7"
  })),
  fuel: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M18 8C18 8 19 9.5 19 11C19 12.3807 17.8807 13.5 16.5 13.5C15.1193 13.5 14 12.3807 14 11C14 9.5 15 8 15 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 20H20M5 20V10C5 7.79086 6.79086 6 9 6H13V10.2C13 10.6418 12.6418 11 12.2 11H10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 14H13V20H5V14H9Z"
  }))
};
const DEFAULT_TABS = [{
  key: 'home',
  label: 'HUB'
}, {
  key: 'workout',
  label: 'WORKOUT'
}, {
  key: 'records',
  label: 'STATS',
  icon: 'stats'
}, {
  key: 'fuel',
  label: 'FUEL'
}];

/**
 * Floating glass pill navigation. Active tab lights cyan with a soft
 * radial glow behind the icon. Sits fixed at the bottom of the app.
 */
function BottomNav({
  activeTab,
  onTabChange,
  tabs = DEFAULT_TABS,
  fixed = true
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Primary",
    style: {
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
      boxShadow: 'var(--shadow-float)'
    }
  }, tabs.map(tab => {
    const isActive = activeTab === tab.key;
    const color = isActive ? '#7FC8FF' : '#52525b';
    return /*#__PURE__*/React.createElement("button", {
      key: tab.key,
      onClick: () => onTabChange && onTabChange(tab.key),
      "aria-current": isActive ? 'page' : undefined,
      "aria-label": tab.label,
      style: {
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
        opacity: isActive ? 1 : 0.6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true"
    }, ICONS[tab.icon || tab.key]), isActive && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '32px',
        height: '32px',
        background: 'var(--cyan-dim)',
        borderRadius: '50%',
        filter: 'blur(10px)',
        zIndex: -1
      }
    })));
  }));
}
Object.assign(__ds_scope, { BottomNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BottomNav.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  strength: {
    color: 'var(--orange)',
    bg: 'rgba(255,77,0,0.12)'
  },
  bodyweight: {
    color: 'var(--green)',
    bg: 'rgba(0,255,136,0.12)'
  },
  endurance: {
    color: 'var(--cyan)',
    bg: 'rgba(127,200,255,0.12)'
  },
  cyan: {
    color: 'var(--cyan)',
    bg: 'rgba(127,200,255,0.12)'
  },
  neutral: {
    color: 'var(--text-secondary)',
    bg: 'rgba(255,255,255,0.05)'
  }
};

/**
 * Small capsule label — exercise category, status, or tag.
 * Apex uses three semantic categories: strength (orange),
 * bodyweight (green), endurance (cyan).
 */
function Badge({
  children,
  tone = 'neutral',
  style,
  ...props
}) {
  const t = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'var(--font-body)',
      fontSize: '10px',
      fontWeight: 500,
      letterSpacing: '0.04em',
      padding: '3px 9px',
      borderRadius: 'var(--radius-pill)',
      color: t.color,
      background: t.bg,
      whiteSpace: 'nowrap',
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Badge.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/GlassCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The Apex OS container primitive — a near-invisible glass panel
 * with a hairline border that warms toward cyan on hover when
 * interactive. Everything on a screen sits in one of these.
 */
function GlassCard({
  children,
  onClick,
  glow = false,
  padding = 24,
  style,
  ...props
}) {
  const interactive = typeof onClick === 'function';
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    role: interactive ? 'button' : undefined,
    tabIndex: interactive ? 0 : undefined,
    className: `glass ${interactive ? 'glass-interactive' : ''} ${glow ? 'glow-cyan' : ''}`,
    style: {
      padding: typeof padding === 'number' ? `${padding}px` : padding,
      textAlign: 'left',
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { GlassCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/GlassCard.jsx", error: String((e && e.message) || e) }); }

// explorations/DirAurora.jsx
try { (() => {
// Aurora direction — parametrized by palette so we can explore color-ways.
// palette: { bg, blobs:[{c,o}x3], ring:[3 stops], bar:[stops], accent:[2 clip stops],
//            dot:'css-gradient', dotInk, period }
function DirAurora({
  palette,
  idp = 'au'
}) {
  const P = palette || window.AURORA_PALETTES.tide;
  const r = 70,
    circ = 2 * Math.PI * r,
    pct = 0.88;
  const accentSolid = P.ring[0];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      position: 'relative',
      background: P.bg || '#06070C',
      fontFamily: "'Inter',system-ui,sans-serif",
      color: '#fff',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("style", null, `
        .${idp}-blob{position:absolute;border-radius:50%;filter:blur(60px);}
        .${idp}-card{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-top-color:rgba(255,255,255,.22);border-radius:30px;backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);box-shadow:0 24px 60px rgba(0,0,0,.5),inset 0 1px 1px rgba(255,255,255,.12);}
        .${idp}-eyebrow{font-family:'Space Grotesk';font-weight:700;font-size:11px;letter-spacing:.18em;text-transform:uppercase;background:linear-gradient(90deg,${P.accent[0]},${P.accent[1]});-webkit-background-clip:text;background-clip:text;color:transparent;}
        .${idp}-disp{font-family:'Space Grotesk';font-weight:300;letter-spacing:-.04em;}
        .${idp}-lbl{font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.45);}
      `), /*#__PURE__*/React.createElement("div", {
    className: `${idp}-blob`,
    style: {
      width: '260px',
      height: '260px',
      top: '-60px',
      left: '-40px',
      background: P.blobs[0].c,
      opacity: P.blobs[0].o
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: `${idp}-blob`,
    style: {
      width: '300px',
      height: '300px',
      top: '120px',
      right: '-90px',
      background: P.blobs[1].c,
      opacity: P.blobs[1].o
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: `${idp}-blob`,
    style: {
      width: '280px',
      height: '280px',
      bottom: '-80px',
      left: '20px',
      background: P.blobs[2].c,
      opacity: P.blobs[2].o
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 28px 0',
      fontFamily: "'Space Grotesk'",
      fontWeight: 600,
      fontSize: '14px'
    }
  }, /*#__PURE__*/React.createElement("span", null, "9:41"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: '5px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "11",
    viewBox: "0 0 17 11",
    fill: "#fff"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7",
    width: "3",
    height: "4",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.5",
    y: "5",
    width: "3",
    height: "6",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "2.5",
    width: "3",
    height: "8.5",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13.5",
    y: "0",
    width: "3",
    height: "11",
    rx: "1"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "12",
    viewBox: "0 0 25 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "21",
    height: "11",
    rx: "3",
    stroke: "#fff",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "16",
    height: "8",
    rx: "1.5",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "23",
    y: "4",
    width: "1.5",
    height: "4",
    rx: "0.75",
    fill: "#fff",
    opacity: "0.5"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '20px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '18px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: `${idp}-eyebrow`
  }, "Mission Control"), /*#__PURE__*/React.createElement("h1", {
    className: `${idp}-disp`,
    style: {
      fontSize: '30px',
      marginTop: '2px'
    }
  }, "Daniel", /*#__PURE__*/React.createElement("span", {
    style: {
      color: accentSolid
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '12.5px',
      color: 'rgba(255,255,255,.55)'
    }
  }, "Saturday, Jun 14")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '42px',
      height: '42px',
      borderRadius: '50%',
      border: '1px solid rgba(255,255,255,.25)',
      background: 'rgba(255,255,255,.08)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Space Grotesk'",
      fontWeight: 600,
      fontSize: '14px'
    }
  }, "DA")), /*#__PURE__*/React.createElement("div", {
    className: `${idp}-card`,
    style: {
      padding: '24px',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '160px',
      height: '160px',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "160",
    height: "160",
    viewBox: "0 0 160 160"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: `${idp}g`,
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: P.ring[0]
  }), /*#__PURE__*/React.createElement("stop", {
    offset: ".5",
    stopColor: P.ring[1]
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: P.ring[2]
  }))), /*#__PURE__*/React.createElement("circle", {
    cx: "80",
    cy: "80",
    r: r,
    fill: "none",
    stroke: "rgba(255,255,255,.1)",
    strokeWidth: "12"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "80",
    cy: "80",
    r: r,
    fill: "none",
    stroke: `url(#${idp}g)`,
    strokeWidth: "12",
    strokeLinecap: "round",
    strokeDasharray: circ,
    strokeDashoffset: circ * (1 - pct),
    transform: "rotate(-90 80 80)",
    style: {
      filter: `drop-shadow(0 0 8px ${P.ring[0]}99)`
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: `${idp}-disp`,
    style: {
      fontSize: '46px',
      lineHeight: 1
    }
  }, "88"), /*#__PURE__*/React.createElement("span", {
    className: `${idp}-lbl`,
    style: {
      marginTop: '2px'
    }
  }, "Ready"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: `${idp}-lbl`
  }, "Readiness"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '14px',
      color: 'rgba(255,255,255,.78)',
      lineHeight: 1.5,
      marginTop: '6px'
    }
  }, "Sleep banked, joints quiet. ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#fff'
    }
  }, "Green light"), " on today's plan."))), /*#__PURE__*/React.createElement("div", {
    className: `${idp}-card`,
    style: {
      padding: '22px 24px',
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: `${idp}-disp`,
    style: {
      fontSize: '58px',
      lineHeight: 1
    }
  }, "D", /*#__PURE__*/React.createElement("span", {
    style: {
      color: accentSolid
    }
  }, "\u2011"), "128"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: `${idp}-eyebrow`
  }, "Yom Sayarot"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '12px',
      color: 'rgba(255,255,255,.55)'
    }
  }, "The Yoke Block \xB7 Wk 2/4"))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '8px',
      borderRadius: '99px',
      background: 'rgba(255,255,255,.1)',
      marginTop: '16px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '62%',
      height: '100%',
      borderRadius: '99px',
      background: `linear-gradient(90deg,${P.ring[0]},${P.ring[1]},${P.ring[2]})`
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: `${idp}-card`,
    style: {
      padding: '20px 22px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: `${idp}-eyebrow`
  }, "Today's Mission"), /*#__PURE__*/React.createElement("h2", {
    className: `${idp}-disp`,
    style: {
      fontSize: '24px',
      marginTop: '6px'
    }
  }, "The Heavy Trunk"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12.5px',
      color: 'rgba(255,255,255,.55)'
    }
  }, "6 exercises \xB7 90 min")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '46px',
      height: '46px',
      borderRadius: '50%',
      background: P.dot,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: `0 6px 18px ${P.ring[0]}66`
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: P.dotInk || '#06070C',
    strokeWidth: "2.2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M12 5l7 7-7 7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))))));
}
window.AURORA_PALETTES = {
  tide: {
    bg: '#06070C',
    blobs: [{
      c: '#00E5C4',
      o: .55
    }, {
      c: '#2D9BFF',
      o: .55
    }, {
      c: '#FF3D9A',
      o: .4
    }],
    ring: ['#3DE0FF', '#7C7BFF', '#FF6BC4'],
    accent: ['#3DE0FF', '#B388FF'],
    dot: 'linear-gradient(135deg,#3DE0FF,#B388FF)',
    dotInk: '#06070C'
  },
  verdant: {
    bg: '#05090A',
    blobs: [{
      c: '#00FFA3',
      o: .5
    }, {
      c: '#16C2B0',
      o: .5
    }, {
      c: '#A6FF4D',
      o: .4
    }],
    ring: ['#5BFFC2', '#00E0A0', '#C6FF4D'],
    accent: ['#5BFFC2', '#C6FF4D'],
    dot: 'linear-gradient(135deg,#5BFFC2,#C6FF4D)',
    dotInk: '#05140E'
  },
  ember: {
    bg: '#0B0709',
    blobs: [{
      c: '#FF6B2D',
      o: .5
    }, {
      c: '#FF2D78',
      o: .45
    }, {
      c: '#FFC83D',
      o: .4
    }],
    ring: ['#FFC53D', '#FF6A1F', '#FF2D78'],
    accent: ['#FFC53D', '#FF5FA2'],
    dot: 'linear-gradient(135deg,#FFB13D,#FF3D78)',
    dotInk: '#1A0A06'
  },
  arctic: {
    bg: '#070A10',
    blobs: [{
      c: '#6FE9FF',
      o: .5
    }, {
      c: '#8FA8FF',
      o: .5
    }, {
      c: '#C9F0FF',
      o: .35
    }],
    ring: ['#CFefff', '#7FC8FF', '#A9B6FF'],
    accent: ['#CFefff', '#9FB8FF'],
    dot: 'linear-gradient(135deg,#BFeaff,#9FB8FF)',
    dotInk: '#0A1018'
  },
  orchid: {
    bg: '#0B070E',
    blobs: [{
      c: '#FF4FD8',
      o: .45
    }, {
      c: '#9B5BFF',
      o: .5
    }, {
      c: '#FFB23D',
      o: .4
    }],
    ring: ['#FFD24D', '#FF5FC4', '#A65BFF'],
    accent: ['#FF8FE0', '#C7A0FF'],
    dot: 'linear-gradient(135deg,#FF6FD0,#A65BFF)',
    dotInk: '#15081A'
  }
};
Object.assign(window, {
  DirAurora
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "explorations/DirAurora.jsx", error: String((e && e.message) || e) }); }

// explorations/DirDaylight.jsx
try { (() => {
// Direction 1 — DAYLIGHT · luminous light, clinical-premium
function DirDaylight() {
  const C = '#1F3CFF',
    C2 = '#00B8FF';
  const r = 70,
    circ = 2 * Math.PI * r,
    pct = 0.88;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      position: 'relative',
      background: 'linear-gradient(180deg,#EEF1F6,#E2E7EE)',
      fontFamily: "'Inter',system-ui,sans-serif",
      color: '#0C0E14',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("style", null, `
        .dl-grid::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(12,14,20,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(12,14,20,.035) 1px,transparent 1px);background-size:40px 40px;mask-image:radial-gradient(circle at 50% 30%,#000,transparent 75%);-webkit-mask-image:radial-gradient(circle at 50% 30%,#000,transparent 75%);}
        .dl-card{background:#fff;border:1px solid rgba(12,14,20,.05);border-radius:26px;box-shadow:0 8px 28px rgba(17,24,39,.07);}
        .dl-eyebrow{font-family:'Space Grotesk';font-weight:700;font-size:11px;letter-spacing:.18em;color:${C};text-transform:uppercase;}
        .dl-disp{font-family:'Space Grotesk';font-weight:300;letter-spacing:-.04em;}
        .dl-lbl{font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#9AA0AB;}
      `), /*#__PURE__*/React.createElement("div", {
    className: "dl-grid",
    style: {
      position: 'absolute',
      inset: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 28px 0',
      fontFamily: "'Space Grotesk'",
      fontWeight: 600,
      fontSize: '14px'
    }
  }, /*#__PURE__*/React.createElement("span", null, "9:41"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: '5px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "11",
    viewBox: "0 0 17 11",
    fill: "#0C0E14"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7",
    width: "3",
    height: "4",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.5",
    y: "5",
    width: "3",
    height: "6",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "2.5",
    width: "3",
    height: "8.5",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13.5",
    y: "0",
    width: "3",
    height: "11",
    rx: "1"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "12",
    viewBox: "0 0 25 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "21",
    height: "11",
    rx: "3",
    stroke: "#0C0E14",
    opacity: "0.4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "16",
    height: "8",
    rx: "1.5",
    fill: "#0C0E14"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "23",
    y: "4",
    width: "1.5",
    height: "4",
    rx: "0.75",
    fill: "#0C0E14",
    opacity: "0.4"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '20px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '18px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "dl-eyebrow"
  }, "Mission Control"), /*#__PURE__*/React.createElement("h1", {
    className: "dl-disp",
    style: {
      fontSize: '30px',
      marginTop: '2px'
    }
  }, "Daniel", /*#__PURE__*/React.createElement("span", {
    style: {
      color: C
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '12.5px',
      color: '#71757F'
    }
  }, "Saturday, Jun 14")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '42px',
      height: '42px',
      borderRadius: '50%',
      background: '#0C0E14',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Space Grotesk'",
      fontWeight: 600,
      fontSize: '14px'
    }
  }, "DA")), /*#__PURE__*/React.createElement("div", {
    className: "dl-card",
    style: {
      padding: '24px',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '160px',
      height: '160px',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "160",
    height: "160",
    viewBox: "0 0 160 160"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "dlg",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: C
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: C2
  }))), /*#__PURE__*/React.createElement("circle", {
    cx: "80",
    cy: "80",
    r: r,
    fill: "none",
    stroke: "#E7EAF0",
    strokeWidth: "12"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "80",
    cy: "80",
    r: r,
    fill: "none",
    stroke: "url(#dlg)",
    strokeWidth: "12",
    strokeLinecap: "round",
    strokeDasharray: circ,
    strokeDashoffset: circ * (1 - pct),
    transform: "rotate(-90 80 80)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dl-disp",
    style: {
      fontSize: '46px',
      lineHeight: 1
    }
  }, "88"), /*#__PURE__*/React.createElement("span", {
    className: "dl-lbl",
    style: {
      color: C,
      marginTop: '2px'
    }
  }, "Ready"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "dl-lbl"
  }, "Readiness"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '14px',
      color: '#3A3E47',
      lineHeight: 1.5,
      marginTop: '6px'
    }
  }, "Sleep banked, joints quiet. ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#0C0E14'
    }
  }, "Green light"), " on today's plan."))), /*#__PURE__*/React.createElement("div", {
    className: "dl-card",
    style: {
      padding: '22px 24px',
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dl-disp",
    style: {
      fontSize: '58px',
      lineHeight: 1
    }
  }, "D", /*#__PURE__*/React.createElement("span", {
    style: {
      color: C
    }
  }, "\u2011"), "128"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dl-eyebrow"
  }, "Yom Sayarot"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '12px',
      color: '#71757F'
    }
  }, "The Yoke Block \xB7 Wk 2/4"))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '8px',
      borderRadius: '99px',
      background: '#E7EAF0',
      marginTop: '16px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '62%',
      height: '100%',
      borderRadius: '99px',
      background: `linear-gradient(90deg,${C},${C2})`
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dl-card",
    style: {
      padding: '20px 22px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "dl-eyebrow"
  }, "Today's Mission"), /*#__PURE__*/React.createElement("h2", {
    className: "dl-disp",
    style: {
      fontSize: '24px',
      marginTop: '6px'
    }
  }, "The Heavy Trunk"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12.5px',
      color: '#71757F'
    }
  }, "6 exercises \xB7 90 min")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '46px',
      height: '46px',
      borderRadius: '50%',
      background: C,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: `0 6px 16px ${C}55`
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M12 5l7 7-7 7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))))));
}
Object.assign(window, {
  DirDaylight
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "explorations/DirDaylight.jsx", error: String((e && e.message) || e) }); }

// explorations/DirPulse.jsx
try { (() => {
// Direction 3 — PULSE · warm heat-gradient energy, data-as-art
function DirPulse() {
  const r = 70,
    circ = 2 * Math.PI * r,
    pct = 0.88;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      position: 'relative',
      background: 'radial-gradient(120% 90% at 50% 115%, #3A1206 0%, #160A0C 45%, #0B0A0E 100%)',
      fontFamily: "'Inter',system-ui,sans-serif",
      color: '#FFF6ED',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("style", null, `
        .pl-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,150,80,.14);border-radius:24px;box-shadow:inset 0 1px 1px rgba(255,255,255,.05);}
        .pl-eyebrow{font-family:'Space Grotesk';font-weight:700;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#FF7A2F;}
        .pl-disp{font-family:'Space Grotesk';font-weight:300;letter-spacing:-.04em;}
        .pl-lbl{font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,246,237,.4);}
        .pl-heat{background:linear-gradient(120deg,#FFC53D,#FF6A1F 55%,#FF1E56);-webkit-background-clip:text;background-clip:text;color:transparent;}
      `), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '-40px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      background: 'radial-gradient(circle,#FF4D0A,transparent 70%)',
      filter: 'blur(50px)',
      opacity: .35
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 28px 0',
      fontFamily: "'Space Grotesk'",
      fontWeight: 600,
      fontSize: '14px'
    }
  }, /*#__PURE__*/React.createElement("span", null, "9:41"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: '5px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "11",
    viewBox: "0 0 17 11",
    fill: "#FFF6ED"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7",
    width: "3",
    height: "4",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.5",
    y: "5",
    width: "3",
    height: "6",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "2.5",
    width: "3",
    height: "8.5",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13.5",
    y: "0",
    width: "3",
    height: "11",
    rx: "1"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "12",
    viewBox: "0 0 25 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "21",
    height: "11",
    rx: "3",
    stroke: "#FFF6ED",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "16",
    height: "8",
    rx: "1.5",
    fill: "#FFF6ED"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "23",
    y: "4",
    width: "1.5",
    height: "4",
    rx: "0.75",
    fill: "#FFF6ED",
    opacity: "0.5"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '20px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '18px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "pl-eyebrow"
  }, "Mission Control"), /*#__PURE__*/React.createElement("h1", {
    className: "pl-disp",
    style: {
      fontSize: '30px',
      marginTop: '2px'
    }
  }, "Daniel", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#FF7A2F'
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '12.5px',
      color: 'rgba(255,246,237,.55)'
    }
  }, "Saturday, Jun 14")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '42px',
      height: '42px',
      borderRadius: '50%',
      border: '1px solid rgba(255,150,80,.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Space Grotesk'",
      fontWeight: 600,
      fontSize: '14px',
      color: '#FF7A2F'
    }
  }, "DA")), /*#__PURE__*/React.createElement("div", {
    className: "pl-card",
    style: {
      padding: '28px 24px 24px',
      marginBottom: '16px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '184px',
      height: '184px',
      margin: '0 auto 6px'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "184",
    height: "184",
    viewBox: "0 0 160 160",
    style: {
      width: '184px',
      height: '184px'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "plg",
    x1: "0",
    y1: "1",
    x2: "1",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#FF1E56"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: ".5",
    stopColor: "#FF6A1F"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#FFC53D"
  }))), /*#__PURE__*/React.createElement("circle", {
    cx: "80",
    cy: "80",
    r: r,
    fill: "none",
    stroke: "rgba(255,255,255,.07)",
    strokeWidth: "13"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "80",
    cy: "80",
    r: r,
    fill: "none",
    stroke: "url(#plg)",
    strokeWidth: "13",
    strokeLinecap: "round",
    strokeDasharray: circ,
    strokeDashoffset: circ * (1 - pct),
    transform: "rotate(-90 80 80)",
    style: {
      filter: 'drop-shadow(0 0 10px rgba(255,90,30,.6))'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pl-disp pl-heat",
    style: {
      fontSize: '54px',
      lineHeight: 1
    }
  }, "88"), /*#__PURE__*/React.createElement("span", {
    className: "pl-eyebrow",
    style: {
      marginTop: '2px'
    }
  }, "Full Send"))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '14px',
      color: 'rgba(255,246,237,.72)',
      lineHeight: 1.5,
      maxWidth: '260px',
      margin: '0 auto'
    }
  }, "Sleep banked, joints quiet. ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#FFF6ED'
    }
  }, "Green light"), " on today's plan.")), /*#__PURE__*/React.createElement("div", {
    className: "pl-card",
    style: {
      padding: '22px 24px',
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pl-disp",
    style: {
      fontSize: '58px',
      lineHeight: 1
    }
  }, "D", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#FF7A2F'
    }
  }, "\u2011"), "128"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pl-eyebrow"
  }, "Yom Sayarot"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '12px',
      color: 'rgba(255,246,237,.55)'
    }
  }, "The Yoke Block \xB7 Wk 2/4"))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '8px',
      borderRadius: '99px',
      background: 'rgba(255,255,255,.07)',
      marginTop: '16px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '62%',
      height: '100%',
      borderRadius: '99px',
      background: 'linear-gradient(90deg,#FF1E56,#FF6A1F,#FFC53D)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "pl-card",
    style: {
      padding: '20px 22px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "pl-eyebrow"
  }, "Today's Mission"), /*#__PURE__*/React.createElement("h2", {
    className: "pl-disp",
    style: {
      fontSize: '24px',
      marginTop: '6px'
    }
  }, "The Heavy Trunk"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12.5px',
      color: 'rgba(255,246,237,.55)'
    }
  }, "6 exercises \xB7 90 min")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '46px',
      height: '46px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg,#FF6A1F,#FF1E56)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 6px 18px rgba(255,90,30,.45)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#160A0C",
    strokeWidth: "2.2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M12 5l7 7-7 7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))))));
}
Object.assign(window, {
  DirPulse
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "explorations/DirPulse.jsx", error: String((e && e.message) || e) }); }

// explorations/design-canvas.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Exports (to window): DesignCanvas, DCSection, DCArtboard, DCPostIt.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>
//
// Artboards are static design frames, not scroll regions — never use
// height: 100% + overflow: auto/scroll on inner elements; size each artboard
// to fit its content (explicit pixel height, or let it grow).
/* END USAGE */

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-omelette-chrome": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "explorations/design-canvas.jsx", error: String((e && e.message) || e) }); }

// ui_kits/apex-os/FocusScreen.jsx
try { (() => {
// Apex OS — Focus Mode (live session) screen
function FocusScreen({
  onExit
}) {
  const {
    GlassCard,
    Badge,
    Stepper,
    Button,
    ProgressBar
  } = window.ApexOSDesignSystem_1864eb;
  const {
    useState,
    useEffect
  } = React;
  const D = window.ApexData;
  const [weight, setWeight] = useState(40);
  const [rest, setRest] = useState(90);
  const [resting, setResting] = useState(false);
  const active = D.session.exercises.find(e => e.active) || D.session.exercises[1];
  const doneCount = D.session.exercises.filter(e => e.done).length;
  useEffect(() => {
    if (!resting) return;
    if (rest <= 0) {
      setResting(false);
      setRest(90);
      return;
    }
    const t = setTimeout(() => setRest(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [resting, rest]);
  const mmss = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 24px 120px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.18em',
      color: 'var(--cyan)'
    }
  }, "FOCUS MODE"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: '24px',
      fontWeight: 300,
      letterSpacing: '-0.02em'
    }
  }, D.session.name)), /*#__PURE__*/React.createElement("button", {
    onClick: onExit,
    "aria-label": "Exit session",
    style: {
      background: 'none',
      border: '1px solid var(--surface-border)',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      color: 'var(--text-secondary)',
      cursor: 'pointer',
      fontSize: '15px'
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '10px',
      fontWeight: 500,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: 'var(--muted)'
    }
  }, "Session"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '12px',
      color: 'var(--cyan)'
    }
  }, doneCount, "/", D.session.exercises.length, " done")), /*#__PURE__*/React.createElement(ProgressBar, {
    value: doneCount / D.session.exercises.length * 100,
    height: 4,
    showDot: false
  })), /*#__PURE__*/React.createElement(GlassCard, {
    padding: 24,
    glow: true,
    style: {
      marginBottom: '20px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "strength"
  }, "Main \xB7 Set 2 of 3"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: '24px',
      fontWeight: 300,
      margin: '12px 0 4px',
      letterSpacing: '-0.02em'
    }
  }, active.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '13px',
      color: 'var(--text-secondary)'
    }
  }, active.detail), resting ? /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '24px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: '80px',
      lineHeight: 1,
      letterSpacing: '-0.05em',
      color: 'var(--cyan)',
      textShadow: 'var(--cyan-glow)'
    }
  }, mmss(rest)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '11px',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: 'var(--muted)',
      marginTop: '8px'
    }
  }, "Rest \xB7 Recover")) : /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '24px 0'
    }
  }, /*#__PURE__*/React.createElement(Stepper, {
    label: "Load",
    value: weight,
    onChange: setWeight,
    min: 0,
    max: 120,
    step: 2.5,
    unit: "kg"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "solid",
    size: "lg",
    fullWidth: true,
    onClick: () => setResting(r => !r)
  }, resting ? 'Skip Rest' : 'Complete Set')), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '10px',
      fontWeight: 500,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: 'var(--muted)',
      display: 'block',
      marginBottom: '12px'
    }
  }, "Exercise Queue"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }
  }, D.session.exercises.map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 14px',
      borderRadius: 'var(--radius-md)',
      background: e.active ? 'var(--cyan-dim)' : 'rgba(255,255,255,0.02)',
      border: `1px solid ${e.active ? 'rgba(127,200,255,0.3)' : 'var(--surface-border)'}`,
      opacity: e.done ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '22px',
      height: '22px',
      borderRadius: '50%',
      border: `1px solid ${e.done ? 'var(--cyan)' : 'var(--surface-border-light)'}`,
      background: e.done ? 'var(--cyan)' : 'transparent',
      color: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      flexShrink: 0
    }
  }, e.done ? '✓' : ''), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: '14px',
      textDecoration: e.done ? 'line-through' : 'none'
    }
  }, e.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      color: 'var(--muted)'
    }
  }, e.detail))))));
}
Object.assign(window, {
  FocusScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/apex-os/FocusScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/apex-os/HomeScreen.jsx
try { (() => {
// Apex OS — Mission Control (home) screen
function HomeScreen({
  onOpenCheckin,
  onStartSession
}) {
  const {
    GlassCard,
    ProgressBar,
    StatReadout,
    ReadinessRing
  } = window.ApexOSDesignSystem_1864eb;
  const D = window.ApexData;
  const m = D.mission;
  const now = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const cellColor = v => v === 0 ? 'rgba(255,255,255,0.03)' : v === 1 ? 'rgba(127,200,255,0.2)' : v === 2 ? 'rgba(127,200,255,0.5)' : 'var(--cyan)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 24px 120px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '28px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.18em',
      color: 'var(--cyan)'
    }
  }, "MISSION CONTROL"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: '32px',
      fontWeight: 300,
      marginTop: '2px',
      letterSpacing: '-0.04em'
    }
  }, D.profile.name.split(' ')[0], /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--cyan)',
      textShadow: '0 0 10px rgba(127,200,255,0.5)'
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '13px',
      color: 'var(--text-secondary)',
      fontWeight: 300
    }
  }, dayNames[now.getDay()], ", ", months[now.getMonth()], " ", now.getDate())), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '44px',
      height: '44px',
      borderRadius: '50%',
      border: '1px solid var(--surface-border-light)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      color: 'var(--text)',
      fontSize: '15px'
    }
  }, D.profile.name.split(' ').map(s => s[0]).join(''))), /*#__PURE__*/React.createElement(GlassCard, {
    onClick: onOpenCheckin,
    padding: 24,
    style: {
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    }
  }, /*#__PURE__*/React.createElement(ReadinessRing, {
    value: D.readiness.score,
    label: "Ready",
    size: 150,
    id: "home"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '10px',
      fontWeight: 600,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: 'var(--muted)'
    }
  }, "Readiness"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '14px',
      color: 'var(--text-secondary)',
      lineHeight: 1.5,
      marginTop: '6px'
    }
  }, "Sleep banked, joints quiet. ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text)'
    }
  }, "Green light"), " on today\u2019s plan."))), /*#__PURE__*/React.createElement(GlassCard, {
    padding: 22,
    style: {
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: '58px',
      lineHeight: 1,
      letterSpacing: '-0.04em'
    }
  }, "D", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--cyan)'
    }
  }, "-"), m.daysToTarget), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '12px',
      letterSpacing: '0.15em',
      color: 'var(--cyan)'
    }
  }, m.targetLabel), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '12px',
      color: 'var(--text-secondary)'
    }
  }, m.phase, " \xB7 Wk ", m.weekInPhase, "/", m.phaseTotalWeeks))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '14px'
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: m.progressPct
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '8px'
    }
  }, m.phases.map((p, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      fontSize: '9px',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: i === m.phaseIndex ? 'var(--cyan)' : 'var(--muted)',
      fontWeight: i === m.phaseIndex ? 700 : 400,
      fontFamily: 'var(--font-display)'
    }
  }, p)))), /*#__PURE__*/React.createElement(GlassCard, {
    onClick: onStartSession,
    padding: 24,
    style: {
      marginBottom: '28px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '10px',
      fontWeight: 500,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: 'var(--cyan)'
    }
  }, "TODAY'S MISSION"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: '28px',
      fontWeight: 300,
      marginTop: '8px',
      letterSpacing: '-0.02em'
    }
  }, D.today.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '13px',
      color: 'var(--text-secondary)'
    }
  }, D.today.exercises, " exercises \xB7 ", D.today.durationMin, " min")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: '1px solid var(--surface-border-light)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M12 5l7 7-7 7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '36px',
      padding: '0 4px'
    }
  }, /*#__PURE__*/React.createElement(StatReadout, {
    label: "Week",
    value: D.stats.week,
    unit: `/${D.stats.weekTarget}`
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '1px',
      background: 'var(--surface-border)'
    }
  }), /*#__PURE__*/React.createElement(StatReadout, {
    label: "Streak",
    value: D.stats.streak,
    unit: "d"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '1px',
      background: 'var(--surface-border)'
    }
  }), /*#__PURE__*/React.createElement(StatReadout, {
    label: "Total",
    value: D.stats.total,
    accent: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '10px',
      fontWeight: 500,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: 'var(--muted)'
    }
  }, "CONSISTENCY"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginTop: '16px'
    }
  }, D.heatmap.map((row, ri) => /*#__PURE__*/React.createElement("div", {
    key: ri,
    style: {
      display: 'grid',
      gridTemplateColumns: `20px repeat(${row.length}, 1fr)`,
      gap: '8px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '10px',
      color: 'var(--muted)'
    }
  }, D.heatmapDays[ri]), row.map((cell, ci) => /*#__PURE__*/React.createElement("div", {
    key: ci,
    style: {
      aspectRatio: '1/1',
      borderRadius: '4px',
      background: cellColor(cell),
      boxShadow: cell === 3 ? '0 0 8px rgba(127,200,255,0.4)' : 'none'
    }
  })))))));
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/apex-os/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/apex-os/MorningCheckin.jsx
try { (() => {
// Apex OS — Morning Check-in (readiness gate) overlay
function MorningCheckin({
  onComplete,
  onClose
}) {
  const {
    Button,
    SegmentedControl
  } = window.ApexOSDesignSystem_1864eb;
  const {
    useState
  } = React;
  const [step, setStep] = useState(0);
  const questions = [{
    key: 'sleep',
    label: 'Sleep Quality',
    hint: 'How rested do you feel?',
    opts: [{
      key: 'poor',
      label: 'Poor'
    }, {
      key: 'ok',
      label: 'OK'
    }, {
      key: 'great',
      label: 'Great'
    }]
  }, {
    key: 'soreness',
    label: 'Muscle Soreness',
    hint: 'Residual fatigue from last session',
    opts: [{
      key: 'high',
      label: 'High'
    }, {
      key: 'mild',
      label: 'Mild'
    }, {
      key: 'none',
      label: 'None'
    }]
  }, {
    key: 'stress',
    label: 'Mental Load',
    hint: 'Life stress outside training',
    opts: [{
      key: 'high',
      label: 'High'
    }, {
      key: 'normal',
      label: 'Normal'
    }, {
      key: 'low',
      label: 'Low'
    }]
  }];
  const [answers, setAnswers] = useState({});
  const q = questions[step];
  const isLast = step === questions.length - 1;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 100,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      display: 'flex',
      flexDirection: 'column',
      padding: '32px 24px',
      animation: 'fadeIn 0.4s ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '40px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.18em',
      color: 'var(--cyan)'
    }
  }, "READINESS CHECK"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      background: 'none',
      border: '1px solid var(--surface-border)',
      borderRadius: '50%',
      width: '36px',
      height: '36px',
      color: 'var(--text-secondary)',
      cursor: 'pointer'
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      marginBottom: '40px'
    }
  }, questions.map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: '3px',
      borderRadius: '2px',
      background: i <= step ? 'var(--cyan)' : 'var(--surface-border)',
      boxShadow: i <= step ? '0 0 8px rgba(127,200,255,0.5)' : 'none',
      transition: 'all 0.4s ease'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    key: step
  }, /*#__PURE__*/React.createElement("div", {
    className: "anim-fade-in-up"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '10px',
      fontWeight: 500,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: 'var(--muted)'
    }
  }, "0", step + 1, " / 0", questions.length), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: '34px',
      fontWeight: 300,
      letterSpacing: '-0.03em',
      margin: '8px 0 6px'
    }
  }, q.label), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '14px',
      color: 'var(--text-secondary)',
      marginBottom: '32px'
    }
  }, q.hint), /*#__PURE__*/React.createElement(SegmentedControl, {
    value: answers[q.key] || '',
    onChange: v => setAnswers(a => ({
      ...a,
      [q.key]: v
    })),
    options: q.opts
  }))), /*#__PURE__*/React.createElement(Button, {
    variant: answers[q.key] ? 'solid' : 'primary',
    size: "lg",
    fullWidth: true,
    disabled: !answers[q.key],
    onClick: () => {
      if (isLast) onComplete();else setStep(s => s + 1);
    }
  }, isLast ? 'Calculate Readiness' : 'Continue'));
}
Object.assign(window, {
  MorningCheckin
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/apex-os/MorningCheckin.jsx", error: String((e && e.message) || e) }); }

// ui_kits/apex-os/RecordsScreen.jsx
try { (() => {
// Apex OS — Records screen
function RecordsScreen() {
  const {
    GlassCard,
    Badge,
    SegmentedControl,
    StatReadout
  } = window.ApexOSDesignSystem_1864eb;
  const {
    useState
  } = React;
  const D = window.ApexData;
  const [view, setView] = useState('benchmarks');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 24px 120px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: '40px',
      fontWeight: 300,
      letterSpacing: '-0.04em'
    }
  }, "Records", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--cyan)',
      textShadow: '0 0 10px rgba(127,200,255,0.5)'
    }
  }, ".")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '44px',
      height: '44px',
      borderRadius: '50%',
      border: '1px solid var(--surface-border-light)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: '15px'
    }
  }, D.profile.name.split(' ').map(s => s[0]).join(''))), /*#__PURE__*/React.createElement(GlassCard, {
    padding: 18,
    style: {
      marginBottom: '24px',
      borderLeft: '3px solid var(--cyan)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'var(--cyan-dim)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      fontSize: '18px'
    }
  }, "\u26A1"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '12px',
      letterSpacing: '0.1em',
      color: 'var(--cyan)',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: '4px'
    }
  }, "System Insight"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '14px',
      color: 'var(--text-secondary)',
      lineHeight: 1.5
    }
  }, "Heavy squat trend improving. Estimated 1RM up 4% this microcycle \u2014 keep the load progression.")))), /*#__PURE__*/React.createElement(SegmentedControl, {
    value: view,
    onChange: setView,
    options: [{
      key: 'history',
      label: 'History'
    }, {
      key: 'benchmarks',
      label: 'Benchmarks'
    }],
    style: {
      marginBottom: '24px'
    }
  }), view === 'benchmarks' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '14px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: '18px',
      fontWeight: 700
    }
  }, "Benchmarks"), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'transparent',
      border: '1px solid var(--cyan)',
      color: 'var(--cyan)',
      borderRadius: 'var(--radius-pill)',
      padding: '6px 12px',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: '11px',
      textTransform: 'uppercase',
      cursor: 'pointer'
    }
  }, "+ Add")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  }, D.benchmarks.map((b, i) => /*#__PURE__*/React.createElement(GlassCard, {
    key: i,
    padding: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      background: '#1A1D24',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      flexShrink: 0
    }
  }, b.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '4px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '16px'
    }
  }, b.label), /*#__PURE__*/React.createElement(Badge, {
    tone: b.tone
  }, b.cat)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '20px',
      color: 'var(--cyan)'
    }
  }, b.value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      color: 'var(--muted)'
    }
  }, b.unit)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      color: b.positive ? 'var(--cyan)' : 'var(--orange)',
      fontWeight: 500
    }
  }, b.trend)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'var(--cyan)',
      color: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      boxShadow: '0 4px 12px rgba(127,200,255,0.2)'
    }
  }, "+"))))), /*#__PURE__*/React.createElement(GlassCard, {
    padding: 20,
    style: {
      marginTop: '12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '10px',
      fontWeight: 500,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: 'var(--muted)',
      display: 'block',
      marginBottom: '8px'
    }
  }, "Work Capacity"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: '64px',
      lineHeight: 1,
      letterSpacing: '-0.02em'
    }
  }, D.workCapacity.value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: '18px',
      color: 'var(--muted)'
    }
  }, D.workCapacity.unit)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      marginTop: '6px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--cyan)',
      fontSize: '13px'
    }
  }, "\u2197"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '13px',
      color: 'var(--cyan)'
    }
  }, D.workCapacity.status)))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }
  }, [{
    name: 'Lower Body Power',
    date: 'May 5',
    sets: 12,
    min: 49
  }, {
    name: 'Upper Body Push',
    date: 'May 7',
    sets: 10,
    min: 43
  }, {
    name: 'Heavy Legs',
    date: 'May 9',
    sets: 13,
    min: 58
  }].map((s, i) => /*#__PURE__*/React.createElement(GlassCard, {
    key: i,
    padding: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '15px'
    }
  }, s.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      color: 'var(--text-secondary)'
    }
  }, s.date, " \xB7 ", s.sets, " sets")), /*#__PURE__*/React.createElement(StatReadout, {
    label: "Duration",
    value: s.min,
    unit: "min",
    size: 24,
    align: "center"
  }))))));
}
Object.assign(window, {
  RecordsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/apex-os/RecordsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/apex-os/data.js
try { (() => {
// Apex OS — UI kit sample data (lifted from the production seed data)
window.ApexData = {
  profile: {
    name: 'Daniel Avraham'
  },
  mission: {
    daysToTarget: 128,
    targetLabel: 'YOM SAYAROT',
    phase: 'The Yoke Block',
    weekInPhase: 2,
    phaseTotalWeeks: 4,
    progressPct: 62,
    phases: ['BUILD', 'IMPACT', 'B3', 'B4', 'CONV', 'TAPER'],
    phaseIndex: 3
  },
  readiness: {
    light: 'green',
    score: 88,
    title: 'GREEN — FULL SEND',
    recommendation: 'Sleep banked, joints quiet. Green light on today\u2019s plan.'
  },
  today: {
    name: 'The Heavy Trunk',
    exercises: 6,
    durationMin: 90
  },
  stats: {
    week: 4,
    weekTarget: 5,
    streak: 6,
    total: 128
  },
  benchmarks: [{
    label: '3000m Run',
    value: '14:30',
    unit: 'time',
    tone: 'endurance',
    cat: 'Endurance',
    icon: '\uD83C\uDFC3',
    trend: '-1.5% vs last month',
    positive: true
  }, {
    label: 'Max Pull-Ups',
    value: '12',
    unit: 'reps',
    tone: 'bodyweight',
    cat: 'Bodyweight',
    icon: '\uD83D\uDCAA',
    trend: '+5.0% vs last month',
    positive: true
  }, {
    label: 'Bench Press 1RM',
    value: '100',
    unit: 'kg',
    tone: 'strength',
    cat: 'Strength',
    icon: '\uD83C\uDFCB\uFE0F',
    trend: '+8.1%',
    positive: true
  }, {
    label: 'Back Squat 1RM',
    value: '120',
    unit: 'kg',
    tone: 'strength',
    cat: 'Strength',
    icon: '\uD83C\uDFCB\uFE0F',
    trend: '+4.2%',
    positive: true
  }, {
    label: 'Deadlift 1RM',
    value: '140',
    unit: 'kg',
    tone: 'strength',
    cat: 'Strength',
    icon: '\uD83C\uDFCB\uFE0F',
    trend: '-2.1%',
    positive: false
  }],
  workCapacity: {
    value: 42,
    unit: 'MIN',
    status: 'Optimal zone'
  },
  session: {
    name: 'The Heavy Trunk',
    exercises: [{
      name: 'Chest-Supported DB Row',
      detail: '4 \u00D7 10 \u00B7 32kg',
      done: true
    }, {
      name: 'Flat DB Bench Press',
      detail: '3 \u00D7 10 \u00B7 40kg',
      done: false,
      active: true
    }, {
      name: 'Single Leg DB RDL',
      detail: '3 \u00D7 8 \u00B7 24kg',
      done: false
    }, {
      name: 'Heavy Suitcase Carries',
      detail: '3 \u00D7 30m \u00B7 24kg',
      done: false
    }, {
      name: 'Side Plank',
      detail: '2 \u00D7 45s',
      done: false
    }]
  },
  // 5 rows (Mon..Fri) x weeks, intensity 0-3
  heatmap: [[0, 2, 3, 1, 2, 3], [3, 1, 2, 3, 1, 2], [0, 0, 1, 2, 3, 1], [2, 3, 1, 0, 2, 3], [1, 2, 3, 2, 1, 0]],
  heatmapDays: ['M', 'T', 'W', 'T', 'F']
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/apex-os/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Stepper = __ds_scope.Stepper;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.ReadinessLight = __ds_scope.ReadinessLight;

__ds_ns.ReadinessRing = __ds_scope.ReadinessRing;

__ds_ns.StatReadout = __ds_scope.StatReadout;

__ds_ns.BottomNav = __ds_scope.BottomNav;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.GlassCard = __ds_scope.GlassCard;

})();
