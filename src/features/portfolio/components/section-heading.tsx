"use client";

import { SectionReveal } from "./section-reveal";

interface SectionHeadingProps {
  id?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeading = ({
  id,
  title,
  subtitle,
  className,
}: SectionHeadingProps) => (
  <SectionReveal className={className}>
    <div className="mb-16 text-center">
      <h2
        id={id}
        className="mb-4 bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mx-auto max-w-2xl text-indigo-200">{subtitle}</p>
      ) : null}
    </div>
  </SectionReveal>
);
