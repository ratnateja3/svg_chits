import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  badgeVariant?: 'purple' | 'gold';
  title: string;
  description?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2' | 'h3';
  invert?: boolean;
}

export function SectionHeading({
  badge,
  badgeVariant = 'purple',
  title,
  description,
  align = 'left',
  as: HeadingTag = 'h2',
  invert = false,
  className,
  ...props
}: SectionHeadingProps) {
  const isCentered = align === 'center';

  const badgeStyles = invert
    ? 'border-brand-gold-500/30 bg-brand-gold-500/10 text-brand-gold-300'
    : badgeVariant === 'gold'
      ? 'border-brand-gold-400/60 bg-brand-gold-50 text-brand-gold-900'
      : 'border-brand-purple-200/80 bg-brand-purple-50 text-brand-purple-900';

  return (
    <div
      className={cn('space-y-3', isCentered && 'mx-auto max-w-2xl text-center', className)}
      {...props}
    >
      {badge && (
        <span
          className={cn(
            'inline-block rounded border px-3 py-1 text-xs font-semibold uppercase tracking-wider',
            badgeStyles,
          )}
        >
          {badge}
        </span>
      )}
      <HeadingTag
        className={cn(
          'font-serif font-bold tracking-tight',
          HeadingTag === 'h1' && 'text-3xl sm:text-4xl lg:text-5xl',
          HeadingTag === 'h2' && 'text-2xl sm:text-3xl lg:text-4xl',
          HeadingTag === 'h3' && 'text-xl sm:text-2xl',
          invert ? 'text-white' : 'text-neutral-900',
        )}
      >
        {title}
      </HeadingTag>
      {description && (
        <p
          className={cn(
            'text-base leading-relaxed sm:text-lg',
            invert ? 'text-neutral-300' : 'text-neutral-600',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
