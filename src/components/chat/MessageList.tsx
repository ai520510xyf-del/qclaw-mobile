import { useEffect, useRef } from 'react';
import { Message } from '../../types/chat';
import { ChatBubble } from './ChatBubble';
import { TypingIndicator } from './TypingIndicator';
import { EmptyState } from '../common/EmptyState';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  onDeleteMessage?: (id: string) => void;
}

export function MessageList({ messages, isTyping, onDeleteMessage }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <EmptyState
          icon="💬"
          title="开始对话"
          description="发送消息与我开始聊天"
        />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 no-scrollbar">
      {messages.map((message) => (
        <div key={message.id} className="group relative">
          <ChatBubble message={message} onDelete={onDeleteMessage} />
        </div>
      ))}
      {isTyping && (
        <div className="flex items-start gap-2">
          <span className="text-2xl">🤖</span>
          <TypingIndicator />
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
