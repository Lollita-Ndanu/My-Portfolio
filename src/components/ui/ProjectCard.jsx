"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import GlassPanel from "./GlassPanel";

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.62, delay: index * 0.08 }}
    >
      <GlassPanel className="scan-line group relative h-full min-h-[320px] overflow-hidden p-7">
        <div className="mb-10 flex items-center justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--accent)]">{project.type}</p>
          <span className="rounded-full border border-[var(--line)] px-3 py-1 font-mono text-xs text-[var(--muted)]">0{index + 1}</span>
        </div>
        <h3 className="text-sheen text-3xl font-semibold tracking-[-0.03em]">{project.title}</h3>
        <p className="mt-4 leading-7 text-[var(--muted)]">{project.description}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="rounded-full bg-[var(--accent)]/10 px-3 py-1 font-mono text-xs text-[var(--accent)]">
              {tech}
            </span>
          ))}
        </div>
        <ArrowUpRight className="absolute bottom-7 right-7 animate-pulse text-[var(--accent)] opacity-70 transition group-hover:opacity-100" />
      </GlassPanel>
    </motion.div>
  );
}
