"use client";

import { ctaBanner } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBanner() {
  return (
    <section
      id="contact"
      className="anchor-offset bg-surface pt-[var(--section-padding)]"
    >
      <div className="container-wide">
        <div className="cta-banner-card relative flex min-h-[min(70dvh,680px)] flex-col items-center justify-center overflow-hidden rounded-3xl p-8">
          <Reveal className="relative z-10 flex w-full flex-col items-center text-center">
            <h2 className="text-hero text-white">
              <span className="block">{ctaBanner.line1}</span>
              <span className="block text-white/50">{ctaBanner.line2}</span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/60 md:text-lg">
              {ctaBanner.subline}
            </p>
            <a
              href={ctaBanner.cta.href}
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-hero-foreground px-8 text-sm font-semibold text-foreground transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hero-foreground"
            >
              {ctaBanner.cta.label}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
