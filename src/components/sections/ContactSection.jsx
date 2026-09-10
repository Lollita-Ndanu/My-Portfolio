import { Mail } from "lucide-react";
import GlassPanel from "@/components/ui/GlassPanel";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import { profile, socials } from "@/data/profile";

export default function ContactSection() {
  return (
    <section id="contact" className="px-4 py-28 md:px-8">
      <SectionHeading eyebrow="Contact" title="Let us build something useful." copy="Reach out for full stack development, systems analysis, responsive websites, digital content, or collaborative technology projects." />
      <GlassPanel className="neon-ring mx-auto max-w-4xl p-8 text-center md:p-12">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--accent)] text-white shadow-[0_20px_70px_var(--glow)]">
          <Mail />
        </div>
        <h3 className="mt-8 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Let us build something useful and immersive.</h3>
        <p className="mx-auto mt-5 max-w-2xl text-[var(--muted)]">Reach out for full stack development, systems analysis, responsive websites, digital content, or collaborative technology projects.</p>
        <p className="mt-5 font-mono text-sm text-[var(--accent)]">{profile.phone}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MagneticButton href={`mailto:${profile.email}`}>Email Me</MagneticButton>
          {socials.map((social) => (
            <MagneticButton key={social.label} href={social.href} variant="ghost">{social.label}</MagneticButton>
          ))}
        </div>
      </GlassPanel>
    </section>
  );
}
