import * as React from 'react';

/**
 * Glass panel container — the base surface for every Apex OS screen.
 *
 * @startingPoint section="Surfaces" subtitle="Hairline glass card" viewport="700x180"
 */
export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** When provided, the card becomes a focusable, hoverable button. */
  onClick?: (e: React.MouseEvent) => void;
  /** Wrap in a static cyan glow. @default false */
  glow?: boolean;
  /** Inner padding in px (or any CSS length). @default 24 */
  padding?: number | string;
  children?: React.ReactNode;
}

export function GlassCard(props: GlassCardProps): JSX.Element;
export default GlassCard;
