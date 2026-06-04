"use client";

import { useEffect, useRef, useState } from "react";
import { header, mobileNav } from "@/lib/content";
import { CtaSlideLabel } from "@/components/ui/CtaSlideLabel";
import { LurkLogo } from "@/components/ui/LurkLogo";
import { getAppScrollY, onAppScroll, scrollToHash } from "@/lib/lenis-scroll";
import { playNavPopSound, preloadNavPopSound } from "@/lib/playPopSound";
import { cn } from "@/lib/utils";

const HERO_ENTER_OFFSET = 100;
const HERO_EXIT_OFFSET = 160;
const NAV_THEME_TRANSITION =
  "transition-colors duration-500 ease-in-out motion-reduce:duration-150";
const NAV_ICON_MORPH =
  "transition-[top,transform,opacity,scale] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none motion-reduce:duration-150";

function MenuToggleIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-[18px] w-[22px]" aria-hidden>
      <span
        className={cn(
          "absolute left-0 h-[2.5px] w-full origin-center rounded-full bg-current",
          NAV_ICON_MORPH,
          open ? "top-[7.75px] rotate-45" : "top-0 rotate-0",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-[7.75px] h-[2.5px] w-full origin-center rounded-full bg-current",
          NAV_ICON_MORPH,
          open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100",
        )}
      />
      <span
        className={cn(
          "absolute left-0 h-[2.5px] w-full origin-center rounded-full bg-current",
          NAV_ICON_MORPH,
          open ? "top-[7.75px] -rotate-45" : "top-[15.5px] rotate-0",
        )}
      />
    </span>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const navPillRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setMenuOpen(false);

  const handleSectionLink = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) return;

    event.preventDefault();
    playNavPopSound();
    closeMenu();
    scrollToHash(href);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (navPillRef.current?.contains(target)) return;
      if (mobileMenuRef.current?.contains(target)) return;
      closeMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    preloadNavPopSound();
  }, []);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const updatePastHero = () => {
      const scrollY = getAppScrollY();
      const heroBottom =
        hero.getBoundingClientRect().bottom + scrollY;

      setPastHero((wasPast) => {
        const threshold = wasPast
          ? heroBottom - HERO_EXIT_OFFSET
          : heroBottom - HERO_ENTER_OFFSET;
        return scrollY >= threshold;
      });
    };

    updatePastHero();
    const unsubscribe = onAppScroll(updatePastHero);
    window.addEventListener("resize", updatePastHero);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", updatePastHero);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 box-border w-full max-w-[100dvw] overflow-x-clip px-4 pt-4 md:px-6 md:pt-5">
      <div className="mx-auto flex w-full min-w-0 max-w-full justify-center md:container-wide">
        <div
          ref={navPillRef}
          className={cn(
            "flex w-full min-w-0 max-w-full items-center justify-between gap-2 overflow-hidden rounded-[55px] px-4 py-1.5 md:w-auto md:max-w-3xl md:justify-start md:gap-4 md:px-4 md:py-2",
            NAV_THEME_TRANSITION,
            "h-[60px] md:h-[68px] border-2",
            pastHero
              ? "border-transparent bg-hero-foreground"
              : "border-transparent bg-background",
          )}
        >
          <a
            href="#hero"
            className={cn(
              "flex shrink-0 cursor-pointer items-center px-1.5 py-0.5 transition-[color,opacity] duration-500 ease-in-out hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:duration-150",
              pastHero
                ? "focus-visible:outline-foreground"
                : "focus-visible:outline-nav-accent",
            )}
            aria-label="Lurk home"
            onClick={(event) => handleSectionLink(event, "#hero")}
          >
            <LurkLogo
              className={cn(
                NAV_THEME_TRANSITION,
                pastHero ? "text-hero-bg" : "text-black",
              )}
            />
          </a>

          <nav
            className="hidden min-w-0 flex-1 items-center md:flex"
            aria-label="Main navigation"
          >
            <div className="flex items-center gap-0.5">
              {header.links.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "shrink-0 rounded-lg px-2 py-1 font-[family-name:var(--font-inter)] text-base",
                    NAV_THEME_TRANSITION,
                    pastHero
                      ? item.highlight
                        ? "font-extrabold text-hero-bg hover:text-hero-bg/80"
                        : "font-semibold text-foreground hover:text-foreground/80"
                      : item.highlight
                        ? "font-extrabold text-hero-bg hover:text-hero-bg/80"
                        : "font-semibold text-nav-text hover:text-nav-accent",
                  )}
                  onClick={(event) => handleSectionLink(event, item.href)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          <a
            href={header.cta.href}
            className={cn(
              "group ml-auto hidden shrink-0 overflow-hidden rounded-[43px] px-5 py-2.5 font-[family-name:var(--font-inter)] text-base font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 md:inline-flex",
              NAV_THEME_TRANSITION,
              pastHero
                ? "bg-hero-bg text-white focus-visible:outline-hero-bg"
                : "bg-black text-white focus-visible:outline-black",
            )}
            onClick={(event) => handleSectionLink(event, header.cta.href)}
          >
            <CtaSlideLabel label={header.cta.label} />
          </a>

          <button
            type="button"
            className={cn(
              "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full md:hidden",
              NAV_THEME_TRANSITION,
              pastHero
                ? "text-foreground hover:bg-black/5"
                : "text-nav-text hover:bg-black/5",
            )}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuToggleIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={cn(
          "fixed inset-x-4 top-[calc(60px+1.25rem)] z-40 box-border max-w-[calc(100dvw-2rem)] overflow-hidden rounded-3xl border border-border bg-background shadow-lg transition-all duration-300 md:hidden",
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        aria-hidden={!menuOpen}
      >
        <nav
          className="flex flex-col gap-1 p-4"
          aria-label="Mobile navigation"
        >
          {mobileNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-xl px-4 py-3 font-[family-name:var(--font-inter)] text-lg transition-colors",
                item.highlight
                  ? "font-extrabold text-nav-accent"
                  : "font-semibold text-nav-text",
              )}
              onClick={(event) => handleSectionLink(event, item.href)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={header.cta.href}
            className={cn(
              "group mt-2 overflow-hidden rounded-[43px] px-5 py-3 text-center font-[family-name:var(--font-inter)] text-base font-semibold",
              NAV_THEME_TRANSITION,
              pastHero
                ? "bg-hero-bg text-white"
                : "bg-black text-white",
            )}
            onClick={(event) => handleSectionLink(event, header.cta.href)}
          >
            <CtaSlideLabel label={header.cta.label} />
          </a>
        </nav>
      </div>
    </header>
  );
}
