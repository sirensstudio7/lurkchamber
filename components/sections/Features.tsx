"use client";

import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { features, featuresExpandAbout, featuresSection } from "@/lib/content";
import { tiltWarp } from "@/lib/fonts";
import {
  onLayoutWidthChange,
  refreshScrollTriggersPreservingScroll,
} from "@/lib/scroll-layout";
import { getAppScrollY } from "@/lib/lenis-scroll";
import { isMobileViewport } from "@/lib/mobile-viewport";
import { updateScrollTriggers } from "@/lib/scroll-trigger-refresh";

function readFeaturesScrollY() {
  return getAppScrollY() || window.scrollY;
}
import { FeaturesExpandText } from "@/components/sections/FeaturesExpandText";
import { CircularLink } from "@/components/ui/CircularLink";
import { SectionLabelChip } from "@/components/ui/SectionLabelChip";
import { FeatureCardModel } from "@/components/ui/FeatureCardModel";
import { FeatureFallingBlocks } from "@/components/ui/FeatureFallingBlocks";
import { FeaturePhoneChat } from "@/components/ui/FeaturePhoneChat";
import "./features-expand-content.css";

gsap.registerPlugin(ScrollTrigger);

const CARD_BG = "#c94e1a";
const EXPAND_BG = "#ffca26";

function getViewportHeight() {
  return window.visualViewport?.height ?? window.innerHeight;
}

function FeaturesSectionTitle() {
  return (
    <h2
      className={`${tiltWarp.className} w-full max-w-full text-[clamp(2.4rem,11.25vw,3.15rem)] leading-[1.1] tracking-[-0.02em] md:max-w-xl md:text-hero md:leading-[1.05]`}
    >
      <span className="block md:hidden">{featuresSection.titleMobileLine1}</span>
      <span className="block md:hidden">{featuresSection.titleMobileLine2}</span>
      <span className="block md:hidden">{featuresSection.titleMobileLine3}</span>
      <span className="block md:hidden">{featuresSection.titleMobileLine4}</span>
      <span className="hidden break-words md:inline">
        {featuresSection.titleLine1}
      </span>
      <span className="hidden md:inline"> </span>
      <span className="hidden break-words md:inline">
        {featuresSection.titleLine2}
      </span>
      <span className="hidden md:inline"> </span>
      <span className="hidden break-words md:inline">
        {featuresSection.titleLine3}
      </span>
    </h2>
  );
}

function isFullBleedVisual(feature: (typeof features)[number]) {
  return (
    ("visual" in feature && feature.visual === "fallingBlocks") ||
    ("visual" in feature && feature.visual === "phoneChat")
  );
}

function FeatureCardVisual({
  feature,
  modelClassName,
}: {
  feature: (typeof features)[number];
  modelClassName: string;
}) {
  if ("visual" in feature && feature.visual === "fallingBlocks") {
    return (
      <div className="flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden">
        <FeatureFallingBlocks className="h-full w-full" />
      </div>
    );
  }

  if ("visual" in feature && feature.visual === "phoneChat") {
    return (
      <div className="flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden">
        <FeaturePhoneChat className="h-full w-full" />
      </div>
    );
  }

  if ("model" in feature && feature.model) {
    return (
      <div className="flex min-h-0 w-full flex-1 items-center justify-center">
        <FeatureCardModel
          src={feature.model.src}
          motion={feature.model.motion}
          baseOrientation={
            "baseOrientation" in feature.model
              ? feature.model.baseOrientation
              : undefined
          }
          cameraTheta={
            "cameraTheta" in feature.model
              ? feature.model.cameraTheta
              : undefined
          }
          cameraRadius={
            "cameraRadius" in feature.model
              ? feature.model.cameraRadius
              : undefined
          }
          interactive={
            "interactive" in feature.model && feature.model.interactive === true
              ? true
              : undefined
          }
          className={modelClassName}
        />
      </div>
    );
  }

  return null;
}

