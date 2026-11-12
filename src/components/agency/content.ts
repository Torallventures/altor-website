import { lumeraTemplateUrl } from '@/lib/portfolio';

export type WorkItem = { title: string; detail: string; image: string; href: string; category: string; video?: string; external?: boolean };
export const workItems: WorkItem[] = [
  { title: 'Lumera', detail: 'Interactive condominium website & portal', image: '/media/torall-lumera-poster.jpg', video: '/media/torall-lumera-reel.mp4', href: lumeraTemplateUrl, category: 'Portals', external: true },
  { title: 'Websites with purpose', detail: 'Business websites · Design & development', image: '/media/service-websites.webp', href: '/services/business-websites', category: 'Websites' },
  { title: 'A community, connected', detail: 'Residential websites · Resident experiences', image: '/media/service-communities.webp', href: '/services/residential-community-websites', category: 'Portals' },
  { title: 'The way you work', detail: 'Business apps · Everyday workflows', image: '/media/service-apps.webp', href: '/services/business-apps', category: 'Apps' },
  { title: 'Everything in view', detail: 'Management systems · Custom dashboards', image: '/media/service-management.webp', href: '/services/custom-management-systems', category: 'Systems' },
  { title: 'What comes next', detail: 'Digital products · AI & integrations', image: '/media/service-digital.webp', href: '/services/anything-digital', category: 'Apps' },
  { title: 'Your idea starts here', detail: 'From first thought to a working product', image: '/media/agency/workspace.jpg', href: '/contact', category: 'Websites' },
];

export const values = [
  { name: 'Thoughtful', statement: 'Start with people. Make every detail count.', kind: 'orbit' },
  { name: 'Curious', statement: 'Ask better questions. Find better possibilities.', kind: 'spark' },
  { name: 'Purposeful', statement: 'Give every idea a strong foundation.', kind: 'layers' },
  { name: 'Connected', statement: 'Bring the whole experience together.', kind: 'network' },
  { name: 'Considered', statement: 'Make the complex feel beautifully simple.', kind: 'focus' },
  { name: 'Human', statement: 'Build technology people enjoy using.', kind: 'smile' },
];

export const sectors = ['Residential', 'Hospitality', 'Retail', 'Wellness', 'Professional services', 'Real estate', 'Restaurants', 'Creative studios', 'Property management', 'Local business', 'Communities', 'Commerce', 'Education', 'Operations', 'Memberships', 'Startups', 'Logistics', 'Construction', 'Customer service', 'Your next idea'];
