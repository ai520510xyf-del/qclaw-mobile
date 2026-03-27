export type ModelType = 'glm' | 'openai' | 'claude' | 'other';

export interface ModelConfig {
  id: ModelType;
  name: string;
  type: 'free' | 'paid';
  dailyQuota?: number; // For free models
  apiKey?: string;
  endpoint?: string;
  isDefault: boolean;
}

export interface TokenUsage {
  date: string; // YYYY-MM-DD
  model: ModelType;
  totalTokens: number;
  inputTokens: number;
  outputTokens: number;
  freeQuota: number;
  usedQuota: number;
  remainingQuota: number;
  messages: TokenMessageUsage[];
}

export interface TokenMessageUsage {
  messageId: string;
  inputTokens: number;
  outputTokens: number;
  timestamp: number;
}

export interface ModelSwitchRequest {
  model: ModelType;
  apiKey?: string;
}

export interface TokenUsageResponse {
  model: ModelType;
  totalTokens: number;
  freeQuota: number;
  usedQuota: number;
  remainingQuota: number;
}
