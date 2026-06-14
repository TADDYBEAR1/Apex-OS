// Apex OS — Morning Check-in (readiness gate) overlay
function MorningCheckin({ onComplete, onClose }) {
  const { Button, SegmentedControl } = window.ApexOSDesignSystem_1864eb;
  const { useState } = React;
  const [step, setStep] = useState(0);

  const questions = [
    { key: 'sleep', label: 'Sleep Quality', hint: 'How rested do you feel?', opts: [{ key: 'poor', label: 'Poor' }, { key: 'ok', label: 'OK' }, { key: 'great', label: 'Great' }] },
    { key: 'soreness', label: 'Muscle Soreness', hint: 'Residual fatigue from last session', opts: [{ key: 'high', label: 'High' }, { key: 'mild', label: 'Mild' }, { key: 'none', label: 'None' }] },
    { key: 'stress', label: 'Mental Load', hint: 'Life stress outside training', opts: [{ key: 'high', label: 'High' }, { key: 'normal', label: 'Normal' }, { key: 'low', label: 'Low' }] },
  ];
  const [answers, setAnswers] = useState({});
  const q = questions[step];
  const isLast = step === questions.length - 1;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      display: 'flex', flexDirection: 'column', padding: '32px 24px',
      animation: 'fadeIn 0.4s ease',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', color: 'var(--cyan)' }}>READINESS CHECK</span>
        <button onClick={onClose} aria-label="Close" style={{ background: 'none', border: '1px solid var(--surface-border)', borderRadius: '50%', width: '36px', height: '36px', color: 'var(--text-secondary)', cursor: 'pointer' }}>✕</button>
      </div>

      {/* progress dots */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '40px' }}>
        {questions.map((_, i) => (
          <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: i <= step ? 'var(--cyan)' : 'var(--surface-border)', boxShadow: i <= step ? '0 0 8px rgba(127,200,255,0.5)' : 'none', transition: 'all 0.4s ease' }} />
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }} key={step}>
        <div className="anim-fade-in-up">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>0{step + 1} / 0{questions.length}</span>
          <h2 style={{ fontSize: '34px', fontWeight: 300, letterSpacing: '-0.03em', margin: '8px 0 6px' }}>{q.label}</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '32px' }}>{q.hint}</p>
          <SegmentedControl
            value={answers[q.key] || ''}
            onChange={(v) => setAnswers(a => ({ ...a, [q.key]: v }))}
            options={q.opts}
          />
        </div>
      </div>

      <Button
        variant={answers[q.key] ? 'solid' : 'primary'}
        size="lg"
        fullWidth
        disabled={!answers[q.key]}
        onClick={() => { if (isLast) onComplete(); else setStep(s => s + 1); }}
      >
        {isLast ? 'Calculate Readiness' : 'Continue'}
      </Button>
    </div>
  );
}

Object.assign(window, { MorningCheckin });
