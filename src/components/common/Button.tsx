import { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:pointer-events-none';
  
  const variantStyles = {
    primary: 'gradient-bg text-white shadow-lg shadow-primary/25',
    secondary: 'bg-background-elevated text-text-primary hover:bg-background-card',
    ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-background-elevated',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm rounded-btn-sm',
    md: 'px-4 py-2 text-base rounded-btn-sm',
    lg: 'px-6 py-3 text-lg rounded-btn-lg',
  };

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
