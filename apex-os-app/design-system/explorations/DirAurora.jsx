// Aurora direction — parametrized by palette so we can explore color-ways.
// palette: { bg, blobs:[{c,o}x3], ring:[3 stops], bar:[stops], accent:[2 clip stops],
//            dot:'css-gradient', dotInk, period }
function DirAurora({ palette, idp = 'au' }) {
  const P = palette || window.AURORA_PALETTES.tide;
  const r = 70, circ = 2 * Math.PI * r, pct = 0.88;
  const accentSolid = P.ring[0];
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative',
      background: P.bg || '#06070C', fontFamily: "'Inter',system-ui,sans-serif", color: '#fff', overflow: 'hidden' }}>
      <style>{`
        .${idp}-blob{position:absolute;border-radius:50%;filter:blur(60px);}
        .${idp}-card{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-top-color:rgba(255,255,255,.22);border-radius:30px;backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);box-shadow:0 24px 60px rgba(0,0,0,.5),inset 0 1px 1px rgba(255,255,255,.12);}
        .${idp}-eyebrow{font-family:'Space Grotesk';font-weight:700;font-size:11px;letter-spacing:.18em;text-transform:uppercase;background:linear-gradient(90deg,${P.accent[0]},${P.accent[1]});-webkit-background-clip:text;background-clip:text;color:transparent;}
        .${idp}-disp{font-family:'Space Grotesk';font-weight:300;letter-spacing:-.04em;}
        .${idp}-lbl{font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.45);}
      `}</style>
      <div className={`${idp}-blob`} style={{ width: '260px', height: '260px', top: '-60px', left: '-40px', background: P.blobs[0].c, opacity: P.blobs[0].o }}></div>
      <div className={`${idp}-blob`} style={{ width: '300px', height: '300px', top: '120px', right: '-90px', background: P.blobs[1].c, opacity: P.blobs[1].o }}></div>
      <div className={`${idp}-blob`} style={{ width: '280px', height: '280px', bottom: '-80px', left: '20px', background: P.blobs[2].c, opacity: P.blobs[2].o }}></div>

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px 0', fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: '14px' }}>
        <span>9:41</span>
        <span style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <svg width="16" height="11" viewBox="0 0 17 11" fill="#fff"><rect x="0" y="7" width="3" height="4" rx="1"/><rect x="4.5" y="5" width="3" height="6" rx="1"/><rect x="9" y="2.5" width="3" height="8.5" rx="1"/><rect x="13.5" y="0" width="3" height="11" rx="1"/></svg>
          <svg width="24" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="#fff" opacity="0.5"/><rect x="2" y="2" width="16" height="8" rx="1.5" fill="#fff"/><rect x="23" y="4" width="1.5" height="4" rx="0.75" fill="#fff" opacity="0.5"/></svg>
        </span>
      </div>

      <div style={{ position: 'relative', padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
          <div>
            <span className={`${idp}-eyebrow`}>Mission Control</span>
            <h1 className={`${idp}-disp`} style={{ fontSize: '30px', marginTop: '2px' }}>Daniel<span style={{ color: accentSolid }}>.</span></h1>
            <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,.55)' }}>Saturday, Jun 14</p>
          </div>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid rgba(255,255,255,.25)', background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: '14px' }}>DA</div>
        </div>

        <div className={`${idp}-card`} style={{ padding: '24px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '22px' }}>
          <div style={{ position: 'relative', width: '160px', height: '160px', flexShrink: 0 }}>
            <svg width="160" height="160" viewBox="0 0 160 160">
              <defs><linearGradient id={`${idp}g`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={P.ring[0]}/><stop offset=".5" stopColor={P.ring[1]}/><stop offset="1" stopColor={P.ring[2]}/></linearGradient></defs>
              <circle cx="80" cy="80" r={r} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="12"/>
              <circle cx="80" cy="80" r={r} fill="none" stroke={`url(#${idp}g)`} strokeWidth="12" strokeLinecap="round"
                strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)} transform="rotate(-90 80 80)"
                style={{ filter: `drop-shadow(0 0 8px ${P.ring[0]}99)` }}/>
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span className={`${idp}-disp`} style={{ fontSize: '46px', lineHeight: 1 }}>88</span>
              <span className={`${idp}-lbl`} style={{ marginTop: '2px' }}>Ready</span>
            </div>
          </div>
          <div>
            <span className={`${idp}-lbl`}>Readiness</span>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.78)', lineHeight: 1.5, marginTop: '6px' }}>Sleep banked, joints quiet. <strong style={{ color: '#fff' }}>Green light</strong> on today's plan.</p>
          </div>
        </div>

        <div className={`${idp}-card`} style={{ padding: '22px 24px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span className={`${idp}-disp`} style={{ fontSize: '58px', lineHeight: 1 }}>D<span style={{ color: accentSolid }}>‑</span>128</span>
            <div style={{ textAlign: 'right' }}>
              <div className={`${idp}-eyebrow`}>Yom Sayarot</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.55)' }}>The Yoke Block · Wk 2/4</div>
            </div>
          </div>
          <div style={{ height: '8px', borderRadius: '99px', background: 'rgba(255,255,255,.1)', marginTop: '16px', overflow: 'hidden' }}>
            <div style={{ width: '62%', height: '100%', borderRadius: '99px', background: `linear-gradient(90deg,${P.ring[0]},${P.ring[1]},${P.ring[2]})` }}></div>
          </div>
        </div>

        <div className={`${idp}-card`} style={{ padding: '20px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className={`${idp}-eyebrow`}>Today's Mission</span>
            <h2 className={`${idp}-disp`} style={{ fontSize: '24px', marginTop: '6px' }}>The Heavy Trunk</h2>
            <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,.55)' }}>6 exercises · 90 min</span>
          </div>
          <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: P.dot, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 18px ${P.ring[0]}66` }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={P.dotInk || '#06070C'} strokeWidth="2.2"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

window.AURORA_PALETTES = {
  tide:    { bg:'#06070C', blobs:[{c:'#00E5C4',o:.55},{c:'#2D9BFF',o:.55},{c:'#FF3D9A',o:.4}], ring:['#3DE0FF','#7C7BFF','#FF6BC4'], accent:['#3DE0FF','#B388FF'], dot:'linear-gradient(135deg,#3DE0FF,#B388FF)', dotInk:'#06070C' },
  verdant: { bg:'#05090A', blobs:[{c:'#00FFA3',o:.5},{c:'#16C2B0',o:.5},{c:'#A6FF4D',o:.4}], ring:['#5BFFC2','#00E0A0','#C6FF4D'], accent:['#5BFFC2','#C6FF4D'], dot:'linear-gradient(135deg,#5BFFC2,#C6FF4D)', dotInk:'#05140E' },
  ember:   { bg:'#0B0709', blobs:[{c:'#FF6B2D',o:.5},{c:'#FF2D78',o:.45},{c:'#FFC83D',o:.4}], ring:['#FFC53D','#FF6A1F','#FF2D78'], accent:['#FFC53D','#FF5FA2'], dot:'linear-gradient(135deg,#FFB13D,#FF3D78)', dotInk:'#1A0A06' },
  arctic:  { bg:'#070A10', blobs:[{c:'#6FE9FF',o:.5},{c:'#8FA8FF',o:.5},{c:'#C9F0FF',o:.35}], ring:['#CFefff','#7FC8FF','#A9B6FF'], accent:['#CFefff','#9FB8FF'], dot:'linear-gradient(135deg,#BFeaff,#9FB8FF)', dotInk:'#0A1018' },
  orchid:  { bg:'#0B070E', blobs:[{c:'#FF4FD8',o:.45},{c:'#9B5BFF',o:.5},{c:'#FFB23D',o:.4}], ring:['#FFD24D','#FF5FC4','#A65BFF'], accent:['#FF8FE0','#C7A0FF'], dot:'linear-gradient(135deg,#FF6FD0,#A65BFF)', dotInk:'#15081A' },
};
Object.assign(window, { DirAurora });
