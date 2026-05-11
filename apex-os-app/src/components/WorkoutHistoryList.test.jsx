import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import WorkoutHistoryList from './WorkoutHistoryList';

const session = {
  id: 'session-1',
  planName: 'Test Session',
  date: '2026-05-11',
  completedAt: '2026-05-11T18:00:00.000Z',
  durationSeconds: 1800,
  plannedSetCount: 2,
  totalSets: 2,
  completedSets: [
    {
      id: 'set-1',
      exerciseId: 'e3',
      exerciseName: 'Barbell Back Squat',
      section: 'main',
      setNumber: 1,
      actualReps: 5,
      actualWeight: 100,
      isBodyweight: false,
    },
  ],
};

describe('WorkoutHistoryList', () => {
  it('edits session name and completed set data', async () => {
    const user = userEvent.setup();
    const onUpdateSession = vi.fn();
    render(<WorkoutHistoryList sessions={[session]} onUpdateSession={onUpdateSession} onDeleteSession={() => {}} />);

    await user.click(screen.getByRole('button', { name: /edit/i }));
    await user.clear(screen.getByLabelText(/workout name/i));
    await user.type(screen.getByLabelText(/workout name/i), 'Edited Session');
    await user.clear(screen.getByLabelText(/^reps$/i));
    await user.type(screen.getByLabelText(/^reps$/i), '7');
    await user.clear(screen.getByLabelText(/^weight$/i));
    await user.type(screen.getByLabelText(/^weight$/i), '110');
    await user.click(screen.getByRole('button', { name: /save workout/i }));

    expect(onUpdateSession).toHaveBeenCalledWith('session-1', expect.objectContaining({
      planName: 'Edited Session',
      completedSets: [
        expect.objectContaining({ actualReps: 7, actualWeight: 110 }),
      ],
    }));
  });

  it('deletes a session after confirmation', async () => {
    const user = userEvent.setup();
    const onDeleteSession = vi.fn();
    window.confirm = vi.fn(() => true);

    render(<WorkoutHistoryList sessions={[session]} onUpdateSession={() => {}} onDeleteSession={onDeleteSession} />);

    await user.click(screen.getByRole('button', { name: /delete test session/i }));

    expect(onDeleteSession).toHaveBeenCalledWith('session-1');
  });

  it('deletes individual completed sets inside the editor', async () => {
    const user = userEvent.setup();
    const onUpdateSession = vi.fn();
    render(<WorkoutHistoryList sessions={[session]} onUpdateSession={onUpdateSession} onDeleteSession={() => {}} />);

    await user.click(screen.getByRole('button', { name: /edit/i }));
    const dialog = screen.getByRole('dialog', { name: /edit workout history/i });
    await user.click(within(dialog).getByRole('button', { name: /delete set 1/i }));
    await user.click(screen.getByRole('button', { name: /save workout/i }));

    expect(onUpdateSession).toHaveBeenCalledWith('session-1', expect.objectContaining({
      completedSets: [],
    }));
  });
});
