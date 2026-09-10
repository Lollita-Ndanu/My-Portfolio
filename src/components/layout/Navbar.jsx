"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

export default function Navbar({ theme, onToggle }) {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastY && currentY > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1280px)");
    const onChange = () => {
      if (mql.matches) setOpen(false);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-[var(--background)]/80 backdrop-blur-2xl xl:hidden"
          >
            <div className="flex h-full flex-col justify-center px-8 pt-20">
              <nav className="flex flex-col gap-2">
                {links.map((link, index) => (
                  <motion.a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 * index }}
                    className="group flex items-center gap-4 py-3"
                  >
                    <span className="font-mono text-sm text-[var(--accent)]">0{index + 1}</span>
                    <span className="text-4xl font-semibold tracking-[-0.03em] text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
                      {link}
                    </span>
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.header
        initial={false}
        animate={{ y: hidden && !open ? "-110%" : "0%" }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="fixed inset-x-0 top-0 z-40 px-4 py-4 md:px-8"
      >
        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="#home" onClick={() => setOpen(false)} className="header-brand">
            <span className="header-brand-purple">Lollita</span>{" "}
            <span className="header-brand-foreground">Ndanu</span>
          </a>
          <div className="hidden rounded-full border border-[var(--line)] bg-[var(--panel)] px-2 py-2 backdrop-blur-xl xl:flex">
            {links.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="rounded-full px-4 py-2 text-sm text-[var(--muted)] transition hover:bg-[var(--accent)]/10 hover:text-[var(--foreground)]">
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={onToggle} />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] bg-[var(--panel)] text-[var(--foreground)] backdrop-blur-xl xl:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>
    </>
  );
}
