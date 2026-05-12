// Projects component type definitions

import { Project } from "@/constants/projects";

/**
 * Props for projects category filter component
 */
export interface ProjectsCategoryFilterProps {
  /** Available project categories */
  categories: readonly string[];
  /** Currently active category */
  activeCategory: string;
  /** Category change handler */
  onCategoryChange: (category: string) => void;
}

/**
 * Props for glass project card component
 */
export interface GlassProjectCardProps {
  /** Project data object */
  project: Project;
}
