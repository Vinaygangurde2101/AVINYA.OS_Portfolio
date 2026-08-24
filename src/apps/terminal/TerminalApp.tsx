import React, { useState, useRef, useEffect } from 'react';
import { useWindowStore } from '../../store/useWindowStore';
import { profileData } from '../../data/profile';
import { projectsData } from '../../data/projects';
import { skillsData } from '../../data/skills';
import { experienceData } from '../../data/experience';
import { achievementsData } from '../../data/achievements';
import { queryPortfolioAI } from '../../utils/aiEngine';
import { soundEngine } from '../../utils/soundEngine';
import {
  Terminal as TermIcon,
  Sparkles,
  Bot,
  ExternalLink,
  RefreshCw,
  HelpCircle,
  X,
  BookOpen,
  Palette,
  FileCode2,
  TerminalSquare
} from 'lucide-react';

type ThemeName = 'default' | 'matrix' | 'cyberpunk' | 'amber' | 'dracula';

interface HistoryLine {
  id: number;
  type: 'input' | 'output' | 'error' | 'ascii' | 'ai';
  text: string | React.ReactNode;
}

const THEME_STYLES: Record<ThemeName, { bg: string; text: string; prompt: string; accent: string; caret: string; border: string }> = {
  default: {
    bg: 'bg-slate-950',
    text: 'text-slate-200',
    prompt: 'text-cyan-400',
    accent: 'text-cyan-300',
    caret: 'caret-cyan-400',
    border: 'border-white/10'
  },
  matrix: {
    bg: 'bg-black',
    text: 'text-emerald-400',
    prompt: 'text-emerald-500',
    accent: 'text-emerald-300',
    caret: 'caret-emerald-400',
    border: 'border-emerald-500/20'
  },
  cyberpunk: {
    bg: 'bg-slate-950',
    text: 'text-pink-200',
    prompt: 'text-pink-500',
    accent: 'text-cyan-400',
    caret: 'caret-pink-400',
    border: 'border-pink-500/20'
  },
  amber: {
    bg: 'bg-neutral-950',
    text: 'text-amber-400',
    prompt: 'text-amber-500',
    accent: 'text-amber-300',
    caret: 'caret-amber-400',
    border: 'border-amber-500/20'
  },
  dracula: {
    bg: 'bg-zinc-950',
    text: 'text-purple-200',
    prompt: 'text-purple-400',
    accent: 'text-pink-400',
    caret: 'caret-purple-400',
    border: 'border-purple-500/20'
  }
};

const VIRTUAL_FILES: Record<string, string> = {
  'about.txt': 'Developer Profile & Philosophy',
  'skills.json': 'Technical Stack & Expertise Matrix',
  'projects.json': 'Featured Applications & Case Studies',
  'experience.json': 'Work & Technical Leadership Timeline',
  'contact.txt': 'Direct Email & Social Channel Links',
  'resume.pdf': 'Full Developer Resume PDF Summary',
  'achievements.md': 'Honors, Competitions & Certifications',
  'ai-assistant': 'Vinay AI Assistant Integration Specs'
};

const COMMAND_LIST = [
  'help',
  'ls',
  'dir',
  'cat',
  'pwd',
  'cd',
  'open',
  'launch',
  'ai',
  'ask',
  'about',
  'skills',
  'projects',
  'github',
  'experience',
  'contact',
  'resume',
  'achievements',
  'neofetch',
  'whoami',
  'date',
  'clear',
  'cls',
  'history',
  'theme',
  'sudo',
  'echo',
  'matrix',
  'exit',
  'man'
];

