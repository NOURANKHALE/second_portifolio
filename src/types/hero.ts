// Hero component type definitions

/**
 * Props for hero button components
 */
export interface HeroButtonProps {
  /** Button link href */
  href: string;
  /** Button text content */
  children: React.ReactNode;
  /** Button variant style */
  variant: "primary" | "secondary";
  /** Accessibility label */
  ariaLabel: string;
}
