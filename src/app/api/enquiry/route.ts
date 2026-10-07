import { NextResponse } from 'next/server';

/**
 * Normalizes Indian phone numbers to 10 digits.
 * Strips country codes (+91, 91), leading zeros, spaces, hyphens, and parentheses.
 */
function normalizeIndianPhone(phone: unknown): string {
  if (typeof phone !== 'string') return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  return digits;
}

/**
 * Validates 10-digit Indian mobile numbers (starting with 6, 7, 8, or 9).
 */
function isValidIndianMobile(normalizedDigits: string): boolean {
  return /^[6789]\d{9}$/.test(normalizedDigits);
}

/**
 * Sends the payload to Google Apps Script Web App server-to-server.
 * Carefully handles Google Apps Script 302/307 redirects without losing execution.
 */
async function sendToGoogleAppsScript(
  webhookUrl: string,
  payload: Record<string, string>,
): Promise<{ ok: boolean; status: number; text: string }> {
  try {
    let response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
      cache: 'no-store',
    });

    // In case redirect: 'follow' did not automatically follow the 302 location in some runtimes:
    if ([301, 302, 303, 307, 308].includes(response.status) && response.headers.get('location')) {
      const redirectUrl = response.headers.get('location')!;
      response = await fetch(redirectUrl, {
        method: 'GET',
        cache: 'no-store',
      });
    }

    const text = await response.text();
    let isSuccess = response.ok;

    // Check if the response body explicitly indicates an application-level error
    try {
      const parsed = JSON.parse(text);
      if (parsed.result === 'error' || parsed.status === 'error' || parsed.success === false) {
        isSuccess = false;
      }
    } catch {
      // If output is plain text (like 'OK'), response.ok governs
    }

    return { ok: isSuccess, status: response.status, text };
  } catch (error) {
    console.error('[Google Sheets Webhook Error]', error);
    return { ok: false, status: 500, text: error instanceof Error ? error.message : 'Network error' };
  }
}

export async function POST(request: Request) {
  try {
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid or malformed JSON payload.' },
        { status: 400 },
      );
    }

    // 1. Honeypot check (bot spam trap)
    // If filled, silently reject without sending to Google Sheets
    const honeypot = typeof body.honeypot === 'string' ? body.honeypot.trim() : '';
    if (honeypot.length > 0) {
      return NextResponse.json(
        { success: true, message: 'Enquiry submitted successfully' },
        { status: 200 },
      );
    }

    // 2. Validate Name (string, minimum 2 characters after trimming)
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please enter your full name (at least 2 characters).' },
        { status: 400 },
      );
    }

    // 3. Validate and normalize Indian mobile number
    const normalizedPhone = normalizeIndianPhone(body.phone);
    if (!isValidIndianMobile(normalizedPhone)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 10-digit Indian mobile number.' },
        { status: 400 },
      );
    }

    // 4. Validate Consent
    const consent = body.consent;
    const isConsentGiven =
      consent === true || consent === 'yes' || consent === 'true' || consent === 1;
    if (!isConsentGiven) {
      return NextResponse.json(
        { success: false, error: 'You must authorize us to contact you regarding chit plans.' },
        { status: 400 },
      );
    }

    // 5. Server-side environment variable check
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!webhookUrl || !webhookUrl.trim()) {
      console.error('[Configuration Error] GOOGLE_SHEETS_WEBHOOK_URL environment variable is not set.');
      return NextResponse.json(
        {
          success: false,
          error: 'Unable to submit your enquiry right now. Please try again.',
        },
        { status: 500 },
      );
    }

    // 6. Build clean payload for Google Sheets
    const submissionId =
      typeof body.submission_id === 'string' && body.submission_id.trim()
        ? body.submission_id.trim()
        : `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 10)}`;

    const chitPlan =
      typeof body.chitPlanName === 'string' && body.chitPlanName.trim()
        ? body.chitPlanName.trim()
        : typeof body.interested_in === 'string' && body.interested_in.trim()
          ? body.interested_in.trim()
          : 'General Chit Inquiry';

    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const formLocation =
      typeof body.form_location === 'string' && body.form_location.trim()
        ? body.form_location.trim()
        : typeof body.source === 'string' && body.source.trim()
          ? body.source.trim()
          : 'contact-page';

    const pagePath =
      typeof body.page_path === 'string' && body.page_path.trim() ? body.page_path.trim() : '/';

    const sheetPayload: Record<string, string> = {
      submission_id: submissionId,
      name,
      phone: normalizedPhone,
      interested_in: chitPlan,
      message,
      consent: 'yes',
      form_location: formLocation,
      page_path: pagePath,
      source: typeof body.source === 'string' ? body.source.trim() : '',
      utm_source: typeof body.utm_source === 'string' ? body.utm_source.trim() : '',
      utm_medium: typeof body.utm_medium === 'string' ? body.utm_medium.trim() : '',
      utm_campaign: typeof body.utm_campaign === 'string' ? body.utm_campaign.trim() : '',
      utm_term: typeof body.utm_term === 'string' ? body.utm_term.trim() : '',
      utm_content: typeof body.utm_content === 'string' ? body.utm_content.trim() : '',
      gclid: typeof body.gclid === 'string' ? body.gclid.trim() : '',
      fbclid: typeof body.fbclid === 'string' ? body.fbclid.trim() : '',
    };

    // 7. Dispatch to Google Apps Script Web App
    const result = await sendToGoogleAppsScript(webhookUrl.trim(), sheetPayload);

    if (!result.ok) {
      console.error(
        `[Google Sheets Failure] Status: ${result.status}, Response: ${result.text}`,
      );
      return NextResponse.json(
        {
          success: false,
          error: 'Unable to submit your enquiry right now. Please try again.',
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Enquiry submitted successfully',
      },
      { status: 200 },
    );
  } catch (err) {
    console.error('[Enquiry API Route Exception]', err);
    return NextResponse.json(
      {
        success: false,
        error: 'Unable to submit your enquiry right now. Please try again.',
      },
      { status: 500 },
    );
  }
}
