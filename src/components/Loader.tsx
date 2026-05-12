"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { LOADER_CONFIG, STYLES } from "@/constants/loader";
import { PortalLoaderProps, ProgressIndicatorProps } from "@/types/loader";

const ProgressIndicator = ({ progress }: ProgressIndicatorProps) => (
  <>
    {/* Progress bar */}
    <div style={STYLES.progressBar}>
      <div style={STYLES.progressFill(progress)} />
    </div>

    {/* Percentage text */}
    <div style={STYLES.percentageText}>{progress}%</div>

    {/* Loading text with animation */}
    <div style={STYLES.loadingText}>
      LOADING
      <span
        style={{
          display: "inline-block",
          animation: "ellipsis 1.5s infinite",
          width: "20px",
          textAlign: "left" as const,
        }}
      >
        ...
      </span>
    </div>
  </>
);
const PortalLoader: React.FC<PortalLoaderProps> = ({ onFinish }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Memoized creation functions for performance
  const createPortalGeometry = useCallback(() => {
    return new THREE.TorusGeometry(
      LOADER_CONFIG.sizes.portal.radius,
      LOADER_CONFIG.sizes.portal.tube,
      32,
      100
    );
  }, []);

  const createParticlesGeometry = useCallback(() => {
    const geometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(LOADER_CONFIG.particleCount * 3);

    for (let i = 0; i < LOADER_CONFIG.particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    return geometry;
  }, []);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const mountNode = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 10);

    // Enhanced portal geometry with more segments for smoother look
    const portalGeometry = createPortalGeometry();
    const portalMaterial = new THREE.MeshStandardMaterial({
      color: LOADER_CONFIG.colors.portal,
      transparent: true,
      opacity: 0.9,
      emissive: LOADER_CONFIG.colors.portal,
      emissiveIntensity: 0.5,
      metalness: 0.8,
      roughness: 0.2,
    });
    const portal = new THREE.Mesh(portalGeometry, portalMaterial);
    scene.add(portal);

    // Multiple glow layers for depth
    const glowLayers: THREE.Mesh[] = [];
    const glowColors = LOADER_CONFIG.colors.glow;

    glowColors.forEach((color, i) => {
      const size =
        LOADER_CONFIG.sizes.portal.radius +
        0.2 +
        i * LOADER_CONFIG.sizes.glowOffset;
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: color,
        opacity: 0.2 - i * 0.05,
        transparent: true,
      });
      const glow = new THREE.Mesh(
        new THREE.TorusGeometry(size, LOADER_CONFIG.sizes.glowTube, 32, 100),
        glowMaterial
      );
      scene.add(glow);
      glowLayers.push(glow);
    });

    // Particle system for magical effect
    const particleCount = LOADER_CONFIG.particleCount;
    const particlesGeometry = createParticlesGeometry();
    const particlesMaterial = new THREE.PointsMaterial({
      color: LOADER_CONFIG.colors.portal,
      size: 0.05,
      transparent: true,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Center sphere with enhanced material
    const sphereGeometry = new THREE.SphereGeometry(
      LOADER_CONFIG.sizes.sphere,
      64,
      64
    );
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.7,
      roughness: 0.3,
      emissive: LOADER_CONFIG.colors.portal,
      emissiveIntensity: 0.2,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(
      LOADER_CONFIG.colors.ambient,
      0.5
    );
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(LOADER_CONFIG.colors.portal, 2, 20);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(
      LOADER_CONFIG.colors.portal,
      0.5
    );
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Renderer with better settings
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(LOADER_CONFIG.colors.background, 1);

    if (mountRef.current) {
      mountNode?.appendChild(renderer.domElement);
    }

    // Animation timeline
    let frame = 0;
    const totalFrames = LOADER_CONFIG.totalFrames;

    function animate() {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      setProgress(Math.round(progress * 100));

      if (frame <= totalFrames) {
        // Camera movement with easing
        const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
        camera.position.z =
          LOADER_CONFIG.cameraDistance -
          LOADER_CONFIG.cameraDistance * easedProgress;
        camera.lookAt(0, 0, 0);

        // Scale portal as we approach
        const scale = 0.8 + easedProgress * 0.5;
        portal.scale.set(scale, scale, scale);

        // Animate particles
        const particles = particlesGeometry.attributes.position
          .array as Float32Array;
        for (let i = 0; i < particleCount * 3; i += 3) {
          particles[i + 2] -= LOADER_CONFIG.animationSpeed.particles;
          if (particles[i + 2] < -5) {
            particles[i + 2] = 5;
          }
        }
        particlesGeometry.attributes.position.needsUpdate = true;
      } else if (loading) {
        setLoading(false);
        setTimeout(onFinish, 800);
      }

      // Rotate elements at different speeds
      portal.rotation.z += LOADER_CONFIG.animationSpeed.portal;
      sphere.rotation.y += LOADER_CONFIG.animationSpeed.sphere;

      glowLayers.forEach((glow, i) => {
        glow.rotation.z -= LOADER_CONFIG.animationSpeed.glow * (i + 1);
      });

      renderer.render(scene, camera);
      if (loading) requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mountNode) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, [onFinish, loading, createPortalGeometry, createParticlesGeometry]);

  return loading ? (
    <div
      ref={mountRef}
      style={STYLES.container}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Loading portal: ${progress}% complete`}
    >
      <ProgressIndicator progress={progress} />

      {/* CSS for ellipsis animation */}
      <style>
        {`
          @keyframes ellipsis {
            0% { content: '.'; }
            33% { content: '..'; }
            66% { content: '...'; }
          }
        `}
      </style>
    </div>
  ) : null;
};

export default PortalLoader;
