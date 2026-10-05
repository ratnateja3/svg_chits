import type { ChitPlan } from '../types';

/**
 * Shri Vijaya Ganapathi Chit Fund Pvt Ltd
 * Chit Plan Schemes & Groups Configuration.
 *
 * NOTE: Official company chit plans and government approval numbers are pending confirmation.
 * The plans below are clearly marked sample placeholders.
 * Official chit schemes will be updated once confirmed by the company management.
 */
export const SAMPLE_PLAN_NOTICE = 'Sample – details to be confirmed';

export const chitPlans: ChitPlan[] = [
  {
    id: 'sample-plan-100k',
    name: 'Sample Scheme 1 Lakh (Mock)',
    chitValue: 100000,
    monthlyInstalment: 4000,
    durationMonths: 25,
    members: 25,
    location: 'Shamshabad, Hyderabad',
    status: 'open',
    notes: SAMPLE_PLAN_NOTICE,
    isPlaceholder: true,
  },
  {
    id: 'sample-plan-250k',
    name: 'Sample Scheme 2.5 Lakhs (Mock)',
    chitValue: 250000,
    monthlyInstalment: 5000,
    durationMonths: 50,
    members: 50,
    location: 'Shamshabad, Hyderabad',
    status: 'filling',
    notes: SAMPLE_PLAN_NOTICE,
    isPlaceholder: true,
  },
  {
    id: 'sample-plan-500k',
    name: 'Sample Scheme 5 Lakhs (Mock)',
    chitValue: 500000,
    monthlyInstalment: 10000,
    durationMonths: 50,
    members: 50,
    location: 'Shamshabad, Hyderabad',
    status: 'open',
    notes: SAMPLE_PLAN_NOTICE,
    isPlaceholder: true,
  },
  {
    id: 'sample-plan-1000k',
    name: 'Sample Scheme 10 Lakhs (Mock)',
    chitValue: 1000000,
    monthlyInstalment: 20000,
    durationMonths: 50,
    members: 50,
    location: 'Shamshabad, Hyderabad',
    status: 'filling',
    notes: SAMPLE_PLAN_NOTICE,
    isPlaceholder: true,
  },
  {
    id: 'sample-plan-2000k',
    name: 'Sample Scheme 20 Lakhs (Mock)',
    chitValue: 2000000,
    monthlyInstalment: 50000,
    durationMonths: 40,
    members: 40,
    location: 'Shamshabad, Hyderabad',
    status: 'upcoming',
    notes: SAMPLE_PLAN_NOTICE,
    isPlaceholder: true,
  },
  {
    id: 'sample-plan-5000k',
    name: 'Sample Scheme 50 Lakhs (Mock)',
    chitValue: 5000000,
    monthlyInstalment: 100000,
    durationMonths: 50,
    members: 50,
    location: 'Shamshabad, Hyderabad',
    status: 'full',
    notes: SAMPLE_PLAN_NOTICE,
    isPlaceholder: true,
  },
];

/**
 * Returns all configured chit plans.
 */
export function getAllChitPlans(): ChitPlan[] {
  return chitPlans;
}

/**
 * Returns the top 3 featured plans (for home page preview).
 */
export function getFeaturedChitPlans(): ChitPlan[] {
  return chitPlans.slice(0, 3);
}

/**
 * Find a plan by its identifier.
 */
export function getChitPlanById(id: string): ChitPlan | undefined {
  return chitPlans.find((plan) => plan.id === id);
}
