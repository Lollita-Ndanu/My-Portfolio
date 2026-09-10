"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";
import { fadeUp, stagger } from "@/lib/animationPresets";
import MagneticButton from "@/components/ui/MagneticButton";
import TypewriterText from "@/components/ui/TypewriterText";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center px-4 pb-24 pt-32 md:px-8">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:[grid-template-areas:'title_photo'_'copy_photo']"
      >
        <div className="lg:[grid-area:title]">
          <p className="text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-gradient md:text-7xl">
            <TypewriterText text="Full Stack Developer and System Analyst" />
          </p>
        </div>

        <motion.div variants={fadeUp} className="flex justify-center lg:[grid-area:photo] lg:justify-end">
          <div className="profile-neon-ring relative aspect-square w-64 rounded-full p-[12px] md:w-[26rem]">
            <Image
              src="/images/lollita.jpg"
              alt="Lollita Ndanu"
              width={512}
              height={512}
              priority
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="lg:[grid-area:copy]">
          <p className="mt-2 max-w-2xl text-xl leading-8 text-[var(--muted)] md:text-2xl">
            I&apos;m passionate about building intuitive digital experiences and turning real-world problems into practical technology solutions. I enjoy creating, exploring new technologies, and continuously expanding my skills.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="#projects">View Projects</MagneticButton>
            <MagneticButton href={profile.resume} variant="ghost">Resume</MagneticButton>
            <MagneticButton href="#contact" variant="ghost">Contact</MagneticButton>
          </div>
        </motion.div>
      </motion.div>
      <a href="#about" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full text-sm text-[var(--muted)] md:flex">
        Scroll <ArrowDown size={16} />
      </a>
    </section>
  );
}
