import { refreshScrollTriggersPreservingScroll } from "@/lib/scroll-trigger-refresh";

const RESIZE_DEBOUNCE_MS = 200;

/**
 * Mobile browsers fire `resize` when the URL bar shows/hides (height-only).
 * ScrollTrigger.refresh() on those events jumps pinned sections back to the top.
 */
export function onLayoutWidthChange(callback: () => void): () => void {
  let lastWidth = window.innerWidth;
  let timer: number | undefined;

  const run = () => {
    const width = window.innerWidth;
    if (width === lastWidth) return;
    lastWidth = width;
    callback();
  };

  const schedule = () => {
    if (timer !== undefined) window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      timer = undefined;
      run();
    }, RESIZE_DEBOUNCE_MS);
  };

  const onOrientationChange = () => {
    lastWidth = -1;
    schedule();
  };

  window.addEventListener("resize", schedule, { passive: true });
  window.addEventListener("orientationchange", onOrientationChange);

  return () => {
    if (timer !== undefined) window.clearTimeout(timer);
    window.removeEventListener("resize", schedule);
    window.removeEventListener("orientationchange", onOrientationChange);
  };
}

export { refreshScrollTriggersPreservingScroll } from "@/lib/scroll-trigger-refresh";
