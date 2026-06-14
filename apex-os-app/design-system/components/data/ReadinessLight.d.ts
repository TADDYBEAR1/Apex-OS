import * as React from 'react';

/** Morning-gate readiness verdict chip (GO / CAUTION / HOLD). */
export interface ReadinessLightProps {
  /** Traffic-light state. @default "green" */
  light?: 'green' | 'yellow' | 'red';
  /** Readiness score 0–100. */
  score?: number;
  /** Override the state title. */
  title?: string;
  /** One-line coaching recommendation. */
  recommendation?: string;
}

export function ReadinessLight(props: ReadinessLightProps): JSX.Element;
export default ReadinessLight;
