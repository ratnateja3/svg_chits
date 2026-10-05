import type { ChitPlan } from '../types';

/**
 * Shri Vijaya Ganapathi Chit Fund Pvt Ltd
 * Centralized Chit Groups Configuration.
 *
 * Confirmed company chit groups: 9 total groups
 * - 2 new groups: Open for enquiries
 * - 7 older/running groups: Currently full (no available slots)
 *
 * NOTE: Unsupplied fields (such as specific monthly instalments, auction dates,
 * or registration orders) are represented safely as null without fabrication.
 */

export const chitPlans: ChitPlan[] = [
  // ==========================================
  // NEW / OPEN CHIT GROUPS (2 Groups)
  // ==========================================
  {
    id: 'new-group-15l-30m',
    name: 'New Group ₹15 Lakhs (30M)',
    chitValue: 1500000,
    monthlyInstalment: null, // Confirmed on enquiry; not fabricated
    durationMonths: 30,
    members: 30,
    location: 'Shamshabad, Hyderabad',
    status: 'open',
    notes: 'New Group • Open for Enquiries',
    isPlaceholder: false,
  },
  {
    id: 'new-group-6l-30m',
    name: 'New Group ₹6 Lakhs (30M)',
    chitValue: 600000,
    monthlyInstalment: null, // Confirmed on enquiry; not fabricated
    durationMonths: 30,
    members: 30,
    location: 'Shamshabad, Hyderabad',
    status: 'open',
    notes: 'New Group • Open for Enquiries',
    isPlaceholder: false,
  },

  // ==========================================
  // RUNNING / FULL CHIT GROUPS (7 Groups)
  // Currently full; no available slots
  // ==========================================
  {
    id: 'running-group-30l-30m',
    name: 'Running Group ₹30 Lakhs (30M)',
    chitValue: 3000000,
    monthlyInstalment: null,
    durationMonths: 30,
    members: 30,
    location: 'Shamshabad, Hyderabad',
    status: 'full',
    notes: 'Running Group • Currently Full',
    isPlaceholder: false,
  },
  {
    id: 'running-group-6l-30m',
    name: 'Running Group ₹6 Lakhs (30M)',
    chitValue: 600000,
    monthlyInstalment: null,
    durationMonths: 30,
    members: 30,
    location: 'Shamshabad, Hyderabad',
    status: 'full',
    notes: 'Running Group • Currently Full',
    isPlaceholder: false,
  },
  {
    id: 'running-group-3l-30m',
    name: 'Running Group ₹3 Lakhs (30M)',
    chitValue: 300000,
    monthlyInstalment: null,
    durationMonths: 30,
    members: 30,
    location: 'Shamshabad, Hyderabad',
    status: 'full',
    notes: 'Running Group • Currently Full',
    isPlaceholder: false,
  },
  {
    id: 'running-group-10l-40m',
    name: 'Running Group ₹10 Lakhs (40M)',
    chitValue: 1000000,
    monthlyInstalment: null,
    durationMonths: 40,
    members: 40,
    location: 'Shamshabad, Hyderabad',
    status: 'full',
    notes: 'Running Group • Currently Full',
    isPlaceholder: false,
  },
  {
    id: 'running-group-5l-40m',
    name: 'Running Group ₹5 Lakhs (40M)',
    chitValue: 500000,
    monthlyInstalment: null,
    durationMonths: 40,
    members: 40,
    location: 'Shamshabad, Hyderabad',
    status: 'full',
    notes: 'Running Group • Currently Full',
    isPlaceholder: false,
  },
  {
    id: 'running-group-10l-50m',
    name: 'Running Group ₹10 Lakhs (50M)',
    chitValue: 1000000,
    monthlyInstalment: null,
    durationMonths: 50,
    members: 50,
    location: 'Shamshabad, Hyderabad',
    status: 'full',
    notes: 'Running Group • Currently Full',
    isPlaceholder: false,
  },
  {
    id: 'running-group-25l-50m',
    name: 'Running Group ₹25 Lakhs (50M)',
    chitValue: 2500000,
    monthlyInstalment: null,
    durationMonths: 50,
    members: 50,
    location: 'Shamshabad, Hyderabad',
    status: 'full',
    notes: 'Running Group • Currently Full',
    isPlaceholder: false,
  },
];

/**
 * Returns all configured chit plans (9 confirmed groups).
 */
export function getAllChitPlans(): ChitPlan[] {
  return chitPlans;
}

/**
 * Returns the 2 open new groups.
 */
export function getOpenChitPlans(): ChitPlan[] {
  return chitPlans.filter((plan) => plan.status === 'open');
}

/**
 * Returns the 7 running/full groups.
 */
export function getFullChitPlans(): ChitPlan[] {
  return chitPlans.filter((plan) => plan.status === 'full');
}

/**
 * Returns featured plans for the home page preview:
 * Displays the 2 open new groups + 1 running group to demonstrate active operations.
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
