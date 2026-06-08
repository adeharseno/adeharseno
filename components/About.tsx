"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const ABOUT_TEXT =
  "I build digital products that live at the intersection of technology and design. I've spent years honing my craft - turning ideas into software that people actually enjoy using. Right now? I'm driven by the challenge of making complex systems feel simple and intuitive. It doesn't just ship. It tells a story. And every line I write brings someone's vision one step closer to life.";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, [range[0], range[1]], [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.6", "end 0.3"],
  });

  const words = ABOUT_TEXT.split(" ");

  return (
    <section
      id="about"
      ref={sectionRef}
      className="px-6 md:px-12 py-28 md:py-40"
    >
      <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] items-start gap-6 md:gap-10">
        {/* Label — fixed left column */}
        <div className="pt-3">
          <span className="px-3 py-1.5  text-white text-xs font-medium tracking-[0.15em] uppercase">
            {/* About */}
          </span>
        </div>

        {/* Animated paragraph — right column fills remaining width */}
        <p
          style={{
            color: "#222",
            fontSize: "clamp(1.4rem, 5.5vw, 51px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: "1.15",
            textIndent: "15%"
          }}
        >
          {words.map((word, i) => (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            >
              {word}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}
