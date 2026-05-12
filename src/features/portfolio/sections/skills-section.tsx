"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { ThreeBackground } from "@/components/ThreeBackground";
import { containerStagger, fadeIn } from "@/utils/animations";
import { useIntersectionObserver } from "@/hooks";
import {
  skills,
  SKILLS_CONFIG,
  SKILLS_ANIMATION_CONFIG,
  VISUAL_CONFIG,
  SKILL_COLOR_MAP,
  skillCategories,
} from "@/constants/skills";
import type { SkillCardProps } from "@/types/skills";

import { CategoryPills } from "../components/category-pills";
import { SectionReveal } from "../components/section-reveal";

const FloatingOrb = ({
  position,
  size,
  gradient,
  delay,
  yDirection,
  isVisible,
}: {
  position: string;
  size: string;
  gradient: string;
  delay: number;
  yDirection: number;
  isVisible: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: yDirection * 20 }}
    animate={
      isVisible ? { opacity: 0.3, y: 0 } : { opacity: 0, y: yDirection * 20 }
    }
    transition={{
      duration: SKILLS_ANIMATION_CONFIG.floatingElements.duration,
      delay,
    }}
    className={`absolute ${position} ${size} rounded-full bg-gradient-to-r ${gradient} blur-xl`}
    aria-hidden
  />
);

const SkillCard = ({ skill, colorMap }: SkillCardProps) => {
  const fromClass = colorMap[skill.colorFrom] || "from-gray-700";
  const toClass = colorMap[skill.colorTo] || "to-gray-900";

  return (
    <motion.div
      variants={fadeIn}
      whileHover={{
        y: SKILLS_ANIMATION_CONFIG.cardHover.y,
        transition: { duration: SKILLS_ANIMATION_CONFIG.cardHover.duration },
      }}
      className="group relative"
    >
      <div
        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${fromClass} ${toClass} opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100`}
      />
      <div className="relative h-full rounded-xl border border-gray-800 bg-gray-900/70 p-4 backdrop-blur-sm transition-all duration-300 group-hover:border-cyan-400/30">
        <div className="flex flex-col items-center">
          <motion.div
            className={`${SKILLS_CONFIG.iconSize} mb-3 flex items-center justify-center rounded-xl border border-gray-700/50 bg-gray-800/50 text-2xl transition-transform duration-300`}
            whileHover={{
              scale: SKILLS_ANIMATION_CONFIG.iconScale.scale,
              transition: {
                duration: SKILLS_ANIMATION_CONFIG.iconScale.duration,
              },
            }}
          >
            {React.createElement(skill.icon, {
              className: skill.iconColor,
            })}
          </motion.div>
          <span className="mb-2 text-sm font-medium text-gray-200 transition-colors group-hover:text-white">
            {skill.name}
          </span>
          <div
            className={`mt-2 w-full rounded-full bg-gray-800 ${SKILLS_CONFIG.progressBarHeight}`}
          >
            <motion.div
              className={`${SKILLS_CONFIG.progressBarHeight} rounded-full bg-gradient-to-r ${fromClass} ${toClass}`}
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<
    (typeof skillCategories)[number]["id"]
  >("all");

  const { ref: sectionRef, isVisible } = useIntersectionObserver(
    SKILLS_CONFIG.observerThreshold,
  );

  const filteredSkills = useMemo(() => {
    return activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);
  }, [activeCategory]);

  const categoryIds = skillCategories.map((c) => c.id);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`relative ${VISUAL_CONFIG.section.minHeight} ${VISUAL_CONFIG.section.background} overflow-hidden ${VISUAL_CONFIG.section.padding}`}
      aria-labelledby="skills-heading"
    >
      <h2
        id="skills-heading"
        className="absolute left-1/2 top-6 z-[11] -translate-x-1/2 text-5xl font-bold text-purple-500"
      >
        My Skills
      </h2>

      <div className="absolute inset-0 z-0">
        <ThreeBackground />
      </div>

      <FloatingOrb
        position={VISUAL_CONFIG.floatingOrbs.left.position}
        size={VISUAL_CONFIG.floatingOrbs.left.size}
        gradient={VISUAL_CONFIG.floatingOrbs.left.gradient}
        delay={SKILLS_ANIMATION_CONFIG.floatingElements.leftDelay}
        yDirection={1}
        isVisible={isVisible}
      />
      <FloatingOrb
        position={VISUAL_CONFIG.floatingOrbs.right.position}
        size={VISUAL_CONFIG.floatingOrbs.right.size}
        gradient={VISUAL_CONFIG.floatingOrbs.right.gradient}
        delay={SKILLS_ANIMATION_CONFIG.floatingElements.rightDelay}
        yDirection={-1}
        isVisible={isVisible}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16">
        <SectionReveal className="mb-12">
          <CategoryPills
            categories={categoryIds}
            active={activeCategory}
            onChange={(id) =>
              setActiveCategory(id as (typeof skillCategories)[number]["id"])
            }
            getLabel={(id) =>
              skillCategories.find((c) => c.id === id)?.name ?? id
            }
            activeClassName="border border-purple-500 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
            inactiveClassName="border border-gray-700 bg-gray-900/50 capitalize text-gray-300 backdrop-blur-sm hover:border-purple-500/50 hover:text-white"
            className="mb-12"
          />
        </SectionReveal>

        <motion.div
          variants={containerStagger(SKILLS_ANIMATION_CONFIG.containerStagger)}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          className={`grid ${SKILLS_CONFIG.gridCols} gap-6`}
        >
          {filteredSkills.map((skill) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              colorMap={SKILL_COLOR_MAP}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
