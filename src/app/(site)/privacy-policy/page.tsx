import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy and subscriber data protection guidelines of ${siteConfig.name}.`,
};

export default function PrivacyPolicyPage() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto max-w-3xl space-y-6">
          <SectionHeading
            as="h1"
            badge="Legal & Compliance"
            title="Privacy Policy"
            description="Our commitment to safeguarding personal subscriber data and confidential financial information."
          />

          <Card padding="lg" className="space-y-4 text-sm leading-relaxed text-neutral-600">
            <p>
              {siteConfig.name} is dedicated to maintaining the privacy and security of all personal
              and financial data entrusted to us by members and subscribers.
            </p>
            <p>
              Full statutory privacy disclosures, data processing clauses, and IT compliance notices
              will be finalized in upcoming phases.
            </p>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