export function Features() {
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const lastCardRef = useRef<HTMLDivElement>(null);
  const lastCardTextRef = useRef<HTMLDivElement>(null);
  const expandContainerRef = useRef<HTMLDivElement>(null);
  const expandPanelRef = useRef<HTMLDivElement>(null);
  const expandHeaderRef = useRef<HTMLDivElement>(null);
  const expandTextRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const pinSection = pinSectionRef.current;
    const pinWrap = pinWrapRef.current;
    const lastCard = lastCardRef.current;
    const lastCardText = lastCardTextRef.current;
    const expandContainer = expandContainerRef.current;
    const expandPanel = expandPanelRef.current;
    const expandHeader = expandHeaderRef.current;
    const expandText = expandTextRef.current;
    if (
      !pinSection ||
      !pinWrap ||
      !lastCard ||
      !lastCardText ||
      !expandContainer ||
      !expandPanel ||
      !expandHeader ||
      !expandText ||
      prefersReducedMotion
    )
      return;

    let cachedHorizontalEndX: number | null = null;
    let cachedZoomDistance: number | null = null;

    const measureHorizontalEndX = () => {
      gsap.set(pinWrap, { x: 0 });
      const rect = lastCard.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      cachedHorizontalEndX = window.innerWidth / 2 - cardCenterX;
      return cachedHorizontalEndX;
    };

    const getHorizontalEndX = () => {
      if (cachedHorizontalEndX === null) return measureHorizontalEndX();
      return cachedHorizontalEndX;
    };

    const getHorizontalDistance = () => Math.abs(getHorizontalEndX());
    const getZoomDistance = () => {
      if (cachedZoomDistance === null) {
        cachedZoomDistance = getViewportHeight() * 0.85;
      }
      return cachedZoomDistance;
    };

    const getCardBoundsInSection = () => {
      const cardRect = lastCard.getBoundingClientRect();
      const sectionRect = pinSection.getBoundingClientRect();
      return {
        top: cardRect.top - sectionRect.top,
        left: cardRect.left - sectionRect.left,
        width: cardRect.width,
        height: cardRect.height,
      };
    };

    measureHorizontalEndX();

    const ctx = gsap.context(() => {
      const horizontal = getHorizontalDistance();
      const zoom = getZoomDistance();
      const total = horizontal + zoom;
      const hEnd = horizontal / total;

      gsap.set(expandContainer, { opacity: 0, pointerEvents: "none" });
      gsap.set(expandPanel, { opacity: 0 });
      expandPanel.classList.remove("features-expand-content-visible");
      gsap.set(lastCardText, { opacity: 1, visibility: "visible" });
      pinSection.classList.remove("features-is-zooming");

      const hideLastCardText = () => {
        pinSection.classList.add("features-is-zooming");
        lastCardText.style.setProperty("opacity", "0", "important");
        lastCardText.style.setProperty("visibility", "hidden", "important");
        lastCardText.style.setProperty("pointer-events", "none", "important");
        gsap.set(lastCardText, { opacity: 0, visibility: "hidden" });
      };

      const showLastCardText = () => {
        pinSection.classList.remove("features-is-zooming");
        lastCardText.style.removeProperty("opacity");
        lastCardText.style.removeProperty("visibility");
        lastCardText.style.removeProperty("pointer-events");
        gsap.set(lastCardText, { opacity: 1, visibility: "visible" });
      };

      ScrollTrigger.create({
        trigger: pinSection,
        scroller: document.documentElement,
        start: "top top",
        end: () => `+=${total}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: false,
        anticipatePin: 1,
        onUpdate(self) {
          const progress = self.progress;
          const sectionW = pinSection.offsetWidth;
          const sectionH = pinSection.offsetHeight;

          if (progress < hEnd) {
            const hProgress = progress / hEnd;
            gsap.set(pinWrap, { x: getHorizontalEndX() * hProgress });
            gsap.set(expandContainer, { opacity: 0, pointerEvents: "none" });
            gsap.set(expandPanel, { opacity: 0 });
            expandPanel.classList.remove("features-expand-content-visible");
            showLastCardText();
            gsap.set(lastCard, { opacity: 1 });
            return;
          }

          gsap.set(pinWrap, { x: getHorizontalEndX() });

          const zProgress =
            progress >= 1 ? 1 : (progress - hEnd) / (1 - hEnd);
          const t = gsap.parseEase("power2.inOut")(zProgress);
          const from = getCardBoundsInSection();

          hideLastCardText();
          gsap.set(lastCard, { opacity: 0 });

          // Text fades in via CSS after yellow panel is full screen
          const FULLSCREEN_AT = 0.97;
          expandPanel.classList.toggle(
            "features-expand-content-visible",
            zProgress >= FULLSCREEN_AT,
          );

          gsap.set(expandContainer, {
            opacity: 1,
            pointerEvents: zProgress >= 1 ? "auto" : "none",
          });

          gsap.set(expandPanel, {
            opacity: 1,
            top: gsap.utils.interpolate(from.top, 0, t),
            left: gsap.utils.interpolate(from.left, 0, t),
            width: gsap.utils.interpolate(from.width, sectionW, t),
            height: gsap.utils.interpolate(from.height, sectionH, t),
            borderRadius: 24 * (1 - t),
            backgroundColor: gsap.utils.interpolate(CARD_BG, EXPAND_BG, t),
          });

        },
      });
    }, pinSection);

    const refresh = (required = false) => {
      cachedHorizontalEndX = null;
      cachedZoomDistance = null;
      measureHorizontalEndX();
      refreshScrollTriggersPreservingScroll({ required });
    };
    const removeLayoutListener = onLayoutWidthChange(() => refresh(true));
    let initialRefreshTimer: number | undefined;
    const scheduleInitialRefresh = () => {
      if (initialRefreshTimer !== undefined) {
        window.clearTimeout(initialRefreshTimer);
      }
      initialRefreshTimer = window.setTimeout(() => {
        initialRefreshTimer = undefined;
        if (readFeaturesScrollY() > 80) return;
        if (isMobileViewport()) {
          updateScrollTriggers();
          return;
        }
        refresh(true);
      }, 600);
    };
    scheduleInitialRefresh();

    return () => {
      removeLayoutListener();
      if (initialRefreshTimer !== undefined) {
        window.clearTimeout(initialRefreshTimer);
      }
      pinSection.classList.remove("features-is-zooming");
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <section id="features" className="anchor-offset section-padding">
        <div className="container-wide">
          <div className="mb-12 md:mb-16">
            <SectionLabelChip className="mb-4">{featuresSection.label}</SectionLabelChip>
            <FeaturesSectionTitle />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const fullBleed = isFullBleedVisual(feature);

              return (
              <article key={feature.title} className="flex flex-col">
                <div className={`flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-3xl bg-hero-bg md:min-h-64 ${fullBleed ? "p-0" : "p-6 md:p-8"}`}>
                  <FeatureCardVisual
                    feature={feature}
                    modelClassName="h-full min-h-[12rem] w-full"
                  />
                </div>
                <div className="mt-4 shrink-0">
                  <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="line-clamp-2 text-sm leading-relaxed text-muted">
                    {feature.description}
                  </p>
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="features" className="anchor-offset">
      <div
        ref={pinSectionRef}
        className="relative h-[100dvh] w-full overflow-hidden bg-background"
      >
        <div
          ref={pinWrapRef}
          className="flex h-full w-max items-center gap-4 pr-8 will-change-transform"
        >
          <div className="box-border flex min-h-full w-[88vw] max-w-[88vw] min-w-0 shrink-0 flex-col justify-center px-[max(1.25rem,5vw)] md:w-auto md:max-w-none md:min-w-[min(70vw,640px)]">
            <SectionLabelChip className="mb-4">{featuresSection.label}</SectionLabelChip>
            <FeaturesSectionTitle />
          </div>

          {features.map((feature, index) => {
            const isLast = index === features.length - 1;
            const fullBleed = isFullBleedVisual(feature);

            return (
              <article
                key={feature.title}
                className={`flex w-[min(calc(100vw-2.25rem),400px)] shrink-0 flex-col justify-center px-0 py-4 md:w-[420px] md:py-8 ${isLast ? "relative z-10 max-md:min-h-dvh max-md:justify-center" : ""}`}
              >
                <div
                  ref={isLast ? lastCardRef : undefined}
                  data-features-last-card={isLast ? true : undefined}
                  className={`relative flex h-[min(45dvh,320px)] max-h-[min(45dvh,320px)] w-full shrink-0 flex-col items-center justify-center overflow-hidden rounded-3xl bg-hero-bg md:h-[min(55vh,380px)] md:max-h-[min(55vh,380px)] ${fullBleed ? "p-0" : "p-5 md:p-6"}`}
                >
                  <FeatureCardVisual
                    feature={feature}
                    modelClassName="aspect-[21/20] h-full max-h-full w-full min-h-[14rem]"
                  />
                </div>
                <div
                  ref={isLast ? lastCardTextRef : undefined}
                  data-features-last-card-text={isLast ? true : undefined}
                  className="relative mt-4 shrink-0 md:mt-5"
                >
                  <h3 className="mb-2 text-xl font-semibold tracking-tight text-foreground md:mb-3 md:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="line-clamp-2 text-base leading-relaxed text-muted md:text-lg">
                    {feature.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Dedicated fullscreen layer — lives inside pinSection, not on body */}
        <div
          ref={expandContainerRef}
          data-features-expand-container
          className="pointer-events-none absolute inset-0 z-30 overflow-hidden opacity-0"
          aria-hidden="true"
        >
          <div
            ref={expandPanelRef}
            className="features-expand-panel absolute flex h-full flex-col justify-end gap-4 overflow-hidden p-4 sm:gap-5 sm:p-6 md:p-8 lg:p-10"
            style={{ borderRadius: 24, backgroundColor: CARD_BG }}
          >
            <div
              ref={expandHeaderRef}
              data-features-expand-header
              className="shrink-0 will-change-transform"
            >
              <h2
                className={`${tiltWarp.className} max-w-2xl text-features-expand-accent text-[clamp(2.125rem,9vw,3rem)] leading-[1.06] md:text-[clamp(1.35rem,4vw,2.75rem)] md:leading-[1.08]`}
              >
                <span className="block">{featuresExpandAbout.titleLine1}</span>
                <span className="block">{featuresExpandAbout.titleLine2}</span>
              </h2>
            </div>
            <div className="features-expand-bottom flex w-full min-w-0 items-end justify-between gap-4 sm:gap-6 md:gap-8">
              <div
                ref={expandTextRef}
                data-features-expand-text
                className="min-w-0 flex-1 shrink-0 will-change-transform"
              >
                <FeaturesExpandText />
              </div>
              <div
                data-features-expand-circular
                className="features-expand-circular hidden shrink-0 will-change-transform md:block"
              >
                <CircularLink
                  text={featuresExpandAbout.circularText}
                  href="#contact"
                  title="Get in touch"
                  description="Rotating link with studio name around a circle and an arrow inside"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
