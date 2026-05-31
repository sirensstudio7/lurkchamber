"use client";

import Matter from "matter-js";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import "./feature-falling-blocks.css";

const TECH_ICONS = [
  { name: "Next.js", src: "/icons/tech/nextdotjs.svg" },
  { name: "React", src: "/icons/tech/react.svg" },
  { name: "TypeScript", src: "/icons/tech/typescript.svg" },
  { name: "Tailwind CSS", src: "/icons/tech/tailwindcss.svg" },
  { name: "Figma", src: "/icons/tech/figma.svg" },
  { name: "Vercel", src: "/icons/tech/vercel.svg" },
  { name: "Supabase", src: "/icons/tech/supabase.svg" },
  { name: "Prisma", src: "/icons/tech/prisma.svg" },
  { name: "GraphQL", src: "/icons/tech/graphql.svg" },
  { name: "Bun", src: "/icons/tech/bun.svg" },
  { name: "Vite", src: "/icons/tech/vite.svg" },
  { name: "Framer", src: "/icons/tech/framer.svg" },
  { name: "Stripe", src: "/icons/tech/stripe.svg" },
  { name: "Docker", src: "/icons/tech/docker.svg" },
  { name: "PostgreSQL", src: "/icons/tech/postgresql.svg" },
  { name: "OpenAI", src: "/icons/tech/openai.svg" },
  { name: "Svelte", src: "/icons/tech/svelte.svg" },
  { name: "Astro", src: "/icons/tech/astro.svg" },
] as const;

const CIRCLE_FILL = "#fccc24";

const VISIBILITY_THRESHOLD = 0.35;

type TechBody = Matter.Body & {
  circleRadius: number;
  iconSrc: string;
};

type FeatureFallingBlocksProps = {
  className?: string;
};

