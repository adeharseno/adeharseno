"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const EMAIL = "adeharseno@gmail.com";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="px-4 md:px-8 py-6 md:py-10" style={{ background: "var(--background)" }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl px-10 md:px-16 py-16 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-10"
        style={{ background: "#0e0e0e" }}
      >
        {/* Left — heading + subtitle */}
        <div className="max-w-xl">
          <h2
            className="leading-tight mb-5"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              color: "#fff",
              fontFamily: "var(--font-display)",
            }}
          >
            Let&apos;s work{" "}
            <em style={{ fontStyle: "italic", fontFamily: "var(--font-display)" }}>
              together!
            </em>
          </h2>
        </div>

        {/* Right — email + copy */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`mailto:${EMAIL}`}
            className="font-semibold transition-opacity duration-200 hover:opacity-70"
            style={{ color: "#fff", fontSize: "clamp(0.85rem, 1.3vw, 1rem)" }}
          >
            {EMAIL}
          </a>
          <button
            onClick={handleCopy}
            aria-label="Copy email"
            className="flex items-center justify-center rounded-full transition-colors duration-200"
            style={{
              width: "36px",
              height: "36px",
              background: "rgba(255,255,255,0.12)",
              color: copied ? "#4ade80" : "#fff",
              flexShrink: 0,
            }}
          >
            {copied ? (
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M2.5 7.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <rect x="5" y="5" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <path d="M10 5V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
