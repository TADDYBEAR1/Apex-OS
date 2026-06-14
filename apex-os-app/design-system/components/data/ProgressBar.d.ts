import * as React from 'react';

/**
 * Hairline campaign progress bar with liquid cyan fill + glow dot.
 *
 * @startingPoint section="Data" subtitle="Glowing progress track" viewport="700x90"
 */
export interface ProgressBarProps {
  /** Completion percentage 0–100. */
  value?: number;
  /** Track height in px. @default 6 */
  height?: number;
  /** Show the glowing leading dot. @default true */
  showDot?: boolean;
  style?: React.CSSProperties;
}

export function ProgressBar(props: ProgressBarProps): JSX.Element;
export default ProgressBar;
