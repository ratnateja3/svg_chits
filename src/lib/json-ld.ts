import { siteConfig } from '@/content/site';

/**
 * Generates verified JSON-LD structured data for search engines.
 * Strictly uses only confirmed business details:
 * - Company Legal Name
 * - Registered Shamshabad Address
 * - Confirmed Business Phone (+91-9392824461)
 *
 * All unconfirmed properties (ratings, fake reviews, operating hours,
 * unconfirmed social profiles, or unverified legal IDs) are strictly omitted.
 */
export function getCompanyJsonLd() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (siteConfig.domain ? `https://${siteConfig.domain}` : 'https://svgchits.com');

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['FinancialService', 'LocalBusiness', 'Organization'],
    name: siteConfig.name,
    legalName: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: `${siteConfig.name} is a registered chit fund company operating under the Chit Funds Act, 1982 in Telangana, providing disciplined monthly savings and structured capital access.`,
    url: siteUrl,
    logo: `${siteUrl}/logo/logo.png`,
    image: `${siteUrl}/og/og-image.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
      addressLocality: `${siteConfig.address.area}, ${siteConfig.address.city}`,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.pincode,
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'State',
      name: siteConfig.legal.registeredState || 'Telangana',
    },
  };

  if (siteConfig.contact.phone) {
    schema.telephone = `+91-${siteConfig.contact.phone}`;
  }

  return schema;
}
