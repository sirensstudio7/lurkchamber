"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { brand } from "@/lib/content";

const MODEL_VIEWER_SCRIPT =
  "https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js";

const MODEL_PATH = "/models/retro_computer_setup.compressed.glb";
const MODEL_FALLBACK = "/models/retro_computer_setup.glb";

/** 30% closer than 88% orbit (~68% radius) */
const CAMERA_ORBIT = "0deg 72deg 68%";
const MIN_CAMERA_ORBIT = "auto 72deg 68%";
const MAX_CAMERA_ORBIT = "auto 72deg 68%";
const CAMERA_PHI = "72deg";
const CAMERA_RADIUS = "68%";
/** ~3.6°/s at 60fps, counter-clockwise */
const ROTATION_SPEED = 0.06;

type ModelViewerElement = HTMLElement & {
  loaded?: boolean;
  getCameraOrbit(): { theta: number; phi: number; radius: number };
  cameraOrbit: string;
};

export function DeviceMockup() {
  const [mounted, setMounted] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [modelSrc, setModelSrc] = useState(MODEL_PATH);
  const [loadError, setLoadError] = useState(false);
  const viewerRef = useRef<ModelViewerElement>(null);

  useEffect(() => {
    setMounted(true);
    if (customElements.get("model-viewer")) {
      setScriptReady(true);
    }
  }, []);

  const handleModelError = useCallback(() => {
    if (modelSrc === MODEL_PATH) {
      setModelSrc(MODEL_FALLBACK);
      setLoadError(false);
      return;
    }
    setLoadError(true);
  }, [modelSrc]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    viewer.addEventListener("error", handleModelError);
    return () => viewer.removeEventListener("error", handleModelError);
  }, [handleModelError, modelSrc, scriptReady]);

  const showViewer = mounted && scriptReady && !loadError;

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !showViewer) return;

    let raf = 0;
    let thetaDeg = 0;
    let userInteracting = false;

    const syncThetaFromViewer = () => {
      if (!viewer.loaded) return;
      try {
        const orbit = viewer.getCameraOrbit();
        thetaDeg = (orbit.theta * 180) / Math.PI;
      } catch {
        // Model not ready yet
      }
    };

    const applyOrbit = () => {
      viewer.cameraOrbit = `${thetaDeg}deg ${CAMERA_PHI} ${CAMERA_RADIUS}`;
    };

    const onPointerDown = () => {
      userInteracting = true;
    };

    const onPointerUp = () => {
      userInteracting = false;
      syncThetaFromViewer();
    };

    const onLoad = () => syncThetaFromViewer();

    const tick = () => {
      if (viewer.loaded && !userInteracting) {
        thetaDeg = (thetaDeg - ROTATION_SPEED + 360) % 360;
        applyOrbit();
      }
      raf = requestAnimationFrame(tick);
    };

    viewer.addEventListener("pointerdown", onPointerDown);
    viewer.addEventListener("pointerup", onPointerUp);
    viewer.addEventListener("pointercancel", onPointerUp);
    viewer.addEventListener("load", onLoad);

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      viewer.removeEventListener("pointerdown", onPointerDown);
      viewer.removeEventListener("pointerup", onPointerUp);
      viewer.removeEventListener("pointercancel", onPointerUp);
      viewer.removeEventListener("load", onLoad);
    };
  }, [showViewer, modelSrc]);

  return (
    <>
      <Script
        id="model-viewer-script"
        type="module"
        src={MODEL_VIEWER_SCRIPT}
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
        onLoad={() => setScriptReady(true)}
      />

      <div
        className="relative z-10 -mt-2 min-h-[300px] w-full overflow-visible md:-mt-12 md:min-h-0"
        aria-label="Retro computer 3D model"
      >
        {showViewer ? (
          <model-viewer
            ref={viewerRef}
            key={modelSrc}
            src={modelSrc}
            alt="Retro computer setup"
            camera-controls
            disable-zoom
            disable-pan
            overflow-visible
            reveal="auto"
            shadow-intensity="1"
            exposure="1.25"
            loading="eager"
            interaction-prompt="none"
            camera-orbit={CAMERA_ORBIT}
            min-camera-orbit={MIN_CAMERA_ORBIT}
            max-camera-orbit={MAX_CAMERA_ORBIT}
            className="block h-[min(38dvh,340px)] min-h-[300px] w-full sm:h-[320px] md:h-[440px] md:min-h-0"
            style={{
              background: "transparent",
              overflow: "visible",
              ["--poster-color" as string]: brand.heroBg,
            }}
          >
            <div slot="progress-bar" className="hidden" aria-hidden />
          </model-viewer>
        ) : loadError ? (
          <div
            className="flex h-full w-full items-center justify-center"
            role="status"
          >
            <p className="text-sm text-[#FCCC24]/70">3D model failed to load</p>
          </div>
        ) : (
          <div className="h-full w-full" aria-hidden />
        )}
      </div>
    </>
  );
}
