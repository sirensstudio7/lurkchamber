"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ClientReviewCard } from "@/components/ui/ClientReviewCard";
import { Reveal } from "@/components/ui/Reveal";
import { caseStudies, caseStudiesSection } from "@/lib/content";
import { tiltWarp } from "@/lib/fonts";
import "./client-reviews.css";

function NavArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d={direction === "left" ? "M10 4 6 8l4 4" : "M6 4l4 4-4 4"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ClientReviewsShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScrollPrev(track.scrollLeft > 8);
    setCanScrollNext(track.scrollLeft < maxScroll - 8);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCard = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>(".client-review-card");
    const gap = 16;
    const distance = (card?.offsetWidth ?? 340) + gap;

    track.scrollBy({
      left: direction * distance,
      behavior: "smooth",
    });
  };

  return (
    <div className="container-wide">
      <Reveal>
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted">
              {caseStudiesSection.label}
            </p>
            <h2
              className={`${tiltWarp.className} text-4xl leading-tight tracking-tight md:text-5xl lg:text-6xl`}
            >
              {caseStudiesSection.title}
            </h2>
          </div>

          <div className="client-reviews-carousel__nav shrink-0">
            <button
              type="button"
              className="client-reviews-carousel__button"
              aria-label="Previous story"
              disabled={!canScrollPrev}
              onClick={() => scrollByCard(-1)}
            >
              <NavArrowIcon direction="left" />
            </button>
            <button
              type="button"
              className="client-reviews-carousel__button"
              aria-label="Next story"
              disabled={!canScrollNext}
              onClick={() => scrollByCard(1)}
            >
              <NavArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </Reveal>

      <div
        ref={trackRef}
        className="client-reviews-carousel__track -mx-[clamp(1.25rem,4vw,3rem)] px-[clamp(1.25rem,4vw,3rem)]"
        aria-label="Client stories"
      >
        {caseStudies.map((study) => (
          <ClientReviewCard key={study.title} {...study} />
        ))}
      </div>
    </div>
  );
}
