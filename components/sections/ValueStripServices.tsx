"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { services, servicesSection } from "@/lib/content";
import { tiltWarp } from "@/lib/fonts";
import { ValueStripLayoutSync } from "@/components/sections/ValueStripLayoutSync";
import "./value-strip-services.css";

type Service = (typeof services)[number];

const MODAL_DRAG_CLOSE_PX = 96;

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className="services-panel__points-icon"
    >
      <circle cx="9" cy="9" r="9" fill="currentColor" />
      <path
        d="M5.25 9.25L7.75 11.75L12.75 6.75"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceDetailContent({
  service,
  titleId,
}: {
  service: Service;
  titleId: string;
}) {
  return (
    <>
      <div className="services-panel__detail-media">
        <Image
          src={service.imageSrc}
          alt=""
          fill
          unoptimized
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 42vw"
        />
      </div>
      <h3 id={titleId} className="services-panel__detail-title">
        {service.title}
      </h3>
      <div className="services-panel__detail-copy">
        {service.body.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>
      <p className="services-panel__points-label">What&apos;s included</p>
      <ul className="services-panel__points">
        {service.points.map((point) => (
          <li key={point}>
            <CheckIcon />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

function ExpandIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M13.75 6.75H10.25V5H15.5V10.25H13.75V6.75Z"
        fill="currentColor"
      />
      <path
        d="M6.75 10.25H5V15.5H10.25V13.75H6.75V10.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ModalCheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="services-panel__modal-list-icon"
    >
      <circle cx="8" cy="8" r="7" className="services-panel__modal-list-icon-solid" />
      <path
        className="services-panel__modal-list-icon-check"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m4.28-9.72a.75.75 0 1 0-1.06-1.06L7 9.44 5.03 7.47a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0z"
      />
    </svg>
  );
}

function ServiceModalContent({
  service,
  titleId,
}: {
  service: Service;
  titleId: string;
}) {
  return (
    <div className="services-panel__modal-layout">
      <header className="services-panel__modal-header-block">
        <p className="services-panel__modal-eyebrow">{service.navTitle}</p>
        <h2 id={titleId} className="services-panel__modal-title">
          {service.title}
        </h2>
        <p className="services-panel__modal-lead">{service.description}</p>
      </header>

      <ul className="services-panel__modal-list">
        {service.points.map((point) => (
          <li key={point}>
            <ModalCheckIcon />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <div className="services-panel__modal-media">
        <Image
          src={service.imageSrc}
          alt=""
          fill
          unoptimized
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>

      <div className="services-panel__modal-copy">
        {service.body.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="currentColor"
      aria-hidden
    >
      <path d="m8.002 7.266 4.236-4.234 1.238 1.237-4.237 4.234 4.233 4.232-1.238 1.237-4.232-4.231-4.236 4.236-1.238-1.237 4.237-4.237-4.24-4.239 1.237-1.237 4.24 4.24Z" />
    </svg>
  );
}

export function ValueStripServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalService, setModalService] = useState<Service | null>(null);
  const modalTitleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalDragStartY = useRef(0);
  const modalDragActive = useRef(false);
  const [modalDragY, setModalDragY] = useState(0);
  const [modalDragAnimating, setModalDragAnimating] = useState(false);
  const [isModalDragging, setIsModalDragging] = useState(false);
  const active = services[activeIndex];

  const closeModal = () => setModalService(null);

  const resetModalDrag = () => {
    modalDragStartY.current = 0;
    modalDragActive.current = false;
    setModalDragY(0);
    setModalDragAnimating(false);
    setIsModalDragging(false);
  };

  const onModalDragPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    modalDragStartY.current = event.clientY;
    modalDragActive.current = true;
    setIsModalDragging(true);
    setModalDragAnimating(false);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onModalDragPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!modalDragActive.current) return;

    setModalDragY(Math.max(0, event.clientY - modalDragStartY.current));
  };

  const finishModalDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!modalDragActive.current) return;

    modalDragActive.current = false;
    setIsModalDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);

    const offset = Math.max(0, event.clientY - modalDragStartY.current);

    if (offset >= MODAL_DRAG_CLOSE_PX) {
      resetModalDrag();
      closeModal();
      return;
    }

    setModalDragAnimating(true);
    setModalDragY(0);
  };

  useEffect(() => {
    if (!modalService) {
      resetModalDrag();
      return;
    }

    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalService(null);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalService]);

  return (
    <section
      id="services"
      className="services-section overflow-visible bg-background py-24 md:py-32"
      aria-label="Our services"
    >
      <ValueStripLayoutSync />
      <div className="container-wide services-panel__inner">
        <div className="services-panel__layout">
          <div className="services-panel__nav-col">
            <div className="services-panel__nav-sticky">
              <p className="services-panel__label">{servicesSection.label}</p>
              <h2 className={`services-panel__title ${tiltWarp.className}`}>
                <span className="block lg:inline">{servicesSection.titleLine1}</span>{" "}
                <span className="block lg:inline">{servicesSection.titleLine2}</span>
              </h2>
              <p className="services-panel__intro">{servicesSection.intro}</p>

              <div className="services-panel__cards-scroll">
                <ul
                  className="services-panel__cards"
                  aria-label="Browse services"
                >
                  {services.map((service) => (
                    <li key={service.number}>
                      <button
                        type="button"
                        className="services-panel__card"
                        style={
                          {
                            "--service-card-bg": service.cardColor,
                            "--service-card-text": service.cardTextColor,
                          } as CSSProperties
                        }
                        aria-haspopup="dialog"
                        aria-expanded={modalService?.number === service.number}
                        onClick={() => setModalService(service)}
                      >
                        <span className="services-panel__card-expand">
                          <ExpandIcon />
                        </span>

                        <div className="services-panel__card-text">
                          <h3 className="services-panel__card-title">
                            {service.navTitle}
                          </h3>
                          <p className="services-panel__card-subtitle">
                            {service.title}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <ul
                className="services-panel__nav"
                role="tablist"
                aria-label="Services"
              >
                {services.map((service, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <li key={service.number}>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`service-panel-${service.number}`}
                        id={`service-tab-${service.number}`}
                        className={`services-panel__nav-btn${isActive ? " is-active" : ""}`}
                        onClick={() => setActiveIndex(index)}
                      >
                        <span className="services-panel__nav-num">
                          {service.number}
                        </span>
                        <span className="services-panel__nav-name">
                          {service.navTitle}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="services-panel__details">
            <article
              key={active.number}
              id={`service-panel-${active.number}`}
              role="tabpanel"
              aria-labelledby={`service-tab-${active.number}`}
              className="services-panel__detail is-active"
            >
              <ServiceDetailContent
                service={active}
                titleId={`service-title-${active.number}`}
              />
            </article>
          </div>
        </div>
      </div>

      {modalService ? (
        <div className="services-panel__modal-root">
          <button
            type="button"
            className="services-panel__modal-backdrop"
            aria-label="Close service details"
            onClick={closeModal}
            style={
              modalDragY > 0
                ? {
                    opacity: Math.max(
                      0.15,
                      0.45 - modalDragY / (MODAL_DRAG_CLOSE_PX * 2.5),
                    ),
                  }
                : undefined
            }
          />
          <div
            className={`services-panel__modal${isModalDragging || modalDragY > 0 ? " is-dragging" : ""}${modalDragAnimating ? " is-drag-snap-back" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
            style={
              modalDragY > 0 ? { transform: `translateY(${modalDragY}px)` } : undefined
            }
          >
            <div className="services-panel__modal-inner">
              <div
                className="services-panel__modal-drag-wrap"
                aria-hidden
                onPointerDown={onModalDragPointerDown}
                onPointerMove={onModalDragPointerMove}
                onPointerUp={finishModalDrag}
                onPointerCancel={resetModalDrag}
              >
                <span className="services-panel__modal-drag" />
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                className="services-panel__modal-close"
                aria-label="Close dialog"
                onClick={closeModal}
              >
                <CloseIcon />
              </button>
              <div className="services-panel__modal-body">
                <ServiceModalContent
                  service={modalService}
                  titleId={modalTitleId}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
