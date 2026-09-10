"use client";

import GlassPanel from "@/components/ui/GlassPanel";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedTabs from "@/components/ui/AnimatedTabs";
import { skillGroups } from "@/data/skills";

export default function SkillsSection() {
  return (
    <section id="skills" className="px-4 py-28 md:px-8">
      <SectionHeading eyebrow="Skills" title="A practical technical toolkit." copy="Core web skills, systems thinking, troubleshooting, productivity tools, and the technologies used to build this portfolio." />
      <GlassPanel className="mx-auto max-w-5xl p-6 md:p-10">
        <AnimatedTabs groups={skillGroups} />
      </GlassPanel>
    </section>
  );
}
