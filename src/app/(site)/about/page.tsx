import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'About Us',
  description: `About ${siteConfig.name}`,
};

export default function AboutPage() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto max-w-3xl space-y-6">
          <SectionHeading
            as="h1"
            badge="About Us"
            title={`About ${siteConfig.name}`}
            description="Established with a commitment to integrity, financial empowerment, and transparent community chit savings."
          />

          <Card padding="lg">
            <p className="leading-relaxed text-neutral-600">
              Detailed company history, leadership profiles, mission, and regulatory compliance will
              be introduced in subsequent phases.
            </p>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
