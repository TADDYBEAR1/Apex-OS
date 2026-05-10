import React, { useState } from 'react';
import GlassCard from './GlassCard';
import { HEATMAP_DATA, QUICK_LOG_DEFAULTS } from '../data/sampleData';
import { calculateStats } from '../utils/stats';

export default function HomeScreen({ workoutPlan, currentDay, onNavigate, systemState }) {
  const [quickLog, setQuickLog] = useState({ ...QUICK_LOG_DEFAULTS });
  const [heatmapRange, setHeatmapRange] = useState('30d');
  const todayPlan = workoutPlan[currentDay];
  const totalEx = todayPlan ? (todayPlan.exercises.warmup?.length||0)+(todayPlan.exercises.main?.length||0)+(todayPlan.exercises.cooldown?.length||0) : 0;
  const now = new Date();
  const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const stats = calculateStats(HEATMAP_DATA);
  const weekProgress = Math.round((stats.weeklySessions / 5) * 100);

  const incrementLog = (k) => setQuickLog((p) => ({ ...p, [k]: p[k] + 1 }));

  return (
    <div className="screen" style={{ paddingTop: '16px' }}>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px', animation:'fadeInUp 0.5s ease-out' }}>
        <div>
          <h1 style={{ fontSize:'28px', fontWeight:700, marginBottom:'2px' }}>Hello<span style={{ color:'var(--cyan)' }}>.</span></h1>
          <p style={{ fontSize:'14px', color:'var(--muted)' }}>{dayNames[now.getDay()]}, {months[now.getMonth()]} {now.getDate()}</p>
        </div>
        <div style={{ width:'44px', height:'44px', borderRadius:'50%', background:'linear-gradient(135deg, var(--cyan), #00AA88)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontWeight:700, fontSize:'16px', color:'#000', boxShadow:'var(--cyan-glow-sm)' }}>AO</div>
      </div>

      {/* Stats Row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'8px', marginBottom:'20px', animation:'fadeInUp 0.7s ease-out' }}>
        <GlassCard style={{ padding:'14px', display:'flex', flexDirection:'column', gap:'8px' }}>
          <span className="label-sm">WEEK</span>
          <div style={{ position:'relative', width:'48px', height:'48px' }}>
            <svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" stroke="rgba(255,255,255,0.06)" strokeWidth="4" fill="none"/><circle cx="24" cy="24" r="19" stroke="var(--cyan)" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray={`${2*Math.PI*19}`} strokeDashoffset={`${2*Math.PI*19*(1-weekProgress/100)}`} transform="rotate(-90 24 24)" style={{ filter:'drop-shadow(0 0 4px rgba(0,255,204,0.4))', transition:'stroke-dashoffset 0.8s ease' }}/></svg>
            <span style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontWeight:700, fontSize:'12px', color:'var(--cyan)' }}>{weekProgress}%</span>
          </div>
          <span style={{ fontSize:'11px', color:'var(--muted)' }}>{stats.weeklySessions}/5 sessions</span>
        </GlassCard>
        <GlassCard style={{ padding:'14px', display:'flex', flexDirection:'column', gap:'8px' }}>
          <span className="label-sm">STREAK</span>
          <div style={{ display:'flex', alignItems:'baseline', gap:'2px' }}><span style={{ fontSize:'14px' }}>🔥</span><span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'28px' }}>{stats.currentStreak}d</span></div>
          <span style={{ fontSize:'11px', color:'var(--muted)' }}>Current run</span>
        </GlassCard>
        <GlassCard style={{ padding:'14px', display:'flex', flexDirection:'column', gap:'8px' }}>
          <span className="label-sm" style={{ fontSize:'9px' }}>TOTAL SESSIONS</span>
          <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'28px' }}>{stats.totalSessions}</span>
          <span style={{ fontSize:'11px', color:'var(--muted)' }}>Logged all-time</span>
        </GlassCard>
      </div>

      {/* Today's Workout */}
      {todayPlan && todayPlan.name !== 'Rest Day' && (
        <GlassCard onClick={() => onNavigate('workout')} style={{ padding:'20px', marginBottom:'20px', animation:'fadeInUp 0.8s ease-out' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <span style={{ fontSize:'12px', color:'var(--muted)', fontWeight:500 }}>Today's Workout</span>
              <h2 style={{ fontSize:'22px', fontWeight:700, marginTop:'4px' }}>{todayPlan.name}</h2>
              <span style={{ fontSize:'13px', color:'var(--text-secondary)' }}>{totalEx} exercises</span>
            </div>
            <div style={{ width:'48px', height:'48px', borderRadius:'50%', background:'var(--cyan)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'var(--cyan-glow)', cursor:'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 5L19 12L8 19V5Z" fill="#000"/></svg>
            </div>
          </div>
          <div style={{ display:'flex', gap:'8px', marginTop:'16px' }}>
            {[{ c: todayPlan.exercises.warmup?.length||0, l:'Warm-up' }, { c: todayPlan.exercises.main?.length||0, l:'Main Workout' }, { c: todayPlan.exercises.cooldown?.length||0, l:'Cooldown' }].map((s, i) => (
              <div key={i} style={{ flex:1, padding:'10px 12px', background:'rgba(255,255,255,0.02)', borderRadius:'var(--radius-sm)', border:'1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'20px' }}>{s.c}</div>
                <div style={{ fontSize:'11px', color:'var(--muted)', marginTop:'2px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {todayPlan && todayPlan.name === 'Rest Day' && (
        <GlassCard style={{ padding:'24px', textAlign:'center', marginBottom:'20px', animation:'fadeInUp 0.8s ease-out' }}>
          <span style={{ fontSize:'36px', marginBottom:'8px', display:'block' }}>🧘</span>
          <h2 style={{ fontSize:'20px', fontWeight:700, marginBottom:'4px' }}>Rest Day</h2>
          <p style={{ fontSize:'14px', color:'var(--muted)' }}>Recovery is part of the protocol.</p>
        </GlassCard>
      )}

      {/* Heatmap */}
      <GlassCard style={{ padding:'20px', animation:'fadeInUp 0.9s ease-out' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
          <div>
            <h3 style={{ fontSize:'16px', fontWeight:700, fontFamily:'var(--font-display)', color:'var(--text)', marginBottom:'2px' }}>Training Consistency</h3>
            <span style={{ fontSize:'12px', color:'var(--cyan)' }}>{stats.consistency}% <span style={{ color:'var(--cyan)' }}>({stats.activeDays}/{stats.totalDays}d)</span></span>
          </div>
          <div style={{ display:'flex', background:'rgba(255,255,255,0.03)', borderRadius:'var(--radius-pill)', padding:'4px' }}>
            {['30d','90d'].map((r) => (
              <button key={r} onClick={() => setHeatmapRange(r)} style={{
                padding:'6px 16px',
                borderRadius:'var(--radius-pill)',
                border:'none',
                background:heatmapRange===r?'var(--cyan)':'transparent',
                color:heatmapRange===r?'#000':'var(--muted)',
                fontFamily:'var(--font-display)',
                fontWeight:700,
                fontSize:'12px',
                cursor:'pointer',
                transition:'all 0.2s ease'
              }}>
                {r}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
          {HEATMAP_DATA.map((row, ri) => (
            <div key={ri} style={{ display:'flex', gap:'6px' }}>
              {row.map((cell, ci) => (
                <div key={ci} style={{
                  flex:1,
                  aspectRatio:'1/1',
                  borderRadius:'4px',
                  background: cell === 0 ? 'rgba(255,255,255,0.04)' :
                              cell === 1 ? 'rgba(0,255,204,0.2)' :
                              cell === 2 ? 'rgba(0,255,204,0.5)' :
                              'var(--cyan)'
                }}/>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', gap:'6px', marginTop:'16px', fontSize:'11px', color:'var(--muted)' }}>
          <span>Less</span>
          {[0,1,2,3].map((l) => (
            <div key={l} style={{
              width:'12px',
              height:'12px',
              borderRadius:'3px',
              background: l === 0 ? 'rgba(255,255,255,0.04)' :
                          l === 1 ? 'rgba(0,255,204,0.2)' :
                          l === 2 ? 'rgba(0,255,204,0.5)' :
                          'var(--cyan)'
            }}/>
          ))}
          <span style={{ color:'var(--cyan)' }}>More</span>
        </div>
      </GlassCard>
    </div>
  );
}
