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
      className={`inline-flex items-center gap-3 rounded transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 ${
        isLight
          ? 'focus-visible:ring-brand-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-purple-950'
          : 'focus-visible:ring-brand-purple-700 focus-visible:ring-offset-2'
      } ${className}`}
      aria-label={`${siteConfig.name} - Home`}
    >
      <div className="relative h-10 w-10 flex-shrink-0 sm:h-11 sm:w-11">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt={siteConfig.name}
          className="h-full w-full rounded-full object-contain shadow-sm"
        />
      </div>

      <div className="flex flex-col">
        <span
          className={`font-serif text-base font-bold leading-tight tracking-tight sm:text-lg ${
            isLight ? 'text-white' : 'text-brand-purple-900'
          }`}
        >
          {siteConfig.name}
        </span>
        <span
          className={`text-[11px] font-medium uppercase tracking-wider ${
            isLight ? 'text-brand-gold-300' : 'text-neutral-500'
          }`}
        >
          Govt. Registered Chit Fund
        </span>
      </div>
    </Link>
  );
}
