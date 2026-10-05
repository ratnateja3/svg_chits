import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

const pillars = [
  {
    title: 'Transparent Process',
    description:
      'All group operations, monthly auction schedules, bid discounts, and dividend distributions are conducted openly with clear documentation under statutory rules.',
  },
  {
    title: 'Customer-Focused Service',
    description:
      'Dedicated guidance from enrollment to prize disbursement. We assist members at every step to ensure your financial objectives are seamlessly met.',
  },
  {
    title: 'Convenient Chit Options',
    description:
      'A structured spectrum of chit values and subscription durations designed to accommodate household monthly budgets as well as enterprise capital planning.',
  },
  {
    title: 'Professional Approach',
    description:
      'Strict compliance with the Chit Funds Act, 1982, systematic accounting practices, and reliable administrative oversight for every subscriber group.',
  },
  {
    title: 'Accessible Local Support',
    description:
      'Direct assistance from our registered office in Shamshabad, Hyderabad. Members can easily consult with our team in person or via verified contact channels.',
  },
];

export function WhyChooseUsSection() {
  return (
    <Section spacing="md" background="white" className="border-b border-neutral-200/80">
      <Container size="default">
        <div className="space-y-10 sm:space-y-12">
          <SectionHeading
            badge="Why Us"
            badgeVariant="gold"
            title="Why Choose Shri Vijaya Ganapathi Chit Fund"
            description="Our service is built entirely on statutory compliance, clear processes, and attentive subscriber support."
            align="center"
          />

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {pillars.map((pillar, index) => (
              <Card
                key={pillar.title}
                padding="lg"
                hover
                className={`border-neutral-200/80 bg-white ${
                  index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-purple-50 text-brand-purple-900 font-bold text-sm">
                  0{index + 1}
                </div>

                <h3 className="mt-4 font-serif text-lg font-bold text-neutral-900">
                  {pillar.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {pillar.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/why-us"
              className="inline-flex items-center text-sm font-semibold text-brand-purple-900 hover:text-brand-purple-800 hover:underline"
            >
              Learn more about our standards and practices &rarr;
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
