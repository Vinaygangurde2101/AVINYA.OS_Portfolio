import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '../../store/useWindowStore';
import { soundEngine } from '../../utils/soundEngine';
import {
  Network,
  Cpu,
  Database,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Shield,
  Zap,
  Activity,
  Server,
  Code2,
  Box
} from 'lucide-react';

interface ArchNode {
  id: string;
  title: string;
  category: 'project' | 'frontend' | 'backend' | 'ai' | 'database';
  type: string;
  description: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  connections: string[];
  icon: string;
  color: string;
  borderColor: string;
  glowColor: string;
}

const ARCHITECTURE_NODES: ArchNode[] = [
  {
    id: 'socialbuddy',
    title: 'SocialBuddy Platform',
    category: 'project',
    type: 'Full-Stack Social Platform',
    description: 'High-performance social networking web app featuring real-time feed rendering, user authentication, and interactive posts.',
    techStack: ['React', 'TypeScript', 'Java 17', 'Spring Boot', 'PostgreSQL', 'Docker'],
    metrics: [
      { label: 'API Response Time', value: '<45ms' },
      { label: 'System Uptime', value: '99.9%' },
      { label: 'Architecture', value: 'RESTful Microservices' }
    ],
    connections: ['spring-backend', 'react-frontend', 'postgres-db', 'docker-devops'],
    icon: '🌐',
    color: 'from-sky-600 to-cyan-600',
    borderColor: 'border-cyan-400',
    glowColor: 'rgba(6, 182, 212, 0.4)'
  },
  {
    id: 'mers-healthcare',
    title: 'MERS Healthcare System',
    category: 'project',
    type: 'Medical OCR & AI Pipeline',
    description: 'Intelligent medical record extraction system leveraging optical character recognition (OCR) and NLP to digitize medical reports.',
    techStack: ['React', 'Python FastAPI', 'PyTorch', 'Tesseract OCR', 'MongoDB'],
    metrics: [
      { label: 'OCR Accuracy', value: '96.4%' },
      { label: 'Processing Speed', value: '1.2s / Record' },
      { label: 'Security', value: 'HIPAA Compliant Encryption' }
    ],
    connections: ['python-fastapi', 'pytorch-ai', 'react-frontend', 'mongo-db'],
    icon: '🏥',
    color: 'from-emerald-600 to-teal-600',
    borderColor: 'border-emerald-400',
    glowColor: 'rgba(16, 185, 129, 0.4)'
  },
  {
    id: 'webon-ar',
    title: 'WebOn 3D AR E-Commerce',
    category: 'project',
    type: 'WebGL & WebXR 3D Storefront',
    description: 'Next-gen web browser 3D augmented reality store allowing users to preview 3D products in real physical space using web browsers.',
    techStack: ['React', 'Three.js', 'WebGL', 'WebXR', 'TailwindCSS'],
    metrics: [
      { label: 'Target Frame Rate', value: '60 FPS' },
      { label: 'Shader Performance', value: 'GPU Accelerated' },
      { label: 'Cross Platform', value: 'Mobile & Desktop' }
    ],
    connections: ['react-frontend', 'threejs-graphics'],
    icon: '🕶️',
    color: 'from-purple-600 to-indigo-600',
    borderColor: 'border-purple-400',
    glowColor: 'rgba(168, 85, 247, 0.4)'
  },
  {
    id: 'ai-toxicity',
    title: 'AI Toxicity Classifier',
    category: 'project',
    type: 'Hugging Face NLP Moderation',
    description: 'Real-time text moderation engine analyzing toxic comments, hate speech, and profanity using fine-tuned transformer models.',
    techStack: ['Python', 'Hugging Face', 'PyTorch', 'Transformers', 'Flask API'],
    metrics: [
      { label: 'Model F1-Score', value: '0.942' },
      { label: 'Inference Latency', value: '<25ms' },
      { label: 'Dataset Size', value: '150k+ Samples' }
    ],
    connections: ['pytorch-ai', 'python-fastapi'],
    icon: '⚡',
    color: 'from-amber-600 to-orange-600',
    borderColor: 'border-amber-400',
    glowColor: 'rgba(245, 158, 11, 0.4)'
  },
  {
    id: 'spring-backend',
    title: 'Java Spring Boot Core',
    category: 'backend',
    type: 'Enterprise Backend Service',
    description: 'Robust backend microservice architecture handling dependency injection, Security JWT auth, and database ORM layer.',
    techStack: ['Java 17', 'Spring Boot', 'Spring Security', 'Hibernate', 'Maven'],
    metrics: [
      { label: 'Framework', value: 'Spring Boot 3' },
      { label: 'Concurrency', value: 'Multi-threaded' }
    ],
    connections: ['postgres-db', 'docker-devops'],
    icon: '☕',
    color: 'from-red-600 to-amber-600',
    borderColor: 'border-red-400',
    glowColor: 'rgba(239, 68, 68, 0.4)'
  },
  {
    id: 'pytorch-ai',
    title: 'PyTorch & Hugging Face NLP',
    category: 'ai',
    type: 'Deep Learning & Transformer Engine',
    description: 'Machine learning inference pipeline trained for text classification, medical record parsing, and semantic sentiment scoring.',
    techStack: ['Python 3.11', 'PyTorch', 'Transformers', 'NumPy', 'Scikit-learn'],
    metrics: [
      { label: 'Framework', value: 'PyTorch 2.1' },
      { label: 'Hardware', value: 'CUDA Accelerated' }
    ],
    connections: [],
    icon: '🤖',
    color: 'from-pink-600 to-purple-600',
    borderColor: 'border-pink-400',
    glowColor: 'rgba(236, 72, 153, 0.4)'
  },
  {
    id: 'react-frontend',
    title: 'React 18 & TypeScript UI',
    category: 'frontend',
    type: 'Single Page Application (SPA)',
    description: 'Modern component-driven web UI engineered with reactive Zustand state management, TailwindCSS design tokens, and smooth Framer Motion animations.',
    techStack: ['React 18', 'TypeScript', 'TailwindCSS', 'Zustand', 'Vite'],
    metrics: [
      { label: 'Render Speed', value: 'Instant SPA' },
      { label: 'Bundle Size', value: 'Optimized Chunks' }
    ],
    connections: [],
    icon: '⚛️',
    color: 'from-cyan-600 to-blue-600',
    borderColor: 'border-cyan-400',
    glowColor: 'rgba(6, 182, 212, 0.4)'
  },
  {
    id: 'postgres-db',
    title: 'PostgreSQL & MongoDB Data',
    category: 'database',
    type: 'Relational & Document Database',
    description: 'Dual-database architecture utilizing relational SQL for user transactions and MongoDB document store for unstructured medical records.',
    techStack: ['PostgreSQL', 'MongoDB', 'Redis Cache', 'SQL Queries'],
    metrics: [
      { label: 'Indexing', value: 'B-Tree & Hash' },
      { label: 'Consistency', value: 'ACID Compliant' }
    ],
    connections: [],
    icon: '🗄️',
    color: 'from-indigo-600 to-blue-700',
    borderColor: 'border-indigo-400',
    glowColor: 'rgba(99, 102, 241, 0.4)'
  }
];

