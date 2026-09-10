"use client";

import { motion } from "framer-motion";
import GlassPanel from "@/components/ui/GlassPanel";
import SectionHeading from "@/components/ui/SectionHeading";
import { certifications, education } from "@/data/profile";

export default function EducationSection() {
  return (
    <section id="education" className="px-4 py-28 md:px-8">
      <SectionHeading eyebrow="Education" title="Learning path with cloud and security depth." copy="Formal IT study is supported by cybersecurity foundations and ongoing AWS cloud training." />
      <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
          <GlassPanel className="scan-line h-full p-7 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)]">University</p>
            {education.map((item) => (
              <div key={item.institution} className="mt-5">
                <h3 className="text-3xl font-semibold tracking-[-0.04em]">{item.program}</h3>
                <p className="mt-3 text-xl text-[var(--muted)]">{item.institution}</p>
                <p className="mt-5 font-mono text-sm text-[var(--accent)]">{item.period} | {item.location}</p>
              </div>
            ))}
          </GlassPanel>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
          <GlassPanel className="p-7 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)]">Certificates & Courses</p>
            <div className="mt-6 space-y-4">
              {certifications.map((item) => (
                <div key={item.name} className="neon-ring rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-5">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="mt-2 text-[var(--muted)]">{item.issuer}</p>
                  {item.period ? <p className="mt-2 font-mono text-xs text-[var(--accent)]">{item.period}</p> : null}
                  <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{item.status}</p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
