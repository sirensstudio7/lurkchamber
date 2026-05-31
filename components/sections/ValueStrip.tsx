"use client";

import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Fragment, useEffect, useRef } from "react";
import { valueStrip, valueStripDesktopLines } from "@/lib/content";
import { tiltWarp } from "@/lib/fonts";
import { ValueStripBento } from "@/components/sections/ValueStripBento";

gsap.registerPlugin(ScrollTrigger);

function ValueStripWords({ line }: { line: string }) {
  const words = line.split(" ");

  return (
    <>
      {words.map((word, wordIndex) => (
        <Fragment key={wordIndex}>
          <span data-value-word className="inline-block">
            {word}
          </span>
          {wordIndex < words.length - 1 ? "\u00A0" : null}
        </Fragment>
      ))}
    </>
  );
}

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

    const revealWords = () => {
      gsap.set(words, { opacity: 1, y: 0 });
    };

    const revealMedia = () => {
      gsap.set(media, { opacity: 1, y: 0 });
    };

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0, y: 20 });
      gsap.set(media, { opacity: 0, y: 24 });

      const scrollConfig = {
        trigger: section,
        scroller: document.documentElement,
        start: "top 82%",
        once: true,
        invalidateOnRefresh: true,
      };

      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          ...scrollConfig,
          onEnter: revealWords,
          onEnterBack: revealWords,
        },
      });

      gsap.to(media, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
        scrollTrigger: {
          ...scrollConfig,
          onEnter: revealMedia,
          onEnterBack: revealMedia,
        },
      });

      ScrollTrigger.refresh();

      requestAnimationFrame(() => {
        const top = section.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.82) {
          revealWords();
          revealMedia();
        }
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
          className={`${tiltWarp.className} max-w-4xl text-left text-[clamp(2.25rem,10.5vw,3rem)] leading-[1.12] tracking-tight text-foreground md:text-4xl md:leading-[1.1] lg:text-5xl`}
        >
          {valueStrip.map((line, lineIndex) => (
            <span key={`m-${lineIndex}`} className="block md:hidden">
              <ValueStripWords line={line} />
            </span>
          ))}
          {valueStripDesktopLines.map((line, lineIndex) => (
            <span key={`d-${lineIndex}`} className="hidden md:block">
              <ValueStripWords line={line} />
            </span>
          ))}
        </p>

        <ValueStripBento />
      </div>
    </section>
  );
}
