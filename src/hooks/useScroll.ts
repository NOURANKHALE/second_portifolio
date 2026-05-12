
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  getCurrentSection,
  scrollToSection,
  throttle,
} from "@/utils/scroll";
import type { ScrollConfig } from "@/types/components";

export const useScrollDetection = (
  config: ScrollConfig = { threshold: 50, offset: 100 }
) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrolled(window.scrollY > config.threshold);
    }, 16); // ~60fps

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [config.threshold]);

  return scrolled;
};

export const useActiveSection = (
  sections: string[],
  config: ScrollConfig = { threshold: 50, offset: 100 }
) => {
  const [activeSection, setActiveSection] = useState(sections[0] || "");

  // Memoized sections for performance
  const memoizedSections = useMemo(() => sections, [sections]);

  const handleScrollToSection = useCallback(
    (sectionId: string) => {
      scrollToSection(sectionId, config.offset);
      setActiveSection(sectionId);
    },
    [config.offset]
  );

  useEffect(() => {
    const handleScroll = throttle(() => {
      const current = getCurrentSection(memoizedSections, config.threshold);
      setActiveSection(current);
    }, 16);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [memoizedSections, config.threshold]);

  return {
    activeSection,
    scrollToSection: handleScrollToSection,
  };
};
