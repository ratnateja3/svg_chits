import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { siteConfig } from '@/content/site';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

/**
 * Brand Logo component.
 * Uses the actual supplied logo asset from public/logo/ if present.
 * Does NOT recreate or fake the logo using icons, AI graphics, or CSS shapes.
 */
export function Logo({ className = '', variant = 'dark' }: LogoProps) {
  // Check for supplied logo asset in public/logo directory
  let logoFileName: string | null = null;

  try {
    const logoDir = path.join(process.cwd(), 'public', 'logo');
    if (fs.existsSync(logoDir)) {
      const files = fs.readdirSync(logoDir);
      const imageFiles = files.filter((f) => /\.(svg|png|jpg|jpeg|webp)$/i.test(f));
      if (imageFiles.length > 0) {
        logoFileName = imageFiles[0];
      }
    }
  } catch {
    logoFileName = null;
  }

  const isLight = variant === 'light';

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 rounded transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700 focus-visible:ring-offset-2 ${className}`}
      aria-label={`${siteConfig.name} - Home`}
    >
      {logoFileName ? (
        <div className="relative h-10 w-10 flex-shrink-0 sm:h-11 sm:w-11">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/logo/${logoFileName}`}
            alt={siteConfig.name}
            className="h-full w-full rounded-full object-contain shadow-sm"
          />
        </div>
      ) : null}

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
