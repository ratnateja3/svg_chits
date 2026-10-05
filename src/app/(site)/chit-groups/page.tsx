import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

import { chitPlans } from '@/content/chit-plans';
import { ChitPlanGrid } from '@/components/shared/ChitPlanGrid';

export const metadata: Metadata = {
  title: 'Chit Groups',
  description: 'Chit group plans, tenures, and monthly subscription tiers.',
};

export default function ChitGroupsPage() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="space-y-8">
          <SectionHeading
            as="h1"
            badge="Chit Plans"
            badgeVariant="gold"
            title="Chit Groups & Plans"
            description="Explore our range of registered chit fund schemes designed for disciplined savings and planned capital requirements. Official schemes to be confirmed."
          />

          <ChitPlanGrid plans={chitPlans} />
        </div>
      </Container>
    </Section>
  );
}
