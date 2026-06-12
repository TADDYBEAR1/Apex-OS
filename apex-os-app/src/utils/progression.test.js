import { describe, expect, it } from 'vitest';
import { getProgressionHint } from './progression';

const exercise = { id: 'e1', name: 'Flat DB Bench', sets: 4, reps: 8, weight: 22, isBodyweight: false };
const cleanSet = { exerciseName: 'Flat DB Bench', targetReps: 8, actualReps: 8, targetWeight: 22, actualWeight: 22 };
const session = (completedAt, sets) => ({ completedAt, completedSets: sets });

describe('getProgressionHint', () => {
  it('returns null with no history for the exercise', () => {
    expect(getProgressionHint([], exercise)).toBeNull();
  });

  it('suggests level-up patch after two clean sessions', () => {
    const history = [
      session('2026-06-01T10:00:00Z', [cleanSet, cleanSet]),
      session('2026-06-08T10:00:00Z', [cleanSet, cleanSet]),
    ];
    const hint = getProgressionHint(history, exercise);
    expect(hint.level).toBe('up');
    expect(hint.patch).toEqual({ field: 'weight', value: 24.5 });
  });

  it('returns "almost" after one clean session', () => {
    const hint = getProgressionHint([session('2026-06-08T10:00:00Z', [cleanSet])], exercise);
    expect(hint.level).toBe('almost');
    expect(hint.patch).toBeUndefined();
  });

  it('breaks the streak on a missed session', () => {
    const missed = { ...cleanSet, actualReps: 6 };
    const history = [
      session('2026-06-01T10:00:00Z', [cleanSet]),
      session('2026-06-08T10:00:00Z', [missed]),
    ];
    expect(getProgressionHint(history, exercise)).toBeNull();
  });

  it('suggests +1 rep for bodyweight exercises', () => {
    const bw = { id: 'e2', name: 'Pull-Ups', sets: 4, reps: 8, weight: 0, isBodyweight: true };
    const bwSet = { exerciseName: 'Pull-Ups', targetReps: 8, actualReps: 9, isBodyweight: true };
    const history = [
      session('2026-06-01T10:00:00Z', [bwSet]),
      session('2026-06-08T10:00:00Z', [bwSet]),
    ];
    const hint = getProgressionHint(history, bw);
    expect(hint.patch).toEqual({ field: 'reps', value: 9 });
  });
});
