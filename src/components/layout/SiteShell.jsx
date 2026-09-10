"use client";

import { MotionConfig } from "framer-motion";
import Navbar from "./Navbar";
import FluidBackground from "@/components/background/FluidBackground";
import MusicControls from "@/components/audio/MusicControls";
import useMediaQuery from "@/hooks/useMediaQuery";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/sections/ContactSection";
import { useThemeMode } from "@/hooks/useThemeMode";

export default function SiteShell() {
  const { theme, toggleTheme } = useThemeMode();
  const isTouch = useMediaQuery("(hover: none) and (pointer: coarse)");

  return (
    <MotionConfig reducedMotion="user">
      <main id="home" className="fluid-stage relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)] transition-colors duration-700">
        <FluidBackground theme={theme} />
        <Navbar theme={theme} onToggle={toggleTheme} />
        <div className="relative z-10">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <EducationSection />
          <ContactSection />
        </div>
        {!isTouch ? <MusicControls /> : null}
      </main>
    </MotionConfig>
  );
}
