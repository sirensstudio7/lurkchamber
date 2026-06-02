export const LAYOUT_STABLE_EVENT = "app:layout-stable";

let timer: number | undefined;

/** Debounced signal that layout above fold has settled (images, hydration, etc.). */
export function scheduleLayoutStable() {
  if (timer !== undefined) {
    window.clearTimeout(timer);
  }

  timer = window.setTimeout(() => {
    timer = undefined;
    window.dispatchEvent(new Event(LAYOUT_STABLE_EVENT));
  }, 250);
}

export function onLayoutStable(callback: () => void) {
  window.addEventListener(LAYOUT_STABLE_EVENT, callback);
  return () => window.removeEventListener(LAYOUT_STABLE_EVENT, callback);
}
