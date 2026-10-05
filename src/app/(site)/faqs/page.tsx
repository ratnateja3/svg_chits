import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Common questions and answers regarding chit fund operations, bidding, and payouts.',
};

export default function FaqsPage() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto max-w-3xl space-y-6">
          <SectionHeading
            as="h1"
            badge="Help & Clarifications"
            title="Frequently Asked Questions"
            description="Find answers to common inquiries about chit fund enrollment, monthly instalments, auction processes, and prize money disbursement."
          />

          <Card padding="lg">
            <p className="leading-relaxed text-neutral-600">
              Comprehensive FAQ categorizations covering enrollment, bidding rules, legal
              protections, and security requirements will be detailed in later phases.
            </p>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
