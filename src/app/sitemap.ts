import type { MetadataRoute } from 'next';

/**
 * Basic sitemap stub.
 * Advanced SEO and dynamic sitemap systems belong to Prompt 5.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://svgchits.com';

  const routes = [
    '',
    '/about',
    '/chit-groups',
    '/how-chit-funds-work',
    '/why-us',
    '/faqs',
    '/contact',
    '/pay-now',
    '/privacy-policy',
    '/terms-and-conditions',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
