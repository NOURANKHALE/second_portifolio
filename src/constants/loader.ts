/**
 * Loader component constants
 */

// Loader configuration
export const LOADER_CONFIG = {
  totalFrames: 180,
  particleCount: 500,
  cameraDistance: 10,
  animationSpeed: {
    portal: 0.01,
    sphere: 0.015,
    particles: 0.03,
    glow: 0.005,
  },
  colors: {
    portal: 0xbe27f5,
    glow: [0xbe27f5, 0x8a2be2, 0x4b0082],
    ambient: 0xffffff,
    background: 0x000000,
  },
  sizes: {
    portal: { radius: 3, tube: 0.5 },
    sphere: 0.7,
    glowOffset: 0.3,
    glowTube: 0.7,
  },
} as const;

// Styling configuration
export const STYLES = {
  container: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    background: "radial-gradient(ellipse at center, #0a0a1a 0%, #000000 70%)",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center" as const,
    alignItems: "center" as const,
    flexDirection: "column" as const,
    fontFamily: '"Arial", sans-serif',
    overflow: "hidden" as const,
  },
  progressBar: {
    position: "absolute" as const,
    bottom: "40px",
    width: "200px",
    height: "4px",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "2px",
    overflow: "hidden" as const,
  },
  progressFill: (progress: number) => ({
    width: `${progress}%`,
    height: "100%",
    background: "linear-gradient(90deg, #BE27F5, #4B0082)",
    transition: "width 0.3s ease-out",
    borderRadius: "2px",
    overflow: "hidden" as const,
  }),
  percentageText: {
    position: "absolute" as const,
    bottom: "60px",
    color: "white",
    fontSize: "14px",
    fontWeight: "300" as const,
    letterSpacing: "1px",
  },
  loadingText: {
    position: "absolute" as const,
    bottom: "20px",
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "12px",
    fontWeight: "300" as const,
    letterSpacing: "2px",
    textTransform: "uppercase" as const,
    overflow: "hidden" as const,
  },
};
