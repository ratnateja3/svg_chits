import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/content/site';
import { getTelLink, getWhatsAppLink } from '@/lib/contact';

export function EnquiryCtaSection() {
  const telLink = getTelLink();
  const whatsappLink = getWhatsAppLink();

  return (
    <Section spacing="md" background="white" className="border-b border-neutral-200/80">
      <Container size="default">
        <div className="rounded-xl border border-brand-purple-200 bg-brand-purple-50/40 p-6 sm:p-10 md:p-12 text-center shadow-xs">
          <span className="inline-block rounded-full border border-brand-gold-400/60 bg-brand-gold-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gold-900">
            Start Your Savings Journey
          </span>

          <h2 className="mt-4 font-serif text-2xl font-bold tracking-tight text-brand-purple-950 sm:text-3xl md:text-4xl">
            Interested in Exploring a Registered Chit Group?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Speak directly with our Shamshabad office team to learn about upcoming group tenures,
            subscription amounts, auction schedules, and statutory enrollment requirements.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button href="/contact" variant="primary" size="lg" className="min-w-[160px]">
              Enquire Now
            </Button>

            <Button href="/chit-groups" variant="outline" size="lg" className="min-w-[160px]">
              Browse All Schemes
            </Button>

            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-emerald-300 bg-emerald-100 px-5 py-3 text-base font-semibold text-emerald-950 transition-colors hover:bg-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                <span>Chat on WhatsApp</span>
              </a>
            )}

            {telLink && (
              <a
                href={telLink}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-5 py-3 text-base font-semibold text-neutral-800 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700"
              >
                <span>Call Our Office</span>
              </a>
            )}
          </div>

          {/* Office Address Footnote */}
          <div className="mt-8 border-t border-brand-purple-200/60 pt-6 text-xs text-neutral-500">
            <p>
              <strong className="font-semibold text-neutral-700">Registered Office:</strong>{' '}
              {siteConfig.address.fullAddress}
            </p>
            <p className="mt-1">
              Strictly confidential. No sensitive banking credentials or identification documents are
              requested online.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
