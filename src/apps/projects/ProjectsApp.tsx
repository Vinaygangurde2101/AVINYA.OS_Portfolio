import React, { useState, useMemo } from 'react';
import { projectsData } from '../../data/projects';
import { useWindowStore } from '../../store/useWindowStore';
import { Badge } from '../../components/common/Badge';
import { FolderGit2, Search, LayoutGrid, List, ArrowUpRight, Github, ExternalLink } from 'lucide-react';

export const ProjectsApp: React.FC = () => {
  const openWindow = useWindowStore((s) => s.openWindow);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All', 'Full-Stack', 'Creative Tech', 'AI / Machine Learning'];

  const filteredProjects = useMemo(() => {
    return projectsData.filter((proj) => {
      const matchCat = selectedCategory === 'All' || proj.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchQuery =
        !q ||
        proj.title.toLowerCase().includes(q) ||
        proj.shortDescription.toLowerCase().includes(q) ||
        proj.technologies.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenProject = (id: string, title: string) => {
    openWindow(`project-details:${id}`, { projectId: id }, `${title} — Case Study`);
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto pb-4 select-none">
      {/* Path Breadcrumb & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-300">
          <FolderGit2 className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-500">/home/vinay/</span>
          <span className="text-cyan-400 font-semibold">projects</span>
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-400">
            {filteredProjects.length} items
          </span>
        </div>

        {/* View mode & Search */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950/80 border border-white/10 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center p-0.5 rounded-lg bg-slate-950/80 border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.15)] font-semibold'
                : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Container (Grid Mode) */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleOpenProject(project.id, project.title)}
              className="group relative rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-400/40 overflow-hidden shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Header */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <Badge variant="primary" size="sm">
                      {project.category}
                    </Badge>
                    <span className="px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-mono text-slate-300 border border-white/10">
                      {project.year}
                    </span>
                  </div>

                  {project.featured && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/40 text-[10px] font-mono text-violet-300">
                      ★ Featured Case
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-sans">
                    {project.shortDescription}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-500">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action bar */}
              <div className="px-5 py-3 border-t border-white/5 bg-slate-950/50 flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 group-hover:underline">Read Case Study →</span>
                <div className="flex items-center gap-2 text-slate-400">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10 hover:border-cyan-400/50 transition-colors flex items-center gap-1.5"
                      title="View GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-[11px]">GitHub Repo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List Mode */
        <div className="space-y-2">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleOpenProject(project.id, project.title)}
              className="p-4 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-400/40 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900 transition-all group"
            >
              <div className="flex items-center gap-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-12 h-12 rounded-lg object-cover border border-white/10"
                />
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                    {project.title}
                    <Badge variant="secondary" size="sm">
                      {project.category}
                    </Badge>
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-1 font-sans">{project.shortDescription}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-white/10 hover:border-cyan-400 flex items-center gap-1.5 transition-all text-xs"
                    title="View GitHub Repository"
                  >
                    <Github className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="hidden sm:inline">GitHub Repo</span>
                  </a>
                )}
                <span className="text-cyan-400 group-hover:underline">View Study →</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
