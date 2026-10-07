'use client';

import React, { useEffect, useRef } from 'react';
import { EnquiryForm } from '@/components/forms/EnquiryForm';

export interface MobileEnquirySheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function MobileEnquirySheet({ isOpen, onClose, onSuccess }: MobileEnquirySheetProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  // Lock body scroll and capture previous focus on mount
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElementRef.current = document.activeElement as HTMLElement | null;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the close button or first actionable element initially
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      // Restore focus to previously active element
      if (previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === 'function') {
        previousActiveElementRef.current.focus();
      }
    };
  }, [isOpen]);

  // Trap keyboard focus and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
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

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity motion-reduce:transition-none"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Bottom Sheet Container */}
      <div
        id="mobile-enquiry-sheet"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-popup-title"
        className="relative z-10 flex max-h-[85dvh] w-full flex-col rounded-t-2xl border-t border-neutral-200 bg-white shadow-2xl transition-transform duration-300 motion-reduce:transition-none motion-reduce:transform-none"
      >
        {/* Header Bar */}
        <div className="flex shrink-0 items-start justify-between border-b border-neutral-100 px-5 pt-4 pb-3">
          <div className="min-w-0 pr-2">
            <h2
              id="mobile-popup-title"
              className="font-serif text-lg font-bold text-brand-purple-950 sm:text-xl"
            >
              Interested in joining a chit group?
            </h2>
            <p className="mt-0.5 text-xs text-neutral-600 sm:text-sm">
              Share your details and our team will get in touch.
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close enquiry popup"
            className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700"
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

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto px-5 py-4 pb-8">
          <EnquiryForm
            variant="popup"
            hideMessage
            formLocation="homepage-popup"
            className="border-0 p-0 shadow-none"
            onSuccess={onSuccess}
          />
        </div>
      </div>
    </div>
  );
}
