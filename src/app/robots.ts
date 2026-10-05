import type { MetadataRoute } from 'next';

/**
 * Robots configuration.
 * Disallow all web crawlers until official launch (SEO belongs to Prompt 5).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  };
}
