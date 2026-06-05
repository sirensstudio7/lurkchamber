import { faq, faqSection } from "@/lib/content";
import { Accordion } from "@/components/ui/Accordion";
import { FaqQuestionBlockModel } from "@/components/ui/FaqQuestionBlockModel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabelChip } from "@/components/ui/SectionLabelChip";

export function FAQ() {
  return (
    <section id="faq" className="anchor-offset section-padding overflow-visible">
      <div className="container-wide overflow-visible">
        <div className="grid gap-10 overflow-visible lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-stretch lg:gap-16 xl:gap-20">
          {/* Stretch column matches accordion height so inner sticky can pin through all items */}
          <div className="min-h-0 overflow-visible">
            <div className="overflow-visible lg:sticky lg:top-28 lg:self-start lg:pb-12">
              <Reveal className="overflow-visible">
                <SectionLabelChip className="mb-5 normal-case">
                  {faqSection.label}
                </SectionLabelChip>
                <h2 className="font-[family-name:var(--font-dm-sans)] text-[1.875rem] font-medium leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem]">
                  <span className="block text-foreground max-md:whitespace-nowrap">
                    {faqSection.titleLine1}
                  </span>
                  <span className="block text-foreground">
                    {faqSection.titleLine2}
                  </span>
                </h2>
                <p className="mt-2 text-[18px] leading-relaxed text-muted">
                  {faqSection.intro}
                </p>
              </Reveal>

              <FaqQuestionBlockModel />
            </div>
          </div>

          <Reveal className="overflow-visible" delay={0.1}>
            <Accordion items={faq} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
