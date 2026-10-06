'use client';

import React from 'react';
import type { ChitPlan, ChitPlanStatus } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatIndianCurrency } from '@/lib/format';

export interface ChitPlanCardProps {
  plan: ChitPlan;
  onEnquire?: (plan: ChitPlan) => void;
  className?: string;
  variant?: 'default' | 'compact';
}

const statusBadges: Record<ChitPlanStatus, { label: string; className: string }> = {
  open: {
    label: 'New Group • Open for Enquiries',
    className: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold',
  },
  filling: {
    label: 'Filling Fast',
    className: 'bg-brand-gold-50 text-brand-gold-900 border-brand-gold-300 font-semibold',
  },
  upcoming: {
    label: 'Upcoming Group',
    className: 'bg-brand-purple-50 text-brand-purple-800 border-brand-purple-200 font-semibold',
  },
  full: {
    label: 'Running Group • Currently Full',
    className: 'bg-neutral-100 text-neutral-700 border-neutral-300 font-medium',
  },
};

export function ChitPlanCard({
  plan,
  onEnquire,
  className,
  variant = 'default',
}: ChitPlanCardProps) {
  const badge = statusBadges[plan.status];
  const isFull = plan.status === 'full';

  if (variant === 'compact') {
    return (
      <Card
        border
        hover
        className={`relative flex flex-col justify-between p-6 sm:p-7 ${className || ''}`}
      >
        <div>
          {/* Status Badge */}
          <div className="mb-4">
            <span
              className={`inline-flex items-center rounded border px-2.5 py-1 text-xs ${badge.className}`}
            >
              {badge.label}
            </span>
          </div>

          {/* Chit Value Once */}
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Total Chit Value
            </p>
            <div className="font-serif text-3xl font-bold tracking-tight text-brand-purple-900">
              {formatIndianCurrency(plan.chitValue)}
            </div>
          </div>

          {/* Duration and Members Once */}
          <p className="mt-4 text-sm font-medium text-neutral-600">
            {plan.durationMonths} months - {plan.members} members
          </p>
        </div>

        {/* Card Action */}
        <div className="mt-6 pt-4">
          {onEnquire ? (
            <Button
              type="button"
              variant={isFull ? 'outline' : 'primary'}
              fullWidth
              onClick={() => onEnquire(plan)}
            >
              {isFull ? 'Ask About Future Availability' : 'Enquire for This Group'}
            </Button>
          ) : (
            <Button
              href={`/contact?plan=${encodeURIComponent(plan.name)}`}
              variant={isFull ? 'outline' : 'primary'}
              fullWidth
            >
              {isFull ? 'Ask About Future Availability' : 'Enquire for This Group'}
            </Button>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card
      border
      hover
      className={`relative flex flex-col justify-between p-6 sm:p-7 ${className || ''}`}
    >
      <div>
        {/* Status Badge */}
        <div className="mb-4 flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center rounded border px-2.5 py-1 text-xs ${badge.className}`}
          >
            {badge.label}
          </span>
          <span className="text-xs font-medium text-neutral-500">{plan.durationMonths} Months</span>
        </div>

        {/* Chit Value & Scheme Name */}
        <div className="mb-5">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Total Chit Value
          </p>
          <div className="font-serif text-3xl font-bold tracking-tight text-brand-purple-900">
            {formatIndianCurrency(plan.chitValue)}
          </div>
          <h3 className="mt-1 text-sm font-medium text-neutral-700">{plan.name}</h3>
        </div>

        {/* Plan Details Grid */}
        <div className="space-y-2.5 border-b border-t border-neutral-100 py-4 text-sm">
          <div className="flex items-center justify-between text-neutral-600">
            <span className="text-neutral-500">Monthly Contribution:</span>
            <span className="font-semibold text-neutral-900">
              {plan.monthlyInstalment !== null && plan.monthlyInstalment !== undefined
                ? formatIndianCurrency(plan.monthlyInstalment)
                : 'Available on enquiry'}
            </span>
          </div>

          <div className="flex items-center justify-between text-neutral-600">
            <span className="text-neutral-500">Duration:</span>
            <span className="font-semibold text-neutral-900">{plan.durationMonths} Months</span>
          </div>

          <div className="flex items-center justify-between text-neutral-600">
            <span className="text-neutral-500">Subscribers / Group:</span>
            <span className="font-semibold text-neutral-900">{plan.members} Members</span>
          </div>

          <div className="flex items-center justify-between text-neutral-600">
            <span className="text-neutral-500">Branch Office:</span>
            <span className="text-right text-xs font-medium text-neutral-800">{plan.location}</span>
          </div>
        </div>

        {/* Sample / Placeholder Plan Notice (only rendered if isPlaceholder is true) */}
        {plan.isPlaceholder && (
          <div className="mt-4 rounded border border-brand-gold-200/80 bg-brand-gold-50/70 p-2.5 text-[11px] font-medium leading-snug text-brand-gold-900">
            {plan.notes || 'Sample – details to be confirmed'}
          </div>
        )}
      </div>

      {/* Card Action */}
      <div className="mt-2 pt-6">
        {onEnquire ? (
          <Button
            type="button"
            variant={isFull ? 'outline' : 'primary'}
            fullWidth
            onClick={() => onEnquire(plan)}
          >
            {isFull ? 'Ask About Future Availability' : 'Enquire for This Group'}
          </Button>
        ) : (
          <Button
            href={`/contact?plan=${encodeURIComponent(plan.name)}`}
            variant={isFull ? 'outline' : 'primary'}
            fullWidth
          >
            {isFull ? 'Ask About Future Availability' : 'Enquire for This Group'}
          </Button>
        )}
      </div>
    </Card>
  );
}
