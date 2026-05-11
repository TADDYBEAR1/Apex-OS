import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import FocusMode from './FocusMode';

describe('FocusMode', () => {
  it('emits a completed-set workout summary', async () => {
    const user = userEvent.setup();
    const onExit = vi.fn();
    render(
      <FocusMode
        onExit={onExit}
        exercises={[
          {
            id: 'w2-e2',
            name: 'Barbell Back Squat',
            category: 'Legs',
            section: 'main',
            sectionLabel: 'MAIN WORKOUT',
            sets: 1,
            reps: 5,
            weight: 100,
            rest: 0,
            isBodyweight: false,
          },
        ]}
      />
    );

    await user.click(screen.getByRole('button', { name: /tap to finish set/i }));

    expect(onExit).toHaveBeenCalledWith(expect.objectContaining({
      completed: true,
      totalSets: 1,
      completedSets: [
        expect.objectContaining({
          exerciseName: 'Barbell Back Squat',
          actualReps: 5,
          actualWeight: 100,
          isBodyweight: false,
          category: 'Legs',
        }),
      ],
    }));
  });
});
