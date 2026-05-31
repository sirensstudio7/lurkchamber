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
const MOBILE_MEDIA = "(max-width: 767px)";
/** Zoomed out on small screens so the desk/shadow isn’t clipped by the canvas */
const MOBILE_CAMERA_ORBIT = "0deg 72deg 92%";
const MOBILE_MIN_CAMERA_ORBIT = "auto 72deg 92%";
const MOBILE_MAX_CAMERA_ORBIT = "auto 72deg 92%";
const MOBILE_CAMERA_RADIUS = "92%";
const MOBILE_CAMERA_TARGET = "0m 0.08m 0m";
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
  const [isMobile, setIsMobile] = useState(false);
  const [modelSrc, setModelSrc] = useState(MODEL_PATH);
  const [loadError, setLoadError] = useState(false);
  const viewerRef = useRef<ModelViewerElement>(null);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MEDIA);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

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

    const radius = isMobile ? MOBILE_CAMERA_RADIUS : CAMERA_RADIUS;

    const applyOrbit = () => {
      viewer.cameraOrbit = `${thetaDeg}deg ${CAMERA_PHI} ${radius}`;
    };

    const onLoad = () => syncThetaFromViewer();

    const tick = () => {
      if (viewer.loaded && !userInteracting) {
        thetaDeg = (thetaDeg - ROTATION_SPEED + 360) % 360;
        applyOrbit();
      }
      raf = requestAnimationFrame(tick);
    };

    const onPointerDown = () => {
      userInteracting = true;
    };

    const onPointerUp = () => {
      userInteracting = false;
      syncThetaFromViewer();
    };

    viewer.addEventListener("load", onLoad);

    if (!isMobile) {
      viewer.addEventListener("pointerdown", onPointerDown);
      viewer.addEventListener("pointerup", onPointerUp);
      viewer.addEventListener("pointercancel", onPointerUp);
    }

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      viewer.removeEventListener("load", onLoad);
      if (!isMobile) {
        viewer.removeEventListener("pointerdown", onPointerDown);
        viewer.removeEventListener("pointerup", onPointerUp);
        viewer.removeEventListener("pointercancel", onPointerUp);
      }
    };
  }, [showViewer, modelSrc, isMobile]);

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
        className="relative z-10 -mt-2 min-h-[340px] w-full overflow-visible pb-2 md:-mt-12 md:min-h-0 md:pb-0"
        aria-label="Retro computer 3D model"
      >
        {showViewer ? (
          <model-viewer
            ref={viewerRef}
            key={`${modelSrc}-${isMobile ? "m" : "d"}`}
            src={modelSrc}
            alt="Retro computer setup"
            {...(isMobile
              ? { "touch-action": "pan-y" as const }
              : { "camera-controls": true })}
            disable-zoom
            disable-pan
            overflow-visible
            reveal="auto"
            shadow-intensity="1"
            exposure="1.25"
            loading="eager"
            interaction-prompt="none"
            camera-orbit={isMobile ? MOBILE_CAMERA_ORBIT : CAMERA_ORBIT}
            {...(isMobile ? { "camera-target": MOBILE_CAMERA_TARGET } : {})}
            min-camera-orbit={
              isMobile ? MOBILE_MIN_CAMERA_ORBIT : MIN_CAMERA_ORBIT
            }
            max-camera-orbit={
              isMobile ? MOBILE_MAX_CAMERA_ORBIT : MAX_CAMERA_ORBIT
            }
            className="block h-[min(50dvh,400px)] min-h-[340px] w-full sm:h-[360px] md:h-[440px] md:min-h-0"
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
