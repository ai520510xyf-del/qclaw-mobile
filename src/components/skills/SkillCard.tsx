import { Skill } from '../../types/skill';
import { Card } from '../common/Card';

interface SkillCardProps {
  skill: Skill;
  onClick?: (skill: Skill) => void;
}

export function SkillCard({ skill, onClick }: SkillCardProps) {
  return (
    <Card onClick={() => onClick?.(skill)} className="flex flex-col items-center text-center">
      <div className="w-14 h-14 rounded-full bg-background-elevated flex items-center justify-center text-3xl mb-3">
        {skill.icon}
      </div>
      <h3 className="text-base font-medium text-text-primary mb-1">{skill.name}</h3>
      <p className="text-xs text-text-secondary line-clamp-2">{skill.description}</p>
    </Card>
  );
}
