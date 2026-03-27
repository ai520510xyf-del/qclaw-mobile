import { create } from 'zustand';
import type { MediaType, MediaFile, VoiceRecording, ImageUpload } from '../types/media';

interface MediaStore {
  // State
  images: ImageUpload[];
  voiceRecordings: VoiceRecording[];
  files: MediaFile[];
  isRecording: boolean;
  recordingDuration: number;
  
  // Actions
  addImage: (image: ImageUpload) => void;
  removeImage: (id: string) => void;
  updateImageCaption: (id: string, caption: string) => void;
  
  addVoiceRecording: (recording: VoiceRecording) => void;
  removeVoiceRecording: (id: string) => void;
  setRecording: (isRecording: boolean, duration?: number) => void;
  
  addFile: (file: MediaFile) => void;
  removeFile: (id: string) => void;
  
  clearAll: () => void;
  
  // Getters
  getMediaByType: (type: MediaType) => MediaFile[];
  getTotalSize: () => number;
}

export const useMediaStore = create<MediaStore>((set, get) => ({
  images: [],
  voiceRecordings: [],
  files: [],
  isRecording: false,
  recordingDuration: 0,

  addImage: (image) => {
    set((state) => ({
      images: [...state.images, image],
    }));
  },

  removeImage: (id) => {
    set((state) => ({
      images: state.images.filter(img => img.id !== id),
    }));
  },

  updateImageCaption: (id, caption) => {
    set((state) => ({
      images: state.images.map(img =>
        img.id === id ? { ...img, caption } : img
      ),
    }));
  },

  addVoiceRecording: (recording) => {
    set((state) => ({
      voiceRecordings: [...state.voiceRecordings, recording],
    }));
  },

  removeVoiceRecording: (id) => {
    set((state) => ({
      voiceRecordings: state.voiceRecordings.filter(r => r.id !== id),
    }));
  },

  setRecording: (isRecording, duration = 0) => {
    set({ isRecording, recordingDuration: duration });
  },

  addFile: (file) => {
    set((state) => ({
      files: [...state.files, file],
    }));
  },

  removeFile: (id) => {
    set((state) => ({
      files: state.files.filter(f => f.id !== id),
    }));
  },

  clearAll: () => {
    set({
      images: [],
      voiceRecordings: [],
      files: [],
      isRecording: false,
      recordingDuration: 0,
    });
  },

  getMediaByType: (type) => {
    return get().files.filter(f => f.type === type);
  },

  getTotalSize: () => {
    const { images, voiceRecordings, files } = get();
    const imageSize = images.reduce((sum, img) => sum + (img.file?.size || 0), 0);
    const voiceSize = voiceRecordings.reduce((sum, r) => sum + (r.blob?.size || 0), 0);
    const fileSize = files.reduce((sum, f) => sum + f.size, 0);
    return imageSize + voiceSize + fileSize;
  },
}));