import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/content/site';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: `Privacy Policy (Draft Notice) | ${siteConfig.name}`,
  description: `Draft privacy guidelines and subscriber enquiry data handling disclosures for the public website of ${siteConfig.name}.`,
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* 1. Header Hero */}
      <Section spacing="lg" background="subtle" className="border-b border-brand-purple-100/80">
        <Container size="default">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              as="h1"
              badge="Draft Notice"
              badgeVariant="gold"
              title="Website Privacy Policy (Draft)"
              description={`Interim privacy guidelines and enquiry data processing practices for the public website of ${siteConfig.name}.`}
              align="center"
            />
          </div>
        </Container>
      </Section>

      {/* 2. Main Policy Content */}
      <Section spacing="lg" background="white">
        <Container size="narrow">
          <div className="space-y-8 text-neutral-700">
            {/* Prominent Draft Advisory Banner */}
            <div className="rounded-lg border border-amber-200 bg-amber-50/80 p-4 text-xs leading-relaxed text-amber-950 sm:p-5">
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
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
                <div className="space-y-1">
                  <p className="font-semibold text-amber-900">
                    Important Notice: Interim Draft Document
                  </p>
                  <p>
                    This Privacy Policy is a draft notice prepared specifically for the informational
                    and digital marketing enquiry functions of this website. It is not an executed legal
                    agreement and does not replace the statutory subscriber disclosures governed by
                    the Chit Funds Act, 1982. Formal legal documentation is executed separately prior
                    to entering any chit group.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                1. Scope and Purpose
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                This document describes how <strong className="font-semibold text-neutral-900">{siteConfig.name}</strong>{' '}
                (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) handles
                information submitted through our public marketing website. The website serves to
                introduce our company, present sample chit groups, educate visitors on the mechanics
                of registered chit funds, and facilitate direct prospective subscriber enquiries.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                2. Information We May Collect
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                When you interact with our website or submit an enquiry form, we may collect the
                following personal information voluntarily provided by you:
              </p>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-neutral-600">
                <li>
                  <strong className="font-semibold text-neutral-900">Full Name:</strong> To identify
                  you during communications and consultations.
                </li>
                <li>
                  <strong className="font-semibold text-neutral-900">Telephone / Mobile Number:</strong>{' '}
                  To call or message you regarding scheme availability, ticket slots, and auction
                  schedules.
                </li>
                <li>
                  <strong className="font-semibold text-neutral-900">Preferred Chit Scheme:</strong>{' '}
                  The approximate monthly contribution or chit value you are interested in exploring.
                </li>
                <li>
                  <strong className="font-semibold text-neutral-900">Enquiry Message:</strong> Any
                  specific questions, timeline preferences, or notes you include in your submission.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                3. How We Use Collected Enquiry Information
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                Information submitted through our website enquiry forms is used strictly for legitimate
                business communications, including:
              </p>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-neutral-600">
                <li>Contacting you by telephone, SMS, or WhatsApp to respond to your inquiry.</li>
                <li>Explaining the legal terms, auction processes, and documentation required for chit membership.</li>
                <li>Scheduling in-person visits to our Shamshabad office.</li>
                <li>Maintaining basic internal records of incoming prospective subscriber inquiries.</li>
              </ul>
              <p className="text-sm leading-relaxed text-neutral-600">
                We do not sell, rent, trade, or distribute your contact details to third-party commercial
                telemarketing agencies or unauthorized data brokers.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                4. Third-Party Form Processing and Infrastructure
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                To reliably capture and transmit website enquiry submissions, we may utilize hosted
                form services (such as Formspree or equivalent secure message forwarding platforms).
                When you submit an enquiry form:
              </p>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-neutral-600">
                <li>
                  Your submitted form data is securely transmitted to the designated hosted form
                  service provider for delivery to our company email inbox.
                </li>
                <li>
                  These providers operate under industry-standard encryption protocols (HTTPS/TLS)
                  to safeguard data during transmission.
                </li>
                <li>
                  Our web hosting servers may log standard technical parameters (such as IP addresses,
                  browser user-agent strings, and request timestamps) necessary for website security
                  and server diagnostics.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                5. Website Analytics and Tracking Notice
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                When enabled, aggregated website analytics tools may be utilized to measure overall site
                traffic, popular pages, device categories, and general navigation flows. Such data is
                collected on an aggregated, anonymous basis to evaluate marketing performance and
                enhance website usability. We do not use intrusive profiling or sell behavioral data.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                6. Subscriber Records and Statutory Regulations
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                Website enquiry submissions represent preliminary interest only. When an individual
                subsequently decides to formally enroll in a registered chit group, comprehensive KYC
                documentation (identity proof, address proof, financial verification) is collected
                offline pursuant to statutory mandates under the Chit Funds Act, 1982. Such official
                subscriber records are maintained in compliance with applicable regulatory record-retention
                mandates.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                7. Contact for Data Concerns and Inquiries
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                If you have questions regarding this draft policy, wish to update your contact details,
                or wish to request deletion of your preliminary enquiry record, please reach out to
                our office:
              </p>
              <Card padding="md" className="border-neutral-200 bg-neutral-50/70 text-xs text-neutral-700">
                <p className="font-semibold text-neutral-900">{siteConfig.name}</p>
                <p>{siteConfig.address.fullAddress}</p>
                <p className="mt-1">
                  Registered State: {siteConfig.legal.registeredState} &bull; Chit Funds Act, 1982
                </p>
              </Card>
            </section>

            {/* Bottom CTA Card */}
            <Card padding="lg" className="border-brand-purple-200 bg-brand-purple-50/40 text-center">
              <h3 className="font-serif text-lg font-bold text-brand-purple-950">
                Looking for Scheme Information or Have Questions?
              </h3>
              <p className="mt-1 text-sm text-neutral-600">
                Explore our available chit groups or reach out directly to our Shamshabad office.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <Button href="/chit-groups" variant="primary">
                  View Chit Groups
                </Button>
                <Button href="/contact" variant="outline">
                  Contact Office
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