// User-friendly quick command helper presets
const QUICK_COMMAND_GROUPS = [
  {
    category: '🚀 Quick Start',
    icon: TerminalSquare,
    commands: [
      { cmd: 'help', label: 'help', desc: 'List all commands' },
      { cmd: 'ls', label: 'ls', desc: 'List files' },
      { cmd: 'neofetch', label: 'neofetch', desc: 'System specs' },
      { cmd: 'clear', label: 'clear', desc: 'Clear screen' }
    ]
  },
  {
    category: '📁 Explore Portfolio',
    icon: BookOpen,
    commands: [
      { cmd: 'about', label: 'about', desc: 'Developer bio' },
      { cmd: 'projects', label: 'projects', desc: 'Show projects' },
      { cmd: 'skills', label: 'skills', desc: 'Tech stack' },
      { cmd: 'experience', label: 'experience', desc: 'Career history' },
      { cmd: 'contact', label: 'contact', desc: 'Contact details' },
      { cmd: 'resume', label: 'resume', desc: 'Open PDF' }
    ]
  },
  {
    category: '📄 View Files (cat)',
    icon: FileCode2,
    commands: [
      { cmd: 'cat about.txt', label: 'cat about.txt', desc: 'Read bio file' },
      { cmd: 'cat projects.json', label: 'cat projects.json', desc: 'Read projects' },
      { cmd: 'cat skills.json', label: 'cat skills.json', desc: 'Read tech matrix' },
      { cmd: 'cat contact.txt', label: 'cat contact.txt', desc: 'Read contact links' }
    ]
  },
  {
    category: '🤖 Ask Vinay AI',
    icon: Bot,
    commands: [
      { cmd: 'ai What are your top AI projects?', label: 'ai Top Projects?', desc: 'Ask about AI work' },
      { cmd: 'ai What is your technical stack?', label: 'ai Tech Stack?', desc: 'Ask about tech skills' },
      { cmd: 'ai Tell me about your college & GPA', label: 'ai GPA & College', desc: 'Ask about academics' }
    ]
  },
  {
    category: '🎨 Switch Themes',
    icon: Palette,
    commands: [
      { cmd: 'theme matrix', label: 'theme matrix', desc: 'Hacker Green' },
      { cmd: 'theme cyberpunk', label: 'theme cyberpunk', desc: 'Neon Pink' },
      { cmd: 'theme amber', label: 'theme amber', desc: 'Retro Amber' },
      { cmd: 'theme dracula', label: 'theme dracula', desc: 'Deep Purple' },
      { cmd: 'theme default', label: 'theme default', desc: 'Classic Cyan' }
    ]
  }
];

