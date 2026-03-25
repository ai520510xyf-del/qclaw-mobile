import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message } from '../types/chat';

interface ChatState {
  messages: Message[];
  isTyping: boolean;
  addMessage: (message: Message) => void;
  updateMessage: (id: string, content: string) => void;
  deleteMessage: (id: string) => void;
  clearMessages: () => void;
  setTyping: (typing: boolean) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      isTyping: false,
      addMessage: (message) => set((state) => ({ 
        messages: [...state.messages, message] 
      })),
      updateMessage: (id, content) => set((state) => ({
        messages: state.messages.map((msg) =>
          msg.id === id ? { ...msg, content } : msg
        ),
      })),
      deleteMessage: (id) => set((state) => ({
        messages: state.messages.filter((msg) => msg.id !== id),
      })),
      clearMessages: () => set({ messages: [] }),
      setTyping: (typing) => set({ isTyping: typing }),
    }),
    {
      name: 'qclaw-chat',
      partialize: (state) => ({ messages: state.messages }),
    }
  )
);
