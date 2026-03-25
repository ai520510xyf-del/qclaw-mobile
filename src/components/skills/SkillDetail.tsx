import { Skill } from '../../types/skill';
import { Button } from '../common/Button';

interface SkillDetailProps {
  skill: Skill;
  onClose: () => void;
  onUse?: (skill: Skill) => void;
}

export function SkillDetail({ skill, onClose, onUse }: SkillDetailProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-background-card rounded-t-card p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-background-elevated flex items-center justify-center text-2xl">
              {skill.icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">{skill.name}</h2>
              <p className="text-sm text-text-secondary capitalize">{skill.category}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-background-elevated flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
          >
            ×
          </button>
        </div>
        
        <p className="text-text-secondary mb-6">{skill.description}</p>
        
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            关闭
          </Button>
          {onUse && (
            <Button variant="primary" className="flex-1" onClick={() => onUse(skill)}>
              使用
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
