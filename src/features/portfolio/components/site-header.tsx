"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { APP_CONFIG } from "@/constants/config";
import { navItems, sections } from "@/constants/header";
import { useScrollDetection, useActiveSection } from "@/hooks";
import { ThreeBackground } from "@/components/ThreeBackground";
import type { NavItemProps } from "@/types";

const SCROLL_CONFIG = {
  threshold: 50,
  offset: 100,
} as const;

const NavItem = ({
  item,
  index,
  activeSection,
  onClick,
  isMobile = false,
}: NavItemProps) => (
  <motion.button
    type="button"
    onClick={() => onClick(item.id)}
    className={
      isMobile
        ? `block w-full rounded-md px-3 py-3 text-left text-base font-medium transition-all duration-300 ${
            activeSection === item.id
              ? "bg-purple-950/30 text-purple-400"
              : "text-gray-300 hover:bg-gray-800 hover:text-white"
          }`
        : `relative rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 ${
            activeSection === item.id
              ? "text-purple-400"
              : "text-gray-300 hover:text-white"
          }`
    }
    initial={{ opacity: 0, [isMobile ? "x" : "y"]: -20 }}
    animate={{ opacity: 1, [isMobile ? "x" : "y"]: 0 }}
    transition={{ delay: index * 0.08 }}
    whileHover={isMobile ? { x: 5 } : { y: -2 }}
    aria-current={activeSection === item.id ? "page" : undefined}
    aria-label={`Navigate to ${item.label} section`}
  >
    {isMobile ? (
      item.label
    ) : (
      <span className="relative">
        {item.label}
        <span
          className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
            activeSection === item.id
              ? "w-full bg-gradient-to-r from-purple-500 to-pink-500"
              : "w-0 bg-transparent group-hover:w-full"
          }`}
        />
      </span>
    )}
  </motion.button>
);

export const SiteHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrolled = useScrollDetection(SCROLL_CONFIG);
  const { activeSection, scrollToSection: scrollTo } = useActiveSection(
    sections,
    SCROLL_CONFIG,
  );

  const handleScrollToSection = (sectionId: string) => {
    scrollTo(sectionId);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-gray-800/20 bg-black/80 backdrop-blur-lg"
            : ""
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        role="banner"
      >
        <nav
          className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <ThreeBackground />
          <div className="flex h-16 w-full items-center justify-between md:h-20">
            <motion.div className="flex-shrink-0" whileTap={{ scale: 0.97 }}>
              <button
                type="button"
                onClick={() => handleScrollToSection("hero")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent md:text-2xl"
                aria-label={`${APP_CONFIG.name}, go to top`}
              >
                {APP_CONFIG.name}
              </button>
            </motion.div>

            <div className="hidden md:flex md:items-baseline md:gap-1">
              {navItems.map((item, index) => (
                <NavItem
                  key={`desktop-${item.id}`}
                  item={item}
                  index={index}
                  activeSection={activeSection}
                  onClick={handleScrollToSection}
                />
              ))}
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:ring-2 focus-visible:ring-purple-500 md:hidden"
              onClick={() => setIsOpen((v) => !v)}
              aria-expanded={isOpen}
              aria-controls="mobile-primary-navigation"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden />
              ) : (
                <Menu className="h-6 w-6" aria-hidden />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              id="mobile-primary-navigation"
              className="fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-gray-800 bg-black/95 px-2 pb-6 pt-2 backdrop-blur-xl md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="space-y-1 px-2">
                {navItems.map((item, index) => (
                  <NavItem
                    key={`mobile-${item.id}`}
                    item={item}
                    index={index}
                    activeSection={activeSection}
                    onClick={handleScrollToSection}
                    isMobile
                  />
                ))}
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
};
