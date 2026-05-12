// AboutMe component type definitions

/**
 * Props for floating icon component
 */
export interface FloatingIconProps {
  /** CSS classes for styling */
  className: string;
  /** Icon component to render */
  Icon: React.ComponentType<{ className: string }>;
  /** Animation properties */
  animate: Record<string, number[]>;
  /** Transition properties */
  transition: Record<string, number | string | boolean>;
  /** Hover animation properties */
  whileHover: Record<string, number | string>;
}
