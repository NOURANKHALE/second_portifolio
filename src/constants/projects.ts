export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

// Project configuration constants
export const PROJECT_CONFIG = {
  categories: ["All", "Next.js", "Redux toolkit", "Tailwindcss"] as const,
  cardHeight: 384, // h-96 = 24rem = 384px
  maxTagsDisplay: 2,
  perspective: 1000,
} as const;

// Animation configuration
export const PROJECTS_ANIMATION_CONFIG = {
  cardHover: {
    y: -10,
    duration: 0.3,
  },
  cardFlip: {
    duration: 0.6,
    ease: "easeInOut" as const,
  },
  categoryFilter: {
    duration: 0.5,
  },
  stagger: {
    delayChildren: 0.1,
    staggerChildren: 0.1,
  },
} as const;

// Mouse interaction configuration
export const MOUSE_INTERACTION = {
  rotationRange: 10,
  mouseRange: 100,
  springConfig: {
    stiffness: 300,
    damping: 15,
  },
} as const;

export const projects: Project[] = [
  {
    id: 1,
    title: "Weather Dashboard",
    description: "Modern weather app with maps, charts & AI clothing advice.",
    image: "/assets/weather.png",
    link: "#",
    tags: [
      "Nextjs",
      "open weather api",
      "Tailwindcss",
      "Redux toolkit",
      "Shadcn ui",
      "Framer motion",
      "Recharts",
      "Typescript",
      "Dnd kit",
    ],
  },
  {
    id: 3,
    title: "Task Manager",
    description: "Beautiful task management with drag & drop cards.",
    image: "/assets/task manager.png",
    link: "https://task-manager-sand-mu.vercel.app/",
    tags: [
      "Nextjs",
      "DnD Kit",
      "Local Storage",
      "Framer Motion",
      "Tailwindcss",
      "Typescript",
    ],
  },
  {
    id: 2,
    title: "E-Commerce Store",
    description: "Full-featured store built with Next.js & Redux.",
    image: "/assets/ecommerce.png",
    link: "#",
    tags: [
      "Next.js",
      "Redux Toolkit",
      "Shadcn ui",
      "Tailwind Css",
      "Framer Motion",
    ],
  },
  {
    id: 4,
    title: "To Do List",
    description: "A simple to do list app with a clean UI.",
    image: "/assets/to do .png",
    link: "https://to-do-list-one-flax.vercel.app/",
    tags: ["Nextjs", "LocalStorage", "Shadcn ui", "Tailwindcss", "Typescript"],
  },
  {
    id: 5,
    title: "Emotion Detection",
    description: "web app to detect emotions from text, audio, video.",
    image: "/assets/emotion detection.png",
    link: "#",
    tags: [
      "Next.js",
      "Shadcn ui",
      "Tailwind Css",
      "Framer Motion",
      "Typescript",
      "Dnd kit",
    ],
  },
  {
    id: 6,
    title: "Coffee",
    description: "Simple Homepage for a coffee shop.",
    image: "/assets/coffee.png",
    link: "https://coffee-lake-alpha.vercel.app/",
    tags: ["Html", "Javascript", "Tailwind Css"],
  },
];
