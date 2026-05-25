"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills: Record<string, string[]> = {
  Development: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
  Design: ["Figma", "UI/UX Design", "Tailwind CSS", "Design Systems"],
  Tools: ["Git", "Vercel", "Supabase", "AWS"],
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="px-6 md:px-12 py-24 md:py-36 border-t border-black/[0.05]"
    >
      <motion.h2
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-[10px] tracking-[0.45em] uppercase text-black/25 mb-12"
      >
        About
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15 }}
        >
          <p className="text-2xl md:text-3xl font-thin text-black/60 leading-relaxed">
            Developer &amp; designer focused on building meaningful digital
            experiences.
          </p>
          <p className="mt-6 text-sm text-black/30 leading-relaxed max-w-md">
            With a passion for the intersection of technology and design, I
            craft products that are both functional and beautiful. I believe
            great software comes from a deep understanding of both the user and
            the craft.
          </p>
          <p className="mt-4 text-sm text-black/30 leading-relaxed max-w-md">
            Currently open to freelance projects and full-time opportunities.
          </p>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="flex flex-col gap-8"
        >
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-[9px] tracking-[0.45em] uppercase text-black/18 mb-3">
                {category}
              </h4>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm text-black/40 hover:text-black transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
