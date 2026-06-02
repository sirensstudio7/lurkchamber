export const brand = {
  heroBg: "#C94E1A",
  heroText: "#FCCC24",
} as const;

export const site = {
  logo: "Lurk.",
  name: "Lurk.",
  nameLine1: "Lurk.",
  nameLine2: "",
  tagline: "Web & Brand Design Studio",
  description:
    "A dedicated design studio crafting premium websites, visual identities, and product experiences for brands that want to be remembered.",
  email: "hello@lurkchamber.com",
  year: new Date().getFullYear(),
  metadataBase: "https://studioform.co",
} as const;

export const hero = {
  line1: "Creative minds.",
  line2: "Remarkable results.",
  sublineBefore: "We help you build ",
  sublineAfter: " that feel like our own personal projects.",
  rotatingServices: [
    "Mobile App",
    "Landing Pages",
    "Ecommerce",
    "LMS",
    "SaaS",
    "Website",
  ],
  subline:
    "We help you build SaaS that feel like our own personal projects.",
  cta: { label: "Let's talk!", href: "#contact" },
  secondaryCta: { label: "See our work", href: "#stories" },
  mockupNotification: {
    title: "Project delivered",
    body: "Your design has been delivered",
  },
} as const;

export const header = {
  cta: { label: "Start today", href: "#contact" },
  links: [
    { label: "Design Studio", href: "#features", highlight: true },
    { label: "Stories", href: "#stories", highlight: false },
    { label: "FAQ", href: "#faq", highlight: false },
  ],
} as const;

export const mobileNav = [
  ...header.links,
  { label: "Contact", href: "#contact", highlight: false as const },
] as const;

export const clients = {
  labelLine1: "Trusted by the world's fastest growing startups",
  labelLine2: "and established brands.",
  logos: [
    {
      name: "Termiz Iqtisodiyot va Servis Universiteti",
      src: "/logos/termiz-university.png",
    },
    { name: "Biofarma Group", src: "/logos/biofarma.png" },
    {
      name: "Google Student Ambassador",
      src: "/logos/google-student-ambassador-v2.png",
    },
    { name: "EDU HUB", src: "/logos/edu-hub.png" },
    { name: "ASOBI", src: "/logos/asobi.png" },
    { name: "Mora", src: "/logos/mora.png" },
    { name: "Padel Society HUB", src: "/logos/padel-society-hub.png" },
    { name: "Bridge Media Ent.", src: "/logos/bridge-media.png" },
  ],
} as const;

/** Work highlight images live in public/ (img-1…img-11, media-12…media-20). */
export const workHighlightsSection = {
  title: "Highlight Work",
  intro: "Selected UI and product work from recent collaborations.",
} as const;

export const workHighlights = [
  { imageSrc: "/img-1.png", imageAlt: "Image 1" },
  { imageSrc: "/img-2.png", imageAlt: "Image 2" },
  { imageSrc: "/img-3.png", imageAlt: "Image 3" },
  { imageSrc: "/img-4.png", imageAlt: "Image 4" },
  { imageSrc: "/img-5.png", imageAlt: "Image 5" },
  { imageSrc: "/img-6.png", imageAlt: "Image 6" },
  { imageSrc: "/img-7.png", imageAlt: "Image 7" },
  { imageSrc: "/img-8.png", imageAlt: "Image 8" },
  { imageSrc: "/img-9.png", imageAlt: "Image 9" },
  { imageSrc: "/img-10.png", imageAlt: "Image 10" },
  { imageSrc: "/img-11.png", imageAlt: "Image 11" },
  { imageSrc: "/media-12.png", imageAlt: "Image 12" },
  { imageSrc: "/media-13.png", imageAlt: "Image 13" },
  { imageSrc: "/media-14.png", imageAlt: "Image 14" },
  { imageSrc: "/media-15.png", imageAlt: "Image 15" },
  { imageSrc: "/media-16.png", imageAlt: "Image 16" },
  { imageSrc: "/media-17.png", imageAlt: "Image 17" },
  { imageSrc: "/media-18.png", imageAlt: "Image 18" },
  { imageSrc: "/media-19.png", imageAlt: "Image 19" },
  { imageSrc: "/media-20.png", imageAlt: "Image 20" },
] as const;

export const servicesSection = {
  label: "Our services",
  titleLine1: "Everything in",
  titleLine2: "one workflow.",
  intro:
    "We offer services that help your business design, ship, and grow online. Tap below to explore.",
} as const;