function loadIcon(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = document.createElement("img");
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function FeatureFallingBlocks({ className }: FeatureFallingBlocksProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let cancelled = false;
    let sceneReady = false;
    let cardVisible = false;
    let physicsStarted = false;

    const { Engine, Runner, World, Bodies, Body, Events } = Matter;

    const engine = Engine.create();
    const world = engine.world;
    const runner = Runner.create();

    let techBodies: TechBody[] = [];
    let walls: Matter.Body[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let pointerActive = false;
    let pointerX = -9999;
    let pointerY = -9999;
    const iconImages = new Map<string, HTMLImageElement>();

    const getPointerPosition = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const handlePointerMove = (event: PointerEvent) => {
      const point = getPointerPosition(event);
      pointerX = point.x;
      pointerY = point.y;
      pointerActive = true;
    };

    const handlePointerLeave = () => {
      pointerActive = false;
    };

    const getSize = () => {
      const rect = container.getBoundingClientRect();
      return {
        width: Math.max(rect.width, 1),
        height: Math.max(rect.height, 1),
      };
    };

    const setCanvasSize = () => {
      const size = getSize();
      width = size.width;
      height = size.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const createWalls = () => {
      walls = [
        Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true }),
        Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true }),
        Bodies.rectangle(width + 25, height / 2, 50, height, {
          isStatic: true,
        }),
      ];
      World.add(world, walls);
    };

    const getBodyUnderPointer = () => {
      if (!pointerActive) return null;

      let match: TechBody | null = null;
      let closestDist = Infinity;

      for (const body of techBodies) {
        const dx = pointerX - body.position.x;
        const dy = pointerY - body.position.y;
        const dist = Math.hypot(dx, dy);

        if (dist <= body.circleRadius && dist < closestDist) {
          match = body;
          closestDist = dist;
        }
      }

      return match;
    };

    const followHoveredBody = () => {
      if (!pointerActive || !physicsStarted) return;

      const body = getBodyUnderPointer();
      if (!body) return;

      Body.setPosition(body, { x: pointerX, y: pointerY });
      Body.setVelocity(body, { x: 0, y: 0 });
      Body.setAngularVelocity(body, 0);
    };

    const createTechBodies = () => {
      const minRadius = Math.min(width, height) * 0.05;
      const maxRadius = Math.min(width, height) * 0.09;

      techBodies = TECH_ICONS.map((tech, index) => {
        const circleRadius =
          Math.random() * (maxRadius - minRadius) + minRadius;
        const x =
          Math.random() * (width - circleRadius * 2) + circleRadius;
        const y = -circleRadius - index * (maxRadius * 1.35);

        const body = Bodies.circle(x, y, circleRadius, {
          restitution: 0.7,
          friction: 0.05,
          frictionAir: 0.01,
        }) as TechBody;

        body.iconSrc = tech.src;
        body.circleRadius = circleRadius;
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.2);

        return body;
      });

      World.add(world, techBodies);
    };

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const hoveredBody = getBodyUnderPointer();

      for (const body of techBodies) {
        const { x, y } = body.position;
        const icon = iconImages.get(body.iconSrc);
        const isHovered = hoveredBody?.id === body.id;
        const scale = isHovered ? 1.06 : 1;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(body.angle);
        ctx.scale(scale, scale);

        ctx.fillStyle = CIRCLE_FILL;
        ctx.beginPath();
        ctx.arc(0, 0, body.circleRadius, 0, Math.PI * 2);
        ctx.fill();

        if (icon) {
          const iconSize = body.circleRadius * 1.05;
          ctx.drawImage(
            icon,
            -iconSize / 2,
            -iconSize / 2,
            iconSize,
            iconSize,
          );
        }

        ctx.restore();
      }
    };

    const startPhysics = () => {
      if (physicsStarted || cancelled || !sceneReady) return;
      physicsStarted = true;
      Runner.run(runner, engine);
    };

    const tryStartPhysics = () => {
      if (sceneReady && cardVisible) {
        startPhysics();
      }
    };

    const setupScene = () => {
      setCanvasSize();
      createWalls();
      createTechBodies();
      Events.on(engine, "beforeUpdate", followHoveredBody);
      Events.on(engine, "afterUpdate", draw);
      sceneReady = true;
      tryStartPhysics();
    };

    const handleResize = () => {
      if (!sceneReady) return;

      const wasRunning = physicsStarted;
      if (wasRunning) {
        Runner.stop(runner);
      }

      World.remove(world, [...walls, ...techBodies]);
      setCanvasSize();
      createWalls();
      createTechBodies();

      if (wasRunning) {
        Runner.run(runner, engine);
      }
    };

    const prepareScene = async () => {
      try {
        const loaded = await Promise.all(
          TECH_ICONS.map(async (tech) => {
            const img = await loadIcon(tech.src);
            return [tech.src, img] as const;
          }),
        );

        if (cancelled) return;

        for (const [src, img] of loaded) {
          iconImages.set(src, img);
        }
      } catch {
        // Icons failed to load — physics still runs with white circles only.
      }

      if (cancelled) return;
      setupScene();
    };

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio >= VISIBILITY_THRESHOLD
          ) {
            cardVisible = true;
            tryStartPhysics();
            visibilityObserver.disconnect();
          }
        }
      },
      { threshold: [0, VISIBILITY_THRESHOLD, 0.6, 1] },
    );

    visibilityObserver.observe(container);
    void prepareScene();

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelled = true;
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      Events.off(engine, "beforeUpdate", followHoveredBody);
      Events.off(engine, "afterUpdate", draw);
      Runner.stop(runner);
      World.clear(world, false);
      Engine.clear(engine);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div
        className={`feature-falling-blocks feature-falling-blocks--static ${className ?? ""}`}
      >
        {TECH_ICONS.map((tech) => (
          <span key={tech.name} className="feature-falling-blocks__pill">
            <Image
              src={tech.src}
              alt={tech.name}
              width={20}
              height={20}
              className="feature-falling-blocks__icon"
            />
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`feature-falling-blocks ${className ?? ""}`}
    >
      <canvas ref={canvasRef} className="feature-falling-blocks__canvas" />
    </div>
  );
}
