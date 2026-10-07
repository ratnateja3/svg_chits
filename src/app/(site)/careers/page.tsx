'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { CareerRoleCard, type CareerRole } from '@/components/careers/CareerRoleCard';
import { CareerApplicationForm } from '@/components/careers/CareerApplicationForm';
import { siteConfig } from '@/content/site';

const CAREER_ROLES: CareerRole[] = [
  {
    id: 'telecaller',
    title: 'Telecaller',
    type: 'Full Time',
    badgeVariant: 'green',
    description:
      'Handle customer calls, payment follow-ups, and coordinate daily communications for our Shamshabad office.',
    points: [
      'Customer calls & instalment payment follow-ups',
      'Handle member queries & record follow-up status',
      'Telugu, English & Hindi communication required',
    ],
  },
  {
    id: 'business-agent',
    title: 'Chit Fund Business Agent',
    type: 'Partnership',
    badgeVariant: 'amber',
    description:
      'Introduce new subscribers to our registered chit schemes and build your personal client network.',
    points: [
      'High commission & performance-based earnings',
      'Explain schemes & generate genuine enquiries',
      'Flexible partnership (Not a salaried position)',
    ],
  },
  {
    id: 'recovery-agent',
    title: 'Chit Fund Recovery Agent',
    type: 'Partnership',
    badgeVariant: 'amber',
    description:
      'Follow up on outstanding instalments and assist with payment recovery from prized subscribers.',
    points: [
      'Performance-linked recovery commission',
      'Follow up on overdue accounts respectfully & firmly',
      'Coordinate with branch team (Not a salaried position)',
    ],
  },
];

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<string>('Telecaller');

  const handleApply = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    const applySection = document.getElementById('apply');
    if (applySection) {
      applySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. Simplified Hero */}
      <Section spacing="md" background="subtle" className="border-b border-brand-purple-100/80">
        <Container size="default">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full border border-brand-gold-300 bg-brand-gold-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-gold-900">
              We&apos;re Hiring
            </span>
            <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-purple-950 sm:text-4xl">
              Career &amp; Agent Opportunities
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base">
              Join {siteConfig.name} in Shamshabad. Explore open roles in customer support and commission-based business partnerships.
            </p>
          </div>
        </Container>
      </Section>

      {/* 2. Simplified Role Cards */}
      <Section spacing="md" background="white" className="border-b border-neutral-200/80">
        <Container size="default">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {CAREER_ROLES.map((role) => (
              <CareerRoleCard key={role.id} role={role} onApply={handleApply} />
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. One Shared Application Form */}
      <Section spacing="md" background="subtle">
        <Container size="narrow">
          <CareerApplicationForm initialRole={selectedRole} />
        </Container>
      </Section>
    </>
  );
}
