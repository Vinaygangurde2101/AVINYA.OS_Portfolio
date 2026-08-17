import React from 'react';
import { useWindowStore } from '../../store/useWindowStore';
import { Window } from './Window';
import { AboutApp } from '../../apps/about/AboutApp';
import { ProjectsApp } from '../../apps/projects/ProjectsApp';
import { ProjectDetailsWindow } from '../../apps/projects/ProjectDetailsWindow';
import { SkillsApp } from '../../apps/skills/SkillsApp';
import { ExperienceApp } from '../../apps/experience/ExperienceApp';
import { AchievementsApp } from '../../apps/achievements/AchievementsApp';
import { ResumeApp } from '../../apps/resume/ResumeApp';
import { ContactApp } from '../../apps/contact/ContactApp';
import { TerminalApp } from '../../apps/terminal/TerminalApp';
import { BrowserApp } from '../../apps/browser/BrowserApp';
import { SettingsApp } from '../../apps/settings/SettingsApp';
import { AIAssistantApp } from '../../apps/ai/AIAssistantApp';
import { ArcadeApp } from '../../apps/arcade/ArcadeApp';
import { ArchitectureApp } from '../../apps/architecture/ArchitectureApp';

export const WindowManager: React.FC = () => {
  const windows = useWindowStore((s) => s.windows);

  const renderAppContent = (windowId: string, baseId: string, props?: Record<string, any>) => {
    switch (baseId) {
      case 'about':
        return <AboutApp />;
      case 'projects':
        return <ProjectsApp />;
      case 'project-details':
        return <ProjectDetailsWindow projectId={props?.projectId} />;
      case 'skills':
        return <SkillsApp />;
      case 'experience':
        return <ExperienceApp />;
      case 'achievements':
        return <AchievementsApp />;
      case 'resume':
        return <ResumeApp />;
      case 'contact':
        return <ContactApp />;
      case 'terminal':
        return <TerminalApp />;
      case 'browser':
        return <BrowserApp initialUrl={props?.url} />;
      case 'settings':
        return <SettingsApp />;
      case 'ai-assistant':
        return <AIAssistantApp />;
      case 'arcade':
        return <ArcadeApp />;
      case 'architecture':
        return <ArchitectureApp />;
      default:
        return <div className="p-4">Application content loading...</div>;
    }
  };

  // Sort windows by zIndex so highest zIndex window renders last in DOM (on top)
  const sortedWindows = Object.values(windows).sort((a, b) => a.zIndex - b.zIndex);

  return (
    <>
      {sortedWindows.map((win) => {
        const baseId = win.id.includes(':') ? win.id.split(':')[0] : win.id;
        return (
          <Window key={win.id} windowState={win}>
            {renderAppContent(win.id, baseId, win.componentProps)}
          </Window>
        );
      })}
    </>
  );
};
