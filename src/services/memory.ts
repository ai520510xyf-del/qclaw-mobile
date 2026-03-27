import { getAuth } from './auth';
import type { MemoryEntry, DailyMemory, LongTermMemory } from '../types/memory';

const API_BASE = '/api';

async function getAuthHeaders() {
  const auth = await getAuth();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth?.token || ''}`,
  };
}

export async function getLongTermMemory(): Promise<LongTermMemory> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const response = await fetch(`${auth.gatewayUrl}${API_BASE}/memory/long-term`, {
    headers: await getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to get long-term memory: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getDailyMemory(date: string): Promise<DailyMemory | null> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const response = await fetch(`${auth.gatewayUrl}${API_BASE}/memory/daily/${date}`, {
    headers: await getAuthHeaders(),
  });
  
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Failed to get daily memory: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getDailyMemories(startDate: string, endDate: string): Promise<DailyMemory[]> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const response = await fetch(
    `${auth.gatewayUrl}${API_BASE}/memory/daily?start=${startDate}&end=${endDate}`,
    { headers: await getAuthHeaders() }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to get daily memories: ${response.statusText}`);
  }
  
  return response.json();
}

export async function addMemoryEntry(entry: Omit<MemoryEntry, 'id' | 'timestamp'>): Promise<MemoryEntry> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const response = await fetch(`${auth.gatewayUrl}${API_BASE}/memory/entry`, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify({
      ...entry,
      timestamp: Date.now(),
    }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to add memory entry: ${response.statusText}`);
  }
  
  return response.json();
}

export async function updateMemoryEntry(id: string, content: string): Promise<void> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const response = await fetch(`${auth.gatewayUrl}${API_BASE}/memory/entry/${id}`, {
    method: 'PUT',
    headers: await getAuthHeaders(),
    body: JSON.stringify({ content }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to update memory entry: ${response.statusText}`);
  }
}

export async function deleteMemoryEntry(id: string): Promise<void> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const response = await fetch(`${auth.gatewayUrl}${API_BASE}/memory/entry/${id}`, {
    method: 'DELETE',
    headers: await getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to delete memory entry: ${response.statusText}`);
  }
}

export async function searchMemory(query: string): Promise<MemoryEntry[]> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const response = await fetch(
    `${auth.gatewayUrl}${API_BASE}/memory/search?q=${encodeURIComponent(query)}`,
    { headers: await getAuthHeaders() }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to search memory: ${response.statusText}`);
  }
  
  return response.json();
}