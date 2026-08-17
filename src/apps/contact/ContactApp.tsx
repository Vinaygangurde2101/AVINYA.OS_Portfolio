import React, { useState } from 'react';
import { profileData } from '../../data/profile';
import { Badge } from '../../components/common/Badge';
import { Toast } from '../../components/common/Toast';
import { soundEngine } from '../../utils/soundEngine';
import { Mail, Send, Copy, Check, Github, Linkedin, MessageSquare, Sparkles, MapPin, GraduationCap, Briefcase } from 'lucide-react';

export const ContactApp: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.socials.email);
    setIsCopied(true);
    soundEngine.playClick();
    showToast('Email address copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2500);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please complete all required fields.');
      return;
    }

    soundEngine.playNotification();
    setIsSubmitted(true);
    showToast('Message sent! Opening your email client fallback...');

    // Open mailto fallback
    const mailtoUrl = `mailto:${profileData.socials.email}?subject=${encodeURIComponent(
      formData.subject || 'AI/ML & Full-Stack Internship Opportunity'
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-6 select-none">
      <Toast message={toastMessage} />

      {/* Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-400">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>Connect with Vinay</span>
              <Badge variant="emerald" size="sm">
                ● Seeking AI/ML Internship
              </Badge>
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Full-Stack Developer & AI/ML Engineer | Open for Internships & Engineering Roles
            </p>
          </div>
        </div>

        {/* Copy Email Button */}
        <button
          onClick={handleCopyEmail}
          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-200 border border-white/15 transition-all text-xs font-mono flex items-center justify-center gap-2 group cursor-pointer"
        >
          <Mail className="w-4 h-4 text-cyan-400" />
          <span>{profileData.socials.email}</span>
          {isCopied ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
          )}
        </button>
      </div>

      {/* Main Grid: Form + Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Form */}
        <div className="md:col-span-2 p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-4 shadow-xl">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <Send className="w-4 h-4" />
            DIRECT RECRUITER & COLLABORATION MESSENGER
          </h3>

          {isSubmitted ? (
            <div className="p-8 text-center space-y-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30">
              <Sparkles className="w-8 h-8 text-cyan-400 mx-auto animate-bounce" />
              <h4 className="text-sm font-bold text-white">Transmission Received!</h4>
              <p className="text-xs text-slate-300">
                Thank you, {formData.name}. Opening your default email client to send the message directly to Vinay.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-2 text-xs font-mono text-cyan-400 underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400 font-mono">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Hiring Manager / Recruiter"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-slate-100 placeholder-slate-600 outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-mono">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="recruiter@company.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-slate-100 placeholder-slate-600 outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-mono">Subject / Topic</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. AI/ML Internship Opportunity / Full-Stack Role"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-slate-100 placeholder-slate-600 outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-mono">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your company, team, internship role, or project opportunity..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-slate-100 placeholder-slate-600 outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message to Vinay</span>
              </button>
            </form>
          )}
        </div>

        {/* Quick Candidate Profile & Social Channels sidebar */}
        <div className="space-y-4">
          {/* Quick Info Card */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2.5">
            <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>CANDIDATE QUICK DETAILS</span>
            </h3>

            <div className="space-y-2 text-xs font-sans">
              <div className="flex items-start gap-2 text-slate-300">
                <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">B.E. Computer Engineering</div>
                  <div className="text-[10px] text-slate-400">RCPIT Shirpur | GPA: 8.46 / 10</div>
                </div>
              </div>

              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Location</div>
                  <div className="text-[10px] text-slate-400">Shirpur, Maharashtra, India</div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Channels */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
            <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-violet-400">
              SOCIAL & REPO PROFILES
            </h3>

            <div className="space-y-2">
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-white/10 hover:border-cyan-400/40 text-slate-200 transition-all group"
              >
                <Github className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-xs font-bold font-mono">GitHub</div>
                  <div className="text-[10px] text-slate-400">Vinaygangurde2101</div>
                </div>
              </a>

              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-white/10 hover:border-cyan-400/40 text-slate-200 transition-all group"
              >
                <Linkedin className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-xs font-bold font-mono">LinkedIn</div>
                  <div className="text-[10px] text-slate-400">vinay-gangurde-b3229027b</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

