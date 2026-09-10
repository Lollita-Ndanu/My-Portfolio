"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

export default function MagneticButton({ children, href = "#", variant = "solid" }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        "scan-line relative inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition",
        variant === "solid"
          ? "neon-ring bg-[var(--accent)] text-white hover:bg-[var(--accent-soft)]"
          : "border border-[var(--line)] bg-[var(--panel)] text-[var(--foreground)] backdrop-blur-xl hover:border-[var(--accent)]"
      )}
    >
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
}
