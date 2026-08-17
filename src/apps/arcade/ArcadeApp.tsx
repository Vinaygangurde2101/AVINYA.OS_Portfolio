import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '../../store/useWindowStore';
import { soundEngine } from '../../utils/soundEngine';
import {
  Gamepad2,
  Trophy,
  Sparkles,
  Award,
  Download,
  Mail,
  Grid,
  RotateCcw,
  Bug,
  Network,
  CheckCircle2,
  XCircle,
  Zap,
  ChevronRight,
  HelpCircle,
  Layers,
  Cpu,
  ShieldCheck
} from 'lucide-react';

type TabType = 'memory' | 'bug-hunter' | 'architecture';

// --- GAME 1: MEMORY MATCH DATA ---
interface MemoryCard {
  id: number;
  icon: string;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const TECH_MEMORY_ITEMS = [
  { icon: '☕', name: 'Java Spring' },
  { icon: '⚛️', name: 'React' },
  { icon: '🐍', name: 'Python ML' },
  { icon: '🤖', name: 'Hugging Face' },
  { icon: '🐳', name: 'Docker' },
  { icon: '🍃', name: 'MongoDB' }
];

// --- GAME 2: BUG HUNTER DATA ---
interface BugQuestion {
  id: number;
  title: string;
  language: string;
  code: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const BUG_QUESTIONS: BugQuestion[] = [
  {
    id: 1,
    title: 'React Stale Closure & Memory Leak',
    language: 'TypeScript / React',
    code: `useEffect(() => {
  const timer = setInterval(() => {
    setCount(count + 1); // 🐛 Bug here!
  }, 1000);
  return () => clearInterval(timer);
}, []);`,
    options: [
      'Missing cleanup return function in useEffect',
      'Using count directly without functional updater set((c) => c + 1)',
      'setInterval cannot be used inside React hooks',
      'The array dependency should be [setInterval]'
    ],
    correctIndex: 1,
    explanation:
      'Because count is captured in closure with [] dependency, setCount(count + 1) will repeatedly add 1 to the initial state (0), causing stale state!'
  },
  {
    id: 2,
    title: 'Java String Comparison Trap',
    language: 'Java / Spring Boot',
    code: `public boolean verifyToken(String userToken, String envToken) {
  if (userToken == envToken) { // 🐛 Bug here!
    return true;
  }
  return false;
}`,
    options: [
      '== compares object references instead of string value content (.equals())',
      'Java methods cannot return primitive booleans',
      'userToken must be cast to StringBuilder first',
      'Spring Boot requires @Autowired for String variables'
    ],
    correctIndex: 0,
    explanation:
      'In Java, == checks memory references! String contents should always be compared using .equals() or Objects.equals().'
  },
  {
    id: 3,
    title: 'SQL Injection Security Vulnerability',
    language: 'SQL / Node / Java',
    code: `String query = "SELECT * FROM users WHERE email = '" 
               + userInput 
               + "' AND status = 'ACTIVE'";`,
    options: [
      'SQL queries cannot contain single quotes',
      'String concatenation allows malicious SQL Injection payloads',
      'WHERE clause must always come after GROUP BY',
      'SELECT * is forbidden in production databases'
    ],
    correctIndex: 1,
    explanation:
      'Concatenating raw user input directly into SQL strings exposes your app to SQL Injection! Use parameterized queries / PreparedStatements instead.'
  },
  {
    id: 4,
    title: 'Python Mutable Default Parameter',
    language: 'Python',
    code: `def append_event(event, event_log=[]): # 🐛 Bug here!
    event_log.append(event)
    return event_log`,
    options: [
      'Mutable default argument [] is created once and shared across all calls',
      'Python functions require return type annotations',
      'append() creates a new list without modifying event_log',
      'event parameter must be enclosed in quotes'
    ],
    correctIndex: 0,
    explanation:
      'In Python, default arguments are evaluated ONCE at function definition time! Use default=None and initialize event_log inside the function.'
  }
];

// --- GAME 3: ARCHITECTURE BUILDER DATA ---
interface ArchScenario {
  id: number;
  title: string;
  description: string;
  targetStack: {
    frontend: string;
    backend: string;
    database: string;
    cacheOrVector: string;
  };
  options: {
    frontend: string[];
    backend: string[];
    database: string[];
    cacheOrVector: string[];
  };
}

const ARCH_SCENARIOS: ArchScenario[] = [
  {
    id: 1,
    title: 'High-Concurrency Real-Time Chat & Collaboration',
    description: 'Design a system that handles 100k+ concurrent WebSockets with ultra-low latency messaging.',
    targetStack: {
      frontend: 'React + WebSockets',
      backend: 'Node.js / Go',
      database: 'PostgreSQL',
      cacheOrVector: 'Redis Pub/Sub'
    },
    options: {
      frontend: ['React + WebSockets', 'Static HTML/jQuery', 'PHP Blade Templates'],
      backend: ['Node.js / Go', 'PHP Synchronous Script', 'Python CGI'],
      database: ['PostgreSQL', 'SQLite File DB', 'Flat JSON Files'],
      cacheOrVector: ['Redis Pub/Sub', 'Browser LocalStorage', 'No Cache']
    }
  },
  {
    id: 2,
    title: 'Enterprise AI RAG Document Search Platform',
    description: 'Build an AI solution that indexes 10,000+ PDFs and performs semantic vector search with LLMs.',
    targetStack: {
      frontend: 'Next.js / React',
      backend: 'Python FastAPI',
      database: 'PostgreSQL + pgvector',
      cacheOrVector: 'Qdrant / Pinecone'
    },
    options: {
      frontend: ['Next.js / React', 'Flash ActionScript', 'Plain Text Output'],
      backend: ['Python FastAPI', 'Wordpress PHP', 'Batch Bash Script'],
      database: ['PostgreSQL + pgvector', 'CSV Files', 'Microsoft Access'],
      cacheOrVector: ['Qdrant / Pinecone', 'Browser Cache', 'Text Search Index']
    }
  }
];

export const ArcadeApp: React.FC = () => {
  const openWindow = useWindowStore((s) => s.openWindow);
  const [activeTab, setActiveTab] = useState<TabType>('memory');

  // Global XP & Badges
  const [totalXP, setTotalXP] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('avinya_arcade_xp') || '0', 10);
    } catch (e) {
      return 0;
    }
  });

  const [unlockedReward, setUnlockedReward] = useState<boolean>(false);

  const addXP = (amount: number) => {
    setTotalXP((prev) => {
      const next = prev + amount;
      try {
        localStorage.setItem('avinya_arcade_xp', next.toString());
      } catch (e) {}
      return next;
    });
    setUnlockedReward(true);
  };

  // --- MEMORY MATCH STATE ---
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState<number>(0);
  const [isMemoryWon, setIsMemoryWon] = useState<boolean>(false);
  const [bestMoves, setBestMoves] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('avinya_arcade_best_moves') || '999', 10);
    } catch (e) {
      return 999;
    }
  });

  const initMemoryGame = () => {
    soundEngine.playClick();
    const paired = [...TECH_MEMORY_ITEMS, ...TECH_MEMORY_ITEMS];
    const shuffled = paired
      .sort(() => Math.random() - 0.5)
      .map((item, idx) => ({
        id: idx,
        icon: item.icon,
        name: item.name,
        isFlipped: false,
        isMatched: false
      }));

    setCards(shuffled);
    setFlippedIndices([]);
    setMemoryMoves(0);
    setIsMemoryWon(false);
  };

  useEffect(() => {
    initMemoryGame();
  }, []);

  const handleCardClick = (idx: number) => {
    if (cards[idx].isFlipped || cards[idx].isMatched || flippedIndices.length >= 2) return;

    soundEngine.playClick();
    const nextCards = [...cards];
    nextCards[idx].isFlipped = true;
    setCards(nextCards);

    const nextFlipped = [...flippedIndices, idx];
    setFlippedIndices(nextFlipped);

    if (nextFlipped.length === 2) {
      const newMoves = memoryMoves + 1;
      setMemoryMoves(newMoves);
      const [firstIdx, secondIdx] = nextFlipped;

      if (cards[firstIdx].name === cards[secondIdx].name) {
        soundEngine.playNotification();
        setTimeout(() => {
          setCards((prev) => {
            const updated = [...prev];
            updated[firstIdx].isMatched = true;
            updated[secondIdx].isMatched = true;
            if (updated.every((c) => c.isMatched)) {
              setIsMemoryWon(true);
              addXP(50);
              if (newMoves < bestMoves) {
                setBestMoves(newMoves);
                localStorage.setItem('avinya_arcade_best_moves', newMoves.toString());
              }
            }
            return updated;
          });
          setFlippedIndices([]);
        }, 400);
      } else {
        setTimeout(() => {
          setCards((prev) => {
            const updated = [...prev];
            updated[firstIdx].isFlipped = false;
            updated[secondIdx].isFlipped = false;
            return updated;
          });
          setFlippedIndices([]);
        }, 800);
      }
    }
  };

  // --- BUG HUNTER STATE ---
  const [currentBugIdx, setCurrentBugIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [bugScore, setBugScore] = useState<number>(0);
  const [isBugFinished, setIsBugFinished] = useState<boolean>(false);

  const handleBugAnswer = (optIdx: number) => {
    if (selectedOption !== null) return;
    soundEngine.playClick();
    setSelectedOption(optIdx);

    const currentQ = BUG_QUESTIONS[currentBugIdx];
    if (optIdx === currentQ.correctIndex) {
      soundEngine.playNotification();
      setBugScore((prev) => prev + 25);
    }
  };

  const nextBugQuestion = () => {
    soundEngine.playClick();
    setSelectedOption(null);
    if (currentBugIdx + 1 < BUG_QUESTIONS.length) {
      setCurrentBugIdx((prev) => prev + 1);
    } else {
      setIsBugFinished(true);
      addXP(bugScore + 50);
    }
  };

  const resetBugHunter = () => {
    soundEngine.playClick();
    setCurrentBugIdx(0);
    setSelectedOption(null);
    setBugScore(0);
    setIsBugFinished(false);
  };

  // --- ARCHITECTURE BUILDER STATE ---
  const [archScenarioIdx, setArchScenarioIdx] = useState<number>(0);
  const [userArch, setUserArch] = useState<{
    frontend: string;
    backend: string;
    database: string;
    cacheOrVector: string;
  }>({ frontend: '', backend: '', database: '', cacheOrVector: '' });

  const [archSubmitted, setArchSubmitted] = useState<boolean>(false);

  const scenario = ARCH_SCENARIOS[archScenarioIdx];

  const handleSelectArch = (key: keyof typeof userArch, val: string) => {
    soundEngine.playClick();
    setUserArch((prev) => ({ ...prev, [key]: val }));
  };

  const checkArchFit = () => {
    soundEngine.playNotification();
    setArchSubmitted(true);
    let matchCount = 0;
    if (userArch.frontend === scenario.targetStack.frontend) matchCount++;
    if (userArch.backend === scenario.targetStack.backend) matchCount++;
    if (userArch.database === scenario.targetStack.database) matchCount++;
    if (userArch.cacheOrVector === scenario.targetStack.cacheOrVector) matchCount++;

    if (matchCount === 4) {
      addXP(100);
    }
  };

  const resetArchBuilder = () => {
    soundEngine.playClick();
    setUserArch({ frontend: '', backend: '', database: '', cacheOrVector: '' });
    setArchSubmitted(false);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#070b16] text-slate-100 font-sans select-none overflow-hidden relative">
      {/* Arcade Top Control Header */}
      <div className="px-4 py-3 bg-slate-900/90 border-b border-purple-500/30 flex items-center justify-between gap-3 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-wide">AVINYA DEV ARCADE HUB</h2>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold">
                MULTI-GAME SHOWCASE
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Play memory, bug-hunting & system design games to unlock candidate badges!</p>
          </div>
        </div>

        {/* Global XP Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/40 text-purple-300 font-mono text-xs">
            <Zap className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
            <span>XP: {totalXP}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 font-mono text-xs">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>BEST MOVES: {bestMoves === 999 ? '-' : `${bestMoves}`}</span>
          </div>
        </div>
      </div>

      {/* Arcade Game Selector Navigation Tabs */}
      <div className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-950/80 border-b border-white/10 text-xs font-medium">
        <button
          onClick={() => {
            soundEngine.playClick();
            setActiveTab('memory');
          }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
            activeTab === 'memory'
              ? 'bg-purple-600/30 border border-purple-400/60 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.3)] font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Grid className="w-4 h-4 text-purple-400" />
          <span>🧠 Memory Match</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setActiveTab('bug-hunter');
          }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
            activeTab === 'bug-hunter'
              ? 'bg-rose-600/30 border border-rose-400/60 text-rose-200 shadow-[0_0_10px_rgba(244,63,94,0.3)] font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Bug className="w-4 h-4 text-rose-400" />
          <span>🐛 Bug Hunter</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setActiveTab('architecture');
          }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
            activeTab === 'architecture'
              ? 'bg-cyan-600/30 border border-cyan-400/60 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.3)] font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Network className="w-4 h-4 text-cyan-400" />
          <span>🏗️ System Arch</span>
        </button>
      </div>

      {/* Main Game Screen Body */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col items-center justify-center space-y-4">
        {/* GAME 1: MEMORY MATCH */}
        {activeTab === 'memory' && (
          <div className="w-full max-w-md flex flex-col items-center space-y-4">
            <div className="flex items-center justify-between w-full max-w-[360px] px-2 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <Grid className="w-4 h-4" />
                <span>MOVES: {memoryMoves}</span>
              </div>
              <button
                onClick={initMemoryGame}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-200 text-xs flex items-center gap-1.5 cursor-pointer shadow transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
                <span>Reset Game</span>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3 w-full max-w-[360px]">
              {cards.map((card, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCardClick(idx)}
                  className={`aspect-square rounded-2xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                    card.isFlipped || card.isMatched
                      ? 'bg-slate-900 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : 'bg-gradient-to-br from-purple-900/60 to-slate-900 border-purple-500/40 hover:border-purple-400'
                  }`}
                >
                  {card.isFlipped || card.isMatched ? (
                    <div className="text-center animate-in zoom-in-50 duration-200">
                      <div className="text-3xl">{card.icon}</div>
                      <div className="text-[9px] font-mono text-cyan-300 font-bold mt-1 leading-none">{card.name}</div>
                    </div>
                  ) : (
                    <Sparkles className="w-6 h-6 text-purple-400/60" />
                  )}
                </motion.div>
              ))}
            </div>

            {isMemoryWon && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-400/50 rounded-xl text-emerald-200 text-xs font-mono text-center animate-bounce">
                🎉 Congratulations! You matched all tech stack cards in {memoryMoves} moves! (+50 XP)
              </div>
            )}
          </div>
        )}

        {/* GAME 2: BUG HUNTER */}
        {activeTab === 'bug-hunter' && (
          <div className="w-full max-w-lg space-y-4">
            {!isBugFinished ? (
              <div className="p-4 bg-slate-900/90 border border-rose-500/30 rounded-2xl backdrop-blur-md space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-rose-500/20 border border-rose-400/40 text-rose-300 font-mono text-xs font-bold">
                    QUESTION {currentBugIdx + 1} OF {BUG_QUESTIONS.length}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{BUG_QUESTIONS[currentBugIdx].language}</span>
                </div>

                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Bug className="w-4 h-4 text-rose-400" />
                  <span>{BUG_QUESTIONS[currentBugIdx].title}</span>
                </h3>

                <pre className="p-3 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono text-cyan-200 overflow-x-auto">
                  <code>{BUG_QUESTIONS[currentBugIdx].code}</code>
                </pre>

                <div className="space-y-2 pt-1">
                  {BUG_QUESTIONS[currentBugIdx].options.map((opt, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    const isCorrect = optIdx === BUG_QUESTIONS[currentBugIdx].correctIndex;
                    let btnStyle = 'bg-slate-800/80 border-white/10 text-slate-200 hover:bg-slate-700';

                    if (selectedOption !== null) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950 border-emerald-400 text-emerald-200 shadow-[0_0_10px_rgba(52,211,153,0.3)]';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-950 border-rose-400 text-rose-200';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={selectedOption !== null}
                        onClick={() => handleBugAnswer(optIdx)}
                        className={`w-full p-2.5 rounded-xl border text-xs font-sans text-left transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {selectedOption !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                        {selectedOption !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {selectedOption !== null && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-slate-950 rounded-xl border border-cyan-500/30 text-xs space-y-2">
                    <div className="flex items-center gap-1.5 text-cyan-300 font-bold font-mono">
                      <HelpCircle className="w-4 h-4 text-cyan-400" />
                      <span>EXPLANATION:</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-[11px]">{BUG_QUESTIONS[currentBugIdx].explanation}</p>
                    <button
                      onClick={nextBugQuestion}
                      className="mt-2 w-full py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all"
                    >
                      <span>Continue Next Question</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="p-6 bg-slate-900 border border-emerald-400/40 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mx-auto text-emerald-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Bug Hunter Completed!</h3>
                <p className="text-xs text-slate-300 font-mono">You scored {bugScore} points in Code Debugging! (+{bugScore + 50} XP)</p>
                <button
                  onClick={resetBugHunter}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold cursor-pointer shadow-lg"
                >
                  Play Bug Hunter Again
                </button>
              </div>
            )}
          </div>
        )}

        {/* GAME 3: SYSTEM ARCHITECTURE BUILDER */}
        {activeTab === 'architecture' && (
          <div className="w-full max-w-lg space-y-4">
            <div className="p-4 bg-slate-900/90 border border-cyan-500/30 rounded-2xl backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold">
                  SCENARIO {archScenarioIdx + 1} OF {ARCH_SCENARIOS.length}
                </span>
                <button
                  onClick={() => setArchScenarioIdx((prev) => (prev + 1) % ARCH_SCENARIOS.length)}
                  className="text-xs text-purple-300 hover:underline font-mono cursor-pointer"
                >
                  Switch Scenario
                </button>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>{scenario.title}</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1">{scenario.description}</p>
              </div>

              {/* Selectors Grid */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {(['frontend', 'backend', 'database', 'cacheOrVector'] as const).map((key) => (
                  <div key={key} className="p-2.5 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">{key}</div>
                    <select
                      value={userArch[key]}
                      onChange={(e) => handleSelectArch(key, e.target.value)}
                      className="w-full bg-slate-900 border border-white/20 text-xs text-cyan-200 rounded-lg p-1.5 focus:outline-none focus:border-cyan-400"
                    >
                      <option value="">Select option...</option>
                      {scenario.options[key].map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              {!archSubmitted ? (
                <button
                  disabled={!userArch.frontend || !userArch.backend || !userArch.database || !userArch.cacheOrVector}
                  onClick={checkArchFit}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all shadow-lg"
                >
                  Validate Architecture Stack
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-slate-950 border border-cyan-400/50 space-y-2 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <span>SYSTEM COMPATIBILITY AUDIT:</span>
                  </div>
                  <div className="text-xs space-y-1 font-mono text-slate-200">
                    <p>Frontend: {userArch.frontend === scenario.targetStack.frontend ? '✅ Optimal' : '⚠️ Sub-optimal'}</p>
                    <p>Backend: {userArch.backend === scenario.targetStack.backend ? '✅ Optimal' : '⚠️ Sub-optimal'}</p>
                    <p>Database: {userArch.database === scenario.targetStack.database ? '✅ Optimal' : '⚠️ Sub-optimal'}</p>
                    <p>Cache/Vector: {userArch.cacheOrVector === scenario.targetStack.cacheOrVector ? '✅ Optimal' : '⚠️ Sub-optimal'}</p>
                  </div>
                  <button
                    onClick={resetArchBuilder}
                    className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-mono cursor-pointer"
                  >
                    Re-design Stack
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* UNLOCKED RECRUITER REWARD BADGE */}
        {unlockedReward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md p-4 rounded-2xl bg-gradient-to-r from-purple-950/90 via-slate-900 to-cyan-950/90 border border-amber-400/60 shadow-2xl backdrop-blur-xl space-y-2 text-slate-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-300 font-bold font-mono text-xs">
                <Award className="w-5 h-5 text-amber-400 animate-pulse" />
                <span>✨ RECRUITER MVP BADGE UNLOCKED!</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                XP: {totalXP}
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              Great problem-solving skills! You've unlocked direct fast-track recruitment access for Vinay Shivdas Gangurde.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  openWindow('resume');
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-200 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>View Resume PDF</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  openWindow('contact');
                }}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-200 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Direct Contact</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  openWindow('ai-assistant');
                }}
                className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/50 text-purple-200 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Chat with AI</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

