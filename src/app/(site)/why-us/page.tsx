import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'Why Choose Us',
  description: `Why choose ${siteConfig.name} for your savings and borrowing requirements.`,
};

export default function WhyUsPage() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto max-w-3xl space-y-6">
          <SectionHeading
            as="h1"
            badge="Our Advantages"
            title="Why Choose Shri Vijaya Ganapathi Chit Fund"
            description="Discover the core principles of reliability, statutory compliance, prompt payouts, and dedicated member support."
          />

          <Card padding="lg">
            <p className="leading-relaxed text-neutral-600">
              Key differentiators, safety measures, regulatory registrations, and testimonials will
              be introduced in future phases.
            </p>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
