export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: 'Full-Stack' | 'AI / Machine Learning' | 'Creative Tech' | 'Mobile & Web';
  year: string;
  shortDescription: string;
  description: string;
  problem: string;
  approach: string;
  solution: string;
  image: string;
  gallery?: string[];
  technologies: string[];
  role: string[];
  outcome: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  metrics?: { label: string; value: string }[];
}
