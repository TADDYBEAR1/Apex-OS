import * as React from 'react';

/** Round hairline icon button for inline actions. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible label (required — these are icon-only). */
  label: string;
  /** Ring + glyph color. @default "muted" */
  tone?: 'muted' | 'primary' | 'danger';
  /** Pixel diameter. @default 32 */
  size?: number;
  children?: React.ReactNode;
}

export function IconButton(props: IconButtonProps): JSX.Element;
export default IconButton;
