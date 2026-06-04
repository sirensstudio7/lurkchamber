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

export const aboutSection = {
  paragraphs: [
    [
      { type: "word", text: "We're" },
      { type: "word", text: "a" },
      { type: "word", text: "tech" },
      { type: "word", text: "studio" },
      { type: "word", text: "where" },
      { type: "word", text: "design" },
      { type: "word", text: "meets" },
      { type: "word", text: "code" },
      { type: "word", text: "—" },
      { type: "word", text: "building" },
      { type: "word", text: "websites," },
      { type: "word", text: "apps," },
      { type: "word", text: "and" },
      { type: "word", text: "digital" },
      { type: "word", text: "products" },
      { type: "word", text: "for" },
    ],
    [
      { type: "word", text: "founders" },
      { type: "word", text: "and" },
      { type: "word", text: "brands" },
      { type: "word", text: "who" },
      { type: "word", text: "refuse" },
      { type: "word", text: "to" },
      { type: "word", text: "blend" },
      { type: "word", text: "in." },
    ],
  ],
} as const;

export const clients = {
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
    { name: "NanoFi", src: "/logos/nanofi.png" },
    { name: "Core Club Connect", src: "/logos/core-club-connect.png" },
  ],
} as const;

/** Work highlight images live in public/work-highlights/. */
export const workHighlightsSection = {
  titleLine1: "Exploration Sparks",
  titleLine2: "Endless Creative Possibilities",
} as const;

export const workHighlights = [
  {
    imageSrc: "/work-highlights/work-highlight-01.png",
    imageAlt: "Podcast discovery platform value section",
  },
  {
    imageSrc: "/work-highlights/work-highlight-02.png",
    imageAlt: "Buzz marketing agency hero landing page",
  },
  {
    imageSrc: "/work-highlights/work-highlight-03.png",
    imageAlt: "Creelab creator dashboard",
  },
  {
    imageSrc: "/work-highlights/work-highlight-04.png",
    imageAlt: "Character profile status card UI",
  },
  {
    imageSrc: "/work-highlights/work-highlight-05.png",
    imageAlt: "Tanahub onboarding welcome screen",
  },
  {
    imageSrc: "/work-highlights/work-highlight-06.png",
    imageAlt: "Build Web3 education platform hero",
  },
  {
    imageSrc: "/work-highlights/work-highlight-07.png",
    imageAlt: "Ulala e-commerce product page",
  },
  {
    imageSrc: "/work-highlights/work-highlight-08.png",
    imageAlt: "Nebula Ship spaceship dashboard",
  },
  {
    imageSrc: "/work-highlights/work-highlight-09.png",
    imageAlt: "Strea live streaming platform dashboard",
  },
  {
    imageSrc: "/work-highlights/work-highlight-10.png",
    imageAlt: "Gaming map search and events dashboard",
  },
] as const;

export const servicesSection = {
  label: "Our services",
  titleLine1: "From rough idea",
  titleLine2: "to shipped product.",
  subtitleLine1: "UI, websites, mobile apps, and illustration.",
  subtitleLine2: "One team from sketch to launch.",
} as const;

export const services = [
  {
    number: "01",
    navTitle: "UI/UX Design",
    title: "Interfaces people actually enjoy using",
    description: "Product UI with clear flows. Considered, not template-built.",
    body: [
      "We start with who is using the product and what they are trying to finish in one session. Screens get sketched around jobs, not around a component library someone liked on Dribbble.",
      "Wireframes, prototypes, and high-fidelity UI share one system — type, color, spacing, and states — so engineering is not guessing between files.",
      "You get flows that are easy to test, easy to hand off, and easy to extend when the roadmap adds another feature next month.",
    ],
    imageSrc: "/img-1.png",
    cardBackgroundSrc: "/services/ui-ux-card-bg.png",
    cardColor: "#5b5bd6",
    cardTextColor: "#ffffff",
    points: [
      "User flows & information architecture",
      "Wireframes and interactive prototypes",
      "Design systems & component libraries",
      "Mobile and web product UI",
      "Usability-focused layout decisions",
      "Developer-ready Figma handoff",
    ],
  },
  {
    number: "02",
    navTitle: "Website Development",
    title: "Fast, polished sites built to last",
    description: "We build the site too. Clean code, works on phones.",
    body: [
      "Design and code stay in the same conversation. No static mockups thrown over a wall to a team that never met the person who drew the hero.",
      "We ship semantic markup, sensible animations, and stacks your team can maintain — modern frameworks, clean structure, and SEO basics baked in from day one.",
      "Launch includes the unglamorous work: forms, analytics hooks, redirects, and the fixes that only show up on a real device on slow Wi‑Fi.",
    ],
    imageSrc: "/img-5.png",
    cardSurfaceBg: brand.heroBg,
    cardSurfaceFg: brand.heroText,
    cardColor: "#0d9f6e",
    cardTextColor: "#ffffff",
    points: [
      "Marketing and company websites",
      "Responsive, accessible front-end builds",
      "CMS and content-driven pages",
      "Performance and Core Web Vitals",
      "Integrations, forms, and analytics",
      "Post-launch support and iterations",
    ],
  },
  {
    number: "03",
    navTitle: "Illustrations",
    title: "Custom art that fits your brand",
    description: "Logo, icons, and illustrations drawn for your brand.",
    body: [
      "Stock art dates your brand fast. We draw characters, scenes, and icons that match your type, color, and tone — whether the site is serious or playful.",
      "Illustrations are planned for where they live: hero, empty states, onboarding, social, and slide decks — exported in the formats your team actually uses.",
      "Style guides keep new artwork on-brand when marketing asks for one more graphic next quarter.",
    ],
    imageSrc: "/img-10.png",
    cardColor: "#e85a4a",
    cardTextColor: "#ffffff",
    points: [
      "Brand and spot illustrations",
      "Custom icon sets",
      "Marketing and social assets",
      "Onboarding and empty-state art",
      "Character and scene development",
      "Export for web, app, and print",
    ],
  },
  {
    number: "04",
    navTitle: "Mobile App",
    title: "iOS and Android apps that feel native",
    description: "iOS and Android apps that feel at home on each platform.",
    body: [
      "We map the flows people repeat daily — sign up, core action, settings, recovery — before picking fonts. Platform guidelines matter; your app should feel at home on iOS and Android.",
      "Design and build stay aligned: spacing, gestures, and empty states are specified the way mobile engineers need them, not as a website squeezed into a phone frame.",
      "From MVP to v2, we help you ship features without every release looking like it came from a different product.",
    ],
    imageSrc: "/img-3.png",
    cardColor: "#f5cc24",
    cardTextColor: "#0a0a0a",
    points: [
      "iOS and Android UI implementation",
      "Cross-platform and native approaches",
      "Onboarding and core user journeys",
      "Push, deep links, and app settings",
      "API-driven product screens",
      "Store-ready builds and iterations",
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
      "Who it's for and why now. We ask first — before pixels, not after.",
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
      "Big vision welcome. Bloated v1 isn't — we ship what matters on day one.",
    model: {
      src: "/models/anatomical_eye_ball.glb",
      motion: "watch",
      cameraRadius: "265%",
    },
  },
  {
    title: "You react before it's final",
    description:
      "Early drafts, not polished reveals — feedback while change is still cheap.",
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
      "We pick what fits your product — fast to ship, reliable to run.",
    visual: "fallingBlocks",
  },
  {
    title: "We keep you posted",
    description:
      "Updates when they matter. If we need you, we say so — no guessing.",
    visual: "phoneChat",
  },
  {
    title: "Launch isn't goodbye",
    description:
      "After launch, we fix, refine, and grow it when you're ready.",
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
    titleLine1: "From data chaos",
    titleLine2: "to clarity",
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
    titleLine1: "From complexity",
    titleLine2: "to scale",
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
    titleLine1: "From data",
    titleLine2: "to daily action",
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
  { label: "Instagram", href: "https://instagram.com" },
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
