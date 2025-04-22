import React from 'react';
import { cn } from '../../lib/utils';

type BadgeVariant = 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger';

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ 
  variant = 'default', 
  className, 
  children 
}) => {
  const variantClasses = {
    default: 'bg-indigo-100 text-indigo-800',
    secondary: 'bg-slate-100 text-slate-800',
    outline: 'bg-transparent border border-slate-200 text-slate-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    danger: 'bg-red-100 text-red-800',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;