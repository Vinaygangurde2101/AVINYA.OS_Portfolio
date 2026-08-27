import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';
import { skillsData } from '../data/skills';
import { experienceData } from '../data/experience';
import { achievementsData } from '../data/achievements';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  actions?: { label: string; appId: string; props?: Record<string, any> }[];
  followUps?: string[];
  isError?: boolean;
}

// System prompt with strict directives for Gemini API in 1st Person ("I / Me / My")
const SYSTEM_PORTFOLIO_CONTEXT = `
You ARE Vinay Shivdas Gangurde speaking directly to the visitor in 1st person ("I", "me", "my").

STRICT PERSONA & GROUNDING DIRECTIVES:
1. Speak as Vinay in a warm, enthusiastic, professional, and authentic developer tone ("I am Vinay", "My projects", "My skills", "My GPA is 8.46").
2. Answer queries realistically like a top engineering candidate presenting their portfolio to recruiters, hiring managers, or fellow developers.
3. Highlight core technical strengths & metrics:
   - Full-Stack Developer & AI/ML Engineer (B.E. Computer Engineering student at RCPIT Shirpur, GPA: 8.46/10, graduating 2027).
   - Currently seeking an AI/ML or Full-Stack Developer Internship.
   - Featured Projects: SocialBuddy (Hugging Face AI toxicity moderation), MERS Healthcare (Spring Boot + OCR/NLP diagnostic report triage), WebOn AR (MediaPipe 33 pose landmarks + WebGL shaders), AgriConnect.
   - Tech Stack: Java, Spring Boot, Spring MVC, Node.js, Express, React, Redux, Tailwind CSS, Python, Hugging Face, MediaPipe, WebGL, Docker, MySQL, MongoDB, JWT, REST APIs.
   - Experience & Leadership: Google Student Ambassador, Java Developer Trainee at r3sys, Technical Team Head at E-Cell RCPIT (built quiz app for 100+ concurrent users).
   - Honor: Regional Qualifier at Eureka! IIT Bombay (Top 25k teams out of Asia's largest competition).
4. If asked generic HR or interview questions ("Why hire you?", "Relocation", "Availability", "Strengths", "Weaknesses"), give structured, compelling 1st person answers.
5. If user input is gibberish or completely off-topic:
   REPLY STRICTLY WITH:
   "⚠️ **Invalid Input!**\n\nThat doesn't seem to be a question about me or my portfolio.\n\nPlease ask me anything about my projects, technical stack, work experience, GPA, achievements, or how to contact me!"

PORTFOLIO DATA JSON:
${JSON.stringify(
  {
    profile: profileData,
    projects: projectsData,
    skills: skillsData,
    experience: experienceData,
    achievements: achievementsData
  },
  null,
  2
)}
`;

