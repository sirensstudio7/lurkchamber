"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ClientReviewCard } from "@/components/ui/ClientReviewCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabelChip } from "@/components/ui/SectionLabelChip";
import { caseStudies, caseStudiesSection } from "@/lib/content";
import { tiltWarp } from "@/lib/fonts";
import "./client-reviews.css";

const MOBILE_MEDIA = "(max-width: 767px)";
const MOBILE_DWELL_MS = 5000;
const SCROLL_SETTLE_MS = 650;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(MOBILE_MEDIA).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MEDIA);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isMobile;
}

function scrollCardToCenter(track: HTMLElement, card: HTMLElement) {
  const target =
    card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
  const maxScroll = track.scrollWidth - track.clientWidth;

  track.scrollTo({
    left: Math.max(0, Math.min(target, maxScroll)),
    behavior: "smooth",
  });
}

function wait(ms: number, signal: { cancelled: boolean }) {
  return new Promise<void>((resolve) => {
    const id = window.setTimeout(() => {
      if (!signal.cancelled) resolve();
    }, ms);
    signal.timeouts.push(id);
  });
}

function waitForScrollEnd(track: HTMLElement, signal: { cancelled: boolean }) {
  return new Promise<void>((resolve) => {
    let settled = false;
    const done = () => {
      if (settled || signal.cancelled) return;
      settled = true;
      track.removeEventListener("scrollend", done);
      resolve();
    };
    track.addEventListener("scrollend", done, { once: true });
    const id = window.setTimeout(done, SCROLL_SETTLE_MS);
    signal.timeouts.push(id);
  });
}

function ClientReviewsMobileCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const signal = { cancelled: false, timeouts: [] as number[] };

    const getCards = () =>
      Array.from(track.querySelectorAll<HTMLElement>(".client-review-card"));

    const goTo = async (index: number) => {
      const cards = getCards();
      const card = cards[index];
      if (!card) return;
      scrollCardToCenter(track, card);
      await waitForScrollEnd(track, signal);
    };

    const onPointerDown = () => {
      pausedRef.current = true;
    };
    const onPointerUp = () => {
      window.setTimeout(() => {
        pausedRef.current = false;
      }, MOBILE_DWELL_MS);
    };

    track.addEventListener("pointerdown", onPointerDown, { passive: true });
    track.addEventListener("pointerup", onPointerUp, { passive: true });
    track.addEventListener("pointercancel", onPointerUp, { passive: true });

    (async () => {
      await wait(200, signal);
      let index = 0;
      const count = getCards().length;
      if (!count) return;

      while (!signal.cancelled) {
        await goTo(index);
        if (signal.cancelled) break;

        const dwellStart = Date.now();
        while (Date.now() - dwellStart < MOBILE_DWELL_MS) {
          if (signal.cancelled) return;
          if (pausedRef.current) {
            await wait(250, signal);
            continue;
          }
          await wait(250, signal);
        }

        index = (index + 1) % count;
      }
    })();

    return () => {
      signal.cancelled = true;
      signal.timeouts.forEach((id) => window.clearTimeout(id));
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointerup", onPointerUp);
      track.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      className="client-reviews-carousel__track client-reviews-carousel__track--center"
      aria-label="Client stories"
    >
      {caseStudies.map((study) => (
        <ClientReviewCard key={study.title} {...study} />
      ))}
    </div>
  );
}

function ClientReviewsDesktopRow() {
  return (
    <div
      className="client-reviews-desktop flex flex-nowrap gap-4"
      aria-label="Client stories"
    >
      {caseStudies.map((study) => (
        <ClientReviewCard key={study.title} {...study} />
      ))}
    </div>
  );
}

export function ClientReviewsShowcase() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <>
      <div className="container-wide">
        <Reveal>
          <div className="mb-10 md:mb-12">
            <div className="max-w-3xl">
              <SectionLabelChip className="mb-4">
                {caseStudiesSection.label}
              </SectionLabelChip>
              <h2
                className={`${tiltWarp.className} text-4xl leading-tight tracking-tight md:text-5xl lg:text-6xl`}
              >
                {caseStudiesSection.title}
              </h2>
              <p className="mt-1.5 max-w-2xl text-base leading-relaxed text-muted md:mt-2">
                {caseStudiesSection.intro}
              </p>
            </div>
          </div>
        </Reveal>

        {!isMobile ? <ClientReviewsDesktopRow /> : null}
      </div>

      {isMobile ? (
        prefersReducedMotion ? (
          <div
            className="client-reviews-carousel__track client-reviews-carousel__track--center"
            aria-label="Client stories"
          >
            {caseStudies.map((study) => (
              <ClientReviewCard key={study.title} {...study} />
            ))}
          </div>
        ) : (
          <ClientReviewsMobileCarousel />
        )
      ) : null}
    </>
  );
}
