export interface WallpaperOption {
  id: string;
  name: string;
  category: 'Windows 11' | 'Gradient' | 'Aurora' | 'Cyberpunk' | 'Monochrome';
  previewColor: string;
  cssClass: string;
  hasParticles: boolean;
  accentColor: string;
}

export const wallpaperOptions: WallpaperOption[] = [
  {
    id: 'win11-bloom',
    name: 'Windows 11 Bloom (Dark)',
    category: 'Windows 11',
    previewColor: '#0a192f',
    cssClass: 'bg-gradient-to-br from-[#071325] via-[#0c2340] to-[#040d1a]',
    hasParticles: false,
    accentColor: '#00adef'
  },
  {
    id: 'win11-light',
    name: 'Windows 11 Bloom (Light)',
    category: 'Windows 11',
    previewColor: '#e0f2fe',
    cssClass: 'bg-gradient-to-br from-[#bae6fd] via-[#e0f2fe] to-[#7dd3fc]',
    hasParticles: false,
    accentColor: '#0284c7'
  },
  {
    id: 'deep-space',
    name: 'Deep Space Mesh',
    category: 'Gradient',
    previewColor: '#05070d',
    cssClass: 'bg-gradient-to-br from-[#05070d] via-[#09101d] to-[#040814]',
    hasParticles: true,
    accentColor: '#00f0ff'
  },
  {
    id: 'cyan-aurora',
    name: 'Cyan Northern Lights',
    category: 'Aurora',
    previewColor: '#031b29',
    cssClass: 'bg-gradient-to-tr from-[#02131e] via-[#042838] to-[#081226]',
    hasParticles: true,
    accentColor: '#38bdf8'
  },
  {
    id: 'neon-pulse',
    name: 'Neon Cyberpunk',
    category: 'Cyberpunk',
    previewColor: '#12041e',
    cssClass: 'bg-gradient-to-br from-[#12041e] via-[#1a0826] to-[#060412]',
    hasParticles: true,
    accentColor: '#c084fc'
  },
  {
    id: 'monochrome-sleek',
    name: 'Monochrome Obsidian',
    category: 'Monochrome',
    previewColor: '#0a0a0c',
    cssClass: 'bg-gradient-to-br from-[#090a0f] via-[#12131a] to-[#050508]',
    hasParticles: false,
    accentColor: '#e2e8f0'
  }
];
