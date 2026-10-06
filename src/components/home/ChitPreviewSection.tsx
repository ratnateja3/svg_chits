import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ChitPlanCard } from '@/components/shared/ChitPlanCard';
import { getOpenChitPlans, getFullChitPlans } from '@/content/chit-plans';
import { siteConfig } from '@/content/site';

export function ChitPreviewSection() {
  const openPlans = getOpenChitPlans();
  const runningOrFullPlans = getFullChitPlans();
  const fullCount = runningOrFullPlans.length;

  return (
    <Section id="chit-groups" spacing="md" background="white" className="border-b border-neutral-200/80">
      <Container size="default">
        <div className="space-y-8 sm:space-y-10">
          <SectionHeading
            badge="Chit Schemes"
            badgeVariant="gold"
            title="Chit Groups Open for Enquiry"
            description={`Registered chit schemes currently accepting subscriber applications at our ${siteConfig.address.area}, ${siteConfig.address.city} office.`}
          />

          {openPlans.length === 0 ? (
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-8 text-center sm:p-10">
              <p className="font-serif text-lg font-bold text-neutral-900">
                No chit groups are currently open for immediate enrollment.
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-neutral-600">
                New groups are scheduled periodically. Enquire with our office to be notified about upcoming group announcements, or view our currently running groups.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Button href="/contact" variant="primary">
                  Enquire for Upcoming Groups
                </Button>
                <Button href="/chit-groups" variant="outline">
                  View all chit groups
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Layout: one column on mobile, two columns from md; two cards must not leave an awkward empty third column */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                {openPlans.map((plan) => (
                  <ChitPlanCard key={plan.id} plan={plan} variant="compact" />
                ))}
              </div>

              {/* Informative footer notes below cards */}
              <div className="space-y-1.5 text-center text-sm text-neutral-600">
                <p>Monthly contribution details are shared on enquiry.</p>
                <p>
                  {fullCount} other chit {fullCount === 1 ? 'group is' : 'groups are'} currently running or full.{' '}
                  <Link
                    href="/chit-groups"
                    className="inline-flex min-h-[44px] items-center font-semibold text-brand-purple-900 underline hover:text-brand-purple-800"
                  >
                    View all chit groups
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </Container>
    </Section>
  );
}
