import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'quiet';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      href,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-700 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none min-h-[44px] min-w-[44px]';

    const variants: Record<string, string> = {
      primary:
        'bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-purple-950 font-semibold border border-brand-gold-600/30 shadow-sm active:bg-brand-gold-700',
      secondary:
        'bg-brand-purple-900 hover:bg-brand-purple-800 text-white border border-transparent active:bg-brand-purple-950',
      outline:
        'border border-brand-purple-900 text-brand-purple-900 hover:bg-brand-purple-50 active:bg-brand-purple-100',
      ghost:
        'text-neutral-700 hover:text-brand-purple-900 hover:bg-brand-purple-50/80 active:bg-brand-purple-100',
      quiet:
        'text-neutral-600 hover:text-brand-purple-900 bg-neutral-100/80 hover:bg-neutral-200/80 border border-neutral-300 text-xs font-normal tracking-wide',
    };

    const sizes: Record<string, string> = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    const classes = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      className,
    );

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} disabled={disabled} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
