"use client";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--background)", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
      {/* Top info row */}
      <div className="px-6 md:px-12 pt-14 pb-10 flex justify-between items-start">
        <div>
          {/* <p
            className="text-xs tracking-[0.15em] uppercase mb-2"
            style={{ color: "rgba(0,0,0,0.35)" }}
          >
            Quick Links
          </p>
          <div className="flex gap-0 text-xs tracking-widest uppercase" style={{ color: "rgba(0,0,0,0.55)" }}>
            {navLinks.map((l, i) => (
              <span key={l.href}>
                <a href={l.href} className="hover:text-black transition-colors duration-200">
                  {l.label.toUpperCase()}
                </a>
                {i < navLinks.length - 1 && <span className="mx-2">,</span>}
              </span>
            ))}
          </div> */}
        </div>

        <div className="text-right">
          <div
            className="flex gap-4 justify-end text-xs tracking-widest uppercase mb-1"
            style={{ color: "rgba(0,0,0,0.55)" }}
          >
            <a
              href="https://github.com/adeharseno"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors duration-200"
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/ade-harseno-989436aa/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors duration-200"
            >
              LinkedIn
            </a>
          </div>
          <a
            href="mailto:adeharseno@gmail.com"
            className="text-xs tracking-[0.05em] transition-colors duration-200 hover:opacity-70"
            style={{ color: "#2B44F7" }}
          >
            [ adeharseno@gmail.com ]
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 md:mx-12 h-px" style={{ background: "rgba(0,0,0,0.1)" }} />

      {/* Name — full bleed */}
      {/* <div className="px-4 md:px-8 pt-8 pb-3">
        <p
          className="w-full text-center font-semibold uppercase leading-none"
          style={{ fontSize: "clamp(3rem, 15vw, 14rem)", color: "#1a1a1a", letterSpacing: "-0.03em" }}
        >
          ADE HARSENO
        </p>
      </div> */}

      {/* Copyright */}
      {/* <p
        className="pb-8 text-center text-[10px] tracking-[0.25em] uppercase"
        style={{ color: "rgba(0,0,0,0.3)" }}
      >
        © 2026 All Rights Reserved.
      </p> */}
    </footer>
  );
}
