// Centralized configuration for the entire application

export const APP_CONFIG = {
  name: "Nouran Khaled",
  title: "Frontend Developer Portfolio",
  description: "A showcase of my work and skills in modern web development",
  url: "https://nourankhaled.dev",
  author: {
    name: "Nouran Khaled",
    email: "nouran.khaled@example.com",
    github: "https://github.com/NOURANKHALE",
    linkedin: "https://linkedin.com/in/nouran-khaled",
  },
} as const;

export const ANIMATION_CONFIG = {
  // Global animation settings
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.6,
    slower: 1.0,
  },
  easing: {
    easeOut: "easeOut",
    easeIn: "easeIn",
    easeInOut: "easeInOut",
    linear: "linear",
  },
  // Stagger animations
  stagger: {
    children: 0.1,
    delay: 0.05,
  },
  // Hover animations
  hover: {
    scale: 1.05,
    lift: -5,
    glow: "0 0 20px rgba(139, 92, 246, 0.3)",
  },
} as const;

export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export const COLORS = {
  primary: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },
  secondary: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7c3aed",
    800: "#6b21a8",
    900: "#581c87",
  },
  accent: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
  },
} as const;

export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
} as const;

export const PERFORMANCE_CONFIG = {
  // Debounce delays
  debounce: {
    search: 300,
    resize: 100,
    scroll: 16,
  },
  // Throttle delays
  throttle: {
    scroll: 16,
    resize: 100,
    mousemove: 16,
  },
  // Animation frame settings
  animation: {
    maxFPS: 60,
    targetFPS: 30,
  },
} as const;

export const ACCESSIBILITY_CONFIG = {
  // Focus management
  focus: {
    visible: "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500",
    ring: "focus:ring-2 focus:ring-purple-500/50",
  },
  // Screen reader
  srOnly: "sr-only",
  // High contrast
  highContrast: "contrast-more",
  // Reduced motion
  reducedMotion: "motion-reduce:transform-none motion-reduce:transition-none",
} as const;

export const SEO_CONFIG = {
  defaultTitle: "Nouran Khaled - Frontend Developer",
  titleTemplate: "%s | Nouran Khaled",
  description: "Passionate frontend developer crafting digital experiences with code and creativity",
  keywords: [
    "frontend developer",
    "react",
    "nextjs",
    "typescript",
    "tailwind css",
    "web development",
    "portfolio",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nourankhaled.dev",
    siteName: "Nouran Khaled Portfolio",
  },
  twitter: {
    cardType: "summary_large_image",
    handle: "@nourankhaled",
  },
} as const;

export const ANALYTICS_CONFIG = {
  // Google Analytics
  ga: {
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  },
  // Performance monitoring
  performance: {
    enabled: process.env.NODE_ENV === "production",
    sampleRate: 0.1,
  },
} as const;

export const FEATURE_FLAGS = {
  // Development features
  dev: {
    debugAnimations: process.env.NODE_ENV === "development",
    showPerformanceMetrics: process.env.NODE_ENV === "development",
  },
  // Production features
  prod: {
    enableAnalytics: process.env.NODE_ENV === "production",
    enableErrorReporting: process.env.NODE_ENV === "production",
  },
} as const;

// Environment configuration
export const ENV_CONFIG = {
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",
} as const;
