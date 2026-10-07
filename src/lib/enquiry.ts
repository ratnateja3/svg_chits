import type { EnquiryFormData, EnquirySubmissionResult } from '../types';

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
 * Generates a unique client-side submission ID per submission using crypto.randomUUID with fallback.
 */
export function generateSubmissionId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    try {
      return crypto.randomUUID();
    } catch {
      // Fallback if randomUUID fails or is unavailable
    }
  }
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 10);
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
 * Submits the enquiry form payload to our internal API endpoint (/api/enquiry),
 * which securely validates and forwards it to the Google Sheets webhook.
 *
 * Handles honeypot spam silently. Normalizes phone numbers to clean 10 digits.
 * Never logs sensitive PII to browser console.
 */
export async function submitEnquiry(data: EnquiryFormData): Promise<EnquirySubmissionResult> {
  // Honeypot spam trap: if filled by automated bots, reject silently without calling endpoint
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

  const submissionId = generateSubmissionId();
  const normalizedPhone = normalizePhoneNumber(data.phone);
  const currentPath =
    data.pagePath || (typeof window !== 'undefined' ? window.location.pathname : '/');

  // Flat payload sent to the Next.js API route
  const payload: Record<string, string> = {
    submission_id: submissionId,
    name: data.name ? data.name.trim() : '',
    phone: normalizedPhone,
    interested_in: data.chitPlanName?.trim() || data.chitPlanId?.trim() || 'General Chit Inquiry',
    chitPlanName: data.chitPlanName?.trim() || data.chitPlanId?.trim() || 'General Chit Inquiry',
    message: data.message ? data.message.trim() : '',
    consent: 'yes',
    form_location: data.formLocation || 'contact-page',
    page_path: currentPath,
    source: data.formLocation || 'contact-page',
    utm_source: data.utmSource || '',
    utm_medium: data.utmMedium || '',
    utm_campaign: data.utmCampaign || '',
    utm_term: data.utmTerm || '',
    utm_content: data.utmContent || '',
    gclid: data.gclid || '',
    fbclid: data.fbclid || '',
  };

  try {
    const response = await fetch('/api/enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = (await response.json().catch(() => null)) as {
      success?: boolean;
      message?: string;
      error?: string;
    } | null;

    if (!response.ok || !result?.success) {
      const errorMessage =
        result?.error ||
        'We could not submit your enquiry online right now. Please call or WhatsApp our office.';
      return {
        success: false,
        message: errorMessage,
        error: errorMessage,
      };
    }

    return {
      success: true,
      message:
        result.message ||
        'Thank you! Your enquiry has been received. Our team will reach out shortly.',
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Enquiry Submission Network Error] Submission ID: ${submissionId}`, error);
    }
    return {
      success: false,
      message:
        'A connection issue occurred while submitting. Please call or WhatsApp our office directly.',
      error: error instanceof Error ? error.message : 'Unknown network error',
    };
  }
}
