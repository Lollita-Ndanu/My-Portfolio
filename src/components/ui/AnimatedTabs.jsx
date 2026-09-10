"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AnimatedTabs({ groups }) {
  const [active, setActive] = useState(0);
  const group = groups[active];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.32fr_1fr]">
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
        {groups.map((item, index) => (
          <motion.button
            key={item.label}
            onClick={() => setActive(index)}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.96 }}
            className="scan-line relative shrink-0 rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-left backdrop-blur-xl"
          >
            {active === index ? <motion.span layoutId="tab-active" className="neon-ring absolute inset-0 rounded-2xl border border-[var(--accent-soft)] bg-gradient-to-r from-[var(--accent)]/20 to-[var(--accent-soft)]/20" /> : null}
            <span className="relative z-10 block font-mono text-[0.6rem] uppercase tracking-[0.28em] text-[var(--accent)]">0{index + 1}</span>
            <span className="relative z-10 mt-1 block text-sm font-semibold">{item.label}</span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={group.label}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.28 }}
          className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6 backdrop-blur-xl"
        >
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)]">{group.label}</p>
          <div className="flex flex-wrap gap-3">
            {group.skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.85, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.28, delay: i * 0.04 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="rounded-full border border-[var(--line)] bg-[var(--panel-strong)] px-4 py-2 font-mono text-sm text-[var(--muted)] transition-colors hover:border-[var(--accent-soft)] hover:text-[var(--foreground)]"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
