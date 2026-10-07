import { NextResponse } from 'next/server';

const ALLOWED_ROLES = [
  'Telecaller',
  'Chit Fund Business Agent',
  'Chit Fund Recovery Agent',
] as const;

/**
 * Normalizes Indian phone numbers to 10 digits.
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
 * Validates 10-digit Indian mobile numbers.
 */
function isValidIndianMobile(normalizedDigits: string): boolean {
  return /^[6789]\d{9}$/.test(normalizedDigits);
}

/**
 * Sends the payload to Google Apps Script Web App server-to-server.
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

    if ([301, 302, 303, 307, 308].includes(response.status) && response.headers.get('location')) {
      const redirectUrl = response.headers.get('location')!;
      response = await fetch(redirectUrl, {
        method: 'GET',
        cache: 'no-store',
      });
    }

    const text = await response.text();
    let isSuccess = response.ok;

    try {
      const parsed = JSON.parse(text);
      if (parsed.result === 'error' || parsed.status === 'error' || parsed.success === false) {
        isSuccess = false;
      }
    } catch {
      // Plain text response handling
    }

    return { ok: isSuccess, status: response.status, text };
  } catch (error) {
    console.error('[Career Application Webhook Error]', error);
    return {
      ok: false,
      status: 500,
      text: error instanceof Error ? error.message : 'Network error',
    };
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

    // 1. Honeypot check
    const honeypot = typeof body.honeypot === 'string' ? body.honeypot.trim() : '';
    if (honeypot.length > 0) {
      return NextResponse.json(
        { success: true, message: 'Application submitted successfully' },
        { status: 200 },
      );
    }

    // 2. Validate Name
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

    // 4. Validate Role
    const role = typeof body.role === 'string' ? body.role.trim() : '';
    if (!ALLOWED_ROLES.includes(role as (typeof ALLOWED_ROLES)[number])) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please select a valid role (Telecaller, Chit Fund Business Agent, or Chit Fund Recovery Agent).',
        },
        { status: 400 },
      );
    }

    // 5. Webhook URL resolution
    const webhookUrl =
      process.env.GOOGLE_CAREERS_WEBHOOK_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!webhookUrl || !webhookUrl.trim()) {
      console.error(
        '[Configuration Error] Neither GOOGLE_CAREERS_WEBHOOK_URL nor GOOGLE_SHEETS_WEBHOOK_URL is configured.',
      );
      return NextResponse.json(
        {
          success: false,
          error: 'Unable to submit your application right now. Please try again or contact our office.',
        },
        { status: 500 },
      );
    }

    const experience = typeof body.experience === 'string' ? body.experience.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const pagePath =
      typeof body.page_path === 'string' && body.page_path.trim() ? body.page_path.trim() : '/careers';

    const submissionId = `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`;

    const payload: Record<string, string> = {
      type: 'career',
      submission_id: submissionId,
      name,
      phone: normalizedPhone,
      role,
      experience,
      message,
      form_location: 'careers-page',
      page_path: pagePath,
    };

    const result = await sendToGoogleAppsScript(webhookUrl.trim(), payload);

    if (!result.ok) {
      console.error(`[Career Webhook Error] Status: ${result.status}, Response: ${result.text}`);
      return NextResponse.json(
        {
          success: false,
          error: 'Unable to submit your application right now. Please try again.',
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully',
      },
      { status: 200 },
    );
  } catch (err) {
    console.error('[Career API Exception]', err);
    return NextResponse.json(
      {
        success: false,
        error: 'Unable to submit your application right now. Please try again.',
      },
      { status: 500 },
    );
  }
}
