import { ValueStripHighlights } from "@/components/sections/ValueStripHighlights";
import { ValueStripLayoutSync } from "@/components/sections/ValueStripLayoutSync";

export function ValueStrip() {
  return (
    <section className="overflow-x-clip overflow-y-visible bg-background pt-24 pb-16 md:pt-32 md:pb-24">
      <ValueStripLayoutSync />
      <ValueStripHighlights />
    </section>
  );
}
