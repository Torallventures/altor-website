import {
  Building2,
  Globe,
  AppWindow,
  LayoutDashboard,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type ServiceItem = {
  slug: string;
  icon: LucideIcon;
  title: string;
  image: string;
  /** One-line pitch used on cards and the overview list */
  tagline: string;
  /** Overview paragraph shown on the services page */
  overview: string;
  /** Longer story for the detail page */
  story: string[];
  /** What's included — shown as check lists */
  features: string[];
  /** Who it is for */
  idealFor: string;
};

export const services: ServiceItem[] = [
  {
    slug: "residential-community-websites",
    icon: Building2,
    title: "Residential Community Websites",
    image: '/media/service-communities.webp',
    tagline:
      "Modern websites for residential buildings — everything your residents need, in one place.",
    overview:
      "A building's website should work as hard as its front desk. We build modern platforms for residential communities where residents can explore amenities, order products, get instant answers, and manage their accounts — without calling the office.",
    story: [
      "Residents expect the same digital experience from their building that they get from every other service in their life. A great community website becomes the front door of the property: it answers questions before they're asked and turns everyday tasks into a few taps.",
      "We build each platform around how your building actually runs — your amenities, your vendors, your residents — so management spends less time on the phone and residents feel taken care of.",
    ],
    features: [
      "Amenities showcase & booking",
      "Online product ordering for residents",
      "AI chatbot assistance, 24/7",
      "Resident e-portals & accounts",
      "Announcements and community updates",
      "Mobile-first design for on-the-go residents",
    ],
    idealFor:
      "Condominiums, apartment communities, HOAs, and property management companies that want happier residents and a quieter front desk.",
  },
  {
    slug: "business-websites",
    icon: Globe,
    title: "Business Websites",
    image: '/media/service-websites.webp',
    tagline:
      "Professional websites for any business, in any industry — sharp, fast, and built to win customers.",
    overview:
      "Your website is often the first conversation a customer has with your business. We design and develop sites that communicate what you do in seconds, build trust immediately, and turn visitors into calls, bookings, and sales.",
    story: [
      "A business website has one job: make the right impression fast and make the next step obvious. We start from your customers — what they're looking for, what convinces them, what makes them leave — and design every page around that journey.",
      "Every site ships fast-loading, mobile-first, and search-ready, on a foundation your business won't outgrow next year.",
    ],
    features: [
      "Custom design — never a template",
      "Mobile-first, lightning-fast pages",
      "SEO-ready structure from day one",
      "Clear calls to action that convert",
      "Easy content updates",
      "Analytics so you know what's working",
    ],
    idealFor:
      "Restaurants, clinics, law firms, contractors, retailers — any business that needs a website that actually brings in customers.",
  },
  {
    slug: "business-apps",
    icon: AppWindow,
    title: "Business Apps",
    image: '/media/service-apps.webp',
    tagline:
      "Custom applications for any business — web or mobile, built around the way your team actually works.",
    overview:
      "When off-the-shelf software almost fits, we build the app that actually does. From internal tools your team uses every day to customer-facing apps, we design and develop software shaped around your workflow — not the other way around.",
    story: [
      "Most businesses bend their process to fit their software. We think it should be the opposite. We sit with the people who'll use the app, map how work really flows, and build something that removes steps instead of adding them.",
      "Whether it's a field team on phones or an office on desktops, your app works everywhere your team does — secure, fast, and simple enough that nobody needs a manual.",
    ],
    features: [
      "Web and mobile apps (iOS & Android)",
      "Built around your real workflow",
      "Dashboards and real-time data",
      "Notifications, approvals & automation",
      "Integrations with tools you already use",
      "Secure logins and role-based access",
    ],
    idealFor:
      "Teams drowning in spreadsheets and WhatsApp threads — operations, logistics, services, and any business with a process that deserves its own app.",
  },
  {
    slug: "custom-management-systems",
    icon: LayoutDashboard,
    title: "Custom Management Systems",
    image: '/media/service-management.webp',
    tagline:
      "Tailor-made systems to manage your business — operations, inventory, clients, or anything else you need to run.",
    overview:
      "Run your whole business from one system built exactly for it. We develop custom management platforms that bring your operations, inventory, clients, and reporting into a single place — with the exact features you need and none you don't.",
    story: [
      "As a business grows, information scatters — orders in one place, clients in another, numbers in a spreadsheet only one person understands. A custom management system pulls it all together into one source of truth.",
      "Because it's built for you, it matches your terminology, your approval chains, and your reports. And when the business changes, the system changes with it.",
    ],
    features: [
      "Operations & workflow management",
      "Inventory, orders & vendors",
      "Client management (CRM)",
      "Reports and business analytics",
      "Roles, permissions & audit trails",
      "Automation for repetitive tasks",
    ],
    idealFor:
      "Growing businesses that have outgrown spreadsheets and generic software — property managers, distributors, service companies, and anyone running complex operations.",
  },
  {
    slug: "anything-digital",
    icon: Sparkles,
    title: "Anything Digital",
    image: '/media/service-digital.webp',
    tagline:
      "Whatever digital idea you have in mind — we make it happen. If it can be built, we can build it.",
    overview:
      "Have an idea that doesn't fit in a box? That's our favorite kind. From MVPs and prototypes to AI features, integrations, and products nobody has built before — if it's digital, we'll find a way to make it real.",
    story: [
      "Some of the best projects start as a sentence: \"wouldn't it be great if…\". We take that sentence seriously. We'll help you shape the idea, prove it with a working version, and grow it into a real product.",
      "No idea is too unusual — our job is to figure out how to build it, not to tell you why it can't be done.",
    ],
    features: [
      "Idea-to-launch product development",
      "Prototypes and MVPs, fast",
      "AI-powered features & chatbots",
      "Integrations between your systems",
      "E-commerce and online ordering",
      "Ongoing support after launch",
    ],
    idealFor:
      "Founders, dreamers, and businesses with a \"what if\" — anyone with a digital idea looking for a team to make it happen.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
