'use client';

import React, { useState, useEffect } from 'react';

export const CAREER_ROLES = [
  'Telecaller',
  'Chit Fund Business Agent',
  'Chit Fund Recovery Agent',
] as const;

export type CareerRoleOption = (typeof CAREER_ROLES)[number];

interface CareerApplicationFormProps {
  initialRole?: string;
}

export function CareerApplicationForm({ initialRole = 'Telecaller' }: CareerApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    role: initialRole,
    experience: 'Fresher / Less than 1 year',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Keep role in sync if changed externally (e.g. clicking "Apply for this Role" on a card)
  useEffect(() => {
    if (initialRole && CAREER_ROLES.includes(initialRole as CareerRoleOption)) {
      setFormData((prev) => ({ ...prev, role: initialRole }));
    }
  }, [initialRole]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const errs: { name?: string; phone?: string } = {};

    if (!formData.name || formData.name.trim().length < 2) {
      errs.name = 'Please enter your full name (at least 2 characters).';
    }

    const digits = formData.phone.replace(/\D/g, '');
    const clean = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits;
    if (!/^[6789]\d{9}$/.test(clean)) {
      errs.phone = 'Please enter a valid 10-digit Indian mobile number.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/careers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          page_path: typeof window !== 'undefined' ? window.location.pathname : '/careers',
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        setErrorMessage(
          result?.error || 'Unable to submit your application right now. Please try again or call our office.',
        );
        return;
      }

      setIsSuccess(true);
    } catch {
      setErrorMessage(
        'A connection error occurred while submitting your application. Please check your network and try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      role: 'Telecaller',
      experience: 'Fresher / Less than 1 year',
      message: '',
      honeypot: '',
    });
    setErrors({});
    setIsSuccess(false);
    setErrorMessage('');
  };

  return (
    <div
      id="apply"
      className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-10"
    >
      {isSuccess ? (
        <div className="py-8 text-center" role="status" aria-live="polite">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
            <svg
              className="h-9 w-9"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <h3 className="mt-4 font-serif text-2xl font-bold tracking-tight text-brand-purple-950 sm:text-3xl">
            Application Received!
          </h3>

          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-600 sm:text-base">
            Thank you for your interest in joining Shri Vijaya Ganapathi Chit Fund Pvt Ltd.
            <br />
            Our team will review your details and contact you regarding the next steps.
          </p>

          <div className="mt-8">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-neutral-300 bg-neutral-50 px-5 py-2.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="border-b border-neutral-100 pb-4">
            <h3 className="font-serif text-xl font-bold text-brand-purple-950 sm:text-2xl">
              Apply for an Opportunity
            </h3>
            <p className="mt-1 text-xs text-neutral-600 sm:text-sm">
              Please share your contact details and relevant experience. We will reach out promptly.
            </p>
          </div>

          {/* Honeypot */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="career_hp">Do not fill</label>
            <input
              type="text"
              id="career_hp"
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
              className="rounded-lg border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-900 sm:text-sm"
              role="alert"
            >
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Full Name */}
            <div>
              <label
                htmlFor="career-name"
                className="mb-1.5 block text-xs font-semibold text-neutral-800 sm:text-sm"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="career-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ramesh Kumar"
                aria-invalid={Boolean(errors.name)}
                className={`min-h-[44px] w-full rounded-md border px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-purple-700 ${
                  errors.name ? 'border-red-500 bg-red-50/30' : 'border-neutral-300'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs font-medium text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label
                htmlFor="career-phone"
                className="mb-1.5 block text-xs font-semibold text-neutral-800 sm:text-sm"
              >
                Mobile Number (10 digits) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex select-none items-center pl-3.5 text-xs font-medium text-neutral-500">
                  +91
                </span>
                <input
                  id="career-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  required
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="98765 43210"
                  aria-invalid={Boolean(errors.phone)}
                  className={`min-h-[44px] w-full rounded-md border py-2.5 pl-12 pr-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-purple-700 ${
                    errors.phone ? 'border-red-500 bg-red-50/30' : 'border-neutral-300'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs font-medium text-red-600">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Applying For */}
            <div>
              <label
                htmlFor="career-role"
                className="mb-1.5 block text-xs font-semibold text-neutral-800 sm:text-sm"
              >
                Applying For <span className="text-red-500">*</span>
              </label>
              <select
                id="career-role"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="min-h-[44px] w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 focus:border-brand-purple-700 focus:outline-none focus:ring-2 focus:ring-brand-purple-700"
              >
                {CAREER_ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience */}
            <div>
              <label
                htmlFor="career-experience"
                className="mb-1.5 block text-xs font-semibold text-neutral-800 sm:text-sm"
              >
                Relevant Experience
              </label>
              <select
                id="career-experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="min-h-[44px] w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 focus:border-brand-purple-700 focus:outline-none focus:ring-2 focus:ring-brand-purple-700"
              >
                <option value="Fresher / Less than 1 year">Fresher / Less than 1 year</option>
                <option value="1 – 2 years">1 – 2 years</option>
                <option value="3 – 5 years">3 – 5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>
          </div>

          {/* Message / Additional Information */}
          <div>
            <label
              htmlFor="career-message"
              className="mb-1.5 block text-xs font-semibold text-neutral-800 sm:text-sm"
            >
              Message / Qualifications &amp; Prior Background{' '}
              <span className="font-normal text-neutral-400">(Optional)</span>
            </label>
            <textarea
              id="career-message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your prior work, locations you operate in, or languages you speak..."
              className="w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-brand-purple-700 focus:outline-none focus:ring-2 focus:ring-brand-purple-700"
            />
          </div>

          {/* Note on Resume upload */}
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-xs text-neutral-600">
            <span className="font-semibold text-neutral-800">Resume Submission:</span> Resume uploads
            are collected directly during our initial telephonic discussion or office interview. Please
            ensure your mobile number is accurate.
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex min-h-[48px] w-full items-center justify-center rounded-md bg-brand-purple-950 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-brand-purple-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700 active:bg-brand-purple-950 disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
