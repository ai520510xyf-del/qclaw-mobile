export type MediaType = 'image' | 'voice' | 'video' | 'file';

export interface MediaFile {
  id: string;
  type: MediaType;
  filename: string;
  size: number;
  mimeType: string;
  url?: string;
  localPath?: string;
  timestamp: number;
}

export interface VoiceRecording {
  id: string;
  duration: number; // seconds
  blob?: Blob;
  localPath?: string;
  transcript?: string;
  timestamp: number;
}

export interface ImageUpload {
  id: string;
  file?: File;
  localPath?: string;
  preview?: string; // data URL
  caption?: string;
  timestamp: number;
}
