/**
 * Common component types used across the application
 */
import * as THREE from "three";

// Navigation types
export interface NavItemProps {
  item: {
    id: string;
    label: string;
  };
  index: number;
  activeSection: string;
  onClick: (sectionId: string) => void;
  isMobile?: boolean;
}

// Three.js and animation types
export interface MousePosition {
  x: number;
  y: number;
}

export interface ThreeBackgroundProps {
  /** Item being hovered to increase particle activity */
  hoveredItem?: string | null;
}

export interface ParticleSystem {
  geometry: THREE.BufferGeometry;
  material: THREE.PointsMaterial;
  points: THREE.Points;
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface FormFieldProps {
  label: string;
  name: keyof ContactFormData;
  type?: "text" | "email" | "textarea";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

// Project types
export interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
    category?: string;
  };
  index: number;
}

export interface CategoryFilterProps {
  categories: readonly string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

// Layout and utility types
export interface AnimationVariants {
  initial: object;
  animate: object;
  exit?: object;
  transition?: object;
}

export interface ScrollConfig {
  threshold: number;
  offset: number;
}

export interface AnimationConfig {
  duration: number;
  ease?: string;
  delay?: number;
}

// Common props patterns
export interface ComponentWithChildren {
  children: React.ReactNode;
}

export interface ComponentWithClassName {
  className?: string;
}

export interface ComponentWithAnimation {
  initial?: object;
  animate?: object;
  transition?: object;
}
