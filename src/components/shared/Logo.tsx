import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/content/site';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

/**
 * Brand Logo component.
 * Uses the actual supplied logo asset from public/logo/logo.png.
 * Does NOT recreate or fake the logo using icons, AI graphics, or CSS shapes.
 */
export function Logo({ className = '', variant = 'dark' }: LogoProps) {
  const isLight = variant === 'light';
  const logoSrc = '/logo/logo.png';

  return (
    <Link
      href="/"
      className={`inline-flex min-w-0 max-w-full items-center gap-2 rounded transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 sm:gap-3 ${
        isLight
          ? 'focus-visible:ring-brand-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-purple-950'
          : 'focus-visible:ring-brand-purple-700 focus-visible:ring-offset-2'
      } ${className}`}
      aria-label={`${siteConfig.name} - Home`}
    >
      <div className="relative h-9 w-9 shrink-0 sm:h-10 sm:w-10 md:h-11 md:w-11">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt={siteConfig.name}
          className="h-full w-full rounded-full object-contain shadow-sm"
        />
      </div>

      <div className="flex min-w-0 flex-col">
        <span
          className={`font-serif text-[13px] font-bold leading-tight tracking-tight min-[360px]:text-sm min-[430px]:text-base sm:text-base lg:text-lg ${
            isLight ? 'text-white' : 'text-brand-purple-900'
          }`}
        >
          {siteConfig.name}
        </span>
      </div>
    </Link>
  );
}
