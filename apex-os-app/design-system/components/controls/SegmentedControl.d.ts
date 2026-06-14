import * as React from 'react';

export interface SegmentOption {
  key: string;
  label: string;
}

/**
 * Pill segmented control for switching between 2–4 views.
 *
 * @startingPoint section="Controls" subtitle="Segmented view switcher" viewport="700x120"
 */
export interface SegmentedControlProps {
  options: SegmentOption[];
  /** Key of the active segment. */
  value: string;
  onChange: (key: string) => void;
  style?: React.CSSProperties;
}

export function SegmentedControl(props: SegmentedControlProps): JSX.Element;
export default SegmentedControl;
