import * as React from 'react';

/**
 * Apex OS pill button — uppercase, glassy, cyan-on-hover.
 *
 * @startingPoint section="Buttons" subtitle="Pill button with four variants" viewport="700x120"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. @default "primary" */
  variant?: 'primary' | 'surface' | 'ghost' | 'solid';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Stretch to fill container width. @default false */
  fullWidth?: boolean;
  /** Optional leading icon node. */
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
export default Button;
