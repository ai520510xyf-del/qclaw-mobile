import { Message } from '../types/chat';
import { api } from './api';

export const chatService = {
  async sendMessage(message: string, sessionId?: string): Promise<Message> {
    try {
      const response = await api.post('/api/chat/send', { message, sessionId });
      return response.data;
    } catch (error) {
      // For demo, return a mock response
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: '这是一条模拟回复。在实际使用中，请配置 Gateway URL 和 Token 来连接真实的 QClaw Gateway。',
        timestamp: Date.now(),
        status: 'sent',
      };
    }
  },

  async getHistory(sessionId?: string): Promise<Message[]> {
    try {
      const response = await api.get('/api/chat/history', { params: { sessionId } });
      return response.data.messages || [];
    } catch (error) {
      return [];
    }
  },
};
