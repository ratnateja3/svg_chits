import React from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

const useCases = [
  {
    title: 'Disciplined Monthly Planning',
    category: 'Household Savings',
    description:
      'Cultivate a steady, contractual commitment to monthly saving. Earn dividend credits that reduce subsequent instalments while building a substantial financial cushion.',
  },
  {
    title: 'Business Working Capital',
    category: 'Enterprise Growth',
    description:
      'Manage inventory purchases, seasonal operational needs, or equipment upgrades with timely access to lump-sum capital without cumbersome bank collateral hurdles.',
  },
  {
    title: 'Higher Education & Academics',
    category: 'Future Goals',
    description:
      'Plan ahead for university admissions, professional training, or overseas tuition fees through a systematic monthly subscription that matures when fees are due.',
  },
  {
    title: 'Marriages & Life Milestones',
    category: 'Family Occasions',
    description:
      'Fund wedding ceremonies, anniversary celebrations, and family milestones methodically, preventing sudden financial distress or high-interest informal borrowing.',
  },
  {
    title: 'Major Planned Expenses',
    category: 'Asset Creation',
    description:
      'Finance essential home improvements, solar installations, property documentation, or vehicle down-payments through scheduled monthly allocations.',
  },
  {
    title: 'Emergency Liquidity Reserve',
    category: 'Contingency Access',
    description:
      'Enjoy the unique flexibility of an auction-based chit fund: if an unforeseen medical or financial emergency arises, you can bid early to access needed liquidity.',
  },
];

export function BenefitsSection() {
  return (
    <Section spacing="md" background="subtle" className="border-b border-neutral-200/80">
      <Container size="default">
        <div className="space-y-10 sm:space-y-12">
          <SectionHeading
            badge="Practical Financial Planning"
            badgeVariant="purple"
            title="Real-World Use Cases for Chit Schemes"
            description="Chit funds serve as versatile, community-based financial instruments combining disciplined savings with accessible milestone borrowing."
            align="center"
          />

          {/* Use Cases Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {useCases.map((item) => (
              <Card
                key={item.title}
                padding="lg"
                hover
                className="flex flex-col justify-between border-neutral-200/90 bg-white"
              >
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-gold-800">
                    {item.category}
                  </span>

                  <h3 className="mt-1 font-serif text-lg font-bold text-neutral-900">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-neutral-600">
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Clarity Disclaimer */}
          <div className="mx-auto max-w-2xl rounded-lg border border-neutral-200 bg-white p-4 text-center text-xs leading-relaxed text-neutral-500 shadow-2xs">
            <p>
              <strong className="font-semibold text-neutral-700">Financial Understanding:</strong>{' '}
              Chit funds are dual-purpose savings and credit instruments governed by statute. They do
              not represent guaranteed fixed-return investments, market securities, or speculative
              instruments. Total returns and net borrowing costs depend upon monthly auction bidding
              dynamics among group members.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
