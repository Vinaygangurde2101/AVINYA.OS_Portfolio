import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { queryPortfolioAI, ChatMessage } from '../../utils/aiEngine';
import { useWindowStore } from '../../store/useWindowStore';
import { soundEngine } from '../../utils/soundEngine';
import {
  Bot,
  Send,
  Sparkles,
  Trash2,
  ExternalLink,
  Zap,
  User,
  ChevronRight,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  MessageSquare
} from 'lucide-react';

const SUGGESTED_PROMPTS = [
  'Why should we hire you for an internship?',
  'What are your top AI & ML projects?',
  'What is your technical stack?',
  'Tell me about your work experience',
  'What is your current GPA & college?',
  'What award did you win at IIT Bombay?'
];

export const AIAssistantApp: React.FC = () => {
  const openWindow = useWindowStore((s) => s.openWindow);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `Hello! 👋 I'm **Vinay Shivdas Gangurde**!\n\nWelcome to my interactive AI assistant! Ask me anything about my projects, technical stack, career experience, GPA, or why you should hire me.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [
        { label: 'Explore Featured Projects', appId: 'projects' },
        { label: 'View Skills Matrix', appId: 'skills' },
        { label: 'View Resume PDF', appId: 'resume' }
      ],
      followUps: [
        'Why should we hire you for an internship?',
        'What are your top AI projects?',
        'What is your technical stack?'
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeApiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  const engineMode = activeApiKey && activeApiKey.trim().length > 10 ? 'Gemini 1.5 Flash (Live AI)' : 'Portfolio KB (Instant)';

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const recognitionRef = useRef<any>(null);

  // Clean speech synthesis & recognition on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, []);

  const speakText = (msgId: string, textToSpeak: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = textToSpeak.replace(/[#*`•_]/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const toggleMicInput = () => {
    if (typeof window === 'undefined') return;
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRec) {
      alert('Voice recognition is not supported in this browser. Please type your query!');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        soundEngine.playClick();
        setIsListening(true);
      };
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (err) {
      setIsListening(false);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    soundEngine.playClick();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsLoading(true);

    try {
      const response = await queryPortfolioAI(query, messages, activeApiKey);
      soundEngine.playNotification();

      const aiMsgId = `ai-${Date.now()}`;
      const aiMsg: ChatMessage = {
        id: aiMsgId,
        sender: 'ai',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: response.actions,
        followUps: response.followUps
      };

      setMessages((prev) => [...prev, aiMsg]);

      if (autoSpeak) {
        speakText(aiMsgId, response.text);
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: `⚠️ Sorry, an error occurred while processing your query. Please try again.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    soundEngine.playClick();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
    }
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'ai',
        text: `Chat reset! Ask me anything about my portfolio, skills, projects, or internship availability!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        followUps: [
          'What are your top AI projects?',
          'What is your technical stack?',
          'Why should we hire you for an internship?'
        ]
      }
    ]);
  };

  // Render formatted markdown text
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lIdx) => {
      if (line.startsWith('### ')) {
        return (
          <h3 key={lIdx} className="text-sm font-bold text-cyan-300 mt-2 mb-1 flex items-center gap-1.5 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            {line.replace('### ', '')}
          </h3>
        );
      }

      if (line.trim().startsWith('• ') || line.trim().startsWith('- ')) {
        const bulletText = line.trim().substring(2);
        return (
          <div key={lIdx} className="flex items-start gap-2 ml-2 my-0.5 text-slate-200 text-xs">
            <span className="text-cyan-400 font-bold">•</span>
            <span>{parseInlineFormatting(bulletText)}</span>
          </div>
        );
      }

      return (
        <p key={lIdx} className="my-1 text-xs text-slate-200 leading-relaxed">
          {parseInlineFormatting(line)}
        </p>
      );
    });
  };

  const parseInlineFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-cyan-200">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={i} className="text-slate-300">
            {part.slice(1, -1)}
          </em>
        );
      }
      if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          return (
            <a
              key={i}
              href={match[2]}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 underline hover:text-cyan-300 inline-flex items-center gap-0.5"
            >
              {match[1]}
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          );
        }
      }
      return part;
    });
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#080d1a] text-slate-100 font-sans select-text relative overflow-hidden">
      {/* Header Bar */}
      <div className="px-4 py-3 bg-slate-900/90 border-b border-cyan-500/20 flex items-center justify-between backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-wide">Vinay (AI Voice Assistant)</h2>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-medium">
                1st Person Voice
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Engine: {engineMode}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Global Auto-Speak Toggle */}
          <button
            onClick={() => setAutoSpeak((prev) => !prev)}
            className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
              autoSpeak
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                : 'bg-slate-800 border-white/10 text-slate-400 hover:text-white'
            }`}
            title={autoSpeak ? 'Auto-Voice Speech ON' : 'Turn Auto-Voice Speech ON'}
          >
            {autoSpeak ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline font-mono text-[11px]">{autoSpeak ? 'Voice: ON' : 'Voice: OFF'}</span>
          </button>

          {/* Clear Chat Button */}
          <button
            onClick={handleClearChat}
            className="p-2 rounded-lg bg-slate-800 border border-white/10 hover:bg-red-500/20 hover:border-red-500/40 text-slate-400 hover:text-red-300 transition-colors flex items-center gap-1.5 text-xs cursor-pointer"
            title="Clear Chat History"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Main Messages Scroll Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center shrink-0 shadow-md mt-0.5">
                <Bot className="w-4 h-4 text-cyan-400" />
              </div>
            )}

            <div
              className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-3.5 shadow-lg border ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-sky-600 to-cyan-600 border-cyan-400/40 text-white rounded-br-xs'
                  : msg.isError
                  ? 'bg-red-950/80 border-red-500/40 text-red-200 rounded-bl-xs'
                  : 'bg-slate-900/90 border-cyan-500/25 text-slate-100 rounded-bl-xs backdrop-blur-md'
              }`}
            >
              {/* Message Header */}
              <div className="flex items-center justify-between gap-4 mb-1 border-b border-white/10 pb-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-cyan-300 uppercase tracking-wider font-mono">
                    {msg.sender === 'user' ? 'You' : 'Vinay'}
                  </span>
                  {msg.sender === 'ai' && (
                    <button
                      onClick={() => speakText(msg.id, msg.text)}
                      className="p-0.5 text-slate-400 hover:text-cyan-300 rounded hover:bg-white/10 transition-colors cursor-pointer"
                      title="Read Aloud"
                    >
                      {speakingMsgId === msg.id ? (
                        <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      ) : (
                        <VolumeX className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
                <span className="text-[9px] text-slate-400 font-mono">{msg.timestamp}</span>
              </div>

              {/* Message Content */}
              <div>{renderFormattedText(msg.text)}</div>

              {/* Interactive Action Buttons */}
              {msg.actions && msg.actions.length > 0 && (
                <div className="mt-3 pt-2 border-t border-cyan-500/20 flex flex-wrap gap-2">
                  {msg.actions.map((act, aIdx) => (
                    <button
                      key={aIdx}
                      onClick={() => {
                        soundEngine.playClick();
                        openWindow(act.appId, act.props);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-400/50 hover:bg-cyan-500/40 text-cyan-200 text-[11px] font-medium flex items-center gap-1.5 transition-all shadow-xs hover:scale-105 cursor-pointer"
                    >
                      <span>{act.label}</span>
                      <ChevronRight className="w-3 h-3 text-cyan-400" />
                    </button>
                  ))}
                </div>
              )}

              {/* Interactive Dynamic Follow-Up Question Chips */}
              {msg.followUps && msg.followUps.length > 0 && (
                <div className="mt-3 pt-2 border-t border-cyan-500/15">
                  <div className="text-[10px] text-cyan-400 font-mono mb-1.5 font-semibold flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    <span>Suggested Follow-up Questions:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.followUps.map((fUp, fIdx) => (
                      <button
                        key={fIdx}
                        onClick={() => handleSend(fUp)}
                        disabled={isLoading}
                        className="px-2.5 py-1 rounded-full bg-slate-800/90 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-400/60 text-cyan-200 text-[11px] font-sans transition-all cursor-pointer shadow-xs hover:scale-105"
                      >
                        {fUp}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-white/20 flex items-center justify-center shrink-0 shadow-md mt-0.5">
                <User className="w-4 h-4 text-slate-300" />
              </div>
            )}
          </motion.div>
        ))}

        {/* Typing Loading Animation */}
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center shrink-0 shadow-md">
              <Bot className="w-4 h-4 text-cyan-400 animate-spin" />
            </div>
            <div className="bg-slate-900/90 border border-cyan-500/25 rounded-2xl rounded-bl-xs p-3.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="text-xs text-slate-400 font-mono ml-2">Vinay AI is thinking...</span>
            </div>
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 bg-slate-950/60 border-t border-white/5 flex gap-2 overflow-x-auto no-scrollbar scrollbar-none">
        {SUGGESTED_PROMPTS.map((prompt, pIdx) => (
          <button
            key={pIdx}
            onClick={() => handleSend(prompt)}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-cyan-950 border border-white/10 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-200 text-[11px] whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Bottom Input Field */}
      <div className="p-3 bg-slate-900/95 border-t border-cyan-500/20 backdrop-blur-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 bg-slate-950 border border-cyan-500/30 focus-within:border-cyan-400 rounded-xl p-1.5 transition-all shadow-inner"
        >
          {/* Microphone Speech Recognition Button */}
          <button
            type="button"
            onClick={toggleMicInput}
            className={`p-2 rounded-lg transition-colors flex items-center justify-center cursor-pointer ${
              isListening
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50 animate-pulse'
                : 'text-slate-400 hover:text-cyan-300 hover:bg-white/5'
            }`}
            title={isListening ? 'Listening to voice...' : 'Speak into Microphone'}
          >
            {isListening ? <Mic className="w-4 h-4 text-rose-400" /> : <MicOff className="w-4 h-4" />}
          </button>

          <input
            ref={inputRef}
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={isListening ? 'Listening now... Speak your question!' : 'Ask me anything (e.g. why hire me, projects, skills, GPA)...'}
            disabled={isLoading}
            className="flex-1 bg-transparent px-2 py-1.5 text-xs text-slate-100 placeholder-slate-500 outline-none font-medium"
          />

          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 disabled:opacity-40 disabled:hover:from-cyan-500 disabled:hover:to-sky-500 text-slate-950 font-bold transition-all shadow-md flex items-center justify-center cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

