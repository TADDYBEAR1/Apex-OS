// Direction 1 — DAYLIGHT · luminous light, clinical-premium
function DirDaylight() {
  const C = '#1F3CFF', C2 = '#00B8FF';
  const r = 70, circ = 2 * Math.PI * r, pct = 0.88;
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative',
      background: 'linear-gradient(180deg,#EEF1F6,#E2E7EE)',
      fontFamily: "'Inter',system-ui,sans-serif", color: '#0C0E14', overflow: 'hidden' }}>
      <style>{`
        .dl-grid::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(12,14,20,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(12,14,20,.035) 1px,transparent 1px);background-size:40px 40px;mask-image:radial-gradient(circle at 50% 30%,#000,transparent 75%);-webkit-mask-image:radial-gradient(circle at 50% 30%,#000,transparent 75%);}
        .dl-card{background:#fff;border:1px solid rgba(12,14,20,.05);border-radius:26px;box-shadow:0 8px 28px rgba(17,24,39,.07);}
        .dl-eyebrow{font-family:'Space Grotesk';font-weight:700;font-size:11px;letter-spacing:.18em;color:${C};text-transform:uppercase;}
        .dl-disp{font-family:'Space Grotesk';font-weight:300;letter-spacing:-.04em;}
        .dl-lbl{font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#9AA0AB;}
      `}</style>
      <div className="dl-grid" style={{ position: 'absolute', inset: 0 }}></div>

      {/* status bar */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px 0', fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: '14px' }}>
        <span>9:41</span>
        <span style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <svg width="16" height="11" viewBox="0 0 17 11" fill="#0C0E14"><rect x="0" y="7" width="3" height="4" rx="1"/><rect x="4.5" y="5" width="3" height="6" rx="1"/><rect x="9" y="2.5" width="3" height="8.5" rx="1"/><rect x="13.5" y="0" width="3" height="11" rx="1"/></svg>
          <svg width="24" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="#0C0E14" opacity="0.4"/><rect x="2" y="2" width="16" height="8" rx="1.5" fill="#0C0E14"/><rect x="23" y="4" width="1.5" height="4" rx="0.75" fill="#0C0E14" opacity="0.4"/></svg>
        </span>
      </div>

      <div style={{ position: 'relative', padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
          <div>
            <span className="dl-eyebrow">Mission Control</span>
            <h1 className="dl-disp" style={{ fontSize: '30px', marginTop: '2px' }}>Daniel<span style={{ color: C }}>.</span></h1>
            <p style={{ fontSize: '12.5px', color: '#71757F' }}>Saturday, Jun 14</p>
          </div>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#0C0E14', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: '14px' }}>DA</div>
        </div>

        {/* Readiness ring hero */}
        <div className="dl-card" style={{ padding: '24px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '22px' }}>
          <div style={{ position: 'relative', width: '160px', height: '160px', flexShrink: 0 }}>
            <svg width="160" height="160" viewBox="0 0 160 160">
              <defs><linearGradient id="dlg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={C}/><stop offset="1" stopColor={C2}/></linearGradient></defs>
              <circle cx="80" cy="80" r={r} fill="none" stroke="#E7EAF0" strokeWidth="12"/>
              <circle cx="80" cy="80" r={r} fill="none" stroke="url(#dlg)" strokeWidth="12" strokeLinecap="round"
                strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)} transform="rotate(-90 80 80)"/>
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span className="dl-disp" style={{ fontSize: '46px', lineHeight: 1 }}>88</span>
              <span className="dl-lbl" style={{ color: C, marginTop: '2px' }}>Ready</span>
            </div>
          </div>
          <div>
            <span className="dl-lbl">Readiness</span>
            <p style={{ fontSize: '14px', color: '#3A3E47', lineHeight: 1.5, marginTop: '6px' }}>Sleep banked, joints quiet. <strong style={{ color: '#0C0E14' }}>Green light</strong> on today's plan.</p>
          </div>
        </div>

        {/* Countdown */}
        <div className="dl-card" style={{ padding: '22px 24px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span className="dl-disp" style={{ fontSize: '58px', lineHeight: 1 }}>D<span style={{ color: C }}>‑</span>128</span>
            <div style={{ textAlign: 'right' }}>
              <div className="dl-eyebrow">Yom Sayarot</div>
              <div style={{ fontSize: '12px', color: '#71757F' }}>The Yoke Block · Wk 2/4</div>
            </div>
          </div>
          <div style={{ height: '8px', borderRadius: '99px', background: '#E7EAF0', marginTop: '16px', overflow: 'hidden' }}>
            <div style={{ width: '62%', height: '100%', borderRadius: '99px', background: `linear-gradient(90deg,${C},${C2})` }}></div>
          </div>
        </div>

        {/* Today's mission */}
        <div className="dl-card" style={{ padding: '20px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="dl-eyebrow">Today's Mission</span>
            <h2 className="dl-disp" style={{ fontSize: '24px', marginTop: '6px' }}>The Heavy Trunk</h2>
            <span style={{ fontSize: '12.5px', color: '#71757F' }}>6 exercises · 90 min</span>
          </div>
          <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: C, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 16px ${C}55` }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { DirDaylight });
