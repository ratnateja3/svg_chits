import type { Metadata } from 'next';
import { siteConfig } from '@/content/site';

/**
 * Returns the configured base URL for canonical tags, sitemap, and Open Graph.
 */
export function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (envUrl) {
    return envUrl.replace(/\/+$/, '');
  }
  if (siteConfig.domain) {
    return `https://${siteConfig.domain.replace(/\/+$/, '')}`;
  }
  return 'https://svgchits.com';
}

/**
 * Checks whether public indexing is explicitly enabled via environment variable.
 * Default is FALSE to ensure the site remains protected from premature indexing
 * until final production launch.
 */
export function isSiteIndexable(): boolean {
  return process.env.SITE_INDEXABLE === 'true';
}

export interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}

/**
 * Reusable metadata generator ensuring consistent Open Graph, Twitter cards,
 * canonical URLs, and indexing safety across all public pages.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}${path === '/' ? '' : path}`;
  const ogImageUrl = `${baseUrl}/og/og-image.png`;

  // Respect SITE_INDEXABLE: if indexing is not explicitly enabled, force noindex for development safety
  const shouldIndex = isSiteIndexable() && !noIndex;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | ${siteConfig.shortName}`,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - Registered Chit Fund Company in Shamshabad, Hyderabad`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteConfig.shortName}`,
      description,
      images: [ogImageUrl],
    },
    robots: shouldIndex
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-video-preview': -1,
            'max-snippet': -1,
          },
        }
      : {
          index: false,
          follow: false,
          nocache: true,
        },
  };
}
