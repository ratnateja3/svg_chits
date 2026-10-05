import type { Metadata, Viewport } from 'next';
import { Lora, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/content/site';
import { isSiteIndexable, getBaseUrl } from '@/lib/seo';
import { getCompanyJsonLd } from '@/lib/json-ld';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';

const serifFont = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#2A113E',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const baseUrl = getBaseUrl();
const indexable = isSiteIndexable();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteConfig.name} | Registered Chit Fund Company`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `${siteConfig.name} offers disciplined monthly savings and accessible financial capital in Shamshabad, Hyderabad under the Chit Funds Act, 1982.`,
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: `${siteConfig.name} | Registered Chit Fund Company`,
    description: `${siteConfig.name} offers disciplined monthly savings schemes and structured capital access in Shamshabad, Hyderabad.`,
    url: baseUrl,
    siteName: siteConfig.name,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Registered Chit Fund Company in Shamshabad, Hyderabad`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Registered Chit Fund Company`,
    description: `${siteConfig.name} offers disciplined monthly savings schemes in Shamshabad, Hyderabad.`,
    images: [`${baseUrl}/og/og-image.png`],
  },
  robots: indexable
    ? {
        index: true,
        follow: true,
      }
    : {
        index: false,
        follow: false,
        nocache: true,
      },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = getCompanyJsonLd();

  return (
    <html lang="en" className={`${serifFont.variable} ${sansFont.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-white font-sans text-neutral-900">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
