import React from 'react';

interface IconProps {
  className?: string;
}

// 1. Ultra-Realistic 3D Manila Folder Icon with multiple paper sheets peeking out
export const WindowsFolderIcon: React.FC<IconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="folderBack3D" x1="4" y1="6" x2="48" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#b45309" />
      </linearGradient>
      <linearGradient id="folderFront3D" x1="4" y1="18" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="25%" stopColor="#facc15" />
        <stop offset="75%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#a16207" />
      </linearGradient>
      <linearGradient id="paperSheet1" x1="12" y1="8" x2="38" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#e2e8f0" />
      </linearGradient>
      <linearGradient id="paperSheet2" x1="16" y1="6" x2="42" y2="26" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
      <filter id="shadow3D" x="0" y="0" width="52" height="52" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.45" />
      </filter>
    </defs>
    <g filter="url(#shadow3D)">
      {/* Folder Back Tab */}
      <path d="M4 12C4 9.79086 5.79086 8 8 8H19.1716C20.2324 8 21.2498 8.42143 22 9.17157L25.8284 13H44C46.2091 13 48 14.7909 48 17V40C48 42.2091 46.2091 44 44 44H8C5.79086 44 4 42.2091 4 40V12Z" fill="url(#folderBack3D)" />
      
      {/* Sheet 2 (Blue Code Document underneath) */}
      <path d="M16 10C16 8.89543 16.8954 8 18 8H38C39.1046 8 40 8.89543 40 10V26H16V10Z" fill="url(#paperSheet2)" transform="rotate(3 28 17)" />
      <rect x="20" y="11" width="14" height="2" rx="1" fill="#ffffff" fillOpacity="0.8" transform="rotate(3 28 17)" />
      
      {/* Sheet 1 (White Document in front) */}
      <path d="M10 13C10 11.8954 10.8954 11 12 11H36C37.1046 11 38 11.8954 38 13V28H10V13Z" fill="url(#paperSheet1)" />
      <rect x="14" y="14" width="12" height="2" rx="1" fill="#64748b" />
      <rect x="14" y="18" width="18" height="2" rx="1" fill="#94a3b8" />
      <rect x="14" y="22" width="14" height="2" rx="1" fill="#cbd5e1" />

      {/* Front Folder Lip with glossy bevel */}
      <path d="M4 21C4 18.7909 5.79086 17 8 17H44C46.2091 17 48 18.7909 48 21V41C48 43.2091 46.2091 45 44 45H8C5.79086 45 4 43.2091 4 41V21Z" fill="url(#folderFront3D)" />
      {/* Top Gloss Highlight */}
      <path d="M8 18H44C45.6569 18 47 19.3431 47 21V22.5H5V21C5 19.3431 6.34315 18 8 18Z" fill="#ffffff" fillOpacity="0.4" />
      {/* Bottom shadow lip */}
      <path d="M5 41V42C5 43.6569 6.34315 45 8 45H44C45.6569 45 47 43.6569 47 42V41H5Z" fill="#713f12" fillOpacity="0.3" />
    </g>
  </svg>
);

// 2. High-Gloss This PC / Computer Monitor
export const ThisPCIcon: React.FC<IconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="pcBezel" x1="4" y1="4" x2="48" y2="36" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
      <linearGradient id="pcDisplay" x1="8" y1="8" x2="44" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0284c7" />
        <stop offset="60%" stopColor="#0369a1" />
        <stop offset="100%" stopColor="#075985" />
      </linearGradient>
      <linearGradient id="pcStand" x1="16" y1="36" x2="36" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
    </defs>
    {/* Monitor Frame */}
    <rect x="4" y="5" width="44" height="31" rx="4" fill="url(#pcBezel)" stroke="#94a3b8" strokeWidth="1" />
    {/* Display Screen */}
    <rect x="7" y="8" width="38" height="25" rx="2" fill="url(#pcDisplay)" />
    {/* Screen Bloom graphics */}
    <circle cx="36" cy="14" r="8" fill="#38bdf8" fillOpacity="0.4" />
    <path d="M12 28L26 16L38 28H12Z" fill="#bae6fd" fillOpacity="0.3" />
    <line x1="8" y1="8" x2="44" y2="32" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="15" />
    {/* Stand & Base */}
    <path d="M22 36H30V43H22V36Z" fill="url(#pcStand)" />
    <path d="M14 43H38V47C38 47.5523 37.5523 48 37 48H15C14.4477 48 14 47.5523 14 47V43Z" fill="url(#pcStand)" stroke="#cbd5e1" strokeWidth="0.5" />
  </svg>
);

