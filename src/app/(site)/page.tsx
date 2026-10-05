import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: `${siteConfig.name} - Home`,
  description: siteConfig.tagline,
};

export default function HomePage() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto max-w-3xl space-y-8 text-center sm:text-left">
          <SectionHeading
            as="h1"
            badge="Phase 1 Foundation"
            title={siteConfig.name}
            description="A fast, professional, mobile-first website foundation for Shri Vijaya Ganapathi Chit Fund Pvt Ltd. Reusable layout shell and core architecture are active."
          />

          <Card padding="lg" className="space-y-4">
            <h2 className="font-serif text-lg font-bold text-brand-purple-900">
              Registered Office
            </h2>
            <address className="text-sm not-italic leading-relaxed text-neutral-600">
              {siteConfig.address.fullAddress}
            </address>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button href="/chit-groups" variant="primary">
                Explore Chit Groups
              </Button>
              <Button href="/contact" variant="outline">
                Contact Office
              </Button>
              <Button href="/pay-now" variant="quiet">
                Pay Online
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
