import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchStore } from '../../store/useSearchStore';
import { useWindowStore } from '../../store/useWindowStore';
import { projectsData } from '../../data/projects';
import { skillsData } from '../../data/skills';
import { profileData } from '../../data/profile';
import { Search, FolderGit2, Cpu, FileText, User, Mail, Terminal, ExternalLink, ArrowRight, Bot } from 'lucide-react';
import { AppId } from '../../types/window';

interface SearchItem {
  id: string;
  title: string;
  category: 'App' | 'Project' | 'Skill' | 'Social';
  icon: any;
  action: () => void;
  subtitle?: string;
}

export const CommandPalette: React.FC = () => {
  const isOpen = useSearchStore((s) => s.isOpen);
  const closeSearch = useSearchStore((s) => s.closeSearch);
  const query = useSearchStore((s) => s.query);
  const setQuery = useSearchStore((s) => s.setQuery);

  const openWindow = useWindowStore((s) => s.openWindow);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Global keybind listener for Cmd+K / Ctrl+K & Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        useSearchStore.getState().toggleSearch();
      } else if (e.key === 'Escape' && isOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeSearch]);

  const searchItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [
      { id: 'app-ai-assistant', title: 'Ask Vinay AI Assistant', category: 'App', icon: Bot, subtitle: 'Grounded LLM portfolio chatbot', action: () => openWindow('ai-assistant') },
      { id: 'app-about', title: 'About Me', category: 'App', icon: User, subtitle: 'Profile, philosophy & current focus', action: () => openWindow('about') },
      { id: 'app-projects', title: 'Projects Explorer', category: 'App', icon: FolderGit2, subtitle: 'View all case studies & demos', action: () => openWindow('projects') },
      { id: 'app-skills', title: 'Skills & Stack', category: 'App', icon: Cpu, subtitle: 'Frontend, backend, graphics & tools', action: () => openWindow('skills') },
      { id: 'app-resume', title: 'Resume PDF', category: 'App', icon: FileText, subtitle: 'Download resume document', action: () => openWindow('resume') },
      { id: 'app-contact', title: 'Contact Direct', category: 'App', icon: Mail, subtitle: 'Send a direct message', action: () => openWindow('contact') },
      { id: 'app-terminal', title: 'Terminal Shell', category: 'App', icon: Terminal, subtitle: 'Developer command prompt', action: () => openWindow('terminal') },
      { id: 'app-arcade', title: 'Avinya Arcade Game Center', category: 'App', icon: Bot, subtitle: 'Cyberpunk mini-games & high score badges', action: () => openWindow('arcade') },
      { id: 'app-architecture', title: 'System Architecture Graph', category: 'App', icon: FolderGit2, subtitle: 'Microservices & AI topology node graph', action: () => openWindow('architecture') },
    ];

    // Add Projects & GitHub Repo Links
    projectsData.forEach((proj) => {
      items.push({
        id: `proj-${proj.id}`,
        title: proj.title,
        category: 'Project',
        icon: FolderGit2,
        subtitle: `${proj.category} • ${proj.technologies.join(', ')}`,
        action: () => openWindow('project-details', { projectId: proj.id }, `${proj.title} Case Study`)
      });

      if (proj.githubUrl) {
        items.push({
          id: `github-repo-${proj.id}`,
          title: `GitHub Repo: ${proj.title}`,
          category: 'Social',
          icon: ExternalLink,
          subtitle: proj.githubUrl,
          action: () => window.open(proj.githubUrl, '_blank')
        });
      }
    });

    // Add Key Skills
    skillsData.forEach((group) => {
      group.skills.forEach((sk) => {
        if (sk.highlight) {
          items.push({
            id: `skill-${sk.name}`,
            title: sk.name,
            category: 'Skill',
            icon: Cpu,
            subtitle: `${sk.category} • ${sk.level} Proficiency`,
            action: () => openWindow('skills')
          });
        }
      });
    });

    // Add External Socials
    items.push({
      id: 'social-github',
      title: 'Vinay GitHub Profile (Vinaygangurde2101)',
      category: 'Social',
      icon: ExternalLink,
      subtitle: profileData.socials.github,
      action: () => window.open(profileData.socials.github, '_blank')
    });

    return items;
  }, [openWindow]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return searchItems.slice(0, 8);
    const q = query.toLowerCase();
    return searchItems.filter(
      (item) => item.title.toLowerCase().includes(q) || (item.subtitle && item.subtitle.toLowerCase().includes(q))
    );
  }, [query, searchItems]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === 'Enter' && filteredResults[selectedIndex]) {
      e.preventDefault();
      filteredResults[selectedIndex].action();
      closeSearch();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-start justify-center pt-20 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="w-full max-w-2xl rounded-2xl glass-panel border border-cyan-500/30 overflow-hidden shadow-2xl text-slate-100 font-sans"
          >
            {/* Input Bar */}
            <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-slate-900/90">
              <Search className="w-5 h-5 text-cyan-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search portfolio..."
                autoFocus
                className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm outline-none font-medium"
              />
              <kbd className="px-2 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-white/10">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-96 overflow-y-auto p-2 space-y-1">
              {filteredResults.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-400 font-mono">
                  No matching results found for "{query}".
                </div>
              ) : (
                filteredResults.map((item, idx) => {
                  const IconComponent = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        item.action();
                        closeSearch();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left ${
                        isSelected
                          ? 'bg-cyan-500/20 border border-cyan-400/40 text-white shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                          : 'hover:bg-white/5 border border-transparent text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div
                          className={`p-2 rounded-lg ${
                            isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-cyan-400 border border-white/10'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-semibold">{item.title}</div>
                          {item.subtitle && (
                            <div className="text-[11px] text-slate-400 truncate">{item.subtitle}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                          {item.category}
                        </span>
                        {isSelected && <ArrowRight className="w-4 h-4 text-cyan-400" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
