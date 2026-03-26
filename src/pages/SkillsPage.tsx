import { useState } from 'react';

interface Skill {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
}

const BUILTIN_SKILLS: Skill[] = [
  { id: 'xiaohongshu', name: '小红书', icon: '📕', description: '发布小红书内容，支持图文和视频', category: '社交' },
  { id: 'weather', name: '天气', icon: '🌤️', description: '查询全国各地天气信息', category: '生活' },
  { id: 'calendar', name: '日历', icon: '📅', description: '管理日程、创建会议提醒', category: '效率' },
  { id: 'news', name: '新闻', icon: '📰', description: '获取最新资讯和热点新闻', category: '信息' },
  { id: 'search', name: '搜索', icon: '🔍', description: '全网搜索，精准获取信息', category: '工具' },
  { id: 'translate', name: '翻译', icon: '🌐', description: '多语言实时翻译', category: '工具' },
  { id: 'code', name: '代码', icon: '💻', description: '代码编写、调试和优化', category: '开发' },
  { id: 'writing', name: '写作', icon: '✍️', description: '文章撰写、内容创作辅助', category: '创作' },
  { id: 'image', name: '图片', icon: '🖼️', description: '图片生成和处理', category: '创作' },
  { id: 'voice', name: '语音', icon: '🎙️', description: '语音合成和转写', category: '工具' },
  { id: 'memory', name: '记忆', icon: '🧠', description: '管理长期记忆和上下文', category: '效率' },
  { id: 'file', name: '文件', icon: '📁', description: '文件管理和云端同步', category: '工具' },
];

const CATEGORIES = ['全部', '社交', '生活', '效率', '信息', '工具', '开发', '创作'];

export default function SkillsPage() {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const filteredSkills = selectedCategory === '全部'
    ? BUILTIN_SKILLS
    : BUILTIN_SKILLS.filter((s) => s.category === selectedCategory);

  return (
    <div className="flex flex-col h-full" style={{ background: '#0A0A14' }}>
      {/* Header */}
      <div className="px-4 py-3" style={{ background: '#12121E', borderBottom: '1px solid #1E1E30' }}>
        <h1 className="font-semibold" style={{ color: '#FFFFFF' }}>技能中心</h1>
        <p className="text-xs" style={{ color: '#8888AA' }}>QClaw 的能力扩展</p>
      </div>

      {/* Categories */}
      <div className="px-4 py-3 overflow-x-auto" style={{ background: '#12121E' }}>
        <div className="flex gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all"
              style={{
                background: selectedCategory === cat
                  ? 'linear-gradient(135deg, #667EEA, #764BA2)'
                  : '#1E1E30',
                color: selectedCategory === cat ? '#FFFFFF' : '#8888AA',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredSkills.map((skill) => (
            <button
              key={skill.id}
              onClick={() => setSelectedSkill(skill)}
              className="p-4 rounded-xl text-left transition-all hover:scale-[1.02]"
              style={{ background: '#12121E', border: '1px solid #1E1E30' }}
            >
              <span className="text-3xl mb-2 block">{skill.icon}</span>
              <h3 className="font-medium mb-1" style={{ color: '#FFFFFF' }}>{skill.name}</h3>
              <p className="text-xs line-clamp-2" style={{ color: '#8888AA' }}>{skill.description}</p>
              <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs" style={{ background: '#1E1E30', color: '#8888AA' }}>
                {skill.category}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div
          className="fixed inset-0 flex items-end justify-center z-50"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          onClick={() => setSelectedSkill(null)}
        >
          <div
            className="w-full max-w-lg rounded-t-3xl p-6"
            style={{ background: '#12121E' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 mx-auto mb-4 rounded-full" style={{ background: '#1E1E30' }} />
            <div className="text-center mb-6">
              <span className="text-5xl mb-3 block">{selectedSkill.icon}</span>
              <h2 className="text-xl font-bold" style={{ color: '#FFFFFF' }}>{selectedSkill.name}</h2>
              <span className="inline-block mt-2 px-3 py-1 rounded-full text-sm" style={{ background: '#1E1E30', color: '#8888AA' }}>
                {selectedSkill.category}
              </span>
            </div>
            <p className="mb-6" style={{ color: '#8888AA' }}>{selectedSkill.description}</p>
            <div className="space-y-3">
              <button
                className="w-full py-3 rounded-xl font-medium text-white"
                style={{ background: 'linear-gradient(135deg, #667EEA, #764BA2)' }}
                onClick={() => {
                  setSelectedSkill(null);
                }}
              >
                在聊天中使用
              </button>
              <button
                className="w-full py-3 rounded-xl"
                style={{ background: '#1E1E30', color: '#8888AA' }}
                onClick={() => setSelectedSkill(null)}
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
