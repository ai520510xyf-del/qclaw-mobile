import { FileItem } from '../types/file';
import { api } from './api';

export const filesService = {
  async getFiles(): Promise<FileItem[]> {
    try {
      const response = await api.get('/api/files');
      return response.data.files || [];
    } catch (error) {
      return [];
    }
  },

  async uploadFile(file: File, onProgress?: (progress: number) => void): Promise<FileItem | null> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/api/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(progress);
          }
        },
      });

      return response.data;
    } catch (error) {
      return null;
    }
  },

  async deleteFile(id: string): Promise<boolean> {
    try {
      await api.delete(`/api/files/${id}`);
      return true;
    } catch (error) {
      return false;
    }
  },
};
