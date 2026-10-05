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
  title: `How Chit Funds Work | Educational Guide | ${siteConfig.name}`,
  description:
    'A step-by-step guide explaining registered chit funds, monthly reverse auctions, dividend distributions, and prize disbursement under the Chit Funds Act, 1982.',
  path: '/how-chit-funds-work',
});

const detailedSteps = [
  {
    step: '01',
    title: 'Choose a Registered Chit Group',
    subtitle: 'Evaluate your savings capacity and timeline',
    description:
      'Subscribers begin by choosing a chit group aligned with their personal or business cash flow. Each chit group defines the total chit value (e.g. ₹5 Lakh), the monthly instalment amount, and the total duration (e.g. 50 months with 50 subscribers).',
  },
  {
    step: '02',
    title: 'Complete Enrollment & Subscriber Agreement',
    subtitle: 'Execute statutory documentation',
    description:
      'Prior to group commencement, subscribers complete standard identity documentation (KYC verification) and execute the official subscriber agreement registered with the state chit registrar pursuant to the Chit Funds Act, 1982.',
  },
  {
    step: '03',
    title: 'Pay Scheduled Monthly Contributions',
    subtitle: 'Build a disciplined savings habit',
    description:
      'All members contribute their scheduled subscription amount every month into a common group account. In months following successful auctions, subscribers pay less than the gross instalment due to distributed dividend deductions.',
  },
  {
    step: '04',
    title: 'Participate in the Monthly Auction / Bidding',
    subtitle: 'Transparent reverse bidding process',
    description:
      'Every month on a pre-announced date and time, an open auction is conducted. Members who require funds bid by offering a discount from the total chit value. The subscriber offering the highest acceptable discount within statutory limits is declared the prized subscriber for that month.',
  },
  {
    step: '05',
    title: 'Prize Disbursement & Sureties',
    subtitle: 'Receipt of capital following verification',
    description:
      'The winning subscriber provides customary security or sureties (such as personal guarantees or property security, as prescribed by statutory regulations) to ensure the continuity of their remaining instalments. Once verified, the prized amount is transferred directly to their bank account.',
  },
  {
    step: '06',
    title: 'Continue Monthly Instalments Until Completion',
    subtitle: 'Fulfill group commitment',
    description:
      'After receiving the prize money, the prized subscriber continues paying regular monthly instalments until the entire tenure finishes. Non-prized members continue saving and bidding in subsequent months, benefiting from ongoing dividend credits.',
  },
];

export default function HowChitFundsWorkPage() {
  return (
    <>
      {/* 1. Header Hero */}
      <Section spacing="lg" background="subtle" className="border-b border-brand-purple-100/80">
        <Container size="default">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              as="h1"
              badge="Educational Guide"
              badgeVariant="gold"
              title="How Registered Chit Funds Work"
              description="A clear, transparent guide explaining the mechanics of mutual community savings, monthly reverse auctions, dividend distribution, and prize disbursements."
              align="center"
            />
          </div>
        </Container>
      </Section>

      {/* 2. Conceptual Overview */}
      <Section spacing="md" background="white" className="border-b border-neutral-200/80">
        <Container size="default">
          <div className="mx-auto max-w-3xl space-y-5 text-base leading-relaxed text-neutral-700">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-brand-purple-950 sm:text-3xl">
              The Dual Purpose of a Registered Chit Fund
            </h2>
            <p>
              In India, a registered chit fund is a cooperative financial mechanism governed by the{' '}
              <strong className="font-semibold text-neutral-900">Chit Funds Act, 1982</strong>. It
              combines the benefits of disciplined monthly savings with the convenience of borrowing
              lump-sum capital when an urgent or planned requirement arises.
            </p>
            <p>
              Unlike conventional banking products where one either saves at a fixed rate or borrows
              at high interest with strict collateral demands, a chit fund provides a unique community
              mechanism: savers benefit from regular dividend discounts, while borrowers can access
              their future savings early through a competitive monthly bidding process.
            </p>
          </div>
        </Container>
      </Section>

      {/* 3. Detailed 6 Steps */}
      <Section spacing="md" background="subtle" className="border-b border-neutral-200/80">
        <Container size="default">
          <div className="space-y-8 sm:space-y-10">
            <SectionHeading
              badge="Step-by-Step Cycle"
              badgeVariant="purple"
              title="The Six-Stage Chit Lifecycle"
              description="From scheme enrollment to term completion, here is how each monthly cycle is administered."
            />

            <div className="space-y-6">
              {detailedSteps.map((item) => (
                <Card
                  key={item.step}
                  padding="lg"
                  className="border-neutral-200/90 bg-white shadow-2xs"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-brand-purple-900 text-xl font-bold font-serif text-white">
                      {item.step}
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-serif text-xl font-bold text-neutral-900">
                          {item.title}
                        </h3>
                        <span className="rounded bg-brand-purple-50 px-2 py-0.5 text-xs font-semibold text-brand-purple-900">
                          {item.subtitle}
                        </span>
                      </div>
                      <p className="pt-1 text-sm leading-relaxed text-neutral-600 sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Explaining Dividends & Foremen Commission */}
      <Section spacing="md" background="white" className="border-b border-neutral-200/80">
        <Container size="default">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
            <Card padding="lg" className="space-y-4 border-neutral-200/90 bg-white">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950">
                Understanding Monthly Dividends
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-neutral-600">
                <p>
                  When a subscriber bids a discount to claim the chit early in the cycle, the discount
                  amount (after deducting the statutory foreman commission of up to 5%) is distributed
                  equally among all members of the group.
                </p>
                <p>
                  This distributed discount is called a <strong className="text-neutral-900">dividend</strong>.
                  In the subsequent month, members deduct this dividend from their scheduled contribution,
                  reducing their out-of-pocket payment.
                </p>
              </div>
            </Card>

            <Card padding="lg" className="space-y-4 border-neutral-200/90 bg-white">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950">
                Statutory Security &amp; Sureties
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-neutral-600">
                <p>
                  To protect the non-prized subscribers who continue contributing toward future
                  months, the Chit Funds Act, 1982 mandates that prized subscribers provide adequate
                  sureties before the prized money is released.
                </p>
                <p>
                  Sureties may include personal guarantees, salary certificates, property security, or
                  bank collateral as specified in the individual subscriber agreement.
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 5. Statutory Disclaimer & CTA */}
      <Section spacing="md" background="subtle">
        <Container size="narrow">
          <div className="rounded-xl border border-brand-purple-200 bg-white p-8 text-center shadow-xs sm:p-10">
            <h2 className="font-serif text-2xl font-bold text-brand-purple-950 sm:text-3xl">
              Ready to Explore an Approved Chit Scheme?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-neutral-600">
              Browse our currently configured chit groups or speak with our Shamshabad office team to
              receive clear details on upcoming auction schedules and enrollment forms.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href="/chit-groups" variant="primary" size="lg">
                View Chit Groups
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Contact Our Office
              </Button>
            </div>
            <p className="mt-4 text-[11px] leading-relaxed text-neutral-500">
              * Important Regulatory Notice: Actual terms, auction procedures, minimum/maximum bid limits,
              and security requirements are governed strictly by the individual chit agreement and the
              provisions of the Chit Funds Act, 1982. This guide is published strictly for educational
              clarity.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
