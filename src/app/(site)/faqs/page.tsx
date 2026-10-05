import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: `Frequently Asked Questions | ${siteConfig.name}`,
  description:
    'Common questions and answers regarding chit fund enrollment, monthly instalments, reverse auction bidding, and prize disbursement.',
};

const faqItems = [
  {
    question: 'What is a chit fund?',
    answer:
      'A chit fund is a traditional Indian financial mechanism governed by the Chit Funds Act, 1982. It allows a predetermined group of individuals to come together for a fixed duration, contributing equal monthly instalments into a common pool, and receiving lump-sum amounts through scheduled monthly bidding auctions.',
  },
  {
    question: 'How does a chit group work?',
    answer:
      'A chit group consists of a specific number of members (e.g. 50 subscribers) contributing a fixed instalment over a set duration (e.g. 50 months) for a defined chit value (e.g. ₹5,00,000). Every month, a reverse auction is held where members who need funds bid a discount. The prized subscriber receives the remaining amount, and the discount is distributed as dividends to all members.',
  },
  {
    question: 'How do I join a chit group?',
    answer:
      'To join a chit group, prospective subscribers submit basic identity verification documents (KYC: PAN, Aadhaar, address verification), choose an open chit scheme matching their savings goals, and execute the statutory subscriber agreement before the group commencement date.',
  },
  {
    question: 'What are monthly instalments and how are dividends applied?',
    answer:
      'The gross monthly instalment is determined by dividing the total chit value by the tenure duration. Following monthly auctions, the discount bid by the winning subscriber (after statutory foreman commission) is distributed equally among all members as a dividend, reducing the actual out-of-pocket payment due for the subsequent month.',
  },
  {
    question: 'How does the prize amount process work?',
    answer:
      'When you need capital, you attend or submit an auction bid during the scheduled monthly meeting. If your discount offer is accepted as the winning bid, you provide standard surety documentation to ensure the security of remaining monthly payments. Once verified, the prize money is credited directly to your bank account.',
  },
  {
    question: 'What happens if I have questions about my group or auction statements?',
    answer:
      'All members receive regular monthly statement notices detailing auction outcomes, dividends earned, and next payment amounts. You can always visit our registered Shamshabad office in person, or call our customer service team for prompt clarification on your group balance.',
  },
  {
    question: 'How can I contact the company?',
    answer:
      'You can reach Shri Vijaya Ganapathi Chit Fund Pvt Ltd by visiting our registered office at 20-120/3, RB Nagar, Shamshabad, RR District, Hyderabad, India, 501218. You can also submit an online enquiry through our website or reach out via phone and WhatsApp during business hours.',
  },
];

export default function FaqsPage() {
  return (
    <>
      {/* 1. Header Hero */}
      <Section spacing="lg" background="subtle" className="border-b border-brand-purple-100/80">
        <Container size="default">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              as="h1"
              badge="Help & Guidance"
              badgeVariant="gold"
              title="Frequently Asked Questions"
              description="Clear, general guidance regarding chit fund operations, enrollment rules, monthly contributions, and auction bidding."
              align="center"
            />
          </div>
        </Container>
      </Section>

      {/* 2. Native Details / Summary Accordion Section */}
      <Section spacing="lg" background="white" className="border-b border-neutral-200/80">
        <Container size="narrow">
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <details
                key={faq.question}
                className="group rounded-lg border border-neutral-200 bg-white p-5 transition-colors open:border-brand-purple-300 open:bg-brand-purple-50/20 shadow-2xs"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-base font-bold text-brand-purple-950 sm:text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700 focus-visible:ring-offset-2 rounded">
                  <span>{faq.question}</span>
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-purple-50 text-brand-purple-900 group-open:rotate-180 transition-transform duration-200">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="pt-3 text-sm leading-relaxed text-neutral-600 sm:text-base border-t border-neutral-100/80 mt-3">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-neutral-500">
            * Note: The answers above provide general informational guidance. Exact terms, bid caps,
            and surety documentation are governed by individual chit agreements and the provisions of
            the Chit Funds Act, 1982.
          </p>
        </Container>
      </Section>

      {/* 3. Conversion CTA */}
      <Section spacing="md" background="subtle">
        <Container size="narrow">
          <div className="rounded-xl border border-brand-purple-200 bg-white p-8 text-center shadow-xs sm:p-10">
            <h2 className="font-serif text-2xl font-bold text-brand-purple-950 sm:text-3xl">
              Have a Specific Question About a Scheme?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-neutral-600">
              Our team is ready to assist you with detailed subscription tiers, current open groups,
              and documentation requirements.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href="/contact" variant="primary" size="lg">
                Ask Our Team
              </Button>
              <Button href="/chit-groups" variant="outline" size="lg">
                View Available Groups
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
