"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

const topLine = "ADE";
const bottomLine = "HARSENO";

export default function Preloader({ onComplete }: PreloaderProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#f5f5f5" }}
        >
          {/* Thin horizontal rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-1/2 left-0 right-0 h-px origin-left"
            style={{ background: "rgba(0,0,0,0.06)" }}
          />

          {/* Top line — outlined stroke text */}
          <div
            className="overflow-hidden leading-none select-none"
            style={{ fontSize: "clamp(4rem, 18vw, 16rem)" }}
          >
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-stroke tracking-tight font-semibold"
            >
              {topLine}
            </motion.div>
          </div>

          {/* Bottom line — solid white */}
          <div
            className="overflow-hidden leading-none select-none"
            style={{ fontSize: "clamp(4rem, 18vw, 16rem)" }}
          >
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-semibold tracking-tight"
              style={{ color: "rgba(0,0,0,0.75)" }}
            >
              {bottomLine}
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="absolute bottom-10 left-6 md:left-12 text-xs tracking-[0.4em] uppercase"
            style={{ color: "rgba(0,0,0,0.2)" }}
          >
            Developer &amp; Designer
          </motion.p>

          {/* Loading bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px]"
            style={{ background: "rgba(0,0,0,0.12)" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.0, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
