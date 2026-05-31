"use client";

import { whenModelViewerReady } from "@/lib/model-viewer-meshopt";
import Script from "next/script";
import { useEffect, useState } from "react";

export const MODEL_VIEWER_SCRIPT_URL =
  "https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js";

const listeners = new Set<() => void>();
let readyPromise: Promise<void> | null = null;

function ensureModelViewerReady() {
  if (!readyPromise) {
    readyPromise = whenModelViewerReady();
  }
  return readyPromise;
}

export function notifyModelViewerReady() {
  void ensureModelViewerReady().then(() => {
    if (customElements.get("model-viewer")) {
      listeners.forEach((listener) => listener());
    }
  });
}

export function subscribeModelViewerReady(listener: () => void) {
  listeners.add(listener);
  void ensureModelViewerReady().then(() => {
    if (customElements.get("model-viewer")) {
      listener();
    }
  });
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Load model-viewer only after mount so server and client both render null (no hydration mismatch).
 */
export function ModelViewerScript() {
  const [loadScript, setLoadScript] = useState(false);

  useEffect(() => {
    setLoadScript(true);
    if (customElements.get("model-viewer")) {
      notifyModelViewerReady();
    }
  }, []);

  if (!loadScript) return null;

  return (
    <Script
      id="model-viewer-script"
      type="module"
      src={MODEL_VIEWER_SCRIPT_URL}
      strategy="afterInteractive"
      onLoad={notifyModelViewerReady}
    />
  );
}
