import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  spacing?: 'sm' | 'md' | 'lg' | 'none';
  background?: 'white' | 'subtle' | 'purple' | 'none';
  children: React.ReactNode;
}

export function Section({
  as: Component = 'section',
  spacing = 'md',
  background = 'none',
  className,
  children,
  ...props
}: SectionProps) {
  const spacingClasses = {
    none: 'py-0',
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16 lg:py-20',
    lg: 'py-16 md:py-24 lg:py-28',
  };

  const bgClasses = {
    none: '',
    white: 'bg-white',
    subtle: 'bg-brand-purple-50/50',
    purple: 'bg-brand-purple-900 text-white',
  };

  return (
    <Component className={cn(spacingClasses[spacing], bgClasses[background], className)} {...props}>
      {children}
    </Component>
  );
}
