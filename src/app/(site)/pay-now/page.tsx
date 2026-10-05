import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/content/site';
import { getTelLink, getWhatsAppLink } from '@/lib/contact';

export const metadata: Metadata = {
  title: `Online Payments | ${siteConfig.name}`,
  description: `Online chit instalment payment gateway information for ${siteConfig.name}. Online payments are coming soon. Contact our Shamshabad office for current payment methods.`,
};

export default function PayNowPage() {
  const telLink = getTelLink();
  const whatsappLink = getWhatsAppLink();

  return (
    <>
      {/* 1. Header Hero */}
      <Section spacing="lg" background="subtle" className="border-b border-brand-purple-100/80">
        <Container size="default">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              as="h1"
              badge="Subscriber Services"
              badgeVariant="gold"
              title="Online Payment Portal"
              description="A dedicated digital portal for convenient, secure monthly chit instalment settlements."
              align="center"
            />
          </div>
        </Container>
      </Section>

      {/* 2. Coming Soon Status Notice */}
      <Section spacing="md" background="white" className="border-b border-neutral-200/80">
        <Container size="default">
          <div className="mx-auto max-w-3xl">
            <Card padding="lg" className="border-brand-purple-200/70 bg-brand-purple-50/40 shadow-xs">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-purple-900 text-brand-gold-400">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.75"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-gold-100 px-2.5 py-0.5 text-xs font-semibold text-brand-gold-900">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-gold-600"></span>
                    Feature In Preparation
                  </div>
                  <h2 className="mt-1 font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                    Online payment functionality is currently being prepared / coming soon.
                  </h2>
                </div>
              </div>

              <div className="mt-4 space-y-3 border-t border-brand-purple-100/80 pt-4 text-sm leading-relaxed text-neutral-700">
                <p>
                  We are developing an integrated, bank-grade digital payment infrastructure. Once
                  active, subscribers of <strong className="font-semibold text-neutral-900">{siteConfig.name}</strong>{' '}
                  will be able to make instant monthly subscription payments via UPI, net banking, and
                  authorized digital channels with real-time payment reconciliation and digital receipts.
                </p>
                <p className="text-xs text-neutral-600">
                  Until digital processing is publicly certified and launched, please use our
                  standard in-person or verified direct payment facilities outlined below.
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 3. Current Payment Methods */}
      <Section spacing="md" background="subtle">
        <Container size="default">
          <div className="mx-auto max-w-3xl space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold tracking-tight text-brand-purple-950 sm:text-3xl">
                Current Payment Methods
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                Active subscribers can deposit monthly instalments through our authorized traditional
                channels with complete statutory accounting and documentation.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Option 1: In-Person Office Payment */}
              <Card padding="lg" className="space-y-3 border-neutral-200/90 bg-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-purple-100 text-brand-purple-900">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.75c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-purple-950">
                  Registered Office Desk
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600">
                  Visit our Shamshabad office during business hours to deposit monthly instalments
                  via cheque, demand draft, or cash against an official printed company receipt.
                </p>
                <div className="border-t border-neutral-100 pt-2 text-xs text-neutral-500">
                  <p className="font-medium text-neutral-700">Location:</p>
                  <p>
                    {siteConfig.address.line1}, {siteConfig.address.line2}, {siteConfig.address.area},{' '}
                    {siteConfig.address.city}
                  </p>
                </div>
              </Card>

              {/* Option 2: Bank Transfer Verification */}
              <Card padding="lg" className="space-y-3 border-neutral-200/90 bg-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gold-100 text-brand-gold-900">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.5M4.5 21V10.5"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-purple-950">
                  Direct Bank Remittance
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600">
                  Direct NEFT/RTGS transfers into our official corporate bank account can be arranged.
                  Contact our accounts department directly to receive verified beneficiary account details.
                </p>
                <div className="border-t border-neutral-100 pt-2 text-xs text-neutral-500">
                  <p className="font-medium text-neutral-700">Verification Notice:</p>
                  <p>Provide your Chit Group code &amp; Ticket number with all remittance references.</p>
                </div>
              </Card>
            </div>

            {/* Subscriber Security Notice Card */}
            <Card padding="lg" className="border-amber-200 bg-amber-50/70 text-amber-950">
              <div className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
                  />
                </svg>
                <div className="space-y-1.5 text-xs leading-relaxed">
                  <h3 className="text-sm font-semibold text-amber-900">
                    Important Subscriber Safety Advisory
                  </h3>
                  <p>
                    <strong className="font-medium text-amber-950">{siteConfig.name}</strong> will never
                    ask subscribers to transfer funds to personal UPI handles, individual phone numbers,
                    or unverified third-party savings accounts.
                  </p>
                  <p>
                    Always insist on an official stamped receipt issued by our company for any payment.
                    If in doubt, call or WhatsApp our Shamshabad office directly before transferring.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 4. Contact & Support CTAs */}
      <Section spacing="lg" background="white">
        <Container size="default">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-brand-purple-950 sm:text-3xl">
              Need Payment Assistance or Verification?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-neutral-600">
              Our office staff is available to provide bank transfer details, check your monthly
              balance, or answer instalment schedule questions.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              {telLink ? (
                <a
                  href={telLink}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md border border-brand-purple-950/20 bg-brand-purple-900 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-brand-purple-800 active:bg-brand-purple-950 sm:w-auto"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  <span>Call Us</span>
                </a>
              ) : (
                <Button href="/contact" variant="primary" className="w-full sm:w-auto">
                  Call Us
                </Button>
              )}

              {whatsappLink ? (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md border border-emerald-700 bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-emerald-800 active:bg-emerald-900 sm:w-auto"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>WhatsApp Us</span>
                </a>
              ) : (
                <Button href="/contact" variant="outline" className="w-full sm:w-auto">
                  WhatsApp Us
                </Button>
              )}

              <Button href="/contact" variant="outline" className="w-full sm:w-auto">
                Visit Shamshabad Office
              </Button>
            </div>

            <div className="mt-6">
              <Link
                href="/chit-groups"
                className="text-xs font-semibold text-brand-purple-900 underline underline-offset-4 hover:text-brand-purple-700"
              >
                &larr; View Available Chit Groups
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
