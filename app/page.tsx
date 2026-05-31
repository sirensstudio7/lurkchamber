import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { ValueStrip } from "@/components/sections/ValueStrip";
import { Features } from "@/components/sections/Features";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { FAQ } from "@/components/sections/FAQ";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <LogoMarquee />
        <ValueStrip />
        <Features />
        <CaseStudies />
        <FAQ />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
