import { describe, expect, it } from 'vitest';
import { mergeParsedPlan, parsePlanMarkdown } from './planParser';

const SAMPLE = `# Test Plan
## Sunday — Upper A
### Warmup
- Band Pull-Aparts | 2x20 | rest 30
### Main
- Flat DB Bench | 4x8 | 22kg | rest 120 | note: per hand
- Pull-Ups | 4xAMRAP | bodyweight | rest 120
- Side Plank | 2x45s | rest 60
## יום שישי — מהירות
- Sprint 80m | 6x1 | rest 75
`;

describe('parsePlanMarkdown', () => {
  it('parses days, sections and exercises', () => {
    const parsed = parsePlanMarkdown(SAMPLE);
    expect(parsed.planName).toBe('Test Plan');
    expect(parsed.dayCount).toBe(2);
    expect(parsed.days[0].exercises.warmup).toHaveLength(1);
    expect(parsed.days[0].exercises.main).toHaveLength(3);
  });

  it('parses weight, rest and notes', () => {
    const bench = parsePlanMarkdown(SAMPLE).days[0].exercises.main[0];
    expect(bench.sets).toBe(4);
    expect(bench.reps).toBe(8);
    expect(bench.weight).toBe(22);
    expect(bench.rest).toBe(120);
    expect(bench.isBodyweight).toBe(false);
    expect(bench.note).toContain('per hand');
  });

  it('handles AMRAP and seconds', () => {
    const main = parsePlanMarkdown(SAMPLE).days[0].exercises.main;
    expect(main[1].reps).toBe(0);
    expect(main[1].note).toContain('AMRAP');
    expect(main[2].reps).toBe(45);
    expect(main[2].note).toContain('seconds');
  });

  it('recognizes Hebrew day headings', () => {
    const parsed = parsePlanMarkdown(SAMPLE);
    expect(parsed.days[5]).toBeDefined();
    expect(parsed.days[5].exercises.main).toHaveLength(1);
  });

  it('skips HTML comments and reports unparseable lines as warnings', () => {
    const md = '<!-- - Fake | 9x9 -->\n## Monday — Test\n- No Sets Exercise | 20kg\n';
    const parsed = parsePlanMarkdown(md);
    expect(parsed.exerciseCount).toBe(1);
    expect(parsed.warnings.some(w => w.includes('No Sets Exercise'))).toBe(true);
  });

  it('merge replaces only days present in the file', () => {
    const week = Array.from({ length: 7 }, (_, i) => ({ name: `Keep ${i}`, exercises: { warmup: [], main: [], cooldown: [] } }));
    const merged = mergeParsedPlan(week, parsePlanMarkdown(SAMPLE));
    expect(merged[0].name).toContain('Upper A');
    expect(merged[1].name).toBe('Keep 1');
    expect(merged[5].name).toContain('מהירות');
  });
});
