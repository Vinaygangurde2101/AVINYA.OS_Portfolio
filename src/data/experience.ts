import { ExperienceItem } from '../types/experience';

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    company: 'r3sys (r3sys.com)',
    role: 'Java Developer Trainee',
    location: 'Remote',
    period: 'Jun 2025 – Jul 2025',
    year: 2025,
    type: 'Contract',
    description: 'Built production-grade Java web applications (Spring MVC, JSP, Servlets) spanning CRUD dashboards and data-driven portals following enterprise best practices.',
    responsibilities: [
      'Built 5+ Java web applications from scratch (Spring MVC, JSP, Servlets) spanning CRUD dashboards and data-driven portals, writing efficient, reusable, and scalable code aligned with production best practices.',
      'Optimized RESTful endpoints and normalized JDBC/MySQL schemas via SQL refactoring, reducing API response times and improving maintainability of existing modules.',
      'Debugged runtime and performance bottlenecks through server log analysis, eliminating critical failure paths across multiple deployments in a remote agile workflow.'
    ],
    technologies: ['Java', 'Spring MVC', 'JSP', 'Servlets', 'MySQL', 'JDBC', 'REST APIs', 'SQL'],
    achievements: [
      'Engineered and delivered 5+ Java web applications from scratch.',
      'Reduced RESTful API response latency through database schema normalization.'
    ]
  },
  {
    id: 'exp-2',
    company: 'E-Cell & E-Builders Club, RCPIT',
    role: 'Technical Team Head',
    location: 'Shirpur, Maharashtra',
    period: '2024 – Present',
    year: 2025,
    type: 'Lead',
    description: 'Leading technical operations for entrepreneurship events and building real-time web applications for college hackathons and workshops.',
    responsibilities: [
      'Led technical operations for entrepreneurship events at R. C. Patel Institute of Technology.',
      'Developed a real-time quiz application supporting 100+ concurrent users with zero latency.',
      'Organized web development workshops while mentoring 20+ students in software development.'
    ],
    technologies: ['Web Development', 'React', 'Node.js', 'WebSockets', 'Mentorship'],
    achievements: [
      'Built real-time quiz platform handling 100+ concurrent user sessions.',
      'Mentored 20+ junior engineering students in web technology.'
    ]
  }
];
