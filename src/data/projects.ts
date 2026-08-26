import { ProjectItem } from '../types/project';

export const projectsData: ProjectItem[] = [
  {
    id: 'socialbuddy-ai',
    title: 'SocialBuddy — AI-Powered Social Media Platform',
    slug: 'socialbuddy-ai',
    category: 'Full-Stack',
    year: '2025',
    shortDescription: 'Full-stack MERN social media platform with JWT auth, core social feeds, and AI-powered content moderation using Hugging Face & Perspective API.',
    description: 'Developed a full-stack MERN social media platform with secure JWT authentication and a responsive UI. Implemented core social features including posts, comments, likes, follow/unfollow, user profiles, and personalized feeds. Integrated AI-powered content moderation using Hugging Face and Perspective API, and built secure REST APIs, role-based access control, and an admin dashboard for user and content management.',
    problem: 'Social media platforms struggle with real-time toxic content filtering and manual moderation overhead.',
    approach: 'Integrated Hugging Face sentiment/toxicity models and Google Perspective API into Express.js REST middleware to automatically analyze and flag toxic comments before database insertion.',
    solution: 'Automated real-time toxic content moderation, implemented RBAC admin management, and provided custom personalized user feeds.',
    image: '/images/projects/socialbuddy.jpg',
    gallery: [
      '/images/projects/socialbuddy.jpg'
    ],
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JWT', 'Hugging Face AI', 'Perspective API', 'Tailwind CSS', 'Redux', 'REST APIs'],
    role: ['Full-Stack Developer', 'AI Integration Lead'],
    outcome: 'Delivered an automated AI-moderated social platform with full MERN stack architecture and RBAC admin controls.',
    githubUrl: 'https://github.com/Vinaygangurde2101/socialbuddy',
    featured: true,
    metrics: [
      { label: 'AI Moderation', value: 'Hugging Face & Perspective' },
      { label: 'Authentication', value: 'JWT & RBAC' },
      { label: 'Stack', value: 'MERN Full-Stack' }
    ]
  },
  {
    id: 'mers-healthcare',
    title: 'Medical Emergency Response System (MERS)',
    slug: 'mers-healthcare',
    category: 'Full-Stack',
    year: '2025',
    shortDescription: 'Role-based healthcare management system with Spring Security RBAC, AI OCR/NLP diagnostic report triage, and Docker containerization.',
    description: 'Built a role-based healthcare management system (Admin, Doctor, Patient, Ambulance) from scratch, implementing Spring Security RBAC authentication and RESTful/microservice-style APIs for emergency requests, appointments, and ambulance allocation. Developed an AI/ML-powered diagnostic report analysis module in Python using OCR (Tesseract) and NLP techniques to automatically extract patient vitals from scanned medical reports and flag critical cases for faster triage. Integrated MySQL via Hibernate/JPA and containerized with Docker.',
    problem: 'Healthcare emergency response platforms lacked real-time dispatch tracking and automated triage processing for scanned patient diagnostic reports.',
    approach: 'Developed an AI/ML-powered diagnostic report analysis module in Python using OCR (Tesseract) and NLP techniques to automatically extract patient vitals from scanned medical reports and flag critical cases for faster triage. Integrated MySQL via Hibernate/JPA and containerized with Docker.',
    solution: 'Automated patient vital extraction from scanned diagnostic reports, reduced emergency triage response times, and authored JUnit & Mockito test suites for critical emergency modules.',
    image: '/images/projects/mers.jpg',
    gallery: [
      '/images/projects/mers.jpg'
    ],
    technologies: ['Java', 'Spring Boot', 'Spring Security', 'Hibernate/JPA', 'MySQL', 'Python', 'OCR (Tesseract)', 'NLP', 'Docker', 'REST APIs', 'Swagger', 'JUnit', 'Mockito', 'Maven'],
    role: ['Full-Stack Java Engineer', 'AI/ML Module Developer', 'System Architect'],
    outcome: 'Delivered an end-to-end automated healthcare triage and emergency dispatch portal containerized with Docker.',
    githubUrl: 'https://github.com/Vinaygangurde2101/medical-emergency-response-system',
    featured: true,
    metrics: [
      { label: 'System Roles', value: '4 (Admin/Doctor/Patient/Ambulance)' },
      { label: 'Triage Processing', value: 'Automated AI OCR/NLP' },
      { label: 'Test Coverage', value: 'JUnit & Mockito Verified' }
    ]
  },
  {
    id: 'webon-ar-shopping',
    title: 'WebOn — AR Live Shopping Platform',
    slug: 'webon-ar-shopping',
    category: 'AI / Machine Learning',
    year: '2025',
    shortDescription: 'Real-time AI virtual try-on during live seller video calls using MediaPipe 33 body landmark pose estimation and WebGL 3D garment engine.',
    description: 'Built a real-time, AI-powered e-commerce platform for virtual try-on during live seller video calls, featuring a WebGL 3D garment engine that renders a dynamic body mesh from 33 MediaPipe Pose landmarks with per-vertex curvature shading and dual-pass arm occlusion. Implemented Socket.IO session management and WebRTC peer-to-peer video streaming.',
    problem: 'E-commerce live video streams lacked interactive virtual try-ons, making customers hesitant when buying garments during live streams.',
    approach: 'Combined MediaPipe pose landmark extraction with custom WebGL 3D shaders, Socket.IO state synchronization, and WebRTC peer-to-peer video streaming.',
    solution: 'Achieved real-time 3D garment tracking over live seller video feeds with low latency WebRTC video streaming.',
    image: '/images/projects/webon.jpg',
    gallery: [
      '/images/projects/webon.jpg'
    ],
    technologies: ['Node.js', 'WebGL', 'MediaPipe (ML Pose Estimation)', 'WebRTC', 'Socket.IO', 'Express', 'JavaScript (ES6+)'],
    role: ['AI / WebGL Developer', 'Full-Stack Engineer'],
    outcome: 'Rendered 3D virtual try-ons with 33 body landmarks driving WebGL vertex shaders in live WebRTC video streams.',
    githubUrl: 'https://github.com/Vinaygangurde2101/webon-ar-shopping',
    featured: true,
    metrics: [
      { label: 'Body Landmarks', value: '33 Key Points' },
      { label: 'Video Streaming', value: 'Low-latency WebRTC' },
      { label: '3D Graphics', value: 'WebGL Shader Engine' }
    ]
  },
  {
    id: 'agriconnect-system',
    title: 'AgriConnect — Agricultural Services Management System',
    slug: 'agriconnect-system',
    category: 'Full-Stack',
    year: '2024',
    shortDescription: 'Multi-role agricultural service platform for Farmers, Service Providers, and Admins with 15+ REST APIs and Spring Security RBAC.',
    description: 'Built a multi-role agricultural platform (Farmers, Service Providers, Admins) from scratch with 15+ REST APIs, Spring Security + RBAC, complete CRUD operations, and responsive JSP dashboards.',
    problem: 'Farmers faced difficulties finding verified agricultural service providers and equipment rental scheduling in local regions.',
    approach: 'Designed normalized MySQL schemas, developed 15+ RESTful APIs with Spring Security role authentication, and built responsive JSP user dashboards.',
    solution: 'Streamlined agricultural service requests, booking management, and provider verification into a unified web portal.',
    image: '/images/projects/agriconnect.jpg',
    gallery: [
      '/images/projects/agriconnect.jpg'
    ],
    technologies: ['Java', 'Spring Boot', 'Hibernate', 'MySQL', 'JSP', 'REST APIs', 'Spring Security'],
    role: ['Backend & Full-Stack Java Developer'],
    outcome: 'Centralized agricultural equipment rental and service management with 15+ secure REST APIs.',
    githubUrl: 'https://github.com/Vinaygangurde2101/agriconnect',
    featured: true,
    metrics: [
      { label: 'REST APIs', value: '15+ Endpoints' },
      { label: 'Roles Supported', value: 'Farmers, Providers, Admins' },
      { label: 'Security', value: 'Spring Security RBAC' }
    ]
  },
  {
    id: 'avinya-os-portfolio',
    title: 'AVINYA.OS — Cyberpunk Desktop Web Operating System',
    slug: 'avinya-os-portfolio',
    category: 'Creative Tech',
    year: '2025',
    shortDescription: 'Cyberpunk desktop operating system portfolio built with React 18, TypeScript, Tailwind CSS, Zustand window manager, AI chatbot, and interactive CLI shell.',
    description: 'Designed and built AVINYA.OS — an immersive interactive web desktop portfolio mimicking a high-tech Cyberpunk operating system. Features multi-window management (Zustand), interactive terminal CLI with AI query capabilities, grounded portfolio assistant (Gemini & local KB), virtual browser app, ATS resume viewer, arcade mini-games, system metrics node graph, and full responsive design.',
    problem: 'Standard static developer portfolios fail to engage recruiters and showcase complex full-stack frontend architecture.',
    approach: 'Engineered a modular window state manager using Zustand, custom CSS glassmorphism UI system, interactive CLI parser with command history and auto-complete, and integrated generative AI capabilities.',
    solution: 'Delivered an interactive operating system web app that increases recruiter dwell time and wows visitors with interactive project explorations.',
    image: '/images/projects/avinya-os.jpg',
    gallery: [
      '/images/projects/avinya-os.jpg'
    ],
    technologies: ['React 18', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Framer Motion', 'Vite', 'Lucide Icons', 'Generative AI'],
    role: ['Creator', 'UI/UX Designer', 'Lead Frontend Engineer'],
    outcome: 'Architected a desktop web application with window management, AI integration, and interactive terminal CLI.',
    githubUrl: 'https://github.com/Vinaygangurde2101/AVINYA.OS_Portfolio',
    featured: true,
    metrics: [
      { label: 'Architecture', value: 'React + Zustand + Vite' },
      { label: 'UI Theme', value: 'Cyberpunk Glassmorphism' },
      { label: 'Interactivity', value: 'Multi-Window & CLI Shell' }
    ]
  }
];
