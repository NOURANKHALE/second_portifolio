"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface CategoryPillsProps<T extends string> {
  categories: readonly T[];
  active: T;
  onChange: (category: T) => void;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  staggerDelay?: number;
  getLabel?: (category: T) => string;
}

export const CategoryPills = <T extends string>({
  categories,
  active,
  onChange,
  className,
  activeClassName =
    "bg-white/10 text-white backdrop-blur-md shadow-lg ring-1 ring-white/10",
  inactiveClassName =
    "bg-white/5 text-indigo-200 hover:bg-white/10 hover:text-white",
  staggerDelay = 0.03,
  getLabel = (c: T) => String(c),
}: CategoryPillsProps<T>) => (
  <motion.div
    className={cn("flex flex-wrap justify-center gap-3", className)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2, duration: 0.45 }}
    role="tablist"
    aria-label="Filter categories"
  >
    {categories.map((category, index) => {
      const isActive = active === category;
      return (
        <motion.button
          key={category}
          type="button"
          role="tab"
          aria-selected={isActive}
          onClick={() => onChange(category)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
            isActive ? activeClassName : inactiveClassName,
          )}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * staggerDelay }}
          aria-label={`Show ${getLabel(category)}`}
        >
          {getLabel(category)}
        </motion.button>
      );
    })}
  </motion.div>
);
