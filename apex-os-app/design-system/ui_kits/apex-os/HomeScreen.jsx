// Apex OS — Mission Control (home) screen
function HomeScreen({ onOpenCheckin, onStartSession }) {
  const { GlassCard, ProgressBar, StatReadout, ReadinessRing } = window.ApexOSDesignSystem_1864eb;
  const D = window.ApexData;
  const m = D.mission;
  const now = new Date();
  const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const cellColor = (v) =>
    v === 0 ? 'rgba(255,255,255,0.03)' :
    v === 1 ? 'rgba(127,200,255,0.2)' :
    v === 2 ? 'rgba(127,200,255,0.5)' : 'var(--cyan)';

  return (
    <div style={{ padding: '24px 24px 120px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
        <div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', color: 'var(--cyan)' }}>MISSION CONTROL</span>
          <h1 style={{ fontSize: '32px', fontWeight: 300, marginTop: '2px', letterSpacing: '-0.04em' }}>
            {D.profile.name.split(' ')[0]}<span style={{ color: 'var(--cyan)', textShadow: '0 0 10px rgba(127,200,255,0.5)' }}>.</span>
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 300 }}>{dayNames[now.getDay()]}, {months[now.getMonth()]} {now.getDate()}</p>
        </div>
        <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid var(--surface-border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text)', fontSize: '15px' }}>
          {D.profile.name.split(' ').map(s => s[0]).join('')}
        </div>
      </div>

      {/* Readiness ring — hero */}
      <GlassCard onClick={onOpenCheckin} padding={24} style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <ReadinessRing value={D.readiness.score} label="Ready" size={150} id="home" />
        <div>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>Readiness</span>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '6px' }}>
            Sleep banked, joints quiet. <strong style={{ color: 'var(--text)' }}>Green light</strong> on today’s plan.
          </p>
        </div>
      </GlassCard>

      {/* Countdown hero */}
      <GlassCard padding={22} style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '58px', lineHeight: 1, letterSpacing: '-0.04em' }}>
            D<span style={{ color: 'var(--cyan)' }}>-</span>{m.daysToTarget}
          </span>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.15em', color: 'var(--cyan)' }}>{m.targetLabel}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{m.phase} · Wk {m.weekInPhase}/{m.phaseTotalWeeks}</div>
          </div>
        </div>
        <div style={{ marginTop: '14px' }}>
          <ProgressBar value={m.progressPct} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
          {m.phases.map((p, i) => (
            <span key={i} style={{
              fontSize: '9px', letterSpacing: '0.06em', textTransform: 'uppercase',
              color: i === m.phaseIndex ? 'var(--cyan)' : 'var(--muted)',
              fontWeight: i === m.phaseIndex ? 700 : 400, fontFamily: 'var(--font-display)',
            }}>{p}</span>
          ))}
        </div>
      </GlassCard>

      {/* Today's mission */}
      <GlassCard onClick={onStartSession} padding={24} style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyan)' }}>TODAY'S MISSION</span>
            <h2 style={{ fontSize: '28px', fontWeight: 300, marginTop: '8px', letterSpacing: '-0.02em' }}>{D.today.name}</h2>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{D.today.exercises} exercises · {D.today.durationMin} min</span>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--surface-border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </GlassCard>

      {/* Stats row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '36px', padding: '0 4px' }}>
        <StatReadout label="Week" value={D.stats.week} unit={`/${D.stats.weekTarget}`} />
        <div style={{ width: '1px', background: 'var(--surface-border)' }} />
        <StatReadout label="Streak" value={D.stats.streak} unit="d" />
        <div style={{ width: '1px', background: 'var(--surface-border)' }} />
        <StatReadout label="Total" value={D.stats.total} accent />
      </div>

      {/* Consistency heatmap */}
      <div style={{ padding: '0 4px' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>CONSISTENCY</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
          {D.heatmap.map((row, ri) => (
            <div key={ri} style={{ display: 'grid', gridTemplateColumns: `20px repeat(${row.length}, 1fr)`, gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: 'var(--muted)' }}>{D.heatmapDays[ri]}</span>
              {row.map((cell, ci) => (
                <div key={ci} style={{ aspectRatio: '1/1', borderRadius: '4px', background: cellColor(cell), boxShadow: cell === 3 ? '0 0 8px rgba(127,200,255,0.4)' : 'none' }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen });
