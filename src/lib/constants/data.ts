import { NavLink, Project, Service, Testimonial, FAQItem } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { id: "home", label: "Home", href: "#hero" },
  { id: "about-me", label: "About me", href: "#about" },
  { id: "projects", label: "projects", href: "#projects" },
  { id: "what-you-get", label: "What you get", href: "#overview" },
  { id: "services", label: "Services", href: "#services" },
  { id: "clients", label: "clients", href: "#testimonial" },
  { id: "faq", label: "Faq", href: "#faq" },
];

export const PROJECTS: Project[] = [
  {
    id: "1910ai",
    title: "1910.ai",
    tags: ["Components", "GSAP", "SEO"],
    href: "#",
    image: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/693a07b40e774226223d6d23_Frame-20116046242.avif",
    video: "https://f1-assets.b-cdn.net/Client%20-%201910%20(Background).mp4",
  },
  {
    id: "semiconbio",
    title: "SemiconBio",
    tags: ["CMS", "API", "Motion"],
    href: "#",
    image: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/693a080d17ca1d8d0c085a58_Frame-20116046298.avif",
  },
  {
    id: "happyring",
    title: "Happy Ring",
    tags: ["CMS", "GSAP", "SEO"],
    href: "#",
    image: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/693a07b45d5bf5df6ed763ff_Frame-20116046247.avif",
  },
  {
    id: "pssltd",
    title: "PSSLTD",
    tags: ["CMS", "GSAP", "Localization"],
    href: "#",
    image: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/693a07b45d5bf5df6ed763ff_Frame-20116046247.avif",
  },
  {
    id: "lilipad",
    title: "Lilipad",
    tags: ["CMS", "GSAP", "SEO"],
    href: "#",
    image: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/693a07b45d5bf5df6ed763ff_Frame-20116046247.avif",
  },
  {
    id: "omicron",
    title: "Omicron",
    tags: ["Webflow", "Motion"],
    href: "#",
    image: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/693a07b4c7536983db8aa94b_Frame-20116046243.avif",
  },
  {
    id: "puck",
    title: "Puck",
    tags: ["Components", "CMS", "GSAP"],
    href: "#",
    image: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/693a07b4ea501cfa7bfc61bc_Frame-20116046248.avif",
  },
  {
    id: "alosant",
    title: "Alosant",
    tags: ["Performance", "CMS", "API"],
    href: "#",
    image: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/693a07b48a5e0c4375823c97_Frame-20116046251.avif",
  },
  {
    id: "rayai",
    title: "RAY AI",
    tags: ["CMS", "GSAP", "Performance"],
    href: "#",
    image: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/693a07b45d5bf5df6ed763ff_Frame-20116046247.avif",
  },
];

export interface Capability {
  id: string;
  title: string;
  text: string;
  iconClass: string;
}

export const CAPABILITIES: Capability[] = [
  {
    id: "capa-1",
    title: "Webflow Development",
    text: "Fast, scalable websites with clean structure and a CMS setup that puts you in full control.",
    iconClass: "capa-settings-icon",
  },
  {
    id: "capa-2",
    title: "Custom Integrations",
    text: "Expanding Webflow's capabilities with APIs, third-party tools, and tailored functionality.",
    iconClass: "capa-seo-icon",
  },
  {
    id: "capa-3",
    title: "SEO-Ready Setup",
    text: "Optimized site structure, speed, and on-page SEO to help your website rank higher and stay visible.",
    iconClass: "capa-gsap-icon",
  },
  {
    id: "capa-4",
    title: "Creative & Interactive Motion",
    text: "Smooth animations and engaging user experiences powered by GSAP and custom interactions.",
    iconClass: "capa-performance-icon",
  },
];


export const SERVICES: Service[] = [
  {
    id: "ongoing",
    name: "Ongoing Support",
    price: "$3,000",
    hours: "/ 30hours",
    desc: "Your dedicated Webflow developer, 30 hours a month. Whatever your site needs, handled. Minimum 3 month commitment.",
    items: [
      "New pages, sections, and features",
      "Campaign-driven updates (modules, content blocks, assets)",
      "Maintenance, bug fixes, and content updates",
      "Technical SEO and performance optimization",
      "Unused hours roll over (up to 3 months)",
    ],
    footer: "For brands that need continuous growth and long-term collaboration.",
  },
  {
    id: "starter",
    name: "Starter Build",
    price: "$5,000",
    hours: "1-2 weeks",
    desc: "A clean Webflow site ready to launch in one to two weeks. Perfect for brands that need a solid online presence without the complexity.",
    items: [
      "Up to 6 pages",
      "CMS setup",
      "Mid-level animations and interactions",
      "Technical SEO setup",
      "Launch within one to two weeks",
      "Webflow Editor training after launch",
    ],
    footer: "For new sites or migrations that need a fast, clean start",
  },
  {
    id: "custom",
    name: "Custom Project",
    price: "Book a Call",
    hours: "Varies",
    desc: "High-end Webflow development for complex projects. Every scope is different, so every project starts with a conversation.",
    items: [
      "Advanced interaction and animation systems",
      "Scalable CMS architecture with multi-collection setups",
      "Complex layouts, modular components and dynamic content",
      "Integration ready structure for external tools and API driven features",
      "14 days post-launch support included",
    ],
    footer: "For complex projects that go beyond the basics and need a tailored approach.",
  },
];


export const TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-0",
    quote: "Trusted long-term collaborator.",
    author: "Danette Beal",
    role: "VP of Marketing",
    company: "Alosant.com",
    avatar: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/694ea7da98bd68220e4f1d95_Danette-20Beal.avif",
  },
  {
    id: "testimonial-1",
    quote: "Thinks through the entire experience.",
    author: "Petar Stojakovic",
    role: "Founder",
    company: "fiftyseven.co",
    avatar: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/6985e810b5401268eec901f2_petar_s.jpeg",
  },
  {
    id: "testimonial-2",
    quote: "Reliable, skilled, and easy to work with.",
    author: "Klemen Vute",
    role: "PM from Povio",
    company: "Povio.com",
    avatar: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/694ea7da275434728f43945b_Klemen-20Vute.avif",
  },
  {
    id: "testimonial-3",
    quote: "The details that set him apart.",
    author: "Johanna Dahlroos",
    role: "Co-Founder and Creative Director",
    company: "Moat Agency",
    avatar: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/6942a06175766f34258d7ba2_testimonial.avif",
  },
  {
    id: "testimonial-4",
    quote: "Design-focused, reliable development.",
    author: "Marko Ivanovic",
    role: "Founder",
    company: "Legacy Agency",
    avatar: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/694ea7da5c13ee5098356e14_Marko-20Ivanvoic.avif",
  },
  {
    id: "testimonial-5",
    quote: "A developer with a true product mindset.",
    author: "Chrissy Cowdrey",
    role: "Product/Web Designer",
    company: "Moat Agency",
    avatar: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/694ea7da5c13ee5098356e14_Marko-20Ivanvoic.avif",
  },
  {
    id: "testimonial-6",
    quote: "A proven expert you trust.",
    author: "Marko Ilic",
    role: "Founder",
    company: "see.design",
    avatar: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/694ea7da184f7fad9ddaeb59_Marko-20Ilic.avif",
  },
  {
    id: "testimonial-7",
    quote: "Exceptional leadership and technical ownership.",
    author: "Bart-Jan Leyts",
    role: "CEO",
    company: "Autorank.com",
    avatar: "/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/694ea7da275434728f43945f_Bart.avif",
  },
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-0",
    question: "Why Webflow instead of custom code?",
    answer: "Webflow gives you the best of both worlds. A platform your team can manage after launch, with the flexibility to build things that feel fully custom. I extend it with custom code and integrations so the result looks and performs like a fully coded site without needing a developer for every small change. For most businesses, that balance of control and independence is exactly what makes it worth it.",
  },
  {
    id: "faq-1",
    question: "Already have a Webflow site that needs work?",
    answer: "That's a big part of what I do. Whether your site needs a structural cleanup, better performance, new sections, or a CMS overhaul, I can step in and improve what's already there. I'll audit what you have, identify what's holding it back, and build a clear plan to get it where it should be. You don't need to start from scratch to get a site that feels fast, clean, and easy to manage.",
  },
  {
    id: "faq-2",
    question: "What’s the process from start to launch?",
    answer: "It starts with a conversation about your goals, timeline, and what success looks like. From there I put together a clear scope and plan. Once we align, I build in stages and share progress as I go so nothing drifts and feedback stays easy. The goal is always a smooth handoff with a site you actually know how to use.",
  },
  {
    id: "faq-3",
    question: "Do you work under NDA?",
    answer: "Yes. I've worked on projects that required strict confidentiality, from pre-launch products to internal tools, and I treat every client's work with the same level of discretion. I'm happy to sign an NDA before we even start talking details. Trust is a big part of why clients keep coming back, and that extends to how I handle sensitive information.",
  },
  {
    id: "faq-4",
    question: "Do you handle design, or only development?",
    answer: "Development is my core strength, but I'm not the kind of developer who needs every pixel handed to them. I have a strong eye for design and regularly collaborate with designers to refine layouts, spacing, and visual quality. If you have a design team, I'll work closely with them. If you're coming in with a rough direction, I can help shape things and bring in a designer from my network when needed.",
  },
  {
    id: "faq-5",
    question: "What does ongoing support look like?",
    answer: "You get a dedicated block of development hours each month that you can use however you need. New sections, layout improvements, performance fixes, campaign updates, CMS changes. I work as an extension of your team, not someone you have to re-brief every time. Hours roll over for up to three months so nothing goes to waste, and we keep a running priority list so the most impactful work always gets done first. It's built for brands that want their site to keep evolving, not just sit there after launch.",
  },
  {
    id: "faq-6",
    question: "How do you handle revisions and feedback?",
    answer: "Revisions are built into the process, not an afterthought. I share progress at key stages so you can give feedback while it's easy to adjust, not after everything is locked in. I keep a tight feedback loop through Slack or whatever your team already uses. If something doesn't feel right, just say so. I'd rather refine something twice than launch something you're not proud of.",
  },
  {
    id: "faq-7",
    question: "Not sure which plan fits your project?",
    answer: "No stress. Just reach out at nenad@popadic.co and tell me what you have in mind. I'll help you figure out the right option.",
  },
];
