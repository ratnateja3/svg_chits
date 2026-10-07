'use client';

import React from 'react';

export interface CareerRole {
  id: string;
  title: string;
  type: string;
  badgeVariant?: 'green' | 'amber';
  description: string;
  points: string[];
}

interface CareerRoleCardProps {
  role: CareerRole;
  onApply: (roleTitle: string) => void;
}

export function CareerRoleCard({ role, onApply }: CareerRoleCardProps) {
  const isCommission = role.badgeVariant === 'amber';

  return (
    <div className="flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-6 shadow-xs transition-all hover:border-brand-purple-300 hover:shadow-md sm:p-7">
      <div>
        {/* Type Badge */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              isCommission
                ? 'border border-amber-300 bg-amber-50 text-amber-900'
                : 'border border-emerald-300 bg-emerald-50 text-emerald-900'
            }`}
          >
            {role.type}
          </span>
          {isCommission && (
            <span className="text-[11px] font-medium text-neutral-500">
              Commission Basis
            </span>
          )}
        </div>

        {/* Role Title */}
        <h3 className="font-serif text-xl font-bold tracking-tight text-brand-purple-950 sm:text-2xl">
          {role.title}
        </h3>

        {/* Short Description */}
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">{role.description}</p>

        {/* Clean Bullet Points */}
        <ul className="mt-4 space-y-2 border-t border-neutral-100 pt-4 text-xs text-neutral-700 sm:text-sm">
          {role.points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-purple-50 text-[10px] font-bold text-brand-purple-900">
                ✓
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <div className="mt-6 pt-2">
        <button
          type="button"
          onClick={() => onApply(role.title)}
          className="flex min-h-[44px] w-full items-center justify-center rounded-md bg-brand-purple-950 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-colors hover:bg-brand-purple-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700 active:bg-brand-purple-950"
        >
          Apply for this Role &rarr;
        </button>
      </div>
    </div>
  );
}
