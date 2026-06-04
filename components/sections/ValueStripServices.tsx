import Image from "next/image";
import { services, servicesSection } from "@/lib/content";
import { tiltWarp } from "@/lib/fonts";
import { ValueStripLayoutSync } from "@/components/sections/ValueStripLayoutSync";
import "./value-strip-services.css";

type Service = (typeof services)[number];

function ServiceStackCardContent({
  service,
  titleId,
}: {
  service: Service;
  titleId: string;
}) {
  return (
    <>
      <div className="services-panel__stack-card-copy">
        <h3
          id={titleId}
          className={`services-panel__stack-card-title ${tiltWarp.className}`}
        >
          {service.navTitle}
        </h3>
        <p className="services-panel__stack-card-lead">{service.description}</p>
      </div>
      <div className="services-panel__stack-card-media">
        <div className="services-panel__stack-card-media-frame">
          <div className="services-panel__stack-card-media-inner">
            <Image
              src={service.imageSrc}
              alt=""
              fill
              unoptimized
              className="object-cover object-center"
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export function ValueStripServices() {
  return (
    <section
      id="services"
      className="services-section overflow-visible bg-background pt-24 pb-16 md:pt-32 md:pb-24"
      aria-label="Our services"
    >
      <ValueStripLayoutSync />
      <div className="container-wide services-panel__inner">
        <div className="services-panel__layout">
          <header className="services-panel__header">
            <h2 className={`services-panel__title ${tiltWarp.className}`}>
              <span className="services-panel__title-line">
                {servicesSection.titleLine1}
              </span>
              <span className="services-panel__title-line">
                {servicesSection.titleLine2}
              </span>
            </h2>
          </header>

          <div className="services-panel__stack">
            {services.map((service) => (
              <article
                key={service.number}
                id={`service-panel-${service.number}`}
                className="services-panel__stack-card"
              >
                <div className="services-panel__stack-card-surface">
                  <ServiceStackCardContent
                    service={service}
                    titleId={`service-title-${service.number}`}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
