import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Chit Groups',
  description: 'Chit group plans, tenures, and monthly subscription tiers.',
};

export default function ChitGroupsPage() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto max-w-3xl space-y-6">
          <SectionHeading
            as="h1"
            badge="Chit Plans"
            title="Chit Groups & Plans"
            description="Explore our range of registered chit fund schemes designed for disciplined savings and planned capital requirements."
          />

          <Card padding="lg">
            <p className="leading-relaxed text-neutral-600">
              Full auction schedules, ticket sizes, monthly subscriptions, and chit group details
              will be configured in Phase 2.
            </p>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
