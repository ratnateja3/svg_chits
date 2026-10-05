import React from 'react';
import type { ChitPlan } from '@/types';
import { ChitPlanCard } from '@/components/shared/ChitPlanCard';

export interface ChitPlanGridProps {
  plans: ChitPlan[];
  onEnquire?: (plan: ChitPlan) => void;
  className?: string;
}

export function ChitPlanGrid({ plans, onEnquire, className }: ChitPlanGridProps) {
  if (!plans || plans.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-6 py-12 text-center text-neutral-500">
        <p className="text-base font-medium">No chit plans are currently available.</p>
        <p className="mt-1 text-xs">
          Please contact our Shamshabad office for upcoming group dates.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 ${className || ''}`}
    >
      {plans.map((plan) => (
        <ChitPlanCard key={plan.id} plan={plan} onEnquire={onEnquire} />
      ))}
    </div>
  );
}
