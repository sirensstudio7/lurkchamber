"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import {
  emitAppScroll,
  setAppScrollY,
  setLenisInstance,
} from "@/lib/lenis-scroll";
import {
  configureScrollTriggerForViewport,
  MOBILE_VIEWPORT_MEDIA,
  preventAggressiveScrollRestoration,
} from "@/lib/mobile-viewport";
import {
  refreshScrollTriggersPreservingScroll,
  updateScrollTriggers,
} from "@/lib/scroll-trigger-refresh";
import { isMobileViewport } from "@/lib/mobile-viewport";

gsap.registerPlugin(ScrollTrigger);

function getScrollerViewportRect() {
  const viewport = window.visualViewport;
  return {
    top: 0,
    left: 0,
    width: viewport?.width ?? window.innerWidth,
    height: viewport?.height ?? window.innerHeight,
  };
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    configureScrollTriggerForViewport();
    preventAggressiveScrollRestoration();

    const mobileMq = window.matchMedia(MOBILE_VIEWPORT_MEDIA);
    const onViewportModeChange = () => {
      configureScrollTriggerForViewport();
      preventAggressiveScrollRestoration();
    };
    mobileMq.addEventListener("change", onViewportModeChange);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setLenisInstance(null);
      const onScroll = () => {
        setAppScrollY(window.scrollY);
        ScrollTrigger.update();
        emitAppScroll();
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => {
        mobileMq.removeEventListener("change", onViewportModeChange);
        window.removeEventListener("scroll", onScroll);
        setLenisInstance(null);
      };
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      allowNestedScroll: true,
    });
    setLenisInstance(lenis);

    lenis.on("scroll", (instance) => {
      setAppScrollY(instance.scroll);
      ScrollTrigger.update();
      emitAppScroll();
    });

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect: getScrollerViewportRect,
    });

    ScrollTrigger.defaults({ scroller: document.documentElement });

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    setAppScrollY(lenis.scroll);
    refreshScrollTriggersPreservingScroll({ required: true });
    emitAppScroll();

    const visualViewport = window.visualViewport;
    const onVisualViewportChange = () => {
      if (!isMobileViewport()) return;
      updateScrollTriggers();
    };
    visualViewport?.addEventListener("resize", onVisualViewportChange);
    visualViewport?.addEventListener("scroll", onVisualViewportChange);

    return () => {
      visualViewport?.removeEventListener("resize", onVisualViewportChange);
      visualViewport?.removeEventListener("scroll", onVisualViewportChange);
      mobileMq.removeEventListener("change", onViewportModeChange);
      gsap.ticker.remove(ticker);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      ScrollTrigger.defaults({ scroller: window });
      setLenisInstance(null);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
