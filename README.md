# Studio Form — Agency Landing Page

A conversion-focused agency landing page inspired by [UMANO Design Studio](https://umanodesign.studio/), built with Next.js, Tailwind CSS, Framer Motion, and Lenis smooth scroll.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Page structure

```
Hero (+ device mockup)
Logo marquee
Value strip
Features (6 cards)
Case studies (with metrics)
FAQ (accordion)
CTA banner (+ contact)
Footer
```

## Edit content

All copy lives in one file:

- [`lib/content.ts`](lib/content.ts) — hero, clients, features, case studies, FAQ, CTA, contact

## Customize

| What | Where |
|------|--------|
| Colors & theme | [`app/globals.css`](app/globals.css) |
| Fonts | [`app/layout.tsx`](app/layout.tsx) |
| Motion | [`components/providers/SmoothScroll.tsx`](components/providers/SmoothScroll.tsx) |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |

## Deploy to Vercel

1. Push to GitHub.
2. Import at [vercel.com/new](https://vercel.com/new).
3. Update `metadataBase` and `site.email` in `lib/content.ts`.

## Accessibility

- Respects `prefers-reduced-motion` (disables Lenis, marquee, and shortens animations)
- Keyboard-focus styles on interactive elements
- FAQ accordion with `aria-expanded`
