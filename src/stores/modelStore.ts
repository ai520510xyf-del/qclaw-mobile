import { create } from 'zustand';
import type { ModelType, ModelConfig, TokenUsage } from '../types/model';

const DEFAULT_MODELS: ModelConfig[] = [
  {
    id: 'glm',
    name: 'GLM',
    type: 'free',
    dailyQuota: 40000000, // 40M tokens = 4000W
    isDefault: true,
  },
  {
    id: 'openai',
    name: 'OpenAI',
    type: 'paid',
    isDefault: false,
  },
  {
    id: 'claude',
    name: 'Claude',
    type: 'paid',
    isDefault: false,
  },
];

interface ModelStore {
  // State
  currentModel: ModelType;
  models: ModelConfig[];
  tokenUsage: TokenUsage | null;
  isLoading: boolean;
  
  // Actions
  setCurrentModel: (model: ModelType) => void;
  setModels: (models: ModelConfig[]) => void;
  updateModelConfig: (id: ModelType, config: Partial<ModelConfig>) => void;
  setTokenUsage: (usage: TokenUsage | null) => void;
  setLoading: (loading: boolean) => void;
  
  // Getters
  getCurrentModelConfig: () => ModelConfig;
  getRemainingQuota: () => number;
  getUsagePercentage: () => number;
  isQuotaExceeded: () => boolean;
}

export const useModelStore = create<ModelStore>((set, get) => ({
  currentModel: 'glm',
  models: DEFAULT_MODELS,
  tokenUsage: null,
  isLoading: false,

  setCurrentModel: (model) => set({ currentModel: model }),
  
  setModels: (models) => set({ models }),

  updateModelConfig: (id, config) => {
    set((state) => ({
      models: state.models.map(m =>
        m.id === id ? { ...m, ...config } : m
      ),
    }));
  },

  setTokenUsage: (usage) => set({ tokenUsage: usage }),
  
  setLoading: (loading) => set({ isLoading: loading }),

  getCurrentModelConfig: () => {
    return get().models.find(m => m.id === get().currentModel) || DEFAULT_MODELS[0];
  },

  getRemainingQuota: () => {
    const { tokenUsage } = get();
    if (!tokenUsage) return 0;
    return tokenUsage.remainingQuota;
  },

  getUsagePercentage: () => {
    const { tokenUsage } = get();
    if (!tokenUsage || tokenUsage.freeQuota === 0) return 0;
    return Math.min(100, (tokenUsage.usedQuota / tokenUsage.freeQuota) * 100);
  },

  isQuotaExceeded: () => {
    const { tokenUsage } = get();
    if (!tokenUsage) return false;
    return tokenUsage.remainingQuota <= 0;
  },
}));