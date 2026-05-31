"use client";

import { subscribeModelViewerReady } from "@/components/ui/ModelViewerScript";
import { useEffect, useRef, useState } from "react";
import "./faq-question-block.css";

const MODEL_PATH = "/models/mario_question_block.glb";
const CAMERA_ORBIT = "0deg 90deg 172%";
const MIN_CAMERA_ORBIT = "auto 90deg 172%";
const MAX_CAMERA_ORBIT = "auto 90deg 172%";
const CAMERA_PHI = "90deg";
const CAMERA_RADIUS = "172%";
const FIELD_OF_VIEW = "45deg";
const ROTATION_SPEED = 0.06;

type ModelViewerElement = HTMLElement & {
  loaded?: boolean;
  getCameraOrbit(): { theta: number; phi: number; radius: number };
  cameraOrbit: string;
};

/** Match FAQ two-column layout (`lg:`) */
const DESKTOP_MEDIA = "(min-width: 1024px)";

export function FaqQuestionBlockModel() {
  const [hydrated, setHydrated] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const viewerRef = useRef<ModelViewerElement>(null);

  useEffect(() => {
    setHydrated(true);
    const mq = window.matchMedia(DESKTOP_MEDIA);
    const sync = () => setShowModel(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!showModel) return;
    setMounted(true);
    return subscribeModelViewerReady(() => setScriptReady(true));
  }, [showModel]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const handleError = () => setLoadError(true);
    viewer.addEventListener("error", handleError);
    return () => viewer.removeEventListener("error", handleError);
  }, [scriptReady]);

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
  }, [showViewer]);

  if (!hydrated || !showModel) return null;

  return (
    <div className="faq-question-block" aria-hidden={loadError}>
      <div className="faq-question-block__stage">
          {showViewer ? (
            <model-viewer
              ref={viewerRef}
              key={MODEL_PATH}
              src={MODEL_PATH}
              alt=""
              camera-controls
              disable-zoom
              disable-pan
              overflow-visible
              reveal="auto"
              shadow-intensity="0.65"
              exposure="1.1"
              loading="lazy"
              interaction-prompt="none"
              camera-orbit={CAMERA_ORBIT}
              camera-target="0m 0.12m 0m"
              min-camera-orbit={MIN_CAMERA_ORBIT}
              max-camera-orbit={MAX_CAMERA_ORBIT}
              field-of-view={FIELD_OF_VIEW}
              className="faq-question-block__viewer block h-full w-full"
              style={{ background: "transparent", overflow: "visible" }}
            >
              <div slot="progress-bar" className="hidden" aria-hidden />
            </model-viewer>
          ) : loadError ? null : (
            <div className="faq-question-block__viewer" aria-hidden />
          )}
      </div>
    </div>
  );
}
