import { siteConfig } from '@/content/site';

export interface WhatsAppLinkOptions {
  message?: string;
  planName?: string;
  phoneOverride?: string | null;
}

/**
 * Returns a tel: link using the central company phone configuration.
 * Returns null if no valid phone number is configured.
 */
export function getTelLink(phoneOverride?: string | null): string | null {
  const rawPhone = phoneOverride ?? siteConfig.contact.phone;
  if (!rawPhone || !rawPhone.trim()) {
    return null;
  }

  // Remove whitespace, hyphens, and parentheses
  const cleaned = rawPhone.replace(/[\s\-()]/g, '');
  const formatted = cleaned.startsWith('+') ? cleaned : cleaned.length === 10 ? `+91${cleaned}` : cleaned;
  return `tel:${formatted}`;
}

/**
 * Returns a wa.me URL with an optional prefilled enquiry message.
 * Returns null if no valid WhatsApp number is configured.
 */
export function getWhatsAppLink(options?: WhatsAppLinkOptions): string | null {
  const rawNumber = options?.phoneOverride ?? siteConfig.contact.whatsapp;
  if (!rawNumber || !rawNumber.trim()) {
    return null;
  }

  // Sanitize number to digits only (including country code)
  const digitsOnly = rawNumber.replace(/[^0-9]/g, '');
  if (!digitsOnly) {
    return null;
  }

  // Build prefilled message
  let defaultMessage = `Hello, I would like to know more about the chit groups offered by ${siteConfig.name}.`;
  if (options?.planName) {
    defaultMessage = `Hello, I am interested in knowing more about the ${options.planName} chit scheme at ${siteConfig.name}.`;
  }

  const messageText = options?.message || defaultMessage;
  const encodedMessage = encodeURIComponent(messageText);

  return `https://wa.me/${digitsOnly}?text=${encodedMessage}`;
}

/**
 * Checks if a real phone number is currently configured.
 */
export function hasPhoneContact(): boolean {
  return Boolean(siteConfig.contact.phone && siteConfig.contact.phone.trim());
}

/**
 * Checks if a real WhatsApp number is currently configured.
 */
export function hasWhatsAppContact(): boolean {
  return Boolean(siteConfig.contact.whatsapp && siteConfig.contact.whatsapp.trim());
}

export interface EmailLinkOptions {
  subject?: string;
  body?: string;
  emailOverride?: string | null;
}

/**
 * Returns a mailto: link using the central company email configuration.
 * Returns null if no valid email is configured.
 */
export function getEmailLink(options?: EmailLinkOptions): string | null {
  const rawEmail = options?.emailOverride ?? siteConfig.contact.email;
  if (!rawEmail || !rawEmail.trim()) {
    return null;
  }

  const cleaned = rawEmail.trim();
  const params: string[] = [];
  if (options?.subject) {
    params.push(`subject=${encodeURIComponent(options.subject)}`);
  }
  if (options?.body) {
    params.push(`body=${encodeURIComponent(options.body)}`);
  }

  return params.length > 0 ? `mailto:${cleaned}?${params.join('&')}` : `mailto:${cleaned}`;
}

/**
 * Checks if a real email address is currently configured.
 */
export function hasEmailContact(): boolean {
  return Boolean(siteConfig.contact.email && siteConfig.contact.email.trim());
}
