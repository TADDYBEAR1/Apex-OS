import * as React from 'react';

/** Label-over-number stat readout in the instrument-cluster style. */
export interface StatReadoutProps {
  /** Wide-tracked caps label. */
  label: string;
  value: string | number;
  /** Optional unit suffix. */
  unit?: string;
  /** Render the number in glowing cyan. @default false */
  accent?: boolean;
  /** Number font-size in px. @default 32 */
  size?: number;
  /** @default "left" */
  align?: 'left' | 'center';
}

export function StatReadout(props: StatReadoutProps): JSX.Element;
export default StatReadout;
