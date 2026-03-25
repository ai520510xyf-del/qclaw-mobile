import { useCallback } from 'react';
import { useChatStore } from '../stores/chatStore';
import { useSettingsStore } from '../stores/settingsStore';
import { MessageList } from '../components/chat/MessageList';
import { ChatInput } from '../components/chat/ChatInput';
import { PageHeader } from '../components/layout/PageHeader';
import { Message } from '../types/chat';
import { generateId } from '../utils/validation';

export function ChatPage() {
  const { messages, isTyping, addMessage, updateMessage, deleteMessage, clearMessages, setTyping } = useChatStore();
  const { isConnected, gatewayUrl, token } = useSettingsStore();

  const handleSend = useCallback(async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: Date.now(),
      status: 'sent',
    };
    addMessage(userMessage);

    // Show typing indicator
    setTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: getAIResponse(content),
        timestamp: Date.now(),
        status: 'sent',
      };
      addMessage(aiMessage);
      setTyping(false);
    }, 1500);
  }, [addMessage, setTyping]);

  const getAIResponse = (input: string): string => {
    // Demo responses based on input
    if (input.includes('你好') || input.includes('hello') || input.includes('hi')) {
      return '你好！我是 QClaw AI 助手。有什么我可以帮助你的吗？';
    }
    if (input.includes('天气')) {
      return '当前天气：多云转晴，22°C。适合外出活动！☀️';
    }
    if (input.includes('帮助') || input.includes('help')) {
      return '我可以帮助你：\n\n🔍 搜索 - 查询网络信息\n✍️ 写作 - 辅助写作和改写\n🌐 翻译 - 多语言翻译\n💻 代码 - 代码生成和调试\n☀️ 天气 - 查询天气预报\n📅 日历 - 管理日程\n⏰ 提醒 - 创建定时提醒';
    }
    return `收到你的消息：「${input}」\n\n这是一个演示回复。在实际使用中，请配置 Gateway URL 和 Token 来连接真实的 QClaw Gateway。\n\n当前配置：\n- Gateway: ${gatewayUrl}\n- 已连接: ${isConnected ? '是' : '否'}`;
  };

  const handleDelete = (id: string) => {
    deleteMessage(id);
  };

  const connectionStatus = isConnected ? (
    <span className="flex items-center gap-1 text-xs text-success">
      <span className="w-2 h-2 bg-success rounded-full" />
      已连接
    </span>
  ) : (
    <span className="flex items-center gap-1 text-xs text-text-muted">
      <span className="w-2 h-2 bg-text-muted rounded-full" />
      未连接
    </span>
  );

  return (
    <div className="flex flex-col h-full bg-background-dark">
      <PageHeader
        title="QClaw"
        subtitle="AI 助手"
        right={connectionStatus}
        gradient
      />
      
      <MessageList
        messages={messages}
        isTyping={isTyping}
        onDeleteMessage={handleDelete}
      />
      
      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  );
}
