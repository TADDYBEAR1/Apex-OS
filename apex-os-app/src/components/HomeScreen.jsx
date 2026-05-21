import React, { useState } from 'react';
import GlassCard from './GlassCard';
import ProfileButton from './ProfileButton';
import { HEATMAP_DAY_LABELS } from '../data/sampleData';
import { buildHeatmapFromWorkoutHistory, calculateHistoryStats } from '../utils/stats';

export default function HomeScreen({ workoutPlan, currentDay, onNavigate, profile, onOpenProfile, workoutHistory }) {
  const [heatmapRange, setHeatmapRange] = useState('30d');
  const todayPlan = workoutPlan[currentDay];
  const totalEx = todayPlan ? (todayPlan.exercises.warmup?.length||0)+(todayPlan.exercises.main?.length||0)+(todayPlan.exercises.cooldown?.length||0) : 0;
  const now = new Date();
  const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const rangeDays = heatmapRange === '90d' ? 90 : 30;
  const rangeWeeks = heatmapRange === '90d' ? 13 : 5;

  const heatmap = buildHeatmapFromWorkoutHistory(workoutHistory, rangeWeeks, now, { rangeDays });
  const stats = calculateHistoryStats(workoutHistory, rangeDays, now);
  const weekProgress = Math.min(Math.round((stats.weeklySessions / 5) * 100), 100);

  const cellColor = (val) =>
    val === 0 ? 'rgba(255,255,255,0.03)' :
    val === 1 ? 'rgba(0,229,255,0.2)' :
    val === 2 ? 'rgba(0,229,255,0.5)' : 'var(--cyan)';

  return (
    <div className="screen" style={{ paddingTop: '24px' }}>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'48px', animation:'fadeInUp 0.5s ease-out' }}>
        <div>
          <h1 style={{ fontSize:'40px', fontWeight:300, marginBottom:'-4px', letterSpacing: '-0.04em' }}>Hello<span style={{ color:'var(--cyan)', textShadow: '0 0 10px rgba(0,229,255,0.5)' }}>.</span></h1>
          <p style={{ fontSize:'13px', color:'var(--text-secondary)', letterSpacing: '0.02em', fontWeight: 300 }}>{dayNames[now.getDay()]}, {months[now.getMonth()]} {now.getDate()}</p>
        </div>
        <ProfileButton profile={profile} onClick={onOpenProfile} />
      </div>

      {/* Floating Stats Row */}
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'48px', animation:'fadeInUp 0.7s ease-out', padding: '0 8px' }}>
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
          <div style={{ fontFamily:'var(--font-display)', fontWeight:300, fontSize:'32px', color:'var(--cyan)', textShadow: '0 0 10px rgba(0,229,255,0.2)' }}>
            {stats.totalSessions}
          </div>
        </div>
      </div>

      {/* Today's Workout */}
      {todayPlan && todayPlan.name !== 'Rest Day' && (
        <GlassCard onClick={() => onNavigate('workout')} style={{ padding:'24px', marginBottom:'40px', animation:'fadeInUp 0.8s ease-out' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <span className="label-sm" style={{ color: 'var(--cyan)' }}>TODAY'S WORKOUT</span>
              <h2 style={{ fontSize:'28px', fontWeight:300, marginTop:'8px', letterSpacing: '-0.02em' }}>{todayPlan.name}</h2>
              <span style={{ fontSize:'13px', color:'var(--text-secondary)' }}>{totalEx} exercises</span>
            </div>
            <div style={{ width:'40px', height:'40px', borderRadius:'50%', border: '1px solid var(--surface-border-light)', display:'flex', alignItems:'center', justifyContent:'center', color: 'var(--text)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </GlassCard>
      )}

      {todayPlan && todayPlan.name === 'Rest Day' && (
        <GlassCard style={{ padding:'32px 24px', textAlign:'center', marginBottom:'40px', animation:'fadeInUp 0.8s ease-out' }}>
          <h2 style={{ fontSize:'24px', fontWeight:300, marginBottom:'8px', letterSpacing: '-0.02em' }}>Rest Day</h2>
          <p style={{ fontSize:'14px', color:'var(--text-secondary)', fontWeight: 300 }}>Recovery is part of the protocol.</p>
        </GlassCard>
      )}

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
                textShadow: heatmapRange===r ? '0 0 8px rgba(0,229,255,0.4)' : 'none'
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
                  boxShadow: cell === 3 ? '0 0 8px rgba(0,229,255,0.4)' : 'none',
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
