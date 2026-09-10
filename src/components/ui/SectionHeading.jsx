"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animationPresets";

export default function SectionHeading({ eyebrow, title, copy }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.7 }} className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 font-mono text-sm uppercase tracking-[0.4em] text-[var(--accent)]">{eyebrow}</p>
      <h2 className="text-4xl font-semibold tracking-[-0.04em] text-gradient md:text-6xl">{title}</h2>
      {copy ? <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">{copy}</p> : null}
    </motion.div>
  );
}
