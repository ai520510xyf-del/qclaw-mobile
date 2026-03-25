import { Message } from '../../types/chat';
import { formatDate } from '../../utils/date';
import { clsx } from 'clsx';

interface ChatBubbleProps {
  message: Message;
  onDelete?: (id: string) => void;
}

export function ChatBubble({ message, onDelete }: ChatBubbleProps) {
  const isUser = message.role === 'user';
  
  return (
    <div
      className={clsx(
        'flex animate-fade-in',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={clsx(
          'max-w-[80%] px-4 py-3 rounded-bubble',
          isUser
            ? 'gradient-bg text-white rounded-tl-bubble'
            : 'bg-background-card text-text-primary rounded-tr-bubble'
        )}
      >
        <p className="whitespace-pre-wrap break-words leading-relaxed">
          {message.content}
        </p>
        <div
          className={clsx(
            'text-xs mt-1.5',
            isUser ? 'text-white/60' : 'text-text-muted'
          )}
        >
          {formatDate.time(message.timestamp)}
        </div>
        {!isUser && onDelete && (
          <button
            onClick={() => onDelete(message.id)}
            className="absolute -right-2 -top-2 w-6 h-6 bg-background-elevated rounded-full flex items-center justify-center text-text-muted hover:text-error transition-colors opacity-0 group-hover:opacity-100"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
