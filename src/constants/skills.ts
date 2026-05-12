import {
  Atom,
  Square,
  FileCode,
  Zap,
  Waves,
  FileText,
  Palette,
  GitBranch,
  Github,
  PenTool,
  Wrench,
  Film,
  Paintbrush,
  ScrollText,
} from "lucide-react";

// Skills configuration constants
export const SKILLS_CONFIG = {
  /** Intersection observer threshold for section visibility */
  observerThreshold: 0.2,
  /** Grid layout configuration */
  gridCols: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
  /** Icon container dimensions */
  iconSize: "w-14 h-14",
  /** Progress bar height */
  progressBarHeight: "h-1.5",
  /** Available skill categories */
  categories: ["all", "frontend", "tools", "libraries"] as const,
} as const;

// Animation configuration for Skills component
export const SKILLS_ANIMATION_CONFIG = {
  /** Card hover animation */
  cardHover: {
    y: -8,
    duration: 0.3,
  },
  /** Container stagger timing */
  containerStagger: 0.04,
  /** Floating elements animation */
  floatingElements: {
    duration: 1,
    leftDelay: 0.5,
    rightDelay: 0.7,
  },
  /** Icon scale on hover */
  iconScale: {
    scale: 1.1,
    duration: 0.3,
  },
} as const;

// Visual configuration for Skills component
export const VISUAL_CONFIG = {
  /** Section styling */
  section: {
    minHeight: "min-h-screen",
    background: "bg-black",
    padding: "py-9",
  },
  /** Floating orb configurations */
  floatingOrbs: {
    left: {
      size: "w-24 h-24",
      position: "left-10",
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    right: {
      size: "w-32 h-32",
      position: "right-10",
      gradient: "from-cyan-500/20 to-blue-500/20",
    },
  },
} as const;

// Color mapping for Tailwind gradient classes
export const SKILL_COLOR_MAP: Record<string, string> = {
  "sky-500": "from-sky-500",
  "blue-600": "to-blue-600",
  "gray-800": "from-gray-800",
  "gray-500": "to-gray-500",
  "blue-500": "from-blue-500",
  "blue-700": "to-blue-700",
  "yellow-400": "from-yellow-400",
  "yellow-600": "to-yellow-600",
  "cyan-400": "from-cyan-400",
  "teal-500": "to-teal-500",
  "orange-500": "from-orange-500",
  "red-500": "to-red-500",
  "blue-400": "from-blue-400",
  "indigo-600": "to-indigo-600",
  "green-500": "from-green-500",
  "emerald-600": "to-emerald-600",
  "pink-500": "from-pink-500",
  "purple-600": "to-purple-600",
  "red-600": "to-red-600",
  "orange-600": "to-orange-600",
  "gray-700": "to-gray-700",
  "slate-600": "to-slate-600",
  "violet-500": "from-violet-500",
  "violet-700": "to-violet-700",
};

export const skillCategories = [
  { id: "all", name: "All Skills" },
  { id: "frontend", name: "Frontend" },
  { id: "tools", name: "Tools" },
  { id: "libraries", name: "Libraries" },
];

export const skills = [
  {
    name: "React",
    icon: Atom,
    iconColor: "w-6 h-6 text-sky-500",
    category: "frontend",
    level: 95,
    colorFrom: "sky-500",
    colorTo: "blue-600",
  },
  {
    name: "Next.js",
    icon: Square,
    iconColor: "w-6 h-6 text-black dark:text-white",
    category: "frontend",
    level: 90,
    colorFrom: "gray-800",
    colorTo: "gray-500",
  },
  {
    name: "TypeScript",
    icon: FileCode,
    iconColor: "w-6 h-6 text-blue-500",
    category: "frontend",
    level: 88,
    colorFrom: "blue-500",
    colorTo: "blue-700",
  },
  {
    name: "JavaScript",
    icon: Zap,
    iconColor: "w-6 h-6 text-yellow-400",
    category: "frontend",
    level: 93,
    colorFrom: "yellow-400",
    colorTo: "yellow-600",
  },
  {
    name: "Tailwind CSS",
    icon: Waves,
    iconColor: "w-6 h-6 text-cyan-400",
    category: "frontend",
    level: 91,
    colorFrom: "cyan-400",
    colorTo: "teal-500",
  },
  {
    name: "HTML5",
    icon: FileText,
    iconColor: "w-6 h-6 text-orange-500",
    category: "frontend",
    level: 96,
    colorFrom: "orange-500",
    colorTo: "red-500",
  },
  {
    name: "CSS",
    icon: Palette,
    iconColor: "w-6 h-6 text-blue-400",
    category: "frontend",
    level: 90,
    colorFrom: "blue-400",
    colorTo: "indigo-500",
  },
  {
    name: "Git",
    icon: GitBranch,
    iconColor: "w-6 h-6 text-red-500",
    category: "tools",
    level: 87,
    colorFrom: "red-500",
    colorTo: "orange-500",
  },
  {
    name: "GitHub",
    icon: Github,
    iconColor: "w-6 h-6 text-gray-800 dark:text-white",
    category: "tools",
    level: 89,
    colorFrom: "gray-700",
    colorTo: "gray-900",
  },
  {
    name: "Figma",
    icon: PenTool,
    iconColor: "w-6 h-6 text-pink-500",
    category: "tools",
    level: 82,
    colorFrom: "pink-500",
    colorTo: "purple-500",
  },
  {
    name: "Redux Toolkit",
    icon: Wrench,
    iconColor: "w-6 h-6 text-purple-500",
    category: "libraries",
    level: 85,
    colorFrom: "purple-500",
    colorTo: "indigo-600",
  },
  {
    name: "Framer Motion",
    icon: Film,
    iconColor: "w-6 h-6 text-pink-400",
    category: "libraries",
    level: 83,
    colorFrom: "pink-400",
    colorTo: "rose-500",
  },
  {
    name: "Shadcn UI",
    icon: Paintbrush,
    iconColor: "w-6 h-6 text-emerald-500",
    category: "libraries",
    level: 80,
    colorFrom: "emerald-500",
    colorTo: "green-600",
  },
  {
    name: "Zod",
    icon: ScrollText,
    iconColor: "w-6 h-6 text-green-600",
    category: "libraries",
    level: 84,
    colorFrom: "green-600",
    colorTo: "emerald-600",
  },
];
