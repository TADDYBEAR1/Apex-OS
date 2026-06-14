import * as React from 'react';

/** Capsule label for exercise categories, status and tags. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Semantic category color. @default "neutral" */
  tone?: 'strength' | 'bodyweight' | 'endurance' | 'cyan' | 'neutral';
  children?: React.ReactNode;
}

export function Badge(props: BadgeProps): JSX.Element;
export default Badge;
