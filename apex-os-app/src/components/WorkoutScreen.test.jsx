import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import WorkoutScreen from './WorkoutScreen';
import { DEFAULT_WORKOUT_PLAN } from '../data/sampleData';

describe('WorkoutScreen', () => {
  it('passes flattened exercises with section metadata into focus mode', async () => {
    const user = userEvent.setup();
    const onEnterFocus = vi.fn();
    render(
      <WorkoutScreen
        workoutPlan={DEFAULT_WORKOUT_PLAN}
        setWorkoutPlan={() => {}}
        currentDay={2}
        setCurrentDay={() => {}}
        onEnterFocus={onEnterFocus}
        profile={{}}
        onOpenProfile={() => {}}
      />
    );

    await user.click(screen.getByRole('button', { name: /enter focus mode/i }));

    expect(onEnterFocus).toHaveBeenCalledWith(expect.objectContaining({
      day: 2,
      planName: 'Heavy Trunk',
      exercises: expect.arrayContaining([
        expect.objectContaining({ name: 'Contralateral Heavy Bulgarian Split Squat', section: 'main', sectionLabel: 'MAIN WORKOUT' }),
      ]),
    }));
  });
});
