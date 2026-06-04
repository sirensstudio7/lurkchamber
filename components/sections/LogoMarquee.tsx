import Image from "next/image";
import { clients } from "@/lib/content";
import "./logo-marquee.css";

function LogoTile({
  logo,
}: {
  logo: (typeof clients.logos)[number];
}) {
  return (
    <li className="logo-marquee__tile">
      <Image
        src={logo.src}
        alt={logo.name}
        width={220}
        height={68}
        unoptimized
        className="logo-marquee__tile-image"
      />
    </li>
  );
}

export function LogoMarquee() {
  const marqueeItems = [...clients.logos, ...clients.logos];
  const topRowLogos = clients.logos.slice(0, 5);
  const bottomRowLogos = clients.logos.slice(5);

  return (
    <section
      className="relative z-0 flex flex-col justify-center bg-background py-20 md:py-28"
      aria-label="Client logos"
    >
      <div className="container-wide flex w-full flex-col items-center justify-center">
        <p className="mx-auto mb-10 max-w-2xl text-center text-[18px] leading-relaxed text-muted md:mb-12">
          <span className="block">{clients.labelLine1}</span>
          <span className="block">{clients.labelLine2}</span>
        </p>

        <div className="w-full overflow-hidden md:hidden">
          <ul
            className="logo-marquee__track logo-marquee__track--scroll animate-marquee"
            aria-hidden
          >
            {marqueeItems.map((logo, index) => (
              <LogoTile key={`${logo.name}-${index}`} logo={logo} />
            ))}
          </ul>
          <ul className="sr-only">
            {clients.logos.map((logo) => (
              <li key={logo.name}>{logo.name}</li>
            ))}
          </ul>
        </div>

        <div className="logo-marquee__desktop hidden w-full flex-col gap-3 md:flex md:gap-4">
          <ul className="logo-marquee__track logo-marquee__track--row-5">
            {topRowLogos.map((logo) => (
              <LogoTile key={logo.name} logo={logo} />
            ))}
          </ul>
          <ul className="logo-marquee__track logo-marquee__track--row-5">
            {bottomRowLogos.map((logo) => (
              <LogoTile key={logo.name} logo={logo} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
