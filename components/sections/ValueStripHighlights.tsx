"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { workHighlights, workHighlightsSection } from "@/lib/content";
import { WorkHighlightFrame } from "@/components/sections/WorkHighlightFrame";
import { Reveal } from "@/components/ui/Reveal";
import { useHydrated } from "@/lib/use-hydrated";
import { scheduleLayoutStable } from "@/lib/layout-stable";
import { tiltWarp } from "@/lib/fonts";
import "./work-highlights-slider.css";

const DWELL_MS = 5000;
const TRANSITION_MS = 800;
const EMPHASIS_MS = 700;
const SLIDE_COUNT = workHighlights.length;
const EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

type LoopSignal = {
  cancelled: boolean;
  timeouts: number[];
  rafIds: number[];
};

function wait(ms: number, signal: LoopSignal) {
  return new Promise<void>((resolve) => {
    const id = window.setTimeout(() => {
      if (!signal.cancelled) resolve();
    }, ms);
    signal.timeouts.push(id);
  });
}

function waitTransition(track: HTMLElement, signal: LoopSignal) {
  return new Promise<void>((resolve) => {
    let settled = false;
    const done = () => {
      if (settled || signal.cancelled) return;
      settled = true;
      track.removeEventListener("transitionend", done);
      resolve();
    };
    track.addEventListener("transitionend", done, { once: true });
    const id = window.setTimeout(done, TRANSITION_MS + 50);
    signal.timeouts.push(id);
  });
}

function waitFrame() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

function followVisualCenter(
  slide: () => HTMLElement | undefined,
  getTranslate: () => number,
  applyTranslate: (px: number) => void,
  signal: LoopSignal,
  durationMs: number,
) {
  return new Promise<void>((resolve) => {
    const start = performance.now();

    const settle = () => {
      const el = slide();
      if (!el) return;

      const viewportCenter = window.innerWidth / 2;
      const frame = el.querySelector<HTMLElement>(".work-highlight-frame");
      const rect = (frame ?? el).getBoundingClientRect();
      const visualCenter = rect.left + rect.width / 2;
      applyTranslate(getTranslate() + (viewportCenter - visualCenter));
    };

    const tick = (now: number) => {
      if (signal.cancelled) {
        resolve();
        return;
      }

      settle();

      if (now - start < durationMs) {
        const id = requestAnimationFrame(tick);
        signal.rafIds.push(id);
        return;
      }

      resolve();
    };

    const id = requestAnimationFrame(tick);
    signal.rafIds.push(id);
    const timeoutId = window.setTimeout(resolve, durationMs + 80);
    signal.timeouts.push(timeoutId);
  });
}

