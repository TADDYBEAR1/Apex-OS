import React, { useState } from 'react';
import GlassCard from './GlassCard';
import ProfileButton from './ProfileButton';
import MorningCheckin from './MorningCheckin';
import ReadinessRing from './ReadinessRing';
import { HEATMAP_DAY_LABELS } from '../data/sampleData';
import { buildHeatmapFromWorkoutHistory, calculateHistoryStats } from '../utils/stats';
import { DEFAULT_MISSION, getMissionStatus } from '../utils/mission';
import { READINESS_LIGHTS } from '../utils/readiness';

export default function HomeScreen({
  workoutPlan, currentDay, onNavigate, profile, onOpenProfile, workoutHistory,
  mission, todayCheckin, onSaveCheckin,
}) {
  const [heatmapRange, setHeatmapRange] = useState('30d');
  const [showCheckin, setShowCheckin] = useState(false);

  const todayPlan = workoutPlan[currentDay];
  const totalEx = todayPlan ? (todayPlan.exercises.warmup?.length||0)+(todayPlan.exercises.main?.length||0)+(todayPlan.exercises.cooldown?.length||0) : 0;
  const now = new Date();
  const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const rangeDays = heatmapRange === '90d' ? 90 : 30;
  const rangeWeeks = heatmapRange === '90d' ? 13 : 5;

  const heatmap = buildHeatmapFromWorkoutHistory(workoutHistory, rangeWeeks, now, { rangeDays });
  const stats = calculateHistoryStats(workoutHistory, rangeDays, now);

  const missionStatus = getMissionStatus(mission?.phases ? mission : { ...DEFAULT_MISSION, ...(mission || {}) }, now);
  const lightMeta = todayCheckin ? READINESS_LIGHTS[todayCheckin.light] : null;
  // A red morning gate overrides the planned session with recovery work.
  const redGate = todayCheckin?.light === 'red';

  const cellColor = (val) =>
    val === 0 ? 'rgba(255,255,255,0.03)' :
    val === 1 ? 'rgba(127, 200, 255,0.2)' :
    val === 2 ? 'rgba(127, 200, 255,0.5)' : 'var(--cyan)';

  return (
    <div className="screen" style={{ paddingTop: '24px' }}>
      {showCheckin && (
        <MorningCheckin
          initial={todayCheckin}
          onClose={() => setShowCheckin(false)}
          onSave={(data) => { onSaveCheckin(data); setShowCheckin(false); }}
        />
      )}

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'28px', animation:'fadeInUp 0.5s ease-out' }}>
        <div>
          <span style={{ fontFamily:'var(--font-display)', fontSize:'11px', fontWeight:700, letterSpacing:'0.18em', color:'var(--cyan)' }}>MISSION CONTROL</span>
          <h1 style={{ fontSize:'32px', fontWeight:300, marginTop:'2px', letterSpacing: '-0.04em' }}>
            {profile.name ? profile.name.split(' ')[0] : 'Operator'}<span style={{ color:'var(--cyan)', textShadow: '0 0 10px rgba(127, 200, 255,0.5)' }}>.</span>
          </h1>
          <p style={{ fontSize:'13px', color:'var(--text-secondary)', letterSpacing: '0.02em', fontWeight: 300 }}>{dayNames[now.getDay()]}, {months[now.getMonth()]} {now.getDate()}</p>
        </div>
        <ProfileButton profile={profile} onClick={onOpenProfile} />
      </div>

      {/* Campaign Countdown Hero */}
      <div style={{ marginBottom:'28px', animation:'fadeInUp 0.6s ease-out', padding:'0 8px' }}>
        <div style={{ display:'flex', alignItems:'baseline', gap:'12px' }}>
          <span style={{
            fontFamily:'var(--font-display)', fontWeight:300, fontSize:'72px', lineHeight:1,
            color:'var(--text)', letterSpacing:'-0.04em',
          }}>
            D<span style={{ color:'var(--cyan)' }}>-</span>{missionStatus.daysToTarget}
          </span>
          <div style={{ display:'flex', flexDirection:'column' }}>
            <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'12px', letterSpacing:'0.15em', color:'var(--cyan)' }}>
              {missionStatus.targetLabel}
            </span>
            {missionStatus.phase && (
              <span style={{ fontSize:'12px', color:'var(--text-secondary)' }}>
                {missionStatus.phase.name}
                {missionStatus.weekInPhase ? ` · Week ${missionStatus.weekInPhase}/${missionStatus.phaseTotalWeeks}` : ' · Upcoming'}
              </span>
            )}
          </div>
        </div>
        {/* Campaign progress bar with phase markers */}
        <div style={{ marginTop:'14px', position:'relative', height:'6px', borderRadius:'3px', background:'rgba(255,255,255,0.06)', overflow:'hidden' }}>
          <div style={{
            position:'absolute', left:0, top:0, bottom:0,
            width:`${missionStatus.progressPct}%`,
            background:'linear-gradient(90deg, rgba(127, 200, 255,0.4), var(--cyan))',
            boxShadow:'0 0 12px rgba(127, 200, 255,0.5)',
            borderRadius:'3px', transition:'width 1s ease',
          }} />
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:'6px' }}>
          {(mission?.phases ? mission : DEFAULT_MISSION).phases.map((p, i) => (
            <span key={p.id} style={{
              fontSize:'9px', letterSpacing:'0.06em', textTransform:'uppercase',
              color: i === missionStatus.phaseIndex ? 'var(--cyan)' : 'var(--muted)',
              fontWeight: i === missionStatus.phaseIndex ? 700 : 400,
              fontFamily:'var(--font-display)',
            }}>{p.id === 'bridge' ? 'BRG' : p.id === 'transition' ? 'TRN' : p.id.replace('block','B').toUpperCase()}</span>
          ))}
        </div>
      </div>

      {/* Readiness — the daily gate */}
      {!todayCheckin ? (
        <GlassCard onClick={() => setShowCheckin(true)} style={{
          padding:'18px 20px', marginBottom:'20px', animation:'fadeInUp 0.7s ease-out',
          border:'1px solid rgba(127, 200, 255,0.25)',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
            <span style={{ fontSize:'24px' }}>☀️</span>
            <div style={{ flex:1 }}>
              <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'14px', display:'block' }}>Morning Check-In</span>
              <span style={{ fontSize:'12px', color:'var(--text-secondary)' }}>20 seconds — set the traffic light for the day</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </GlassCard>
      ) : (
        <GlassCard onClick={() => setShowCheckin(true)} style={{
          padding:'24px 20px', marginBottom:'20px', animation:'fadeInUp 0.7s ease-out',
          border:`1px solid ${lightMeta.color}40`,
          display:'flex', alignItems:'center', gap:'20px',
        }}>
          <ReadinessRing
            value={todayCheckin.score}
            score={todayCheckin.score}
            label={todayCheckin.light === 'green' ? 'Ready' : todayCheckin.light === 'yellow' ? 'Caution' : 'Hold'}
            light={todayCheckin.light}
            size={104}
            stroke={9}
            breathe={todayCheckin.light === 'green'}
            id="home-readiness"
          />
          <div style={{ flex:1, minWidth:0 }}>
            <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'12px', letterSpacing:'0.1em', color:lightMeta.color, display:'block', textTransform:'uppercase' }}>
              {lightMeta.icon} {lightMeta.title}
            </span>
            <span style={{ fontSize:'12px', color:'var(--text-secondary)', lineHeight:1.5, display:'block', marginTop:'6px' }}>
              {todayCheckin.recommendation}
            </span>
          </div>
        </GlassCard>
      )}

      {/* Today's Mission */}
      {todayPlan && todayPlan.name !== 'Rest Day' && (
        <GlassCard onClick={() => onNavigate('workout')} style={{
          padding:'24px', marginBottom:'28px', animation:'fadeInUp 0.8s ease-out',
          opacity: redGate ? 0.6 : 1,
        }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <span className="label-sm" style={{ color: redGate ? '#FF5C5C' : 'var(--cyan)' }}>
                {redGate ? '⛔ MISSION ON HOLD — RED GATE' : "TODAY'S MISSION"}
              </span>
              <h2 style={{ fontSize:'28px', fontWeight:300, marginTop:'8px', letterSpacing: '-0.02em' }}>{todayPlan.name}</h2>
              <span style={{ fontSize:'13px', color:'var(--text-secondary)' }}>
                {redGate ? 'Swap to recovery work — see readiness above' : `${totalEx} exercises`}
              </span>
            </div>
            <div style={{ width:'40px', height:'40px', borderRadius:'50%', border: '1px solid var(--surface-border-light)', display:'flex', alignItems:'center', justifyContent:'center', color: 'var(--text)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </GlassCard>
      )}

      {todayPlan && todayPlan.name === 'Rest Day' && (
        <GlassCard style={{ padding:'32px 24px', textAlign:'center', marginBottom:'28px', animation:'fadeInUp 0.8s ease-out' }}>
          <h2 style={{ fontSize:'24px', fontWeight:300, marginBottom:'8px', letterSpacing: '-0.02em' }}>Rest Day</h2>
          <p style={{ fontSize:'14px', color:'var(--text-secondary)', fontWeight: 300 }}>Recovery is part of the protocol.</p>
        </GlassCard>
      )}

      {/* Floating Stats Row */}
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'36px', animation:'fadeInUp 0.85s ease-out', padding: '0 8px' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
          <span className="label-sm">WEEK</span>
          <div style={{ fontFamily:'var(--font-display)', fontWeight:300, fontSize:'32px', color:'var(--text)' }}>
            {stats.weeklySessions}<span style={{ fontSize: '16px', color: 'var(--muted)' }}>/5</span>
          </div>
        </div>
        <div style={{ width: '1px', background: 'var(--surface-border)', margin: '0 16px' }} />
        <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
          <span className="label-sm">STREAK</span>
          <div style={{ fontFamily:'var(--font-display)', fontWeight:300, fontSize:'32px', color:'var(--text)' }}>
            {stats.currentStreak}<span style={{ fontSize: '16px', color: 'var(--muted)' }}>d</span>
          </div>
        </div>
        <div style={{ width: '1px', background: 'var(--surface-border)', margin: '0 16px' }} />
        <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
          <span className="label-sm">TOTAL</span>
          <div style={{ fontFamily:'var(--font-display)', fontWeight:300, fontSize:'32px', color:'var(--cyan)', textShadow: '0 0 10px rgba(127, 200, 255,0.2)' }}>
            {stats.totalSessions}
          </div>
        </div>
      </div>

      {/* Spatial Heatmap */}
      <div style={{ animation:'fadeInUp 0.9s ease-out', padding: '0 8px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' }}>
          <span className="label-sm">CONSISTENCY</span>
          <div style={{ display:'flex', gap: '16px' }}>
            {['30d','90d'].map((r) => (
              <button key={r} onClick={() => setHeatmapRange(r)} style={{
                background: 'none', border: 'none', padding: 0,
                color: heatmapRange===r ? 'var(--cyan)' : 'var(--muted)',
                fontFamily:'var(--font-body)', fontWeight:500, fontSize:'11px', letterSpacing: '0.1em',
                cursor:'pointer', transition:'all 0.3s ease',
                textShadow: heatmapRange===r ? '0 0 8px rgba(127, 200, 255,0.4)' : 'none'
              }}>{r}</button>
            ))}
          </div>
        </div>

        {/* Heatmap grid */}
        <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
          {heatmap.cells.map((row, ri) => (
            <div key={ri} style={{ display:'grid', gridTemplateColumns:`24px repeat(${heatmap.weekLabels.length}, 1fr)`, gap:'8px', alignItems:'center' }}>
              <span style={{ fontSize:'10px', color:'var(--muted)', fontFamily:'var(--font-body)', fontWeight:400 }}>
                {HEATMAP_DAY_LABELS[ri][0]}
              </span>
              {row.map((cell, ci) => (
                <div key={ci} style={{
                  aspectRatio:'1/1', borderRadius:'4px',
                  background: cellColor(cell),
                  boxShadow: cell === 3 ? '0 0 8px rgba(127, 200, 255,0.4)' : 'none',
                  transition: 'all 0.5s ease',
                }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
