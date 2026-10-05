import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Pay Online',
  description: 'Online chit instalment payment gateway information.',
};

export default function PayNowPage() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="mx-auto max-w-3xl space-y-6">
          <SectionHeading
            as="h1"
            badge="Online Payment"
            title="Pay Instalment Online"
            description="Secure digital payment options for monthly chit subscriptions."
          />

          <Card padding="lg" className="space-y-4">
            <div className="rounded-md border border-brand-gold-200 bg-brand-gold-50 p-4 text-sm text-brand-gold-900">
              <p className="font-semibold">Payment Gateway Integration (Future Phase)</p>
              <p className="mt-1 text-xs text-brand-gold-800">
                Online payment services, UPI verification, and automated receipt issuance will be
                enabled in a future release. Please visit our office or contact our team for current
                payment instructions.
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
