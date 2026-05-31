"use client";

import { useEffect, useRef, useState } from "react";
import { header, mobileNav, site } from "@/lib/content";
import { tiltWarp } from "@/lib/fonts";
import { getAppScrollY, onAppScroll, scrollToHash } from "@/lib/lenis-scroll";
import { playPopSound, preloadPopSound } from "@/lib/playPopSound";
import { cn } from "@/lib/utils";

const HERO_ENTER_OFFSET = 100;
const HERO_EXIT_OFFSET = 160;
const NAV_THEME_TRANSITION =
  "transition-colors duration-500 ease-in-out motion-reduce:duration-150";
const NAV_ICON_TRANSITION =
  "transition-[background-color,transform,opacity] duration-500 ease-in-out motion-reduce:duration-150";

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
    playPopSound();
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
    preloadPopSound();
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
    <header className="fixed inset-x-0 top-0 z-50 overflow-visible px-4 pt-4 md:px-6 md:pt-5">
      <div className="flex w-full justify-center overflow-visible md:container-wide">
        <div
          ref={navPillRef}
          className={cn(
            "flex w-full items-center justify-between gap-2 overflow-visible rounded-[55px] px-4 py-1.5 md:w-auto md:max-w-3xl md:justify-start md:gap-4 md:px-4 md:py-2",
            NAV_THEME_TRANSITION,
            "h-[60px] md:h-[68px]",
            pastHero ? "bg-hero-bg" : "bg-background",
          )}
        >
          <a
            href="#hero"
            className={cn(
              "flex shrink-0 cursor-pointer items-center px-1.5 py-0.5 transition-[color,opacity] duration-500 ease-in-out hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:duration-150",
              pastHero
                ? "focus-visible:outline-white"
                : "focus-visible:outline-nav-accent",
            )}
            onClick={(event) => handleSectionLink(event, "#hero")}
          >
            <span
              className={cn(
                tiltWarp.className,
                "text-xl tracking-tight md:text-2xl",
                NAV_THEME_TRANSITION,
                pastHero ? "text-white" : "text-nav-text",
              )}
            >
              {site.logo}
            </span>
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
                        ? "font-extrabold text-hero-foreground"
                        : "font-semibold text-white hover:text-white/80"
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
              "ml-auto hidden shrink-0 rounded-[43px] px-5 py-2.5 font-[family-name:var(--font-inter)] text-base font-semibold hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 md:inline-flex",
              NAV_THEME_TRANSITION,
              pastHero
                ? "bg-hero-foreground text-foreground focus-visible:outline-hero-foreground"
                : "bg-black text-white focus-visible:outline-black",
            )}
            onClick={(event) => handleSectionLink(event, header.cta.href)}
          >
            {header.cta.label}
          </a>

          <button
            type="button"
            className={cn(
              "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-visible rounded-full md:hidden",
              NAV_THEME_TRANSITION,
              pastHero
                ? "text-white hover:bg-white/10"
                : "text-nav-text hover:bg-black/5",
            )}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
              className="overflow-visible"
            >
              <line
                x1="4"
                y1="7"
                x2="20"
                y2="7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ transformOrigin: "12px 12px" }}
                className={cn(
                  NAV_ICON_TRANSITION,
                  menuOpen && "translate-y-[5px] rotate-45",
                )}
              />
              <line
                x1="4"
                y1="12"
                x2="20"
                y2="12"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className={cn(
                  NAV_ICON_TRANSITION,
                  menuOpen && "scale-x-0 opacity-0",
                )}
              />
              <line
                x1="4"
                y1="17"
                x2="20"
                y2="17"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ transformOrigin: "12px 12px" }}
                className={cn(
                  NAV_ICON_TRANSITION,
                  menuOpen && "-translate-y-[5px] -rotate-45",
                )}
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={cn(
          "fixed inset-x-4 top-[calc(60px+1.25rem)] z-40 overflow-hidden rounded-3xl border border-border bg-background shadow-lg transition-all duration-300 md:hidden",
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
              "mt-2 rounded-[43px] px-5 py-3 text-center font-[family-name:var(--font-inter)] text-base font-semibold",
              NAV_THEME_TRANSITION,
              pastHero
                ? "bg-hero-foreground text-foreground"
                : "bg-black text-white",
            )}
            onClick={(event) => handleSectionLink(event, header.cta.href)}
          >
            {header.cta.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
