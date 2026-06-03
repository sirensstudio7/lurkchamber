"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { aboutSection } from "@/lib/content";
import { scheduleLayoutStable } from "@/lib/layout-stable";
import "./about.css";

gsap.registerPlugin(ScrollTrigger);

type AboutToken = (typeof aboutSection.paragraphs)[number][number];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const reveals = gsap.utils.toArray<HTMLElement>(
      section.querySelectorAll(".about-section__reveal"),
    );

    if (!reveals.length) return;

    if (prefersReducedMotion) {
      gsap.set(reveals, { opacity: 1, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const step = 0.16;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=180%",
          scrub: 0.35,
          pin: true,
        },
      });

      reveals.forEach((item, index) => {
        const position = index * step;

        tl.fromTo(
          item,
          { opacity: 0, scale: 0.72, transformOrigin: "50% 85%" },
          {
            opacity: 1,
            scale: 1.05,
            duration: step * 0.65,
            ease: "power3.out",
          },
          position,
        ).to(
          item,
          { scale: 1, duration: step * 0.35, ease: "power2.inOut" },
          position + step * 0.65,
        );
      });
    }, section);

    scheduleLayoutStable();
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section bg-background"
      aria-label="About"
    >
      <div className="about-section__container container-wide">
        <div className="about-section__copy">
          {aboutSection.paragraphs.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex} className="about-section__paragraph">
              {paragraph.map((token, tokenIndex) => (
                <AboutToken
                  key={`${paragraphIndex}-${tokenIndex}`}
                  token={token}
                />
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutToken({ token }: { token: AboutToken }) {
  if (token.type === "icon") {
    return (
      <Image
        src={token.src}
        alt={token.alt}
        width={52}
        height={52}
        unoptimized
        className="about-section__icon about-section__reveal"
        aria-hidden={token.alt === "" ? true : undefined}
      />
    );
  }

  return <span className="about-section__word about-section__reveal">{token.text}</span>;
}