export const TerminalApp: React.FC = () => {
  const openWindow = useWindowStore((s) => s.openWindow);
  const closeWindow = useWindowStore((s) => s.closeWindow);

  const [theme, setTheme] = useState<ThemeName>('default');
  const [currentDir, setCurrentDir] = useState<string>('/home/vinay');
  const [inputVal, setInputVal] = useState<string>('');
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [showHelper, setShowHelper] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const styles = THEME_STYLES[theme];

  const handleChipClick = (cmdToRun: string) => {
    soundEngine.playClick();
    setShowHelper(false);
    handleCommand(cmdToRun);
  };

  const [history, setHistory] = useState<HistoryLine[]>([
    {
      id: 1,
      type: 'output',
      text: (
        <div className="space-y-2">
          <div className="font-bold flex items-center gap-2">
            <TermIcon className="w-4 h-4 text-cyan-400 inline" />
            <span className="text-cyan-400">AVINYA.OS Shell v2.6.0</span> (x86_64-pc-avinya-os)
          </div>
          <div className="text-slate-300 text-xs">
            Welcome! Click any quick command chip below or type a command to explore:
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[
              { cmd: 'help', label: 'help' },
              { cmd: 'ls', label: 'ls' },
              { cmd: 'about', label: 'about' },
              { cmd: 'projects', label: 'projects' },
              { cmd: 'skills', label: 'skills' },
              { cmd: 'ai What are your top skills?', label: 'ai Ask AI' },
              { cmd: 'neofetch', label: 'neofetch' },
              { cmd: 'theme matrix', label: 'theme matrix' }
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  handleChipClick(chip.cmd);
                }}
                className="px-2 py-0.5 rounded bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400/40 text-cyan-200 text-[11px] font-mono transition-colors cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      )
    }
  ]);

  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Auto-scroll on output update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isAiThinking]);

  // Focus input on mount & click
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
    soundEngine.playKeyBeep();
  };

  const executeAiQuery = async (queryStr: string) => {
    if (!queryStr.trim()) return;
    setIsAiThinking(true);

    try {
      const res = await queryPortfolioAI(queryStr);
      setIsAiThinking(false);

      const aiResponseLine: HistoryLine = {
        id: Date.now(),
        type: 'ai',
        text: (
          <div className="p-3 my-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-100 font-sans text-xs space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-[11px] font-bold">
              <Bot className="w-4 h-4" />
              <span>VINAY AI ASSISTANT</span>
            </div>
            <div className="whitespace-pre-wrap leading-relaxed text-slate-200">{res.text}</div>
            {res.actions && res.actions.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-2 border-t border-cyan-500/20">
                {res.actions.map((act, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      soundEngine.playClick();
                      openWindow(act.appId, act.props);
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 text-xs transition-colors cursor-pointer"
                  >
                    <span>{act.label}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      };

      setHistory((prev) => [...prev, aiResponseLine]);
    } catch (err: any) {
      setIsAiThinking(false);
      setHistory((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: 'error',
          text: <span className="text-rose-400">AI Query Error: {err.message || 'Failed to fetch AI response'}</span>
        }
      ]);
    }
  };

  const handleCommand = (rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    // Add to history
    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const promptText = `vinay@avinya-os:${currentDir === '/home/vinay' ? '~' : currentDir}$ ${trimmed}`;
    const inputLine: HistoryLine = {
      id: Date.now(),
      type: 'input',
      text: promptText
    };

    const parts = trimmed.split(' ').filter(Boolean);
    const cmd = parts[0]?.toLowerCase();
    const args = parts.slice(1);
    const argStr = args.join(' ');

    let responseNode: React.ReactNode = null;

    if (cmd === 'help' || cmd === '?') {
      responseNode = (
        <div className="space-y-2 text-xs">
          <div className="text-cyan-400 font-bold border-b border-cyan-500/30 pb-1">AVINYA.OS COMMAND DIRECTORY:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-slate-300">
            <div><span className="text-cyan-300 font-bold inline-block w-24">help / ?</span> Display system command reference</div>
            <div><span className="text-cyan-300 font-bold inline-block w-24">ls / dir</span> List virtual file directory</div>
            <div><span className="text-cyan-300 font-bold inline-block w-24">cat &lt;file&gt;</span> Read file contents in terminal</div>
            <div><span className="text-cyan-300 font-bold inline-block w-24">open &lt;app&gt;</span> Open GUI app window</div>
            <div><span className="text-cyan-300 font-bold inline-block w-24">ai &lt;prompt&gt;</span> Query Vinay AI assistant</div>
            <div><span className="text-cyan-300 font-bold inline-block w-24">about</span> View developer bio & philosophy</div>
            <div><span className="text-cyan-300 font-bold inline-block w-24">skills</span> Display technical skills matrix</div>
            <div><span className="text-cyan-300 font-bold inline-block w-24">projects</span> List portfolio apps & features</div>
            <div><span className="text-cyan-300 font-bold inline-block w-24">experience</span> Show career timeline & impact</div>
            <div><span className="text-cyan-300 font-bold inline-block w-24">contact</span> Display email & social links</div>
            <div><span className="text-cyan-300 font-bold inline-block w-24">resume</span> Open resume document window</div>
            <div><span className="text-cyan-300 font-bold inline-block w-24">achievements</span> View awards & certifications</div>
            <div><span className="text-cyan-300 font-bold inline-block w-24">theme &lt;name&gt;</span> Switch theme (default, matrix, cyberpunk, amber, dracula)</div>
            <div><span className="text-cyan-300 font-bold inline-block w-24">neofetch</span> Print hardware & OS specifications</div>
            <div><span className="text-cyan-300 font-bold inline-block w-24">whoami</span> Show active session identity</div>
            <div><span className="text-cyan-300 font-bold inline-block w-24">date</span> Print current system clock</div>
            <div><span className="text-cyan-300 font-bold inline-block w-24">pwd / cd</span> Working directory commands</div>
            <div><span className="text-cyan-300 font-bold inline-block w-24">history</span> View command execution log</div>
            <div><span className="text-cyan-300 font-bold inline-block w-24">clear / cls</span> Clear terminal output buffer</div>
            <div><span className="text-cyan-300 font-bold inline-block w-24">exit</span> Close terminal window</div>
          </div>
        </div>
      );
    } else if (cmd === 'ls' || cmd === 'dir') {
      responseNode = (
        <div className="space-y-1">
          <div className="text-slate-400 text-[11px]">Directory listing for <span className="text-cyan-300">{currentDir}</span>:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {Object.entries(VIRTUAL_FILES).map(([filename, desc]) => (
              <div key={filename} className="flex items-baseline gap-2">
                <span className={filename.endsWith('.json') ? 'text-violet-400 font-bold' : filename.endsWith('.pdf') ? 'text-rose-400 font-bold' : filename.endsWith('.md') ? 'text-emerald-400 font-bold' : 'text-cyan-300 font-bold'}>
                  {filename}
                </span>
                <span className="text-slate-400 text-[11px] truncate">— {desc}</span>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (cmd === 'cat') {
      const filename = args[0]?.toLowerCase();
      if (!filename) {
        responseNode = <span className="text-rose-400">Usage: cat &lt;filename&gt; (e.g. cat about.txt, cat skills.json)</span>;
      } else if (filename === 'about.txt') {
        const gpaStat = profileData.stats.find((s) => s.label.includes('GPA'))?.value || '8.46 / 10';
        responseNode = (
          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded text-xs space-y-1 text-slate-200">
            <div className="text-cyan-400 font-bold">{profileData.name} — {profileData.title}</div>
            <div>Location: {profileData.location} | Status: {profileData.status}</div>
            <div>GPA: {gpaStat}</div>
            <div>Philosophy: "{profileData.philosophy}"</div>
            <div className="text-slate-400 text-[11px] pt-1">Type 'open about' to view the full desktop GUI window.</div>
          </div>
        );
      } else if (filename === 'skills.json') {
        responseNode = (
          <div className="space-y-2 text-xs">
            <div className="text-cyan-400 font-bold">TECHNICAL SKILLS MATRIX:</div>
            {skillsData.map((cat, i) => (
              <div key={i} className="pl-2 border-l-2 border-cyan-500/40">
                <span className="text-violet-400 font-bold">{cat.category}:</span>{' '}
                <span className="text-slate-300">{cat.skills.map((s) => s.name).join(', ')}</span>
              </div>
            ))}
          </div>
        );
      } else if (filename === 'projects.json') {
        responseNode = (
          <div className="space-y-2 text-xs">
            <div className="text-cyan-400 font-bold">FEATURED PORTFOLIO PROJECTS:</div>
            {projectsData.map((p, i) => (
              <div key={i} className="p-2 bg-slate-900/40 rounded border border-slate-800">
                <div className="text-cyan-300 font-bold">{p.title} <span className="text-slate-400 text-[10px]">({p.category})</span></div>
                <div className="text-slate-300 text-[11px]">{p.shortDescription}</div>
                <div className="text-violet-400 text-[10px] pt-1 font-mono">Tech: {p.technologies.join(', ')}</div>
              </div>
            ))}
          </div>
        );
      } else if (filename === 'experience.json') {
        responseNode = (
          <div className="space-y-1.5 text-xs">
            <div className="text-cyan-400 font-bold">CAREER HISTORY & LEADERSHIP:</div>
            {experienceData.map((exp, i) => (
              <div key={i} className="pl-2 border-l-2 border-violet-500/40 text-slate-300">
                <div className="text-violet-300 font-bold">{exp.role} @ {exp.company}</div>
                <div className="text-slate-400 text-[11px]">{exp.period} | {exp.location}</div>
              </div>
            ))}
          </div>
        );
      } else if (filename === 'contact.txt') {
        responseNode = (
          <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800 text-xs space-y-1 text-slate-200">
            <div>Email: <span className="text-cyan-300">{profileData.socials.email}</span></div>
            <div>GitHub: <span className="text-cyan-300">{profileData.socials.github}</span></div>
            <div>LinkedIn: <span className="text-cyan-300">{profileData.socials.linkedin}</span></div>
          </div>
        );
      } else if (filename === 'resume.pdf') {
        openWindow('resume');
        responseNode = 'Opening Resume PDF document viewer window...';
      } else if (filename === 'achievements.md') {
        responseNode = (
          <div className="space-y-1 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold">HONORS & ACHIEVEMENTS:</div>
            {achievementsData.map((ach, i) => (
              <div key={i}>• <span className="text-yellow-400 font-bold">{ach.title}</span> ({ach.organization}) — {ach.year}</div>
            ))}
          </div>
        );
      } else if (filename === 'ai-assistant') {
        responseNode = 'Vinay AI Assistant: Powered by Gemini & zero-latency local portfolio engine. Type "ai <query>" to interact!';
      } else {
        responseNode = <span className="text-rose-400">cat: {filename}: No such file or directory. Type 'ls' to view files.</span>;
      }
    } else if (cmd === 'pwd') {
      responseNode = currentDir;
    } else if (cmd === 'cd') {
      const dest = args[0];
      if (!dest || dest === '~' || dest === '/home/vinay') {
        setCurrentDir('/home/vinay');
        responseNode = 'Changed directory to /home/vinay';
      } else if (dest === '..') {
        setCurrentDir('/home');
        responseNode = 'Changed directory to /home';
      } else {
        responseNode = `cd: no such file or directory: ${dest}`;
      }
    } else if (cmd === 'open' || cmd === 'launch') {
      const targetApp = args[0]?.toLowerCase();
      const validApps: Record<string, string> = {
        about: 'about',
        projects: 'projects',
        skills: 'skills',
        experience: 'experience',
        achievements: 'achievements',
        resume: 'resume',
        contact: 'contact',
        browser: 'browser',
        settings: 'settings',
        ai: 'ai-assistant',
        'ai-assistant': 'ai-assistant',
        terminal: 'terminal'
      };

      if (!targetApp || !validApps[targetApp]) {
        responseNode = (
          <span className="text-rose-400">
            Usage: open &lt;app_id&gt;. Available apps: about, projects, skills, experience, achievements, resume, contact, browser, settings, ai
          </span>
        );
      } else {
        openWindow(validApps[targetApp]);
        responseNode = `Launching ${validApps[targetApp]} application...`;
      }
    } else if (cmd === 'ai' || cmd === 'ask') {
      if (!argStr) {
        responseNode = <span className="text-rose-400">Usage: ai &lt;your question&gt; (e.g. ai What are your top backend skills?)</span>;
      } else {
        setHistory((prev) => [...prev, inputLine]);
        setInputVal('');
        executeAiQuery(argStr);
        return;
      }
    } else if (cmd === 'theme') {
      const newTheme = args[0]?.toLowerCase() as ThemeName;
      if (!newTheme || !THEME_STYLES[newTheme]) {
        responseNode = (
          <span className="text-rose-400">
            Usage: theme &lt;name&gt;. Available themes: default, matrix, cyberpunk, amber, dracula
          </span>
        );
      } else {
        setTheme(newTheme);
        soundEngine.playNotification();
        responseNode = `Terminal color theme updated to '${newTheme}'.`;
      }
    } else if (cmd === 'about') {
      openWindow('about');
      responseNode = `Opening About app... [${profileData.name} — ${profileData.role}]`;
    } else if (cmd === 'skills') {
      openWindow('skills');
      responseNode = (
        <div className="font-mono text-xs text-slate-300 space-y-1">
          <div className="text-cyan-400 font-bold mb-1">TECHNICAL STACK OVERVIEW:</div>
          {skillsData.map((g, i) => (
            <div key={i}>
              <span className="text-violet-400 font-bold">{g.category}:</span>{' '}
              {g.skills.map((s) => s.name).join(', ')}
            </div>
          ))}
        </div>
      );
    } else if (cmd === 'projects') {
      openWindow('projects');
      responseNode = (
        <div className="font-mono text-xs space-y-2">
          <div className="text-cyan-400 font-bold">PORTFOLIO PROJECTS & GITHUB REPOSITORIES:</div>
          {projectsData.map((p, i) => (
            <div key={i} className="p-2 rounded bg-slate-900/60 border border-slate-800 text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-cyan-300 font-bold">• {p.title}</span>
                <span className="text-violet-400 text-[10px]">{p.category}</span>
              </div>
              <div className="text-slate-400 text-[11px] mt-0.5">{p.shortDescription}</div>
              {p.githubUrl && (
                <div className="text-[11px] text-sky-400 font-mono mt-1">
                  Repo: <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-300">{p.githubUrl}</a>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    } else if (cmd === 'github' || cmd === 'repos') {
      responseNode = (
        <div className="font-mono text-xs space-y-2">
          <div className="text-cyan-400 font-bold">GITHUB PROFILE & PROJECT REPOSITORIES:</div>
          <div className="text-slate-200">
            Profile: <a href={profileData.socials.github} target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">{profileData.socials.github}</a>
          </div>
          <div className="space-y-1.5 pt-1">
            {projectsData.map((p, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-slate-200 font-bold">{p.title}</span>
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-200 underline text-[11px]">
                    {p.githubUrl}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    } else if (cmd === 'experience') {
      openWindow('experience');
      responseNode = (
        <div className="font-mono text-xs space-y-1">
          <div className="text-cyan-400 font-bold">CAREER HISTORY:</div>
          {experienceData.map((exp, i) => (
            <div key={i} className="text-slate-300">
              • <span className="text-violet-300 font-bold">{exp.role}</span> @ {exp.company} ({exp.period})
            </div>
          ))}
        </div>
      );
    } else if (cmd === 'contact') {
      openWindow('contact');
      responseNode = `Email: ${profileData.socials.email} | GitHub: ${profileData.socials.github} | LinkedIn: ${profileData.socials.linkedin}`;
    } else if (cmd === 'resume') {
      openWindow('resume');
      responseNode = 'Opening Resume PDF viewer window...';
    } else if (cmd === 'achievements') {
      openWindow('achievements');
      responseNode = 'Opening Achievements & Badges window...';
    } else if (cmd === 'whoami') {
      responseNode = `visitor@avinya-os (Authenticated Recruiter / Developer Persona)`;
    } else if (cmd === 'date') {
      responseNode = new Date().toString();
    } else if (cmd === 'history') {
      responseNode = (
        <div className="space-y-0.5 text-xs text-slate-300">
          <div className="text-cyan-400 font-bold mb-1">COMMAND HISTORY:</div>
          {cmdHistory.map((c, i) => (
            <div key={i}>
              <span className="text-slate-500 w-8 inline-block">{i + 1}</span>
              <span>{c}</span>
            </div>
          ))}
        </div>
      );
    } else if (cmd === 'clear' || cmd === 'cls') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (cmd === 'neofetch') {
      responseNode = (
        <pre className="font-mono text-[11px] leading-tight text-cyan-400 select-text">
{`
        .----.        OS: AVINYA.OS v2.6 x86_64
       /   __ \\       Host: Vinay Gangurde Workstation
      |  /    |       Kernel: 6.8.0-react-vite
      |  \\___/        Uptime: 99.98%
       \\____/         Shell: ZSH / AVINYA-Terminal
                      Packages: Java Spring Boot, React, Node.js, Python AI
                      WM: Windows 11 Acrylic Glass-WM
                      CPU: Intel / Java Virtual Machine
                      Memory: 16GB Dual-Channel System RAM
`}
        </pre>
      );
    } else if (cmd === 'sudo') {
      soundEngine.playNotification();
      if (argStr.includes('make-me-famous')) {
        responseNode = (
          <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400 text-cyan-200 font-mono text-xs">
            <Sparkles className="w-5 h-5 text-cyan-400 inline mr-2" />
            ✨ UNLOCKED EASTER EGG! You are now granted full administrative access to Vinay Shivdas Gangurde's universe.
          </div>
        );
      } else if (argStr.includes('rm -rf') || argStr.includes('rm')) {
        soundEngine.playNotification();
        responseNode = <span className="text-rose-400 font-bold">Permission Denied: Nice try! AVINYA.OS system files are write-protected.</span>;
      } else {
        responseNode = <span className="text-amber-300">sudo: user 'visitor' is not in the sudoers file. This incident will be reported.</span>;
      }
    } else if (cmd === 'matrix') {
      soundEngine.playNotification();
      responseNode = (
        <div className="text-emerald-400 font-mono text-xs space-y-1 p-2 bg-black rounded border border-emerald-500/40">
          <div>01000001 01010110 01001001 01001110 01011001 01000001 00101110 01001111 01010011</div>
          <div className="text-emerald-300 font-bold">💚 MATRIX CODE MODE ENGAGED. Welcome to Vinay's Digital Reality.</div>
        </div>
      );
    } else if (cmd === 'echo') {
      responseNode = argStr;
    } else if (cmd === 'exit' || cmd === 'quit') {
      closeWindow('terminal');
      return;
    } else if (cmd === 'man') {
      const topic = args[0]?.toLowerCase();
      if (topic && COMMAND_LIST.includes(topic)) {
        responseNode = `Manual entry for '${topic}': Executes system command in AVINYA.OS CLI shell environment.`;
      } else {
        responseNode = `No manual entry for ${topic || 'unspecified command'}`;
      }
    } else {
      soundEngine.playNotification();
      responseNode = (
        <span className="text-rose-400">
          zsh: command not found: {trimmed}. Type 'help' for available commands.
        </span>
      );
    }

    setHistory((prev) => [
      ...prev,
      inputLine,
      { id: Date.now() + 1, type: 'output', text: responseNode }
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const trimmed = inputVal.trimStart();
      if (!trimmed) return;

      const matches = COMMAND_LIST.filter((c) => c.startsWith(trimmed.toLowerCase()));
      if (matches.length === 1) {
        setInputVal(matches[0] + ' ');
      } else if (matches.length > 1) {
        soundEngine.playClick();
        setHistory((prev) => [
          ...prev,
          { id: Date.now(), type: 'input', text: `vinay@avinya-os:~$ ${inputVal}` },
          { id: Date.now() + 1, type: 'output', text: <div className="text-slate-400 text-xs">{matches.join('   ')}</div> }
        ]);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(cmdHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
      e.preventDefault();
      setHistory([]);
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
      e.preventDefault();
      setHistory((prev) => [
        ...prev,
        { id: Date.now(), type: 'input', text: `vinay@avinya-os:~$ ${inputVal}^C` }
      ]);
      setInputVal('');
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={`relative h-full ${styles.bg} ${styles.text} font-mono text-xs p-4 rounded-xl flex flex-col justify-between overflow-hidden cursor-text select-text transition-colors duration-300`}
    >
      {/* Discreet Corner Quick Command Helper Button */}
      <div className="absolute top-3 right-3 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            soundEngine.playClick();
            setShowHelper((prev) => !prev);
          }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 hover:text-cyan-100 text-xs font-sans font-medium backdrop-blur-md transition-all cursor-pointer shadow-lg active:scale-95"
          title="Quick Commands Helper Guide"
        >
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Commands</span>
        </button>
      </div>

      {/* Popover Quick Command Helper Panel */}
      {showHelper && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-x-3 top-12 z-30 max-h-[80%] overflow-y-auto p-4 rounded-xl bg-slate-900/95 border border-cyan-500/40 text-slate-100 shadow-2xl backdrop-blur-xl space-y-4 font-sans text-xs animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold font-mono">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>QUICK COMMAND HELPER GUIDE</span>
            </div>
            <button
              onClick={() => setShowHelper(false)}
              className="p-1 text-slate-400 hover:text-white rounded-full hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-slate-300 text-[11px]">
            Click any command button below to run it instantly in your terminal:
          </p>

          <div className="space-y-3">
            {QUICK_COMMAND_GROUPS.map((group, gIdx) => {
              const IconComp = group.icon;
              return (
                <div key={gIdx} className="space-y-1.5">
                  <div className="text-cyan-300 font-bold flex items-center gap-1.5 text-[11px] font-mono">
                    <IconComp className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{group.category}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {group.commands.map((c, cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => handleChipClick(c.cmd)}
                        className="flex items-center justify-between p-2 rounded bg-slate-800/80 hover:bg-cyan-950/60 border border-slate-700 hover:border-cyan-400/50 text-left transition-all group cursor-pointer"
                      >
                        <span className="font-mono text-cyan-300 group-hover:text-cyan-200 font-bold text-[11px]">
                          {c.label}
                        </span>
                        <span className="text-slate-400 text-[10px] truncate pl-2">{c.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Scrollable History Output Area */}
      <div ref={containerRef} className="space-y-3 flex-1 overflow-y-auto pr-1">
        {history.map((line) => (
          <div key={line.id}>
            {line.type === 'input' ? (
              <div className={`${styles.prompt} font-bold`}>{line.text}</div>
            ) : (
              <div>{line.text}</div>
            )}
          </div>
        ))}

        {isAiThinking && (
          <div className="flex items-center gap-2 text-cyan-400 animate-pulse text-xs py-1">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Vinay AI Assistant is computing response...</span>
          </div>
        )}

        {/* Mobile Touch Quick Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-[11px] sm:hidden">
          {['help', 'ls', 'about', 'projects', 'skills', 'contact', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={(e) => {
                e.stopPropagation();
                handleChipClick(cmd);
              }}
              className="px-2 py-0.5 rounded bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400/40 text-cyan-200 font-mono text-[10px] shrink-0"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Input Prompt Line inside scroll container */}
        <div className={`flex items-center gap-2 pt-2 border-t ${styles.border} mt-2`}>
          <span className={`${styles.prompt} font-bold shrink-0 text-[11px] sm:text-xs`}>
            vinay@avinya-os:{currentDir === '/home/vinay' ? '~' : currentDir}$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            autoFocus
            className={`w-full bg-transparent outline-none font-mono text-[11px] sm:text-xs ${styles.text} ${styles.caret}`}
            placeholder="Type command..."
          />
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
  );
};


