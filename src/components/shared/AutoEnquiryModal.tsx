'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { chitPlans } from '@/content/chit-plans';
import { submitEnquiry, validateEnquiryForm, type EnquiryValidationErrors } from '@/lib/enquiry';
import { getStoredAttribution } from '@/lib/attribution';
import { trackLeadGeneration } from '@/lib/analytics';
import type { EnquiryFormData } from '@/types';

const SESSION_STORAGE_KEY = 'svg_chit_auto_popup_shown';
const TRIGGER_DELAY_MS = 2500;
const AUTO_CLOSE_DELAY_MS = 2800;

export function AutoEnquiryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<EnquiryValidationErrors>({});

  const [formData, setFormData] = useState<EnquiryFormData>({
    name: '',
    phone: '',
    chitPlanName: '',
    message: '',
    consent: true,
    honeypot: '',
  });

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Hydrate stored attribution parameters
  useEffect(() => {
    const stored = getStoredAttribution();
    if (Object.keys(stored).length > 0) {
      setFormData((prev) => ({
        ...prev,
        utmSource: stored.utmSource,
        utmMedium: stored.utmMedium,
        utmCampaign: stored.utmCampaign,
        utmTerm: stored.utmTerm,
        utmContent: stored.utmContent,
        gclid: stored.gclid,
        fbclid: stored.fbclid,
      }));
    }
  }, []);

  // Popup trigger: 2.5s after arrival, once per session
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      if (sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true') {
        return;
      }
    } catch {
      // Storage unavailable fallback
    }

    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
      } catch {
        // Fallback
      }
      setIsOpen(true);
    }, TRIGGER_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  // Manage focus & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElementRef.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      if (previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === 'function') {
        previousActiveElementRef.current.focus();
      }
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
    };
  }, [isOpen]);

  // Escape key and keyboard focus trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        return;
      }

      if (e.key === 'Tab') {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const focusableElements = dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
    }
    setIsOpen(false);
  };

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

    if (errors[name as keyof EnquiryValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    const validation = validateEnquiryForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await submitEnquiry({
        ...formData,
        formLocation: 'auto-popup',
        pagePath: typeof window !== 'undefined' ? window.location.pathname : '/',
      });

      if (result.success) {
        setIsSuccess(true);
        trackLeadGeneration(formData.chitPlanName, 'auto_popup');

        // Automatically close the popup after ~2.8 seconds
        autoCloseTimerRef.current = setTimeout(() => {
          handleClose();
        }, AUTO_CLOSE_DELAY_MS);
      } else {
        setErrorMessage(
          result.message || 'Unable to submit your details right now. Please call our office directly.',
        );
      }
    } catch {
      setErrorMessage('A connection issue occurred. Please reach us directly via phone or WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auto-enquiry-modal-title"
    >
      {/* Dark translucent backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Card / Bottom Sheet Container */}
      <div
        ref={dialogRef}
        className="relative z-10 flex max-h-[92dvh] w-full max-w-lg flex-col rounded-t-2xl border border-neutral-200 bg-white shadow-2xl transition-all sm:max-h-[90vh] sm:rounded-2xl"
      >
        {/* Header Bar */}
        <div className="flex shrink-0 items-start justify-between border-b border-neutral-100 px-6 pt-5 pb-4">
          <div className="pr-4">
            <span className="inline-block rounded-full bg-brand-gold-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-brand-gold-900 border border-brand-gold-200">
              Chit Group Enquiry
            </span>
            <h2
              id="auto-enquiry-modal-title"
              className="mt-1.5 font-serif text-xl font-bold tracking-tight text-brand-purple-950 sm:text-2xl"
            >
              Explore the Right Chit Group for You
            </h2>
            <p className="mt-1 text-xs text-neutral-600 sm:text-sm">
              Get details about our available chit groups, monthly contributions and eligibility.
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            aria-label="Close enquiry modal"
            className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto px-6 py-5">
          {isSuccess ? (
            /* Clean Success State */
            <div className="py-6 text-center" role="status" aria-live="polite">
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

              <h3 className="mt-4 font-serif text-2xl font-bold text-brand-purple-950">
                Enquiry Received
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-neutral-600">
                Thank you! Your details have been received.
                <br />
                Our team will contact you shortly.
              </p>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-neutral-300 bg-neutral-50 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Bot Honeypot */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="modal_hp">Leave empty</label>
                <input
                  type="text"
                  id="modal_hp"
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={handleChange}
                />
              </div>

              {/* Error Banner */}
              {errorMessage && (
                <div
                  className="rounded-md border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-900"
                  role="alert"
                >
                  {errorMessage}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label
                  htmlFor="popup-name"
                  className="mb-1 block text-xs font-semibold text-neutral-800"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="popup-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. S. Ramesh Kumar"
                  aria-invalid={Boolean(errors.name)}
                  className={`min-h-[44px] w-full rounded-md border px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-purple-700 ${
                    errors.name ? 'border-red-500 bg-red-50/30' : 'border-neutral-300'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-[11px] font-medium text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label
                  htmlFor="popup-phone"
                  className="mb-1 block text-xs font-semibold text-neutral-800"
                >
                  Mobile Number (10 digits) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex select-none items-center pl-3 text-xs font-medium text-neutral-500">
                    +91
                  </span>
                  <input
                    id="popup-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    required
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="98765 43210"
                    aria-invalid={Boolean(errors.phone)}
                    className={`min-h-[44px] w-full rounded-md border py-2.5 pl-11 pr-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-purple-700 ${
                      errors.phone ? 'border-red-500 bg-red-50/30' : 'border-neutral-300'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-[11px] font-medium text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Interested Chit Scheme */}
              <div>
                <label
                  htmlFor="popup-chit-plan"
                  className="mb-1 block text-xs font-semibold text-neutral-800"
                >
                  Interested Chit Scheme{' '}
                  <span className="font-normal text-neutral-400">(Optional)</span>
                </label>
                <select
                  id="popup-chit-plan"
                  name="chitPlanName"
                  value={formData.chitPlanName}
                  onChange={handleChange}
                  className="min-h-[44px] w-full rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 focus:border-brand-purple-700 focus:outline-none focus:ring-2 focus:ring-brand-purple-700"
                >
                  <option value="">General Chit Inquiry / Suggest a Scheme</option>
                  {chitPlans.map((plan) => (
                    <option key={plan.id} value={plan.name}>
                      {plan.name} — {plan.status === 'open' ? 'Open for Enquiries' : 'Currently Full'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message / Requirement (Optional) */}
              <div>
                <label
                  htmlFor="popup-message"
                  className="mb-1 block text-xs font-semibold text-neutral-800"
                >
                  Message / Requirement{' '}
                  <span className="font-normal text-neutral-400">(Optional)</span>
                </label>
                <textarea
                  id="popup-message"
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Monthly savings budget, purpose, or questions..."
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-brand-purple-700 focus:outline-none focus:ring-2 focus:ring-brand-purple-700"
                />
              </div>

              {/* Consent Checkbox */}
              <div>
                <div className="flex items-start gap-2.5">
                  <input
                    id="popup-consent"
                    name="consent"
                    type="checkbox"
                    required
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-neutral-300 text-brand-purple-900 focus:ring-brand-purple-700"
                  />
                  <label
                    htmlFor="popup-consent"
                    className="select-none text-[11px] leading-snug text-neutral-600"
                  >
                    I authorize Shri Vijaya Ganapathi Chit Fund Pvt Ltd to contact me via phone, WhatsApp, or SMS regarding chit schemes per our{' '}
                    <Link
                      href="/privacy-policy"
                      target="_blank"
                      className="font-medium text-brand-purple-900 underline hover:text-brand-purple-800"
                    >
                      Privacy Policy
                    </Link>
                    . <span className="text-red-500">*</span>
                  </label>
                </div>
                {errors.consent && (
                  <p className="mt-1 pl-6 text-[11px] font-medium text-red-600">{errors.consent}</p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex min-h-[48px] w-full items-center justify-center rounded-md bg-brand-purple-950 px-4 py-3 text-sm font-bold tracking-wide uppercase text-white shadow-sm transition-colors hover:bg-brand-purple-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700 active:bg-brand-purple-950 disabled:opacity-60"
                >
                  {isSubmitting ? 'Submitting Details...' : 'GET DETAILS'}
                </button>
                <p className="mt-2 text-center text-[11px] text-neutral-500">
                  We&apos;ll contact you shortly with the relevant chit group details.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
