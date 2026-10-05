import React from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteConfig } from '@/content/site';
import { getWhatsAppLink } from '@/lib/contact';

export function SocialSection() {
  const { instagram, facebook } = siteConfig.socials;
  const whatsappLink = getWhatsAppLink();

  const hasInstagram = Boolean(instagram && instagram.trim());
  const hasFacebook = Boolean(facebook && facebook.trim());

  return (
    <Section spacing="md" background="subtle">
      <Container size="default">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            badge="Stay Connected"
            badgeVariant="purple"
            title="Official Communication &amp; Channels"
            description="Connect with Shri Vijaya Ganapathi Chit Fund for scheme announcements, office updates, and direct member communication."
            align="center"
          />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {/* WhatsApp Channel */}
            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-emerald-300 bg-emerald-100 px-5 py-2.5 text-sm font-semibold text-emerald-950 transition-colors hover:bg-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                aria-label="Connect on WhatsApp"
              >
                <span>WhatsApp Support</span>
              </a>
            )}

            {/* Facebook Link - Only rendered if URL exists */}
            {hasFacebook && (
              <a
                href={facebook!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700"
                aria-label="Visit our official Facebook page"
              >
                <span>Facebook</span>
              </a>
            )}

            {/* Instagram Link - Only rendered if URL exists */}
            {hasInstagram && (
              <a
                href={instagram!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700"
                aria-label="Visit our official Instagram profile"
              >
                <span>Instagram</span>
              </a>
            )}

            {/* Informative placeholder if social profiles are pending confirmation */}
            {!hasInstagram && !hasFacebook && (
              <div className="rounded-lg border border-neutral-200 bg-white p-4 text-xs text-neutral-500 shadow-2xs">
                <p>
                  Official Facebook and Instagram presence are pending confirmation. For immediate
                  assistance and authenticated announcements, please contact our Shamshabad office directly.
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
