import React from 'react';
import { projectsData } from '../../data/projects';
import { Badge } from '../../components/common/Badge';
import { useWindowStore } from '../../store/useWindowStore';
import { ExternalLink, Github, ArrowLeft, CheckCircle2, Cpu, User, Target, BarChart2 } from 'lucide-react';

interface ProjectDetailsWindowProps {
  projectId?: string;
}

export const ProjectDetailsWindow: React.FC<ProjectDetailsWindowProps> = ({ projectId }) => {
  const openWindow = useWindowStore((s) => s.openWindow);

  const project = projectsData.find((p) => p.id === projectId) || projectsData[0];

  const handleLaunchBrowser = () => {
    if (project.liveUrl) {
      openWindow('browser', { url: project.liveUrl }, `Browser — ${project.title}`);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-6 select-none">
      {/* Header Info */}
      <div className="space-y-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <Badge variant="primary" size="sm">
            {project.category}
          </Badge>
          <span>•</span>
          <span>{project.year}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {project.title}
        </h1>

        <p className="text-sm text-slate-300 font-sans leading-relaxed">
          {project.description}
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap gap-3 font-mono text-xs">
          {project.liveUrl && (
            <button
              onClick={handleLaunchBrowser}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch Live Demo</span>
            </button>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/15 transition-all flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>View Source Code</span>
            </a>
          )}
        </div>
      </div>

      {/* Hero Image / Gallery */}
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl">
        <img
          src={project.image}
          alt={project.title}
          className="w-full max-h-[380px] object-cover"
        />
      </div>

      {/* Metrics Banner */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {project.metrics.map((m, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-center"
            >
              <div className="text-xl font-bold font-mono text-cyan-400">{m.value}</div>
              <div className="text-xs text-slate-400 font-sans mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Detailed Breakdown: Problem, Approach, Solution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
            <Target className="w-4 h-4" />
            1. THE CHALLENGE
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">{project.problem}</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            2. THE APPROACH
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">{project.approach}</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            3. THE SOLUTION
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">{project.solution}</p>
        </div>
      </div>

      {/* Tech Stack & Roles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            TECHNOLOGY STACK
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t, i) => (
              <Badge key={i} variant="secondary" size="md">
                {t}
              </Badge>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-violet-400 flex items-center gap-2">
            <User className="w-4 h-4" />
            MY RESPONSIBILITIES
          </h3>
          <ul className="space-y-1 text-xs text-slate-300 font-sans">
            {project.role.map((r, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
