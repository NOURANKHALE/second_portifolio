import { Code, Palette, Zap, Cpu } from "lucide-react";

// Profile image configuration
export const PROFILE_IMAGE = {
  src: "/assets/profile.jpeg",
  alt: "Nouran Khaled",
  width: 220,
  height: 220,
} as const;

// Animation configuration
export const ABOUT_ANIMATION_CONFIG = {
  viewportMargin: "-20%",
  viewportOnce: false,
  backgroundElementsCount: 15,
} as const;

// Features data
export const features = [
  {
    title: "Web Development",
    description: "Creating responsive and performant web applications",
    icon: Code,
  },
  {
    title: "UI/UX Design",
    description: "Crafting intuitive and beautiful user experiences",
    icon: Palette,
  },
  {
    title: "Animation",
    description: "Bringing interfaces to life with smooth animations",
    icon: Zap,
  },
  {
    title: "Optimization",
    description: "Ensuring fast load times and smooth performance",
    icon: Cpu,
  },
];