export const services = [
  {
    number: "01",
    navTitle: "Websites",
    title: "Brand websites that feel memorable",
    description:
      "Sites with real personality and polish — designed to feel like yours, not a template with your logo dropped in.",
    body: [
      "A lot of company sites look identical. Same hero, same three column feature grid, same footer packed with links nobody clicks. Before we open Figma, we ask who is visiting and what they need to understand in the first ten seconds.",
      "Then we sketch the pages that matter for your business. Homepage, work, pricing, hiring, whatever you actually need. Not a sitemap copied from the last client because it looked good in a presentation.",
      "Type, color, and motion come after structure, not before. You get annotated files, assets exported the way your dev asked for them, and we stay in the thread for the small fixes that only show up on a real phone.",
    ],
    imageSrc: "/img-1.png",
    cardColor: "#0d9f6e",
    cardTextColor: "#ffffff",
    points: [
      "Custom homepage & inner page layouts",
      "Responsive design across all breakpoints",
      "Design system & reusable component library",
      "Typography, color, and spacing tokens",
      "Developer-ready Figma handoff & assets",
      "Launch support & post-ship refinements",
    ],
  },
  {
    number: "02",
    navTitle: "Landing pages",
    title: "Pages built to convert from day one",
    description:
      "High-conversion pages with clear story, sharp visuals, and flows that turn visitors into sign-ups.",
    body: [
      "Most landing pages lose people on the first screen. The offer is buried, the headline is vague, and by the third scroll someone already opened another tab.",
      "We put the story in order. What it is. Why it matters. Proof it works. What to do next. Every section earns its spot. If something is filler, we cut it or say so out loud.",
      "You leave with a page ready to build. Sections are modular so you can swap a headline or testimonial block after a test without tearing the whole layout apart.",
    ],
    imageSrc: "/img-5.png",
    cardColor: "#5b5bd6",
    cardTextColor: "#ffffff",
    points: [
      "Conversion-focused page structure",
      "Hero, proof, features & CTA sections",
      "Copy-led layout hierarchy",
      "Mobile-first responsive layouts",
      "A/B-ready section variations",
      "Launch-ready design in weeks, not months",
    ],
  },
  {
    number: "03",
    navTitle: "Mobile apps",
    title: "Native-feeling product UI",
    description:
      "iOS and Android interfaces that feel intentional — polished flows, consistent patterns, and details users notice.",
    body: [
      "Users notice when an app feels cheap. Buttons too small. Back navigation in the wrong place. A spinner that looks like the app froze.",
      "We walk through the flows that actually get used. Sign up. The main action. Settings. The screens people see when something breaks.",
      "iOS and Android each get UI that respects the platform. Not a website squeezed into a phone frame. Your dev team gets named screens, spacing specs, and a prototype they can tap through before writing the first line of code.",
    ],
    imageSrc: "/img-3.png",
    cardColor: "#f5cc24",
    cardTextColor: "#0a0a0a",
    points: [
      "Core user flows & interaction design",
      "iOS and Android UI patterns",
      "Onboarding, settings & profile screens",
      "Micro-interactions & state design",
      "Prototype-ready screen sets",
      "Design specs for engineering handoff",
    ],
  },
  {
    number: "04",
    navTitle: "Ecommerce",
    title: "Stores that feel premium and effortless",
    description:
      "Online shops where browsing feels good and checkout feels fast — without sacrificing brand or trust.",
    body: [
      "If a customer cannot pick a size, see the total, or find checkout in two taps, you lost the sale before ads could help.",
      "We treat browse, product page, cart, and checkout as one continuous experience. Same type, same spacing rules, same voice from empty cart to order confirmation.",
      "Mobile gets the extra pass. That is where most people shop and where most checkouts get abandoned halfway through.",
    ],
    imageSrc: "/img-8.png",
    cardColor: "#e85a4a",
    cardTextColor: "#ffffff",
    points: [
      "Storefront & collection page design",
      "Product detail & variant selection UX",
      "Cart, checkout & order confirmation",
      "Trust signals & review placement",
      "Mobile shopping experience",
      "Brand-consistent visual language",
    ],
  },
  {
    number: "05",
    navTitle: "SaaS",
    title: "Dashboards and scalable design systems",
    description:
      "Complex product UI made clear — dashboards, settings, onboarding, and patterns that grow with your team.",
    body: [
      "Product teams ship fast. One new table this sprint, a settings redesign next month, a wizard nobody asked for in between. Pretty soon every screen looks like it came from a different app.",
      "We design around the tasks people repeat daily. Log in. Do the work. Pull the report. Undo the mistake they made at 4pm.",
      "Shared components for tables, filters, forms, and empty states keep new features from feeling like side quests. Devs get tokens and a short doc, not a graveyard of one off frames.",
    ],
    imageSrc: "/media-14.png",
    cardColor: "#3ecfad",
    cardTextColor: "#0a0a0a",
    points: [
      "Dashboard & analytics interface design",
      "Onboarding, billing & settings flows",
      "Tables, filters, forms & modals",
      "Scalable component & token system",
      "Admin panels & role-based views",
      "Documentation for design-dev alignment",
    ],
  },
  {
    number: "06",
    navTitle: "LMS",
    title: "Learning platforms people stick with",
    description:
      "Course layouts, progress tracking, and interfaces that keep learners engaged instead of lost in menus.",
    body: [
      "Learning apps are used in fragments. Someone opens a lesson on Tuesday, forgets until Saturday, and opens the app feeling lost. That is fixable in the UI.",
      "Modules stay short. Progress shows up without turning the dashboard into a video game. Instructors can see who stalled without digging through three admin panels.",
      "We favor readable type and quiet layouts over decorative clutter. People are here to learn, not to admire the illustration budget.",
    ],
    imageSrc: "/img-7.png",
    cardColor: "#9b87f5",
    cardTextColor: "#ffffff",
    points: [
      "Course & lesson page structure",
      "Progress tracking & enrollment UX",
      "Quizzes, certificates & assessments",
      "Instructor & admin dashboards",
      "Content-heavy layouts done right",
      "Accessible, readable typography systems",
    ],
  },
] as const;

