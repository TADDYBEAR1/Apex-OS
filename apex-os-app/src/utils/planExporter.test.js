import { describe, expect, it } from 'vitest';
import { exportPlanToMarkdown } from './planExporter';
import { parsePlanMarkdown } from './planParser';

const emptyWeek = () => Array.from({ length: 7 }, () => ({ name: 'Rest Day', exercises: { warmup: [], main: [], cooldown: [] } }));

describe('exportPlanToMarkdown (round-trip)', () => {
  it('survives export → import without data loss', () => {
    const plan = emptyWeek();
    plan[0] = {
      name: 'Upper A',
      exercises: {
        warmup: [{ name: 'Band Pull-Aparts', sets: 2, reps: 20, weight: 0, rest: 30, isBodyweight: true }],
        main: [
          { name: 'Flat DB Bench', sets: 4, reps: 8, weight: 22, rest: 120, isBodyweight: false, note: 'per hand' },
          { name: 'Pull-Ups', sets: 4, reps: 0, weight: 0, rest: 120, isBodyweight: true },
        ],
        cooldown: [],
      },
    };

    const md = exportPlanToMarkdown(plan, 'RT');
    const parsed = parsePlanMarkdown(md);

    expect(parsed.warnings).toHaveLength(0);
    const back = parsed.days[0];
    expect(back.exercises.main[0].weight).toBe(22);
    expect(back.exercises.main[0].rest).toBe(120);
    expect(back.exercises.main[1].reps).toBe(0); // AMRAP preserved
    expect(back.exercises.warmup).toHaveLength(1);
  });

  it('skips rest days entirely', () => {
    const md = exportPlanToMarkdown(emptyWeek(), 'Empty');
    expect(md).not.toContain('## ');
  });
});
