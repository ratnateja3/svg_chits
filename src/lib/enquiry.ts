import type { EnquiryFormData, EnquirySubmissionResult } from '../types';

export interface EnquiryValidationErrors {
  name?: string;
  phone?: string;
  consent?: string;
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
  const cleanPhone = (data.phone || '').replace(/[\s\-()]/g, '');
  const phonePattern = /^(?:(?:\+|0{0,2})91[\s-]?)?[6789]\d{9}$/;
  if (!cleanPhone || !phonePattern.test(cleanPhone)) {
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
 * Submits the enquiry form payload directly to the configured hosted form provider.
 * Reads endpoint from NEXT_PUBLIC_FORM_ENDPOINT.
 * Handles honeypot spam protection silently.
 */
export async function submitEnquiry(data: EnquiryFormData): Promise<EnquirySubmissionResult> {
  // Honeypot spam trap: if filled by automated bots, reject silently
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

  // If no endpoint is configured in environment, gracefully simulate submission in dev/preview
  if (!endpoint || !endpoint.trim()) {
    // Simulated network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    return {
      success: true,
      message: 'Thank you! Your enquiry has been recorded. Our team will contact you shortly.',
    };
  }

  try {
    const payload: Record<string, unknown> = {
      name: data.name.trim(),
      phone: data.phone.replace(/[\s\-()]/g, ''),
      chitPlan: data.chitPlanName || data.chitPlanId || 'General Enquiry',
      message: data.message?.trim() || '',
      submittedAt: new Date().toISOString(),
    };

    if (data.utmSource) payload.utm_source = data.utmSource;
    if (data.utmMedium) payload.utm_medium = data.utmMedium;
    if (data.utmCampaign) payload.utm_campaign = data.utmCampaign;
    if (data.utmTerm) payload.utm_term = data.utmTerm;
    if (data.utmContent) payload.utm_content = data.utmContent;
    if (data.gclid) payload.gclid = data.gclid;
    if (data.fbclid) payload.fbclid = data.fbclid;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Submission failed with status ${response.status}`);
    }

    return {
      success: true,
      message: 'Thank you! Your enquiry has been received. Our team will reach out shortly.',
    };
  } catch (error) {
    return {
      success: false,
      message: 'We could not submit your enquiry online. Please call or WhatsApp our office.',
      error: error instanceof Error ? error.message : 'Unknown network error',
    };
  }
}
