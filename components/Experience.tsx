"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Job {
  role: string;
  company: string;
  period: string;
  description: string;
}

const jobs: Job[] = [
  {
    role: "Fullstack Developer",
    company: "MODENA",
    period: "Oct 2021 — Present",
    description:
      "Engineered and delivered end-to-end web platforms including the primary e-commerce platform, corporate websites, and ERP systems. Built scalable frontend architectures with a focus on performance, maintainability, and high-conversion user experiences.",
  },
  {
    role: "Web Engineer",
    company: "OCBC NISP",
    period: "May 2020 — Oct 2021",
    description:
      "Built and maintained web applications in an Agile Scrum team using React.js and TypeScript. Collaborated with designers and backend engineers to develop features, integrate APIs, and support multiple projects within a centralised CMS.",
  },
  {
    role: "Sr. Frontend Developer",
    company: "Definite",
    period: "Feb 2016 — May 2020",
    description:
      "Developed multiple client websites using various technology stacks. Optimised performance, implemented PWA features, and applied SEO best practices to improve speed, usability, and search visibility.",
  },
  {
    role: "Frontend Developer",
    company: "Femina Group",
    period: "Dec 2014 — Jan 2016",
    description:
      "Developed and maintained content-heavy news and article platforms for subsidiary companies. Optimised performance, content structure, and readability to enhance user experience and support efficient content delivery.",
  },
];

export default function Experience() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section
      id="experience"
      className="px-6 md:px-12 py-24 md:py-36 border-t border-black/5"
    >
      <motion.h2
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-[16px] tracking-[0.45em] uppercase text-black/25 mb-12"
      >
        Experience
      </motion.h2>

      <div className="divide-y divide-black/5">
        {jobs.map((job, i) => (
          <JobRow key={job.company} job={job} index={i} />
        ))}
      </div>
    </section>
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
      className="flex flex-col md:flex-row md:items-start justify-between py-8 gap-4 md:gap-12"
    >
      {/* Left: index + role + company */}
      <div className="flex items-start gap-5 md:gap-10 flex-1 min-w-0">
        <span className="text-[14px] text-black/15 font-mono mt-0.75 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg md:text-2xl font-light text-black/65 leading-snug">
            {job.role}
          </h3>
          <p className="text-base text-black/35 mt-0.5 font-mono tracking-wide">
            {job.company}
          </p>
          <p className="mt-3 text-sm text-black/30 leading-relaxed max-w-lg hidden md:block">
            {job.description}
          </p>
        </div>
      </div>

      {/* Right: period */}
      <div className="flex items-start md:items-center gap-5 pl-10 md:pl-0 shrink-0">
        <span className="text-[11px] text-black/20 font-mono whitespace-nowrap">
          {job.period}
        </span>
      </div>

      {/* Mobile description */}
      <p className="text-sm text-black/20 leading-relaxed pl-10 md:hidden">
        {job.description}
      </p>
    </motion.div>
  );
}