// Helper to query Google Gemini REST API
async function queryGeminiAPI(userQuery: string, history: ChatMessage[], apiKey: string): Promise<string> {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const contents = [
    {
      role: 'user',
      parts: [{ text: SYSTEM_PORTFOLIO_CONTEXT }]
    },
    {
      role: 'model',
      parts: [{ text: "Understood! I am Vinay Shivdas Gangurde. I will speak directly in the 1st person ('I', 'my', 'me') with an authentic, professional, and conversational persona." }]
    }
  ];

  const recentHistory = history.slice(-6);
  recentHistory.forEach((msg) => {
    contents.push({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    });
  });

  contents.push({
    role: 'user',
    parts: [{ text: userQuery }]
  });

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 600
      }
    })
  });

  if (!response.ok) {
    const errJson = await response.json().catch(() => ({}));
    throw new Error(errJson.error?.message || `Gemini API Error (${response.status})`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response from Gemini API');
  return text;
}

// Invalid input template
const INVALID_INPUT_MESSAGE = `⚠️ **Invalid Input!**

That doesn't seem to be a question about me or my portfolio.

Please ask me anything about my background, skills, or projects! For example:
• *"Why should we hire you for an AI/ML internship?"*
• *"What are your top AI & full-stack projects?"*
• *"What is your technical stack?"*
• *"Tell me about your Eureka! IIT Bombay achievement."*
• *"How can I contact you?"*`;

function isPortfolioQuery(q: string): boolean {
  const normalized = q.toLowerCase().trim();

  if (normalized.length < 3 && !['hi', 'me', 'cv', 'be', 'my', 'hr'].includes(normalized)) {
    return false;
  }

  const portfolioKeywords = [
    'vinay', 'gangurde', 'you', 'your', 'yourself', 'about', 'who', 'bio', 'profile', 'philosophy', 'gpa',
    'project', 'built', 'socialbuddy', 'mers', 'webon', 'agriconnect', 'work', 'app', 'code',
    'ai', 'ml', 'hugging face', 'perspective', 'mediapipe', 'webgl', 'ocr', 'nlp', 'triage',
    'skill', 'stack', 'tech', 'language', 'java', 'python', 'javascript', 'typescript',
    'react', 'redux', 'tailwind', 'node', 'express', 'spring', 'boot', 'docker',
    'mysql', 'mongodb', 'jwt', 'rbac', 'rest', 'api', 'junit', 'git', 'backend', 'frontend',
    'experience', 'job', 'intern', 'r3sys', 'ecell', 'role', 'company', 'trainee', 'head', 'lead',
    'education', 'college', 'university', 'study', 'degree', 'rcpit', 'shirpur', 'grade',
    'achievement', 'award', 'eureka', 'iit', 'bombay', 'certif', 'badge', 'honor',
    'contact', 'email', 'github', 'linkedin', 'hire', 'resume', 'cv', 'download', 'social', 'message',
    'hi', 'hello', 'hey', 'greetings', 'namaste', 'help', 'what', 'can', 'why', 'strength', 'relocate',
    'available', 'internship', 'salary', 'location', 'role', 'terminal', 'bug', 'challenge'
  ];

  return portfolioKeywords.some((kw) => normalized.includes(kw));
}

// Hyper-Realistic 1st Person Conversational Knowledge Base Engine
function queryLocalPortfolioKB(query: string): { text: string; followUps?: string[] } {
  const q = query.toLowerCase().trim();

  if (!isPortfolioQuery(q)) {
    return { text: INVALID_INPUT_MESSAGE };
  }

  // Greetings & Small Talk
  if (/^(hi|hello|hey|greetings|hola|namaste|good morning|good afternoon|good evening)/i.test(q)) {
    return {
      text: `Hey there! 👋 I'm **Vinay Shivdas Gangurde**!\n\nI'm a **Full-Stack Developer & AI/ML Engineer** pursuing my B.E. in Computer Engineering at RCPIT Shirpur (GPA: **8.46 / 10**).\n\nI specialize in building production-grade MERN stack applications, Java Spring Boot microservices, and AI integrations (Hugging Face, MediaPipe, OCR/NLP).\n\nHow can I help you today? Feel free to ask about my projects, technical skills, career timeline, or internship availability!`,
      followUps: [
        'What are your top AI projects?',
        'What is your technical stack?',
        'Why should we hire you for an internship?'
      ]
    };
  }

  // Why Hire You / Recruiter Pitch
  if (q.includes('why') && (q.includes('hire') || q.includes('choose') || q.includes('select') || q.includes('consider'))) {
    return {
      text: `### 🎯 Why Hire Me for Your Team?\n\nHere is what I bring to the table as an **AI/ML & Full-Stack Developer**:\n\n1. **Proven Production AI Integration**: I don't just use APIs; I build real systems — like **SocialBuddy** (real-time Hugging Face toxicity moderation) and **MERS Healthcare** (Python OCR + NLP report triage in Spring Boot microservices).\n2. **Solid Core Engineering**: Consistent academic performance (GPA **8.46 / 10**) backed by production Java Spring Boot, React, and Docker expertise.\n3. **Proven Leadership & Scale**: As Technical Head of E-Cell RCPIT, I built a real-time WebSocket platform handling **100+ concurrent users** and competed in the Regional Qualifiers of **Eureka! IIT Bombay** (top 25k teams across Asia).\n4. **Relentless Work Ethic**: Quick adaptability to new tech stacks, agile collaboration, and strong clean code practices (JUnit & Mockito verified).\n\nI am actively looking for an **AI/ML or Backend/Full-Stack Internship** where I can create real business value!`,
      followUps: [
        'Tell me about your work experience',
        'Show me your project case studies',
        'How can I schedule an interview?'
      ]
    };
  }

  // Availability / Relocation / Role Intentions
  if (q.includes('available') || q.includes('relocate') || q.includes('joining') || q.includes('start date') || q.includes('remote') || q.includes('location')) {
    return {
      text: `### 📍 Availability & Relocation Preferences\n\n• **Current Status**: Available for **AI/ML & Full-Stack Internships** (2025 / 2026).\n• **Work Mode**: Open to **Remote**, **Hybrid**, or **On-Site** roles.\n• **Preferred Locations**: Pune, Mumbai, Bengaluru, Hyderabad, or Remote nationwide.\n• **Notice Period**: Available to start immediately upon requirement.\n• **Target Roles**: AI/ML Engineer Intern, Full-Stack Developer Intern, Java/Spring Backend Engineer Intern.`,
      followUps: [
        'Send me your direct email & contact',
        'Open Resume PDF',
        'What are your top backend skills?'
      ]
    };
  }

  // Technical Strengths & Challenges Fixed
  if (q.includes('strength') || q.includes('challenge') || q.includes('bug') || q.includes('problem solving')) {
    return {
      text: `### 💡 Technical Strengths & Problem Solving\n\n• **Core Strengths**: Full-Stack System Architecture (MERN & Java Spring Boot), AI/ML API Integration (Hugging Face, MediaPipe, OCR), Database Optimization (MySQL, MongoDB), and RESTful API design.\n• **Recent Technical Challenge Solved**: While building **WebOn AR**, synchronizing MediaPipe 33-point pose landmark tracking over WebRTC live video streams caused frame drops. I solved this by implementing custom WebGL vertex shaders and dual-pass arm occlusion, reducing render latency dramatically while maintaining smooth 60 FPS try-ons.`,
      followUps: [
        'Open WebOn AR Project Details',
        'What is your overall GPA?',
        'View Skills Matrix'
      ]
    };
  }

  // General "who are you / about me"
  if (q.includes('who') || q.includes('about') || q.includes('vinay') || q.includes('profile') || q.includes('bio') || q.includes('yourself')) {
    return {
      text: `### 👤 About Me — Vinay Shivdas Gangurde\n\nI am a **Full-Stack Developer & AI/ML Engineer** pursuing my B.E. in Computer Engineering at **R. C. Patel Institute of Technology (RCPIT), Shirpur** (GPA: **8.46 / 10**, graduating 2027).\n\n• **My Philosophy**: *"Building intelligent, production-grade AI systems and full-stack software architectures with high performance, security, and scalable design."*\n• **Key Highlights**: 4+ production AI & web apps, ex-Java Developer Trainee @ r3sys, Technical Head @ E-Cell RCPIT, Regional Qualifier @ Eureka! IIT Bombay.\n• **Current Objective**: Seeking an **AI/ML Internship** for 2025/2026.`,
      followUps: [
        'Explore All Projects',
        'View Work Timeline',
        'View Resume PDF'
      ]
    };
  }

  // Projects & Case Studies
  if (q.includes('project') || q.includes('built') || q.includes('socialbuddy') || q.includes('mers') || q.includes('webon') || q.includes('agriconnect') || q.includes('app')) {
    if (q.includes('socialbuddy') || q.includes('toxicity') || q.includes('hugging face')) {
      return {
        text: `### 🤖 SocialBuddy — AI-Powered Social Platform\n\n• **What I Built**: A full-stack MERN social platform featuring real-time AI toxicity moderation.\n• **AI Implementation**: Integrated Hugging Face Sentiment/Toxicity Transformers & Google Perspective API into Express.js REST middleware to analyze comments before database insertion.\n• **Tech Stack**: MongoDB, Express.js, React, Node.js, Redux, Tailwind CSS, JWT Auth, RBAC Admin Controls.\n• **Key Outcome**: Automated real-time content filtering with role-based access control.`,
        followUps: [
          'Tell me about MERS Healthcare',
          'Tell me about WebOn AR',
          'Explore All Projects'
        ]
      };
    }
    if (q.includes('mers') || q.includes('medical') || q.includes('ocr') || q.includes('triage') || q.includes('spring')) {
      return {
        text: `### 🏥 Medical Emergency Response System (MERS)\n\n• **What I Built**: A healthcare emergency response system with 4 roles (Admin, Doctor, Patient, Ambulance).\n• **AI Module**: Engineered a Python OCR (Tesseract) + NLP diagnostic report analysis module to extract patient vitals from scanned reports and flag critical cases for faster emergency triage.\n• **Tech Stack**: Java Spring Boot, Spring Security RBAC, Hibernate/JPA, MySQL, Docker, JUnit & Mockito.`,
        followUps: [
          'Open MERS Case Study',
          'What is your work experience at r3sys?',
          'What are your top Java skills?'
        ]
      };
    }
    if (q.includes('webon') || q.includes('ar') || q.includes('mediapipe') || q.includes('webgl') || q.includes('try on')) {
      return {
        text: `### 🛍️ WebOn — AR Live Shopping Platform\n\n• **What I Built**: Real-time 3D virtual try-on during seller live video streams.\n• **AI & 3D Shaders**: Combined MediaPipe 33 body landmark tracking with custom WebGL 3D vertex shaders and arm occlusion.\n• **Streaming**: Low-latency WebRTC video streaming & Socket.IO session sync.`,
        followUps: [
          'Open WebOn AR Details',
          'Tell me about AgriConnect',
          'View Skills Matrix'
        ]
      };
    }
    if (q.includes('agri') || q.includes('farmer')) {
      return {
        text: `### 🌾 AgriConnect — Agricultural Services Management System\n\n• **What I Built**: Multi-role agricultural booking platform for Farmers, Service Providers, and Admins.\n• **Tech Stack**: Java Spring Boot, Hibernate, MySQL, 15+ REST APIs, Spring Security RBAC, responsive JSP.`,
        followUps: [
          'Explore All Projects',
          'View Skills Matrix',
          'View Resume PDF'
        ]
      };
    }
    return {
      text: `Here are **4 featured production-grade projects** I have engineered:\n\n1. **SocialBuddy**: MERN Social Platform with Hugging Face & Perspective API AI toxicity moderation.\n2. **MERS Healthcare**: Java Spring Boot microservices platform with Python OCR/NLP diagnostic triage & Docker.\n3. **WebOn AR**: Real-time virtual try-on using MediaPipe 33 pose landmarks + WebGL 3D shaders over WebRTC.\n4. **AgriConnect**: Spring Boot multi-role agricultural services portal with 15+ REST APIs.`,
      followUps: [
        'Tell me more about SocialBuddy',
        'Tell me about MERS Healthcare',
        'Tell me about WebOn AR'
      ]
    };
  }

  // Skills & Tech Stack
  if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language') || q.includes('java') || q.includes('python') || q.includes('react') || q.includes('spring') || q.includes('mern') || q.includes('docker') || q.includes('backend') || q.includes('frontend')) {
    return {
      text: `### 🛠️ My Technical Stack & Skills\n\n• **Languages**: Java (3 yrs), Python (3 yrs), JavaScript ES6+ (3 yrs), TypeScript (3 yrs)\n• **Backend Systems**: Spring Boot, Spring MVC, Spring Security, Node.js & Express, REST APIs, Hibernate/JPA, Flask\n• **Frontend Engineering**: React, Redux, Tailwind CSS, HTML5/CSS3, Angular\n• **AI / ML & Graphics**: Hugging Face AI, Perspective Toxicity API, OCR (Tesseract) & NLP, MediaPipe Pose ML, WebGL 3D Shaders\n• **Databases & Security**: MySQL, MongoDB, JDBC, JWT Token Auth, RBAC\n• **DevOps & Testing**: Docker, Git/GitHub, Maven, Swagger/OpenAPI, JUnit & Mockito`,
      followUps: [
        'Tell me about your Java experience at r3sys',
        'Show me your AI projects',
        'Open Skills Matrix'
      ]
    };
  }

  // Experience & Leadership
  if (q.includes('experience') || q.includes('job') || q.includes('r3sys') || q.includes('ecell') || q.includes('role') || q.includes('intern') || q.includes('company')) {
    return {
      text: `### 💼 My Work & Leadership Experience\n\n1. **Java Developer Trainee @ r3sys** *(Jun 2025 – Jul 2025)*:\n   • Built 5+ production Java web apps (Spring MVC, JSP, Servlets) from scratch.\n   • Normalized MySQL/JDBC database schemas, reducing REST API latency.\n   • Debugged server logs and bottlenecks in a remote agile team.\n\n2. **Technical Team Head @ E-Cell & E-Builders Club, RCPIT** *(2024 – Present)*:\n   • Led technical operations for campus entrepreneurship events.\n   • Built a real-time WebSocket quiz platform handling **100+ concurrent users**.\n   • Mentored 20+ junior engineering students in web technology.`,
      followUps: [
        'Why should we hire you for an internship?',
        'Tell me about your GPA & college',
        'Open Resume PDF'
      ]
    };
  }

  // Education, GPA & College
  if (q.includes('gpa') || q.includes('education') || q.includes('college') || q.includes('university') || q.includes('study') || q.includes('degree') || q.includes('rcpit') || q.includes('shirpur') || q.includes('grade')) {
    return {
      text: `### 🎓 My Education & Academics\n\n• **Degree**: Bachelor of Engineering (B.E.) in Computer Engineering\n• **College**: R. C. Patel Institute of Technology (RCPIT), Shirpur, Maharashtra, India\n• **Current GPA**: **8.46 / 10**\n• **Expected Graduation**: 2027\n• **Current Focus**: Seeking an **AI/ML Internship** for 2025/2026.`,
      followUps: [
        'Tell me about Eureka! IIT Bombay achievement',
        'What are your top projects?',
        'How can I contact you?'
      ]
    };
  }

  // Achievements & Competitions
  if (q.includes('achievement') || q.includes('award') || q.includes('eureka') || q.includes('iit') || q.includes('certif') || q.includes('badge') || q.includes('honor')) {
    return {
      text: `### 🏆 My Achievements & Certifications\n\n• **Eureka! at IIT Bombay**: Qualified for Regional Qualifiers of Eureka! at IIT Bombay — Asia's largest business model competition out of **25,000+ competing teams**!\n• **E-Cell Technical Head**: Built real-time WebSockets platform for 100+ concurrent users.\n• **Certifications**:\n  - *Full Stack AI Engineer 2026* (Udemy)\n  - *MERN Stack & JWT Authentication* (Udemy)\n  - *Build REST APIs with Node.js* (Udemy)\n  - *Mastering Java* (Nextech Infosystems)\n  - *Python Programming* (GUVI / Google for Education)\n  - *Java Full Stack Developer* (r3 Systems)`,
      followUps: [
        'Why should we hire you?',
        'Show me your AI projects',
        'Send Direct Message'
      ]
    };
  }

  // Contact, GitHub & Repositories
  if (q.includes('contact') || q.includes('email') || q.includes('github') || q.includes('repo') || q.includes('linkedin') || q.includes('hire') || q.includes('resume') || q.includes('cv') || q.includes('social')) {
    return {
      text: `### 📬 GitHub Profile & Project Repositories\n\n• **GitHub Profile**: [github.com/Vinaygangurde2101](https://github.com/Vinaygangurde2101)\n• **SocialBuddy AI Repo**: [github.com/Vinaygangurde2101/socialbuddy](https://github.com/Vinaygangurde2101/socialbuddy)\n• **MERS Healthcare Repo**: [github.com/Vinaygangurde2101/medical-emergency-response-system](https://github.com/Vinaygangurde2101/medical-emergency-response-system)\n• **WebOn AR Shopping Repo**: [github.com/rohannn3215/Avinya---AR-Fashion-Marketplace](https://github.com/rohannn3215/Avinya---AR-Fashion-Marketplace)\n• **AgriConnect Repo**: [github.com/Vinaygangurde2101/agriconnect](https://github.com/Vinaygangurde2101/agriconnect)\n• **AVINYA.OS Portfolio Repo**: [github.com/Vinaygangurde2101/AVINYA.OS_Portfolio](https://github.com/Vinaygangurde2101/AVINYA.OS_Portfolio)\n\n• **Email**: [vinaygangurde2101@gmail.com](mailto:vinaygangurde2101@gmail.com)\n• **LinkedIn**: [linkedin.com/in/vinay-gangurde-b3229027b](https://www.linkedin.com/in/vinay-gangurde-b3229027b)`,
      followUps: [
        'What are your top AI projects?',
        'Open Resume PDF',
        'Why should we hire you for an internship?'
      ]
    };
  }

  return { text: INVALID_INPUT_MESSAGE };
}

