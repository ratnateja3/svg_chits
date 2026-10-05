import type { SiteConfig } from '@/types';

/**
 * Shri Vijaya Ganapathi Chit Fund Pvt Ltd
 * Centralized company and site configuration.
 *
 * NOTE: Only confirmed values are defined.
 * Placeholders are explicitly set to null and must not be invented.
 * All UI components consume information from this file.
 */
export const siteConfig: SiteConfig = {
  name: 'Shri Vijaya Ganapathi Chit Fund Pvt Ltd',
  shortName: 'SVG Chits',
  tagline: 'Trusted Chit Fund & Financial Savings',
  domain: null, // Placeholder: Domain to be confirmed

  address: {
    line1: '20-120/3',
    line2: 'RB Nagar',
    area: 'Shamshabad',
    city: 'Hyderabad',
    district: 'RR District',
    state: 'Telangana',
    pincode: '501218',
    country: 'India',
    fullAddress: '20-120/3, RB Nagar, Shamshabad, RR District, Hyderabad, India, 501218',
  },

  contact: {
    phone: '9392824461', // Confirmed official business phone
    phoneDisplay: '+91 93928 24461',
    whatsapp: null, // Placeholder: Official WhatsApp number pending confirmation
    whatsappDisplay: null,
    email: null, // Placeholder: Official email address pending confirmation
    workingHours: null, // Placeholder: Business hours pending confirmation
  },

  legal: {
    cin: null, // Placeholder: Corporate Identification Number pending confirmation
    registrationNumber: null, // Placeholder: Registration number pending confirmation
    registeredState: 'Telangana',
    pan: null, // Placeholder: PAN pending confirmation
    gstin: null, // Placeholder: GSTIN pending confirmation
  },

  socials: {
    facebook: null, // Placeholder: Official Facebook page pending confirmation
    instagram: null, // Placeholder: Official Instagram page pending confirmation
  },
};
