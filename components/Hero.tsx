"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.2 },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function SpacedName({ name, delay = 0 }: { name: string; delay?: number }) {
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.055, delayChildren: delay },
        },
      }}
      initial="hidden"
      animate="visible"
      className="flex overflow-hidden"
      aria-label={name}
    >
      {name.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          className="inline-block"
          style={{ marginRight: i < name.length - 1 ? "0.1em" : 0 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ade-harseno-989436aa/" },
  { label: "Github", href: "https://github.com/adeharseno" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20"
    >
      <div className="flex flex-col">
        {/* Big spaced-letter name */}
        <div
          className="font-medium leading-[0.88] tracking-tight text-black/75 select-none"
          style={{ fontSize: "clamp(3.5rem, 12vw, 13rem)" }}
        >
          <SpacedName name="Ade" delay={0.2} />
          <div>
            <SpacedName name="Harseno" delay={0.55} />
          </div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
          className="mt-10 max-w-lg text-xl text-black/45 leading-relaxed"
        >
          I&apos;m a{" "}
          <span className="text-black">developer</span>, passionate about{" "}
          <span className="text-black">innovation</span>,{" "}
          <span className="text-black">tech</span>, and{" "}
          <span className="text-black">design</span> with a strong experience
          in <span className="text-black">product</span>.
        </motion.p>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-5 flex gap-1 text-base text-black/40"
        >
          {socials.map((s, i) => (
            <span key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors duration-300"
              >
                {s.label}
              </a>
              {i < socials.length - 1 && <span className="mx-1">,</span>}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scrolldown indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3, duration: 1 }}
        className="absolute bottom-10 right-6 md:right-12 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-black/25 [writing-mode:vertical-rl] rotate-180">
          scrolldown
        </span>
        <motion.div
          animate={{ scaleY: [1, 0.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-12 bg-black/20 origin-top"
        />
      </motion.div>
    </section>
  );
}
