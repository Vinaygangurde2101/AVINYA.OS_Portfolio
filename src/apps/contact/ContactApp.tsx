import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileData } from '../../data/profile';
import { Badge } from '../../components/common/Badge';
import { Toast } from '../../components/common/Toast';
import { soundEngine } from '../../utils/soundEngine';
import { useWindowStore } from '../../store/useWindowStore';
import {
  Mail,
  Send,
  Copy,
  Check,
  Github,
  Linkedin,
  MessageSquare,
  Sparkles,
  MapPin,
  GraduationCap,
  Briefcase,
  Phone,
  Clock,
  ExternalLink,
  Globe,
  Code2,
  ArrowUpRight,
  Zap,
  CheckCircle2,
  FileText,
  UserCheck,
  RefreshCw
} from 'lucide-react';

const INQUIRY_TYPES = [
  { id: 'aiml', label: '🤖 AI/ML Internship', subject: 'AI/ML Internship Opportunity for Vinay' },
  { id: 'fullstack', label: '⚡ Full-Stack Role', subject: 'Full-Stack Developer Role / Internship Inquiry' },
  { id: 'project', label: '🚀 Freelance / Collaboration', subject: 'Project Collaboration Proposal for Vinay' },
  { id: 'general', label: '💬 General Networking', subject: 'Connecting via Portfolio OS' }
];

