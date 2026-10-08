'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/shared/Logo';
import { MobileNav } from '@/components/layout/MobileNav';
import { navigationLinks } from '@/content/navigation';
import { openPayInstallmentsModal } from '@/components/shared/PayInstallmentsModal';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const primaryLinks = navigationLinks.filter((item) => !item.variant);
  const quietAction = navigationLinks.find((item) => item.variant === 'quiet');
  const prominentAction = navigationLinks.find((item) => item.variant === 'prominent');

  return (
    <header className="sticky top-0 z-30 w-full border-b border-brand-purple-900 bg-brand-purple-950 shadow-sm">
      <Container size="wide">
        <div className="flex h-20 items-center justify-between gap-2 min-w-0 sm:gap-4">
          {/* Logo / Brand identity */}
          <div className="min-w-0 flex-1 lg:flex-initial lg:shrink-0">
            <Logo variant="light" />
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center space-x-1 lg:flex xl:space-x-2"
            aria-label="Primary Navigation"
          >
            {primaryLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'relative rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-400',
                    isActive
                      ? 'font-semibold text-white after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-brand-gold-400'
                      : 'text-neutral-200 hover:bg-brand-purple-900/80 hover:text-white',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center space-x-3 lg:flex">
            {quietAction && (
              <button
                type="button"
                onClick={openPayInstallmentsModal}
                className="rounded-md border border-brand-purple-800 bg-brand-purple-900/60 px-3 py-2 text-xs font-medium text-neutral-300 transition-colors hover:border-brand-purple-700 hover:bg-brand-purple-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-400"
              >
                {quietAction.label}
              </button>
            )}

            {prominentAction && (
              <Link
                href={prominentAction.href}
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/20 bg-white px-4 py-2 text-sm font-semibold text-brand-purple-950 shadow-sm transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-400 active:bg-neutral-200"
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
