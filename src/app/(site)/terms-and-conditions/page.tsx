import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/content/site';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: `Terms & Conditions (Draft Overview) | ${siteConfig.name}`,
  description: `Draft terms and conditions and regulatory framework overview for ${siteConfig.name} under the Chit Funds Act, 1982 in Telangana.`,
  path: '/terms-and-conditions',
});

export default function TermsAndConditionsPage() {
  return (
    <>
      {/* 1. Header Hero */}
      <Section spacing="lg" background="subtle" className="border-b border-brand-purple-100/80">
        <Container size="default">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              as="h1"
              badge="Regulatory Overview"
              badgeVariant="gold"
              title="Terms &amp; Conditions (Draft)"
              description={`Draft terms governing website usage, prospective subscriber inquiries, and statutory chit framework for ${siteConfig.name}.`}
              align="center"
            />
          </div>
        </Container>
      </Section>

      {/* 2. Main Terms Content */}
      <Section spacing="lg" background="white">
        <Container size="narrow">
          <div className="space-y-8 text-neutral-700">
            {/* Prominent Draft Advisory Banner */}
            <div className="rounded-lg border border-amber-200 bg-amber-50/80 p-4 text-xs leading-relaxed text-amber-950 sm:p-5">
              <div className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
                <div className="space-y-1">
                  <p className="font-semibold text-amber-900">
                    Important Notice: Interim Draft Document
                  </p>
                  <p>
                    This document provides draft terms regarding use of this website. It does NOT
                    constitute an executed Chit Agreement or official Chit Scheme By-laws. Actual chit
                    operations, subscriber obligations, monthly auction dates, bid limits, and prize
                    disbursements are strictly governed by the official Chit Agreement executed
                    individually under the Chit Funds Act, 1982 and the applicable state rules.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                1. Website Use &amp; Informational Scope
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                This website is maintained by <strong className="font-semibold text-neutral-900">{siteConfig.name}</strong>{' '}
                for educational, marketing, and preliminary communication purposes. Browsing this site
                or submitting an enquiry does not constitute an offer, acceptance, or formation of a
                binding chit contract.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                2. Governing Chit Fund Legislation
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                All chit schemes operated by the Company are regulated by and conducted strictly in
                accordance with the provisions of the{' '}
                <strong className="font-semibold text-neutral-900">Chit Funds Act, 1982</strong> (Central
                Act No. 40 of 1982) and the corresponding State Chit Fund Rules applicable in{' '}
                {siteConfig.legal.registeredState}.
              </p>
              <p className="text-sm leading-relaxed text-neutral-600">
                Each chit group is commenced only after obtaining statutory prior sanction and
                registration from the competent Chit Registrar as required by law.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                3. Subscriber Enrollment &amp; Chit Agreement
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                To participate in any chit group, an eligible applicant must complete our formal
                in-person or physical onboarding process, which includes:
              </p>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-neutral-600">
                <li>Execution of the statutory Chit Agreement in duplicate.</li>
                <li>Submission of Know Your Customer (KYC) documents (PAN, Aadhaar/ID, Address Proof).</li>
                <li>Payment of the first monthly subscription instalment.</li>
                <li>Verification and issuance of the official chit ticket allocation.</li>
              </ul>
              <p className="text-sm leading-relaxed text-neutral-600">
                The Company reserves the right to accept or reject subscription applications based on
                eligibility and group capacity.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                4. Monthly Subscriptions, Auctions &amp; Dividends
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                Registered chit fund operations follow clear statutory guidelines:
              </p>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-neutral-600">
                <li>
                  <strong className="font-semibold text-neutral-900">Timely Instalments:</strong>{' '}
                  Subscribers must remit monthly instalments on or before the due date specified in the
                  chit by-laws.
                </li>
                <li>
                  <strong className="font-semibold text-neutral-900">Monthly Reverse Auction:</strong>{' '}
                  Auctions are conducted monthly among non-prized, eligible subscribers. The bidder
                  offering the maximum discount (up to the statutory ceiling) is declared the prized
                  subscriber.
                </li>
                <li>
                  <strong className="font-semibold text-neutral-900">Auction Discount Ceiling:</strong>{' '}
                  In accordance with the Chit Funds Act, 1982, the maximum auction discount cannot exceed
                  the statutory ceiling (currently capped at 30% of the chit value).
                </li>
                <li>
                  <strong className="font-semibold text-neutral-900">Foreman Commission &amp; Dividends:</strong>{' '}
                  The statutory foreman commission (up to 5% of the chit value) is deducted from the
                  auction discount, and the remaining discount is distributed equally as a dividend to
                  all eligible members, reducing their subsequent monthly contribution.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                5. Prize Money Disbursement &amp; Security Requirements
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                Under the Chit Funds Act, 1982, the prized subscriber is entitled to receive the prize
                amount (Chit Value minus Auction Discount) only upon furnishing adequate security or
                acceptable sureties to guarantee payment of remaining future instalments until the
                chit group completes its full duration.
              </p>
              <p className="text-sm leading-relaxed text-neutral-600">
                Acceptable securities may include personal guarantees, government employee sureties,
                bank guarantees, or property collateral, as specified in the applicable scheme by-laws.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                6. Sample Chit Group Information &amp; Calculations
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                Chit plans, instalment ranges, and sample calculations published on this website are
                illustrative placeholders provided to help visitors understand plan structures. Exact
                terms, tenure, ticket count, and auction dates are defined in the specific sanctioned
                by-laws of each active group.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                7. Jurisdiction &amp; Dispute Resolution
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                Any claims, controversies, or proceedings arising under or in connection with official
                chit agreements executed with <strong className="font-semibold text-neutral-900">{siteConfig.name}</strong>{' '}
                are subject to dispute resolution procedures pursuant to the Chit Funds Act, 1982 before
                the designated Registrar of Chits and the jurisdiction of competent courts in{' '}
                {siteConfig.address.district || 'Hyderabad'}, Telangana, India.
              </p>
            </section>

            {/* Bottom CTA Card */}
            <Card padding="lg" className="border-brand-purple-200 bg-brand-purple-50/40 text-center">
              <h3 className="font-serif text-lg font-bold text-brand-purple-950">
                Questions Regarding Chit By-laws or Group Schedules?
              </h3>
              <p className="mt-1 text-sm text-neutral-600">
                Our Shamshabad office team will gladly walk you through the agreement clauses and
                upcoming group timelines.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <Button href="/contact" variant="primary">
                  Contact Our Office
                </Button>
                <Button href="/how-chit-funds-work" variant="outline">
                  How Chit Funds Work
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
