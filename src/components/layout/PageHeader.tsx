import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  gradient?: boolean;
}

export function PageHeader({ title, subtitle, right, gradient = false }: PageHeaderProps) {
  return (
    <header
      className={clsx(
        'sticky top-0 z-40 px-4 py-3',
        gradient ? 'gradient-bg' : 'bg-background-dark'
      )}
    >
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <div>
          <h1 className={clsx(
            'text-xl font-bold',
            gradient ? 'text-white' : 'text-text-primary'
          )}>
            {title}
          </h1>
          {subtitle && (
            <p className={clsx(
              'text-sm mt-0.5',
              gradient ? 'text-white/70' : 'text-text-secondary'
            )}>
              {subtitle}
            </p>
          )}
        </div>
        {right && <div>{right}</div>}
      </div>
    </header>
  );
}
