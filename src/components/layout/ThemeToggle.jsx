"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <button onClick={onToggle} className="neon-ring inline-flex items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm backdrop-blur-xl" aria-label="Toggle theme">
      <span className="relative flex h-9 w-16 items-center rounded-full bg-[var(--accent)]/12 p-1">
        <motion.span layout className="grid h-7 w-7 place-items-center rounded-full bg-[var(--accent)] text-white" animate={{ x: isDark ? 29 : 0 }} transition={{ type: "spring", stiffness: 320, damping: 24 }}>
          {isDark ? <Moon size={15} /> : <Sun size={15} />}
        </motion.span>
      </span>
      <span className="hidden pr-2 font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)] sm:block">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
