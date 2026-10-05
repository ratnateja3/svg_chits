/**
 * Google Analytics 4 (GA4) Integration Helper
 * Safely dispatches marketing events when NEXT_PUBLIC_GA_ID is present in environment.
 * If NEXT_PUBLIC_GA_ID is absent, all functions execute as safe no-ops without runtime errors.
 */

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>,
    ) => void;
    dataLayer?: unknown[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || null;

/**
 * Checks whether GA4 is enabled via environment variable and loaded in browser.
 */
export function isGAActive(): boolean {
  return Boolean(
    GA_TRACKING_ID &&
      typeof window !== 'undefined' &&
      typeof window.gtag === 'function',
  );
}

/**
 * Safely dispatches a GA4 event if tracking is active.
 */
export function sendGAEvent(eventName: string, eventParams?: Record<string, unknown>): void {
  if (!isGAActive() || !window.gtag) {
    return;
  }
  try {
    window.gtag('event', eventName, eventParams);
  } catch {
    // Fail silently in case of ad-blocker or sandboxed environment
  }
}

/**
 * Track user clicking a telephone dialer link.
 * Parameter phone_number receives the confirmed company number.
 */
export function trackCallClick(phoneNumber: string, location?: string): void {
  sendGAEvent('click_call', {
    phone_number: phoneNumber,
    link_location: location || 'button',
  });
}

/**
 * Track user clicking a WhatsApp link.
 * Only invoked if WhatsApp number is actually configured.
 */
export function trackWhatsAppClick(whatsappNumber: string, location?: string): void {
  sendGAEvent('click_whatsapp', {
    whatsapp_number: whatsappNumber,
    link_location: location || 'button',
  });
}

/**
 * Track user clicking an enquiry CTA button to initiate an enquiry.
 */
export function trackEnquireClick(sourceLocation: string, planName?: string): void {
  sendGAEvent('click_enquire', {
    link_location: sourceLocation,
    chit_plan: planName || 'general',
  });
}

/**
 * Track conversion event when an enquiry form is successfully submitted.
 */
export function trackLeadGeneration(planName?: string, method = 'enquiry_form'): void {
  sendGAEvent('generate_lead', {
    chit_plan: planName || 'general',
    submission_method: method,
  });
}
