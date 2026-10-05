import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/content/site';

/**
 * Sticky bottom contact bar for mobile viewports.
 * Only appears below desktop breakpoint (hidden on lg and up).
 * Gracefully hides Call or WhatsApp if contact information is placeholder (null).
 */
export function StickyContactBar() {
  const { phone, whatsapp } = siteConfig.contact;

  // Check which actions are available
  const hasPhone = Boolean(phone && phone.trim());
  const hasWhatsapp = Boolean(whatsapp && whatsapp.trim());

  // Enquire is always available via the contact route
  return (
    <aside
      aria-label="Quick contact actions"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-200 bg-white px-3 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] pt-2 shadow-[0_-2px_8px_rgba(0,0,0,0.06)] lg:hidden"
    >
      <div className="mx-auto grid max-w-md auto-cols-fr grid-flow-col gap-2">
        {hasPhone && (
          <a
            href={`tel:${phone}`}
            className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-md border border-neutral-300 bg-neutral-100 px-3 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700 active:bg-neutral-300"
            aria-label="Call Shri Vijaya Ganapathi Chit Fund"
          >
            <svg
              className="h-4 w-4 text-brand-purple-900"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            <span>Call</span>
          </a>
        )}

        {hasWhatsapp && (
          <a
            href={`https://wa.me/${whatsapp?.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-md border border-emerald-300 bg-emerald-100 px-3 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 active:bg-emerald-300"
            aria-label="Chat on WhatsApp"
          >
            <svg
              className="h-4 w-4 text-emerald-700"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            <span>WhatsApp</span>
          </a>
        )}

        <Link
          href="/contact"
          className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-md border border-brand-gold-600/30 bg-brand-gold-500 px-4 py-2.5 text-center text-sm font-semibold text-brand-purple-950 shadow-sm hover:bg-brand-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700 active:bg-brand-gold-700"
        >
          <svg
            className="h-4 w-4 text-brand-purple-950"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v5.518z"
            />
          </svg>
          <span>Enquire</span>
        </Link>
      </div>
    </aside>
  );
}
