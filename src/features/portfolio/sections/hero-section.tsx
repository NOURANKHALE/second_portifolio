"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { HERO_LINKS } from "@/constants/hero";
import type { HeroButtonProps } from "@/types/hero";
import { useThreeHero } from "@/hooks/useThreeHero";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";
import { fadeInUp, staggerContainer, transitions } from "@/utils/animations";
import { APP_CONFIG } from "@/constants/config";

const HeroButton = ({
  href,
  children,
  variant,
  ariaLabel,
}: HeroButtonProps) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ scale: 1.05, transition: transitions.fast }}
    whileTap={{ scale: 0.95 }}
  >
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block rounded-lg px-6 py-3 font-medium transition-all ${
        variant === "primary"
          ? "bg-violet-600 text-white hover:bg-violet-700"
          : "border border-violet-600 bg-transparent text-violet-400 hover:bg-violet-950/30"
      }`}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  </motion.div>
);

const ScrollIndicator = () => {
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    if (scrollY < windowHeight / 2) {
      window.scrollTo({ top: windowHeight, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleScroll}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer border-none bg-transparent"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.7 }}
      whileHover={{ y: -5 }}
      aria-label="Scroll to next section"
    >
      <motion.div
        className="flex flex-col items-center text-violet-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="mb-1 text-sm">Scroll</span>
        <ChevronDown className="h-5 w-5" aria-hidden />
      </motion.div>
    </motion.button>
  );
};

export const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const typingRef = useRef<HTMLSpanElement>(null);

  useThreeHero({ canvasRef });
  useTypingAnimation({ typingRef });

  const firstName = APP_CONFIG.name.split(" ")[0] ?? APP_CONFIG.name;
  const restName = APP_CONFIG.name.split(" ").slice(1).join(" ");

  return (
    <section
      id="hero"
      className="relative flex h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-black"
      aria-labelledby="hero-heading"
    >
      <motion.div
        className="relative z-10 flex h-full w-full flex-col justify-center px-8 md:w-1/2 md:px-16"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={transitions.slow}
      >
        <motion.h1
          id="hero-heading"
          className="mb-6 text-4xl font-bold text-white md:text-5xl"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Hi, I&rsquo;m{" "}
          <motion.span
            className="text-violet-600"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {firstName}
          </motion.span>
          {restName ? ` ${restName}` : ""}
        </motion.h1>

        <motion.div
          className="mb-4 h-10 text-xl font-medium text-gray-200 md:text-2xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <span
            ref={typingRef}
            className="border-r-2 border-violet-400"
            aria-live="polite"
          />
        </motion.div>

        <motion.p
          className="mb-8 max-w-md text-lg text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          I am a passionate Front-End Developer with a focus on creating modern,
          responsive, and user-friendly web applications using Next.js and
          React.
        </motion.p>

        <motion.div
          className="flex flex-col gap-4 sm:flex-row"
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.15)}
        >
          <HeroButton
            href={HERO_LINKS.projects}
            variant="primary"
            ariaLabel="View my projects on GitHub"
          >
            View Projects
          </HeroButton>

          <HeroButton
            href={HERO_LINKS.cv}
            variant="secondary"
            ariaLabel="Download my CV"
          >
            Download CV
          </HeroButton>
        </motion.div>
      </motion.div>

      <div className="relative hidden h-full w-1/2 md:block">
        <canvas
          ref={canvasRef}
          className="absolute right-0 top-0 h-full w-full"
          aria-hidden
        />
      </div>

      <ScrollIndicator />
    </section>
  );
};
