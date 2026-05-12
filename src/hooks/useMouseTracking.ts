
import { useRef, useCallback, useEffect } from "react";
import type { MousePosition } from "@/types/components";

export const useMouseTracking = () => {
  const mousePositionRef = useRef<MousePosition>({ x: 0, y: 0 });

  // Memoized mouse move handler
  const handleMouseMove = useCallback((event: MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    mousePositionRef.current = {
      x: (event.clientX / innerWidth) * 2 - 1,
      y: -(event.clientY / innerHeight) * 2 + 1,
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return { mousePositionRef };
};