export const ArchitectureApp: React.FC = () => {
  const openWindow = useWindowStore((s) => s.openWindow);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('socialbuddy');
  const [activeFilter, setActiveFilter] = useState<'all' | 'project' | 'backend' | 'ai' | 'frontend'>('all');

  const selectedNode = ARCHITECTURE_NODES.find((n) => n.id === selectedNodeId) || ARCHITECTURE_NODES[0];

  const filteredNodes = ARCHITECTURE_NODES.filter((n) => {
    if (activeFilter === 'all') return true;
    return n.category === activeFilter;
  });

  return (
    <div className="w-full h-full flex flex-col bg-[#070c18] text-slate-100 font-sans select-text overflow-hidden relative">
      {/* Header Bar */}
      <div className="px-4 py-3 bg-slate-900/90 border-b border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <Network className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-wide">SYSTEM ARCHITECTURE MATRIX</h2>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold">
                MICROSERVICES & ML
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Interactive node topology mapping projects, microservices & AI models</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Nodes', icon: Layers },
            { id: 'project', label: 'Projects', icon: Box },
            { id: 'backend', label: 'Backend APIs', icon: Server },
            { id: 'ai', label: 'AI & ML', icon: Cpu },
            { id: 'frontend', label: 'Frontend UI', icon: Code2 }
          ].map((f) => {
            const IconComp = f.icon;
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveFilter(f.id as any);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/25 border border-cyan-400/60 text-cyan-200 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <IconComp className="w-3 h-3 text-cyan-400" />
                <span>{f.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Body Split View */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Left Side: Interactive Architecture Graph Grid */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#050812]">
          <div className="text-xs text-slate-400 font-mono mb-2 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Select any system node below to inspect architectural topology & performance metrics:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredNodes.map((node) => {
              const isSelected = node.id === selectedNodeId;
              return (
                <motion.div
                  key={node.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedNodeId(node.id);
                  }}
                  style={{ boxShadow: isSelected ? `0 0 20px ${node.glowColor}` : undefined }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all relative overflow-hidden shadow-lg ${
                    isSelected
                      ? `bg-slate-900 ${node.borderColor}`
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="text-2xl">{node.icon}</div>
                      <div>
                        <h3 className="text-xs font-bold text-white tracking-wide">{node.title}</h3>
                        <span className="text-[10px] text-cyan-400 font-mono font-medium">{node.type}</span>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] animate-ping" />
                    )}
                  </div>

                  <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed mb-2.5">{node.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {node.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700/60 text-slate-300 text-[9px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detailed Node Inspector Drawer */}
        <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-cyan-500/20 bg-slate-900/95 p-4 flex flex-col justify-between overflow-y-auto backdrop-blur-md">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <div className="text-3xl p-2 rounded-xl bg-slate-950 border border-cyan-500/30">{selectedNode.icon}</div>
              <div>
                <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider font-bold">
                  {selectedNode.category} Node
                </span>
                <h3 className="text-sm font-extrabold text-white">{selectedNode.title}</h3>
                <p className="text-[11px] text-slate-400">{selectedNode.type}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider font-mono mb-1 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>Architecture Specification</span>
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed font-sans bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                {selectedNode.description}
              </p>
            </div>

            {/* SLA Performance Metrics */}
            <div>
              <h4 className="text-[11px] font-bold text-amber-300 uppercase tracking-wider font-mono mb-1.5 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Performance & SLA Metrics</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedNode.metrics.map((met, mIdx) => (
                  <div key={mIdx} className="p-2 rounded-xl bg-slate-950 border border-white/10">
                    <div className="text-[9px] text-slate-400 font-mono">{met.label}</div>
                    <div className="text-xs font-bold text-cyan-300 font-mono mt-0.5">{met.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack List */}
            <div>
              <h4 className="text-[11px] font-bold text-purple-300 uppercase tracking-wider font-mono mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Technologies & Frameworks</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-400/30 text-cyan-200 text-xs font-mono font-medium shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-white/10 mt-4">
            {selectedNode.category === 'project' ? (
              <button
                onClick={() => {
                  soundEngine.playClick();
                  openWindow('project-details', { projectId: selectedNode.id });
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all transform hover:scale-[1.02] cursor-pointer"
              >
                <span>Inspect Full Case Study</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  soundEngine.playClick();
                  openWindow('projects');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>View Linked Projects</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
