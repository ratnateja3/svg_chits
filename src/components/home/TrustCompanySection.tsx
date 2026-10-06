import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { siteConfig } from '@/content/site';
import { homepageTrustPoints } from '@/content/why-us';
import { getTelLink } from '@/lib/contact';

export function TrustCompanySection() {
  const telLink = getTelLink();

  return (
    <Section spacing="md" background="subtle" className="border-b border-neutral-200/80">
      <Container size="default">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Main Narrative & Trust Points Column */}
          <div className="space-y-6 lg:col-span-7">
            <SectionHeading
              badge="About Our Company"
              badgeVariant="purple"
              title={siteConfig.name}
              description="A government-registered chit fund company offering disciplined, transparent financial mechanisms for planned requirements."
            />

            {/* 2-3 Line Company Introduction */}
            {siteConfig.shortIntro && (
              <p className="text-base leading-relaxed text-neutral-700">
                {siteConfig.shortIntro}
              </p>
            )}

            {/* 4 Concise Trust Points Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {homepageTrustPoints.map((point) => (
                <div
                  key={point.title}
                  className="rounded-lg border border-neutral-200/90 bg-white p-4 shadow-2xs"
                >
                  <h3 className="font-serif text-base font-bold text-neutral-900">
                    {point.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                    {point.shortDescription || point.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Navigation Links with Descriptive Text */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
              <Link
                href="/about"
                className="inline-flex min-h-[44px] items-center text-sm font-semibold text-brand-purple-900 hover:text-brand-purple-800 hover:underline"
              >
                Learn more about our company &rarr;
              </Link>
              <Link
                href="/why-us"
                className="inline-flex min-h-[44px] items-center text-sm font-semibold text-brand-purple-900 hover:text-brand-purple-800 hover:underline"
              >
                See why choose us &rarr;
              </Link>
            </div>
          </div>

          {/* Compact Registered Office / Legal Details Block */}
          <div className="lg:col-span-5">
            <Card padding="md" className="space-y-4 border-brand-purple-100 bg-white shadow-sm">
              <div className="border-b border-neutral-100 pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold-700">
                  Verified Company Details
                </span>
                <h3 className="mt-1 font-serif text-lg font-bold text-brand-purple-900">
                  Registered Office &amp; Jurisdiction
                </h3>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs font-medium uppercase text-neutral-500">Legal Entity</p>
                  <p className="font-semibold text-neutral-900 break-words">{siteConfig.name}</p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase text-neutral-500">Statutory Basis</p>
                  <p className="font-medium text-neutral-800 break-words">
                    Regulated under the Chit Funds Act, 1982 ({siteConfig.legal.registeredState})
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase text-neutral-500">Registered Address</p>
                  <address className="not-italic font-medium leading-relaxed text-neutral-800 break-words">
                    <p>{siteConfig.address.line1}, {siteConfig.address.line2}</p>
                    <p>{siteConfig.address.area}, {siteConfig.address.city}</p>
                    <p>
                      {siteConfig.address.district}, {siteConfig.address.state} -{' '}
                      {siteConfig.address.pincode}, {siteConfig.address.country}
                    </p>
                  </address>
                </div>

                {siteConfig.contact.phoneDisplay && (
                  <div>
                    <p className="text-xs font-medium uppercase text-neutral-500">Phone</p>
                    <p className="font-medium text-neutral-800">
                      {telLink ? (
                        <a
                          href={telLink}
                          className="inline-flex min-h-[44px] items-center text-brand-purple-900 hover:text-brand-700 hover:underline"
                        >
                          {siteConfig.contact.phoneDisplay}
                        </a>
                      ) : (
                        <span>{siteConfig.contact.phoneDisplay}</span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}
