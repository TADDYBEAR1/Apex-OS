import * as React from 'react';

/**
 * Apex OS signature circular readiness gauge.
 *
 * @startingPoint section="Data" subtitle="Iridescent readiness ring" viewport="700x220"
 */
export interface ReadinessRingProps {
  /** Arc fill 0–100. @default 88 */
  value?: number;
  /** Big center number; defaults to `value`. */
  score?: number | string;
  /** Caps label under the score. @default "Ready" */
  label?: string;
  /** Diameter in px. @default 160 */
  size?: number;
  /** Arc thickness in px. @default 12 */
  stroke?: number;
  /** Three gradient stops for the arc. @default ice palette */
  stops?: [string, string, string];
  /** Unique id prefix (needed if multiple rings render on one page). */
  id?: string;
}

export function ReadinessRing(props: ReadinessRingProps): JSX.Element;
export default ReadinessRing;
