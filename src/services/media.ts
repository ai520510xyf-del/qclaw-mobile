import { getAuth } from './auth';
import type { MediaFile, MediaType, VoiceRecording, ImageUpload } from '../types/media';

const API_BASE = '/api';

async function getAuthHeaders() {
  const auth = await getAuth();
  return {
    'Authorization': `Bearer ${auth?.token || ''}`,
  };
}

export async function uploadImage(file: File, caption?: string): Promise<ImageUpload> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const formData = new FormData();
  formData.append('file', file);
  if (caption) formData.append('caption', caption);
  
  const response = await fetch(`${auth.gatewayUrl}${API_BASE}/media/upload/image`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${auth.token}` },
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error(`Failed to upload image: ${response.statusText}`);
  }
  
  return response.json();
}

export async function uploadVoiceRecording(recording: VoiceRecording): Promise<MediaFile> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const formData = new FormData();
  if (recording.blob) {
    formData.append('file', recording.blob, `voice_${recording.id}.webm`);
  }
  formData.append('duration', recording.duration.toString());
  
  const response = await fetch(`${auth.gatewayUrl}${API_BASE}/media/upload/voice`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${auth.token}` },
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error(`Failed to upload voice: ${response.statusText}`);
  }
  
  return response.json();
}

export async function transcribeVoice(voiceId: string): Promise<string> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const response = await fetch(`${auth.gatewayUrl}${API_BASE}/media/transcribe/${voiceId}`, {
    method: 'POST',
    headers: await getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to transcribe voice: ${response.statusText}`);
  }
  
  const result = await response.json();
  return result.transcript;
}

export async function textToSpeech(text: string, voice?: string): Promise<MediaFile> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const response = await fetch(`${auth.gatewayUrl}${API_BASE}/media/tts`, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify({ text, voice }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to convert text to speech: ${response.statusText}`);
  }
  
  return response.json();
}

export async function uploadFile(file: File): Promise<MediaFile> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${auth.gatewayUrl}${API_BASE}/media/upload/file`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${auth.token}` },
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error(`Failed to upload file: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getMediaList(type?: MediaType): Promise<MediaFile[]> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const url = type
    ? `${auth.gatewayUrl}${API_BASE}/media?type=${type}`
    : `${auth.gatewayUrl}${API_BASE}/media`;
  
  const response = await fetch(url, {
    headers: await getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to get media list: ${response.statusText}`);
  }
  
  return response.json();
}

export async function deleteMedia(mediaId: string): Promise<void> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  const response = await fetch(`${auth.gatewayUrl}${API_BASE}/media/${mediaId}`, {
    method: 'DELETE',
    headers: await getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to delete media: ${response.statusText}`);
  }
}

export async function getMediaUrl(mediaId: string): Promise<string> {
  const auth = await getAuth();
  if (!auth) throw new Error('Not authenticated');
  
  return `${auth.gatewayUrl}${API_BASE}/media/${mediaId}/download?token=${auth.token}`;
}