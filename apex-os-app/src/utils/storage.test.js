import { describe, expect, it } from 'vitest';
import { normalizeDailyAppState, resetMealChecks } from './storage';

describe('storage utilities', () => {
  it('resets checked meals when normalizing a new calendar day', () => {
    const state = normalizeDailyAppState(
      {
        lastMealResetDate: '2026-05-11',
        nutrition: {
          meals: {
            breakfast: [{ id: 'm1', name: 'Oats', checked: true }],
            lunch: [{ id: 'm2', name: 'Chicken', checked: true }],
          },
        },
      },
      '2026-05-12'
    );

    expect(state.lastMealResetDate).toBe('2026-05-12');
    expect(state.nutrition.meals.breakfast[0].checked).toBe(false);
    expect(state.nutrition.meals.lunch[0].checked).toBe(false);
  });

  it('preserves meal checks during the same calendar day', () => {
    const state = normalizeDailyAppState(
      {
        lastMealResetDate: '2026-05-12',
        nutrition: {
          meals: {
            breakfast: [{ id: 'm1', name: 'Oats', checked: true }],
          },
        },
      },
      '2026-05-12'
    );

    expect(state.nutrition.meals.breakfast[0].checked).toBe(true);
  });

  it('resets only meal check state and keeps meal details', () => {
    const nutrition = resetMealChecks({
      meals: {
        lunch: [{ id: 'm2', name: 'Chicken', calories: 580, checked: true }],
      },
    });

    expect(nutrition.meals.lunch[0]).toMatchObject({
      id: 'm2',
      name: 'Chicken',
      calories: 580,
      checked: false,
    });
  });
});
