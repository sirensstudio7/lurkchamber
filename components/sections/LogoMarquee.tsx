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

function LogoMarqueeRow({ logos }: { logos: typeof clients.logos }) {
  const marqueeItems = [...logos, ...logos];

  return (
    <div className="logo-marquee__row overflow-x-clip">
      <ul className="logo-marquee__track logo-marquee__track--infinite" aria-hidden>
        {marqueeItems.map((logo, index) => (
          <LogoTile key={`${logo.name}-${index}`} logo={logo} />
        ))}
      </ul>
    </div>
  );
}

export function LogoMarquee() {
  return (
    <section
      className="logo-marquee-section relative z-10 flex flex-col justify-center bg-transparent py-20 md:py-28"
      aria-label="Client logos"
    >
      <div className="logo-marquee__bleed w-full md:hidden">
        <LogoMarqueeRow logos={clients.logos} />
      </div>

      <div className="logo-marquee__bleed logo-marquee__desktop hidden w-full md:block">
        <LogoMarqueeRow logos={clients.logos} />
      </div>

      <ul className="sr-only">
        {clients.logos.map((logo) => (
          <li key={logo.name}>{logo.name}</li>
        ))}
      </ul>
    </section>
  );
}