// 3. Glass Recycle Bin Icon
export const RecycleBinIcon: React.FC<IconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="glassBody" x1="12" y1="10" x2="40" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#e2e8f0" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.7" />
      </linearGradient>
    </defs>
    {/* Rim */}
    <ellipse cx="26" cy="12" rx="17" ry="5" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
    <ellipse cx="26" cy="12" rx="14" ry="3.5" fill="#0284c7" fillOpacity="0.3" />
    {/* Bin Glass Container */}
    <path d="M10 12L15 44C15.2 46 20 48 26 48C32 48 36.8 46 37 44L42 12" fill="url(#glassBody)" stroke="#94a3b8" strokeWidth="1.5" />
    {/* Vertical Grooves */}
    <path d="M18 16L19 44" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
    <path d="M26 16V45" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
    <path d="M34 16L33 44" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
    {/* Green Recycling Arrows */}
    <path d="M23 25L26 21L29 25M26 21V30" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M29 35L26 39L23 35M26 39V30" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 4. PDF Resume Icon with Glossy Red Badge
export const PDFResumeIcon: React.FC<IconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="docPage" x1="10" y1="4" x2="42" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f8fafc" />
      </linearGradient>
      <linearGradient id="pdfRed" x1="6" y1="28" x2="46" y2="42" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#991b1b" />
      </linearGradient>
    </defs>
    {/* Page base */}
    <path d="M10 6C10 4.89543 10.8954 4 12 4H30L42 16V44C42 45.1046 41.1046 46 40 46H12C10.8954 46 10 45.1046 10 44V6Z" fill="url(#docPage)" stroke="#cbd5e1" strokeWidth="1" />
    {/* Fold corner */}
    <path d="M30 4V16H42" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
    {/* Skeleton lines */}
    <rect x="16" y="10" width="10" height="3" rx="1.5" fill="#0284c7" />
    <rect x="16" y="16" width="20" height="2" rx="1" fill="#64748b" />
    <rect x="16" y="20" width="16" height="2" rx="1" fill="#94a3b8" />
    <rect x="16" y="24" width="22" height="2" rx="1" fill="#cbd5e1" />
    {/* PDF Badge */}
    <rect x="6" y="28" width="40" height="14" rx="4" fill="url(#pdfRed)" stroke="#fca5a5" strokeWidth="0.5" />
    <text x="26" y="39.5" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="sans-serif" fontWeight="900" letterSpacing="1">PDF</text>
  </svg>
);

// 5. Windows Terminal Shell Icon
export const WindowsTerminalIcon: React.FC<IconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="termWindow" x1="4" y1="8" x2="48" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
    </defs>
    <rect x="4" y="8" width="44" height="36" rx="5" fill="url(#termWindow)" stroke="#475569" strokeWidth="1" />
    {/* Header bar */}
    <rect x="4" y="8" width="44" height="8" rx="5" fill="#334155" />
    <circle cx="10" cy="12" r="2" fill="#ef4444" />
    <circle cx="16" cy="12" r="2" fill="#eab308" />
    <circle cx="22" cy="12" r="2" fill="#22c55e" />
    {/* Command Prompt Glyphs */}
    <path d="M12 22L18 27L12 32" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="22" y1="32" x2="31" y2="32" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// 6. Windows Settings Gear Icon
