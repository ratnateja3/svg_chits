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
  title: `Why Choose Us | Registered Chit Fund Trust | ${siteConfig.name}`,
  description: `Discover our commitments to statutory compliance under the Chit Funds Act, 1982, auditable records, and subscriber transparency at ${siteConfig.name}.`,
  path: '/why-us',
});

const trustPillars = [
  {
    title: 'Statutory Registration & Compliance',
    description:
      'We operate under the regulatory framework of the Chit Funds Act, 1982 in the State of Telangana. Every group scheme is structured pursuant to mandatory government filings, prior sanctions, and official administrative procedures.',
  },
  {
    title: 'Transparent Auction Proceedings',
    description:
      'All group auctions are conducted on predetermined dates with open bidding rules. Subscribers receive prompt, itemized statements detailing bid discounts, distributed dividends, and net monthly contributions.',
  },
  {
    title: 'Accessible Local Presence',
    description:
      'Our physical registered office at RB Nagar, Shamshabad provides an authentic, accessible base for all members. Subscribers are always welcome to consult with management in person rather than navigating impersonal call centers.',
  },
  {
    title: 'Disciplined Capital Security',
    description:
      'Prized funds are disbursed only after verifying necessary sureties, safeguarding the collective interests of non-prized members who continue their monthly savings toward future auctions.',
  },
  {
    title: 'Personalized Member Guidance',
    description:
      'We take time to explain scheme rules, auction limits, and subscriber obligations in clear local language, helping members select subscription tiers that correspond realistically with their monthly budgets.',
  },
  {
    title: 'No Hidden Charges or Speculative Risk',
    description:
      'We do not engage in speculative investments or promise unrealistic returns. Our administration follows statutory fee limits, ensuring all distributed discounts flow directly back to subscribers as dividends.',
  },
];

export default function WhyUsPage() {
  return (
    <>
      {/* 1. Header Hero */}
      <Section spacing="lg" background="subtle" className="border-b border-brand-purple-100/80">
        <Container size="default">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              as="h1"
              badge="Trust & Standards"
              badgeVariant="gold"
              title="Why Choose Shri Vijaya Ganapathi Chit Fund"
              description="A financial institution founded on statutory discipline, complete transparency, and genuine dedication to community member welfare."
              align="center"
            />
          </div>
        </Container>
      </Section>

      {/* 2. Core Pillars Grid */}
      <Section spacing="md" background="white" className="border-b border-neutral-200/80">
        <Container size="default">
          <div className="space-y-10 sm:space-y-12">
            <SectionHeading
              badge="Our Commitments"
              badgeVariant="purple"
              title="Our Principles of Reliability"
              description="Six qualitative standards that guide every group scheme, monthly auction, and subscriber relationship."
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {trustPillars.map((pillar, idx) => (
                <Card
                  key={pillar.title}
                  padding="lg"
                  hover
                  className="flex flex-col justify-between border-neutral-200/90 bg-white"
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-purple-50 text-brand-purple-900 font-bold font-serif text-sm">
                      0{idx + 1}
                    </div>

                    <h2 className="mt-4 font-serif text-lg font-bold text-neutral-900">
                      {pillar.title}
                    </h2>

                    <p className="mt-2.5 text-sm leading-relaxed text-neutral-600">
                      {pillar.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Registered Chits vs Informal Financial Circles */}
      <Section spacing="md" background="subtle" className="border-b border-neutral-200/80">
        <Container size="default">
          <div className="space-y-8">
            <SectionHeading
              badge="Regulatory Protection"
              badgeVariant="gold"
              title="Registered Chit Funds vs. Informal Circles"
              description="Understanding the essential legal safeguards that protect your hard-earned money."
            />

            <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white shadow-2xs">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-neutral-200 bg-brand-purple-950 text-white">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-serif text-sm font-semibold">
                      Feature / Standard
                    </th>
                    <th scope="col" className="px-6 py-4 font-serif text-sm font-semibold text-brand-gold-300">
                      Shri Vijaya Ganapathi Chit Fund
                    </th>
                    <th scope="col" className="px-6 py-4 font-serif text-sm font-semibold text-neutral-300">
                      Unregulated / Informal Circles
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-neutral-700">
                  <tr>
                    <td className="px-6 py-4 font-semibold text-neutral-900">Legal Protection</td>
                    <td className="px-6 py-4 font-medium text-emerald-800">
                      Covered under the Chit Funds Act, 1982
                    </td>
                    <td className="px-6 py-4 text-neutral-500">None; high default risk</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-neutral-900">Auction Procedure</td>
                    <td className="px-6 py-4 font-medium text-emerald-800">
                      Scheduled openly with statutory discount caps
                    </td>
                    <td className="px-6 py-4 text-neutral-500">Arbitrary or undisclosed bidding rules</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-neutral-900">Surety &amp; Verification</td>
                    <td className="px-6 py-4 font-medium text-emerald-800">
                      Mandatory sureties protect all non-prized members
                    </td>
                    <td className="px-6 py-4 text-neutral-500">No formal recovery mechanism</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-neutral-900">Office &amp; Dispute Redressal</td>
                    <td className="px-6 py-4 font-medium text-emerald-800">
                      Physical Shamshabad office with registrar oversight
                    </td>
                    <td className="px-6 py-4 text-neutral-500">No physical accountability or recourse</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Conversion CTA */}
      <Section spacing="md" background="white">
        <Container size="narrow">
          <div className="rounded-xl border border-brand-purple-200 bg-brand-purple-50/40 p-8 text-center shadow-xs sm:p-10">
            <h2 className="font-serif text-2xl font-bold text-brand-purple-950 sm:text-3xl">
              Experience Disciplined, Registered Savings
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-neutral-600">
              Join a registered community of disciplined savers. Visit our Shamshabad office or submit
              an online enquiry to explore upcoming groups.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href="/chit-groups" variant="primary" size="lg">
                Explore Chit Groups
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Contact Our Office
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
