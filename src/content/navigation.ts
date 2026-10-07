import type { NavItem } from '@/types';

/**
 * Main desktop and mobile navigation links.
 */
export const navigationLinks: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Chit Groups', href: '/chit-groups' },
  { label: 'How It Works', href: '/how-chit-funds-work' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'Careers', href: '/careers' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact', href: '/contact' },
  { label: 'Pay Now', href: '/pay-now', variant: 'quiet' },
  { label: 'Enquire Now', href: '/contact', variant: 'prominent' },
];

/**
 * Quick links for footer section.
 */
export const footerQuickLinks: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Chit Groups', href: '/chit-groups' },
  { label: 'How It Works', href: '/how-chit-funds-work' },
  { label: 'Why Choose Us', href: '/why-us' },
  { label: 'Careers', href: '/careers' },
  { label: 'Frequently Asked Questions', href: '/faqs' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Pay Online', href: '/pay-now' },
];

/**
 * Legal links for footer and compliance.
 */
export const legalLinks: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms and Conditions', href: '/terms-and-conditions' },
];
