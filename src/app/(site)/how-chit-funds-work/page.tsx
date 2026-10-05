import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'How Chit Funds Work',
  description:
    'Understand the mechanism, monthly auctions, and dividend distributions of registered chit funds.',
};

export default function HowChitFundsWorkPage() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto max-w-3xl space-y-6">
          <SectionHeading
            as="h1"
            badge="Process Guide"
            title="How Chit Funds Work"
            description="A clear, transparent explanation of chit fund cycles, monthly contributions, auctions, and bidding dividends."
          />

          <Card padding="lg">
            <p className="leading-relaxed text-neutral-600">
              Step-by-step guides, infographic workflows, and auction calculation examples will be
              detailed in subsequent phases.
            </p>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
