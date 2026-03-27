import { useState } from 'react';
import { useFileTreeStore, FileNode } from '../stores/fileTreeStore';

export default function StudioPage() {
  const { fileTree, selectedFile, selectFile, openFile, openFiles, activeFileId, setActiveFile, updateFileContent, toggleFolder, expandedFolders, createFile } = useFileTreeStore();
  const [code, setCode] = useState(selectedFile?.content || '');

  const handleFileClick = (file: FileNode) => {
    if (file.type === 'folder') {
      toggleFolder(file.id);
    } else {
      selectFile(file);
      openFile(file);
      setCode(file.content || '');
    }
  };

  const handleCodeChange = (value: string) => {
    setCode(value);
    if (activeFileId) {
      updateFileContent(activeFileId, value);
    }
  };

  const activeFile = openFiles.find(f => f.id === activeFileId);

  const renderFileTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node) => (
      <div key={node.id}>
        <div
          onClick={() => handleFileClick(node)}
          className="px-3 py-1.5 text-sm cursor-pointer hover:bg-white/5 flex items-center"
          style={{
            paddingLeft: `${12 + depth * 12}px`,
            background: selectedFile?.id === node.id ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
            color: selectedFile?.id === node.id ? '#667EEA' : '#FFFFFF',
          }}
        >
          <span className="mr-2">{node.type === 'folder' ? (expandedFolders.has(node.id) ? '📂' : '📁') : '📄'}</span>
          {node.name}
        </div>
        {node.type === 'folder' && node.children && expandedFolders.has(node.id) && (
          <div>{renderFileTree(node.children, depth + 1)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#0A0A14' }}>
      {/* Tab Bar */}
      <div className="flex items-center px-2 overflow-x-auto" style={{ background: '#12121E', borderBottom: '1px solid #1E1E30' }}>
        {openFiles.map((file) => (
          <div
            key={file.id}
            onClick={() => setActiveFile(file.id)}
            className="flex items-center px-3 py-2 text-sm cursor-pointer"
            style={{
              background: activeFileId === file.id ? '#0A0A14' : 'transparent',
              color: activeFileId === file.id ? '#FFFFFF' : '#8888AA',
              borderRight: '1px solid #1E1E30',
            }}
          >
            <span>{file.name}</span>
            {file.isModified && <span className="ml-1 text-xs" style={{ color: '#F59E0B' }}>●</span>}
          </div>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* File Tree */}
        <div className="w-48 overflow-y-auto" style={{ background: '#12121E', borderRight: '1px solid #1E1E30' }}>
          <div className="p-2 flex items-center justify-between" style={{ borderBottom: '1px solid #1E1E30' }}>
            <span className="text-xs font-medium" style={{ color: '#8888AA' }}>文件</span>
            <button
              onClick={() => createFile('', 'new-file.ts', 'file')}
              className="text-xs px-1.5 py-0.5 rounded"
              style={{ background: '#1E1E30', color: '#667EEA' }}
            >
              +
            </button>
          </div>
          <div className="py-1">
            {renderFileTree(fileTree)}
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 flex flex-col">
          {activeFile ? (
            <>
              <div className="px-3 py-2 text-xs" style={{ background: '#12121E', color: '#8888AA' }}>
                {activeFile.path}
              </div>
              <textarea
                value={code}
                onChange={(e) => handleCodeChange(e.target.value)}
                className="flex-1 p-4 font-mono text-sm resize-none outline-none"
                style={{
                  background: '#0A0A14',
                  color: '#FFFFFF',
                  border: 'none',
                }}
                spellCheck={false}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center" style={{ color: '#8888AA' }}>
              <div className="text-center">
                <span className="text-5xl mb-4 block">💻</span>
                <p>选择一个文件开始编辑</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
