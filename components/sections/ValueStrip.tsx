"use client";

import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { valueStrip } from "@/lib/content";
import { tiltWarp } from "@/lib/fonts";
import { ValueStripBento } from "@/components/sections/ValueStripBento";

gsap.registerPlugin(ScrollTrigger);

export function ValueStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const words = section.querySelectorAll<HTMLElement>("[data-value-word]");
    const media = section.querySelectorAll<HTMLElement>("[data-value-media]");
    if (!words.length) return;

    if (prefersReducedMotion) {
      gsap.set(words, { opacity: 1, y: 0 });
      gsap.set(media, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0, y: 20 });
      gsap.set(media, { opacity: 0, y: 24 });

      const scrollTrigger = {
        trigger: section,
        start: "top 82%",
        once: true,
      };

      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger,
      });

      gsap.to(media, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
        scrollTrigger,
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="bg-background py-24 md:py-32"
    >
      <div className="container-wide">
        <p
          className={`${tiltWarp.className} max-w-4xl text-left text-2xl leading-[1.15] tracking-tight text-foreground md:text-4xl md:leading-[1.1] lg:text-5xl`}
        >
          {valueStrip.map((line, lineIndex) => (
            <span key={lineIndex} className="block">
              {line.split(" ").map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  data-value-word
                  className="mr-[0.28em] inline-block opacity-0"
                >
                  {word}
                </span>
              ))}
            </span>
          ))}
        </p>

        <ValueStripBento />
      </div>
    </section>
  );
}
