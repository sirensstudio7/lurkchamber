"use client";

import { subscribeModelViewerReady } from "@/components/ui/ModelViewerScript";
import { useNearViewport } from "@/lib/use-near-viewport";
import { useEffect, useMemo, useRef, useState } from "react";
import "./feature-card-model.css";

export type FeatureCardMotion =
  | "gaze"
  | "watch"
  | "inspect"
  | "scan"
  | "float"
  | "static";

type MotionProfile = {
  centerPhi: number;
  cameraRadius: string;
  maxSwingDeg: number;
  maxPhiSwing: number;
  fieldOfView: string;
  /** Scales how far each glance travels — lower = subtler motion */
  reach: number;
  /** Timing scale for glances — lower = faster, more alert motion */
  pace?: number;
  /** Camera orbit drift vs spinning the model on Y */
  mode: "camera" | "modelY" | "scan" | "float" | "static";
};

const MOTION_PROFILES: Record<FeatureCardMotion, MotionProfile> = {
  gaze: {
    centerPhi: 90,
    cameraRadius: "150%",
    maxSwingDeg: 20,
    maxPhiSwing: 6,
    fieldOfView: "32deg",
    reach: 1,
    mode: "camera",
  },
  watch: {
    centerPhi: 90,
    cameraRadius: "150%",
    maxSwingDeg: 22,
    maxPhiSwing: 7,
    fieldOfView: "32deg",
    reach: 1.15,
    pace: 0.42,
    mode: "camera",
  },
  inspect: {
    centerPhi: 90,
    cameraRadius: "135%",
    maxSwingDeg: 18,
    maxPhiSwing: 4,
    fieldOfView: "30deg",
    reach: 0.7,
    mode: "modelY",
  },
  scan: {
    centerPhi: 90,
    cameraRadius: "135%",
    maxSwingDeg: 16,
    maxPhiSwing: 7,
    fieldOfView: "30deg",
    reach: 1,
    mode: "scan",
  },
  float: {
    centerPhi: 90,
    cameraRadius: "150%",
    maxSwingDeg: 0,
    maxPhiSwing: 0,
    fieldOfView: "32deg",
    reach: 0,
    mode: "float",
  },
  static: {
    centerPhi: 90,
    cameraRadius: "135%",
    maxSwingDeg: 0,
    maxPhiSwing: 0,
    fieldOfView: "30deg",
    reach: 0,
    mode: "static",
  },
};

type FeatureCardModelProps = {
  className?: string;
  src: string;
  motion?: FeatureCardMotion;
  alt?: string;
  /** Euler correction in degrees — stands up models exported flat */
  baseOrientation?: readonly [number, number, number];
  /** Horizontal camera heading — 0 faces the model front-on */
  cameraTheta?: number;
  /** Pull camera back to shrink the model in frame — e.g. "170%" */
  cameraRadius?: string;
  /** Which axis the idle spin animates after baseOrientation is applied */
  spinAxis?: "y" | "z";
  /** Drag to orbit the model — disables idle animation */
  interactive?: boolean;
};

function formatOrientation(
  base: readonly [number, number, number],
  spinOffset = 0,
  spinAxis: "y" | "z" = "y",
) {
  const [x, y, z] = base;
  if (spinAxis === "z") {
    return `${x}deg ${y}deg ${z + spinOffset}deg`;
  }
  return `${x}deg ${y + spinOffset}deg ${z}deg`;
}

function formatAbsoluteOrientation(x: number, y: number, z: number) {
  return `${x.toFixed(2)}deg ${y.toFixed(2)}deg ${z.toFixed(2)}deg`;
}

const DRAG_ROTATION_SENSITIVITY = 0.5;

type DragAxisMode = "xy" | "z";

type ModelViewerElement = HTMLElement & {
  loaded?: boolean;
  cameraOrbit: string;
  orientation: string;
};

type GazePhase = "hold" | "move";

type GazePoint = {
  theta: number;
  phi: number;
};

