import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { processSteps } from '@/content/process-steps';

export function CompactHowItWorksSection() {
  return (
    <Section spacing="md" background="subtle" className="border-b border-neutral-200/80">
      <Container size="default">
        <div className="space-y-8 sm:space-y-10">
          <SectionHeading
            badge="Process Overview"
            badgeVariant="purple"
            title="How Chit Funds Work"
            description="A transparent six-step cycle combining systematic monthly savings with planned access to capital."
            align="center"
          />

          {/* 6 Steps: Mobile Vertical Numbered List / Desktop 3x2 Grid */}
          <div className="grid grid-cols-1 gap-3.5 sm:gap-4 lg:grid-cols-3 lg:gap-6">
            {processSteps.map((item) => (
              <Card
                key={item.step}
                padding="md"
                className="flex items-start gap-3.5 border-neutral-200/90 bg-white shadow-2xs sm:gap-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-purple-900 font-serif text-base font-bold text-white sm:h-10 sm:w-10 sm:text-lg">
                  {item.step}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-base font-bold text-neutral-900 sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                    {item.shortDescription || item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Combined Educational & Financial Understanding Notices */}
          <div className="mx-auto max-w-3xl space-y-3 rounded-lg border border-neutral-200 bg-white p-4 text-xs leading-relaxed text-neutral-600 shadow-2xs sm:p-5">
            <p>
              <strong className="font-semibold text-neutral-800">Educational Notice:</strong> Chit
              fund operations, auctions, and prize disbursements are strictly governed by the Chit
              Funds Act, 1982. This summary provides general informational guidance and does not
              constitute formal legal or financial advice.{' '}
              <Link
                href="/how-chit-funds-work"
                className="inline-flex min-h-[44px] items-center font-medium text-brand-purple-900 underline hover:text-brand-purple-800"
              >
                Read comprehensive guide &rarr;
              </Link>
            </p>
            <div className="border-t border-neutral-100 pt-3">
              <p>
                <strong className="font-semibold text-neutral-800">Financial Understanding:</strong>{' '}
                Chit funds are dual-purpose savings and credit instruments governed by statute. They do
                not represent guaranteed fixed-return investments, market securities, or speculative
                instruments. Total returns and net borrowing costs depend upon monthly auction bidding
                dynamics among group members.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
