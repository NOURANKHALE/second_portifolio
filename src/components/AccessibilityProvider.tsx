"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AccessibilityContextType {
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: "small" | "medium" | "large";
  setFontSize: (size: "small" | "medium" | "large") => void;
  toggleHighContrast: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider = ({ children }: AccessibilityProviderProps) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    // Load saved preferences
    const savedFontSize = localStorage.getItem("fontSize") as "small" | "medium" | "large";
    const savedHighContrast = localStorage.getItem("highContrast") === "true";

    if (savedFontSize) setFontSize(savedFontSize);
    if (savedHighContrast) setHighContrast(savedHighContrast);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const handleSetFontSize = (size: "small" | "medium" | "large") => {
    setFontSize(size);
    localStorage.setItem("fontSize", size);
    
    // Apply font size to document
    const root = document.documentElement;
    root.style.fontSize = size === "small" ? "14px" : size === "large" ? "18px" : "16px";
  };

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem("highContrast", newValue.toString());
    
    // Apply high contrast to document
    document.documentElement.classList.toggle("high-contrast", newValue);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        reducedMotion,
        highContrast,
        fontSize,
        setFontSize: handleSetFontSize,
        toggleHighContrast,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
};
