import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/seo';

/**
 * Finalized Sitemap Generator
 * Strictly includes intended public indexable pages.
 * Explicitly EXCLUDES /pay-now (which is non-indexable in this phase).
 * Uses configured base URL from getBaseUrl().
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  const publicRoutes: { path: string; priority: number; changeFrequency: 'monthly' | 'weekly' | 'yearly' }[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/chit-groups', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/how-chit-funds-work', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/why-us', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/faqs', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms-and-conditions', priority: 0.3, changeFrequency: 'yearly' },
  ];

  const now = new Date();

  return publicRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
