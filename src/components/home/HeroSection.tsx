'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/content/site';
import { getTelLink, getWhatsAppLink } from '@/lib/contact';
import { trackCallClick, trackWhatsAppClick, trackEnquireClick } from '@/lib/analytics';

export function HeroSection() {
  const telLink = getTelLink();
  const whatsappLink = getWhatsAppLink();

  return (
    <section className="relative border-b border-brand-purple-100/80 bg-brand-purple-50/30 py-12 sm:py-16 md:py-20 lg:py-24">
      <Container size="default">
        <div className="mx-auto max-w-3xl text-center">
          {/* Primary Headline */}
          <h1 className="font-serif text-3xl font-bold tracking-tight text-brand-purple-950 sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
            Disciplined Monthly Savings &amp; Accessible Capital for Your Milestones
          </h1>

          {/* Supporting Text */}
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg sm:leading-relaxed">
            {siteConfig.name} provides transparent, structured chit group schemes designed to help
            households, professionals, and local businesses build financial resilience and fund planned
            commitments.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="min-w-[160px]"
              onClick={() => trackEnquireClick('hero')}
            >
              Enquire Now
            </Button>

            <Button
              href="/chit-groups"
              variant="outline"
              size="lg"
              className="min-w-[160px] bg-white text-brand-purple-900 border-brand-purple-900 hover:bg-brand-purple-50"
            >
              Explore Chit Groups
            </Button>

            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(siteConfig.contact.whatsapp!, 'hero')}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-emerald-300 bg-emerald-50 px-5 py-3 text-base font-semibold text-emerald-950 transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                <span>Chat on WhatsApp</span>
              </a>
            )}

            {telLink && (
              <a
                href={telLink}
                onClick={() => trackCallClick(siteConfig.contact.phone!, 'hero')}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-5 py-3 text-base font-semibold text-neutral-800 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700"
              >
                <span>Call Office</span>
              </a>
            )}
          </div>

          {/* Key Compliance & Trust Indicators */}
          <div className="mt-12 grid grid-cols-1 gap-3 border-t border-neutral-200/80 pt-8 text-left sm:grid-cols-3 sm:gap-4">
            <div className="flex items-start gap-3 rounded-lg border border-neutral-200/80 bg-white p-3.5 shadow-2xs">
              <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-brand-purple-50 text-brand-purple-900 font-bold text-xs">
                ✓
              </div>
              <div>
                <p className="text-xs font-bold text-brand-purple-900 uppercase tracking-wide">Statutory Compliance</p>
                <p className="text-xs text-neutral-600 mt-0.5">Operated under the Chit Funds Act, 1982</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-neutral-200/80 bg-white p-3.5 shadow-2xs">
              <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-brand-purple-50 text-brand-purple-900 font-bold text-xs">
                ✓
              </div>
              <div>
                <p className="text-xs font-bold text-brand-purple-900 uppercase tracking-wide">Shamshabad Office</p>
                <p className="text-xs text-neutral-600 mt-0.5">Registered local office at RB Nagar</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-neutral-200/80 bg-white p-3.5 shadow-2xs">
              <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-brand-purple-50 text-brand-purple-900 font-bold text-xs">
                ✓
              </div>
              <div>
                <p className="text-xs font-bold text-brand-purple-900 uppercase tracking-wide">Structured Auctions</p>
                <p className="text-xs text-neutral-600 mt-0.5">Scheduled monthly bidding &amp; dividends</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
