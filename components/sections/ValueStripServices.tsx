import type { CSSProperties } from "react";
import { services, servicesSection } from "@/lib/content";
import { ValueStripLayoutSync } from "@/components/sections/ValueStripLayoutSync";
import "./value-strip-services.css";

type Service = (typeof services)[number];

type ServiceCardSurfaceStyle = CSSProperties & {
  "--service-card-image"?: string;
  "--service-card-surface-bg"?: string;
  "--service-card-surface-fg"?: string;
};

/** Tall left, wide top-right, two squares on row two */
const BENTO_LAYOUT = [
  "services-bento__card--tall-left",
  "services-bento__card--wide-top",
  "services-bento__card--sq-mid-a",
  "services-bento__card--sq-mid-b",
] as const;

function ServiceBentoCard({
  service,
  layoutClass,
}: {
  service: Service;
  layoutClass: (typeof BENTO_LAYOUT)[number];
}) {
  const titleId = `service-title-${service.number}`;
  const cardBackgroundSrc =
    "cardBackgroundSrc" in service ? service.cardBackgroundSrc : undefined;
  const cardSurfaceBg =
    "cardSurfaceBg" in service ? service.cardSurfaceBg : undefined;
  const cardSurfaceFg =
    "cardSurfaceFg" in service ? service.cardSurfaceFg : undefined;

  const surfaceClassName = cardBackgroundSrc
    ? "services-bento__card-surface services-bento__card-surface--image"
    : cardSurfaceBg
      ? "services-bento__card-surface services-bento__card-surface--accent"
      : "services-bento__card-surface";

  const surfaceStyle: ServiceCardSurfaceStyle | undefined = cardBackgroundSrc
    ? { "--service-card-image": `url(${cardBackgroundSrc})` }
    : cardSurfaceBg
      ? {
          "--service-card-surface-bg": cardSurfaceBg,
          ...(cardSurfaceFg
            ? { "--service-card-surface-fg": cardSurfaceFg }
            : {}),
        }
      : undefined;

  return (
    <article
      id={`service-panel-${service.number}`}
      className={`services-bento__card ${layoutClass}`}
      aria-labelledby={titleId}
    >
      <div className={surfaceClassName} style={surfaceStyle}>
        {cardBackgroundSrc ? (
          <div className="services-bento__card-scrim" aria-hidden />
        ) : null}
        <div className="services-bento__card-copy">
          <div
            className={
              cardBackgroundSrc
                ? "services-bento__card-text services-bento__card-text--overlay"
                : "services-bento__card-text"
            }
          >
            <h3 id={titleId} className="services-bento__card-title">
              {service.navTitle}
            </h3>
            <p className="services-bento__card-lead">{service.description}</p>
          </div>
        </div>
      </div>
    </article>
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
            <h2 className="services-panel__title">
              <span className="services-panel__title-line">
                {servicesSection.titleLine1}
              </span>
              <span className="services-panel__title-line">
                {servicesSection.titleLine2}
              </span>
            </h2>
            <p className="services-panel__subtitle">
              <span className="services-panel__subtitle-line">
                {servicesSection.subtitleLine1}
              </span>
              <span className="services-panel__subtitle-line">
                {servicesSection.subtitleLine2}
              </span>
            </p>
          </header>

          <div className="services-bento">
            {services.map((service, index) => (
              <ServiceBentoCard
                key={service.number}
                service={service}
                layoutClass={BENTO_LAYOUT[index] ?? "services-bento__card--wide-a"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
