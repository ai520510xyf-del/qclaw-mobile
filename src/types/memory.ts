export interface MemoryEntry {
  id: string;
  type: 'long-term' | 'daily';
  title?: string;
  content: string;
  date: string; // YYYY-MM-DD
  timestamp: number;
  tags?: string[];
}

export interface DailyMemory {
  date: string;
  content: string;
  entries: MemoryEntry[];
}

export interface LongTermMemory {
  entries: MemoryEntry[];
  lastUpdated: number;
}
