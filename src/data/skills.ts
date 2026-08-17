import { SkillCategoryGroup } from '../types/skill';

export const skillsData: SkillCategoryGroup[] = [
  {
    category: 'Programming Languages',
    description: 'Core object-oriented and functional programming languages for enterprise backends, AI scripts, and web systems.',
    skills: [
      { name: 'Java', category: 'Backend', level: 'Primary', yearsOfExp: 3, highlight: true },
      { name: 'Python', category: 'Architecture', level: 'Primary', yearsOfExp: 3, highlight: true },
      { name: 'JavaScript (ES6+)', category: 'Frontend', level: 'Primary', yearsOfExp: 3, highlight: true },
      { name: 'TypeScript', category: 'Frontend', level: 'Primary', yearsOfExp: 3, highlight: true }
    ]
  },
  {
    category: 'Backend & Microservices',
    description: 'Architecting scalable server-side systems, Spring Boot microservices, and Node.js REST APIs.',
    skills: [
      { name: 'Spring Boot', category: 'Backend', level: 'Primary', yearsOfExp: 2, highlight: true },
      { name: 'Spring MVC & Spring Security', category: 'Backend', level: 'Primary', yearsOfExp: 2, highlight: true },
      { name: 'JSP & Servlets', category: 'Backend', level: 'Primary', yearsOfExp: 2, highlight: true },
      { name: 'Node.js & Express', category: 'Backend', level: 'Primary', yearsOfExp: 3, highlight: true },
      { name: 'REST APIs & Microservices', category: 'Backend', level: 'Primary', yearsOfExp: 3, highlight: true },
      { name: 'Flask (Python)', category: 'Backend', level: 'Strong', yearsOfExp: 2, highlight: false },
      { name: 'Hibernate / JPA', category: 'Backend', level: 'Primary', yearsOfExp: 2, highlight: false }
    ]
  },
  {
    category: 'Frontend Engineering',
    description: 'Building responsive, modern web applications with React, Redux, Tailwind CSS, and Angular.',
    skills: [
      { name: 'React', category: 'Frontend', level: 'Primary', yearsOfExp: 3, highlight: true },
      { name: 'Redux', category: 'Frontend', level: 'Primary', yearsOfExp: 2, highlight: true },
      { name: 'Tailwind CSS', category: 'Frontend', level: 'Primary', yearsOfExp: 3, highlight: true },
      { name: 'HTML5 & CSS3', category: 'Frontend', level: 'Primary', yearsOfExp: 3, highlight: false },
      { name: 'Angular', category: 'Frontend', level: 'Familiar', yearsOfExp: 1, highlight: false }
    ]
  },
  {
    category: 'AI / ML & Computer Vision',
    description: 'Integrating Hugging Face transformers, Perspective API content moderation, OCR, and MediaPipe ML pipelines.',
    skills: [
      { name: 'Hugging Face AI', category: 'Architecture', level: 'Primary', yearsOfExp: 2, highlight: true },
      { name: 'Perspective API (Toxicity AI)', category: 'Architecture', level: 'Primary', yearsOfExp: 2, highlight: true },
      { name: 'OCR (Tesseract) & NLP Pipelines', category: 'Architecture', level: 'Strong', yearsOfExp: 2, highlight: true },
      { name: 'MediaPipe ML Pose Landmarks', category: 'Creative Coding & UI', level: 'Strong', yearsOfExp: 2, highlight: true },
      { name: 'WebGL 3D Mesh Engine', category: 'Creative Coding & UI', level: 'Strong', yearsOfExp: 2, highlight: false },
      { name: 'WebRTC & Socket.IO Streaming', category: 'Architecture', level: 'Strong', yearsOfExp: 2, highlight: false }
    ]
  },
  {
    category: 'Databases & Storage',
    description: 'Designing normalized SQL schemas and high-performance NoSQL document stores.',
    skills: [
      { name: 'MySQL', category: 'Backend', level: 'Primary', yearsOfExp: 3, highlight: true },
      { name: 'MongoDB (NoSQL)', category: 'Backend', level: 'Primary', yearsOfExp: 2, highlight: true },
      { name: 'JDBC & SQL Refactoring', category: 'Backend', level: 'Primary', yearsOfExp: 2, highlight: false }
    ]
  },
  {
    category: 'Auth & Security',
    description: 'Implementing token authentication, fine-grained RBAC controls, and session management.',
    skills: [
      { name: 'JWT Authentication', category: 'Backend', level: 'Primary', yearsOfExp: 3, highlight: true },
      { name: 'Role-Based Access Control (RBAC)', category: 'Backend', level: 'Primary', yearsOfExp: 3, highlight: true },
      { name: 'Session Management', category: 'Backend', level: 'Primary', yearsOfExp: 2, highlight: false }
    ]
  },
  {
    category: 'Tools, DevOps & Testing',
    description: 'Containerizing applications, documenting REST endpoints, and automating build pipelines.',
    skills: [
      { name: 'Git & GitHub', category: 'DevOps & Tools', level: 'Primary', yearsOfExp: 3, highlight: true },
      { name: 'Docker Containerization', category: 'DevOps & Tools', level: 'Strong', yearsOfExp: 2, highlight: true },
      { name: 'Maven Build Automation', category: 'DevOps & Tools', level: 'Primary', yearsOfExp: 2, highlight: true },
      { name: 'Swagger / OpenAPI Docs', category: 'DevOps & Tools', level: 'Primary', yearsOfExp: 2, highlight: false },
      { name: 'JUnit & Mockito Testing', category: 'DevOps & Tools', level: 'Primary', yearsOfExp: 2, highlight: false },
      { name: 'Apache Tomcat, VS Code, XAMPP', category: 'DevOps & Tools', level: 'Primary', yearsOfExp: 3, highlight: false }
    ]
  }
];
