import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { siteConfig } from '@/content/site';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { getTelLink, getWhatsAppLink, getEmailLink } from '@/lib/contact';

export const metadata: Metadata = {
  title: `Contact Us | ${siteConfig.name}`,
  description: `Contact ${siteConfig.name} at our registered Shamshabad office or submit an online chit scheme enquiry.`,
};

export default function ContactPage() {
  const telLink = getTelLink();
  const whatsappLink = getWhatsAppLink();
  const emailLink = getEmailLink();

  // Clean Google Maps search link (opens in external map app/browser, without embedding iframes)
  const encodedAddress = encodeURIComponent(siteConfig.address.fullAddress);
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <>
      {/* 1. Header Hero */}
      <Section spacing="lg" background="subtle" className="border-b border-brand-purple-100/80">
        <Container size="default">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              as="h1"
              badge="Get in Touch"
              badgeVariant="gold"
              title="Contact Our Office &amp; Enquire"
              description="Connect with Shri Vijaya Ganapathi Chit Fund Pvt Ltd for scheme enrollment, upcoming auction schedules, and member inquiries."
              align="center"
            />
          </div>
        </Container>
      </Section>

      {/* 2. Main Contact Grid */}
      <Section spacing="lg" background="white">
        <Container size="default">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Column 1: Registered Office & Contact Channels */}
            <div className="space-y-6 lg:col-span-5">
              {/* Registered Office Card */}
              <Card padding="lg" className="space-y-4 border-neutral-200/90 bg-white shadow-2xs">
                <div className="border-b border-neutral-100 pb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold-800">
                    Official Headquarters
                  </span>
                  <h2 className="mt-1 font-serif text-xl font-bold text-brand-purple-950">
                    Registered Office
                  </h2>
                </div>

                <address className="space-y-1 text-sm not-italic leading-relaxed text-neutral-700">
                  <p className="font-semibold text-neutral-900">{siteConfig.name}</p>
                  <p>{siteConfig.address.line1}, {siteConfig.address.line2}</p>
                  <p>{siteConfig.address.area}, {siteConfig.address.city}</p>
                  <p>
                    {siteConfig.address.district}, {siteConfig.address.state} -{' '}
                    {siteConfig.address.pincode}
                  </p>
                  <p>{siteConfig.address.country}</p>
                </address>

                {/* Google Maps External Link */}
                <div className="pt-2">
                  <a
                    href={mapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-neutral-300 bg-neutral-50 px-4 py-2 text-xs font-semibold text-neutral-800 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700"
                  >
                    <svg
                      className="h-4 w-4 text-brand-purple-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    <span>View Location on Google Maps &rarr;</span>
                  </a>
                </div>
              </Card>

              {/* Direct Communication Channels Card */}
              <Card padding="lg" className="space-y-4 border-neutral-200/90 bg-white shadow-2xs">
                <h3 className="font-serif text-lg font-bold text-brand-purple-950">
                  Communication Channels
                </h3>

                <div className="space-y-3.5 text-sm text-neutral-600">
                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <span className="font-semibold text-neutral-900 w-24 flex-shrink-0">Phone:</span>
                    <div>
                      {telLink ? (
                        <a
                          href={telLink}
                          className="font-medium text-brand-purple-900 hover:underline"
                        >
                          {siteConfig.contact.phoneDisplay || siteConfig.contact.phone}
                        </a>
                      ) : (
                        <span className="text-neutral-500 italic">
                          Official phone pending confirmation
                        </span>
                      )}
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-3">
                    <span className="font-semibold text-neutral-900 w-24 flex-shrink-0">WhatsApp:</span>
                    <div>
                      {whatsappLink ? (
                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-emerald-800 hover:underline"
                        >
                          Chat on WhatsApp
                        </a>
                      ) : (
                        <span className="text-neutral-500 italic">
                          Official WhatsApp pending confirmation
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <span className="font-semibold text-neutral-900 w-24 flex-shrink-0">Email:</span>
                    <div>
                      {emailLink ? (
                        <a
                          href={emailLink}
                          className="font-medium text-brand-purple-900 hover:underline"
                        >
                          {siteConfig.contact.email}
                        </a>
                      ) : (
                        <span className="text-neutral-500 italic">
                          Official email pending confirmation
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-3 border-t border-neutral-100 pt-3">
                    <span className="font-semibold text-neutral-900 w-24 flex-shrink-0">Hours:</span>
                    <div className="text-neutral-700">
                      {siteConfig.contact.workingHours ? (
                        <span>{siteConfig.contact.workingHours}</span>
                      ) : (
                        <div>
                          <p>Monday &ndash; Saturday: 10:00 AM &ndash; 6:00 PM</p>
                          <p className="text-xs text-neutral-500">Sunday &amp; Public Holidays: Closed</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Regulatory Notice */}
              <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-600">
                <p className="font-semibold text-neutral-800">Regulatory Oversight:</p>
                <p className="mt-0.5 leading-relaxed">
                  Registered under the Chit Funds Act, 1982 ({siteConfig.legal.registeredState}). In-person
                  consultations, subscriber agreement reviews, and auction dates are conducted at our
                  registered office.
                </p>
              </div>
            </div>

            {/* Column 2: Lead Enquiry Form */}
            <div className="space-y-4 lg:col-span-7">
              <div className="mb-2">
                <h2 className="font-serif text-2xl font-bold tracking-tight text-brand-purple-950">
                  Submit a Chit Scheme Enquiry
                </h2>
                <p className="mt-1 text-sm text-neutral-600">
                  Please provide your contact details below. Our Shamshabad team will contact you promptly
                  with scheme particulars and availability.
                </p>
              </div>

              <EnquiryForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
