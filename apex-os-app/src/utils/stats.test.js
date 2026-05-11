import { describe, expect, it } from 'vitest';
import {
  analyzeFuelCompliance,
  buildHeatmapFromWorkoutHistory,
  calculateFuelTotals,
  calculateStats,
  computeBenchmarkTrend,
} from './stats';

describe('stats utilities', () => {
  it('calculates streak from the latest real day instead of future heatmap cells', () => {
    const heatmap = [
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
    ];

    expect(calculateStats(heatmap, { latestDayIndex: 0 }).currentStreak).toBe(1);
  });

  it('builds heatmap cells from completed workout history', () => {
    const heatmap = buildHeatmapFromWorkoutHistory(
      [
        {
          completedAt: '2026-05-11T18:00:00.000Z',
          completedSets: Array.from({ length: 7 }, (_, index) => ({ index })),
        },
      ],
      4,
      new Date('2026-05-11T12:00:00.000Z')
    );

    expect(heatmap.cells[0][3]).toBe(2);
    expect(heatmap.latestDayIndex).toBe(0);
  });

  it('calculates fuel totals from checked meals only', () => {
    const totals = calculateFuelTotals({
      meals: {
        breakfast: [
          { calories: 300, protein: 30, carbs: 20, fat: 10, checked: true },
          { calories: 200, protein: 10, carbs: 25, fat: 5, checked: false },
        ],
      },
    });

    expect(totals).toEqual({ calories: 300, protein: 30, carbs: 20, fats: 10 });
  });

  it('warns when planned meals exist but none are logged', () => {
    const fuel = analyzeFuelCompliance({
      meals: {
        breakfast: [{ checked: false }],
        lunch: [{ checked: false }],
      },
    });

    expect(fuel).toEqual({ compliance: 0, total: 2, checked: 0, status: 'low' });
  });

  it('treats faster time benchmarks as positive progress', () => {
    const trend = computeBenchmarkTrend(
      [
        { value: 900, date: '2026-05-01' },
        { value: 870, date: '2026-05-08' },
      ],
      'TIME'
    );

    expect(trend.positive).toBe(true);
    expect(trend.status).toBe('improving');
    expect(trend.text).toBe('↓ 30s faster');
  });
});