export const ContactApp: React.FC = () => {
  const openWindow = useWindowStore((s) => s.openWindow);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [selectedInquiry, setSelectedInquiry] = useState<string>('aiml');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Live IST Time Clock
  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    soundEngine.playClick();
    showToast(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectInquiry = (inquiryId: string, defaultSubject: string) => {
    soundEngine.playClick();
    setSelectedInquiry(inquiryId);
    setFormData((prev) => ({ ...prev, subject: defaultSubject }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please complete all required fields.');
      return;
    }

    soundEngine.playClick();
    setIsSending(true);

    const topicLabel = INQUIRY_TYPES.find((t) => t.id === selectedInquiry)?.label || 'General Inquiry';

    try {
      // Zero-Backend AJAX Form Submission via FormSubmit.co API
      const response = await fetch(`https://formsubmit.co/ajax/${profileData.socials.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `[Portfolio OS] ${topicLabel}`,
          topic: topicLabel,
          message: formData.message,
          _subject: `[Portfolio Inquiry] ${formData.subject || topicLabel}`,
          _template: 'table'
        })
      });

      const resData = await response.json().catch(() => ({}));
      setIsSending(false);

      if (resData.success === 'true' || resData.success === true) {
        soundEngine.playNotification();
        setIsSubmitted(true);
        showToast('Message sent successfully directly to Vinay!');
      } else if (resData.message && resData.message.includes('Activation')) {
        soundEngine.playNotification();
        setIsSubmitted(true);
        showToast('FormSubmit sent an Activation Email to vinaygangurde2101@gmail.com! Please click "Activate Form" once in your inbox.');
      } else {
        throw new Error(resData.message || 'FormSubmit AJAX request error');
      }
    } catch (err: any) {
      // Fallback: Open mailto client if offline or CORS block
      setIsSending(false);
      soundEngine.playNotification();
      setIsSubmitted(true);
      showToast('Opening default email client fallback to send message...');

      const mailtoUrl = `mailto:${profileData.socials.email}?subject=${encodeURIComponent(
        formData.subject || 'AI/ML & Full-Stack Engineering Opportunity'
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nTopic: ${topicLabel}\n\nMessage:\n${formData.message}`
      )}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl w-full mx-auto pb-8 select-none font-sans text-xs">
      <Toast message={toastMessage} />

      {/* Hero Banner Header */}
      <div className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/90 border border-cyan-500/30 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span>OPEN FOR INTERNSHIPS AND FULL TIME ROLE</span>
              </span>

              <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 font-mono text-[11px] flex items-center gap-1">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>IST {currentTime || 'Live'}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>Let's Build Something Extraordinary</span>
            </h1>

            <p className="text-slate-300 font-sans leading-relaxed text-xs sm:text-sm max-w-xl">
              Have an internship opportunity, project collaboration, or engineering role? Reach out directly via the form or connect through GitHub and LinkedIn!
            </p>
          </div>

          {/* Direct Actions Column */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={() => handleCopy(profileData.socials.email, 'email', 'Email Address')}
              className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>{profileData.socials.email}</span>
              {copiedKey === 'email' ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-3.5 h-3.5 opacity-70" />}
            </button>

            <button
              onClick={() => openWindow('resume')}
              className="px-4 py-2.5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-slate-200 border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer font-mono"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>View Resume PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Channel Quick Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Email Card */}
        <div
          onClick={() => handleCopy(profileData.socials.email, 'email_card', 'Email Address')}
          className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-400/50 hover:bg-slate-900 transition-all cursor-pointer group space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            {copiedKey === 'email_card' ? (
              <span className="text-[10px] font-mono text-emerald-400 font-bold">Copied!</span>
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            )}
          </div>
          <div>
            <div className="text-xs font-bold text-white font-mono">Email Address</div>
            <div className="text-[11px] text-slate-400 truncate mt-0.5">{profileData.socials.email}</div>
          </div>
        </div>

        {/* GitHub Card */}
        <a
          href={profileData.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-400/50 hover:bg-slate-900 transition-all cursor-pointer group space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-white/15 text-slate-100 group-hover:scale-110 transition-transform">
              <Github className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          </div>
          <div>
            <div className="text-xs font-bold text-white font-mono">GitHub Profile</div>
            <div className="text-[11px] text-slate-400 truncate mt-0.5">@Vinaygangurde2101</div>
          </div>
        </a>

        {/* LinkedIn Card */}
        <a
          href={profileData.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-400/50 hover:bg-slate-900 transition-all cursor-pointer group space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-400 group-hover:scale-110 transition-transform">
              <Linkedin className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          </div>
          <div>
            <div className="text-xs font-bold text-white font-mono">LinkedIn Profile</div>
            <div className="text-[11px] text-slate-400 truncate mt-0.5">vinay-gangurde</div>
          </div>
        </a>

        {/* Location & Timezone Card */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-400/20 text-violet-400">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded bg-violet-500/20 text-[10px] font-mono text-violet-300 font-bold">IST (UTC+5:30)</span>
          </div>
          <div>
            <div className="text-xs font-bold text-white font-mono">Location & Relocation</div>
            <div className="text-[11px] text-slate-400 truncate mt-0.5">Shirpur, Maharashtra | Open Remote</div>
          </div>
        </div>
      </div>

      {/* Main Container Grid: Form + Candidate Profile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recruiter & Collaboration Form */}
        <div className="md:col-span-2 p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-white/10 space-y-5 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              DIRECT MESSENGER & RECRUITER PORTAL
            </h2>
            <Badge variant="primary" size="sm">
              Instant Dispatch
            </Badge>
          </div>

          {/* Inquiry Type Pills */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Select Inquiry Topic:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {INQUIRY_TYPES.map((t) => {
                const isSelected = selectedInquiry === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleSelectInquiry(t.id, t.subject)}
                    className={`p-2.5 rounded-xl text-[11px] font-mono transition-all text-center border cursor-pointer ${isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                      : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                      }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="p-6 sm:p-8 text-center space-y-5 bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-900/95 rounded-3xl border border-cyan-400/40 shadow-[0_0_30px_rgba(0,240,255,0.15)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Animated Icon */}
              <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping opacity-75" />
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                  <CheckCircle2 className="w-9 h-9 text-emerald-300" />
                </div>
              </div>

              {/* Headline & Subtitle */}
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[10px] font-bold tracking-wider uppercase">
                  <span>✓ TRANSMISSION DELIVERED</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight pt-1">
                  Message Received, {formData.name || 'Friend'}!
                </h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed max-w-md mx-auto">
                  Thank you for reaching out! Your inquiry has been securely dispatched directly to Vinay's inbox. I usually respond within a few hours.
                </p>
              </div>

              {/* Summary Receipt Card */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-left font-mono text-xs space-y-2 max-w-lg mx-auto">
                <div className="flex items-center justify-between text-[10px] text-cyan-400 border-b border-white/10 pb-1.5 font-bold uppercase tracking-wider">
                  <span>TRANSMISSION RECEIPT</span>
                  <span>#AVY-8942-TX</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                  <div>
                    <span className="text-slate-500 block text-[10px]">SENDER:</span>
                    <span className="text-slate-200 font-semibold truncate block">{formData.name || 'Visitor'}</span>
                    <span className="text-cyan-400 text-[10px] truncate block">{formData.email}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px]">TOPIC / SUBJECT:</span>
                    <span className="text-slate-200 font-semibold truncate block">
                      {formData.subject || INQUIRY_TYPES.find((t) => t.id === selectedInquiry)?.label}
                    </span>
                    <span className="text-emerald-400 text-[10px] block font-bold">STATUS: DISPATCHED ✓</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Another Message</span>
                </button>

                <a
                  href={profileData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/15 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Linkedin className="w-4 h-4 text-sky-400" />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-mono flex items-center justify-between">
                    <span>Your Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Hiring Manager / Technical Lead"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-slate-100 placeholder-slate-600 outline-none focus:border-cyan-400 transition-all font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-mono">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="recruiter@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-slate-100 placeholder-slate-600 outline-none focus:border-cyan-400 transition-all font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-mono">Subject Header</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Subject of your message..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-slate-100 placeholder-slate-600 outline-none focus:border-cyan-400 transition-all font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-mono">Message Details *</label>
                  <span className="text-[10px] font-mono text-slate-500">
                    {formData.message.length} characters
                  </span>
                </div>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details about your team, company, internship program, or project opportunity..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-slate-100 placeholder-slate-600 outline-none focus:border-cyan-400 transition-all resize-none font-sans leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className={`w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-extrabold text-xs transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2 font-mono uppercase tracking-wider ${
                  isSending ? 'opacity-80 cursor-wait' : 'cursor-pointer'
                }`}
              >
                {isSending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Transmit Message to Vinay</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Sidebar: Candidate Overview & GitHub Repos */}
        <div className="space-y-4">
          {/* Quick Snapshot Card */}
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 space-y-3">
            <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              <span>CANDIDATE SNAPSHOT</span>
            </h3>

            <div className="space-y-2.5 text-xs font-sans">
              <div className="flex items-start gap-2.5 text-slate-300">
                <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">B.E. Computer Engineering</div>
                  <div className="text-[10px] text-slate-400">RCPIT Shirpur | <span className="text-cyan-300 font-mono font-bold">GPA: 8.46 / 10</span></div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300">
                <Briefcase className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Target Roles</div>
                  <div className="text-[10px] text-slate-400">AI/ML Engineer Intern, Full-Stack Developer</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300">
                <Code2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Core Tech Stack</div>
                  <div className="text-[10px] text-slate-400">Java, Spring Boot, React, Python, Docker, AI/ML APIs</div>
                </div>
              </div>
            </div>
          </div>

          {/* GitHub Repositories Card */}
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GITHUB REPOSITORIES</span>
              </h3>
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-mono text-cyan-400 hover:underline"
              >
                All (5+) →
              </a>
            </div>

            <div className="space-y-1.5 font-mono text-[11px]">
              {[
                { title: 'SocialBuddy AI Repo', url: 'https://github.com/Vinaygangurde2101/socialbuddy' },
                { title: 'MERS Healthcare Repo', url: 'https://github.com/Vinaygangurde2101/medical-emergency-response-system' },
                { title: 'WebOn AR Shopping Repo', url: 'https://github.com/rohannn3215/Avinya---AR-Fashion-Marketplace' },
                { title: 'AgriConnect System Repo', url: 'https://github.com/Vinaygangurde2101/agriconnect' },
                { title: 'AVINYA.OS Portfolio Repo', url: 'https://github.com/Vinaygangurde2101/AVINYA.OS_Portfolio' }
              ].map((repo, idx) => (
                <a
                  key={idx}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-cyan-300 transition-all group"
                >
                  <span className="truncate">{repo.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


