"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Job {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

const jobs: Job[] = [
  {
    role: "Fullstack Developer",
    company: "MODENA",
    period: "Oct 2021 — Present",
    description:
      "Engineered and delivered end-to-end web and mobile platforms for Modena, driving the development of multiple products across the parent company and its subsidiaries, including its primary e-commerce platform, corporate websites, ERP systems, and mobile applications. Designed scalable frontend architectures and interactive interfaces focused on performance, maintainability, and high-conversion user experiences.",
    tags: ["Next.js", "React Native", "React.js", "TypeScript", "Node.js", "Laravel", "GSAP", "PostgreSQL"],
  },
  {
    role: "Web Engineer",
    company: "OCBC NISP",
    period: "May 2020 — Oct 2021",
    description:
      "Built and maintained web applications in an Agile (Scrum) team using React.js and TypeScript. Collaborated with designers and backend engineers to develop features, integrate APIs, and support multiple projects within a centralized CMS. Contributed to a property platform initiative to drive user acquisition.",
    tags: ["React.js", "TypeScript", "REST APIs", "Micro Frontends", "Agile"],
  },
  {
    role: "Sr. Frontend Developer",
    company: "Definite",
    period: "Feb 2016 — May 2020",
    description:
      "Developed multiple client websites using various technology stacks. Optimised performance, implemented PWA features, and applied SEO best practices to improve speed, usability, and search visibility.",
    tags: ["JavaScript", "React.js", "Vue.js", "WordPress", "PWA", "SEO"],
  },
  {
    role: "Frontend Developer",
    company: "Femina Group",
    period: "Dec 2014 — Jan 2016",
    description:
      "Developed and maintained content-heavy news and article platforms. Optimised performance, content structure, and readability to enhance user experience and support efficient content delivery.",
    tags: ["HTML/CSS", "JavaScript", "PHP"],
  },
];

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="shrink-0">
      <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1" />
      <path d="M6.5 3.5v3.2l1.8 1.3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function WireframeThumb() {
  return (
    <div
      className="hidden md:flex items-center justify-center w-32 h-24 border relative"
      style={{ borderColor: "rgba(0,0,0,0.15)" }}
    >
      <div className="absolute inset-3 flex flex-col justify-between">
        <div className="h-px w-full" style={{ background: "rgba(0,0,0,0.2)" }} />
        <div className="h-px w-3/4" style={{ background: "rgba(0,0,0,0.15)" }} />
        <div className="w-2 h-2 rounded-full self-center" style={{ background: "rgba(0,0,0,0.15)" }} />
        <div className="h-px w-3/4" style={{ background: "rgba(0,0,0,0.15)" }} />
        <div className="h-px w-full" style={{ background: "rgba(0,0,0,0.2)" }} />
      </div>
    </div>
  );
}

function JobRow({ job, index }: { job: Job; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07 }}
    >
      {/* Title row */}
      <div className="pt-6 pb-0">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <h2
            className="text-xl md:text-[2.5rem] font-semibold leading-none shrink-0"
            style={{ color: "#111", fontFamily: "var(--font-display)" }}
          >
            {job.company}
          </h2>
          <span className="text-base md:text-[2rem] shrink-0 font-light" style={{ color: "rgba(0,0,0,0.3)" }}>—</span>
          <h3
            className="text-lg md:text-[2.25rem] font-light leading-none shrink-0"
            style={{ color: "#111" }}
          >
            {job.role}
          </h3>
          <div className="hidden md:block flex-1 h-px mx-3 self-center" style={{ background: "rgba(0,0,0,0.12)" }} />
          <div className="hidden md:flex items-center gap-1.5 shrink-0 text-xl" style={{ color: "rgba(0,0,0,0.5)" }}>
            {job.period}
          </div>
        </div>
        <div className="md:hidden flex items-center gap-1.5 mt-1 text-xs" style={{ color: "rgba(0,0,0,0.4)" }}>
          <ClockIcon />
          {job.period}
        </div>
      </div>

      {/* Content row */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1.2fr_auto] gap-8 pt-6 pb-10">
        <p className="text-sm md:text-xl leading-relaxed max-w-150" style={{ color: "rgba(0,0,0,0.45)" }}>
          {job.description}
        </p>
        <div className="flex flex-col gap-0.5">
          {job.tags.map((tag, i) => (
            <span key={i} className="text-sm md:text-xl font-extralight" style={{ color: "#2B44F7" }}>
              {tag}{i < job.tags.length - 1 ? "," : ""}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section
      id="experience"
      className="px-6 md:px-12 py-24 md:py-36"
      style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}
    >
      {/* Section header — centered */}
      <div ref={titleRef} className="flex flex-col items-center text-center mb-8 md:mb-20">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="px-3 py-1.5  text-white text-xs font-extralight tracking-[0.15em] uppercase mb-5 inline-block"
        >
          {/* Experience */}
        </motion.span>
      </div>

      {/* Job rows */}
      <div>
        {jobs.map((job, i) => (
          <JobRow key={job.company} job={job} index={i} />
        ))}
      </div>
    </section>
  );
}
