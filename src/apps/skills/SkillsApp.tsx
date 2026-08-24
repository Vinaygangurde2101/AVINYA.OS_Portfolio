import React, { useState, useMemo } from 'react';
import { skillsData } from '../../data/skills';
import { Badge } from '../../components/common/Badge';
import { Cpu, Search, Sparkles, Layers, ShieldCheck, Wrench } from 'lucide-react';

export const SkillsApp: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const groupNames = useMemo(() => {
    return ['All', ...skillsData.map((g) => g.category)];
  }, []);

  const filteredGroups = useMemo(() => {
    return skillsData
      .map((group) => {
        const matchesGroup = selectedGroup === 'All' || group.category === selectedGroup;
        if (!matchesGroup) return null;

        const q = searchQuery.toLowerCase();
        const filteredSkills = group.skills.filter(
          (sk) => !q || sk.name.toLowerCase().includes(q) || sk.level.toLowerCase().includes(q)
        );

        if (filteredSkills.length === 0) return null;

        return { ...group, skills: filteredSkills };
      })
      .filter(Boolean);
  }, [selectedGroup, searchQuery]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-6 select-none">
      {/* Top Filter & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/90 border border-white/10">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <div>
            <h2 className="text-sm font-bold text-white">Technical Ecosystem</h2>
            <p className="text-[11px] text-slate-400 font-mono">
              Core technologies, frameworks & specialization levels
            </p>
          </div>
        </div>

        <div className="relative sm:w-56">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skill or stack..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950/80 border border-white/10 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs font-mono">
        {groupNames.map((name) => (
          <button
            key={name}
            onClick={() => setSelectedGroup(name)}
            className={`px-3.5 py-1.5 rounded-xl border transition-all whitespace-nowrap ${
              selectedGroup === name
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold shadow-[0_0_10px_rgba(0,240,255,0.15)]'
                : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Skills Groups */}
      <div className="space-y-6">
        {filteredGroups.map((group, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-4 shadow-xl"
          >
            <div className="border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                {group?.category}
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-sans">{group?.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {group?.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                    skill.highlight
                      ? 'bg-cyan-500/10 border-cyan-500/30 hover:border-cyan-400'
                      : 'bg-slate-950/60 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-100">{skill.name}</span>
                    {skill.highlight && (
                      <span className="text-[10px] text-cyan-400 font-mono">★ Core</span>
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] font-mono">
                    <Badge
                      variant={
                        skill.level === 'Primary'
                          ? 'primary'
                          : skill.level === 'Strong'
                          ? 'accent'
                          : 'secondary'
                      }
                      size="sm"
                    >
                      {skill.level}
                    </Badge>

                    <span className="text-slate-400">{skill.yearsOfExp} yrs exp</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
