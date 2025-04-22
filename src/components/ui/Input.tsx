import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    label, 
    error, 
    hint,
    leftElement,
    rightElement,
    id,
    ...props 
  }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId} 
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            {label}
          </label>
        )}
        <div className={cn(
          "relative rounded-md shadow-sm",
          leftElement && "flex items-center"
        )}>
          {leftElement && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              {leftElement}
            </div>
          )}
          <input
            id={inputId}
            className={cn(
              "block w-full rounded-md border-slate-300 shadow-sm",
              "focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
              "disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200",
              error && "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500",
              leftElement && "pl-10",
              rightElement && "pr-10",
              className
            )}
            style={{ 
              padding: '0.5rem 0.75rem', 
              border: '1px solid rgb(var(--border) / 1)' 
            }}
            ref={ref}
            {...props}
          />
          {rightElement && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500">
              {rightElement}
            </div>
          )}
        </div>
        {hint && !error && (
          <p className="mt-1 text-sm text-slate-500">{hint}</p>
        )}
        {error && (
          <p className="mt-1 text-sm text-red-600" id={`${inputId}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;