"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/layout/Header";
import { DeviceMockup } from "@/components/ui/DeviceMockup";
import { RotatingText } from "@/components/ui/RotatingText";
import { brand, hero } from "@/lib/content";
import { tiltWarp } from "@/lib/fonts";
import { playPopSound } from "@/lib/playPopSound";

const HERO_BG = brand.heroBg;
const HERO_TEXT = brand.heroText;
/** Scroll end: bottom corners form a full semicircle (radius = half panel width). */

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [maxBottomRadius, setMaxBottomRadius] = useState(600);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateRadius = () => {
      setMaxBottomRadius(section.offsetWidth / 2);
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const bottomRadius = useTransform(scrollYProgress, (progress) => {
    return progress * maxBottomRadius;
  });

  const horizontalInset = useTransform(scrollYProgress, [0, 1], [0, 20]);

  const heroWidth = useTransform(
    horizontalInset,
    (inset) => `calc(100% - ${inset * 2}px)`,
  );

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const sectionClass =
    "hero-section relative z-20 mx-auto flex min-h-dvh w-full max-w-full flex-col overflow-visible pb-0";

  const content = (
    <div className="relative z-10 flex flex-1 flex-col">
      <Header />
      {/* Spacer for fixed header (pill ~60–68px + top padding) */}
      <div className="h-[76px] shrink-0 md:h-[88px]" aria-hidden />
      <div
        className="hero-content container-wide relative flex min-h-0 flex-1 flex-col justify-center gap-3 overflow-visible bg-transparent pt-0 md:justify-start md:gap-0 md:pt-4"
        style={{ color: HERO_TEXT, backgroundColor: "transparent" }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-30 mx-auto w-full max-w-2xl text-center"
        >
          <motion.h1
            variants={item}
            className={`${tiltWarp.className} text-hero`}
            style={{ color: HERO_TEXT }}
          >
            <span className="block">{hero.line1}</span>
            <span className="block opacity-90">{hero.line2}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mb-0 mt-2 max-w-2xl text-base leading-snug text-white opacity-90 md:mt-4 md:text-lg md:leading-relaxed"
          >
            {hero.sublineBefore}
            <RotatingText
              words={hero.rotatingServices}
              className="text-hero-foreground"
            />
            {hero.sublineAfter}
          </motion.p>

          <motion.div
            variants={item}
            className="relative z-40 mt-3 flex items-center justify-center gap-2 md:mt-6"
          >
            <a
              href={hero.cta.href}
              className="inline-flex h-11 shrink-0 items-center rounded-[43px] bg-hero-foreground px-5 font-[family-name:var(--font-inter)] text-base font-semibold text-foreground transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hero-foreground"
              onClick={() => playPopSound()}
            >
              {hero.cta.label}
            </a>
            <a
              href={hero.cta.href}
              aria-label="Go to contact"
              className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-hero-foreground text-foreground transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hero-foreground"
              onClick={() => playPopSound()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={item}
          className="hero-mockup relative z-10 w-full shrink-0 overflow-visible pb-2 md:mt-auto md:pb-0 md:pt-4"
        >
          <DeviceMockup />
        </motion.div>
      </div>
    </div>
  );

  if (prefersReducedMotion) {
    return (
      <section
        id="hero"
        ref={sectionRef}
        className={sectionClass}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          className="hero-section-bg pointer-events-none absolute inset-0 bg-hero-bg"
          style={{
            borderBottomLeftRadius: maxBottomRadius,
            borderBottomRightRadius: maxBottomRadius,
          }}
          aria-hidden
        />
        {content}
      </section>
    );
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={sectionClass}
      style={{
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {/* Animated orange panel only — keeps 3D out of any transform/clip layer */}
      <motion.div
        className="hero-section-bg pointer-events-none absolute inset-y-0 left-1/2 bg-hero-bg"
        style={{
          width: heroWidth,
          x: "-50%",
          borderBottomLeftRadius: bottomRadius,
          borderBottomRightRadius: bottomRadius,
        }}
        aria-hidden
      />
      {content}
    </section>
  );
}
