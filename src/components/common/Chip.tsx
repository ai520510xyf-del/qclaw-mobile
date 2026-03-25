import { clsx } from 'clsx';

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function Chip({ label, selected = false, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
        selected
          ? 'gradient-bg text-white'
          : 'bg-background-elevated text-text-secondary hover:text-text-primary'
      )}
    >
      {label}
    </button>
  );
}
