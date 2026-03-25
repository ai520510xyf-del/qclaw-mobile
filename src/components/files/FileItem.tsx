import { FileItem as FileItemType } from '../../types/file';
import { formatDate, formatFileSize } from '../../utils/date';
import { clsx } from 'clsx';

interface FileItemProps {
  file: FileItemType;
  onClick?: (file: FileItemType) => void;
  onDelete?: (id: string) => void;
}

const getFileIcon = (mimeType?: string, type?: string) => {
  if (type === 'folder') return '📁';
  if (!mimeType) return '📄';
  
  if (mimeType.startsWith('image/')) return '🖼️';
  if (mimeType.startsWith('video/')) return '🎬';
  if (mimeType.startsWith('audio/')) return '🎵';
  if (mimeType.includes('pdf')) return '📕';
  if (mimeType.includes('word') || mimeType.includes('document')) return '📝';
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return '📊';
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return '📽️';
  if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('tar')) return '📦';
  
  return '📄';
};

export function FileItem({ file, onClick, onDelete }: FileItemProps) {
  return (
    <div
      onClick={() => onClick?.(file)}
      className={clsx(
        'flex items-center gap-3 p-3 rounded-card cursor-pointer',
        'hover:bg-background-elevated transition-colors duration-200',
        'group'
      )}
    >
      <div className="w-12 h-12 rounded-lg bg-background-elevated flex items-center justify-center text-2xl">
        {getFileIcon(file.mimeType, file.type)}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-text-primary truncate">{file.name}</h4>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-text-muted">
            {formatDate.relative(file.updatedAt)}
          </span>
          {file.size && (
            <>
              <span className="text-text-muted">·</span>
              <span className="text-xs text-text-muted">{formatFileSize(file.size)}</span>
            </>
          )}
        </div>
      </div>
      
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(file.id);
          }}
          className="w-8 h-8 rounded-full bg-background-elevated flex items-center justify-center text-text-muted hover:text-error transition-colors opacity-0 group-hover:opacity-100"
        >
          🗑️
        </button>
      )}
    </div>
  );
}
