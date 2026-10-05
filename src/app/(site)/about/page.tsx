import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.name}`,
  description: `Learn about ${siteConfig.name}, our mission, vision, core values, and commitment to disciplined financial savings under the Chit Funds Act, 1982.`,
};

const values = [
  {
    title: 'Statutory Transparency',
    description:
      'We conduct all monthly auctions, dividend distributions, and group accounting in complete alignment with the Chit Funds Act, 1982, ensuring clear and auditable records.',
  },
  {
    title: 'Subscriber Trust',
    description:
      'Our priority is safeguarding subscriber commitments. We ensure prompt communication, verified documentation, and secure handling of all group funds.',
  },
  {
    title: 'Financial Discipline',
    description:
      'We empower households and enterprise owners to build sustainable saving habits and access capital systematically without arbitrary terms or unmanageable debt.',
  },
  {
    title: 'Ethical Administration',
    description:
      'From enrollment verification to prize money disbursement, our operations are managed with fairness, professionalism, and mutual member respect.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* 1. Header Hero Section */}
      <Section spacing="lg" background="subtle" className="border-b border-brand-purple-100/80">
        <Container size="default">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              as="h1"
              badge="About Our Company"
              badgeVariant="gold"
              title={`About ${siteConfig.name}`}
              description="A government-registered chit fund company dedicated to disciplined savings, transparent group auctions, and accessible financial capital."
              align="center"
            />
          </div>
        </Container>
      </Section>

      {/* 2. Company Identity & Purpose */}
      <Section spacing="md" background="white" className="border-b border-neutral-200/80">
        <Container size="default">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-4 text-base leading-relaxed text-neutral-700 lg:col-span-7">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-brand-purple-950 sm:text-3xl">
                Who We Are
              </h2>
              <p>
                <strong className="font-semibold text-neutral-900">{siteConfig.name}</strong> is an
                incorporated financial services company operating under the regulatory framework of
                the <strong className="font-semibold text-neutral-900">Chit Funds Act, 1982</strong>{' '}
                in the State of {siteConfig.legal.registeredState}.
              </p>
              <p>
                Rooted in the commercial hub of Shamshabad, Hyderabad, our institution was founded on
                the belief that structured community chit funds provide an essential, time-tested
                financial bridge for households, salaried individuals, self-employed professionals,
                and micro-business entrepreneurs.
              </p>
              <p>
                Unlike informal savings circles or high-interest lending options, registered chit funds
                offer dual financial utility within a legally protected framework: members
                systematically save each month, earn auction-derived dividend deductions, and retain
                the opportunity to bid for a lump sum to meet planned milestone expenses.
              </p>
            </div>

            {/* Corporate Profile Card */}
            <div className="lg:col-span-5">
              <Card padding="lg" className="space-y-4 border-brand-purple-100 bg-brand-purple-50/30">
                <h3 className="border-b border-brand-purple-100 pb-3 font-serif text-lg font-bold text-brand-purple-900">
                  Company Identity &amp; Profile
                </h3>

                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Entity Name
                    </dt>
                    <dd className="font-semibold text-neutral-900">{siteConfig.name}</dd>
                  </div>

                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Short Name / Brand
                    </dt>
                    <dd className="font-medium text-neutral-800">{siteConfig.shortName}</dd>
                  </div>

                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Statutory Framework
                    </dt>
                    <dd className="font-medium text-neutral-800">
                      Regulated by the Chit Funds Act, 1982 ({siteConfig.legal.registeredState})
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Registered Office
                    </dt>
                    <dd className="font-medium leading-relaxed text-neutral-800">
                      {siteConfig.address.fullAddress}
                    </dd>
                  </div>
                </dl>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Mission & Vision */}
      <Section spacing="md" background="subtle" className="border-b border-neutral-200/80">
        <Container size="default">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card padding="lg" className="border-neutral-200/90 bg-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-purple-50 text-brand-purple-900 font-bold">
                M
              </div>
              <h2 className="mt-4 font-serif text-xl font-bold text-brand-purple-950">Our Mission</h2>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                To provide transparent, dependable, and legally compliant chit fund schemes that foster
                disciplined monthly savings and offer accessible, timely capital for our subscribers&apos;
                family and business milestones.
              </p>
            </Card>

            <Card padding="lg" className="border-neutral-200/90 bg-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gold-50 text-brand-gold-900 font-bold">
                V
              </div>
              <h2 className="mt-4 font-serif text-xl font-bold text-brand-purple-950">Our Vision</h2>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">
                To be the most trusted and customer-focused registered chit fund company in the region,
                recognized for exemplary governance, prompt prize disbursements, and empowering our
                subscribers toward financial self-reliance.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 4. Core Values */}
      <Section spacing="md" background="white" className="border-b border-neutral-200/80">
        <Container size="default">
          <div className="space-y-10 sm:space-y-12">
            <SectionHeading
              badge="Operating Principles"
              badgeVariant="gold"
              title="Our Core Values"
              description="The foundational standards guiding our administration, subscriber relationships, and auction proceedings."
              align="center"
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((val, idx) => (
                <Card
                  key={val.title}
                  padding="md"
                  hover
                  className="flex flex-col justify-between border-neutral-200/90 bg-white"
                >
                  <div>
                    <span className="font-serif text-lg font-bold text-brand-purple-900">
                      0{idx + 1}
                    </span>
                    <h3 className="mt-2 font-serif text-base font-bold text-neutral-900">
                      {val.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">{val.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Clear Conversion CTA */}
      <Section spacing="md" background="subtle">
        <Container size="narrow">
          <div className="rounded-xl border border-brand-purple-200 bg-white p-8 text-center shadow-xs sm:p-10">
            <h2 className="font-serif text-2xl font-bold text-brand-purple-950 sm:text-3xl">
              Partner with a Registered Chit Fund
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-neutral-600">
              Explore our range of chit groups or consult directly with our Shamshabad team to select
              a plan matched to your monthly savings goals.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href="/chit-groups" variant="primary" size="lg">
                View Chit Groups
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Contact Our Office
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
