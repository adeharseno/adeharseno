"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Behance", href: "https://behance.net" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 transition-all duration-500 ${
          scrolled && !open ? "bg-white/70 backdrop-blur-md" : ""
        }`}
      >
        <a
          href="#"
          className="text-xs tracking-[0.3em] uppercase text-black/40 hover:text-black transition-colors duration-300"
        >
          a.h
        </a>
        <button
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 text-xs tracking-[0.3em] uppercase text-black/40 hover:text-black transition-colors duration-300"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? "close" : "menu"}
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-white flex flex-col justify-center px-6 md:px-12"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="text-6xl md:text-8xl font-thin text-black/70 hover:text-black transition-colors duration-300 leading-none"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="absolute bottom-8 left-6 md:left-12 flex gap-6 text-xs text-black/25"
            >
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors duration-300"
                >
                  {s.label}
                </a>
              ))}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