function WorkHighlightsMarquee() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(-1);
  const [activeIndex, setActiveIndex] = useState(-1);
  const items = [...workHighlights, ...workHighlights];

  const setActive = (index: number) => {
    activeIndexRef.current = index;
    setActiveIndex(index);
  };

  useEffect(() => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track) return;

    const signal: LoopSignal = { cancelled: false, timeouts: [], rafIds: [] };
    const pausedRef = { current: false };
    let translate = 0;
    let logicalIndex = 0;

    const getSlides = () =>
      Array.from(
        track.querySelectorAll<HTMLElement>(".work-highlights-slider__slide"),
      );

    const setTransition = (enabled: boolean) => {
      track.style.transition = enabled
        ? `transform ${TRANSITION_MS}ms ${EASING}`
        : "none";
    };

    const applyTranslate = (px: number) => {
      translate = px;
      track.style.transform = `translate3d(${px}px, 0, 0)`;
    };

    const getSlideVisualCenter = (slide: HTMLElement) => {
      const frame = slide.querySelector<HTMLElement>(".work-highlight-frame");
      const target = frame ?? slide;
      const rect = target.getBoundingClientRect();
      return rect.left + rect.width / 2;
    };

    const getTargetTranslate = (index: number) => {
      const slides = getSlides();
      const slide = slides[index];
      if (!slide) return translate;

      const viewportCenter = window.innerWidth / 2;
      const visualCenter = getSlideVisualCenter(slide);

      return translate + (viewportCenter - visualCenter);
    };

    const setActiveDom = (index: number) => {
      getSlides().forEach((slide, i) => {
        slide.classList.toggle("is-active", i === index);
      });
      setActive(index);
    };

    const animateTo = async (physicalIndex: number) => {
      const target = getTargetTranslate(physicalIndex);
      setTransition(true);
      await waitFrame();
      applyTranslate(target);
      await waitTransition(track, signal);
    };

    const pauseDwell = async () => {
      const dwellStart = Date.now();
      while (Date.now() - dwellStart < DWELL_MS) {
        if (signal.cancelled) return;
        if (pausedRef.current) {
          await wait(250, signal);
          continue;
        }
        await wait(250, signal);
      }
    };

    const dwellOn = async (physicalIndex: number) => {
      setTransition(false);
      setActiveDom(physicalIndex);
      await waitFrame();
      await followVisualCenter(
        () => getSlides()[physicalIndex],
        () => translate,
        applyTranslate,
        signal,
        EMPHASIS_MS,
      );
      if (signal.cancelled) return;

      await pauseDwell();
      if (signal.cancelled) return;

      const activeSlide = getSlides()[physicalIndex];
      setActiveDom(-1);
      await waitFrame();
      await followVisualCenter(
        () => activeSlide,
        () => translate,
        applyTranslate,
        signal,
        EMPHASIS_MS,
      );
    };

    const onPointerEnter = () => {
      pausedRef.current = true;
    };
    const onPointerLeave = () => {
      pausedRef.current = false;
    };

    wrapper?.addEventListener("pointerenter", onPointerEnter);
    wrapper?.addEventListener("pointerleave", onPointerLeave);

    const onResize = () => {
      const active = activeIndexRef.current;
      const physicalIndex =
        active >= 0
          ? active
          : logicalIndex === 0 && activeIndexRef.current === SLIDE_COUNT
            ? SLIDE_COUNT
            : logicalIndex;
      setTransition(false);
      if (active >= 0) {
        const slide = getSlides()[active];
        if (slide) {
          const viewportCenter = window.innerWidth / 2;
          const visualCenter = getSlideVisualCenter(slide);
          applyTranslate(translate + (viewportCenter - visualCenter));
          return;
        }
      }
      applyTranslate(getTargetTranslate(physicalIndex));
    };

    window.addEventListener("resize", onResize);

    (async () => {
      await wait(200, signal);
      await waitFrame();

      setTransition(false);
      applyTranslate(getTargetTranslate(0));

      while (!signal.cancelled) {
        await dwellOn(logicalIndex);
        if (signal.cancelled) break;

        logicalIndex = (logicalIndex + 1) % SLIDE_COUNT;

        if (logicalIndex === 0) {
          await animateTo(SLIDE_COUNT);
          if (signal.cancelled) break;

          setTransition(false);
          applyTranslate(getTargetTranslate(0));
          await waitFrame();
        } else {
          await animateTo(logicalIndex);
        }
      }
    })();

    return () => {
      signal.cancelled = true;
      signal.timeouts.forEach((id) => window.clearTimeout(id));
      signal.rafIds.forEach((id) => cancelAnimationFrame(id));
      wrapper?.removeEventListener("pointerenter", onPointerEnter);
      wrapper?.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="work-highlights-slider work-highlights-slider--marquee"
    >
      <div ref={trackRef} className="work-highlights-slider__marquee-track" aria-hidden>
        {items.map((item, index) => (
          <div
            key={`${item.imageSrc}-${index}`}
            className={`work-highlights-slider__slide${index === activeIndex ? " is-active" : ""}`}
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
      <div className="container-wide mb-12 md:mb-16 text-center">
        <Reveal>
          <h2
            className={`${tiltWarp.className} text-4xl leading-tight tracking-tight md:text-5xl lg:text-6xl`}
          >
            {workHighlightsSection.title}
          </h2>
          <p className="mx-auto mt-1.5 max-w-2xl text-[18px] leading-relaxed text-muted md:mt-2">
            {workHighlightsSection.intro}
          </p>
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
