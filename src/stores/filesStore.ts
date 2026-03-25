import { create } from 'zustand';
import { FileItem, UploadProgress } from '../types/file';

interface FilesState {
  files: FileItem[];
  uploads: UploadProgress[];
  setFiles: (files: FileItem[]) => void;
  addUpload: (upload: UploadProgress) => void;
  updateUpload: (id: string, progress: number, status?: UploadProgress['status']) => void;
  removeUpload: (id: string) => void;
}

export const useFilesStore = create<FilesState>()((set) => ({
  files: [
    { id: '1', name: '项目文档.docx', type: 'file', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: 1024000, createdAt: Date.now() - 86400000, updatedAt: Date.now() },
    { id: '2', name: '截图.png', type: 'file', mimeType: 'image/png', size: 512000, createdAt: Date.now() - 172800000, updatedAt: Date.now() },
    { id: '3', name: '会议记录.pdf', type: 'file', mimeType: 'application/pdf', size: 2048000, createdAt: Date.now() - 259200000, updatedAt: Date.now() },
    { id: '4', name: '工作文件夹', type: 'folder', createdAt: Date.now() - 345600000, updatedAt: Date.now() },
    { id: '5', name: '音频备忘.m4a', type: 'file', mimeType: 'audio/m4a', size: 3072000, createdAt: Date.now() - 432000000, updatedAt: Date.now() },
  ],
  uploads: [],
  setFiles: (files) => set({ files }),
  addUpload: (upload) => set((state) => ({ uploads: [...state.uploads, upload] })),
  updateUpload: (id, progress, status) => set((state) => ({
    uploads: state.uploads.map((u) =>
      u.id === id ? { ...u, progress, ...(status && { status }) } : u
    ),
  })),
  removeUpload: (id) => set((state) => ({
    uploads: state.uploads.filter((u) => u.id !== id),
  })),
}));
