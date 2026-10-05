import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Contact ${siteConfig.name} at our registered Shamshabad office.`,
};

export default function ContactPage() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto max-w-3xl space-y-6">
          <SectionHeading
            as="h1"
            badge="Get in Touch"
            title="Contact Our Office"
            description="We welcome inquiries regarding chit group subscriptions, enrollment requirements, and member services."
          />

          <Card padding="lg" className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-brand-purple-900">
              Registered Office
            </h2>
            <address className="space-y-1 text-sm not-italic leading-relaxed text-neutral-600">
              <p>
                {siteConfig.address.line1}, {siteConfig.address.line2}
              </p>
              <p>
                {siteConfig.address.area}, {siteConfig.address.city}
              </p>
              <p>
                {siteConfig.address.district}, {siteConfig.address.state} -{' '}
                {siteConfig.address.pincode}
              </p>
              <p>{siteConfig.address.country}</p>
            </address>

            <div className="border-t border-neutral-200 pt-4 text-xs text-neutral-500">
              <p>
                Interactive enquiry forms and direct branch hotline options will be integrated in
                subsequent phases.
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
