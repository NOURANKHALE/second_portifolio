"use client";

import { ArrowUp } from "lucide-react";
import { useScrollDetection } from "@/hooks";

export default function ScrollToTop() {
  const isVisible = useScrollDetection({ threshold: 400, offset: 100 });

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      aria-label="Scroll to top"
      onClick={scrollTop}
      className={`fixed bottom-6 right-6 z-[70] rounded-full p-3 shadow-lg transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