type GazeState = {
  current: GazePoint;
  target: GazePoint;
  phase: GazePhase;
  phaseEnd: number;
  moveStart: number;
  moveStartPoint: GazePoint;
  moveDuration: number;
  initialized: boolean;
};

type YawState = {
  current: number;
  target: number;
  phase: GazePhase;
  phaseEnd: number;
  moveStart: number;
  moveStartValue: number;
  moveDuration: number;
  initialized: boolean;
};

function createGazeController(profile: MotionProfile) {
  const { centerPhi, maxSwingDeg, maxPhiSwing, reach } = profile;
  const pace = profile.pace ?? 1;

  const clampTheta = (theta: number) =>
    Math.max(-maxSwingDeg, Math.min(maxSwingDeg, theta));

  const clampPhi = (phi: number) =>
    Math.max(centerPhi - maxPhiSwing, Math.min(centerPhi + maxPhiSwing, phi));

  const pickMoveDuration = (from: GazePoint, to: GazePoint) => {
    const d = Math.hypot(to.theta - from.theta, to.phi - from.phi);
    if (d < 3) return (600 + Math.random() * 800) * pace;
    if (d < 12) return (320 + Math.random() * 480) * pace;
    return (180 + Math.random() * 260) * pace;
  };

  const pickHoldDuration = (point: GazePoint) => {
    const activity = Math.abs(point.theta) + Math.abs(point.phi - centerPhi);
    if (activity < 3) return (2400 + Math.random() * 4500) * pace;
    if (activity < 14) return (1200 + Math.random() * 2600) * pace;
    return (750 + Math.random() * 1400) * pace;
  };

  const pickNextTheta = (current: number) => {
    const roll = Math.random();

    if (roll < 0.4) {
      return clampTheta((Math.random() - 0.5) * 3.5 * reach);
    }

    if (roll < 0.74) {
      const side = Math.random() < 0.5 ? -1 : 1;
      if (Math.abs(current) > 8 * reach && Math.random() < 0.55) {
        return clampTheta((Math.random() - 0.5) * 2.5 * reach);
      }
      return clampTheta(side * (7 + Math.random() * 9) * reach);
    }

    if (roll < 0.9) {
      const side = Math.sign(current) || (Math.random() < 0.5 ? -1 : 1);
      return clampTheta(side * (15 + Math.random() * 8) * reach);
    }

    const firstSide = Math.random() < 0.5 ? -1 : 1;
    return clampTheta(firstSide * (10 + Math.random() * 6) * reach);
  };

  const pickNextPhi = (current: number) => {
    const roll = Math.random();
    const offset = current - centerPhi;

    if (roll < 0.42) {
      return clampPhi(centerPhi + (Math.random() - 0.5) * 2.5 * reach);
    }

    if (roll < 0.74) {
      const dir = Math.random() < 0.5 ? -1 : 1;
      if (Math.abs(offset) > 5 * reach && Math.random() < 0.5) {
        return clampPhi(centerPhi + (Math.random() - 0.5) * 2 * reach);
      }
      return clampPhi(centerPhi + dir * (2.5 + Math.random() * 5) * reach);
    }

    const dir = Math.sign(offset) || (Math.random() < 0.5 ? -1 : 1);
    return clampPhi(centerPhi + dir * (5 + Math.random() * 4.5) * reach);
  };

  const pickNextGaze = (current: GazePoint): GazePoint => {
    if (Math.random() < 0.32) {
      const hSide = Math.random() < 0.5 ? -1 : 1;
      const vDir = Math.random() < 0.5 ? -1 : 1;
      return {
        theta: clampTheta(hSide * (4 + Math.random() * 11) * reach),
        phi: clampPhi(centerPhi + vDir * (2 + Math.random() * 6) * reach),
      };
    }

    return {
      theta: pickNextTheta(current.theta),
      phi: pickNextPhi(current.phi),
    };
  };

  const initGaze = (now: number): GazeState => {
    const center = { theta: 0, phi: centerPhi };
    return {
      current: center,
      target: center,
      phase: "hold",
      phaseEnd: now + (1400 + Math.random() * 1200) * pace,
      moveStart: now,
      moveStartPoint: center,
      moveDuration: 0,
      initialized: true,
    };
  };

  const advanceGaze = (gaze: GazeState, now: number) => {
    if (gaze.phase === "move") {
      gaze.current = gaze.target;
      gaze.phase = "hold";
      gaze.phaseEnd = now + pickHoldDuration(gaze.current);
      return;
    }

    gaze.moveStartPoint = gaze.current;
    gaze.target = pickNextGaze(gaze.current);
    gaze.moveStart = now;
    gaze.moveDuration = pickMoveDuration(gaze.moveStartPoint, gaze.target);
    gaze.phase = "move";
    gaze.phaseEnd = now + gaze.moveDuration;
  };

  const updateGaze = (gaze: GazeState, now: number) => {
    if (now >= gaze.phaseEnd) {
      advanceGaze(gaze, now);
    }

    if (gaze.phase === "move") {
      const t = Math.min(1, (now - gaze.moveStart) / gaze.moveDuration);
      const delta = Math.hypot(
        gaze.target.theta - gaze.moveStartPoint.theta,
        gaze.target.phi - gaze.moveStartPoint.phi,
      );
      const eased = delta > 10 ? easeOutCubic(t) : easeInOutSine(t);
      gaze.current = {
        theta:
          gaze.moveStartPoint.theta +
          (gaze.target.theta - gaze.moveStartPoint.theta) * eased,
        phi:
          gaze.moveStartPoint.phi +
          (gaze.target.phi - gaze.moveStartPoint.phi) * eased,
      };
      return;
    }

    gaze.current = {
      theta: gaze.target.theta + microDrift(now, "x"),
      phi: gaze.target.phi + microDrift(now, "y"),
    };
  };

  return { initGaze, updateGaze, centerPhi };
}

