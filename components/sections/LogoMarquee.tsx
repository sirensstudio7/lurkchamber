import Image from "next/image";
import { clients } from "@/lib/content";

function ClientLogo({
  logo,
  className,
}: {
  logo: (typeof clients.logos)[number];
  className: string;
}) {
  return (
    <Image
      src={logo.src}
      alt={logo.name}
      width={220}
      height={68}
      unoptimized
      className={className}
    />
  );
}

export function LogoMarquee() {
  const marqueeItems = [...clients.logos, ...clients.logos];

  return (
    <section
      className="relative z-0 bg-background pt-20 pb-0 md:pt-28"
      aria-label="Client logos"
    >
      <div className="container-wide">
        <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-muted md:mb-12 md:text-base">
          <span className="block">{clients.labelLine1}</span>
          <span className="block">{clients.labelLine2}</span>
        </p>

        <div className="overflow-hidden md:hidden">
          <ul
            className="animate-marquee flex w-max items-center gap-8"
            aria-hidden
          >
            {marqueeItems.map((logo, index) => (
              <li
                key={`${logo.name}-${index}`}
                className="flex shrink-0 items-center"
              >
                <ClientLogo
                  logo={logo}
                  className="h-14 w-auto max-w-[11rem] object-contain"
                />
              </li>
            ))}
          </ul>
          <ul className="sr-only">
            {clients.logos.map((logo) => (
              <li key={logo.name}>{logo.name}</li>
            ))}
          </ul>
        </div>

        <ul className="hidden grid-cols-4 items-center justify-items-center gap-x-6 gap-y-8 md:grid md:gap-x-12 md:gap-y-10">
          {clients.logos.map((logo) => (
            <li key={logo.name} className="flex items-center justify-center">
              <ClientLogo
                logo={logo}
                className="h-16 w-auto max-w-[15rem] object-contain md:h-20 md:max-w-[18rem]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
