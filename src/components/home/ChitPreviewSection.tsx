import React from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ChitPlanGrid } from '@/components/shared/ChitPlanGrid';
import { getFeaturedChitPlans } from '@/content/chit-plans';

export function ChitPreviewSection() {
  const featuredPlans = getFeaturedChitPlans();

  return (
    <Section spacing="md" background="white" className="border-b border-neutral-200/80">
      <Container size="default">
        <div className="space-y-8 sm:space-y-10">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              badge="Chit Schemes"
              badgeVariant="gold"
              title="Featured Chit Groups"
              description="Explore structured monthly subscription tiers designed for varied savings targets and planned capital requirements."
            />

            <Button
              href="/chit-groups"
              variant="outline"
              className="hidden sm:inline-flex"
            >
              View All Chit Groups
            </Button>
          </div>

          {/* 3 Featured Chit Plan Cards */}
          <ChitPlanGrid plans={featuredPlans} />

          {/* Centered Button for mobile viewports */}
          <div className="text-center sm:hidden">
            <Button href="/chit-groups" variant="outline" fullWidth size="lg">
              View All Chit Groups
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
