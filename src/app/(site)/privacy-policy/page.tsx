import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/content/site';
import { buildPageMetadata } from '@/lib/seo';
import { getTelLink, getEmailLink } from '@/lib/contact';

export const metadata: Metadata = buildPageMetadata({
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Official Privacy Policy of Shri Vijaya Ganapathi Chit Fund Pvt Ltd. Learn how we collect, protect, and handle personal and website data.`,
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  const telLink = getTelLink();
  const emailLink = getEmailLink();

  return (
    <>
      {/* 1. Header Hero */}
      <Section spacing="lg" background="subtle" className="border-b border-brand-purple-100/80">
        <Container size="default">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              as="h1"
              badge="Compliance & Privacy"
              badgeVariant="gold"
              title="Privacy Policy"
              description={`Official privacy guidelines and personal data governance policy for ${siteConfig.name}.`}
              align="center"
            />
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-neutral-500">
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 font-medium text-neutral-700 shadow-2xs border border-neutral-200">
                Effective Date: 9/10/2026
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 font-medium text-neutral-700 shadow-2xs border border-neutral-200">
                Last Updated: 9/10/2026
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Main Policy Content */}
      <Section spacing="lg" background="white">
        <Container size="narrow">
          <div className="space-y-10 text-neutral-700">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                1. Introduction
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                <strong className="font-semibold text-neutral-900">Shri Vijaya Ganapathi Chit Fund PVT. LTD.</strong>{' '}
                (&quot;SVG Chits&quot;, &quot;Company&quot;, &quot;we&quot;, &quot;our&quot; or &quot;us&quot;) is committed to
                respecting the privacy of its customers, prospective customers and website visitors.
              </p>
              <p className="text-sm leading-relaxed text-neutral-600">
                This Privacy Policy explains what personal information we collect, why we collect it, how we use and protect
                it, when it may be shared, and how individuals can contact us regarding their personal information.
              </p>
              <p className="text-sm leading-relaxed text-neutral-600">
                This policy covers information collected through our website, customer enquiries and our customer onboarding
                and administrative processes, subject to applicable laws and statutory regulations under the Chit Funds Act, 1982.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-5">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                2. Personal Information We Collect
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                We collect different information depending on whether an individual is enquiring about our services or becoming a customer.
              </p>

              {/* Subsection A */}
              <div className="space-y-3 rounded-lg border border-neutral-200/90 bg-neutral-50/70 p-5">
                <h3 className="font-serif text-base font-bold text-brand-purple-950">
                  A. Information Collected Through Our Website
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600">
                  When a visitor submits an enquiry through our website forms or interactive modules, we collect:
                </p>
                <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-600">
                  <li>
                    <strong className="font-semibold text-neutral-900">Name:</strong> To identify the person making the enquiry.
                  </li>
                  <li>
                    <strong className="font-semibold text-neutral-900">Mobile number:</strong> To contact the person via phone, SMS, or WhatsApp and respond to their enquiry.
                  </li>
                  <li>
                    <strong className="font-semibold text-neutral-900">Interested chit group:</strong> To understand the visitor&apos;s preferred chit group or financial milestone and provide relevant scheme details.
                  </li>
                  <li>
                    <strong className="font-semibold text-neutral-900">Enquiry message / notes:</strong> Any specific questions, comments, or preferred contact timings shared voluntarily.
                  </li>
                </ul>
                <p className="text-sm leading-relaxed text-neutral-600">
                  We use this information to respond to enquiries, explain available chit groups and help prospective customers understand our services.
                </p>
                <div className="rounded-md border border-neutral-200 bg-white p-3 text-xs font-medium text-neutral-700">
                  <strong>Notice:</strong> Our website enquiry form does not currently request Aadhaar numbers, residential addresses or nominee details.
                </div>
              </div>

              {/* Subsection B */}
              <div className="space-y-3 rounded-lg border border-neutral-200/90 bg-neutral-50/70 p-5">
                <h3 className="font-serif text-base font-bold text-brand-purple-950">
                  B. Information Collected From New Customers (Customer Onboarding)
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600">
                  During formal in-person customer onboarding and chit agreement execution, we collect the following information:
                </p>
                <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-600">
                  <li>
                    <strong className="font-semibold text-neutral-900">Name:</strong> To identify and maintain the customer&apos;s official records.
                  </li>
                  <li>
                    <strong className="font-semibold text-neutral-900">Residential address:</strong> For customer identification, communication, formal agreement execution, and statutory record-keeping requirements.
                  </li>
                  <li>
                    <strong className="font-semibold text-neutral-900">Mobile number:</strong> For customer communication, auction announcements, dividend updates, and account-related notifications.
                  </li>
                  <li>
                    <strong className="font-semibold text-neutral-900">Aadhaar number:</strong> Where collection and use are legally permitted and necessary for an identified purpose, subject to applicable Aadhaar-related requirements and statutory KYC rules.
                  </li>
                  <li>
                    <strong className="font-semibold text-neutral-900">Nominee name:</strong> To record the nominee details provided by the customer for the relevant administrative or contractual purpose.
                  </li>
                </ul>
                <p className="text-sm leading-relaxed text-neutral-600">
                  We collect and use these details to establish and maintain customer records, administer chit fund relationships, communicate with customers and fulfil applicable legal, contractual and regulatory obligations.
                </p>
                <p className="text-xs italic text-neutral-500">
                  We will not request or use personal information for purposes unrelated to the stated purposes without an appropriate lawful basis.
                </p>
              </div>

              {/* Subsection C: Automated Technical & Website Data */}
              <div className="space-y-3 rounded-lg border border-neutral-200/90 bg-neutral-50/70 p-5">
                <h3 className="font-serif text-base font-bold text-brand-purple-950">
                  C. Automated Technical Data &amp; Website Usage
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600">
                  When you browse our public website, standard technical parameters and anonymous metrics may be automatically logged:
                </p>
                <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-600">
                  <li>
                    <strong className="font-semibold text-neutral-900">Server Logs:</strong> Standard technical information such as IP addresses, browser user-agent strings, referring URLs, and request timestamps necessary for web server security, DDoS mitigation, and system diagnostics.
                  </li>
                  <li>
                    <strong className="font-semibold text-neutral-900">Aggregated Analytics:</strong> When enabled, anonymous metrics (e.g., page views, device types, general geographical regions) to assess website usability and improve content readability. We do not use intrusive cross-site tracking or commercial data profiling.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                3. Why We Collect Personal Information
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                SVG Chits may use personal information for the following specific purposes:
              </p>
              <ol className="list-decimal space-y-2 pl-5 text-sm text-neutral-600">
                <li>To respond to enquiries about our chit groups and services.</li>
                <li>To communicate with prospective and existing customers.</li>
                <li>To maintain customer enrolment and administrative records.</li>
                <li>To maintain nominee details where relevant to the customer relationship.</li>
                <li>To fulfil applicable legal, contractual, accounting and regulatory requirements.</li>
                <li>To protect our business, maintain accurate records and address suspected fraud or misuse where appropriate.</li>
                <li>To improve our website and customer service where relevant information is lawfully used for that purpose.</li>
              </ol>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                4. How We Protect Personal Information
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                We recognise that customer information must be handled responsibly. We implement and maintain reasonable technical, organisational and physical safeguards appropriate to the type of information we hold.
              </p>
              <p className="text-sm leading-relaxed text-neutral-600">
                These safeguards include:
              </p>
              <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-600">
                <li>
                  <strong className="font-semibold text-neutral-900">Restricted access:</strong> Access to customer information is limited strictly to authorised personnel who need it for their assigned operational responsibilities.
                </li>
                <li>
                  <strong className="font-semibold text-neutral-900">Secure physical records:</strong> Paper-based customer records and signed agreement files are stored in secure locations with access restricted to authorised personnel.
                </li>
                <li>
                  <strong className="font-semibold text-neutral-900">Digital security:</strong> Digital customer records are protected using appropriate access controls, strong authentication, and security measures suitable for the systems in use (including HTTPS/TLS encrypted transmission).
                </li>
                <li>
                  <strong className="font-semibold text-neutral-900">Confidentiality:</strong> Employees and authorised service providers handling customer information are instructed and bound to maintain strict confidentiality.
                </li>
                <li>
                  <strong className="font-semibold text-neutral-900">Responsible sharing:</strong> Customer information is never disclosed to unauthorised individuals or third-party organizations.
                </li>
                <li>
                  <strong className="font-semibold text-neutral-900">Security reviews:</strong> Appropriate periodic checks are conducted to identify and address risks involving the storage, access, and handling of customer information.
                </li>
              </ul>
              <p className="text-xs text-neutral-500">
                We take reasonable steps to prevent unauthorised access, disclosure, alteration, loss or misuse of personal information. However, no storage system or method of electronic transmission can be guaranteed to be completely secure.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                5. Aadhaar Information
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                Aadhaar information requires particular care. Where Aadhaar information is collected during onboarding, SVG Chits will handle it subject to applicable laws, permitted statutory purposes, and any relevant consent or verification requirements.
              </p>
              <p className="text-sm leading-relaxed text-neutral-600">
                We take appropriate measures to restrict access to Aadhaar information, avoid unnecessary disclosure, and prevent public exposure:
              </p>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-neutral-600">
                <li>We will not publish Aadhaar numbers or make them accessible to unauthorised persons.</li>
                <li>Where appropriate and legally permitted, masked Aadhaar or another permitted identification method is considered instead of retaining full Aadhaar numbers.</li>
                <li>Customers should not send Aadhaar details through the website enquiry form or other unsecured public communication channels.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                6. Sharing of Personal Information
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                <strong className="font-semibold text-neutral-900">SVG Chits does not sell personal information as a business practice.</strong>
              </p>
              <p className="text-sm leading-relaxed text-neutral-600">
                Personal information may be accessed or shared only where reasonably necessary and legally permitted, including:
              </p>
              <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-600">
                <li>With authorised employees responsible for customer onboarding, administration, and customer communication.</li>
                <li>With verified service providers supporting our website, information systems, or business operations, where strictly necessary and subject to confidentiality safeguards.</li>
                <li>With competent courts, government authorities, the Registrar of Chits, or law enforcement regulators where disclosure is required or permitted by applicable law.</li>
                <li>Where necessary to establish, exercise, or defend legal claims, subject to applicable law.</li>
              </ul>
              <p className="text-sm leading-relaxed text-neutral-600">
                We seek to limit disclosures strictly to the minimum information necessary for the relevant legitimate purpose.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                7. Data Retention and Deletion
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                We retain personal information only for as long as reasonably necessary for the purpose for which it was collected, including customer administration, applicable legal and regulatory obligations under the Chit Funds Act, 1982, financial accounting mandates, and the resolution of disputes.
              </p>
              <p className="text-sm leading-relaxed text-neutral-600">
                Different categories of information require different retention periods. Statutory records governed by registrar compliance or taxation rules are retained for the legally prescribed periods.
              </p>
              <p className="text-sm leading-relaxed text-neutral-600">
                When personal information is no longer required and there is no lawful reason to retain it, we take appropriate steps to delete it or otherwise dispose of it securely, subject to applicable law.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                8. Website Enquiries and Communications
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                Information submitted through our website enquiry forms is used solely to respond to the visitor&apos;s request and provide relevant particulars regarding the selected chit group.
              </p>
              <p className="text-sm leading-relaxed text-neutral-600">
                We may contact the person using the mobile number provided (via direct call, SMS, or WhatsApp) to address their enquiry and provide enrollment details.
              </p>
              <p className="text-sm leading-relaxed text-neutral-600">
                Any additional promotional communication will be handled in accordance with applicable law and relevant consent or preferences.
              </p>
              <div className="rounded-md border border-neutral-200 bg-neutral-50 p-3 text-xs text-neutral-700">
                <strong>Important note:</strong> Submitting a website enquiry does not, by itself, constitute formal enrolment in a chit group or create a contractual relationship with the Company. All chit group enrollments require separate agreement execution.
              </div>
            </section>

            {/* Section 9 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                9. Customer Rights and Privacy Requests
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                Subject to applicable law, individuals may request:
              </p>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-neutral-600">
                <li>Access to information concerning their personal data held by us.</li>
                <li>Correction or update of inaccurate or outdated information.</li>
                <li>Deletion of preliminary enquiry records where applicable.</li>
                <li>Withdrawal of consent where data processing relies solely on consent.</li>
                <li>Assistance or resolution concerning any privacy grievance.</li>
              </ul>
              <p className="text-sm leading-relaxed text-neutral-600">
                Requests can be submitted using the Company&apos;s contact details below. We may need to verify the requester&apos;s identity before acting on the request. Certain records must be retained to satisfy statutory or regulatory compliance obligations.
              </p>
            </section>

            {/* Section 10 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                10. Third-Party Services and External Links
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                Our website or business operations may use trusted third-party services to support hosting, database communication, or form handling (such as secure webhook integrations and email forwarding).
              </p>
              <p className="text-sm leading-relaxed text-neutral-600">
                Where such services handle personal information on our behalf, appropriate security and confidentiality safeguards are implemented. External websites or services linked from our website (such as external map navigations) operate under their own independent privacy practices, and visitors should review those respective policies.
              </p>
            </section>

            {/* Section 11 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                11. Changes to This Privacy Policy
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                We may update this Privacy Policy when our data-handling practices, services, or applicable legal and statutory requirements change.
              </p>
              <p className="text-sm leading-relaxed text-neutral-600">
                The latest version will always be published on this page with its updated effective date and revision date.
              </p>
            </section>

            {/* Section 12 */}
            <section className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
                12. Contact Information and Privacy Complaints
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                For questions, requests, or complaints concerning the handling of personal information, please contact:
              </p>

              <Card padding="lg" className="border-neutral-200 bg-neutral-50/80 shadow-2xs">
                <h3 className="font-serif text-base font-bold text-brand-purple-950">
                  Shri Vijaya Ganapathi Chit Fund PVT. LTD.
                </h3>
                <div className="mt-3 space-y-2 text-sm text-neutral-700">
                  <p>
                    <strong className="font-semibold text-neutral-900">Phone:</strong>{' '}
                    {telLink ? (
                      <a href={telLink} className="text-brand-purple-900 hover:underline">
                        +91 93928 24461
                      </a>
                    ) : (
                      '+91 93928 24461'
                    )}
                  </p>
                  <p>
                    <strong className="font-semibold text-neutral-900">Email:</strong>{' '}
                    {emailLink ? (
                      <a href={emailLink} className="text-brand-purple-900 hover:underline">
                        svgchits2022@gmail.com
                      </a>
                    ) : (
                      'svgchits2022@gmail.com'
                    )}
                  </p>
                  <p>
                    <strong className="font-semibold text-neutral-900">Registered Office:</strong>{' '}
                    20-123/3, RB Nagar, near Vijaya Ganapathi Temple, Shamshabad, RR District, Hyderabad, Telangana - 501218
                  </p>
                </div>
                <p className="mt-4 text-xs text-neutral-500 italic">
                  Please describe your request clearly so that the Company can review and respond appropriately.
                </p>
              </Card>

              <p className="text-xs text-neutral-500">
                This Privacy Policy should be read alongside applicable laws, the Chit Funds Act, 1982, and the Company&apos;s actual data-handling practices.
              </p>
            </section>

            {/* Bottom CTA Card */}
            <Card padding="lg" className="border-brand-purple-200 bg-brand-purple-50/40 text-center">
              <h3 className="font-serif text-lg font-bold text-brand-purple-950">
                Looking for Chit Scheme Information or Have Questions?
              </h3>
              <p className="mt-1 text-sm text-neutral-600">
                Explore our registered chit groups or reach out directly to our Shamshabad office.
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
