import * as React from 'react';

export interface NavTab {
  key: string;
  label: string;
  /** Icon key override; defaults to the tab key. One of home|workout|stats|fuel. */
  icon?: 'home' | 'workout' | 'stats' | 'fuel';
}

/**
 * Floating glass pill bottom navigation for the Apex OS app.
 *
 * @startingPoint section="Navigation" subtitle="Floating glass tab bar" viewport="420x96"
 */
export interface BottomNavProps {
  /** Key of the active tab. */
  activeTab: string;
  onTabChange?: (key: string) => void;
  /** Override the four default tabs (HUB / WORKOUT / STATS / FUEL). */
  tabs?: NavTab[];
  /** Fix to the bottom of the viewport. @default true */
  fixed?: boolean;
}

export function BottomNav(props: BottomNavProps): JSX.Element;
export default BottomNav;
