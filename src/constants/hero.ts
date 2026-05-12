/**
 * Hero component constants
 */

// Typing animation configuration
export const TYPING_CONFIG = {
  typeSpeed: 100,
  eraseSpeed: 50,
  displayTime: 2000,
  pauseTime: 500,
} as const;

// Canvas configuration for Three.js
export const CANVAS_CONFIG = {
  aspectRatio: 2,
  pixelRatio: 2,
  camera: {
    fov: 75,
    near: 0.1,
    far: 1000,
    position: { z: 7 },
  },
  mouse: {
    dampening: 0.01,
    range: 2,
  },
} as const;

// External links
export const HERO_LINKS = {
  projects: "https://github.com/NOURANKHALE?tab=repositories",
  cv: "https://drive.google.com/drive/u/0/folders/1ISUwI_jccXr4jGxoHxRIthxWgM5kDsJQ",
} as const;

// Typing animation texts
export const TYPING_TEXTS = [
  "Bringing Interfaces to Life",
  "Next.js | React | Tailwind CSS | Shadcn UI",
  "Front-End Developer You Can Trust",
  "Turning Concepts Into Web Reality",
] as const;
