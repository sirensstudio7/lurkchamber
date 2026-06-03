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
  const topRowLogos = clients.logos.slice(0, 4);
  const bottomRowLogos = clients.logos.slice(4);

  const desktopLogoClassName =
    "h-16 w-auto max-w-[15rem] object-contain md:h-20 md:max-w-[18rem]";

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

        <div className="hidden flex-col gap-y-8 md:flex md:gap-y-10">
          <ul className="grid grid-cols-4 items-center justify-items-center gap-x-6 md:gap-x-12">
            {topRowLogos.map((logo) => (
              <li key={logo.name} className="flex items-center justify-center">
                <ClientLogo logo={logo} className={desktopLogoClassName} />
              </li>
            ))}
          </ul>
          <ul className="grid grid-cols-5 items-center justify-items-center gap-x-6 md:gap-x-12">
            {bottomRowLogos.map((logo) => (
              <li key={logo.name} className="flex items-center justify-center">
                <ClientLogo logo={logo} className={desktopLogoClassName} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
