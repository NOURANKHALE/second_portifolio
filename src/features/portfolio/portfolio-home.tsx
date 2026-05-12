"use client";

import { useState } from "react";

import PortalLoader from "@/components/Loader";
import { Footer } from "@/components/Footer";
import { ContactMe } from "@/components/ContactMe";

import { SiteHeader } from "./components/site-header";
import { AboutSection } from "./sections/about-section";
import { HeroSection } from "./sections/hero-section";
import { ProjectsSection } from "./sections/projects-section";
import { SkillsSection } from "./sections/skills-section";

export const PortfolioHome = () => {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      {showLoader ? (
        <PortalLoader onFinish={() => setShowLoader(false)} />
      ) : (
        <>
          <SiteHeader />
          <main id="main-content">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactMe />
          </main>
          <Footer />
        </>
      )}
    </>
  );
};
