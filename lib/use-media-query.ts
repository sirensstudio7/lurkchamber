import { useEffect, useState } from "react";

export function useMinWidth(minWidthPx: number) {
  const query = `(min-width: ${minWidthPx}px)`;

  // Start false so SSR and first paint match; sync after mount avoids hydration errors.
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);

  return matches;
}
