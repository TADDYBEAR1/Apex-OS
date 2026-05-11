import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Stepper from './Stepper';

describe('Stepper', () => {
  it('increments and decrements by the configured step', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Stepper label="Weight" value={10} onChange={onChange} min={0} max={20} step={2.5} unit="kg" />);

    await user.click(screen.getByRole('button', { name: /increase weight/i }));
    await user.click(screen.getByRole('button', { name: /decrease weight/i }));

    expect(onChange).toHaveBeenNthCalledWith(1, 12.5);
    expect(onChange).toHaveBeenNthCalledWith(2, 7.5);
  });

  it('disables controls at min and max', () => {
    render(<Stepper label="Reps" value={0} onChange={() => {}} min={0} max={0} />);

    expect(screen.getByRole('button', { name: /decrease reps/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /increase reps/i })).toBeDisabled();
  });
});
