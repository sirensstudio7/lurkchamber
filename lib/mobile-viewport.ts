import { ScrollTrigger } from "gsap/ScrollTrigger";

export const MOBILE_VIEWPORT_MEDIA = "(max-width: 767px)";

export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_VIEWPORT_MEDIA).matches;
}

/** Stop ScrollTrigger from recalculating on URL-bar height changes (iOS/Android). */
export function configureScrollTriggerForViewport(): void {
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: isMobileViewport()
      ? "visibilitychange,DOMContentLoaded,load"
      : "visibilitychange,DOMContentLoaded,load,resize",
  });
}

/** Avoid the browser restoring scroll in a way that looks like a sudden refresh. */
export function preventAggressiveScrollRestoration(): void {
  if (!isMobileViewport() || !("scrollRestoration" in history)) return;
  history.scrollRestoration = "manual";
}
