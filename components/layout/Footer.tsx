"use client";

import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { FaBehance, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { LurkLogo } from "@/components/ui/LurkLogo";
import { footer, site, socials } from "@/lib/content";
import { scrollToHash } from "@/lib/lenis-scroll";
import { playPopSound } from "@/lib/playPopSound";
import { cn } from "@/lib/utils";

function FooterLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) return;

    event.preventDefault();
    playPopSound();
    scrollToHash(href);
  };

  return (
    <a
      href={href}
      className={cn(
        "font-[family-name:var(--font-inter)] text-[17px] font-semibold leading-[1.6] text-[#0a0d12] no-underline transition-colors hover:text-hero-bg",
        className,
      )}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <p className="mb-4 font-[family-name:var(--font-inter)] text-[13px] font-medium uppercase tracking-[0.5px] text-[#535862]">
        {title}
      </p>
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <FooterLink key={link.href + link.label} href={link.href}>
            {link.label}
          </FooterLink>
        ))}
      </div>
    </div>
  );
}

const socialIconClass = "h-5 w-5";

function SocialIcon({ label }: { label: string }) {
  switch (label) {
    case "Email":
      return <EnvelopeIcon className={socialIconClass} aria-hidden />;
    case "Instagram":
      return <FaInstagram className={socialIconClass} aria-hidden />;
    case "X":
      return <FaXTwitter className={socialIconClass} aria-hidden />;
    case "Behance":
      return <FaBehance className={socialIconClass} aria-hidden />;
    default:
      return null;
  }
}

function FooterSocialLink({
  label,
  href,
  onClick,
  ariaLabel,
}: {
  label: string;
  href: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const className =
    "inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#f3f0e8] text-[#0a0d12] transition-colors hover:bg-[#ebe5d8] hover:text-hero-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hero-bg";

  if (onClick) {
    return (
      <button
        type="button"
        className={className}
        aria-label={ariaLabel ?? label}
        onClick={onClick}
      >
        <SocialIcon label={label} />
      </button>
    );
  }

  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel ?? label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      <SocialIcon label={label} />
    </a>
  );
}

function LurkMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={className}
    >
      <circle cx="18" cy="22" r="6" fill="#fff" />
      <circle cx="18" cy="22" r="2.5" fill="#c94e1a" />
      <path
        d="M28 14C36 14 42 20 42 28C42 36 36 42 28 42"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Footer() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

  return (
    <footer className="flex flex-col bg-surface pb-12 pt-10 md:pb-12 md:pt-10">
      <div className="container-wide">
        <div className="flex flex-col gap-6 md:flex-row md:gap-6">
        <div className="relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#d45a24] to-[#a33d12] p-8 md:min-h-[320px] md:basis-[380px] md:shrink-0 md:grow-0 md:p-10 md:pr-8">
          <a
            href="#hero"
            className="inline-flex shrink-0 items-center transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            aria-label="Lurk home"
            onClick={(event) => {
              event.preventDefault();
              playPopSound();
              scrollToHash("#hero");
            }}
          >
            <LurkLogo className="h-6 w-auto text-white md:h-7" />
          </a>

          <div>
            <p className="m-0 font-[family-name:var(--font-inter)] text-lg font-semibold leading-snug text-white">
              {footer.taglineLine1}
            </p>
            <p className="m-0 font-[family-name:var(--font-inter)] text-lg font-normal leading-snug text-white/70">
              {footer.taglineLine2}
            </p>
          </div>
        </div>

        <div className="relative flex min-h-[280px] flex-1 flex-col justify-between overflow-hidden rounded-3xl bg-white p-8 md:min-h-[320px] md:p-10">
          <div
            aria-hidden
            className="absolute -right-3 -top-3 flex h-24 w-24 rotate-12 items-center justify-center rounded-[22px] bg-gradient-to-br from-[#d45a24] to-[#a33d12] shadow-[0_8px_32px_rgba(201,78,26,0.3)]"
          >
            <LurkMark className="h-[50px] w-[42px]" />
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-12 lg:gap-16">
            <FooterColumn title="Links" links={footer.links} />
            <FooterColumn title="Company" links={footer.company} />
            <div>
              <p className="mb-4 font-[family-name:var(--font-inter)] text-[13px] font-medium uppercase tracking-[0.5px] text-[#535862]">
                Connect
              </p>
              <ul className="flex flex-wrap gap-2">
                {socials.map((social) => (
                  <li key={social.label}>
                    <FooterSocialLink
                      label={social.label}
                      ariaLabel={
                        social.label === "Email" && copied
                          ? "Email copied"
                          : social.label
                      }
                      href={social.href}
                      onClick={
                        social.label === "Email" ? copyEmail : undefined
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <p className="m-0 font-[family-name:var(--font-inter)] text-[13px] text-[#535862]">
              © {site.year} {footer.copyright}. All rights reserved.
            </p>
            <FooterLink
              href={footer.cta.href}
              className="inline-block rounded-full bg-[#0a0d12] px-7 py-3 text-sm font-semibold text-white hover:text-white"
            >
              {footer.cta.label}
            </FooterLink>
          </div>
        </div>
        </div>

        <div className="relative pt-10">
          <svg
          viewBox="0 0 900 85"
          preserveAspectRatio="xMidYMid meet"
          className="block h-auto w-full"
          aria-hidden
        >
          <text
            x="450"
            y="70"
            textAnchor="middle"
            fill="rgba(0, 0, 0, 0.06)"
            style={{
              fontFamily: '"Tilt Warp", var(--font-tilt-warp), sans-serif',
              fontSize: "80px",
              letterSpacing: "-0.04em",
            }}
          >
            {site.email}
          </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}
