"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { services, servicesSection } from "@/lib/content";
import { tiltWarp } from "@/lib/fonts";
import { scheduleLayoutStable } from "@/lib/layout-stable";
import { ValueStripLayoutSync } from "@/components/sections/ValueStripLayoutSync";
import "./value-strip-services.css";

gsap.registerPlugin(ScrollTrigger);

const STACK_PIN_OFFSET_MEDIA = "(min-width: 768px)";
const STACK_PIN_BASE_DESKTOP = 136;
const STACK_PIN_BASE_MOBILE = 112;

type Service = (typeof services)[number];

function ServiceStackCardContent({
  service,
  titleId,
}: {
  service: Service;
  titleId: string;
}) {
  return (
    <>
      <div className="services-panel__stack-card-copy">
        <h3
          id={titleId}
          className={`services-panel__stack-card-title ${tiltWarp.className}`}
        >
          {service.navTitle}
        </h3>
        <p className="services-panel__stack-card-lead">{service.description}</p>
      </div>
      <div className="services-panel__stack-card-media">
        <div className="services-panel__stack-card-media-frame">
          <div className="services-panel__stack-card-media-inner">
            <Image
              src={service.imageSrc}
              alt=""
              fill
              unoptimized
              className="object-cover object-center"
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </>
  );
}

function getStackPinBase() {
  if (typeof window === "undefined") return STACK_PIN_BASE_DESKTOP;
  return window.matchMedia(STACK_PIN_OFFSET_MEDIA).matches
    ? STACK_PIN_BASE_DESKTOP
    : STACK_PIN_BASE_MOBILE;
}

export function ValueStripServices() {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    let ctx: gsap.Context | null = null;

    const setupStack = () => {
      ctx?.revert();
      ctx = null;

      const cards = gsap.utils.toArray<HTMLElement>(
        stack.querySelectorAll(".services-panel__stack-card"),
      );
      if (!cards.length) return;

      const pinBase = getStackPinBase();

      ctx = gsap.context(() => {
        cards.forEach((card) => {
          ScrollTrigger.create({
            trigger: card,
            start: `top ${pinBase}`,
            end: "bottom 600",
            endTrigger: stack,
            pin: true,
            anticipatePin: 1,
          });
        });
      }, stack);
    };

    setupStack();

    const onBreakpointChange = () => {
      setupStack();
      scheduleLayoutStable();
      ScrollTrigger.refresh();
    };

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onBreakpointChange);
    window.addEventListener("load", refresh);

    const ro = new ResizeObserver(() => {
      scheduleLayoutStable();
      ScrollTrigger.refresh();
    });
    ro.observe(stack);

    return () => {
      window.removeEventListener("resize", onBreakpointChange);
      window.removeEventListener("load", refresh);
      ro.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="services"
      className="services-section overflow-visible bg-background py-24 md:py-32"
      aria-label="Our services"
    >
      <ValueStripLayoutSync />
      <div className="container-wide services-panel__inner">
        <div className="services-panel__layout">
          <header className="services-panel__header">
            <h2 className={`services-panel__title ${tiltWarp.className}`}>
              <span className="services-panel__title-line">
                {servicesSection.titleLine1}
              </span>
              <span className="services-panel__title-line">
                {servicesSection.titleLine2}
              </span>
            </h2>
          </header>

          <div ref={stackRef} className="services-panel__stack">
            {services.map((service) => (
              <article
                key={service.number}
                id={`service-panel-${service.number}`}
                className="services-panel__stack-card"
              >
                <div className="services-panel__stack-card-surface">
                  <ServiceStackCardContent
                    service={service}
                    titleId={`service-title-${service.number}`}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
