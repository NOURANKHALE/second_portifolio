// Skills component type definitions

/**
 * Props for skills category filter component
 */
export interface SkillsCategoryFilterProps {
  /** Available categories */
  categories: readonly string[];
  /** Currently active category */
  activeCategory: string;
  /** Category change handler */
  onCategoryChange: (category: string) => void;
}

/**
 * Props for skills floating orb background element
 */
export interface SkillsFloatingOrbProps {
  /** CSS classes for positioning */
  position: string;
  /** CSS classes for size */
  size: string;
  /** CSS gradient classes */
  gradient: string;
  /** Animation delay */
  delay: number;
  /** Y-axis movement direction */
  yDirection: number;
  /** Visibility state from parent */
  isVisible: boolean;
}

/**
 * Props for skill card component
 */
export interface SkillCardProps {
  /** Skill data object */
  skill: {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    iconColor: string;
    colorFrom: string;
    colorTo: string;
    level: number;
  };
  /** Color mapping for gradients */
  colorMap: Record<string, string>;
}
