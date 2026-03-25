export interface Skill {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: SkillCategory;
  enabled: boolean;
}

export type SkillCategory = 
  | 'all'
  | 'info'
  | 'content'
  | 'dev'
  | 'file'
  | 'tools'
  | 'creative';
