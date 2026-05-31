import { faq, faqSection } from "@/lib/content";
import { tiltWarp } from "@/lib/fonts";
import { Accordion } from "@/components/ui/Accordion";
import { FaqQuestionBlockModel } from "@/components/ui/FaqQuestionBlockModel";
import { Reveal } from "@/components/ui/Reveal";

export function FAQ() {
  return (
    <section id="faq" className="anchor-offset section-padding overflow-visible">
      <div className="container-wide overflow-visible">
        <div className="grid gap-10 overflow-visible lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16 xl:gap-20">
          <div className="overflow-visible pb-10 md:pb-12 lg:sticky lg:top-28 lg:self-start">
            <Reveal className="overflow-visible">
              <p className="mb-5 flex items-center gap-2.5 text-sm font-semibold text-foreground">
                <span
                  className="inline-block size-2.5 shrink-0 rounded-[3px] bg-foreground"
                  aria-hidden
                />
                {faqSection.label}
              </p>
              <h2
                className={`${tiltWarp.className} text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-[3.25rem]`}
              >
                <span className="block text-foreground">
                  {faqSection.titleLine1}
                </span>
                <span className="block text-foreground">
                  {faqSection.titleLine2}
                </span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted md:mt-6">
                {faqSection.intro}
              </p>
            </Reveal>

            <FaqQuestionBlockModel />
          </div>

          <Reveal className="overflow-visible" delay={0.1}>
            <Accordion items={faq} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
