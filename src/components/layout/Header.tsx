import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/shared/Logo';
import { MobileNav } from '@/components/layout/MobileNav';
import { navigationLinks } from '@/content/navigation';

export function Header() {
  const primaryLinks = navigationLinks.filter((item) => !item.variant);
  const quietAction = navigationLinks.find((item) => item.variant === 'quiet');
  const prominentAction = navigationLinks.find((item) => item.variant === 'prominent');

  return (
    <header className="sticky top-0 z-30 w-full border-b border-neutral-200 bg-white shadow-sm">
      <Container size="wide">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo / Brand identity */}
          <div className="flex-shrink-0">
            <Logo variant="dark" />
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center space-x-1 lg:flex xl:space-x-2"
            aria-label="Primary Navigation"
          >
            {primaryLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-brand-purple-50/60 hover:text-brand-purple-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center space-x-3 lg:flex">
            {quietAction && (
              <Link
                href={quietAction.href}
                className="rounded-md border border-neutral-300 bg-neutral-100 px-3 py-2 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-brand-purple-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700"
              >
                {quietAction.label}
              </Link>
            )}

            {prominentAction && (
              <Link
                href={prominentAction.href}
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-brand-purple-950/20 bg-brand-purple-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-purple-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700 active:bg-brand-purple-950"
              >
                {prominentAction.label}
              </Link>
            )}
          </div>

          {/* Mobile Navigation Trigger */}
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
