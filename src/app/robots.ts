import type { MetadataRoute } from 'next';
import { getBaseUrl, isSiteIndexable } from '@/lib/seo';

/**
 * Finalized Robots Configuration
 * Respects SITE_INDEXABLE environment variable.
 * Default: Crawlers disallowed to prevent accidental indexing of staging/preview sites.
 * Production (when SITE_INDEXABLE=true): Allows public routes, disallows /pay-now, points to sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  const indexable = isSiteIndexable();
  const baseUrl = getBaseUrl();

  if (!indexable) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/pay-now'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
