import React from 'react';
import { cn } from '../../lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    label, 
    error, 
    hint,
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
        <textarea
          id={inputId}
          className={cn(
            "block w-full rounded-md border-slate-300 shadow-sm",
            "focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
            "disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200",
            error && "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500",
            className
          )}
          style={{ 
            padding: '0.5rem 0.75rem', 
            border: '1px solid rgb(var(--border) / 1)' 
          }}
          ref={ref}
          {...props}
        />
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

Textarea.displayName = 'Textarea';

export default Textarea;