export const WindowsSettingsIcon: React.FC<IconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="gearBody" x1="6" y1="6" x2="46" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
      <linearGradient id="gearCenter" x1="18" y1="18" x2="34" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
    </defs>
    <circle cx="26" cy="26" r="16" fill="url(#gearBody)" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <rect
        key={angle}
        x="23"
        y="5"
        width="6"
        height="8"
        rx="2"
        fill="url(#gearBody)"
        transform={`rotate(${angle} 26 26)`}
      />
    ))}
    <circle cx="26" cy="26" r="9" fill="url(#gearCenter)" />
    <circle cx="26" cy="26" r="4.5" fill="#0f172a" />
  </svg>
);

// 7. Windows Mail / Outlook Icon
export const WindowsMailIcon: React.FC<IconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="mailBlue" x1="6" y1="10" x2="46" y2="42" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
    </defs>
    <rect x="6" y="11" width="40" height="30" rx="5" fill="url(#mailBlue)" stroke="#38bdf8" strokeWidth="0.5" />
    <path d="M6 15L26 29L46 15" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 37L18 25" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
    <path d="M46 37L34 25" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 8. Microsoft Edge / Browser Icon
export const WindowsEdgeIcon: React.FC<IconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="edgeOrb" x1="4" y1="4" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0284c7" />
        <stop offset="50%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
    </defs>
    <circle cx="26" cy="26" r="20" fill="url(#edgeOrb)" />
    <path d="M13 26C13 18.8203 18.8203 13 26 13C33.1797 13 39 18.8203 39 26C39 33.1797 33.1797 39 26 39C19.5 39 16 33.5 16 30C16 26.5 19.5 25.5 24 25.5H38" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

// 9. Official Windows 11 Logo (4 Glossy Blue Squares)
export const WindowsLogoIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="winTile" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="17.5" height="17.5" rx="2" fill="url(#winTile)" />
    <rect x="25.5" y="5" width="17.5" height="17.5" rx="2" fill="url(#winTile)" />
    <rect x="5" y="25.5" width="17.5" height="17.5" rx="2" fill="url(#winTile)" />
    <rect x="25.5" y="25.5" width="17.5" height="17.5" rx="2" fill="url(#winTile)" />
  </svg>
);

// 10. Weather Widget Icon (Sun & Cloud)
export const WeatherWidgetIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="10" cy="9" r="4" fill="#facc15" />
    <path d="M7 16C5.34315 16 4 14.6569 4 13C4 11.4552 5.1685 10.1837 6.66667 10.0211C7.2435 7.6975 9.3512 6 11.8333 6C14.7789 6 17.1667 8.3878 17.1667 11.3333C18.7775 11.536 20 12.9239 20 14.5C20 16.433 18.433 18 16.5 18H7.5" fill="#f1f5f9" opacity="0.9" />
  </svg>
);

// Projects Folder Icon
export const ProjectsFolderIcon: React.FC<IconProps> = ({ className = 'w-10 h-10' }) => (
  <div className="relative inline-block">
    <WindowsFolderIcon className={className} />
    <span className="absolute bottom-1 right-0.5 px-1 py-0.5 bg-slate-950 text-sky-400 font-mono text-[9px] font-bold rounded border border-sky-500/40 shadow">
      &lt;/&gt;
    </span>
  </div>
);

// Skills Microchip Icon
export const SkillsCpuIcon: React.FC<IconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="11" y="11" width="30" height="30" rx="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
    <rect x="18" y="18" width="16" height="16" rx="2.5" fill="#0284c7" />
    <path d="M15 6V11M26 6V11M37 6V11M15 41V46M26 41V46M37 41V46M6 15H11M6 26H11M6 37H11M41 15H46M41 26H46M41 37H46" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Experience Briefcase Icon
