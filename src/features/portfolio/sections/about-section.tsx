"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Code, Palette, Zap } from "lucide-react";
import Image from "next/image";

import { useIntersectionObserver } from "@/hooks";
import {
  containerStagger,
  fadeInUp,
  slideInLeft,
  slideInRight,
} from "@/utils/animations";
import {
  PROFILE_IMAGE,
  ABOUT_ANIMATION_CONFIG,
  features,
} from "@/constants/aboutMe";
import type { FloatingIconProps } from "@/types/aboutMe";
import { ThreeBackground } from "@/components/ThreeBackground";

import { SectionReveal } from "../components/section-reveal";

const BackgroundAnimation = () => (
  <div className="absolute inset-0 overflow-hidden" aria-hidden>
    {[...Array(ABOUT_ANIMATION_CONFIG.backgroundElementsCount)].map((_, i) => (
      <motion.div
        key={`bg-element-${i}`}
        className="absolute rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(${
            i % 3 === 0
              ? "96, 165, 250"
              : i % 3 === 1
                ? "139, 92, 246"
                : "236, 72, 153"
          }, 0.15) 0%, transparent 70%)`,
          width: `${Math.random() * 300 + 100}px`,
          height: `${Math.random() * 300 + 100}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, Math.random() * 40 - 20, 0],
          x: [0, Math.random() * 40 - 20, 0],
          rotate: [0, Math.random() * 360],
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

const FloatingIcon = ({
  className,
  Icon,
  animate,
  transition,
  whileHover,
}: FloatingIconProps) => (
  <motion.div
    className={className}
    animate={animate}
    transition={transition}
    whileHover={whileHover}
    aria-hidden
  >
    <Icon
      className={`${
        Icon === Code ? "h-10 w-10" : Icon === Palette ? "h-8 w-8" : "h-6 w-6"
      } ${
        Icon === Code
          ? "text-blue-400"
          : Icon === Palette
            ? "text-purple-400"
            : "text-pink-400"
      }`}
    />
  </motion.div>
);

export const AboutSection = () => {
  const { ref, isVisible: isInView } = useIntersectionObserver(
    0.1,
    ABOUT_ANIMATION_CONFIG.viewportMargin,
  );
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const memoizedFeatures = useMemo(() => features, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-20"
      id="about"
      aria-labelledby="about-heading"
    >
      <ThreeBackground />
      <BackgroundAnimation />
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          variants={containerStagger(0.2)}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mb-16 text-center"
        >
          <motion.h2
            id="about-heading"
            variants={fadeInUp}
            className="mb-6 text-5xl font-bold md:text-6xl"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            className="mx-auto mb-8 h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500"
          />
          <motion.p
            variants={fadeInUp}
            className="mx-auto max-w-2xl text-xl text-gray-300"
          >
            Passionate frontend developer crafting digital experiences with code
            and creativity
          </motion.p>
        </motion.div>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          <SectionReveal>
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className="relative"
            >
              <div className="relative z-10">
                <motion.div
                  className="mx-auto h-80 w-80 rounded-2xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-1.5 md:h-80 md:w-80"
                  whileHover={{ rotate: 2, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-900">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <div className="relative z-10 flex items-center justify-center rounded-xl bg-gray-900">
                      <Image
                        alt={PROFILE_IMAGE.alt}
                        src={PROFILE_IMAGE.src}
                        width={PROFILE_IMAGE.width}
                        height={PROFILE_IMAGE.height}
                        className="rounded-xl"
                        priority
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
              <FloatingIcon
                className="absolute -right-6 -top-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-blue-500/20 shadow-lg backdrop-blur-sm"
                Icon={Code}
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(59, 130, 246, 0.3)",
                }}
              />
              <FloatingIcon
                className="absolute -bottom-6 -left-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-500/20 shadow-lg backdrop-blur-sm"
                Icon={Palette}
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 7,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(139, 92, 246, 0.3)",
                }}
              />

              <FloatingIcon
                className="absolute -left-10 top-16 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-500/20 shadow-lg backdrop-blur-sm"
                Icon={Zap}
                animate={{
                  x: [0, -8, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut",
                  delay: 1,
                }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(236, 72, 153, 0.3)",
                }}
              />
            </motion.div>
          </SectionReveal>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <motion.h3
              variants={fadeInUp}
              className="mb-6 text-3xl font-bold text-white"
            >
              Creative{" "}
              <motion.span
                className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Frontend Developer
              </motion.span>
            </motion.h3>
            <motion.p
              variants={fadeInUp}
              className="mb-6 text-lg leading-relaxed text-gray-300"
            >
              I specialize in creating beautiful, responsive user interfaces
              using modern web technologies. I&apos;m passionate about
              pixel-perfect designs, smooth animations, and exceptional user
              experiences.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="mb-8 text-lg leading-relaxed text-gray-300"
            >
              When I&apos;m not coding, you can find me exploring new CSS
              techniques, experimenting with JavaScript frameworks, or
              contributing to open-source projects.
            </motion.p>
            <motion.div
              variants={containerStagger(0.1)}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              {memoizedFeatures.map((feature, index) => (
                <motion.div
                  key={`feature-${feature.title}-${index}`}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="relative"
                >
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                  />
                  <div className="flex h-full items-start space-x-4 rounded-xl border border-gray-800/50 bg-gray-900/40 p-5 backdrop-blur-md transition-all duration-300">
                    <motion.div
                      className="flex-shrink-0 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-3"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <feature.icon className="h-5 w-5 text-white" />
                    </motion.div>
                    <div>
                      <h4 className="mb-1 text-lg font-semibold text-white">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
