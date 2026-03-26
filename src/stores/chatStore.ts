import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatStore {
  messages: ChatMessage[];
  isLoading: boolean;
  addMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => string;
  updateMessage: (id: string, content: string) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
}

let idCounter = 0;
function genId() {
  return `msg_${Date.now()}_${++idCounter}`;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  isLoading: false,

  addMessage: (msg) => {
    const id = genId();
    const newMsg: ChatMessage = {
      ...msg,
      id,
      timestamp: Date.now(),
    };
    set((state) => ({
      messages: [...state.messages, newMsg],
    }));
    return id;
  },

  updateMessage: (id, content) => {
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id ? { ...m, content } : m
      ),
    }));
  },

  setLoading: (loading) => set({ isLoading: loading }),

  clearMessages: () => set({ messages: [] }),
}));
