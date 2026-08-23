import React, { useState } from 'react';
import { Globe, RotateCw, Lock, ExternalLink, Plus, X, ShieldAlert, Github, Linkedin, ArrowUpRight } from 'lucide-react';

interface BrowserAppProps {
  initialUrl?: string;
}

interface Tab {
  id: string;
  title: string;
  url: string;
  key: number;
}

export const BrowserApp: React.FC<BrowserAppProps> = ({ initialUrl = 'https://github.com/Vinaygangurde2101' }) => {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 'tab-1', title: 'Vinay GitHub Profile', url: initialUrl, key: 1 }
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('tab-1');

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const [inputUrl, setInputUrl] = useState(activeTab?.url || initialUrl);

  const bookmarks = [
    { title: 'SocialBuddy AI Repo', url: 'https://github.com/Vinaygangurde2101/socialbuddy' },
    { title: 'MERS Healthcare Repo', url: 'https://github.com/Vinaygangurde2101/medical-emergency-response-system' },
    { title: 'WebOn AR Repo', url: 'https://github.com/Vinaygangurde2101/webon-ar-shopping' },
    { title: 'AgriConnect Repo', url: 'https://github.com/Vinaygangurde2101/agriconnect' },
    { title: 'AVINYA.OS Portfolio Repo', url: 'https://github.com/Vinaygangurde2101/AVINYA.OS_Portfolio' },
    { title: 'Vinay GitHub Profile', url: 'https://github.com/Vinaygangurde2101' },
    { title: 'Vinay LinkedIn Profile', url: 'https://www.linkedin.com/in/vinay-gangurde-b3229027b' }
  ];

  const isRestrictedDomain = (urlToCheck: string) => {
    const lower = urlToCheck.toLowerCase();
    return (
      lower.includes('github.com') ||
      lower.includes('linkedin.com') ||
      lower.includes('google.com') ||
      lower.includes('twitter.com') ||
      lower.includes('x.com')
    );
  };

  const updateTabUrl = (tabId: string, newUrl: string) => {
    let target = newUrl.trim();
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      target = 'https://' + target;
    }

    let title = 'New Tab';
    try {
      const hostname = new URL(target).hostname.replace('www.', '');
      title = hostname.charAt(0).toUpperCase() + hostname.slice(1);
    } catch {
      title = target;
    }

    setTabs((prev) =>
      prev.map((t) => (t.id === tabId ? { ...t, url: target, title, key: t.key + 1 } : t))
    );
    setInputUrl(target);
  };

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTab) return;
    updateTabUrl(activeTab.id, inputUrl);
  };

  const handleAddTab = (urlToAdd = 'https://github.com/Vinaygangurde2101') => {
    const newId = `tab-${Date.now()}`;
    let title = 'New Tab';
    try {
      const hostname = new URL(urlToAdd).hostname.replace('www.', '');
      title = hostname.charAt(0).toUpperCase() + hostname.slice(1);
    } catch {
      title = urlToAdd;
    }

    const newTab: Tab = {
      id: newId,
      title,
      url: urlToAdd,
      key: 1
    };

    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newId);
    setInputUrl(urlToAdd);
  };

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    if (tabs.length === 1) return;

    const filtered = tabs.filter((t) => t.id !== tabId);
    setTabs(filtered);

    if (activeTabId === tabId) {
      const fallback = filtered[filtered.length - 1];
      setActiveTabId(fallback.id);
      setInputUrl(fallback.url);
    }
  };

  const handleSelectTab = (tab: Tab) => {
    setActiveTabId(tab.id);
    setInputUrl(tab.url);
  };

  const handleRefresh = () => {
    if (!activeTab) return;
    setTabs((prev) =>
      prev.map((t) => (t.id === activeTab.id ? { ...t, key: t.key + 1 } : t))
    );
  };

  const restricted = activeTab ? isRestrictedDomain(activeTab.url) : false;

  return (
    <div className="h-full flex flex-col space-y-2 select-none font-sans text-xs">
      {/* Top Browser Tab Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto px-1 pt-1 border-b border-white/10">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => handleSelectTab(tab)}
              className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-t-xl cursor-pointer transition-all max-w-[200px] min-w-[130px] ${
                isActive
                  ? 'bg-slate-900 text-cyan-300 font-semibold border-t-2 border-t-cyan-400 border-x border-white/10 shadow-lg -mb-[1px] z-10'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              <Globe className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span className="truncate flex-1 text-xs">{tab.title}</span>

              {tabs.length > 1 && (
                <button
                  onClick={(e) => handleCloseTab(e, tab.id)}
                  className="p-0.5 rounded-full hover:bg-white/10 text-slate-500 hover:text-slate-200 transition-colors"
                  title="Close tab"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}

        {/* Add Tab Button */}
        <button
          onClick={() => handleAddTab()}
          className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          title="Open new tab"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Browser Navigation & Address Toolbar */}
      <div className="p-2 rounded-xl bg-slate-900 border border-white/10 flex items-center gap-2">
        <button
          onClick={handleRefresh}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Refresh current tab"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>

        {/* Address Bar */}
        <form
          onSubmit={handleNavigate}
          className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 focus-within:border-cyan-400 transition-all"
        >
          <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Enter web address..."
            className="w-full bg-transparent text-slate-100 outline-none text-xs font-mono"
          />
        </form>

        <a
          href={activeTab?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all flex items-center gap-1 font-mono text-[11px]"
          title="Open link in external browser tab"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Open External</span>
        </a>
      </div>

      {/* Bookmarks Bar */}
      <div className="flex items-center gap-2 px-1 text-[11px] font-mono overflow-x-auto pb-1">
        <span className="text-slate-500 font-bold shrink-0">Bookmarks:</span>
        {bookmarks.map((bm, i) => (
          <button
            key={i}
            onClick={() => {
              if (activeTab) {
                updateTabUrl(activeTab.id, bm.url);
              }
            }}
            className="px-2.5 py-1 rounded bg-slate-900 border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-all whitespace-nowrap"
          >
            {bm.title}
          </button>
        ))}
      </div>

      {/* Web Content Area */}
      <div className="flex-1 rounded-xl overflow-hidden border border-white/10 bg-slate-950 relative flex items-center justify-center overflow-y-auto">
        {restricted ? (
          /* Framing Restriction Informational Fallback Card */
          <div className="p-6 max-w-2xl mx-auto text-center space-y-5 my-auto">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-lg">
              {activeTab.url.includes('github') ? (
                <Github className="w-7 h-7 text-slate-100" />
              ) : activeTab.url.includes('linkedin') ? (
                <Linkedin className="w-7 h-7 text-sky-400" />
              ) : (
                <ShieldAlert className="w-7 h-7" />
              )}
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-100 font-sans">
                {activeTab.url.includes('github')
                  ? 'GitHub Security Restriction & Project Repositories'
                  : activeTab.url.includes('linkedin')
                  ? 'LinkedIn Security Restriction'
                  : 'Web Framing Restricted'}
              </h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-lg mx-auto">
                GitHub & LinkedIn enforce strict HTTP security headers (
                <code className="text-cyan-400 bg-slate-900 px-1 py-0.5 rounded">X-Frame-Options: SAMEORIGIN</code>).
                You can open any of Vinay's project repositories directly on GitHub below:
              </p>
            </div>

            {/* Direct Open Button */}
            <div className="flex items-center justify-center gap-3">
              <a
                href={activeTab.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2"
              >
                <span>Open {activeTab.title} on GitHub</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* All GitHub Project Links Grid */}
            <div className="pt-3 border-t border-white/10 text-left">
              <h4 className="text-xs font-mono font-bold uppercase text-cyan-400 mb-3 text-center">
                📁 Direct GitHub Project Repositories
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {[
                  { title: 'SocialBuddy AI Repo', url: 'https://github.com/Vinaygangurde2101/socialbuddy', tech: 'MERN + Hugging Face' },
                  { title: 'MERS Healthcare Repo', url: 'https://github.com/Vinaygangurde2101/medical-emergency-response-system', tech: 'Spring Boot + Docker' },
                  { title: 'WebOn AR Shopping Repo', url: 'https://github.com/Vinaygangurde2101/webon-ar-shopping', tech: 'MediaPipe + WebGL' },
                  { title: 'AgriConnect Repo', url: 'https://github.com/Vinaygangurde2101/agriconnect', tech: 'Java Spring Boot' },
                  { title: 'AVINYA.OS Portfolio Repo', url: 'https://github.com/Vinaygangurde2101/AVINYA.OS_Portfolio', tech: 'React + TypeScript' }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-900/90 border border-white/10 hover:border-cyan-400/50 hover:bg-slate-900 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-slate-100 font-bold group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                        <Github className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{item.title}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans mt-0.5">{item.tech}</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Unrestricted Embedded iframe */
          <iframe
            key={`${activeTab.id}-${activeTab.key}`}
            src={activeTab.url}
            title={activeTab.title}
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin"
          />
        )}
      </div>
    </div>
  );
};
