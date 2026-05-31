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
  line1: "Stop searching.",
  line2: "Start designing.",
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
  label: "Trusted by teams at",
  logos: [
    { name: "Google", src: "/logos/google.svg" },
    { name: "Northline" },
    { name: "Meridian" },
    { name: "Glenwood" },
    { name: "Atlas" },
    { name: "Horizon" },
    { name: "Pulse" },
    { name: "Vertex" },
    { name: "Ember" },
  ],
} as const;

export const valueStrip = [
  "Finding the right",
  "developer partner takes months.",
  "Starting with us takes days.",
] as const;

export const valueStripBento = [
  {
    gridArea: "cat-sport",
    label: "Brand systems",
    align: "right" as const,
    color: "#c94e1a",
    href: "#features",
  },
  {
    gridArea: "cat-tees",
    label: "Landing pages",
    color: "#ffca26",
    labelTone: "dark" as const,
    href: "#features",
  },
  {
    gridArea: "cat-hoodies",
    label: "Product UI",
    color: "#18542a",
    href: "#features",
  },
  {
    gridArea: "cat-ladies-shirts",
    label: "Web design",
    color: "#2563eb",
    href: "#features",
  },
  {
    gridArea: "cat-youth",
    label: "Mobile apps",
    color: "#7c3aed",
    href: "#features",
  },
  {
    gridArea: "cat-kids",
    label: "Design systems",
    color: "#db2777",
    href: "#features",
  },
  {
    gridArea: "cat-cologne",
    label: "Marketing sites",
    align: "right" as const,
    color: "#0d9488",
    href: "#features",
  },
  {
    gridArea: "cat-mens-shirts",
    label: "Ecommerce",
    color: "#ea580c",
    href: "#features",
  },
  {
    gridArea: "cat-intimate",
    label: "SaaS dashboards",
    color: "#4f46e5",
    href: "#features",
  },
  {
    gridArea: "banner",
    variant: "banner" as const,
    href: "#contact",
  },
] as const;

export const featuresSection = {
  label: "How we work",
  title: "You bring the rough version. We take it to launch.",
  titleLine1: "You bring the rough version.",
  titleLine2: "We take it",
  titleLine3: "to launch.",
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
  },
] as const;

export const caseStudiesSection = {
  label: "Stories",
  title: "Stories of our partners",
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
  line1: hero.line1,
  line2: hero.line2,
  subline: hero.subline,
  cta: hero.cta,
} as const;

export const socials = [
  { label: "Email", href: `mailto:${site.email}` },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X", href: "https://x.com" },
  { label: "Behance", href: "https://behance.net" },
] as const;

export const footer = {
  taglineLine1: "Web & brand design,",
  taglineLine2: "built to launch.",
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
