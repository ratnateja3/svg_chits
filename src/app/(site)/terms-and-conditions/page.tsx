import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: `Chit agreement terms and operational guidelines of ${siteConfig.name}.`,
};

export default function TermsAndConditionsPage() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto max-w-3xl space-y-6">
          <SectionHeading
            as="h1"
            badge="Regulatory Terms"
            title="Terms & Conditions"
            description="Operational regulations governing chit subscriptions, monthly auctions, prize disbursements, and chit agreements."
          />

          <Card padding="lg" className="space-y-4 text-sm leading-relaxed text-neutral-600">
            <p>
              Chit fund operations conducted by {siteConfig.name} are regulated pursuant to the Chit
              Funds Act, 1982 and relevant state regulatory provisions.
            </p>
            <p>
              Complete terms of membership, subscriber responsibilities, bid limits, and statutory
              surety requirements will be published in subsequent phases.
            </p>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
