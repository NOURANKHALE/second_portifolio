// ContactMe component type definitions

/**
 * Props for gradient orb background element
 */
export interface GradientOrbProps {
  /** CSS classes for styling */
  className: string;
  /** Animation duration in seconds */
  animationDuration: number;
  /** Animation delay in seconds */
  delay?: number;
  /** Scale from value */
  scaleFrom?: number;
  /** Scale to value */
  scaleTo?: number;
  /** Opacity from value */
  opacityFrom?: number;
  /** Opacity to value */
  opacityTo?: number;
}

/**
 * Props for contact form field components
 */
export interface ContactFormFieldProps {
  /** Field type (text, email, textarea) */
  type: "text" | "email" | "textarea";
  /** Field name attribute */
  name: string;
  /** Placeholder text */
  placeholder: string;
  /** Field value */
  value: string;
  /** Change handler */
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  /** Icon component */
  icon: React.ComponentType<{ className: string }>;
  /** Animation delay */
  delay: number;
  /** Whether element is in view */
  isInView: boolean;
  /** Whether field is required */
  required?: boolean;
  /** Number of rows for textarea */
  rows?: number;
}
