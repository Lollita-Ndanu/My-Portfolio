"use client";

import { motion } from "framer-motion";
import GlassPanel from "@/components/ui/GlassPanel";
import SectionHeading from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

export default function AboutSection() {
  return (
    <section id="about" className="px-4 py-28 md:px-8">
      <SectionHeading eyebrow="About" title="Curious, analytical, and hands-on." copy="I blend full stack development, systems analysis, and troubleshooting to turn requirements into practical digital products." />
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-[0.82fr_1.18fr]">
        <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <GlassPanel className="scan-line h-full p-7">
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-[var(--accent)]">Location</p>
            <h3 className="mt-4 text-3xl font-semibold">{profile.location}</h3>
            <div className="mt-8 space-y-3 text-[var(--muted)]">
              <p>{profile.email}</p>
              <p>{profile.phone}</p>
            </div>
            <a href={profile.resume} className="neon-ring mt-8 inline-flex rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_var(--glow)]">
              Download Resume
            </a>
          </GlassPanel>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <GlassPanel className="p-7 md:p-10">
            <p className="text-lg leading-8 text-[var(--muted)] md:text-xl">{profile.summary}</p>
            <div className="mt-8 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)]">Interests</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <span key={interest} className="rounded-full border border-[var(--line)] bg-[var(--panel)] px-3 py-2 font-mono text-xs text-[var(--accent)]">
                  {interest}
                </span>
              ))}
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
