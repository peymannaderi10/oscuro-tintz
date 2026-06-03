import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/siteMeta';

// lastModified must reflect the date the page's CONTENT last changed — update the
// date for a page whenever you edit it. Never use new Date(): a runtime timestamp
// makes every page look freshly modified on every crawl, so Google learns to
// ignore the signal entirely. changefreq/priority are omitted (Google ignores both).
const ROUTES: { path: string; lastModified: string }[] = [
  { path: '/', lastModified: '2026-06-03' },
  { path: '/services', lastModified: '2026-06-03' },
  { path: '/book', lastModified: '2026-06-03' },
  { path: '/gallery', lastModified: '2026-06-03' },
  { path: '/reviews', lastModified: '2026-06-03' },
  { path: '/about', lastModified: '2026-06-03' },
  { path: '/contact', lastModified: '2026-06-03' },
  { path: '/california-window-tint-laws', lastModified: '2026-06-03' },
  { path: '/mobile-window-tinting-yuba-city', lastModified: '2026-06-03' },
  { path: '/privacy', lastModified: '2026-06-03' },
  { path: '/terms', lastModified: '2026-06-03' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: new Date(r.lastModified),
  }));
}
