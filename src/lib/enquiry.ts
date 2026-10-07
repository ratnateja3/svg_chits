import type { EnquiryFormData, EnquirySubmissionResult } from '../types';
import { siteConfig } from '@/content/site';

export interface EnquiryValidationErrors {
  name?: string;
  phone?: string;
  consent?: string;
}

/**
 * Normalizes Indian phone numbers to 10 digits.
 * Strips country codes (+91, 91), leading zeros, spaces, hyphens, and parentheses.
 */
export function normalizePhoneNumber(phone: string): string {
  const digits = (phone || '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  return digits;
}

/**
 * Generates a short client-side submission ID: base36 timestamp + 4 random alphanumeric characters.
 * Example: 'm2k4p8x-7ab9'
 */
export function generateSubmissionId(): string {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 6);
  return `${ts}-${rand}`;
}

/**
 * Lightweight client-side validation for the enquiry form.
 * Validates name, 10-digit Indian phone number, and mandatory consent.
 */
export function validateEnquiryForm(data: EnquiryFormData): {
  isValid: boolean;
  errors: EnquiryValidationErrors;
} {
  const errors: EnquiryValidationErrors = {};

  // Validate Name (minimum 2 characters)
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  }

  // Validate Indian mobile number (10 digits starting with 6, 7, 8, or 9; optionally prefixed by +91 or 0)
  const normalized = normalizePhoneNumber(data.phone);
  const phonePattern = /^[6789]\d{9}$/;
  if (!normalized || !phonePattern.test(normalized)) {
    errors.phone = 'Please enter a valid 10-digit Indian mobile number.';
  }

  // Validate Consent checkbox
  if (!data.consent) {
    errors.consent = 'You must authorize us to contact you regarding chit plans.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Submits the enquiry form payload to the configured hosted form provider (primary delivery).
 * In parallel, if NEXT_PUBLIC_SHEET_ENDPOINT is configured, sends a non-blocking copy
 * to the Google Apps Script Web App (backup delivery).
 *
 * Handles honeypot spam silently. Normalizes phone numbers to clean 10 digits.
 * Never logs sensitive PII to browser console.
 */
export async function submitEnquiry(data: EnquiryFormData): Promise<EnquirySubmissionResult> {
  // Honeypot spam trap: if filled by automated bots, reject silently without calling endpoints
  if (data.honeypot && data.honeypot.trim().length > 0) {
    return {
      success: true,
      message: 'Thank you! Your enquiry has been received.',
    };
  }

  // Client-side validation check
  const validation = validateEnquiryForm(data);
  if (!validation.isValid) {
    return {
      success: false,
      message: 'Please correct the highlighted fields before submitting.',
      error: Object.values(validation.errors)[0],
    };
  }

  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  const phoneText = siteConfig.contact.phoneDisplay || siteConfig.contact.phone || '+91 99637 21319';

  // If no endpoint is configured in environment, do not fake successful submission
  if (!endpoint || !endpoint.trim()) {
    return {
      success: false,
      message: `Thank you for reaching out. Please call our Shamshabad office directly at ${phoneText} while our online form is being configured.`,
      error: 'NEXT_PUBLIC_FORM_ENDPOINT is not configured',
    };
  }

  const submissionId = generateSubmissionId();
  const normalizedPhone = normalizePhoneNumber(data.phone);
  const currentPath =
    data.pagePath || (typeof window !== 'undefined' ? window.location.pathname : '/');

  // Flat, clean snake_case payload for hosted form provider and spreadsheet backup
  const payload: Record<string, string> = {
    submission_id: submissionId,
    name: data.name.trim(),
    phone: normalizedPhone,
    interested_in: data.chitPlanName?.trim() || data.chitPlanId?.trim() || 'General Chit Inquiry',
    message: data.message?.trim() || '',
    consent: 'yes',
    form_location: data.formLocation || 'contact_page',
    page_path: currentPath,
    submitted_at: new Date().toISOString(),
  };

  if (data.utmSource) payload.utm_source = data.utmSource;
  if (data.utmMedium) payload.utm_medium = data.utmMedium;
  if (data.utmCampaign) payload.utm_campaign = data.utmCampaign;
  if (data.utmTerm) payload.utm_term = data.utmTerm;
  if (data.utmContent) payload.utm_content = data.utmContent;
  if (data.gclid) payload.gclid = data.gclid;
  if (data.fbclid) payload.fbclid = data.fbclid;

  // STEP 7: Optional Google Sheets copy (environment-variable-gated, non-blocking fire-and-forget)
  const sheetEndpoint = process.env.NEXT_PUBLIC_SHEET_ENDPOINT;
  if (sheetEndpoint && sheetEndpoint.trim()) {
    try {
      fetch(sheetEndpoint.trim(), {
        method: 'POST',
        mode: 'no-cors',
        keepalive: true,
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      }).catch(() => {
        // Non-blocking fire-and-forget: do not leak PII in console
        console.warn(`[Sheet Backup] Delivery warning for submission_id: ${submissionId}`);
      });
    } catch {
      // Non-blocking catch
    }
  }

  try {
    const response = await fetch(endpoint.trim(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn(`[Enquiry Submission Failed] Submission ID: ${submissionId}, HTTP status: ${response.status}`);
      throw new Error(`Submission failed with status ${response.status}`);
    }

    return {
      success: true,
      message: 'Thank you! Your enquiry has been received. Our team will reach out shortly.',
    };
  } catch (error) {
    console.warn(`[Enquiry Submission Error] Submission ID: ${submissionId}`);
    return {
      success: false,
      message: 'We could not submit your enquiry online. Please call or WhatsApp our office.',
      error: error instanceof Error ? error.message : 'Unknown network error',
    };
  }
}
