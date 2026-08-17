import React from 'react';
import { experienceData } from '../../data/experience';
import { Badge } from '../../components/common/Badge';
import { Briefcase, Calendar, MapPin, Building2, CheckCircle2, ChevronRight } from 'lucide-react';

export const ExperienceApp: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-6 select-none">
      {/* Header Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Career Track & Leadership</h2>
            <p className="text-xs text-slate-400 font-mono">
              7+ years building enterprise systems & creative frontend web apps
            </p>
          </div>
        </div>

        <Badge variant="primary" size="md">
          {experienceData.length} Roles Listed
        </Badge>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-cyan-500 before:via-violet-500 before:to-slate-800">
        {experienceData.map((exp, idx) => (
          <div key={exp.id} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[30px] sm:-left-[37px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:bg-cyan-400 group-hover:shadow-[0_0_12px_#00f0ff] transition-all" />

            {/* Card Content */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-400/40 shadow-xl transition-all space-y-4">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {exp.role}
                    </h3>
                    <Badge variant={exp.type === 'Lead' ? 'primary' : 'secondary'} size="sm">
                      {exp.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mt-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{exp.company}</span>
                    <span className="text-slate-500">•</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-mono text-slate-400 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-white/10 w-fit">
                  <Calendar className="w-3.5 h-3.5 text-violet-400" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {exp.description}
              </p>

              {/* Responsibilities Bullet Points */}
              <div className="space-y-1.5">
                <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Key Responsibilities
                </h4>
                {exp.responsibilities.map((resp, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </div>
                ))}
              </div>

              {/* Key Achievements */}
              {exp.achievements && exp.achievements.length > 0 && (
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 space-y-1">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-300">
                    Impact & Outcomes
                  </h4>
                  {exp.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-center gap-2 text-xs text-cyan-200 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Badges */}
              <div className="pt-2 flex flex-wrap gap-1.5">
                {exp.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
