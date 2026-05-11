import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import FuelScreen from './FuelScreen';

const baseNutrition = {
  calorieGoal: 500,
  protein: { target: 100 },
  carbs: { target: 100 },
  fats: { target: 50 },
  meals: {
    breakfast: [{ id: 'm1', name: 'Protein Oats', calories: 300, protein: 30, carbs: 40, fat: 8, checked: false }],
    lunch: [],
    dinner: [],
    snacks: [],
  },
  groceryList: [],
};

function FuelHarness() {
  const [nutrition, setNutrition] = useState(baseNutrition);
  return <FuelScreen nutrition={nutrition} setNutrition={setNutrition} profile={{}} onOpenProfile={() => {}} />;
}

describe('FuelScreen', () => {
  it('updates calorie totals when a meal is checked', async () => {
    const user = userEvent.setup();
    render(<FuelHarness />);

    expect(screen.getByText(/0% of 500 kcal/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /protein oats/i }));

    expect(screen.getByText(/60% of 500 kcal/i)).toBeInTheDocument();
  });

  it('opens and closes the add grocery modal', async () => {
    const user = userEvent.setup();
    render(<FuelHarness />);

    await user.click(screen.getByRole('button', { name: /grocery list/i }));
    await user.click(screen.getByRole('button', { name: /add grocery item/i }));
    expect(screen.getByRole('dialog', { name: /add to provisioning queue/i })).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: /add to provisioning queue/i })).not.toBeInTheDocument();
  });
});
