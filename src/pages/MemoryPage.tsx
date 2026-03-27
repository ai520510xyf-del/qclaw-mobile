import { useState } from 'react';
import { useMemoryStore } from '../stores/memoryStore';

export default function MemoryPage() {
  const { longTermMemory, dailyMemories, searchQuery, setSearchQuery, selectedDate, setSelectedDate, getFilteredMemories } = useMemoryStore();
  const [showEditor, setShowEditor] = useState(false);
  const [editContent, setEditContent] = useState('');

  const filteredEntries = getFilteredMemories();

  const handleEdit = (content: string) => {
    setEditContent(content);
    setShowEditor(true);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#0A0A14' }}>
      {/* Header */}
      <div className="px-4 py-3" style={{ background: '#12121E', borderBottom: '1px solid #1E1E30' }}>
        <h1 className="font-semibold" style={{ color: '#FFFFFF' }}>记忆管理</h1>
        <p className="text-xs" style={{ color: '#8888AA' }}>管理 AI 的长期记忆和每日笔记</p>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索记忆..."
            className="w-full px-4 py-3 pl-10 rounded-xl outline-none"
            style={{ background: '#12121E', color: '#FFFFFF', border: '1px solid #1E1E30' }}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2">🔍</span>
        </div>
      </div>

      {/* Long Term Memory */}
      <div className="px-4 mb-4">
        <h2 className="text-sm font-medium mb-2" style={{ color: '#FFFFFF' }}>长期记忆</h2>
        <div className="p-4 rounded-xl" style={{ background: '#12121E', border: '1px solid #1E1E30' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs" style={{ color: '#8888AA' }}>MEMORY.md</span>
            <button
              onClick={() => handleEdit(longTermMemory.entries.map(e => e.content).join('\n\n'))}
              className="text-xs px-2 py-1 rounded"
              style={{ background: '#1E1E30', color: '#667EEA' }}
            >
              编辑
            </button>
          </div>
          <p className="text-sm line-clamp-3" style={{ color: '#FFFFFF' }}>
            {longTermMemory.entries.length > 0
              ? longTermMemory.entries[0].content.slice(0, 200) + '...'
              : '暂无长期记忆'}
          </p>
          <p className="text-xs mt-2" style={{ color: '#8888AA' }}>
            {longTermMemory.entries.length} 条记录
          </p>
        </div>
      </div>

      {/* Daily Notes */}
      <div className="flex-1 overflow-y-auto px-4">
        <h2 className="text-sm font-medium mb-2" style={{ color: '#FFFFFF' }}>每日笔记</h2>
        <div className="space-y-2">
          {dailyMemories.map((note) => (
            <div
              key={note.date}
              className="p-4 rounded-xl cursor-pointer hover:opacity-90"
              style={{ background: '#12121E', border: '1px solid #1E1E30' }}
              onClick={() => handleEdit(note.content)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: '#667EEA' }}>{note.date}</span>
                <span className="text-xs" style={{ color: '#8888AA' }}>{note.entries.length} 条</span>
              </div>
              <p className="text-sm line-clamp-2" style={{ color: '#FFFFFF' }}>
                {note.content.slice(0, 100)}...
              </p>
            </div>
          ))}
          {dailyMemories.length === 0 && (
            <div className="p-4 text-center" style={{ color: '#8888AA' }}>
              <span className="text-3xl mb-2 block">📝</span>
              <p className="text-sm">暂无每日笔记</p>
            </div>
          )}
        </div>
      </div>

      {/* Editor Modal */}
      {showEditor && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ background: 'rgba(0,0,0,0.8)' }}
          onClick={() => setShowEditor(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl p-4"
            style={{ background: '#12121E' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ color: '#FFFFFF' }}>编辑记忆</h3>
              <button onClick={() => setShowEditor(false)} style={{ color: '#8888AA' }}>✕</button>
            </div>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full h-64 p-3 rounded-xl font-mono text-sm resize-none outline-none"
              style={{ background: '#0A0A14', color: '#FFFFFF', border: '1px solid #1E1E30' }}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowEditor(false)}
                className="flex-1 py-3 rounded-xl"
                style={{ background: '#1E1E30', color: '#8888AA' }}
              >
                取消
              </button>
              <button
                onClick={() => setShowEditor(false)}
                className="flex-1 py-3 rounded-xl font-medium text-white"
                style={{ background: 'linear-gradient(135deg, #667EEA, #764BA2)' }}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
