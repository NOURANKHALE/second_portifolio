"use client";

import { useRef, useEffect, useCallback, memo } from "react";
import * as THREE from "three";
import { useMouseTracking } from "@/hooks";
import type { ThreeBackgroundProps } from "@/types/components";
import { 
  PARTICLE_CONFIG, 
  ANIMATION_CONFIG,
  createParticleSystem, 
  createCamera, 
  createRenderer 
} from "@/utils/three";

const ThreeBackground = memo(({ hoveredItem }: ThreeBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const animationFrameRef = useRef<number>(0);
  const isAnimatingRef = useRef(false);
  const lastTimeRef = useRef(0);
  
  // Use the mouse tracking hook
  const { mousePositionRef } = useMouseTracking();

  // Define animation function outside useEffect to avoid hook violations
  const animate = useCallback((currentTime: number, scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => {
    if (!isAnimatingRef.current) return;

    // Frame rate limiting for better performance
    const deltaTime = currentTime - lastTimeRef.current;
    if (deltaTime < 16) { // ~60fps
      animationFrameRef.current = requestAnimationFrame((time) => animate(time, scene, camera, renderer));
      return;
    }

    lastTimeRef.current = currentTime;

    if (particlesRef.current) {
      const time = currentTime * ANIMATION_CONFIG.timeMultiplier;
      const geometry = particlesRef.current.geometry;
      const positions = geometry.attributes.position.array as Float32Array;
      const velocities = geometry.attributes.velocity.array as Float32Array;
      const count = geometry.attributes.position.count;

      // React to hovered skill with intensity modifier
      const intensity = hoveredItem
        ? ANIMATION_CONFIG.hoverIntensity.active
        : ANIMATION_CONFIG.hoverIntensity.idle;

      // Batch process particles for better performance
      const boundary = PARTICLE_CONFIG.collisionBoundary;
      const mouseConfig = ANIMATION_CONFIG.mouseInteraction;
      const noiseIntensity = ANIMATION_CONFIG.noiseIntensity;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        // Apply velocity with intensity modifier
        positions[i3] += velocities[i3] * intensity;
        positions[i3 + 1] += velocities[i3 + 1] * intensity;
        positions[i3 + 2] += velocities[i3 + 2] * intensity;

        // Boundary check with wrap-around
        if (Math.abs(positions[i3]) > boundary) velocities[i3] *= -1;
        if (Math.abs(positions[i3 + 1]) > boundary) velocities[i3 + 1] *= -1;
        if (Math.abs(positions[i3 + 2]) > boundary) velocities[i3 + 2] *= -1;

        // Mouse interaction (only if mouse is moving)
        if (mousePositionRef.current.x !== 0 || mousePositionRef.current.y !== 0) {
          const dx = positions[i3] - mousePositionRef.current.x * boundary;
          const dy = positions[i3 + 1] - mousePositionRef.current.y * boundary;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseConfig.radius) {
            positions[i3] += (dx / distance) * mouseConfig.force;
            positions[i3 + 1] += (dy / distance) * mouseConfig.force;
          }
        }

        // Add organic movement with noise (reduced frequency for performance)
        if (i % 2 === 0) { // Only animate every other particle
          positions[i3] += Math.sin(time + i) * noiseIntensity;
          positions[i3 + 1] += Math.cos(time + i * 0.5) * noiseIntensity;
        }
      }

      geometry.attributes.position.needsUpdate = true;

      // Rotate the entire system slowly
      particlesRef.current.rotation.y += ANIMATION_CONFIG.rotation.y;
      particlesRef.current.rotation.x += ANIMATION_CONFIG.rotation.x;
    }

    // Render the scene
    renderer.render(scene, camera);
    animationFrameRef.current = requestAnimationFrame((time) => animate(time, scene, camera, renderer));
  }, [hoveredItem, mousePositionRef]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = createCamera();
    const renderer = createRenderer(canvasRef.current);

    // Create particle system
    const particleSystem = createParticleSystem();
    scene.add(particleSystem.points);
    particlesRef.current = particleSystem.points;

    // Start animation
    isAnimatingRef.current = true;
    animationFrameRef.current = requestAnimationFrame((time) => animate(time, scene, camera, renderer));

    // Optimized resize handler with debouncing
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 100);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      isAnimatingRef.current = false;
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameRef.current);
      clearTimeout(resizeTimeout);
      renderer.dispose();
      particleSystem.geometry.dispose();
      particleSystem.material.dispose();
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
});

ThreeBackground.displayName = "ThreeBackground";

export { ThreeBackground };
