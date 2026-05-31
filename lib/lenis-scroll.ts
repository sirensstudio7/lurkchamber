import type Lenis from "lenis";
import { isMobileViewport } from "@/lib/mobile-viewport";

type ScrollListener = () => void;

const listeners = new Set<ScrollListener>();

/** Matches `.anchor-offset { scroll-margin-top: 7rem }` in globals.css */
const SECTION_SCROLL_OFFSET = -112;

let appScrollY = 0;
let lenisInstance: Lenis | null = null;

export function setAppScrollY(y: number): void {
  appScrollY = y;
}

export function getAppScrollY(): number {
  return appScrollY;
}

/** Subscribe to Lenis / native scroll updates. */
export function onAppScroll(listener: ScrollListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function emitAppScroll(): void {
  listeners.forEach((listener) => listener());
}

export function setLenisInstance(instance: Lenis | null): void {
  lenisInstance = instance;
}

export function getLenisInstance(): Lenis | null {
  return lenisInstance;
}

/** Smooth scroll to an in-page section (`#features`, etc.). */
export function scrollToHash(hash: string): void {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) return;

  const target = document.getElementById(id);
  if (!target) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: SECTION_SCROLL_OFFSET,
      duration: 1.2,
      programmatic: true,
    });
    return;
  }

  const top =
    target.getBoundingClientRect().top +
    window.scrollY +
    SECTION_SCROLL_OFFSET;

  // Smooth programmatic scroll on iOS often fights the URL bar and jumps the page.
  window.scrollTo({
    top: Math.max(0, top),
    behavior: isMobileViewport() ? "auto" : "smooth",
  });
  setAppScrollY(Math.max(0, top));
  emitAppScroll();
}
