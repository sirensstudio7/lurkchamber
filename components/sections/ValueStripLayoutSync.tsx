"use client";

import { useEffect } from "react";
import { scheduleLayoutStable } from "@/lib/layout-stable";

export function ValueStripLayoutSync() {
  useEffect(() => {
    scheduleLayoutStable();
    const timer = window.setTimeout(scheduleLayoutStable, 600);
    window.addEventListener("load", scheduleLayoutStable);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", scheduleLayoutStable);
    };
  }, []);

  return null;
}
