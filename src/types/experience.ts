export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  year: number;
  type: 'Full-time' | 'Contract' | 'Lead';
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
}
