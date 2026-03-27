import { getAuth } from './auth';
import type { TokenUsage, TokenUsageResponse, ModelType, ModelSwitchRequest } from '../types/model';

const API_BASE = '/api';

async function getAuthHeaders() {
  const auth = await getAuth();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth?.token || ''}`,
  };
}

export async function getTokenUsage(date?: string): Promise<TokenUsageResponse> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const queryDate = date || new Date().toISOString().split('T')[0];
  const response = await fetch(`${auth.gatewayUrl}${API_BASE}/token-usage?date=${queryDate}`, {
    headers: await getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to get token usage: ${response.statusText}`);
  }
  
  return response.json();
}

export async function recordTokenUsage(
  messageId: string,
  inputTokens: number,
  outputTokens: number,
  model: ModelType
): Promise<void> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const response = await fetch(`${auth.gatewayUrl}${API_BASE}/token-usage/record`, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify({
      messageId,
      inputTokens,
      outputTokens,
      model,
    }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to record token usage: ${response.statusText}`);
  }
}

export async function switchModel(request: ModelSwitchRequest): Promise<void> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const response = await fetch(`${auth.gatewayUrl}${API_BASE}/model/switch`, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify(request),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to switch model: ${response.statusText}`);
  }
}

export async function getAvailableModels(): Promise<{ id: ModelType; name: string; type: 'free' | 'paid' }[]> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const response = await fetch(`${auth.gatewayUrl}${API_BASE}/models`, {
    headers: await getAuthHeaders(),
  });
  
  if (!response.ok) {
    // Return default models if API fails
    return [
      { id: 'glm', name: 'GLM', type: 'free' },
      { id: 'openai', name: 'OpenAI', type: 'paid' },
      { id: 'claude', name: 'Claude', type: 'paid' },
    ];
  }
  
  return response.json();
}