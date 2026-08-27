import React from 'react';
import { profileData } from '../../data/profile';
import { Badge } from '../../components/common/Badge';
import { useWindowStore } from '../../store/useWindowStore';
import { MapPin, Mail, FileText, Sparkles, Terminal, Code2, Rocket, Globe, User } from 'lucide-react';

export const AboutApp: React.FC = () => {
  const openWindow = useWindowStore((s) => s.openWindow);

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-4">
      {/* Hero Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          {profileData.avatar ? (
            <img
              src={profileData.avatar}
              alt={profileData.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-cyan-400/40 shadow-2xl shrink-0"
            />
          ) : (
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-950/80 border-2 border-dashed border-cyan-400/40 shadow-2xl flex flex-col items-center justify-center gap-1.5 shrink-0 text-slate-400 hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-pointer group"
              title="Blank Profile Photo Slot (Add your photo URL to src/data/profile.ts anytime)"
            >
              <div className="p-2 sm:p-2.5 rounded-full bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                <User className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <span className="text-[9px] font-mono text-slate-400 tracking-wider uppercase font-semibold">
                + Add Photo
              </span>
            </div>
          )}
          <div className="text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {profileData.name}
              </h1>
              <Badge variant="primary" size="sm">
                ● {profileData.status}
              </Badge>
            </div>
            
            <p className="text-sm text-cyan-400 font-mono font-medium">
              {profileData.title}
            </p>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {profileData.location}
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-violet-400" />
                Remote & Global
              </span>
            </div>

            <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-2">
              <button
                onClick={() => openWindow('contact')}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Get in Touch</span>
              </button>
              <button
                onClick={() => openWindow('resume')}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-semibold text-xs transition-all border border-white/10 flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Resume</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Counter Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {profileData.stats.map((st, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-slate-900/80 border border-white/10 text-center hover:border-cyan-500/30 transition-all"
          >
            <div className="text-2xl font-bold font-mono text-cyan-400">{st.value}</div>
            <div className="text-[11px] text-slate-400 font-sans mt-1">{st.label}</div>
          </div>
        ))}
      </div>

      {/* Biography Paragraphs */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
        <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          BACKGROUND & PHILOSOPHY
        </h2>
        {profileData.bio.map((paragraph, i) => (
          <p key={i} className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {paragraph}
          </p>
        ))}
        <div className="mt-4 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 text-xs italic text-violet-300">
          "{profileData.philosophy}"
        </div>
      </div>

      {/* Currently Widget Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold">
            <Code2 className="w-4 h-4" />
            BUILDING
          </div>
          <p className="text-xs text-slate-300">{profileData.currently.building}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-violet-400 font-mono text-xs font-semibold">
            <Sparkles className="w-4 h-4" />
            LEARNING
          </div>
          <p className="text-xs text-slate-300">{profileData.currently.learning}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
            <Rocket className="w-4 h-4" />
            EXPLORING
          </div>
          <p className="text-xs text-slate-300">{profileData.currently.exploring}</p>
        </div>
      </div>

      {/* Featured GitHub Repositories Section */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-2">
            <Globe className="w-4 h-4" />
            FEATURED GITHUB PROJECT REPOSITORIES
          </h2>
          <a
            href={profileData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>View Profile</span>
            <Rocket className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          {[
            { title: 'SocialBuddy AI', url: 'https://github.com/Vinaygangurde2101/socialbuddy', desc: 'MERN + Hugging Face & Perspective API AI moderation' },
            { title: 'MERS Healthcare', url: 'https://github.com/Vinaygangurde2101/medical-emergency-response-system', desc: 'Spring Boot RBAC + OCR/NLP diagnostic report triage' },
            { title: 'WebOn AR Shopping', url: 'https://github.com/rohannn3215/Avinya---AR-Fashion-Marketplace', desc: 'MediaPipe 33 pose landmarks + WebGL 3D shaders' },
            { title: 'AgriConnect System', url: 'https://github.com/Vinaygangurde2101/agriconnect', desc: 'Spring Boot agricultural portal + 15+ REST APIs' },
            { title: 'AVINYA.OS Portfolio', url: 'https://github.com/Vinaygangurde2101/AVINYA.OS_Portfolio', desc: 'Cyberpunk Desktop Web Operating System Portfolio' }
          ].map((repo, idx) => (
            <a
              key={idx}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-950/70 border border-white/10 hover:border-cyan-400/50 hover:bg-slate-950 transition-all flex flex-col justify-between space-y-1 group"
            >
              <div className="font-bold text-slate-100 group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                <span>{repo.title}</span>
                <span className="text-[10px] text-cyan-400 underline opacity-0 group-hover:opacity-100 transition-opacity">View Repo →</span>
              </div>
              <div className="text-[11px] text-slate-400 font-sans">{repo.desc}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
