export interface AchievementItem {
  id: string;
  title: string;
  category: 'Award' | 'Hackathon' | 'Open Source' | 'Certification' | 'Milestone';
  organization: string;
  year: string;
  description: string;
  badgeIcon: string;
  link?: string;
  highlight?: boolean;
}
