import { create } from 'zustand';

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
  content?: string;
  isOpen?: boolean;
  isModified?: boolean;
  language?: string;
  size?: number;
  lastModified?: number;
}

interface FileTreeStore {
  // State
  rootPath: string;
  fileTree: FileNode[];
  selectedFile: FileNode | null;
  openFiles: FileNode[];
  activeFileId: string | null;
  isLoading: boolean;
  expandedFolders: Set<string>;
  
  // Actions
  setRootPath: (path: string) => void;
  setFileTree: (tree: FileNode[]) => void;
  selectFile: (file: FileNode | null) => void;
  openFile: (file: FileNode) => void;
  closeFile: (fileId: string) => void;
  setActiveFile: (fileId: string | null) => void;
  updateFileContent: (fileId: string, content: string) => void;
  toggleFolder: (folderId: string) => void;
  setLoading: (loading: boolean) => void;
  createFile: (parentPath: string, name: string, type: 'file' | 'folder') => void;
  deleteFile: (fileId: string) => void;
  renameFile: (fileId: string, newName: string) => void;
  saveFile: (fileId: string) => void;
  
  // Getters
  getFileById: (id: string) => FileNode | undefined;
  getFileByPath: (path: string) => FileNode | undefined;
  getParentFolder: (fileId: string) => FileNode | undefined;
}

function findFileById(tree: FileNode[], id: string): FileNode | undefined {
  for (const node of tree) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findFileById(node.children, id);
      if (found) return found;
    }
  }
  return undefined;
}

function findFileByPath(tree: FileNode[], path: string): FileNode | undefined {
  for (const node of tree) {
    if (node.path === path) return node;
    if (node.children) {
      const found = findFileByPath(node.children, path);
      if (found) return found;
    }
  }
  return undefined;
}

function updateFileInTree(tree: FileNode[], fileId: string, updater: (file: FileNode) => FileNode): FileNode[] {
  return tree.map(node => {
    if (node.id === fileId) {
      return updater(node);
    }
    if (node.children) {
      return { ...node, children: updateFileInTree(node.children, fileId, updater) };
    }
    return node;
  });
}

function removeFileFromTree(tree: FileNode[], fileId: string): FileNode[] {
  return tree
    .filter(node => node.id !== fileId)
    .map(node => {
      if (node.children) {
        return { ...node, children: removeFileFromTree(node.children, fileId) };
      }
      return node;
    });
}

function getFileLanguage(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  const languageMap: Record<string, string> = {
    'js': 'javascript',
    'ts': 'typescript',
    'jsx': 'javascript',
    'tsx': 'typescript',
    'py': 'python',
    'html': 'html',
    'css': 'css',
    'scss': 'scss',
    'json': 'json',
    'md': 'markdown',
    'java': 'java',
    'go': 'go',
    'rs': 'rust',
    'cpp': 'cpp',
    'c': 'c',
    'h': 'c',
    'php': 'php',
    'rb': 'ruby',
    'swift': 'swift',
    'kt': 'kotlin',
    'sql': 'sql',
    'yaml': 'yaml',
    'yml': 'yaml',
    'xml': 'xml',
    'sh': 'shell',
    'bash': 'shell',
  };
  return languageMap[ext || ''] || 'text';
}

export const useFileTreeStore = create<FileTreeStore>((set, get) => ({
  rootPath: '',
  fileTree: [],
  selectedFile: null,
  openFiles: [],
  activeFileId: null,
  isLoading: false,
  expandedFolders: new Set(),

  setRootPath: (path) => set({ rootPath: path }),
  
  setFileTree: (tree) => set({ fileTree: tree }),

  selectFile: (file) => set({ selectedFile: file }),

  openFile: (file) => {
    set((state) => {
      const isAlreadyOpen = state.openFiles.some(f => f.id === file.id);
      return {
        openFiles: isAlreadyOpen ? state.openFiles : [...state.openFiles, file],
        activeFileId: file.id,
      };
    });
  },

  closeFile: (fileId) => {
    set((state) => {
      const newOpenFiles = state.openFiles.filter(f => f.id !== fileId);
      const newActiveFileId = state.activeFileId === fileId
        ? (newOpenFiles[newOpenFiles.length - 1]?.id || null)
        : state.activeFileId;
      return {
        openFiles: newOpenFiles,
        activeFileId: newActiveFileId,
      };
    });
  },

  setActiveFile: (fileId) => set({ activeFileId: fileId }),

  updateFileContent: (fileId, content) => {
    set((state) => ({
      fileTree: updateFileInTree(state.fileTree, fileId, (file) => ({
        ...file,
        content,
        isModified: true,
        lastModified: Date.now(),
      })),
      openFiles: state.openFiles.map(f =>
        f.id === fileId ? { ...f, content, isModified: true } : f
      ),
    }));
  },

  toggleFolder: (folderId) => {
    set((state) => {
      const newExpanded = new Set(state.expandedFolders);
      if (newExpanded.has(folderId)) {
        newExpanded.delete(folderId);
      } else {
        newExpanded.add(folderId);
      }
      return { expandedFolders: newExpanded };
    });
  },

  setLoading: (loading) => set({ isLoading: loading }),

  createFile: (parentPath, name, type) => {
    const newFile: FileNode = {
      id: `file_${Date.now()}`,
      name,
      type,
      path: `${parentPath}/${name}`,
      language: type === 'file' ? getFileLanguage(name) : undefined,
      children: type === 'folder' ? [] : undefined,
      lastModified: Date.now(),
    };
    
    set((state) => ({
      fileTree: updateFileInTree(state.fileTree, parentPath, (folder) => ({
        ...folder,
        children: [...(folder.children || []), newFile],
      })),
    }));
  },

  deleteFile: (fileId) => {
    set((state) => ({
      fileTree: removeFileFromTree(state.fileTree, fileId),
      openFiles: state.openFiles.filter(f => f.id !== fileId),
      activeFileId: state.activeFileId === fileId
        ? (state.openFiles.find(f => f.id !== fileId)?.id || null)
        : state.activeFileId,
    }));
  },

  renameFile: (fileId, newName) => {
    set((state) => ({
      fileTree: updateFileInTree(state.fileTree, fileId, (file) => ({
        ...file,
        name: newName,
        path: file.path.replace(file.name, newName),
        language: file.type === 'file' ? getFileLanguage(newName) : file.language,
      })),
    }));
  },

  saveFile: (fileId) => {
    set((state) => ({
      fileTree: updateFileInTree(state.fileTree, fileId, (file) => ({
        ...file,
        isModified: false,
      })),
      openFiles: state.openFiles.map(f =>
        f.id === fileId ? { ...f, isModified: false } : f
      ),
    }));
  },

  getFileById: (id) => findFileById(get().fileTree, id),
  
  getFileByPath: (path) => findFileByPath(get().fileTree, path),
  
  getParentFolder: (fileId) => {
    const { fileTree } = get();
    for (const node of fileTree) {
      if (node.children?.some(child => child.id === fileId)) {
        return node;
      }
      if (node.children) {
        const found = findFileById(node.children, fileId);
        if (found) return node;
      }
    }
    return undefined;
  },
}));