import { useEffect, useState } from "react";

/** True only after the client has mounted — use before any window/matchMedia branching in render. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
