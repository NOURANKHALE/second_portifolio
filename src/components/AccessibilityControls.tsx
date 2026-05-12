"use client";

import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccessibility } from "./AccessibilityProvider";
import { 
  Type, 
  Contrast, 
  Eye, 
  Settings,
  X
} from "lucide-react";

const AccessibilityControls = memo(() => {
  const { 
    fontSize, 
    setFontSize, 
    highContrast, 
    toggleHighContrast 
  } = useAccessibility();
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 z-50 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open accessibility controls"
      >
        <Settings className="w-5 h-5" />
      </motion.button>

      {/* Controls Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-4 left-4 z-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 w-80"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Accessibility Settings
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close accessibility controls"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Font Size Control */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Type className="w-4 h-4" />
                  Font Size
                </label>
                <div className="flex gap-2">
                  {(["small", "medium", "large"] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        fontSize === size
                          ? "bg-purple-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* High Contrast Toggle */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Contrast className="w-4 h-4" />
                  High Contrast
                </label>
                <button
                  onClick={toggleHighContrast}
                  className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                    highContrast
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  {highContrast ? "On" : "Off"}
                </button>
              </div>

              {/* Keyboard Navigation Info */}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Use Tab to navigate, Enter to select, and Escape to close.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

AccessibilityControls.displayName = "AccessibilityControls";

export default AccessibilityControls;
