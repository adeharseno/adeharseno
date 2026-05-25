"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { projects, Project } from "@/data/projects";

export default function Work() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section id="work" className="px-6 md:px-12 py-24 md:py-36 border-t border-black/[0.05]">
      <motion.h2
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-[16px] tracking-[0.45em] uppercase text-black/25 mb-12"
      >
        Selected Work
      </motion.h2>

      <div className="divide-y divide-black/[0.05]">
        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.a
      ref={ref}
      href={project.url}
      target={project.url !== "#" ? "_blank" : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      className="group flex items-start md:items-center justify-between py-7 gap-4 cursor-pointer"
    >
      {/* Left: id + title + description */}
      <div className="flex items-start md:items-center gap-5 md:gap-10 flex-1 min-w-0">
        <span className="text-[14px] text-black/15 font-mono mt-[3px] md:mt-0 shrink-0">
          {project.id}
        </span>
        <div className="min-w-0">
          <h3 className="text-lg md:text-2xl font-light text-black/65 group-hover:text-black transition-colors duration-300 leading-snug">
            {project.title}
          </h3>
          <p className="hidden md:block text-sm text-black/20 mt-1 max-w-md leading-relaxed truncate">
            {project.description}
          </p>
        </div>
      </div>

      {/* Right: tags + year + arrow */}
      <div className="flex items-center gap-5 md:gap-8 shrink-0">
        <div className="hidden md:flex gap-1.5 flex-wrap justify-end">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] tracking-wide text-black/20 border border-black/[0.08] px-2 py-0.5 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-[11px] text-black/15 font-mono">{project.year}</span>
        <span className="text-sm text-black/15 group-hover:text-black transition-colors duration-300">
          ↗
        </span>
      </div>
    </motion.a>
  );
}
