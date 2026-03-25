import { useState, FormEvent, useRef, useEffect } from 'react';
import { clsx } from 'clsx';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed && !disabled) {
      onSend(trimmed);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-3 bg-background-dark border-t border-white/5">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="输入消息..."
        disabled={disabled}
        rows={1}
        className={clsx(
          'flex-1 px-4 py-3 bg-background-elevated text-text-primary placeholder-text-muted rounded-card',
          'border border-transparent focus:border-primary focus:outline-none resize-none',
          'transition-colors duration-200 max-h-[120px]'
        )}
        style={{ minHeight: '48px' }}
      />
      <button
        type="submit"
        disabled={!input.trim() || disabled}
        className={clsx(
          'w-12 h-12 rounded-card flex items-center justify-center transition-all duration-200',
          'gradient-bg text-white',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          'active:scale-95'
        )}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
        </svg>
      </button>
    </form>
  );
}
