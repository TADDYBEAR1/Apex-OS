// Direction 3 — PULSE · warm heat-gradient energy, data-as-art
function DirPulse() {
  const r = 70, circ = 2 * Math.PI * r, pct = 0.88;
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative',
      background: 'radial-gradient(120% 90% at 50% 115%, #3A1206 0%, #160A0C 45%, #0B0A0E 100%)',
      fontFamily: "'Inter',system-ui,sans-serif", color: '#FFF6ED', overflow: 'hidden' }}>
      <style>{`
        .pl-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,150,80,.14);border-radius:24px;box-shadow:inset 0 1px 1px rgba(255,255,255,.05);}
        .pl-eyebrow{font-family:'Space Grotesk';font-weight:700;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#FF7A2F;}
        .pl-disp{font-family:'Space Grotesk';font-weight:300;letter-spacing:-.04em;}
        .pl-lbl{font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,246,237,.4);}
        .pl-heat{background:linear-gradient(120deg,#FFC53D,#FF6A1F 55%,#FF1E56);-webkit-background-clip:text;background-clip:text;color:transparent;}
      `}</style>
      <div style={{ position: 'absolute', bottom: '-40px', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle,#FF4D0A,transparent 70%)', filter: 'blur(50px)', opacity: .35 }}></div>

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px 0', fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: '14px' }}>
        <span>9:41</span>
        <span style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <svg width="16" height="11" viewBox="0 0 17 11" fill="#FFF6ED"><rect x="0" y="7" width="3" height="4" rx="1"/><rect x="4.5" y="5" width="3" height="6" rx="1"/><rect x="9" y="2.5" width="3" height="8.5" rx="1"/><rect x="13.5" y="0" width="3" height="11" rx="1"/></svg>
          <svg width="24" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="#FFF6ED" opacity="0.5"/><rect x="2" y="2" width="16" height="8" rx="1.5" fill="#FFF6ED"/><rect x="23" y="4" width="1.5" height="4" rx="0.75" fill="#FFF6ED" opacity="0.5"/></svg>
        </span>
      </div>

      <div style={{ position: 'relative', padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
          <div>
            <span className="pl-eyebrow">Mission Control</span>
            <h1 className="pl-disp" style={{ fontSize: '30px', marginTop: '2px' }}>Daniel<span style={{ color: '#FF7A2F' }}>.</span></h1>
            <p style={{ fontSize: '12.5px', color: 'rgba(255,246,237,.55)' }}>Saturday, Jun 14</p>
          </div>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid rgba(255,150,80,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: '14px', color: '#FF7A2F' }}>DA</div>
        </div>

        {/* Ring hero — centered, data-as-art */}
        <div className="pl-card" style={{ padding: '28px 24px 24px', marginBottom: '16px', textAlign: 'center' }}>
          <div style={{ position: 'relative', width: '184px', height: '184px', margin: '0 auto 6px' }}>
            <svg width="184" height="184" viewBox="0 0 160 160" style={{ width: '184px', height: '184px' }}>
              <defs><linearGradient id="plg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#FF1E56"/><stop offset=".5" stopColor="#FF6A1F"/><stop offset="1" stopColor="#FFC53D"/></linearGradient></defs>
              <circle cx="80" cy="80" r={r} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="13"/>
              <circle cx="80" cy="80" r={r} fill="none" stroke="url(#plg)" strokeWidth="13" strokeLinecap="round"
                strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)} transform="rotate(-90 80 80)"
                style={{ filter: 'drop-shadow(0 0 10px rgba(255,90,30,.6))' }}/>
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span className="pl-disp pl-heat" style={{ fontSize: '54px', lineHeight: 1 }}>88</span>
              <span className="pl-eyebrow" style={{ marginTop: '2px' }}>Full Send</span>
            </div>
          </div>
          <p style={{ fontSize: '14px', color: 'rgba(255,246,237,.72)', lineHeight: 1.5, maxWidth: '260px', margin: '0 auto' }}>Sleep banked, joints quiet. <strong style={{ color: '#FFF6ED' }}>Green light</strong> on today's plan.</p>
        </div>

        <div className="pl-card" style={{ padding: '22px 24px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span className="pl-disp" style={{ fontSize: '58px', lineHeight: 1 }}>D<span style={{ color: '#FF7A2F' }}>‑</span>128</span>
            <div style={{ textAlign: 'right' }}>
              <div className="pl-eyebrow">Yom Sayarot</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,246,237,.55)' }}>The Yoke Block · Wk 2/4</div>
            </div>
          </div>
          <div style={{ height: '8px', borderRadius: '99px', background: 'rgba(255,255,255,.07)', marginTop: '16px', overflow: 'hidden' }}>
            <div style={{ width: '62%', height: '100%', borderRadius: '99px', background: 'linear-gradient(90deg,#FF1E56,#FF6A1F,#FFC53D)' }}></div>
          </div>
        </div>

        <div className="pl-card" style={{ padding: '20px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="pl-eyebrow">Today's Mission</span>
            <h2 className="pl-disp" style={{ fontSize: '24px', marginTop: '6px' }}>The Heavy Trunk</h2>
            <span style={{ fontSize: '12.5px', color: 'rgba(255,246,237,.55)' }}>6 exercises · 90 min</span>
          </div>
          <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'linear-gradient(135deg,#FF6A1F,#FF1E56)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 18px rgba(255,90,30,.45)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#160A0C" strokeWidth="2.2"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { DirPulse });
