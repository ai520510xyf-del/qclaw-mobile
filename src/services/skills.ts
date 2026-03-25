import { Skill } from '../types/skill';
import { api } from './api';

export const skillsService = {
  async getSkills(): Promise<Skill[]> {
    try {
      const response = await api.get('/api/skills');
      return response.data.skills || [];
    } catch (error) {
      return [];
    }
  },

  async getSkillDetail(id: string): Promise<Skill | null> {
    try {
      const response = await api.get(`/api/skills/${id}`);
      return response.data.skill;
    } catch (error) {
      return null;
    }
  },
};
