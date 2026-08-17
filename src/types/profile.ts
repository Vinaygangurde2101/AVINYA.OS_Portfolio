export interface ProfileData {
  osName: string;
  name: string;
  title: string;
  role: string;
  location: string;
  status: string;
  avatar: string;
  bio: string[];
  philosophy: string;
  currently: {
    building: string;
    learning: string;
    exploring: string;
  };
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
    email: string;
    resumeUrl: string;
  };
  stats: {
    label: string;
    value: string;
  }[];
}
