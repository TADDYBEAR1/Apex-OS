import { describe, expect, it } from 'vitest';
import {
  analyzeFuelCompliance,
  applyWorkoutPersonalRecords,
  buildHeatmapFromWorkoutHistory,
  calculateFuelTotals,
  calculateStats,
  computeBenchmarkTrend,
  estimateOneRepMax,
  getCompletedSetBenchmarkCandidates,
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

  it('estimates weighted one-rep max from reps and load', () => {
    expect(estimateOneRepMax(100, 5)).toBe(116.7);
  });

  it('extracts best weighted and bodyweight PR candidates from main sets only', () => {
    const candidates = getCompletedSetBenchmarkCandidates([
      { exerciseName: 'Barbell Back Squat', actualWeight: 100, actualReps: 5, isBodyweight: false, section: 'main' },
      { exerciseName: 'Barbell Back Squat', actualWeight: 110, actualReps: 3, isBodyweight: false, section: 'main' },
      { exerciseName: 'Pull Ups', actualWeight: 0, actualReps: 13, isBodyweight: true, section: 'main' },
      { exerciseName: 'Deadlift', actualWeight: 160, actualReps: 5, isBodyweight: false, section: 'warmup' },
    ]);

    expect(candidates).toHaveLength(2);
    expect(candidates.find(c => c.exerciseName === 'Pull Ups').value).toBe(13);
    expect(candidates.find(c => c.exerciseName === 'Barbell Back Squat').value).toBe(121);
  });

  it('appends detected PRs to matching benchmark history', () => {
    const result = applyWorkoutPersonalRecords(
      [
        {
          label: 'Back Squat 1RM',
          unit: 'KG',
          value: 120,
          history: [{ value: 120, date: '2026-05-01' }],
        },
      ],
      [
        {
          exerciseName: 'Barbell Back Squat',
          actualWeight: 115,
          actualReps: 3,
          isBodyweight: false,
          section: 'main',
        },
      ],
      '2026-05-11T18:00:00.000Z'
    );

    expect(result.detected).toHaveLength(1);
    expect(result.benchmarks[0].history.at(-1)).toMatchObject({ value: 126.5, date: '2026-05-11' });
  });

  it('prevents duplicate same-day same-value PR entries', () => {
    const result = applyWorkoutPersonalRecords(
      [
        {
          label: 'Max Pull-Ups',
          unit: 'REPS',
          value: 13,
          history: [{ value: 13, date: '2026-05-11' }],
        },
      ],
      [
        {
          exerciseName: 'Pull Ups',
          actualWeight: 0,
          actualReps: 13,
          isBodyweight: true,
          section: 'main',
        },
      ],
      '2026-05-11T19:00:00.000Z'
    );

    expect(result.detected).toHaveLength(0);
    expect(result.benchmarks[0].history).toHaveLength(1);
  });
});
