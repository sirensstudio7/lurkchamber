import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAppScrollY, getLenisInstance, setAppScrollY } from "@/lib/lenis-scroll";
import { isMobileViewport } from "@/lib/mobile-viewport";

function readScrollY(): number {
  const lenis = getLenisInstance();
  if (lenis) return lenis.scroll;
  const tracked = getAppScrollY();
  if (Number.isFinite(tracked)) return tracked;
  return window.scrollY || document.documentElement.scrollTop;
}

function restoreScrollPosition(scrollY: number) {
  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(scrollY, { immediate: true });
    setAppScrollY(scrollY);
    return;
  }
  window.scrollTo(0, scrollY);
  setAppScrollY(scrollY);
}

/**
 * Recalculate ScrollTrigger layout without losing scroll.
 * On mobile, skip optional refreshes (URL-bar height churn); use `required: true`
 * after real layout changes (e.g. orientation / width).
 */
/** Recompute trigger positions without a full layout refresh (safe on URL-bar resize). */
export function updateScrollTriggers() {
  ScrollTrigger.update();
}

export function refreshScrollTriggersPreservingScroll(options?: {
  required?: boolean;
}) {
  if (isMobileViewport() && !options?.required) return;

  const scrollY = readScrollY();
  ScrollTrigger.refresh();
  restoreScrollPosition(scrollY);

  requestAnimationFrame(() => {
    restoreScrollPosition(scrollY);
    requestAnimationFrame(() => restoreScrollPosition(scrollY));
  });
}