export const featuresSection = {
  label: "How we work",
  title: "You bring the rough version. We take it to launch.",
  titleLine1: "You bring the rough version.",
  titleLine2: "We take it",
  titleLine3: "to launch.",
  titleMobileLine1: "You bring the",
  titleMobileLine2: "rough version.",
  titleMobileLine3: "We take it",
  titleMobileLine4: "to launch.",
} as const;

export const featuresExpandAbout = {
  circularText: "LURK",
  titleLine1: "Small studio.",
  titleLine2: "Serious about screens.",
  paragraphs: [
    "We are Lurk. There are not many of us, which is kind of the point. We design and build websites, mobile apps, online shops, SaaS tools, landing pages, and learning sites for people who notice when a layout feels off.",
    "Show up with a rough idea and a deadline that already scares you a little. We will draw it out, argue kindly about the hero section, build the thing, and help you ship something you actually want to text to your team.",
  ],
} as const;

export const featurePhoneChat = {
  clientName: "Alex",
  studioName: site.logo,
  messages: [
    { from: "client", text: "Any update on the homepage?" },
    {
      from: "lurk",
      text: "Drafts are in your inbox — tell me what jumps out.",
    },
    { from: "client", text: "Love the hero. Darker footer?" },
    { from: "lurk", text: "On it. Revision tonight." },
    { from: "client", text: "Can't wait to see the update!" },
    { from: "client", text: "Thank you!" },
  ],
} as const;

export const features = [
  {
    title: "We start with the why",
    description:
      "What are you making, who is it for, and why now? We ask first — otherwise we're just decorating a guess.",
    model: {
      src: "/models/magnifying_glass.glb",
      motion: "float",
      baseOrientation: [7, 70, 0],
      cameraTheta: 0,
    },
  },
  {
    title: "We cut it down to size",
    description:
      "Big vision is welcome. A bloated first launch is not — we help you ship what matters on day one.",
    model: {
      src: "/models/anatomical_eye_ball.glb",
      motion: "watch",
      cameraRadius: "265%",
    },
  },
  {
    title: "You react before it's final",
    description:
      "You see drafts early, while we can still change our minds — not a polished reveal that misses the point.",
    model: {
      src: "/models/folder.glb",
      motion: "float",
      baseOrientation: [55.42, 4.85, 84.13],
      cameraTheta: 0,
      cameraRadius: "135%",
    },
  },
  {
    title: "We build, not just draw",
    description:
      "Every product needs something different. We pick the approach that fits yours — fast to ship, reliable to run, easy to grow.",
    visual: "fallingBlocks",
  },
  {
    title: "We keep you posted",
    description:
      "You'll hear from us when it matters. If something's off or we need a call, we say so — no guessing games.",
    visual: "phoneChat",
  },
  {
    title: "Launch isn't goodbye",
    description:
      "Once it's live, we fix what breaks, adjust what feels wrong, and grow it when you're ready for more.",
    model: {
      src: "/models/house_palm_plant.glb",
      motion: "float",
      cameraRadius: "125%",
    },
  },
] as const;

