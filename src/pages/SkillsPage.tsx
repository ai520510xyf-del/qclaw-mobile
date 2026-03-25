import { useState } from 'react';
import { useSkillsStore } from '../stores/skillsStore';
import { Skill, SkillCategory } from '../types/skill';
import { PageHeader } from '../components/layout/PageHeader';
import { SkillCard } from '../components/skills/SkillCard';
import { SkillDetail } from '../components/skills/SkillDetail';
import { Chip } from '../components/common/Chip';
import { EmptyState } from '../components/common/EmptyState';

const categories: { key: SkillCategory; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'info', label: '信息获取' },
  { key: 'content', label: '内容创作' },
  { key: 'dev', label: '开发工具' },
  { key: 'file', label: '文件管理' },
  { key: 'tools', label: '效率工具' },
  { key: 'creative', label: '创意工具' },
];

export function SkillsPage() {
  const { skills, selectedCategory, setCategory } = useSkillsStore();
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const filteredSkills = selectedCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === selectedCategory);

  return (
    <div className="flex flex-col h-full bg-background-dark">
      <PageHeader title="技能中心" subtitle="发现和使用 AI 技能" />
      
      <div className="px-4 py-3 overflow-x-auto no-scrollbar">
        <div className="flex gap-2">
          {categories.map((cat) => (
            <Chip
              key={cat.key}
              label={cat.label}
              selected={selectedCategory === cat.key}
              onClick={() => setCategory(cat.key)}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-24 no-scrollbar">
        {filteredSkills.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onClick={setSelectedSkill}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="📋"
            title="暂无技能"
            description="该分类下没有可用技能"
          />
        )}
      </div>

      {selectedSkill && (
        <SkillDetail
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
          onUse={(skill) => {
            // Navigate to chat with skill context
            setSelectedSkill(null);
          }}
        />
      )}
    </div>
  );
}