// Main AI Query Handler
export async function queryPortfolioAI(
  userQuery: string,
  history: ChatMessage[] = [],
  customApiKey?: string
): Promise<{ text: string; actions?: { label: string; appId: string; props?: Record<string, any> }[]; followUps?: string[] }> {
  const apiKey = customApiKey || (import.meta.env.VITE_GEMINI_API_KEY as string | undefined);

  let responseText = '';
  let followUps: string[] | undefined = undefined;

  if (apiKey && apiKey.trim().length > 10) {
    try {
      responseText = await queryGeminiAPI(userQuery, history, apiKey.trim());
    } catch (err: any) {
      console.warn('Gemini API call failed, using intelligent local knowledge base fallback:', err.message);
      const kbRes = queryLocalPortfolioKB(userQuery);
      responseText = kbRes.text;
      followUps = kbRes.followUps;
    }
  } else {
    const kbRes = queryLocalPortfolioKB(userQuery);
    responseText = kbRes.text;
    followUps = kbRes.followUps;
  }

  // Determine interactive UI actions based on query intent
  const actions: { label: string; appId: string; props?: Record<string, any> }[] = [];
  const qLower = userQuery.toLowerCase();

  if (!responseText.includes('Invalid Input!')) {
    if (qLower.includes('socialbuddy') || qLower.includes('toxicity') || qLower.includes('hugging face')) {
      actions.push({ label: 'Open SocialBuddy Case Study', appId: 'project-details', props: { projectId: 'socialbuddy-ai' } });
    }
    if (qLower.includes('mers') || qLower.includes('medical') || qLower.includes('triage') || qLower.includes('spring')) {
      actions.push({ label: 'Open MERS Case Study', appId: 'project-details', props: { projectId: 'mers-healthcare' } });
    }
    if (qLower.includes('webon') || qLower.includes('ar') || qLower.includes('mediapipe') || qLower.includes('webgl')) {
      actions.push({ label: 'Open WebOn AR Details', appId: 'project-details', props: { projectId: 'webon-ar-shopping' } });
    }
    if (qLower.includes('project') || qLower.includes('work') || qLower.includes('built')) {
      actions.push({ label: 'Explore All Projects', appId: 'projects' });
    }
    if (qLower.includes('skill') || qLower.includes('stack') || qLower.includes('java') || qLower.includes('python')) {
      actions.push({ label: 'View Skills Matrix', appId: 'skills' });
    }
    if (qLower.includes('experience') || qLower.includes('r3sys') || qLower.includes('job') || qLower.includes('hire')) {
      actions.push({ label: 'View Work Timeline', appId: 'experience' });
    }
    if (qLower.includes('resume') || qLower.includes('cv') || qLower.includes('download')) {
      actions.push({ label: 'View Resume PDF', appId: 'resume' });
    }
    if (qLower.includes('contact') || qLower.includes('email') || qLower.includes('hire')) {
      actions.push({ label: 'Send Direct Message', appId: 'contact' });
    }
    if (qLower.includes('terminal') || qLower.includes('cli') || qLower.includes('command')) {
      actions.push({ label: 'Open Terminal Shell', appId: 'terminal' });
    }
  }

  return {
    text: responseText,
    actions: actions.length > 0 ? actions : undefined,
    followUps: followUps || [
      'What are your top AI projects?',
      'Why should we hire you for an internship?',
      'View Skills Matrix'
    ]
  };
}

