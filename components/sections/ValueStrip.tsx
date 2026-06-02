import { ValueStripHighlights } from "@/components/sections/ValueStripHighlights";
import { ValueStripLayoutSync } from "@/components/sections/ValueStripLayoutSync";

export function ValueStrip() {
  return (
    <section className="overflow-x-clip overflow-y-visible bg-background py-24 md:py-32">
      <ValueStripLayoutSync />
      <ValueStripHighlights />
    </section>
  );
}
