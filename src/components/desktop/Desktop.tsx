import React from 'react';
import { Wallpaper } from './Wallpaper';
import { DesktopGrid } from './DesktopGrid';

export const Desktop: React.FC = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col justify-between select-none">
      <Wallpaper />
      <main className="flex-1 relative overflow-hidden z-10">
        <DesktopGrid />
      </main>
    </div>
  );
};
