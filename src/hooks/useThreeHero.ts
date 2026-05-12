import { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";
import { CANVAS_CONFIG } from "@/constants/hero";

interface UseThreeHeroProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const useThreeHero = ({ canvasRef }: UseThreeHeroProps) => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameRef = useRef<number>(0);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());
  const mouseRef = useRef({ x: 0, y: 0 });
  const isAnimatingRef = useRef(false);

  // Memoized heart shape creation function
  const createHeartShape = useCallback(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    const width = 2, height = 2;

    shape.moveTo(x, y + height / 4);
    shape.bezierCurveTo(x, y, x - width / 2, y, x - width / 2, y + height / 4);
    shape.bezierCurveTo(
      x - width / 2,
      y + height / 2,
      x,
      y + height,
      x,
      y + height
    );
    shape.bezierCurveTo(
      x,
      y + height,
      x + width / 2,
      y + height / 2,
      x + width / 2,
      y + height / 4
    );
    shape.bezierCurveTo(x + width / 2, y, x, y, x, y + height / 4);

    return shape;
  }, []);

  // Initialize Three.js scene with performance optimizations
  const initializeScene = useCallback(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      CANVAS_CONFIG.camera.fov,
      window.innerWidth / window.innerHeight,
      CANVAS_CONFIG.camera.near,
      CANVAS_CONFIG.camera.far
    );
    
    // Optimized renderer settings
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: false, // Disable for better performance
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: true,
    });

    // Set optimal pixel ratio
    const pixelRatio = Math.min(window.devicePixelRatio, 2); // Cap at 2 for performance
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(
      window.innerWidth / CANVAS_CONFIG.aspectRatio,
      window.innerHeight
    );

    // Performance optimizations
    renderer.shadowMap.enabled = false; // Disable shadows for better performance
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // Store references
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    return { scene, camera, renderer };
  }, [canvasRef]);

  // Create 3D objects
  const createObjects = useCallback((scene: THREE.Scene) => {
    // Create heart shape
    const heartShape = createHeartShape();
    const heartGeometry = new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 3,
    });

    const heartMaterial = new THREE.MeshPhongMaterial({
      color: 0xe11d48,
      shininess: 100,
      transparent: true,
      opacity: 0.8,
    });

    const heart = new THREE.Mesh(heartGeometry, heartMaterial);
    heart.position.x = -1;
    heart.rotation.x = Math.PI / 4;
    heart.rotation.z = Math.PI / 6;
    scene.add(heart);

    // Create first cube
    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    const cubeMaterial = new THREE.MeshPhongMaterial({
      color: 0x7e22ce,
      wireframe: false,
      transparent: true,
      opacity: 0.7,
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = 1.5;
    cube.position.y = -0.5;
    scene.add(cube);

    // Create second cube
    const cube2Geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const cube2Material = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      wireframe: false,
      transparent: true,
      opacity: 0.8,
    });
    const cube2 = new THREE.Mesh(cube2Geometry, cube2Material);
    cube2.position.x = 0.5;
    cube2.position.y = 1;
    cube2.position.z = -1;
    scene.add(cube2);

    return { heart, cube, cube2 };
  }, [createHeartShape]);

  // Add lighting
  const addLighting = useCallback((scene: THREE.Scene) => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xa855f7, 1, 100);
    pointLight.position.set(0, 2, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x3b82f6, 0.8, 100);
    pointLight2.position.set(-2, -2, 3);
    scene.add(pointLight2);

    return { pointLight, pointLight2 };
  }, []);

  // Optimized animation loop with performance monitoring
  const animate = useCallback((
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    objects: { heart: THREE.Mesh; cube: THREE.Mesh; cube2: THREE.Mesh },
    lights: { pointLight: THREE.PointLight; pointLight2: THREE.PointLight }
  ) => {
    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    // Throttled mouse movement tracking
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Throttled mouse handler
    let mouseThrottleTimeout: NodeJS.Timeout | null = null;
    const throttledMouseMove = (event: MouseEvent) => {
      if (mouseThrottleTimeout) return;
      mouseThrottleTimeout = setTimeout(() => {
        handleMouseMove(event);
        mouseThrottleTimeout = null;
      }, 16); // ~60fps
    };

    window.addEventListener("mousemove", throttledMouseMove, { passive: true });

    const tick = (currentTime: number) => {
      if (!isAnimatingRef.current) return;

      // Frame rate limiting
      if (currentTime - lastTime < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(tick);
        return;
      }

      lastTime = currentTime;
      const elapsedTime = clockRef.current.getElapsedTime();

      // Optimized animations with reduced calculations
      const sinTime = Math.sin(elapsedTime);
      const cosTime = Math.cos(elapsedTime);
      const sinTime2 = Math.sin(elapsedTime * 0.5);
      const cosTime2 = Math.cos(elapsedTime * 0.5);

      // Animate heart with pulsing effect
      objects.heart.rotation.y = elapsedTime * 0.3;
      const heartScale = 1 + sinTime * 0.1;
      objects.heart.scale.setScalar(heartScale);

      // Animate first cube
      objects.cube.rotation.x = elapsedTime * 0.4;
      objects.cube.rotation.y = elapsedTime * 0.5;
      objects.cube.position.y = -0.5 + sinTime * 0.3;

      // Animate second cube
      objects.cube2.rotation.x = elapsedTime * 0.3;
      objects.cube2.rotation.z = elapsedTime * 0.4;
      objects.cube2.position.x = 0.5 + sinTime * 0.5;
      objects.cube2.position.y = 1 + cosTime * 0.4;

      // Move point lights
      lights.pointLight.position.x = sinTime2 * 3;
      lights.pointLight.position.z = cosTime2 * 3;

      lights.pointLight2.position.x = cosTime * 2;
      lights.pointLight2.position.y = sinTime * 2;

      // Smooth camera movement with lerp
      const targetX = mouseRef.current.x * CANVAS_CONFIG.mouse.range;
      const targetY = mouseRef.current.y * CANVAS_CONFIG.mouse.range;
      
      camera.position.x += (targetX - camera.position.x) * CANVAS_CONFIG.mouse.dampening;
      camera.position.y += (targetY - camera.position.y) * CANVAS_CONFIG.mouse.dampening;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(tick);
    };

    isAnimatingRef.current = true;
    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      isAnimatingRef.current = false;
      window.removeEventListener("mousemove", throttledMouseMove);
      if (mouseThrottleTimeout) {
        clearTimeout(mouseThrottleTimeout);
      }
    };
  }, []);

  // Handle window resize
  const handleResize = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current) return;

    cameraRef.current.aspect =
      window.innerWidth / CANVAS_CONFIG.aspectRatio / window.innerHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(
      window.innerWidth / CANVAS_CONFIG.aspectRatio,
      window.innerHeight
    );
  }, []);

  // Main effect
  useEffect(() => {
    const sceneData = initializeScene();
    if (!sceneData) return;

    const { scene, camera, renderer } = sceneData;
    const objects = createObjects(scene);
    const lights = addLighting(scene);

    // Position camera
    camera.position.z = CANVAS_CONFIG.camera.position.z;

    // Start animation
    const cleanupMouse = animate(scene, camera, renderer, objects, lights);

    // Handle resize
    window.addEventListener("resize", handleResize);

    return () => {
      cleanupMouse();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameRef.current);
      renderer.dispose();
    };
  }, [initializeScene, createObjects, addLighting, animate, handleResize]);

  return {
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: rendererRef.current,
  };
};