export const caseStudiesSection = {
  label: "Stories",
  title: "Stories of our partners",
  intro: "What founders and teams say after we ship together.",
} as const;

export const caseStudies = [
  {
    tags: ["Fintech", "Product UI"],
    title: "From data chaos to clarity",
    quote:
      "Lurk structured our product from MVP to launch and helped us raise $4M with a cohesive brand system our users actually trust.",
    clientName: "Sarah Chen",
    role: "CEO, Northline",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
  },
  {
    tags: ["SaaS", "Design system"],
    title: "From complexity to scale",
    quote:
      "They joined from day one — research, product design, and brand from scratch — and delivered a system that kept up as our team doubled.",
    clientName: "Marcus Webb",
    role: "Founder, Meridian",
    image:
      "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: false,
  },
  {
    tags: ["Climate tech", "Dashboard"],
    title: "From data to daily action",
    quote:
      "Core flows and the visual layer were redesigned with care. Engagement on key actions improved as we grew to 50K daily users.",
    clientName: "Elena Ruiz",
    role: "Product Lead, Glenwood",
    image:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: false,
  },
] as const;

export const faqSection = {
  label: "Frequently asked questions",
  titleLine1: "Frequently asked",
  titleLine2: "questions",
  intro: "Everything you need to know before getting started.",
} as const;

export const faq = [
  {
    question: "How much does it cost?",
    answer:
      "Every project is scoped to your needs. Reach out and we'll discuss goals, timeline, and a transparent quote — no one-size-fits-all pricing.",
  },
  {
    question: "We already have a design team. Can you still help?",
    answer:
      "Absolutely. We integrate into your existing workflow and tools — Figma, Notion, Slack, Linear. Think of us as an extension of your team, not a replacement.",
  },
  {
    question: "Who will work on my project?",
    answer:
      "A dedicated senior designer with experience shipping products at startups and scale-ups. They own your project end to end — no handoffs, no junior rotations.",
  },
  {
    question: "What can you design?",
    answer:
      "Everything a founding designer would handle: mobile apps, SaaS products, websites, landing pages, design systems, dashboards, branding, and developer handoff.",
  },
  {
    question: "How fast can you start?",
    answer:
      "Most engagements kick off within a few days. Book a call, tell us what you need, and we'll align on scope and timeline right away.",
  },
  {
    question: "How long does a project usually take?",
    answer:
      "It depends on scope — a landing page might take a few weeks, a full product or brand system several months. We'll give you a clear timeline upfront and keep you updated as we go.",
  },
  {
    question: "Do you work with early-stage startups?",
    answer:
      "Yes — many of our partners are pre-seed to Series A. We help you focus on what ships first, not a bloated roadmap you'll never finish.",
  },
  {
    question: "What do you need from us to begin?",
    answer:
      "A short brief on what you're building, who it's for, and any constraints — timeline, budget, existing brand. Links to references or a rough Figma are helpful but not required.",
  },
  {
    question: "Do you stay involved after launch?",
    answer:
      "We can. Many clients keep us on for iterations, new features, or design system upkeep once the first version is live.",
  },
] as const;

export const ctaBanner = {
  line1: "Talk first.",
  line2: "Pixel later.",
  sublineLine1: "Half-baked idea? Tight timeline?",
  sublineLine2: "We've shipped from worse. Tell us what you're making.",
  cta: hero.cta,
} as const;

export const socials = [
  { label: "Email", href: `mailto:${site.email}` },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X", href: "https://x.com" },
  { label: "Behance", href: "https://behance.net" },
] as const;

export const footer = {
  taglineLine1: "You bring the idea.",
  taglineLine2: "We ship version one.",
  links: [
    { label: "Design Studio", href: "#features" },
    { label: "Stories", href: "#stories" },
    { label: "FAQ", href: "#faq" },
  ],
  company: [
    { label: "Contact", href: "#contact" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms", href: "#" },
  ],
  cta: header.cta,
  copyright: `${site.logo.toUpperCase().replace(".", "")} DESIGN STUDIO`,
} as const;
