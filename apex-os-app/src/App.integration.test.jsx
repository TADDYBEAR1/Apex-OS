import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App';

describe('App integration', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('loads persisted local profile and navigates to workout', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem('apex-os-state-v1', JSON.stringify({
      profile: { name: 'Test User' },
      workoutHistory: [],
    }));

    render(<App />);

    expect(screen.getByText('TU')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'WORKOUT' }));
    expect(screen.getByRole('heading', { name: /workout/i })).toBeInTheDocument();
  });
});
