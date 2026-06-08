"use client";

import { useState, useRef, useCallback } from "react";

const HOLD_DURATION = 1000;

interface HoldButtonProps {
  email: string;
}

export default function HoldButton({ email }: HoldButtonProps) {
  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const [copied, setCopied] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const tick = useCallback(() => {
    if (startTimeRef.current === null) return;
    const elapsed = Date.now() - startTimeRef.current;
    const p = Math.min(elapsed / HOLD_DURATION, 1);
    setProgress(p);
    if (p < 1) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      navigator.clipboard.writeText(email).catch(() => null);
      startTimeRef.current = null;
      setHolding(false);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setProgress(0);
      }, 2500);
    }
  }, [email]);

  const startHold = useCallback(() => {
    if (copied) return;
    setHolding(true);
    setProgress(0);
    startTimeRef.current = Date.now();
    rafRef.current = requestAnimationFrame(tick);
  }, [tick, copied]);

  const stopHold = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    startTimeRef.current = null;
    if (!copied) {
      setHolding(false);
      setProgress(0);
    }
  }, [copied]);

  const r = 44;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-5 select-none">
      <button
        onMouseDown={startHold}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={(e) => {
          e.preventDefault();
          startHold();
        }}
        onTouchEnd={stopHold}
        className="relative flex items-center justify-center w-36 h-36 rounded-full cursor-pointer group"
        aria-label="Hold to copy email address"
      >
        {/* Track ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="1"
          />
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="rgba(0,0,0,0.6)"
            strokeWidth="1.5"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Label */}
          <span className="text-[10px] tracking-[0.2em] uppercase text-center leading-relaxed transition-colors duration-300" style={{ color: "rgba(0,0,0,0.35)" }}>
          {copied ? (
            <span style={{ color: "rgba(0,0,0,0.75)" }}>Copied!</span>
          ) : holding ? (
            "Holding..."
          ) : (
            <>
              Hold to
              <br />
              copy!
            </>
          )}
        </span>
      </button>

      <span className="text-xs font-mono tracking-wider" style={{ color: "rgba(0,0,0,0.18)" }}>{email}</span>
    </div>
  );
}