export const ExperienceBriefcaseIcon: React.FC<IconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20 13V9C20 7.89543 20.8954 7 22 7H30C31.1046 7 32 7.89543 32 9V13" stroke="#d97706" strokeWidth="2.5" />
    <rect x="6" y="13" width="40" height="30" rx="5" fill="#92400e" stroke="#f59e0b" strokeWidth="1.5" />
    <rect x="6" y="24" width="40" height="3.5" fill="#78350f" />
    <rect x="23" y="22" width="6" height="8" rx="1.5" fill="#fef08a" />
  </svg>
);

// Achievements Gold Trophy Icon
export const AchievementsTrophyIcon: React.FC<IconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M13 7H39V20C39 27.1797 33.1797 33 26 33C18.8203 33 13 27.1797 13 20V7Z" fill="#eab308" stroke="#fef08a" strokeWidth="1" />
    <path d="M13 11H6C4.89543 11 4 11.8954 4 13V17C4 20.866 7.13401 24 11 24H13" stroke="#eab308" strokeWidth="2.5" />
    <path d="M39 11H46C47.1046 11 48 11.8954 48 13V17C48 20.866 44.866 24 41 24H39" stroke="#eab308" strokeWidth="2.5" />
    <rect x="23" y="33" width="6" height="9" fill="#ca8a04" />
    <rect x="15" y="42" width="22" height="5" rx="2" fill="#78350f" stroke="#eab308" strokeWidth="1" />
  </svg>
);

// User Profile Folder Icon
export const UserFolderIcon: React.FC<IconProps> = ({ className = 'w-10 h-10' }) => (
  <div className="relative inline-block">
    <WindowsFolderIcon className={className} />
    <div className="absolute inset-0 flex items-center justify-center pt-2">
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-amber-900/90">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </div>
  </div>
);

// 11. Ultra-Futuristic 3D AI Cyber Core Hologram Icon
export const AIAssistantIcon: React.FC<IconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="aiCyberGlow" x1="4" y1="4" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00f0ff" />
        <stop offset="45%" stopColor="#0284c7" />
        <stop offset="80%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#050b14" />
      </linearGradient>
      <linearGradient id="aiFaceGlass" x1="12" y1="12" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#0369a1" stopOpacity="0.95" />
      </linearGradient>
      <radialGradient id="holoRing" cx="26" cy="26" r="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
        <stop offset="70%" stopColor="#10b981" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
      <filter id="aiGlowShadow" x="0" y="0" width="52" height="52" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#06b6d4" floodOpacity="0.8" />
      </filter>
    </defs>
    <g filter="url(#aiGlowShadow)">
      {/* Outer Hologram Radial Halo */}
      <circle cx="26" cy="26" r="23" fill="url(#holoRing)" />
      <circle cx="26" cy="26" r="21" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 2" opacity="0.7" />

      {/* Main Metallic Cyber Head Capsule */}
      <rect x="8" y="10" width="36" height="32" rx="12" fill="url(#aiCyberGlow)" stroke="#38bdf8" strokeWidth="1.5" />
      
      {/* Gloss Visor Screen */}
      <rect x="12" y="14" width="28" height="24" rx="8" fill="url(#aiFaceGlass)" stroke="#22d3ee" strokeWidth="1" />
      
      {/* Top Visor Gloss Light Beam */}
      <path d="M14 15C14 13.8954 14.8954 13 16 13H36C37.1046 13 38 13.8954 38 15V21H14V15Z" fill="#ffffff" fillOpacity="0.3" />

      {/* Glowing Neon Cyber Eyes */}
      <rect x="17" y="21" width="6" height="6" rx="2" fill="#00f0ff" />
      <rect x="18" y="22" width="2.5" height="2.5" rx="0.5" fill="#ffffff" />

      <rect x="29" y="21" width="6" height="6" rx="2" fill="#00f0ff" />
      <rect x="30" y="22" width="2.5" height="2.5" rx="0.5" fill="#ffffff" />

      {/* Neural Wave Mouth Pulse */}
      <path d="M19 32C22 35 30 35 33 32" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />

      {/* Antenna Crown Sparkle */}
      <path d="M26 3V10" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="26" cy="3" r="3" fill="#34d399" />
      <circle cx="26" cy="3" r="1" fill="#ffffff" />

      {/* Corner Sparkle Dots */}
      <circle cx="9" cy="11" r="1.5" fill="#00f0ff" />
      <circle cx="43" cy="11" r="1.5" fill="#34d399" />
      <circle cx="44" cy="38" r="1.5" fill="#00f0ff" />
    </g>
  </svg>
);

