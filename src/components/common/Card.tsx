import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-background-card rounded-card p-4',
        onClick && 'cursor-pointer hover:bg-background-elevated transition-colors duration-200',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
