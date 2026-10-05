import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { chitPlans } from '@/content/chit-plans';
import { ChitPlanGrid } from '@/components/shared/ChitPlanGrid';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: `Chit Groups & Plans | ${siteConfig.name}`,
  description:
    'Explore registered chit schemes and monthly subscription groups offered by Shri Vijaya Ganapathi Chit Fund Pvt Ltd in Shamshabad, Hyderabad.',
};

export default function ChitGroupsPage() {
  return (
    <>
      {/* 1. Page Header */}
      <Section spacing="lg" background="subtle" className="border-b border-brand-purple-100/80">
        <Container size="default">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              as="h1"
              badge="Chit Schemes"
              badgeVariant="gold"
              title="Chit Groups &amp; Subscription Tiers"
              description="Explore our range of registered chit schemes designed for disciplined monthly savings and structured capital access. All group details are conducted under statutory guidelines."
              align="center"
            />
          </div>
        </Container>
      </Section>

      {/* 2. Full Chit Plan Grid Section */}
      <Section spacing="lg" background="white" className="border-b border-neutral-200/80">
        <Container size="default">
          <div className="space-y-8">
            <div className="flex flex-col items-start justify-between gap-2 border-b border-neutral-100 pb-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                  Available &amp; Upcoming Groups
                </h2>
                <p className="mt-1 text-xs text-neutral-500">
                  Select a scheme to enquire directly for enrollment or upcoming auction dates.
                </p>
              </div>
              <span className="rounded-full bg-brand-purple-50 px-3 py-1 text-xs font-semibold text-brand-purple-900 border border-brand-purple-200">
                {chitPlans.length} Schemes Configured
              </span>
            </div>

            {/* Complete Plan Grid without filtering */}
            <ChitPlanGrid plans={chitPlans} />
          </div>
        </Container>
      </Section>

      {/* 3. Explanatory Note & Guidance */}
      <Section spacing="md" background="subtle">
        <Container size="narrow">
          <div className="rounded-xl border border-brand-purple-200 bg-white p-8 text-center shadow-xs sm:p-10">
            <h2 className="font-serif text-2xl font-bold text-brand-purple-950 sm:text-3xl">
              Need Assistance Choosing the Right Chit Scheme?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-neutral-600">
              Our Shamshabad branch staff can help you assess tenure lengths, monthly subscription
              affordability, and required surety guidelines before group commencement.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href="/contact" variant="primary" size="lg">
                Enquire for a Scheme
              </Button>
              <Button href="/how-chit-funds-work" variant="outline" size="lg">
                How Chit Funds Work
              </Button>
            </div>
            <p className="mt-4 text-[11px] text-neutral-500">
              * Official chit group numbers and government sanction references are pending final
              publication. Sample amounts shown are for illustrative planning purposes.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
