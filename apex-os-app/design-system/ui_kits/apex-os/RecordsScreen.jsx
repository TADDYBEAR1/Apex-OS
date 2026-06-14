// Apex OS — Records screen
function RecordsScreen() {
  const { GlassCard, Badge, SegmentedControl, StatReadout } = window.ApexOSDesignSystem_1864eb;
  const { useState } = React;
  const D = window.ApexData;
  const [view, setView] = useState('benchmarks');

  return (
    <div style={{ padding: '16px 24px 120px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 300, letterSpacing: '-0.04em' }}>Records<span style={{ color: 'var(--cyan)', textShadow: '0 0 10px rgba(127,200,255,0.5)' }}>.</span></h1>
        <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid var(--surface-border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px' }}>
          {D.profile.name.split(' ').map(s => s[0]).join('')}
        </div>
      </div>

      {/* Smart insight */}
      <GlassCard padding={18} style={{ marginBottom: '24px', borderLeft: '3px solid var(--cyan)' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--cyan-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '18px' }}>⚡</div>
          <div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', color: 'var(--cyan)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>System Insight</span>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Heavy squat trend improving. Estimated 1RM up 4% this microcycle — keep the load progression.</p>
          </div>
        </div>
      </GlassCard>

      <SegmentedControl
        value={view}
        onChange={setView}
        options={[{ key: 'history', label: 'History' }, { key: 'benchmarks', label: 'Benchmarks' }]}
        style={{ marginBottom: '24px' }}
      />

      {view === 'benchmarks' ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Benchmarks</h2>
            <button style={{ background: 'transparent', border: '1px solid var(--cyan)', color: 'var(--cyan)', borderRadius: 'var(--radius-pill)', padding: '6px 12px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', cursor: 'pointer' }}>+ Add</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {D.benchmarks.map((b, i) => (
              <GlassCard key={i} padding={16}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#1A1D24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{b.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px' }}>{b.label}</h3>
                      <Badge tone={b.tone}>{b.cat}</Badge>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px', color: 'var(--cyan)' }}>{b.value}</span>
                      <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{b.unit}</span>
                    </div>
                    <span style={{ fontSize: '12px', color: b.positive ? 'var(--cyan)' : 'var(--orange)', fontWeight: 500 }}>{b.trend}</span>
                  </div>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--cyan)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', boxShadow: '0 4px 12px rgba(127,200,255,0.2)' }}>+</div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Work capacity */}
          <GlassCard padding={20} style={{ marginTop: '12px' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>Work Capacity</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '64px', lineHeight: 1, letterSpacing: '-0.02em' }}>{D.workCapacity.value}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '18px', color: 'var(--muted)' }}>{D.workCapacity.unit}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
              <span style={{ color: 'var(--cyan)', fontSize: '13px' }}>↗</span>
              <span style={{ fontSize: '13px', color: 'var(--cyan)' }}>{D.workCapacity.status}</span>
            </div>
          </GlassCard>
        </>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { name: 'Lower Body Power', date: 'May 5', sets: 12, min: 49 },
            { name: 'Upper Body Push', date: 'May 7', sets: 10, min: 43 },
            { name: 'Heavy Legs', date: 'May 9', sets: 13, min: 58 },
          ].map((s, i) => (
            <GlassCard key={i} padding={16}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px' }}>{s.name}</h3>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{s.date} · {s.sets} sets</span>
                </div>
                <StatReadout label="Duration" value={s.min} unit="min" size={24} align="center" />
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { RecordsScreen });
