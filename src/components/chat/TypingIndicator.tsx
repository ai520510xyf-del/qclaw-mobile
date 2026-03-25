export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 bg-background-card rounded-bubble rounded-tl-sm w-fit max-w-[80px]">
      <div
        className="w-2 h-2 bg-text-muted rounded-full animate-bounce-dot"
        style={{ animationDelay: '0ms' }}
      />
      <div
        className="w-2 h-2 bg-text-muted rounded-full animate-bounce-dot"
        style={{ animationDelay: '150ms' }}
      />
      <div
        className="w-2 h-2 bg-text-muted rounded-full animate-bounce-dot"
        style={{ animationDelay: '300ms' }}
      />
    </div>
  );
}
