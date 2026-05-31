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

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  ignoreMobileResize: true,
});

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setLenisInstance(null);
      const onScroll = () => {
        setAppScrollY(window.scrollY);
        emitAppScroll();
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => {
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
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.defaults({ scroller: document.documentElement });

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    setAppScrollY(lenis.scroll);
    ScrollTrigger.refresh();
    emitAppScroll();

    return () => {
      gsap.ticker.remove(ticker);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      ScrollTrigger.defaults({ scroller: window });
      setLenisInstance(null);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
