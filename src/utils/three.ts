/**
 * Three.js utility functions
 */
import * as THREE from "three";
import type { ParticleSystem } from "@/types/components";

// Three.js configuration constants
export const PARTICLE_CONFIG = {
  /** Total number of particles to render */
  count: 600,
  /** Particle system boundaries */
  boundarySize: 20,
  /** Collision boundary for wrapping */
  collisionBoundary: 10,
  /** Base particle size range */
  sizeRange: {
    min: 0.01,
    max: 0.05,
  },
  /** Particle velocity range */
  velocityRange: 0.005,
} as const;

export const CAMERA_CONFIG = {
  /** Field of view */
  fov: 75,
  /** Camera position on Z-axis */
  positionZ: 5,
  /** Near clipping plane */
  near: 0.1,
  /** Far clipping plane */
  far: 1000,
} as const;

export const ANIMATION_CONFIG = {
  /** Time-based animation speed */
  timeMultiplier: 0.001,
  /** Mouse interaction force */
  mouseInteraction: {
    radius: 2,
    force: 0.02,
  },
  /** Particle system rotation speeds */
  rotation: {
    y: 0.0005,
    x: 0.0003,
  },
  /** Organic movement noise intensity */
  noiseIntensity: 0.001,
  /** Hover interaction intensity multiplier */
  hoverIntensity: {
    active: 0.5,
    idle: 0.1,
  },
} as const;

export const MATERIAL_CONFIG = {
  /** Base particle size */
  size: 0.05,
  /** Material opacity */
  opacity: 0.8,
  /** Maximum pixel ratio for performance */
  maxPixelRatio: 2,
} as const;

// Color palette for particles
export const PARTICLE_COLORS = [
  new THREE.Color(0xbe27f5), // Purple
  new THREE.Color(0x27b5f5), // Blue
  new THREE.Color(0x27f5be), // Cyan
  new THREE.Color(0xf5be27), // Yellow
] as const;

/**
 * Creates particle system geometry with positions, colors, sizes, and velocities
 */
export const createParticleSystem = (): ParticleSystem => {
  const positions = new Float32Array(PARTICLE_CONFIG.count * 3);
  const colors = new Float32Array(PARTICLE_CONFIG.count * 3);
  const sizes = new Float32Array(PARTICLE_CONFIG.count);
  const velocities = new Float32Array(PARTICLE_CONFIG.count * 3);

  for (let i = 0; i < PARTICLE_CONFIG.count; i++) {
    const i3 = i * 3;

    // Positions within boundary
    positions[i3] = (Math.random() - 0.5) * PARTICLE_CONFIG.boundarySize;
    positions[i3 + 1] = (Math.random() - 0.5) * PARTICLE_CONFIG.boundarySize;
    positions[i3 + 2] = (Math.random() - 0.5) * PARTICLE_CONFIG.boundarySize;

    // Random colors from palette
    const color =
      PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;

    // Random sizes within range
    const sizeRange = PARTICLE_CONFIG.sizeRange;
    sizes[i] = Math.random() * (sizeRange.max - sizeRange.min) + sizeRange.min;

    // Random velocities
    velocities[i3] = (Math.random() - 0.5) * PARTICLE_CONFIG.velocityRange;
    velocities[i3 + 1] = (Math.random() - 0.5) * PARTICLE_CONFIG.velocityRange;
    velocities[i3 + 2] = (Math.random() - 0.5) * PARTICLE_CONFIG.velocityRange;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3));

  const material = new THREE.PointsMaterial({
    size: MATERIAL_CONFIG.size,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: MATERIAL_CONFIG.opacity,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);

  return { geometry, material, points };
};

/**
 * Creates and configures the Three.js camera
 */
export const createCamera = (): THREE.PerspectiveCamera => {
  const camera = new THREE.PerspectiveCamera(
    CAMERA_CONFIG.fov,
    window.innerWidth / window.innerHeight,
    CAMERA_CONFIG.near,
    CAMERA_CONFIG.far
  );
  camera.position.z = CAMERA_CONFIG.positionZ;
  return camera;
};

/**
 * Creates and configures the Three.js renderer
 */
export const createRenderer = (
  canvas: HTMLCanvasElement
): THREE.WebGLRenderer => {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, MATERIAL_CONFIG.maxPixelRatio)
  );
  return renderer;
};

/**
 * Create a basic Three.js scene with standard setup
 */
export const createScene = (): THREE.Scene => {
  return new THREE.Scene();
};

/**
 * Create standard lighting setup for Three.js scenes
 */
export const createLighting = (scene: THREE.Scene): void => {
  // Ambient light
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);

  // Directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Point light with purple tint
  const pointLight = new THREE.PointLight(0xa855f7, 1, 100);
  pointLight.position.set(0, 2, 5);
  scene.add(pointLight);
};

/**
 * Dispose of Three.js resources properly
 */
export const disposeThreeResources = (
  renderer: THREE.WebGLRenderer,
  geometry?: THREE.BufferGeometry,
  material?: THREE.Material
): void => {
  renderer.dispose();
  geometry?.dispose();
  material?.dispose();
};
