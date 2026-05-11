import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import SwipeToComplete from './SwipeToComplete';

describe('SwipeToComplete', () => {
  it('supports tap fallback completion', async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<SwipeToComplete onComplete={onComplete} />);

    await user.click(screen.getByRole('button', { name: /tap to finish set/i }));

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('supports keyboard completion on the thumb', () => {
    const onComplete = vi.fn();
    render(<SwipeToComplete onComplete={onComplete} label="SWIPE TO FINISH SET" />);

    fireEvent.keyDown(screen.getByRole('button', { name: /swipe to finish set/i }), { key: 'Enter' });

    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
