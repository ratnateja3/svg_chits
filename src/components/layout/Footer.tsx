'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/content/site';
import { footerQuickLinks, legalLinks } from '@/content/navigation';
import { getTelLink, getEmailLink, getWhatsAppLink } from '@/lib/contact';
import { openPayInstallmentsModal } from '@/components/shared/PayInstallmentsModal';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const telLink = getTelLink();
  const emailLink = getEmailLink();
  const whatsappLink = getWhatsAppLink();

  return (
    <footer className="border-t border-brand-purple-900 bg-brand-purple-950 text-neutral-300">
      <Container size="wide" className="py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Column 1: Company Info */}
          <div className="space-y-4 lg:col-span-1">
            <span className="block font-serif text-xl font-bold tracking-tight text-white">
              {siteConfig.name}
            </span>
            <p className="text-sm leading-relaxed text-neutral-400">
              A trusted, registered chit fund company offering disciplined financial
              savings and accessible credit solutions.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {footerQuickLinks.slice(0, 4).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block rounded py-1 text-neutral-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Information & Resources */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-white">
              Information
            </h3>
            <ul className="space-y-2 text-sm">
              {footerQuickLinks.slice(4).map((link) => (
                <li key={link.label}>
                  {link.label === 'Pay Installments' ? (
                    <button
                      type="button"
                      onClick={openPayInstallmentsModal}
                      className="inline-block rounded py-1 text-neutral-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-400"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="inline-block rounded py-1 text-neutral-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-400"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block rounded py-1 text-neutral-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Registered Office */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-white">
              Registered Office
            </h3>
            <address className="space-y-1 text-sm not-italic leading-relaxed text-neutral-400">
              <p>
                {siteConfig.address.line1}, {siteConfig.address.line2}
              </p>
              <p>
                {siteConfig.address.area}, {siteConfig.address.city}
              </p>
              <p>
                {siteConfig.address.district}, {siteConfig.address.state}
              </p>
              <p>
                PIN: {siteConfig.address.pincode}, {siteConfig.address.country}
              </p>
            </address>

            {/* Display contact details safely if configured */}
            {emailLink && siteConfig.contact.email && (
              <p className="pt-2 text-xs text-neutral-400">
                Email:{' '}
                <a
                  href={emailLink}
                  className="text-brand-gold-300 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold-400"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
            )}
            {whatsappLink && siteConfig.contact.whatsapp && (
              <p className="text-xs text-neutral-400">
                WhatsApp:{' '}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold-300 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold-400"
                >
                  {siteConfig.contact.whatsappDisplay || siteConfig.contact.whatsapp}
                </a>
              </p>
            )}
            {telLink && (
              <p className="text-xs text-neutral-400">
                Phone:{' '}
                <a
                  href={telLink}
                  className="text-brand-gold-300 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold-400"
                >
                  {siteConfig.contact.phoneDisplay || siteConfig.contact.phone}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-brand-purple-900/60 pt-8 text-xs text-neutral-500 sm:flex-row">
          <p>
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded py-1 transition-colors hover:text-neutral-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold-400"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
