import { useEffect, useLayoutEffect, useRef, useState } from "react";

type UseNearViewportOptions = {
  rootMargin?: string;
  threshold?: number;
};

function parseRootMargin(margin: string) {
  const parts = margin.trim().split(/\s+/).map((part) => parseFloat(part) || 0);
  if (parts.length === 1) {
    return { top: parts[0], right: parts[0], bottom: parts[0], left: parts[0] };
  }
  if (parts.length === 2) {
    return { top: parts[0], right: parts[1], bottom: parts[0], left: parts[1] };
  }
  return {
    top: parts[0] ?? 0,
    right: parts[1] ?? 0,
    bottom: parts[2] ?? 0,
    left: parts[3] ?? 0,
  };
}

function isElementNearViewport(el: HTMLElement, rootMargin: string) {
  const rect = el.getBoundingClientRect();
  const margin = parseRootMargin(rootMargin);
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  return (
    rect.bottom >= -margin.bottom &&
    rect.top <= vh + margin.top &&
    rect.right >= -margin.left &&
    rect.left <= vw + margin.right
  );
}

/**
 * True while the element is on-screen (with margin). Use to defer WebGL model-viewer mounts.
 */
export function useNearViewport({
  rootMargin = "120px",
  threshold = 0,
}: UseNearViewportOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setNear(isElementNearViewport(el, rootMargin));
  }, [rootMargin]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { root: null, rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return { ref, near };
}
