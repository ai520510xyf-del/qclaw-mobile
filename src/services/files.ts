import { getAuth } from './auth';
import type { FileNode } from '../stores/fileTreeStore';

const API_BASE = '/api';

async function getAuthHeaders() {
  const auth = await getAuth();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth?.token || ''}`,
  };
}

export async function getFileTree(path?: string): Promise<FileNode[]> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const url = path
    ? `${auth.gatewayUrl}${API_BASE}/files/tree?path=${encodeURIComponent(path)}`
    : `${auth.gatewayUrl}${API_BASE}/files/tree`;
  
  const response = await fetch(url, {
    headers: await getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to get file tree: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getFileContent(path: string): Promise<string> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const response = await fetch(
    `${auth.gatewayUrl}${API_BASE}/files/content?path=${encodeURIComponent(path)}`,
    { headers: await getAuthHeaders() }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to get file content: ${response.statusText}`);
  }
  
  return response.text();
}

export async function saveFile(path: string, content: string): Promise<void> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const response = await fetch(`${auth.gatewayUrl}${API_BASE}/files/save`, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify({ path, content }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to save file: ${response.statusText}`);
  }
}

export async function createFile(path: string, type: 'file' | 'folder'): Promise<FileNode> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const response = await fetch(`${auth.gatewayUrl}${API_BASE}/files/create`, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify({ path, type }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to create file: ${response.statusText}`);
  }
  
  return response.json();
}

export async function deleteFile(path: string): Promise<void> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const response = await fetch(`${auth.gatewayUrl}${API_BASE}/files/delete`, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify({ path }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to delete file: ${response.statusText}`);
  }
}

export async function renameFile(oldPath: string, newPath: string): Promise<void> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const response = await fetch(`${auth.gatewayUrl}${API_BASE}/files/rename`, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify({ oldPath, newPath }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to rename file: ${response.statusText}`);
  }
}

export async function executeCode(language: string, code: string, cwd?: string): Promise<{
  stdout: string;
  stderr: string;
  exitCode: number;
}> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const response = await fetch(`${auth.gatewayUrl}${API_BASE}/files/execute`, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify({ language, code, cwd }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to execute code: ${response.statusText}`);
  }
  
  return response.json();
}