/** Single-axis Y rotation with the same human hold / glance timing as gaze. */
function createYawController(profile: MotionProfile) {
  const { maxSwingDeg, reach } = profile;

  const clampYaw = (yaw: number) =>
    Math.max(-maxSwingDeg, Math.min(maxSwingDeg, yaw));

  const pickMoveDuration = (from: number, to: number) => {
    const d = Math.abs(to - from);
    if (d < 3) return 650 + Math.random() * 850;
    if (d < 12) return 360 + Math.random() * 520;
    return 200 + Math.random() * 280;
  };

  const pickHoldDuration = (yaw: number) => {
    const abs = Math.abs(yaw);
    if (abs < 2.5) return 2600 + Math.random() * 4800;
    if (abs < 14) return 1300 + Math.random() * 2700;
    return 800 + Math.random() * 1500;
  };

  const pickNextYaw = (current: number) => {
    const roll = Math.random();

    if (roll < 0.4) {
      return clampYaw((Math.random() - 0.5) * 3.5 * reach);
    }

    if (roll < 0.74) {
      const side = Math.random() < 0.5 ? -1 : 1;
      if (Math.abs(current) > 10 * reach && Math.random() < 0.55) {
        return clampYaw((Math.random() - 0.5) * 2.5 * reach);
      }
      return clampYaw(side * (8 + Math.random() * 10) * reach);
    }

    const side = Math.sign(current) || (Math.random() < 0.5 ? -1 : 1);
    return clampYaw(side * (14 + Math.random() * 10) * reach);
  };

  const initYaw = (now: number): YawState => ({
    current: 0,
    target: 0,
    phase: "hold",
    phaseEnd: now + 1400 + Math.random() * 1200,
    moveStart: now,
    moveStartValue: 0,
    moveDuration: 0,
    initialized: true,
  });

  const advanceYaw = (state: YawState, now: number) => {
    if (state.phase === "move") {
      state.current = state.target;
      state.phase = "hold";
      state.phaseEnd = now + pickHoldDuration(state.current);
      return;
    }

    state.moveStartValue = state.current;
    state.target = pickNextYaw(state.current);
    state.moveStart = now;
    state.moveDuration = pickMoveDuration(state.current, state.target);
    state.phase = "move";
    state.phaseEnd = now + state.moveDuration;
  };

  const updateYaw = (state: YawState, now: number) => {
    if (now >= state.phaseEnd) {
      advanceYaw(state, now);
    }

    if (state.phase === "move") {
      const t = Math.min(1, (now - state.moveStart) / state.moveDuration);
      const delta = Math.abs(state.target - state.moveStartValue);
      const eased = delta > 10 ? easeOutCubic(t) : easeInOutSine(t);
      state.current =
        state.moveStartValue + (state.target - state.moveStartValue) * eased;
      return;
    }

    state.current = state.target + microDrift(now, "x");
  };

  return { initYaw, updateYaw };
}

