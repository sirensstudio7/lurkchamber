import Image from "next/image";
import { clients } from "@/lib/content";

export function LogoMarquee() {
  const items = [...clients.logos, ...clients.logos];

  return (
    <section
      className="relative z-0 bg-background py-20 md:py-28"
      aria-label="Client logos"
    >
      <div className="container-wide mb-10 md:mb-12">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted">
          {clients.label}
        </p>
      </div>

      <div className="overflow-hidden">
        <ul
          className="animate-marquee flex w-max items-center gap-12 md:gap-16"
          aria-hidden
        >
          {items.map((logo, i) => (
            <li key={`${logo.name}-${i}`} className="flex shrink-0 items-center">
              {"src" in logo && logo.src ? (
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={28}
                  height={28}
                  className="h-7 w-auto opacity-60 transition-opacity hover:opacity-100"
                />
              ) : (
                <span className="text-lg font-semibold tracking-tight text-muted/50 transition-colors hover:text-muted md:text-xl">
                  {logo.name}
                </span>
              )}
            </li>
          ))}
        </ul>
        <ul className="sr-only">
          {clients.logos.map((logo) => (
            <li key={logo.name}>{logo.name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
