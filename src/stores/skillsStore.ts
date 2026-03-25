import { create } from 'zustand';
import { Skill, SkillCategory } from '../types/skill';

interface SkillsState {
  skills: Skill[];
  selectedCategory: SkillCategory;
  setSkills: (skills: Skill[]) => void;
  setCategory: (category: SkillCategory) => void;
}

export const useSkillsStore = create<SkillsState>()((set) => ({
  skills: [
    { id: 'search', name: '搜索', description: '搜索网络信息', icon: '🔍', category: 'info', enabled: true },
    { id: 'writing', name: '写作', description: '辅助写作、改写、摘要', icon: '✍️', category: 'content', enabled: true },
    { id: 'translate', name: '翻译', description: '多语言翻译', icon: '🌐', category: 'content', enabled: true },
    { id: 'code', name: '代码', description: '代码生成、解释、调试', icon: '💻', category: 'dev', enabled: true },
    { id: 'weather', name: '天气', description: '查询天气', icon: '☀️', category: 'info', enabled: true },
    { id: 'calendar', name: '日历', description: '查看和管理日程', icon: '📅', category: 'info', enabled: true },
    { id: 'reminder', name: '提醒', description: '创建定时提醒', icon: '⏰', category: 'tools', enabled: true },
    { id: 'news', name: '新闻', description: '每日新闻摘要', icon: '📰', category: 'info', enabled: true },
    { id: 'xiaohongshu', name: '小红书', description: '内容发布、舆情分析', icon: '📕', category: 'creative', enabled: true },
    { id: 'email', name: '邮件', description: '收发邮件', icon: '📧', category: 'tools', enabled: true },
  ],
  selectedCategory: 'all',
  setSkills: (skills) => set({ skills }),
  setCategory: (category) => set({ selectedCategory: category }),
}));
