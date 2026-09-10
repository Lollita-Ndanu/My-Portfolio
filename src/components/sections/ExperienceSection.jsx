"use client";

import { motion } from "framer-motion";
import GlassPanel from "@/components/ui/GlassPanel";
import SectionHeading from "@/components/ui/SectionHeading";
import { experience } from "@/data/profile";

export default function ExperienceSection() {
  return (
    <section id="experience" className="px-4 py-28 md:px-8">
      <SectionHeading eyebrow="Experience" title="Work shaped by real requirements." copy="A timeline of web development, business translation, and digital communication experience." />
      <div className="mx-auto max-w-4xl">
        <div className="relative pl-8">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--accent-soft)] to-transparent" />
          {experience.map((item, index) => (
            <motion.div
              key={`${item.company}-${item.role}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.62, delay: index * 0.08 }}
              className="relative mb-6"
            >
              <span className="glow-pulse absolute -left-8 top-7 h-3 w-3 rounded-full bg-[var(--accent)]" />
              <GlassPanel className="scan-line p-6 md:p-8">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)]">{item.period}</p>
                <h3 className="text-sheen mt-4 text-2xl font-semibold tracking-[-0.03em]">{item.company}</h3>
                <p className="mt-2 text-[var(--muted)]">{item.role}</p>
                <ul className="mt-6 space-y-3 text-[var(--muted)]">
                  {item.details.map((detail) => (
                    <li key={detail} className="flex gap-3 leading-7">
                      <span className="glow-pulse mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-soft)]" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
