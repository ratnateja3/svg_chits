'use client';

import React, { useState, useCallback, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { EnquiryFormData } from '@/types';
import { submitEnquiry, validateEnquiryForm, type EnquiryValidationErrors } from '@/lib/enquiry';
import { chitPlans } from '@/content/chit-plans';
import { siteConfig } from '@/content/site';
import { getTelLink, getWhatsAppLink } from '@/lib/contact';
import { Button } from '@/components/ui/Button';

export interface EnquiryFormProps {
  initialPlanName?: string;
  className?: string;
  onSuccess?: () => void;
}

interface SearchParamsSyncProps {
  onParams: (params: {
    plan?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
    gclid?: string;
    fbclid?: string;
  }) => void;
}

function SearchParamsSync({ onParams }: SearchParamsSyncProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;
    onParams({
      plan: searchParams.get('plan') ?? undefined,
      utmSource: searchParams.get('utm_source') ?? undefined,
      utmMedium: searchParams.get('utm_medium') ?? undefined,
      utmCampaign: searchParams.get('utm_campaign') ?? undefined,
      utmTerm: searchParams.get('utm_term') ?? undefined,
      utmContent: searchParams.get('utm_content') ?? undefined,
      gclid: searchParams.get('gclid') ?? undefined,
      fbclid: searchParams.get('fbclid') ?? undefined,
    });
  }, [searchParams, onParams]);

  return null;
}

