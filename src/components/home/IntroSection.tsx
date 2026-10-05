import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { siteConfig } from '@/content/site';

export function IntroSection() {
  return (
    <Section spacing="md" background="subtle" className="border-b border-neutral-200/80">
      <Container size="default">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Main Narrative Column */}
          <div className="space-y-4 lg:col-span-7">
            <SectionHeading
              badge="About Our Company"
              badgeVariant="purple"
              title={siteConfig.name}
              description="A government-registered chit fund company offering disciplined, transparent financial mechanisms for planned requirements."
            />

            <div className="space-y-4 text-base leading-relaxed text-neutral-700">
              <p>
                {siteConfig.name} operates in full accordance with the statutory provisions of the{' '}
                <strong className="font-semibold text-neutral-900">
                  Chit Funds Act, 1982
                </strong>{' '}
                in the State of {siteConfig.legal.registeredState}. We serve individual savers,
                salaried professionals, self-employed individuals, and local business enterprises
                seeking a reliable, structured path to accumulate capital and access financial
                liquidity.
              </p>

              <p>
                Chit funds represent one of India&apos;s time-tested indigenous financial systems,
                offering a unique dual utility: enabling members to cultivate regular monthly savings
                habits while providing an avenue to borrow a lump sum through competitive monthly
                auctions without complex bank documentation.
              </p>

              <p>
                Our administration is conducted with complete transparency, regular monthly accounting,
                and strict adherence to legal norms. Prospective and existing subscribers are always
                welcome to visit our registered office in Shamshabad to review scheme rules, auction
                procedures, and enrollment guidelines.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center text-sm font-semibold text-brand-purple-900 hover:text-brand-purple-800 hover:underline"
              >
                Learn more about our company &rarr;
              </Link>
            </div>
          </div>

          {/* Verified Official Facts Card */}
          <div className="lg:col-span-5">
            <Card padding="lg" className="space-y-5 border-brand-purple-100 bg-white shadow-sm">
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
                  <p className="text-xs font-medium text-neutral-500 uppercase">Legal Entity</p>
                  <p className="font-semibold text-neutral-900">{siteConfig.name}</p>
                </div>

                <div>
                  <p className="text-xs font-medium text-neutral-500 uppercase">Statutory Basis</p>
                  <p className="font-medium text-neutral-800">
                    Regulated under the Chit Funds Act, 1982 ({siteConfig.legal.registeredState})
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-neutral-500 uppercase">Registered Address</p>
                  <address className="not-italic font-medium leading-relaxed text-neutral-800">
                    <p>{siteConfig.address.line1}, {siteConfig.address.line2}</p>
                    <p>{siteConfig.address.area}, {siteConfig.address.city}</p>
                    <p>
                      {siteConfig.address.district}, {siteConfig.address.state} -{' '}
                      {siteConfig.address.pincode}, {siteConfig.address.country}
                    </p>
                  </address>
                </div>

                <div className="rounded-md border border-neutral-200/80 bg-neutral-50 p-3 text-xs text-neutral-600">
                  <p className="font-semibold text-neutral-800">Direct Office Inquiries</p>
                  <p className="mt-0.5">
                    Visit during working hours for in-person consultations, scheme brochures, and
                    subscriber agreement forms.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}
