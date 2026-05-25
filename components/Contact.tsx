"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import HoldButton from "@/components/HoldButton";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      className="px-6 md:px-12 py-24 md:py-44 border-t border-black/[0.05] flex flex-col items-center text-center"
    >
      <motion.h2
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-[10px] tracking-[0.45em] uppercase text-black/25 mb-14"
      >
        Contact
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="font-thin text-black/55 leading-tight mb-16"
        style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
      >
        Let&apos;s work together.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <HoldButton email="ade.harseno@gmail.com" />
      </motion.div>
    </section>
  );
}
