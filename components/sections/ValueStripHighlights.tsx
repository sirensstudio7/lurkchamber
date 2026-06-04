"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { workHighlights, workHighlightsSection } from "@/lib/content";
import { WorkHighlightFrame } from "@/components/sections/WorkHighlightFrame";
import { Reveal } from "@/components/ui/Reveal";
import { useHydrated } from "@/lib/use-hydrated";
import { scheduleLayoutStable } from "@/lib/layout-stable";
import { tiltWarp } from "@/lib/fonts";
import "./work-highlights-slider.css";

function WorkHighlightsMarquee() {
  const marqueeItems = [...workHighlights, ...workHighlights];

  return (
    <div className="work-highlights-slider work-highlights-slider--marquee">
      <div
        className="work-highlights-slider__marquee-track work-highlights-slider__marquee-track--infinite"
        aria-hidden
      >
        {marqueeItems.map((item, index) => (
          <div
            key={`${item.imageSrc}-${index}`}
            className="work-highlights-slider__slide"
          >
            <WorkHighlightFrame src={item.imageSrc} alt={item.imageAlt} />
          </div>
        ))}
      </div>
      <ul className="sr-only">
        {workHighlights.map((item) => (
          <li key={item.imageSrc}>{item.imageAlt}</li>
        ))}
      </ul>
    </div>
  );
}

function WorkHighlightsStaticTrack() {
  return (
    <div className="work-highlights-slider">
      <div
        className="work-highlights-slider__track"
        role="region"
        aria-roledescription="carousel"
        aria-label="Work highlights"
      >
        {workHighlights.map((item) => (
          <div key={item.imageSrc} className="work-highlights-slider__slide">
            <WorkHighlightFrame src={item.imageSrc} alt={item.imageAlt} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ValueStripHighlights() {
  const prefersReducedMotion = useReducedMotion();
  const hydrated = useHydrated();

  useEffect(() => {
    if (prefersReducedMotion || !hydrated) return;

    scheduleLayoutStable();
    const timer = window.setTimeout(scheduleLayoutStable, 500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [hydrated, prefersReducedMotion]);

  return (
    <>
      <div className="container-wide mb-4 md:mb-6 text-left">
        <Reveal>
          <h2
            className={`${tiltWarp.className} text-4xl leading-tight tracking-tight md:text-5xl lg:text-6xl`}
          >
            <span className="block">{workHighlightsSection.titleLine1}</span>
            <span className="block">{workHighlightsSection.titleLine2}</span>
          </h2>
        </Reveal>
      </div>

      {prefersReducedMotion || !hydrated ? (
        <WorkHighlightsStaticTrack />
      ) : (
        <WorkHighlightsMarquee />
      )}
    </>
  );
}
