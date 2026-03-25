import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          'w-full px-4 py-3 bg-background-elevated text-text-primary placeholder-text-muted rounded-card',
          'border border-transparent focus:border-primary focus:outline-none',
          'transition-colors duration-200',
          error && 'border-error focus:border-error',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
