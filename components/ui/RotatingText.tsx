"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type RotatingTextProps = {
  words: readonly string[];
  className?: string;
};

const EASE = [0.33, 1, 0.68, 1] as const;
const DURATION = 0.65;
const INTERVAL_MS = 3200;

export function RotatingText({ words, className }: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const current = words[index] ?? words[0];

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, [words.length, prefersReducedMotion]);

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: DURATION, ease: EASE };

  return (
    <span
      className={`inline-grid align-baseline overflow-hidden font-bold ${className ?? ""}`}
      style={{ verticalAlign: "baseline" }}
    >
      <span
        aria-hidden
        className="col-start-1 row-start-1 whitespace-nowrap text-lg opacity-0 md:text-xl"
      >
        {current}
      </span>

      <span
        aria-hidden
        className="col-start-1 row-start-1 relative min-w-0 overflow-hidden"
      >
        <AnimatePresence initial={false}>
          <motion.span
            key={current}
            className="absolute bottom-0 left-0 block whitespace-nowrap text-lg will-change-[transform,opacity] md:text-xl"
            initial={
              prefersReducedMotion ? false : { y: "100%", opacity: 0 }
            }
            animate={{ y: 0, opacity: 1 }}
            exit={
              prefersReducedMotion ? undefined : { y: "-100%", opacity: 0 }
            }
            transition={transition}
          >
            {current}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
