// Apex OS — Focus Mode (live session) screen
function FocusScreen({ onExit }) {
  const { GlassCard, Badge, Stepper, Button, ProgressBar } = window.ApexOSDesignSystem_1864eb;
  const { useState, useEffect } = React;
  const D = window.ApexData;
  const [weight, setWeight] = useState(40);
  const [rest, setRest] = useState(90);
  const [resting, setResting] = useState(false);
  const active = D.session.exercises.find(e => e.active) || D.session.exercises[1];
  const doneCount = D.session.exercises.filter(e => e.done).length;

  useEffect(() => {
    if (!resting) return;
    if (rest <= 0) { setResting(false); setRest(90); return; }
    const t = setTimeout(() => setRest(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [resting, rest]);

  const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div style={{ padding: '20px 24px 120px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', color: 'var(--cyan)' }}>FOCUS MODE</span>
          <h1 style={{ fontSize: '24px', fontWeight: 300, letterSpacing: '-0.02em' }}>{D.session.name}</h1>
        </div>
        <button onClick={onExit} aria-label="Exit session" style={{ background: 'none', border: '1px solid var(--surface-border)', borderRadius: '50%', width: '40px', height: '40px', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '15px' }}>✕</button>
      </div>

      {/* Session progress */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>Session</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '12px', color: 'var(--cyan)' }}>{doneCount}/{D.session.exercises.length} done</span>
        </div>
        <ProgressBar value={(doneCount / D.session.exercises.length) * 100} height={4} showDot={false} />
      </div>

      {/* Active exercise / rest timer */}
      <GlassCard padding={24} glow style={{ marginBottom: '20px', textAlign: 'center' }}>
        <Badge tone="strength">Main · Set 2 of 3</Badge>
        <h2 style={{ fontSize: '24px', fontWeight: 300, margin: '12px 0 4px', letterSpacing: '-0.02em' }}>{active.name}</h2>
        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{active.detail}</span>

        {resting ? (
          <div style={{ margin: '24px 0' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '80px', lineHeight: 1, letterSpacing: '-0.05em', color: 'var(--cyan)', textShadow: 'var(--cyan-glow)' }}>{mmss(rest)}</span>
            <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '8px' }}>Rest · Recover</p>
          </div>
        ) : (
          <div style={{ margin: '24px 0' }}>
            <Stepper label="Load" value={weight} onChange={setWeight} min={0} max={120} step={2.5} unit="kg" />
          </div>
        )}

        <Button variant="solid" size="lg" fullWidth onClick={() => setResting(r => !r)}>
          {resting ? 'Skip Rest' : 'Complete Set'}
        </Button>
      </GlassCard>

      {/* Up next list */}
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '12px' }}>Exercise Queue</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {D.session.exercises.map((e, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px',
            borderRadius: 'var(--radius-md)',
            background: e.active ? 'var(--cyan-dim)' : 'rgba(255,255,255,0.02)',
            border: `1px solid ${e.active ? 'rgba(127,200,255,0.3)' : 'var(--surface-border)'}`,
            opacity: e.done ? 0.5 : 1,
          }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: `1px solid ${e.done ? 'var(--cyan)' : 'var(--surface-border-light)'}`, background: e.done ? 'var(--cyan)' : 'transparent', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>{e.done ? '✓' : ''}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14px', textDecoration: e.done ? 'line-through' : 'none' }}>{e.name}</div>
              <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{e.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { FocusScreen });