// 12. Cyberpunk Retro Arcade Game Center Icon
export const CyberArcadeIcon: React.FC<IconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="arcadeBody" x1="4" y1="4" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="50%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
    <rect x="8" y="6" width="36" height="40" rx="6" fill="#090d16" stroke="url(#arcadeBody)" strokeWidth="2" />
    <rect x="12" y="10" width="28" height="18" rx="3" fill="#030712" stroke="#ec4899" strokeWidth="1" />
    <circle cx="26" cy="19" r="6" fill="#a855f7" fillOpacity="0.4" />
    <path d="M16 22L21 16L26 22H16Z" fill="#38bdf8" />
    <path d="M26 22L31 16L36 22H26Z" fill="#f472b6" />
    <circle cx="18" cy="34" r="3" fill="#06b6d4" />
    <circle cx="34" cy="32" r="2.5" fill="#ef4444" />
    <circle cx="38" cy="36" r="2.5" fill="#eab308" />
  </svg>
);

// 13. System Architecture Node Network Icon
export const SystemNetworkIcon: React.FC<IconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="netGrad" x1="4" y1="4" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00f0ff" />
        <stop offset="50%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
    </defs>
    <path d="M14 16L26 10L38 16L26 22L14 16Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
    <path d="M14 26L26 20L38 26L26 32L14 26Z" fill="#0f172a" stroke="url(#netGrad)" strokeWidth="1.5" />
    <path d="M14 36L26 30L38 36L26 42L14 36Z" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
    <circle cx="26" cy="10" r="3" fill="#38bdf8" />
    <circle cx="14" cy="26" r="3" fill="#00f0ff" />
    <circle cx="38" cy="26" r="3" fill="#34d399" />
    <circle cx="26" cy="42" r="3" fill="#a855f7" />
  </svg>
);

// Helper function to resolve icon by key
export const getWindowsIcon = (iconName: string, className?: string) => {
  switch (iconName.toLowerCase()) {
    case 'thispc':
    case 'computer':
      return <ThisPCIcon className={className} />;
    case 'recyclebin':
    case 'trash':
      return <RecycleBinIcon className={className} />;
    case 'user':
    case 'about':
      return <UserFolderIcon className={className} />;
    case 'foldergit2':
    case 'projects':
      return <ProjectsFolderIcon className={className} />;
    case 'cpu':
    case 'skills':
      return <SkillsCpuIcon className={className} />;
    case 'briefcase':
    case 'experience':
      return <ExperienceBriefcaseIcon className={className} />;
    case 'trophy':
    case 'achievements':
      return <AchievementsTrophyIcon className={className} />;
    case 'filetext':
    case 'resume':
      return <PDFResumeIcon className={className} />;
    case 'mail':
    case 'contact':
      return <WindowsMailIcon className={className} />;
    case 'terminal':
      return <WindowsTerminalIcon className={className} />;
    case 'globe':
    case 'browser':
      return <WindowsEdgeIcon className={className} />;
    case 'sliders':
    case 'settings':
      return <WindowsSettingsIcon className={className} />;
    case 'bot':
    case 'ai':
    case 'ai-assistant':
    case 'askai':
      return <AIAssistantIcon className={className} />;
    case 'gamepad':
    case 'gamepad2':
    case 'arcade':
      return <CyberArcadeIcon className={className} />;
    case 'network':
    case 'architecture':
      return <SystemNetworkIcon className={className} />;
    default:
      return <WindowsFolderIcon className={className} />;
  }
};
