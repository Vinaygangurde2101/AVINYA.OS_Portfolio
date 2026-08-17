export type ProficiencyLevel = 'Primary' | 'Strong' | 'Familiar';

export interface SkillItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Creative Coding & UI' | 'DevOps & Tools' | 'Architecture';
  level: ProficiencyLevel;
  icon?: string;
  yearsOfExp: number;
  highlight?: boolean;
}

export interface SkillCategoryGroup {
  category: string;
  description: string;
  skills: SkillItem[];
}
