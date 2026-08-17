import React, { useState } from 'react';
import { profileData } from '../../data/profile';
import { experienceData } from '../../data/experience';
import { projectsData } from '../../data/projects';
import { skillsData } from '../../data/skills';
import { achievementsData } from '../../data/achievements';
import { FileText, Download, Printer, ZoomIn, ZoomOut, Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';

export const ResumeApp: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState(100);

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-8 select-none">
      {/* PDF Toolbar */}
      <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-300">
          <FileText className="w-4 h-4 text-sky-400" />
          <span className="font-semibold text-slate-100">Vinay_Shivdas_Gangurde_Resume.pdf</span>
          <span className="px-2 py-0.5 rounded bg-sky-500/10 text-[10px] text-sky-400 font-semibold border border-sky-500/20">ATS Verified</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-950/80 rounded-lg border border-white/10 p-0.5">
            <button
              onClick={() => setZoomLevel((z) => Math.max(80, z - 10))}
              className="p-1 text-slate-400 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[10px] text-slate-300">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
              className="p-1 text-slate-400 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 flex items-center gap-1.5 transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <a
            href={profileData.socials.resumeUrl}
            download
            onClick={() => window.print()}
            className="px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(56,189,248,0.3)] flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Printable Professional ATS Resume Document */}
      <div
        className="p-8 sm:p-12 rounded-2xl bg-slate-950 border border-white/15 shadow-2xl space-y-5 text-slate-200 font-sans transition-all duration-200 mx-auto max-w-[850px]"
        style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
      >
        {/* Header */}
        <div className="text-center space-y-1.5 pb-3 border-b border-slate-700">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-sky-400 tracking-wider uppercase font-serif">
            {profileData.name}
          </h1>
          <p className="text-sm font-semibold text-slate-200 tracking-wide font-sans">{profileData.role}</p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-slate-300 pt-1">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-sky-400" />
              +91 9529465588
            </span>
            <span className="text-slate-500">|</span>
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-sky-400" />
              {profileData.socials.email}
            </span>
            <span className="text-slate-500">|</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-sky-400" />
              Shirpur, Maharashtra, India
            </span>
            <span className="text-slate-500">|</span>
            <a href={profileData.socials.github} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline flex items-center gap-0.5">
              GitHub <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <span className="text-slate-500">|</span>
            <a href={profileData.socials.linkedin} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline flex items-center gap-0.5">
              LinkedIn <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="space-y-1.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-0.5">
            Professional Summary
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            Full-Stack Developer and Computer Engineering student (GPA: 8.46/10) with hands-on experience in AI-powered systems, MERN stack, and Java Spring MVC. Built production-grade projects integrating AI content moderation, real-time AR/WebRTC, OCR/NLP-driven report analysis, and ML-driven pipelines. Seeking an AI/ML internship to deepen expertise in model development, deployment, and scalable backend engineering.
          </p>
        </div>

        {/* Technical Skills */}
        <div className="space-y-1.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-0.5">
            Technical Skills
          </h2>
          <div className="text-xs space-y-1 text-slate-300">
            <div className="flex flex-col sm:flex-row sm:items-start">
              <span className="font-bold text-slate-100 min-w-[130px]">Languages:</span>
              <span>Java, Python, JavaScript (ES6+), TypeScript</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start">
              <span className="font-bold text-slate-100 min-w-[130px]">Frontend:</span>
              <span>React, TypeScript, JavaScript, Redux, HTML5, CSS3, Tailwind CSS, Angular</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start">
              <span className="font-bold text-slate-100 min-w-[130px]">Backend:</span>
              <span>Spring Boot, Spring MVC, JSP/Servlets, Node.js, Express, Flask, REST APIs, Microservices</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start">
              <span className="font-bold text-slate-100 min-w-[130px]">Databases:</span>
              <span>MySQL, MongoDB (NoSQL)</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start">
              <span className="font-bold text-slate-100 min-w-[130px]">AI / ML:</span>
              <span>Hugging Face, Perspective API, OCR (Tesseract), NLP pipelines, MediaPipe ML Pose Landmarks</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start">
              <span className="font-bold text-slate-100 min-w-[130px]">Auth & Security:</span>
              <span>JWT, Role-based access control (RBAC), Session management</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start">
              <span className="font-bold text-slate-100 min-w-[130px]">Tools & DevOps:</span>
              <span>Git, GitHub, Maven, Docker, Swagger/OpenAPI, JUnit, Apache Tomcat, VS Code, XAMPP</span>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="space-y-1.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-0.5">
            Education
          </h2>
          <div className="flex flex-col sm:flex-row justify-between items-start text-xs font-sans">
            <div>
              <span className="font-bold text-slate-100">B.E. in Computer Engineering</span>, <span className="text-slate-300">R. C. Patel Institute of Technology</span> <span className="font-mono text-sky-400 font-semibold">(GPA: 8.46 / 10)</span>
            </div>
            <div className="font-mono text-slate-400 text-right shrink-0">
              '23 — Present | Shirpur
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-0.5">
            Experience
          </h2>
          {experienceData.map((exp) => (
            <div key={exp.id} className="space-y-1">
              <div className="flex flex-col sm:flex-row justify-between text-xs font-sans">
                <div>
                  <span className="font-bold text-slate-100">{exp.role}</span>
                  <div className="text-sky-400 font-medium text-[11px] font-mono">{exp.company}</div>
                </div>
                <div className="font-mono text-slate-400 text-xs sm:text-right">
                  {exp.period} | {exp.location}
                </div>
              </div>
              <ul className="list-disc list-outside text-xs text-slate-300 space-y-1 pl-4">
                {exp.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="space-y-2.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-0.5">
            Projects
          </h2>
          {projectsData.map((proj) => (
            <div key={proj.id} className="space-y-1">
              <div className="flex flex-col sm:flex-row justify-between items-start text-xs">
                <span className="font-bold text-slate-100">
                  {proj.title}
                </span>
                <span className="font-mono text-slate-400 text-[11px]">{proj.year}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-1">
                • {proj.description}
              </p>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="space-y-1.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-0.5">
            Achievements
          </h2>
          <ul className="list-disc list-outside text-xs text-slate-300 space-y-1 pl-4">
            <li>Selected for the Regional Qualifiers of Eureka! at IIT Bombay — Asia's largest business model competition — out of 25,000+ competing teams.</li>
          </ul>
        </div>

        {/* Leadership & Impact */}
        <div className="space-y-1.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-0.5">
            Leadership & Impact
          </h2>
          <ul className="list-disc list-outside text-xs text-slate-300 space-y-1 pl-4">
            <li>
              <span className="font-bold text-slate-100">Technical Team Head — E-Cell & E-Builders Club, RCPIT</span> <span className="font-mono text-slate-400 text-[11px]">(2024 – Present)</span>: Led technical operations for entrepreneurship events, developed a real-time quiz application supporting 100+ concurrent users, and organized web development workshops while mentoring 20+ students.
            </li>
          </ul>
        </div>

        {/* Certifications */}
        <div className="space-y-1.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-0.5">
            Certifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-300">
            {achievementsData.filter(a => a.category === 'Certification').map((cert) => (
              <div key={cert.id} className="flex items-start gap-1.5">
                <span className="text-sky-400 font-bold">•</span>
                <div>
                  <span className="font-semibold text-slate-200">{cert.title}</span>
                  <span className="text-slate-400 text-[11px]"> ({cert.organization})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
