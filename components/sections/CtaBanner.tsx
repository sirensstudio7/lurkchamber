"use client";

import { ctaBanner } from "@/lib/content";
import { CtaSlideLabel } from "@/components/ui/CtaSlideLabel";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBanner() {
  return (
    <section
      id="contact"
      className="anchor-offset bg-surface pt-[var(--section-padding)]"
    >
      <div className="container-wide">
        <div className="cta-banner-card relative flex min-h-[min(70dvh,680px)] flex-col items-center justify-center overflow-hidden rounded-3xl bg-black p-8">
          <Reveal className="relative z-10 flex w-full flex-col items-center text-center">
            <h2 className="text-hero text-white">
              <span className="block text-hero-foreground">{ctaBanner.line1}</span>
              <span className="block text-white">{ctaBanner.line2}</span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white md:text-lg">
              <span className="block">{ctaBanner.sublineLine1}</span>
              <span className="block">{ctaBanner.sublineLine2}</span>
            </p>
            <a
              href={ctaBanner.cta.href}
              className="group mt-8 inline-flex h-12 shrink-0 items-center overflow-hidden rounded-[43px] bg-hero-foreground px-10 font-[family-name:var(--font-inter)] text-lg font-semibold text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hero-foreground md:h-14 md:px-12 md:text-xl"
            >
              <CtaSlideLabel label={ctaBanner.cta.label} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
