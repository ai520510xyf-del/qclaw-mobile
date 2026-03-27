import { create } from 'zustand';
import type { MemoryEntry, DailyMemory, LongTermMemory } from '../types/memory';

interface MemoryStore {
  longTermMemory: LongTermMemory;
  dailyMemories: DailyMemory[];
  searchQuery: string;
  selectedDate: string | null;
  
  // Actions
  setLongTermMemory: (memory: LongTermMemory) => void;
  setDailyMemories: (memories: DailyMemory[]) => void;
  addMemoryEntry: (entry: MemoryEntry) => void;
  updateMemoryEntry: (id: string, content: string) => void;
  deleteMemoryEntry: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedDate: (date: string | null) => void;
  
  // Getters
  getFilteredMemories: () => MemoryEntry[];
  getDailyMemory: (date: string) => DailyMemory | undefined;
}

export const useMemoryStore = create<MemoryStore>((set, get) => ({
  longTermMemory: { entries: [], lastUpdated: 0 },
  dailyMemories: [],
  searchQuery: '',
  selectedDate: null,

  setLongTermMemory: (memory) => set({ longTermMemory: memory }),
  
  setDailyMemories: (memories) => set({ dailyMemories: memories }),

  addMemoryEntry: (entry) => {
    set((state) => {
      if (entry.type === 'long-term') {
        return {
          longTermMemory: {
            entries: [...state.longTermMemory.entries, entry],
            lastUpdated: Date.now(),
          },
        };
      } else {
        const existingDaily = state.dailyMemories.find(m => m.date === entry.date);
        if (existingDaily) {
          return {
            dailyMemories: state.dailyMemories.map(m =>
              m.date === entry.date
                ? { ...m, entries: [...m.entries, entry] }
                : m
            ),
          };
        } else {
          return {
            dailyMemories: [
              ...state.dailyMemories,
              {
                date: entry.date,
                content: entry.content,
                entries: [entry],
              },
            ],
          };
        }
      }
    });
  },

  updateMemoryEntry: (id, content) => {
    set((state) => ({
      longTermMemory: {
        ...state.longTermMemory,
        entries: state.longTermMemory.entries.map(e =>
          e.id === id ? { ...e, content } : e
        ),
      },
      dailyMemories: state.dailyMemories.map(m => ({
        ...m,
        entries: m.entries.map(e =>
          e.id === id ? { ...e, content } : e
        ),
      })),
    }));
  },

  deleteMemoryEntry: (id) => {
    set((state) => ({
      longTermMemory: {
        ...state.longTermMemory,
        entries: state.longTermMemory.entries.filter(e => e.id !== id),
      },
      dailyMemories: state.dailyMemories.map(m => ({
        ...m,
        entries: m.entries.filter(e => e.id !== id),
      })).filter(m => m.entries.length > 0),
    }));
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setSelectedDate: (date) => set({ selectedDate: date }),

  getFilteredMemories: () => {
    const { searchQuery, longTermMemory, dailyMemories } = get();
    const allEntries = [
      ...longTermMemory.entries,
      ...dailyMemories.flatMap(m => m.entries),
    ];
    
    if (!searchQuery.trim()) return allEntries;
    
    const query = searchQuery.toLowerCase();
    return allEntries.filter(
      entry =>
        entry.content.toLowerCase().includes(query) ||
        entry.title?.toLowerCase().includes(query) ||
        entry.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  },

  getDailyMemory: (date) => {
    return get().dailyMemories.find(m => m.date === date);
  },
}));