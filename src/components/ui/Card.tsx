import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  hover?: boolean;
  children: React.ReactNode;
}

export function Card({
  as: Component = 'div',
  padding = 'md',
  border = true,
  hover = false,
  className,
  children,
  ...props
}: CardProps) {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <Component
      className={cn(
        'rounded-lg bg-white transition-colors',
        border && 'border border-neutral-200/80 shadow-sm',
        hover && 'hover:border-brand-purple-300',
        paddingClasses[padding],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
