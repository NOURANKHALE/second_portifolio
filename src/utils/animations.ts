import { Variants } from "framer-motion";

// Common animation variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

export const staggerContainer = (delay: number = 0.1): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: delay,
      delayChildren: 0.1,
    },
  },
});

export const containerStagger = (delay: number = 0.1): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: delay,
      delayChildren: 0.1,
    },
  },
});

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2 },
};

export const hoverLift = {
  y: -5,
  transition: { duration: 0.3 },
};

export const hoverRotate = {
  rotate: 5,
  transition: { duration: 0.3 },
};

// Page transition variants
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Card flip animations
export const cardFlip: Variants = {
  front: {
    rotateY: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  back: {
    rotateY: 180,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

// Loading animations
export const loadingPulse = {
  scale: [1, 1.1, 1],
  opacity: [0.5, 1, 0.5],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const loadingSpin = {
  rotate: 360,
  transition: {
    duration: 1,
    repeat: Infinity,
    ease: "linear",
  },
};

// Floating animations
export const floating = {
  y: [-6, 6, -6],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const floatingRotate = {
  y: [-6, 6, -6],
  rotate: [0, 5, -5, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// Gradient animations
export const gradientPulse = {
  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "linear",
  },
};

// Enhanced transition configurations for smoother animations
export const transitions = {
  fast: { duration: 0.2, ease: "easeOut" },
  normal: { duration: 0.3, ease: "easeOut" },
  slow: { duration: 0.6, ease: "easeOut" },
  spring: { type: "spring", stiffness: 300, damping: 30, mass: 1 },
  bounce: { type: "spring", stiffness: 400, damping: 10, mass: 0.8 },
  smooth: { duration: 0.4, ease: "easeInOut" },
  elastic: { type: "spring", stiffness: 200, damping: 20, mass: 1.2 },
  gentle: { duration: 0.5, ease: "easeInOut" },
} as const;

// Performance-optimized animation presets
export const animationPresets = {
  // Page transitions
  pageEnter: {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.98 },
    transition: { duration: 0.4, ease: "easeInOut" }
  },
  
  // Card animations
  cardHover: {
    whileHover: { 
      y: -8, 
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    whileTap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  },
  
  // Button animations
  buttonPress: {
    whileHover: { 
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    whileTap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  },
  
  // Text animations
  textReveal: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeInOut" }
  },
  
  // Loading animations
  loadingPulse: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  
  // Stagger animations
  staggerContainer: (delay: number = 0.1) => ({
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        delayChildren: 0.1,
        ease: "easeOut"
      }
    }
  })
} as const;

// Reduced motion support
export const reducedMotionVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  },
  slideIn: {
    hidden: { opacity: 0, x: 0, y: 0 },
    show: { opacity: 1, x: 0, y: 0 }
  }
} as const;