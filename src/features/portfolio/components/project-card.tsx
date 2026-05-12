"use client";

import { useCallback, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { ArrowRight, PlusCircle } from "lucide-react";

import {
  PROJECT_CONFIG,
  PROJECTS_ANIMATION_CONFIG,
  MOUSE_INTERACTION,
} from "@/constants/projects";
import type { GlassProjectCardProps } from "@/types/projects";

export const ProjectCard = ({ project }: GlassProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(
    y,
    [-MOUSE_INTERACTION.mouseRange, MOUSE_INTERACTION.mouseRange],
    [MOUSE_INTERACTION.rotationRange, -MOUSE_INTERACTION.rotationRange],
  );
  const rotateY = useTransform(
    x,
    [-MOUSE_INTERACTION.mouseRange, MOUSE_INTERACTION.mouseRange],
    [-MOUSE_INTERACTION.rotationRange, MOUSE_INTERACTION.rotationRange],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      x.set(e.clientX - rect.left - rect.width / 2);
      y.set(e.clientY - rect.top - rect.height / 2);
    },
    [x, y],
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleCardClick = useCallback(() => {
    setIsFlipped((f) => !f);
  }, []);

  return (
    <motion.article
      className="perspective h-96 w-full cursor-pointer"
      style={{ perspective: PROJECT_CONFIG.perspective }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: PROJECTS_ANIMATION_CONFIG.cardHover.y }}
      role="button"
      tabIndex={0}
      aria-label={`${project.title}. Press Enter or Space to flip for details.`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <AnimatePresence mode="wait">
        {isFlipped ? (
          <motion.div
            key="back"
            className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-900/30 to-purple-800/30 p-6 shadow-xl backdrop-blur-md"
            style={{ rotateX, rotateY }}
            initial={{ rotateY: -180, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 180, opacity: 0 }}
            transition={{
              duration: PROJECTS_ANIMATION_CONFIG.cardFlip.duration,
              ease: PROJECTS_ANIMATION_CONFIG.cardFlip.ease,
            }}
          >
            <div>
              <motion.h3
                className="mb-3 text-2xl font-bold text-white"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {project.title}
              </motion.h3>
              <motion.p
                className="mb-4 text-indigo-100"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {project.description}
              </motion.p>
              <motion.div
                className="mb-6 flex flex-wrap gap-2"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {project.tags
                  .slice(0, PROJECT_CONFIG.maxTagsDisplay)
                  .map((tag, index) => (
                    <motion.span
                      key={tag}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs text-indigo-200"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                {project.tags.length > PROJECT_CONFIG.maxTagsDisplay ? (
                  <motion.span
                    className="rounded-full bg-white/10 px-3 py-1 text-xs text-indigo-200"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: PROJECT_CONFIG.maxTagsDisplay * 0.1,
                    }}
                  >
                    +{project.tags.length - PROJECT_CONFIG.maxTagsDisplay}
                  </motion.span>
                ) : null}
              </motion.div>
            </div>

            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-center text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              View Project
              <ArrowRight className="h-4 w-4" aria-hidden />
            </motion.a>
          </motion.div>
        ) : (
          <motion.div
            key="front"
            className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-900/20 to-purple-800/20 p-1 backdrop-blur-md"
            style={{ rotateX, rotateY }}
            initial={{ rotateY: 0, opacity: 1 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -180, opacity: 0 }}
            transition={{
              duration: PROJECTS_ANIMATION_CONFIG.cardFlip.duration,
              ease: PROJECTS_ANIMATION_CONFIG.cardFlip.ease,
            }}
          >
            <motion.div
              className="relative h-3/5 overflow-hidden rounded-t-2xl"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Image
                src={project.image}
                alt={`${project.title} project preview`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: isHovered ? 1 : 0,
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="rounded-full bg-white/20 p-2 backdrop-blur-md"
                >
                  <PlusCircle className="h-8 w-8 text-white" aria-hidden />
                </motion.div>
              </motion.div>
            </motion.div>

            <div className="flex h-2/5 flex-col justify-between p-4">
              <h3 className="mb-2 text-xl font-semibold text-white">
                {project.title}
              </h3>

              <div className="flex items-end justify-between">
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white/10 px-2 py-1 text-xs text-indigo-200"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 2 ? (
                    <span className="rounded-md bg-white/10 px-2 py-1 text-xs text-indigo-200">
                      +{project.tags.length - 2}
                    </span>
                  ) : null}
                </div>

                <motion.div
                  className="flex items-center text-sm text-indigo-300"
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  View details
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};