export function EnquiryForm({ initialPlanName = '', className = '', onSuccess }: EnquiryFormProps) {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: '',
    phone: '',
    chitPlanName: initialPlanName,
    message: '',
    consent: true,
    honeypot: '',
  });

  const handleParamsSync = useCallback((params: {
    plan?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
    gclid?: string;
    fbclid?: string;
  }) => {
    setFormData((prev) => {
      let planName = prev.chitPlanName;
      if (!planName && params.plan) {
        const matched = chitPlans.find(
          (p) =>
            p.name.toLowerCase() === params.plan!.toLowerCase() ||
            p.id.toLowerCase() === params.plan!.toLowerCase(),
        );
        planName = matched ? matched.name : params.plan;
      }

      return {
        ...prev,
        chitPlanName: planName,
        utmSource: prev.utmSource || params.utmSource,
        utmMedium: prev.utmMedium || params.utmMedium,
        utmCampaign: prev.utmCampaign || params.utmCampaign,
        utmTerm: prev.utmTerm || params.utmTerm,
        utmContent: prev.utmContent || params.utmContent,
        gclid: prev.gclid || params.gclid,
        fbclid: prev.fbclid || params.fbclid,
      };
    });
  }, []);

  const [errors, setErrors] = useState<EnquiryValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const telLink = getTelLink();
  const whatsappLink = getWhatsAppLink({ planName: formData.chitPlanName });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? checked : value,
    }));

    // Clear specific field error as user types
    if (errors[name as keyof EnquiryValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset status
    setSubmitStatus('idle');
    setFeedbackMessage('');

    // Perform client validation
    const validation = validateEnquiryForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await submitEnquiry(formData);

      if (result.success) {
        setSubmitStatus('success');
        setFeedbackMessage(result.message);
        if (onSuccess) onSuccess();
      } else {
        setSubmitStatus('error');
        setFeedbackMessage(result.message);
      }
    } catch {
      setSubmitStatus('error');
      setFeedbackMessage(
        'A connection issue occurred while submitting. Please reach us directly via phone or WhatsApp.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData((prev) => ({
      name: '',
      phone: '',
      chitPlanName: initialPlanName || '',
      message: '',
      consent: true,
      honeypot: '',
      utmSource: prev.utmSource,
      utmMedium: prev.utmMedium,
      utmCampaign: prev.utmCampaign,
      utmTerm: prev.utmTerm,
      utmContent: prev.utmContent,
      gclid: prev.gclid,
      fbclid: prev.fbclid,
    }));
    setSubmitStatus('idle');
    setErrors({});
    setFeedbackMessage('');
  };

  return (
    <div
      className={`rounded-lg border border-neutral-200 bg-white p-6 shadow-sm sm:p-8 ${className}`}
    >
      <Suspense fallback={null}>
        <SearchParamsSync onParams={handleParamsSync} />
      </Suspense>

      {/* Success State */}
      {submitStatus === 'success' ? (
        <div className="space-y-4 py-6 text-center" role="status" aria-live="polite">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <h3 className="font-serif text-2xl font-bold text-brand-purple-900">Enquiry Received</h3>

          <p className="mx-auto max-w-md text-sm leading-relaxed text-neutral-600">
            {feedbackMessage}
          </p>

          <div className="pt-4">
            <Button type="button" variant="outline" onClick={handleReset}>
              Submit Another Enquiry
            </Button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5"
          aria-label="Chit Plan Enquiry Form"
        >
          {/* Honeypot field for bot protection (invisible to humans and screen readers) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="company_hp">Do not fill this field</label>
            <input
              type="text"
              id="company_hp"
              name="honeypot"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot}
              onChange={handleChange}
            />
          </div>

          {/* Hidden Attribution & Campaign Tracking Fields */}
          {formData.utmSource && <input type="hidden" name="utm_source" value={formData.utmSource} />}
          {formData.utmMedium && <input type="hidden" name="utm_medium" value={formData.utmMedium} />}
          {formData.utmCampaign && <input type="hidden" name="utm_campaign" value={formData.utmCampaign} />}
          {formData.utmTerm && <input type="hidden" name="utm_term" value={formData.utmTerm} />}
          {formData.utmContent && <input type="hidden" name="utm_content" value={formData.utmContent} />}
          {formData.gclid && <input type="hidden" name="gclid" value={formData.gclid} />}
          {formData.fbclid && <input type="hidden" name="fbclid" value={formData.fbclid} />}

          {/* Error Banner with prominent direct contact fallbacks */}
          {submitStatus === 'error' && (
            <div
              className="space-y-3 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-900"
              role="alert"
            >
              <div className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
                <p className="font-medium">{feedbackMessage}</p>
              </div>

              {/* Direct Call & WhatsApp fallbacks */}
              <div className="flex flex-wrap gap-2 border-t border-red-200/80 pt-2">
                {telLink ? (
                  <a
                    href={telLink}
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded bg-brand-purple-900 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-purple-800"
                  >
                    Call Office Directly
                  </a>
                ) : (
                  <span className="text-xs text-neutral-600">
                    Visit Office: {siteConfig.address.fullAddress}
                  </span>
                )}

                {whatsappLink && (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded border border-emerald-300 bg-emerald-100 px-3 py-2 text-xs font-semibold text-emerald-950 hover:bg-emerald-200"
                  >
                    Chat on WhatsApp
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Field 1: Name */}
          <div>
            <label
              htmlFor="enquiry-name"
              className="mb-1.5 block text-sm font-semibold text-neutral-800"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="enquiry-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. S. Ramesh Kumar"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'enquiry-name-error' : undefined}
              className={`min-h-[44px] w-full rounded-md border px-3.5 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-purple-700 sm:text-sm ${
                errors.name
                  ? 'border-red-500 bg-red-50/30'
                  : 'border-neutral-300 focus:border-brand-purple-700'
              }`}
            />
            {errors.name && (
              <p id="enquiry-name-error" className="mt-1.5 text-xs font-medium text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          {/* Field 2: Phone */}
          <div>
            <label
              htmlFor="enquiry-phone"
              className="mb-1.5 block text-sm font-semibold text-neutral-800"
            >
              Mobile Number (10 digits) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex select-none items-center pl-3 text-sm font-medium text-neutral-500">
                +91
              </span>
              <input
                id="enquiry-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                required
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="98765 43210"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'enquiry-phone-error' : undefined}
                className={`min-h-[44px] w-full rounded-md border py-3 pl-12 pr-3.5 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-purple-700 sm:text-sm ${
                  errors.phone
                    ? 'border-red-500 bg-red-50/30'
                    : 'border-neutral-300 focus:border-brand-purple-700'
                }`}
              />
            </div>
            {errors.phone && (
              <p id="enquiry-phone-error" className="mt-1.5 text-xs font-medium text-red-600">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Field 3: Interested Chit Group (Optional) */}
          <div>
            <label
              htmlFor="enquiry-chit-plan"
              className="mb-1.5 block text-sm font-semibold text-neutral-800"
            >
              Interested Chit Scheme{' '}
              <span className="font-normal text-neutral-400">(Optional)</span>
            </label>
            <select
              id="enquiry-chit-plan"
              name="chitPlanName"
              value={formData.chitPlanName}
              onChange={handleChange}
              className="min-h-[44px] w-full rounded-md border border-neutral-300 bg-white px-3.5 py-3 text-base text-neutral-900 focus:border-brand-purple-700 focus:outline-none focus:ring-2 focus:ring-brand-purple-700 sm:text-sm"
            >
              <option value="">General Chit Inquiry / Suggest a Scheme</option>
              {chitPlans.map((plan) => (
                <option key={plan.id} value={plan.name}>
                  {plan.name} ({plan.durationMonths} Months)
                </option>
              ))}
            </select>
          </div>

          {/* Field 4: Message (Optional) */}
          <div>
            <label
              htmlFor="enquiry-message"
              className="mb-1.5 block text-sm font-semibold text-neutral-800"
            >
              Message / Specific Requirements{' '}
              <span className="font-normal text-neutral-400">(Optional)</span>
            </label>
            <textarea
              id="enquiry-message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your savings goals or questions..."
              className="w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-brand-purple-700 focus:outline-none focus:ring-2 focus:ring-brand-purple-700 sm:text-sm"
            />
          </div>

          {/* Field 5: Consent Checkbox */}
          <div>
            <div className="flex items-start gap-3">
              <input
                id="enquiry-consent"
                name="consent"
                type="checkbox"
                required
                checked={formData.consent}
                onChange={handleChange}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? 'enquiry-consent-error' : undefined}
                className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer rounded border-neutral-300 text-brand-purple-900 focus:ring-brand-purple-700 focus:ring-offset-2"
              />
              <label
                htmlFor="enquiry-consent"
                className="cursor-pointer select-none text-xs leading-normal text-neutral-600"
              >
                I authorize Shri Vijaya Ganapathi Chit Fund Pvt Ltd to contact me via phone,
                WhatsApp, or SMS regarding chit group enrollment details.{' '}
                <span className="text-red-500">*</span>
              </label>
            </div>
            {errors.consent && (
              <p id="enquiry-consent-error" className="mt-1 pl-8 text-xs font-medium text-red-600">
                {errors.consent}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isSubmitting}
              className="min-h-[48px] w-full text-base font-semibold"
            >
              {isSubmitting ? 'Submitting Enquiry...' : 'Submit Chit Enquiry'}
            </Button>
            <p className="mt-2.5 text-center text-[11px] text-neutral-500">
              Strictly confidential. No sensitive financial information (PAN, bank details) is ever
              requested online.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
