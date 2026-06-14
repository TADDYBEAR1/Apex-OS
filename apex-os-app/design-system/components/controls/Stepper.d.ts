import * as React from 'react';

/** Big-target numeric stepper for in-session logging. */
export interface StepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  /** Increment per tap. @default 1 */
  step?: number;
  /** Unit suffix shown beside the value (e.g. "kg", "s"). */
  unit?: string;
  /** Optional label above the control. */
  label?: string;
}

export function Stepper(props: StepperProps): JSX.Element;
export default Stepper;