type ScanState = {
  current: GazePoint;
  from: GazePoint;
  target: GazePoint;
  targetIndex: number;
  phase: GazePhase;
  phaseEnd: number;
  moveStart: number;
  initialized: boolean;
};

/** Loops camera right → left → top → bottom. */
function createScanController(profile: MotionProfile) {
  const { centerPhi, maxSwingDeg, maxPhiSwing, reach } = profile;
  const HOLD_MS = 700;
  const MOVE_MS = 1100;

  const waypoints: GazePoint[] = [
    { theta: maxSwingDeg * reach, phi: centerPhi },
    { theta: -maxSwingDeg * reach, phi: centerPhi },
    { theta: 0, phi: centerPhi - maxPhiSwing * reach },
    { theta: 0, phi: centerPhi + maxPhiSwing * reach },
  ];

  const initScan = (now: number): ScanState => ({
    current: waypoints[0],
    from: waypoints[0],
    target: waypoints[1],
    targetIndex: 1,
    phase: "hold",
    phaseEnd: now + HOLD_MS,
    moveStart: now,
    initialized: true,
  });

  const advanceScan = (state: ScanState, now: number) => {
    if (state.phase === "move") {
      state.current = state.target;
      state.phase = "hold";
      state.phaseEnd = now + HOLD_MS;
      return;
    }

    state.from = state.current;
    state.target = waypoints[state.targetIndex];
    state.phase = "move";
    state.moveStart = now;
    state.phaseEnd = now + MOVE_MS;
    state.targetIndex = (state.targetIndex + 1) % waypoints.length;
  };

  const updateScan = (state: ScanState, now: number) => {
    if (now >= state.phaseEnd) {
      advanceScan(state, now);
    }

    if (state.phase === "move") {
      const t = Math.min(1, (now - state.moveStart) / MOVE_MS);
      const eased = easeInOutSine(t);
      state.current = {
        theta: state.from.theta + (state.target.theta - state.from.theta) * eased,
        phi: state.from.phi + (state.target.phi - state.from.phi) * eased,
      };
    }
  };

  return { initScan, updateScan };
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function microDrift(now: number, axis: "x" | "y") {
  const phase = axis === "x" ? 0 : 1.7;
  return (
    Math.sin(now * 0.0011 + phase) * 0.55 +
    Math.sin(now * 0.0019 + phase + 1.2) * 0.35 +
    Math.sin(now * 0.0033 + phase + 2.4) * 0.18
  );
}

const ZERO_ORIENTATION: readonly [number, number, number] = [0, 0, 0];

export function FeatureCardModel({
  className = "",
  src,
  motion = "gaze",
  alt = "",
  baseOrientation = ZERO_ORIENTATION,
  cameraTheta = 0,
  cameraRadius,
  spinAxis = "y",
  interactive = false,
}: FeatureCardModelProps) {
  const profile = MOTION_PROFILES[motion];
  const orbitRadius = cameraRadius ?? profile.cameraRadius;
  const gazeController = useMemo(() => createGazeController(profile), [motion]);
  const yawController = useMemo(() => createYawController(profile), [motion]);
  const scanController = useMemo(() => createScanController(profile), [motion]);

  const [mounted, setMounted] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const { ref: containerRef, near: nearViewport } = useNearViewport({
    rootMargin: "320px 480px",
  });
  const viewerRef = useRef<ModelViewerElement>(null);
  const gazeRef = useRef<GazeState | null>(null);
  const yawRef = useRef<YawState | null>(null);
  const scanRef = useRef<ScanState | null>(null);
  const dragRotationRef = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    setMounted(true);
    return subscribeModelViewerReady(() => setScriptReady(true));
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const handleError = () => setLoadError(true);
    viewer.addEventListener("error", handleError);
    return () => viewer.removeEventListener("error", handleError);
  }, [scriptReady, src]);

  const showViewer = mounted && scriptReady && !loadError && nearViewport;

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !interactive || !showViewer) return;

    const drag = dragRotationRef.current;
    drag.x = 0;
    drag.y = 0;
    drag.z = 0;

    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const applyOrientation = () => {
      if (!viewer.loaded) return;
      viewer.orientation = formatAbsoluteOrientation(
        baseOrientation[0] + drag.x,
        baseOrientation[1] + drag.y,
        baseOrientation[2] + drag.z,
      );
    };

    const resolveAxisMode = (event: PointerEvent): DragAxisMode => {
      if (event.shiftKey || event.button === 2 || event.button === 1) {
        return "z";
      }
      return "xy";
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 && event.button !== 1 && event.button !== 2) return;
      event.stopPropagation();
      event.preventDefault();
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      viewer.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      event.stopPropagation();
      event.preventDefault();

      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;

      const mode = resolveAxisMode(event);

      if (mode === "z") {
        drag.z += dx * DRAG_ROTATION_SENSITIVITY;
        drag.z += dy * DRAG_ROTATION_SENSITIVITY * 0.65;
      } else {
        drag.y += dx * DRAG_ROTATION_SENSITIVITY;
        drag.x += dy * DRAG_ROTATION_SENSITIVITY;
      }

      applyOrientation();
    };

    const endDrag = (event: PointerEvent) => {
      dragging = false;
      if (viewer.hasPointerCapture(event.pointerId)) {
        viewer.releasePointerCapture(event.pointerId);
      }
    };

    const onLoad = () => applyOrientation();

    viewer.addEventListener("pointerdown", onPointerDown);
    viewer.addEventListener("pointermove", onPointerMove);
    viewer.addEventListener("pointerup", endDrag);
    viewer.addEventListener("pointercancel", endDrag);
    viewer.addEventListener("load", onLoad);
    viewer.addEventListener("contextmenu", (event) => event.preventDefault());

    if (viewer.loaded) {
      applyOrientation();
    }

    return () => {
      viewer.removeEventListener("pointerdown", onPointerDown);
      viewer.removeEventListener("pointermove", onPointerMove);
      viewer.removeEventListener("pointerup", endDrag);
      viewer.removeEventListener("pointercancel", endDrag);
      viewer.removeEventListener("load", onLoad);
      drag.x = 0;
      drag.y = 0;
      drag.z = 0;
    };
  }, [interactive, showViewer, src, baseOrientation]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !showViewer || interactive || profile.mode === "static" || profile.mode === "float") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    gazeRef.current = null;
    yawRef.current = null;
    scanRef.current = null;
    let raf = 0;
    const fixedOrbit = `${cameraTheta}deg ${profile.centerPhi}deg ${orbitRadius}`;

    const tick = (now: number) => {
      if (!viewer.loaded) {
        raf = requestAnimationFrame(tick);
        return;
      }

      if (profile.mode === "modelY") {
        if (!yawRef.current?.initialized) {
          yawRef.current = yawController.initYaw(now);
        }

        yawController.updateYaw(yawRef.current, now);
        viewer.cameraOrbit = fixedOrbit;
        viewer.orientation = formatOrientation(
          baseOrientation,
          yawRef.current.current,
          spinAxis,
        );
      } else if (profile.mode === "scan") {
        if (!scanRef.current?.initialized) {
          scanRef.current = scanController.initScan(now);
        }

        scanController.updateScan(scanRef.current, now);
        const { theta, phi } = scanRef.current.current;
        viewer.cameraOrbit = `${theta.toFixed(2)}deg ${phi.toFixed(2)}deg ${orbitRadius}`;
        viewer.orientation = formatOrientation(baseOrientation);
      } else {
        if (!gazeRef.current?.initialized) {
          gazeRef.current = gazeController.initGaze(now);
        }

        gazeController.updateGaze(gazeRef.current, now);
        const { theta, phi } = gazeRef.current.current;
        viewer.cameraOrbit = `${theta.toFixed(2)}deg ${phi.toFixed(2)}deg ${orbitRadius}`;
        viewer.orientation = formatOrientation(baseOrientation);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      gazeRef.current = null;
      yawRef.current = null;
      scanRef.current = null;
    };
  }, [
    showViewer,
    src,
    motion,
    gazeController,
    yawController,
    scanController,
    profile,
    baseOrientation,
    cameraTheta,
    orbitRadius,
    spinAxis,
    interactive,
  ]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !showViewer || (profile.mode !== "static" && profile.mode !== "float") || interactive) return;

    const orbit = `${cameraTheta}deg ${profile.centerPhi}deg ${orbitRadius}`;
    const orientation = formatOrientation(baseOrientation);

    const stabilize = () => {
      if (!viewer.loaded) return;
      viewer.cameraOrbit = orbit;
      viewer.orientation = orientation;
    };

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(stabilize);
    });

    ro.observe(viewer);
    viewer.addEventListener("load", stabilize);
    stabilize();

    return () => {
      ro.disconnect();
      viewer.removeEventListener("load", stabilize);
    };
  }, [
    showViewer,
    src,
    profile.mode,
    profile.centerPhi,
    orbitRadius,
    cameraTheta,
    baseOrientation,
    interactive,
  ]);

  const initialOrbit = `${cameraTheta}deg ${profile.centerPhi}deg ${orbitRadius}`;
  const initialOrientation = formatOrientation(baseOrientation);
  const minOrbit =
    interactive || profile.mode === "static" || profile.mode === "float"
      ? initialOrbit
      : profile.mode === "modelY"
        ? `auto ${profile.centerPhi - profile.maxPhiSwing}deg 105%`
        : `-${profile.maxSwingDeg}deg ${profile.centerPhi - profile.maxPhiSwing}deg 105%`;
  const maxOrbit =
    interactive || profile.mode === "static" || profile.mode === "float"
      ? initialOrbit
      : profile.mode === "modelY"
        ? `auto ${profile.centerPhi + profile.maxPhiSwing}deg 160%`
        : `${profile.maxSwingDeg}deg ${profile.centerPhi + profile.maxPhiSwing}deg 160%`;

  return (
    <div
      ref={containerRef}
      className={`feature-card-model${interactive ? " feature-card-model--interactive" : ""}${motion === "float" ? " feature-card-model--float" : ""} ${className}`.trim()}
        aria-hidden={loadError}
        title={
          interactive
            ? "Drag: X/Y spin. Shift+drag or right-click drag: Z roll."
            : undefined
        }
      >
        {showViewer ? (
          <model-viewer
            ref={viewerRef}
            key={src}
            src={src}
            alt={alt}
            disable-pan
            disable-zoom
            overflow-visible
            loading="lazy"
            reveal="auto"
            shadow-intensity="0.65"
            exposure="1.1"
            interaction-prompt="none"
            orientation={initialOrientation}
            camera-orbit={initialOrbit}
            min-camera-orbit={minOrbit}
            max-camera-orbit={maxOrbit}
            field-of-view={profile.fieldOfView}
            className="feature-card-model__viewer block h-full w-full"
            style={{ background: "transparent", overflow: "visible" }}
          >
            <div slot="progress-bar" className="hidden" aria-hidden />
          </model-viewer>
        ) : (
          <div className="feature-card-model__placeholder h-full w-full" aria-hidden />
        )}
    </div>
  );
}
