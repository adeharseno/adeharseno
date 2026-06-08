"use client";

import { motion } from "framer-motion";

const SF_PRO = '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif';

const lineVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="overlay relative min-h-screen flex flex-col justify-between px-6 md:px-12 pt-28 pb-14 overflow-hidden"
    >
      {/* Background video */}
      <video
        src="/video/vid_bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <div className="relative flex-1 flex flex-col justify-center text-center max-w-350 mx-auto z-10">

        <div className="flex items-start gap-6 md:gap-10">
          <div className="overflow-hidden w-full md:w-auto md:shrink-0">
            <motion.h1
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className="block font-semibold capitalize leading-[0.9] tracking-normal select-none"
              style={{
                fontSize: "clamp(2.5rem, 12vw, 8rem)",
                fontFamily: "var(--font-display)",
              }}
            >
              Ade Harseno
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 1 }}
            className="hidden md:flex items-end pb-5 max-w-xs text-lg leading-6 self-end text-left"
          >
            Loves creating digital products at the intersection of technology,
            design, and innovation.
          </motion.p>
        </div>

        {/* Row 2: Software Engineer */}
        <div className="overflow-hidden">
          <motion.h2
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="block font-light capitalize tracking-normal select-none md:leading-38.5"
            style={{
                fontSize: "clamp(1.8rem, 10vw, 8rem)",
              fontFamily: "var(--font-display)",
            }}
          >
            Software Engineer
          </motion.h2>
        </div>

        {/* Description — mobile: below heading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
          className="md:hidden mt-6 max-w-xs text-sm leading-relaxed"
          style={{ color: "rgba(0,0,0,0.5)" }}
        >
          Loves creating digital products at the intersection of technology,
          design, and innovation.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
        className="flex justify-center items-center gap-3 mt-12 z-10"
      >
        <a
          href="#work"
          className="px-8 py-4 bg-[#2B44F7] text-white text-xs font-semibold tracking-[0.18em] uppercase transition-opacity duration-300 hover:opacity-80"
        >
          View My Work
        </a>
      </motion.div>

      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "rgba(0,0,0,0.05)" }}
      />
    </section>
  );
}
