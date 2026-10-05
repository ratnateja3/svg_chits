import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

const steps = [
  {
    step: '01',
    title: 'Choose a Chit Group',
    description:
      'Evaluate your monthly savings capacity and timeline to choose an approved chit value, duration, and monthly instalment that suits your requirements.',
  },
  {
    step: '02',
    title: 'Join the Group',
    description:
      'Complete standard subscriber documentation and KYC verification, and execute the official subscriber agreement before the group commences.',
  },
  {
    step: '03',
    title: 'Pay Monthly Instalments',
    description:
      'Contribute regular monthly instalments to the collective group pool. Enjoy dividend deductions derived from auction discounts in subsequent months.',
  },
  {
    step: '04',
    title: 'Participate in the Applicable Process',
    description:
      'Participate in scheduled monthly reverse bidding auctions when you require a lump sum for planned milestones, business expenses, or emergencies.',
  },
  {
    step: '05',
    title: 'Receive the Prize Amount as Applicable',
    description:
      'Upon winning the bid and submitting necessary security documentation per statutory standards, the prized chit amount is promptly disbursed.',
  },
  {
    step: '06',
    title: 'Continue Until the Chit Term Completes',
    description:
      'Continue contributing your scheduled monthly instalments until the full group tenure concludes, completing your commitment to fellow subscribers.',
  },
];

export function HowItWorksSection() {
  return (
    <Section spacing="md" background="subtle" className="border-b border-neutral-200/80">
      <Container size="default">
        <div className="space-y-10 sm:space-y-12">
          <SectionHeading
            badge="Process Overview"
            badgeVariant="purple"
            title="How Chit Funds Work"
            description="A transparent six-step cycle combining systematic monthly savings with planned access to capital."
            align="center"
          />

          {/* 6 Steps Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {steps.map((item) => (
              <Card
                key={item.step}
                padding="lg"
                hover
                className="relative flex flex-col justify-between border-neutral-200/90 bg-white"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-serif text-2xl font-bold tracking-tight text-brand-purple-900">
                      {item.step}
                    </span>
                    <span className="rounded bg-brand-purple-50 px-2 py-0.5 text-[11px] font-semibold uppercase text-brand-purple-800">
                      Step {item.step}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-neutral-900">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-neutral-600">
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Educational Note & Inner Link */}
          <div className="mx-auto max-w-2xl rounded-lg border border-neutral-200 bg-white p-4 text-center text-xs leading-relaxed text-neutral-500 shadow-2xs">
            <p>
              <strong className="font-semibold text-neutral-700">Educational Notice:</strong> Chit
              fund operations, auctions, and prize disbursements are strictly governed by the Chit
              Funds Act, 1982. This summary provides general informational guidance and does not
              constitute formal legal or financial advice.{' '}
              <Link
                href="/how-chit-funds-work"
                className="font-medium text-brand-purple-900 underline hover:text-brand-purple-800"
              >
                Read comprehensive guide
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
