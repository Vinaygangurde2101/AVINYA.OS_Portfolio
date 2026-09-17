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
      '/images/projects/socialbuddy.jpg',
      '/images/projects/socialbuddy-arch.jpg'
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
    githubUrl: 'https://github.com/Vinaygangurde2101/Medical_Emergency_Response_System',
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
    githubUrl: 'https://github.com/rohannn3215/Avinya---AR-Fashion-Marketplace',
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
    image: '/images/wp.png',
    gallery: [
      '/images/wp.png'
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
  },
  {
    id: 'foodies',
    title: 'Foodies — Interactive Food Discovery & Delivery Platform',
    slug: 'foodies',
    category: 'Full-Stack',
    year: '2025',
    shortDescription: 'Full-stack food ordering and recipe discovery app built with MERN stack, Redux state management, live cart tracking, and JWT authentication.',
    description: 'Developed Foodies, an end-to-end MERN stack web application featuring secure JWT authentication, real-time food catalog search, interactive cart management, dynamic recipe recommendation engine, and seamless checkout flow.',
    problem: 'Traditional food ordering applications lack interactive recipe discovery and real-time cart state synchronization across sessions.',
    approach: 'Built responsive React frontend components with Redux Toolkit for centralized cart state management, connected to an Express/MongoDB REST API with JWT authorization.',
    solution: 'Delivered a high-performance food ordering and recipe discovery portal with instant cart updates and responsive UI.',
    image: '/images/projects/foodies.jpg',
    gallery: [
      '/images/projects/foodies.jpg'
    ],
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Redux Toolkit', 'Tailwind CSS', 'JWT', 'REST APIs'],
    role: ['Full-Stack Developer', 'Frontend Lead'],
    outcome: 'Engineered a full-stack MERN food delivery application with dynamic cart state management and secure RESTful backend APIs.',
    githubUrl: 'https://github.com/Vinaygangurde2101/Foodies',
    featured: true,
    metrics: [
      { label: 'Architecture', value: 'Full-Stack MERN' },
      { label: 'State Management', value: 'Redux Toolkit' },
      { label: 'Authentication', value: 'JWT & Local Storage' }
    ]
  },
  {
    id: 'medreach',
    title: 'MedReach — Remote Telemedicine & Healthcare Access Platform',
    slug: 'medreach',
    category: 'Full-Stack',
    year: '2025',
    shortDescription: 'Role-based healthcare portal built with Java Spring Boot, Spring Security RBAC, MySQL, React, and Docker containerization.',
    description: 'Built MedReach to bridge healthcare access for remote communities. Implemented doctor discovery, real-time appointment scheduling, role-based access control (Patients, Doctors, Admins), digital health records vault, and prescription tracking.',
    problem: 'Patients in remote regions face barriers accessing doctor consultations and maintaining secure, centralized medical record histories.',
    approach: 'Designed secure Spring Boot REST microservices with Spring Security RBAC, paired with a React frontend and MySQL relational schema via Hibernate/JPA.',
    solution: 'Streamlined doctor appointment scheduling and digital medical document management into a secure, containerized healthcare portal.',
    image: '/images/projects/medreach.jpg',
    gallery: [
      '/images/projects/medreach.jpg'
    ],
    technologies: ['Java', 'Spring Boot', 'Spring Security', 'Hibernate/JPA', 'MySQL', 'React', 'REST APIs', 'Swagger', 'Docker', 'Maven'],
    role: ['Full-Stack Java Engineer', 'Backend Architect'],
    outcome: 'Architected a secure telemedicine portal containerized with Docker, featuring fine-grained Spring Security RBAC.',
    githubUrl: 'https://github.com/Vinaygangurde2101/MedReach',
    featured: true,
    metrics: [
      { label: 'Security', value: 'Spring Security RBAC' },
      { label: 'Backend', value: 'Spring Boot REST & MySQL' },
      { label: 'Deployment', value: 'Docker Containerized' }
    ]
  },
  {
    id: 'bharatsync',
    title: 'BharatSync — Digital India Unified Public Services Portal',
    slug: 'bharatsync',
    category: 'Full-Stack',
    year: '2024',
    shortDescription: 'Enterprise public services portal built with Java Spring Boot microservices, Spring Security RBAC, MySQL, Angular/React, and REST APIs.',
    description: 'Created BharatSync to digitize and unify local public services and municipal utility workflows into an enterprise multi-role dashboard. Features secure RESTful microservices, Spring Security role authentication, document validation pipelines, and real-time citizen status tracking.',
    problem: 'Fragmented municipal and public utility portals slow down citizen application processing, service requests, and scheme tracking.',
    approach: 'Engineered a scalable Java Spring Boot backend architecture integrated with Spring Security RBAC, Hibernate/JPA for MySQL transaction management, and an Angular/React frontend UI.',
    solution: 'Consolidated municipal public services and citizen utility request tracking into a secure, enterprise Java web application.',
    image: '/images/projects/bharatsync.jpg',
    gallery: [
      '/images/projects/bharatsync.jpg'
    ],
    technologies: ['Java', 'Spring Boot', 'Spring Security', 'Hibernate/JPA', 'MySQL', 'Angular', 'React', 'REST APIs', 'Maven'],
    role: ['Full-Stack Java Engineer', 'Enterprise System Architect'],
    outcome: 'Centralized public service request tracking and citizen utility workflows with a secure Java Spring Boot microservices backend.',
    githubUrl: 'https://github.com/Vinaygangurde2101/BharatSync',
    featured: true,
    metrics: [
      { label: 'Backend Architecture', value: 'Java Spring Boot REST' },
      { label: 'Security & Auth', value: 'Spring Security RBAC' },
      { label: 'Frontend Stack', value: 'Angular & React UI' }
    ]
  },
  {
    id: 'peblo-tv',
    title: 'Peblo TV — Web Video Streaming & Content Media Platform',
    slug: 'peblo-tv',
    category: 'Mobile & Web',
    year: '2025',
    shortDescription: 'Interactive web streaming application built with React, TypeScript, custom HTML5 media player controls, and channel subscriptions.',
    description: 'Designed and built Peblo TV, a modern video media platform featuring smooth video streaming, custom video player overlay controls, content category filters, channel subscriptions, and user playlists.',
    problem: 'Standard web video players lack customized overlay controls, responsive layout adaptations, and seamless video category navigation.',
    approach: 'Engineered custom HTML5 Video API wrapper components with custom playback controls, dynamic channel feed filtering, and responsive Tailwind dark mode UI.',
    solution: 'Delivered an immersive web streaming experience with custom video player overlays and dynamic channel feeds.',
    image: '/images/projects/peblo-tv.jpg',
    gallery: [
      '/images/projects/peblo-tv.jpg'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'HTML5 Video API', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    role: ['Frontend Developer', 'UI/UX Engineer'],
    outcome: 'Developed a video streaming platform with custom video player controls and responsive dark glassmorphism UI.',
    githubUrl: 'https://github.com/Vinaygangurde2101/Peblo-TV',
    featured: true,
    metrics: [
      { label: 'Media Player', value: 'Custom HTML5 & React Controls' },
      { label: 'UI Theme', value: 'Dark Glassmorphism' },
      { label: 'Features', value: 'Playlists & Channel Feeds' }
    ]
  }
];
