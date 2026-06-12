import { describe, expect, it } from 'vitest';
import { computeReadiness } from './readiness';

describe('computeReadiness', () => {
  it('returns green for a good morning', () => {
    const r = computeReadiness({ sleepHours: 8, kneeVas: 1, backVas: 0, energy: 4 });
    expect(r.light).toBe('green');
    expect(r.score).toBeGreaterThan(80);
  });

  it('returns yellow on VAS 3-4 (program threshold)', () => {
    expect(computeReadiness({ sleepHours: 8, kneeVas: 3, backVas: 0, energy: 4 }).light).toBe('yellow');
    expect(computeReadiness({ sleepHours: 8, kneeVas: 0, backVas: 4, energy: 4 }).light).toBe('yellow');
  });

  it('returns yellow on short sleep even with no pain', () => {
    expect(computeReadiness({ sleepHours: 5, kneeVas: 0, backVas: 0, energy: 3 }).light).toBe('yellow');
  });

  it('returns red on VAS 5+ regardless of everything else', () => {
    const r = computeReadiness({ sleepHours: 9, kneeVas: 5, backVas: 0, energy: 5 });
    expect(r.light).toBe('red');
  });

  it('keeps score within 0-100', () => {
    expect(computeReadiness({ sleepHours: 0, kneeVas: 10, backVas: 10, energy: 1 }).score).toBeGreaterThanOrEqual(0);
    expect(computeReadiness({ sleepHours: 12, kneeVas: 0, backVas: 0, energy: 5 }).score).toBeLessThanOrEqual(100);
  });
});
