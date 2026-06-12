import { describe, expect, it } from 'vitest';
import { DEFAULT_MISSION, getMissionStatus } from './mission';

describe('getMissionStatus', () => {
  it('computes days to target', () => {
    const s = getMissionStatus(DEFAULT_MISSION, new Date(2026, 8, 30, 12)); // 30.9.2026
    expect(s.daysToTarget).toBe(1);
  });

  it('identifies the current phase and week', () => {
    const s = getMissionStatus(DEFAULT_MISSION, new Date(2026, 5, 28, 12)); // 28.6 → Block 1 week 2
    expect(s.phase.id).toBe('block1');
    expect(s.weekInPhase).toBe(2);
  });

  it('points to the upcoming phase between gaps / before start', () => {
    const s = getMissionStatus(DEFAULT_MISSION, new Date(2026, 5, 1, 12)); // 1.6 before campaign
    expect(s.phase.id).toBe('bridge');
    expect(s.weekInPhase).toBeNull();
  });

  it('flags mission day and clamps at zero', () => {
    const s = getMissionStatus(DEFAULT_MISSION, new Date(2026, 9, 1, 12)); // 1.10
    expect(s.daysToTarget).toBe(0);
    expect(s.isMissionDay).toBe(true);
  });
});
