'use client';

import React from 'react';
import Script from 'next/script';
import { GA_TRACKING_ID } from '@/lib/analytics';

/**
 * GoogleAnalytics Component
 * Renders GA4 gtag scripts ONLY if NEXT_PUBLIC_GA_ID environment variable is provided.
 * If absent, renders nothing (null) to avoid fake analytics calls or runtime overhead.
 */
export function GoogleAnalytics() {
  if (!GA_TRACKING_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  );
}
