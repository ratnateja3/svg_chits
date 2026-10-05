'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationLinks } from '@/content/navigation';
import { siteConfig } from '@/content/site';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile nav on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="flex items-center lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-menu"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2.5 text-neutral-200 hover:bg-brand-purple-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-400"
      >
        <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
        {isOpen ? (
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </button>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer panel */}
      <div
        id="mobile-navigation-menu"
        className={`fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-xs flex-col bg-white shadow-xl transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        {/* Drawer Branded Deep Purple Header */}
        <div className="flex items-center justify-between border-b border-brand-purple-900 bg-brand-purple-950 p-4">
          <span className="font-serif text-lg font-bold text-white">
            {siteConfig.shortName}
          </span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2 text-neutral-300 hover:bg-brand-purple-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-400"
          >
            <svg
              className="h-6 w-6"
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

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6" aria-label="Mobile Navigation">
          {navigationLinks.map((item) => {
            const isActive = pathname === item.href;
            const isProminent = item.variant === 'prominent';
            const isQuiet = item.variant === 'quiet';

            if (isProminent) {
              return (
                <div key={item.label} className="pb-2 pt-4">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex min-h-[48px] w-full items-center justify-center rounded-md border border-brand-purple-950/20 bg-brand-purple-900 px-4 py-3 text-center font-semibold text-white shadow-sm hover:bg-brand-purple-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700 active:bg-brand-purple-950"
                  >
                    {item.label}
                  </Link>
                </div>
              );
            }

            if (isQuiet) {
              return (
                <div key={item.label} className="pt-2">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex min-h-[44px] w-full items-center justify-center rounded-md border border-neutral-300 bg-neutral-100 px-4 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700"
                  >
                    {item.label}
                  </Link>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex min-h-[48px] items-center rounded-md px-4 py-3 text-base font-medium transition-colors ${
                  isActive
                    ? 'border-l-4 border-brand-gold-500 bg-brand-purple-50 font-semibold text-brand-purple-950'
                    : 'text-neutral-700 hover:bg-neutral-50 hover:text-brand-purple-900'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-500">
          <p className="font-medium text-neutral-700">{siteConfig.name}</p>
          <p className="mt-1 leading-normal">{siteConfig.address.fullAddress}</p>
        </div>
      </div>
    </div>
  );
}
