import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { siteConfig } from '@/content/site';
import { EnquiryForm } from '@/components/forms/EnquiryForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Contact ${siteConfig.name} at our registered Shamshabad office or submit a chit scheme enquiry.`,
};

export default function ContactPage() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto max-w-4xl space-y-8">
          <SectionHeading
            as="h1"
            badge="Get in Touch"
            badgeVariant="gold"
            title="Contact Our Office & Enquire"
            description="We welcome inquiries regarding chit group subscriptions, enrollment requirements, and member services."
          />

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            {/* Column 1: Registered Office Info */}
            <div className="space-y-6 lg:col-span-1">
              <Card padding="md" className="space-y-4">
                <h2 className="font-serif text-lg font-bold text-brand-purple-900">
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

                <div className="space-y-1 border-t border-neutral-100 pt-3 text-xs text-neutral-500">
                  <p className="font-semibold text-neutral-700">Official Jurisdiction:</p>
                  <p>
                    Registered under the Chit Funds Act, 1982 ({siteConfig.legal.registeredState}).
                  </p>
                </div>
              </Card>
            </div>

            {/* Column 2: Enquiry Form */}
            <div className="lg:col-span-2">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
