import { useState, useEffect, useRef, useCallback } from 'react';
import { useChatStore } from '../stores/chatStore';
import { getAuth } from '../services/auth';
import { streamChat } from '../services/api';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [config, setConfig] = useState<{ gatewayUrl: string; token: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const { messages, isLoading, addMessage, updateMessage, setLoading, clearMessages } = useChatStore();

  // Load auth config
  useEffect(() => {
    getAuth().then((auth) => {
      if (auth) setConfig(auth);
    });
  }, []);

  // Auto scroll
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !config) return;

    const userMsg = input.trim();
    setInput('');
    setLoading(true);

    // Add user message
    addMessage({ role: 'user', content: userMsg });

    // Prepare messages for API
    const apiMessages = [
      ...messages.map((m) => ({ role: m.role, content: m.content })),
      { role: 'user' as const, content: userMsg },
    ];

    // Create abort controller
    abortRef.current = new AbortController();

    // Add placeholder for AI response
    const aiMsgId = addMessage({ role: 'assistant', content: '' });
    let fullResponse = '';

    try {
      const generator = streamChat({
        gatewayUrl: config.gatewayUrl,
        token: config.token,
        messages: apiMessages,
        signal: abortRef.current.signal,
      });

      for await (const chunk of generator) {
        fullResponse += chunk;
        updateMessage(aiMsgId, fullResponse);
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        updateMessage(aiMsgId, fullResponse || '[已停止]');
      } else {
        updateMessage(aiMsgId, `[错误] ${(err as Error).message}`);
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  const handleStop = () => {
    abortRef.current?.abort();
  };

  const handleClear = () => {
    if (confirm('确定清空对话？')) {
      clearMessages();
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#0A0A14' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ background: '#12121E', borderBottom: '1px solid #1E1E30' }}>
        <div>
          <h1 className="font-semibold" style={{ color: '#FFFFFF' }}>QClaw</h1>
          <p className="text-xs" style={{ color: '#8888AA' }}>随时随地，AI 相伴</p>
        </div>
        <button
          onClick={handleClear}
          className="px-3 py-1.5 rounded-lg text-sm transition-all hover:opacity-80"
          style={{ background: '#1E1E30', color: '#8888AA' }}
        >
          清空
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-5xl mb-4">🦞</div>
            <h2 className="text-lg font-medium mb-2" style={{ color: '#FFFFFF' }}>你好，我是 QClaw</h2>
            <p style={{ color: '#8888AA' }}>有什么可以帮你的吗？</p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className="max-w-[80%] px-4 py-3 rounded-2xl"
              style={{
                background: msg.role === 'user'
                  ? 'linear-gradient(135deg, #667EEA, #764BA2)'
                  : '#12121E',
                color: '#FFFFFF',
                borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              }}
            >
              <p className="whitespace-pre-wrap break-words">{msg.content}</p>
              <p className="text-xs mt-1 opacity-60">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl" style={{ background: '#12121E', borderRadius: '16px 16px 16px 4px' }}>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#667EEA', animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#667EEA', animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#667EEA', animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4" style={{ background: '#12121E', borderTop: '1px solid #1E1E30' }}>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="输入消息..."
            disabled={isLoading || !config}
            className="flex-1 px-4 py-3 rounded-xl outline-none"
            style={{ background: '#0A0A14', color: '#FFFFFF', border: '1px solid #1E1E30' }}
          />
          {isLoading ? (
            <button
              onClick={handleStop}
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: '#EF4444' }}
            >
              <span className="text-white text-lg">■</span>
            </button>
          ) : (
            <button
              onClick={handleSend}
              disabled={!input.trim() || !config}
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all"
              style={{
                background: input.trim() && config
                  ? 'linear-gradient(135deg, #667EEA, #764BA2)'
                  : '#1E1E30',
                opacity: input.trim() && config ? 1 : 0.5,
              }}
            >
              <span className="text-white text-lg">↑</span>
            </button>
          )}
        </div>
        {!config && (
          <p className="text-xs text-center mt-2" style={{ color: '#8888AA' }}>
            请先在设置中配置连接
          </p>
        )}
      </div>
    </div>
  );
}
