"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { projects, Project } from "@/data/projects";

import P1  from "@/app/images/Project-1.png";
import P2  from "@/app/images/Project-2.png";
import P3  from "@/app/images/Project-3.png";
import P4  from "@/app/images/Project-4.png";
import P5  from "@/app/images/Project-5.png";
import P6  from "@/app/images/Project-6.png";
import P7  from "@/app/images/Project-7.png";
import P8  from "@/app/images/Project-8.png";
import P9  from "@/app/images/Project-9.png";
import Bg1 from "@/app/images/Bg-1.png";
import Bg2 from "@/app/images/Bg-2.jpg";
import Bg3 from "@/app/images/Bg-3.png";
import Bg4 from "@/app/images/Bg-4.png";
import Bg6 from "@/app/images/Bg-6.png";
import Bg8 from "@/app/images/Bg-8.png";
import Bg9 from "@/app/images/Bg-9.png";

const BG_IMAGES: (StaticImageData | string)[] = [
  Bg1,
  Bg2,
  Bg3,
  "/video/Bg-4.mp4",
  Bg4,
  Bg6,
  "/video/Bg-3.mp4",
  Bg8,
  Bg9
];

interface ImgItem {
  img: StaticImageData;
  bg: StaticImageData | string;
  project: Project;
}

function bg(i: number) { return BG_IMAGES[i % BG_IMAGES.length]; }

const row1Items: ImgItem[] = [
  { img: P1,  bg: bg(0), project: projects[0] },
  { img: P2,  bg: bg(1), project: projects[1] },
  { img: P3,  bg: bg(2), project: projects[2] },
  { img: P4,  bg: bg(3), project: projects[3] },
];

const row2Items: ImgItem[] = [
  { img: P5,  bg: bg(4), project: projects[4] },
  { img: P6,  bg: bg(5), project: projects[5] },
  { img: P7,  bg: bg(6), project: projects[6] },
  { img: P8,  bg: bg(7), project: projects[7] },
  { img: P9, bg: bg(8), project: projects[8] },
];

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale1 = useTransform(scrollYProgress, [0.1, 0.9], [1, 1.2]);
  const scale2 = useTransform(scrollYProgress, [0.1, 0.9], [1, 1.14]);

  return (
    <>
      <div
        id="work"
        ref={sectionRef}
        className="h-[180vh] overflow-hidden flex flex-col pb-20"
        style={{ 
          background: "#fff",
          fontSize: "clamp(1.8rem, 10vw, 8rem)",
          fontFamily: "var(--font-display)", 
        }}
      >
          {/* Header */}
          <div className="px-6 md:px-12 pt-14 pb-5 shrink-0 ">
            <h2
              className="text-4xl md:text-[60px] text-black"
            >
              Design and launch outstanding websites
            </h2>
          </div>
          {/* 3 rows — horizontal marquee */}
          <div className="flex flex-col gap-5 flex-1 overflow-hidden">
            <Row items={row1Items} duration={80} direction="left"  scale={scale1} className="flex-[2.5]" />
            <Row items={row2Items} duration={65} direction="left" scale={scale2} className="flex-2" />
          </div>
      </div>
    </>
  );
}

// Varied aspect ratios to create Readymag-style unequal image widths
const ITEM_RATIOS = [1.8];

function Row({
  items,
  duration,
  direction = "left",
  scale,
  className = "",
}: {
  items: ImgItem[];
  duration: number;
  direction?: "left" | "right";
  scale?: MotionValue<number>;
  className?: string;
}) {
  const doubled = [...items, ...items];
  const [paused, setPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const baseOffset = useRef(0);
  const hasDragged = useRef(false);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
    hasDragged.current = false;
    setPaused(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 4) hasDragged.current = true;
    setDragOffset(baseOffset.current + delta);
  };

  const onPointerUp = () => {
    baseOffset.current = dragOffset;
    dragStartX.current = null;
    setPaused(false);
  };

  const handleCardClick = (e: React.MouseEvent, url: string) => {
    if (hasDragged.current) { e.preventDefault(); return; }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`overflow-hidden select-none ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <motion.div
        className="h-full"
        style={scale ? { scale, transformOrigin: "50% 50%" } : undefined}
      >
        {/* Drag offset wrapper — translates independently of the CSS marquee animation */}
        <div style={{ transform: `translateX(${dragOffset}px)`, height: "100%" }}>
          <div
            className="flex h-full"
            style={{
              width: "max-content",
              animation: `${
                direction === "left" ? "marqueeLeft" : "marqueeRight"
              } ${duration}s linear infinite`,
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {doubled.map((item, i) => (
              <div
                key={i}
                className="relative h-full shrink-0 overflow-hidden group mr-5"
                style={{ aspectRatio: String(ITEM_RATIOS[i % ITEM_RATIOS.length]) }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => { if (dragStartX.current === null) setPaused(false); }}
                onClick={(e) => handleCardClick(e, item.project.url)}
              >
                {typeof item.bg === "string" ? (
                  <video
                    src={item.bg}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={item.bg}
                    alt=""
                    fill
                    className="object-cover"
                    aria-hidden="true"
                  />
                )}
                {/* Foreground project image — inset, aligned to bottom */}
                <div className="absolute inset-0 flex items-end justify-center pt-8 px-6 pb-0">
                  <div
                    className="relative w-full h-[88%]"
                    style={{ borderRadius: "6px 6px 0 0", overflow: "hidden" }}
                  >
                    <Image
                      src={item.img}
                      alt={item.project.title}
                      fill
                      className="object-cover object-top w-auto! mx-auto! rounded-se-lg rounded-ss-lg"
                    />
                  </div>
                </div>
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)" }}
                >
                  <div className="p-6 pb-7">
                    <p
                      className="text-white font-semibold leading-tight mb-3"
                      style={{ fontSize: "clamp(0.9rem, 3vw, 3rem)" }}
                    >
                      {item.project.title}
                    </p>
                    <button
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-200"
                      style={{ color: "#fff" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(item.project.url, "_blank", "noopener,noreferrer");
                      }}
                    >
                      Visit Site <span>↗</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}


