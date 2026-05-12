"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  projects,
  PROJECT_CONFIG,
} from "@/constants/projects";
import { ThreeBackground } from "@/components/ThreeBackground";

import { CategoryPills } from "../components/category-pills";
import { SectionHeading } from "../components/section-heading";
import { ProjectCard } from "../components/project-card";

type ProjectCategory = (typeof PROJECT_CONFIG.categories)[number];

export const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>(
    PROJECT_CONFIG.categories[0],
  );

  const filteredProjects = useMemo(() => {
    return activeCategory === "All"
      ? projects
      : projects.filter((project) =>
          project.tags.includes(activeCategory),
        );
  }, [activeCategory]);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category as ProjectCategory);
  }, []);

  return (
    <section
      id="projects"
      className="relative min-h-screen overflow-hidden bg-black py-20"
      aria-labelledby="projects-heading"
    >
      <ThreeBackground />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-30">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse-slow rounded-full bg-purple-500 mix-blend-soft-light blur-3xl filter" />
        <div className="animation-delay-2000 absolute bottom-1/3 right-1/4 h-96 w-96 animate-pulse-slow rounded-full bg-indigo-600 mix-blend-soft-light blur-3xl filter" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading
          id="projects-heading"
          title="Featured Projects"
          subtitle="Explore my latest work showcasing modern web development techniques and creative solutions."
        />

        <CategoryPills
          categories={[...PROJECT_CONFIG.categories]}
          active={activeCategory}
          onChange={handleCategoryChange}
          className="mb-12"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            role="list"
            aria-label="Project cards"
          >
            {filteredProjects.map((project) => (
              <div key={project.id} role="listitem">
                <ProjectCard project={project} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
