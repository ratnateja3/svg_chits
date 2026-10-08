'use client';

import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '@/content/site';
import { getTelLink } from '@/lib/contact';

export function openPayInstallmentsModal(e?: React.MouseEvent) {
  if (e) {
    e.preventDefault();
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-pay-modal'));
  }
}

export function PayInstallmentsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const telLink = getTelLink();

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-pay-modal', handleOpen);
    return () => window.removeEventListener('open-pay-modal', handleOpen);
  }, []);

  // Lock body scroll & focus trap
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pay-modal-title"
    >
      {/* Dark translucent backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        ref={dialogRef}
        className="relative z-10 w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl transition-all sm:p-7"
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close dialog"
          className="absolute right-4 top-4 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700"
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

        {/* Icon & Badge */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-purple-50 text-brand-purple-900">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 21z"
              />
            </svg>
          </div>
          <div>
            <span className="inline-block rounded-full border border-amber-300 bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-900">
              Coming Soon
            </span>
          </div>
        </div>

        {/* Headline */}
        <h3
          id="pay-modal-title"
          className="mt-4 font-serif text-xl font-bold tracking-tight text-brand-purple-950 sm:text-2xl"
        >
          Online Payment Portal
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          Our online instalment payment gateway is currently under preparation and will be available
          soon.
        </p>

        {/* Office Payment Guidance */}
        <div className="mt-4 rounded-xl border border-brand-purple-100 bg-brand-purple-50/50 p-4 text-xs leading-relaxed text-neutral-700">
          <p className="font-semibold text-brand-purple-950">To pay your monthly chit instalment:</p>
          <p className="mt-1">
            Please visit our registered Shamshabad office or call our accounts team directly for
            direct bank transfer and receipt assistance.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          {telLink && (
            <a
              href={telLink}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-md bg-brand-purple-950 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-brand-purple-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700"
            >
              <span>Call Office</span>
            </a>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-md border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
