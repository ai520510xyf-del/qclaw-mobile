import { useState } from 'react';
import { useFilesStore } from '../stores/filesStore';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/common/Button';
import { FileItem } from '../components/files/FileItem';
import { EmptyState } from '../components/common/EmptyState';
import { FileItem as FileItemType } from '../types/file';
import { generateId } from '../utils/validation';

export function FilesPage() {
  const { files, uploads, setFiles, addUpload, updateUpload, removeUpload } = useFilesStore();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '*/*';
    input.onchange = async (e) => {
      const selectedFiles = (e.target as HTMLInputElement).files;
      if (!selectedFiles) return;

      setIsUploading(true);
      
      for (const file of Array.from(selectedFiles)) {
        const uploadId = generateId();
        addUpload({
          id: uploadId,
          fileName: file.name,
          progress: 0,
          status: 'uploading',
        });

        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 20) {
          await new Promise((resolve) => setTimeout(resolve, 200));
          updateUpload(uploadId, progress);
        }

        updateUpload(uploadId, 100, 'completed');
        
        // Add file to list
        const newFile: FileItemType = {
          id: generateId(),
          name: file.name,
          type: 'file',
          size: file.size,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        setFiles([newFile, ...files]);

        // Remove upload after delay
        setTimeout(() => removeUpload(uploadId), 1000);
      }

      setIsUploading(false);
    };
    input.click();
  };

  const handleDelete = (id: string) => {
    setFiles(files.filter((f) => f.id !== id));
  };

  const handleFileClick = (file: FileItemType) => {
    if (file.type === 'folder') {
      // Navigate to folder (simplified for demo)
      alert(`打开文件夹: ${file.name}`);
    } else {
      // Download or preview file
      alert(`打开文件: ${file.name}`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background-dark">
      <PageHeader
        title="文件管理"
        subtitle={`${files.length} 个文件`}
        right={
          <Button size="sm" onClick={handleFileSelect} disabled={isUploading}>
            {isUploading ? '上传中...' : '上传'}
          </Button>
        }
      />

      {/* Upload Progress */}
      {uploads.length > 0 && (
        <div className="px-4 py-2 space-y-2">
          {uploads.map((upload) => (
            <div key={upload.id} className="bg-background-card rounded-card p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-primary truncate flex-1 mr-2">
                  {upload.fileName}
                </span>
                <span className="text-xs text-text-muted">{upload.progress}%</span>
              </div>
              <div className="h-1 bg-background-elevated rounded-full overflow-hidden">
                <div
                  className="h-full gradient-bg transition-all duration-200"
                  style={{ width: `${upload.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* File List */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 no-scrollbar">
        {files.length > 0 ? (
          <div className="space-y-1">
            {files.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                onClick={handleFileClick}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="📁"
            title="暂无文件"
            description="点击上方「上传」按钮添加文件"
          />
        )}
      </div>
    </div>
  );
}
