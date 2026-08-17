import React, { useState, useMemo } from 'react';
import { achievementsData } from '../../data/achievements';
import { Badge } from '../../components/common/Badge';
import * as Icons from 'lucide-react';

export const AchievementsApp: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Award', 'Hackathon', 'Open Source', 'Milestone', 'Certification'];

  const filteredAchievements = useMemo(() => {
    if (filterCategory === 'All') return achievementsData;
    return achievementsData.filter((item) => item.category === filterCategory);
  }, [filterCategory]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-6 select-none">
      {/* Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
            <Icons.Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Honors, Badges & Open Source</h2>
            <p className="text-xs text-slate-400 font-mono">
              Recognitions, hackathon wins & public community contributions
            </p>
          </div>
        </div>

        <Badge variant="accent" size="md">
          {achievementsData.length} Badges Earned
        </Badge>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap ${
              filterCategory === cat
                ? 'bg-violet-500/20 border-violet-400 text-violet-300 font-semibold shadow-[0_0_10px_rgba(139,92,246,0.15)]'
                : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAchievements.map((item) => {
          const IconComp = (Icons as any)[item.badgeIcon] || Icons.Award;

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                item.highlight
                  ? 'bg-gradient-to-br from-slate-900/90 to-violet-950/40 border-violet-500/40 shadow-[0_0_20px_rgba(139,92,246,0.15)]'
                  : 'bg-slate-900/80 border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="p-3 rounded-2xl bg-violet-500/15 border border-violet-400/30 text-violet-300 shadow-lg">
                    <IconComp className="w-6 h-6" />
                  </div>

                  <div className="flex items-center gap-2 font-mono">
                    <Badge variant={item.highlight ? 'accent' : 'secondary'} size="sm">
                      {item.category}
                    </Badge>
                    <span className="text-xs text-slate-400">{item.year}</span>
                  </div>
                </div>

                <div className="mt-4 space-y-1">
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-violet-400 font-mono font-medium">
                    {item.organization}
                  </p>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>
              </div>

              {item.link && (
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-400 hover:underline flex items-center gap-1"
                  >
                    <span>Verify Credential</span>
                    <Icons.ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
